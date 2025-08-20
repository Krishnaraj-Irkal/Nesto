// client/src/pages/Profile.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserFailure,
    deleteUserSuccess,
    signOutUserFailure,
    signOutUserSuccess,
    signOutUserStart,
} from '../redux/user/userSlice';
import { MdLocationOn } from 'react-icons/md';

const Profile = () => {
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const fileRef = useRef(null);
    const [filePerc, setFilePerc] = useState(0);
    const [file, setFile] = useState(null);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [showListingError, setShowListingError] = useState(false);
    const [listings, setListings] = useState([]);

    // helper for ₹ formatting
    const rupees = (n = 0) => Number(n || 0).toLocaleString('en-IN');

    useEffect(() => {
        if (file) handleFileUpload(file);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file]);

    const handleFileUpload = async (file) => {
        try {
            const timestamp = Math.round(new Date().getTime() / 1000);
            const fd = new FormData();
            fd.append('file', file);
            fd.append('timestamp', timestamp);
            fd.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
            fd.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                fd,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (pe) => {
                        if (pe.lengthComputable) {
                            setFilePerc(Math.round((pe.loaded / pe.total) * 100));
                        }
                    },
                }
            );
            setFormData((prev) => ({ ...prev, avatar: response.data.secure_url }));
            setFileUploadError(false);
        } catch (err) {
            console.error('Error uploading file:', err);
            setFileUploadError(true);
        }
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
        } catch (err) {
            dispatch(updateUserFailure(err.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess());
        } catch (err) {
            dispatch(deleteUserFailure(err.message));
        }
    };

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
        } catch (err) {
            dispatch(signOutUserFailure(err.message));
        }
    };

    const handleShowListings = async () => {
        try {
            setShowListingError(false);
            const res = await fetch(`/api/user/listings/${currentUser._id}`);
            const data = await res.json();
            if (data.success === false) {
                setShowListingError(true);
                return;
            }
            setListings(data);
        } catch {
            setShowListingError(true);
        }
    };

    const handleListingDelete = async (listingId) => {
        try {
            const res = await fetch(`/api/listing/delete/${listingId}`, { method: 'DELETE' });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setListings((prev) => prev.filter((l) => l._id !== listingId));
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <main className="bg-[#F8F9FA] min-h-screen">
            {/* Header strip */}
            <div className="h-36" />

            {/* Profile card that overlaps the strip */}
            <section className="-mt-12">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="bg-white border border-[#E5E7EB] rounded-2xl px-5 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                            {/* Left: avatar + name/email */}
                            <div className="flex items-center gap-5 min-w-0">
                                <input
                                    onChange={(e) => setFile(e.target.files[0])}
                                    type="file"
                                    ref={fileRef}
                                    hidden
                                    accept="image/*"
                                />

                                <button
                                    type="button"
                                    onClick={() => fileRef.current?.click()}
                                    title="Change photo"
                                    className="relative h-24 w-24 rounded-full overflow-hidden ring-2 ring-white shadow -mt-10 shrink-0"
                                >
                                    <img
                                        src={formData.avatar || currentUser.avatar}
                                        alt="profile"
                                        className="h-full w-full object-cover"
                                    />
                                    <span className="absolute bottom-1 right-1 h-5 w-5 rounded-full bg-[#1B1B1B] text-white text-[10px] grid place-items-center">
                                        ✎
                                    </span>
                                </button>

                                <div className="min-w-0">
                                    <h1 className="text-2xl font-extrabold text-[#1B1B1B] leading-tight break-words">
                                        {currentUser.username}
                                    </h1>
                                    <p className="text-sm text-[#6B7280] break-all">{currentUser.email}</p>

                                    <div className="mt-2 min-h-[18px]">
                                        {fileUploadError ? (
                                            <span className="text-xs text-red-600">
                                                Upload failed (image should be &lt; 2MB)
                                            </span>
                                        ) : filePerc > 0 && filePerc < 100 ? (
                                            <span className="text-xs text-[#374151]">Uploading {filePerc}%</span>
                                        ) : filePerc === 100 ? (
                                            <span className="text-xs text-green-700">Uploaded</span>
                                        ) : null}
                                    </div>
                                </div>
                            </div>

                            {/* Right: actions */}
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/create-listing"
                                    className="bg-[#00C896] hover:bg-[#00B085] text-white rounded-lg px-4 py-2 text-sm font-semibold transition"
                                >
                                    Create Listing
                                </Link>
                                <button
                                    onClick={handleSignOut}
                                    className="border border-[#E5E7EB] text-[#1B1B1B] rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#F8F9FA] transition"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content grid */}
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-8">
                    {/* Left: Account form + Listings */}
                    <div className="space-y-8">
                        {/* Account settings */}
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-7">
                            <h2 className="text-xl font-semibold text-[#1B1B1B]">Account settings</h2>
                            <p className="text-sm text-[#6B7280] mt-1">
                                Update your profile information and password.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div className="flex flex-col">
                                    <label htmlFor="username" className="text-sm font-medium text-[#374151]">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        type="text"
                                        defaultValue={currentUser.username}
                                        placeholder="Your name"
                                        onChange={handleChange}
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                    placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-sm font-medium text-[#374151]">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        defaultValue={currentUser.email}
                                        placeholder="you@example.com"
                                        onChange={handleChange}
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                    placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label htmlFor="password" className="text-sm font-medium text-[#374151]">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        onChange={handleChange}
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                    placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-[#1B1B1B] hover:bg-black text-white rounded-lg px-4 py-3 text-sm font-semibold
                  transition-transform duration-150 hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Saving…' : 'Save changes'}
                                </button>

                                {error && (
                                    <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                        {error}
                                    </p>
                                )}
                            </form>
                        </div>

                        {/* My Listings */}
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-7">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-[#1B1B1B]">My listings</h2>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={handleShowListings}
                                        className="border border-[#E5E7EB] text-[#1B1B1B] rounded-lg px-4 py-2 text-sm font-semibold hover:bg-[#F8F9FA] transition"
                                    >
                                        Load my listings
                                    </button>
                                    <Link
                                        to="/create-listing"
                                        className="bg-[#00C896] hover:bg-[#00B085] text-white rounded-lg px-4 py-2 text-sm font-semibold transition"
                                    >
                                        New Listing
                                    </Link>
                                </div>
                            </div>

                            {showListingError && (
                                <p className="mt-4 text-sm text-red-600">Error fetching the listings</p>
                            )}

                            {/* Results */}
                            <div className="mt-6">
                                {listings && listings.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                        {listings.map((listing) => (
                                            <div
                                                key={listing._id}
                                                className="bg-white border border-[#E5E7EB] rounded-2xl overflow-hidden"
                                            >
                                                <Link to={`/listing/${listing._id}`}>
                                                    <div className="relative aspect-[16/10]">
                                                        <img
                                                            src={
                                                                listing.imageUrls?.[0] ||
                                                                'https://placehold.co/640x400/jpg'
                                                            }
                                                            alt={listing.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <span className="absolute top-3 left-3 bg-[#00C896] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                                            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                                                        </span>
                                                    </div>
                                                </Link>

                                                <div className="p-4">
                                                    <Link
                                                        to={`/listing/${listing._id}`}
                                                        className="block font-semibold text-[#1B1B1B] line-clamp-1 hover:underline"
                                                    >
                                                        {listing.name}
                                                    </Link>

                                                    <p className="mt-1 text-sm text-[#6B7280] flex items-center gap-1">
                                                        <MdLocationOn className="text-[#00C896]" />
                                                        <span className="line-clamp-1">{listing.address}</span>
                                                    </p>

                                                    <div className="mt-3 flex items-center justify-between">
                                                        <div className="text-[#1B1B1B] font-bold">
                                                            ₹{rupees(listing.offer ? listing.discountPrice : listing.regularPrice)}
                                                            {listing.type === 'rent' && ' / month'}
                                                        </div>
                                                        <div className="flex gap-3">
                                                            <Link
                                                                to={`/update-listing/${listing._id}`}
                                                                className="text-[#00C896] font-semibold text-sm hover:opacity-80"
                                                            >
                                                                Edit
                                                            </Link>
                                                            <button
                                                                onClick={() => handleListingDelete(listing._id)}
                                                                className="text-red-600 font-semibold text-sm hover:opacity-80"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-[#6B7280]">
                                        No listings yet. Click <span className="font-semibold">New Listing</span> to add one.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: Quick actions / Safety */}
                    <aside className="space-y-6">

                        <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6">
                            <h3 className="font-semibold text-[#1B1B1B]">Account safety</h3>
                            <p className="text-sm text-[#6B7280] mt-2">
                                Manage your session and account securely.
                            </p>
                            <div className="mt-4 space-y-2">
                                <button
                                    onClick={handleSignOut}
                                    className="w-full border border-[#E5E7EB] text-[#1B1B1B] rounded-lg px-4 py-2 text-sm font-semibold hover:bg-white transition"
                                >
                                    Sign out
                                </button>
                                <button
                                    onClick={handleDeleteUser}
                                    className="w-full text-red-600 border border-red-200 bg-red-50 hover:bg-red-100 rounded-lg px-4 py-2 text-sm font-semibold transition"
                                >
                                    Delete account
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default Profile;
