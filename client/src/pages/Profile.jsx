import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom'
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserStart, deleteUserFailure, deleteUserSuccess, signOutUserFailure, signOutUserSuccess, signOutUserStart } from '../redux/user/userSlice';

const Profile = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [filePerc, setFilePerc] = useState(0);
    const [file, setFile] = useState(null);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const [showListingError, setShowListingError] = useState(false);
    const [listings, setListings] = useState([]);
    console.log(listings)
    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = async (file) => {
        try {
            const timestamp = Math.round(new Date().getTime() / 1000);

            const formData = new FormData();
            formData.append('file', file);
            formData.append('timestamp', timestamp);
            formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY); // From .env file

            formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.lengthComputable) {
                            setFilePerc(Math.round((progressEvent.loaded / progressEvent.total) * 100));
                        }
                    },
                }
            );

            setFormData((prevData) => ({ ...prevData, avatar: response.data.secure_url }));

        } catch (error) {
            console.error('Error uploading file:', error);
            setFileUploadError(true);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    }

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess());
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    const handleSignOut = async () => {
        try {
            dispatch(signOutUserStart());
            const res = await fetch('/api/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signOutUserFailure(data.message));
                return;
            }
            dispatch(signOutUserSuccess());
        } catch (error) {
            dispatch(signOutUserFailure(error.message))
        }
    }

    const handleShowListings = async () => {
        try {
            setShowListingError(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowListingError(true);
                return
            }
            setListings(data)
        } catch {
            setShowListingError(true);
        }
    }

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }

            setListings((prev) =>
                prev.filter((listing) => listing._id !== listingId)
            );
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-7">
                Profile
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type='file'
                    ref={fileRef}
                    hidden
                    accept='image/*'
                />
                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar}
                    alt='profile'
                    className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
                />
                <p className='text-sm self-center'>
                    {fileUploadError ? (
                        <span className='text-red-500'>File upload failed (image should be less than 2MB)</span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-700'>Uploading {filePerc}%</span>
                    ) : filePerc === 100 ? (
                        <span className='text-green-700'>File uploaded successfully</span>
                    ) : (
                        ''
                    )}
                </p>
                <input type="text" placeholder='username' defaultValue={currentUser.username} className='border p-3 rounded-lg' id='username' onChange={handleChange} />
                <input type="email" id='email' placeholder='email' defaultValue={currentUser.email} className='border p-3 rounded-lg' onChange={handleChange} />
                <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg' onChange={handleChange} />
                <button disabled={loading} className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 cursor-pointer">{loading ? 'Loading...' : 'Update'}</button>
                <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={'/create-listing'}>
                    Create Listing
                </Link>
            </form>
            <div className='flex justify-between m-5'>
                <span className="text-red-700 cursor-pointer" onClick={handleDeleteUser}>Delete account</span>
                <span className="text-red-700 cursor-pointer" onClick={handleSignOut}>Sign out</span>
            </div>
            <p className='text-red-700 mt-5'>{error ? error : ''}</p>
            <button className='text-green-700 w-full' onClick={handleShowListings}>Show Listings</button>
            <p className='text-red-700 mt-5'> {showListingError ? 'Error fetching the listings' : ''}</p>


            {listings && listings.length > 0 && (
                <div className='flex flex-col gap-4'>
                    <h1 className='text-center font-semibold mt-7 text-2xl'>Your Listings</h1>
                    {listings.map(listing => {
                        return (
                            <div key={listing._id} className='flex justify-between items-center border rounded-lg p-3 gap-4'>
                                <Link to={`/listing/${listing._id}`}>
                                    <img src={listing.imageUrls[0]} alt="listing cover" className='h-16 w-16 object-contain' />
                                </Link>
                                <Link className="text-slate-700 font-semibold hover:underline truncate flex-1" to={`/listing/${listing._id}`}>
                                    <p >{listing.name}</p>
                                </Link>
                                <div className='flex flex-col items-center '>
                                    <button onClick={() => handleListingDelete(listing._id)} className='text-red-700 uppercase cursor-pointer'>DELETE</button>
                                    <button className='text-green-700 uppercase cursor-pointer'>EDIT</button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )

            }
        </div>
    );
};

export default Profile;
