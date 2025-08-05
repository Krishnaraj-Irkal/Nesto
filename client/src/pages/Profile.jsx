import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const fileRef = useRef(null);
    const [filePerc, setFilePerc] = useState(0);
    const [file, setFile] = useState(null);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});

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



    return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className="text-3xl font-semibold text-center my-7">
                Profile
            </h1>
            <form className='flex flex-col gap-4'>
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
                <input type="text" placeholder='username' className='border p-3 rounded-lg' id='username' />
                <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg' />
                <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg' />
                <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">update</button>
            </form>
            <div className='flex justify-between m-5'>
                <span className="text-red-700 cursor-pointer">Delete account</span>
                <span className="text-red-700 cursor-pointer">Sign out</span>
            </div>
        </div>
    );
};

export default Profile;
