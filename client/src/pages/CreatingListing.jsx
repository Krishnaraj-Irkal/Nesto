// client/src/pages/CreatingListing.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaCloudUploadAlt } from 'react-icons/fa';


const CreatingListing = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false,
    });

    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleImageSubmit = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length <= 6) {
            setUploading(true);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                if (files[i].size > 2 * 1024 * 1024) {
                    setImageUploadError('Image size should be less than 2MB');
                    return;
                }
                promises.push(storeImage(files[i]));
            }

            Promise.all(promises)
                .then((urls) => {
                    setFormData({
                        ...formData,
                        imageUrls: formData.imageUrls.concat(urls),
                    });
                    setImageUploadError('');
                    setUploading(false);
                })
                .catch(() => {
                    setImageUploadError('Error uploading images');
                    setUploading(false);
                });
        } else {
            setImageUploadError('You can only upload 6 images');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        const fd = new FormData();
        const timestamp = Math.round(new Date().getTime() / 1000);
        fd.append('file', file);
        fd.append('timestamp', timestamp);
        fd.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
        fd.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                fd,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return response.data.secure_url;
        } catch (err) {
            console.error('Error uploading image:', err);
            throw err;
        }
    };

    const handleDeleteImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        });
    };

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({ ...formData, type: e.target.id });
        }

        if (['parking', 'furnished', 'offer'].includes(e.target.id)) {
            setFormData({ ...formData, [e.target.id]: e.target.checked });
        }

        if (['number', 'text', 'textarea'].includes(e.target.type)) {
            setFormData({ ...formData, [e.target.id]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError('You must upload atleast one image');
            if (+formData.regularPrice < +formData.discountPrice)
                return setError('Discount Price must be less then Regular Price');

            setLoading(true);
            setError(false);

            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, userRef: currentUser._id }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
                return;
            }
            navigate(`/listing/${data._id}`);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <main className="bg-[#F8F9FA] min-h-screen pt-12">
            <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
                {/* Page heading */}
                <header className="mb-6">
                    <h1 className="h-heading text-3xl sm:text-4xl font-semibold text-[#1B1B1B]">
                        Create a listing
                    </h1>
                    <p className="text-sm text-[#6B7280] mt-1">
                        Add photos, details, and pricing. The first image becomes your cover.
                    </p>
                </header>

                {/* Two-column layout */}
                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px] gap-8">
                    {/* LEFT: Details card */}
                    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-7 space-y-6">
                        {/* Property name */}
                        <div className="flex flex-col">
                            <label htmlFor="name" className="text-sm font-medium text-[#374151]">
                                Property name
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="E.g., 3BHK near City Park"
                                maxLength="62"
                                minLength="10"
                                required
                                className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                           placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                            />
                        </div>

                        {/* Description */}
                        <div className="flex flex-col">
                            <label htmlFor="description" className="text-sm font-medium text-[#374151]">
                                Description
                            </label>
                            <textarea
                                id="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the highlights, neighbourhood, and what makes it special…"
                                required
                                rows={5}
                                className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                           placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                            />
                        </div>

                        {/* Address */}
                        <div className="flex flex-col">
                            <label htmlFor="address" className="text-sm font-medium text-[#374151]">
                                Address
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="Street, city, state"
                                required
                                className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                           placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                            />
                        </div>

                        {/* Segmented type + feature toggles */}
                        <div>
                            <div className="text-sm font-medium text-[#374151] mb-2">Type</div>
                            <div className="flex flex-wrap gap-2">
                                {/* Keeping checkboxes (your logic depends on ids) — styled as pills */}
                                <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full border ${formData.type === 'rent' ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]' : 'border-[#E5E7EB] text-[#374151]'}`}>
                                    <input
                                        id="rent"
                                        type="checkbox"
                                        checked={formData.type === 'rent'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    Rent
                                </label>
                                <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full border ${formData.type === 'sale' ? 'bg-[#1B1B1B] text-white border-[#1B1B1B]' : 'border-[#E5E7EB] text-[#374151]'}`}>
                                    <input
                                        id="sale"
                                        type="checkbox"
                                        checked={formData.type === 'sale'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    Sell
                                </label>
                            </div>

                            <div className="mt-4 text-sm font-medium text-[#374151]">Features</div>
                            <div className="mt-2 flex flex-wrap gap-3">
                                {[
                                    { id: 'parking', label: 'Parking spot', checked: formData.parking },
                                    { id: 'furnished', label: 'Furnished', checked: formData.furnished },
                                    { id: 'offer', label: 'Special offer', checked: formData.offer },
                                ].map((opt) => (
                                    <label key={opt.id} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#E5E7EB] text-[#374151] cursor-pointer">
                                        <input
                                            id={opt.id}
                                            type="checkbox"
                                            checked={opt.checked}
                                            onChange={handleChange}
                                            className="h-4 w-4 accent-[#00C896]"
                                        />
                                        {opt.label}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Numbers row */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex flex-col">
                                <label htmlFor="bedrooms" className="text-sm font-medium text-[#374151]">
                                    Bedrooms
                                </label>
                                <input
                                    id="bedrooms"
                                    type="number"
                                    min="1"
                                    max="10"
                                    required
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                             focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="bathrooms" className="text-sm font-medium text-[#374151]">
                                    Bathrooms
                                </label>
                                <input
                                    id="bathrooms"
                                    type="number"
                                    min="1"
                                    max="10"
                                    required
                                    value={formData.bathrooms}
                                    onChange={handleChange}
                                    className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                             focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="regularPrice" className="text-sm font-medium text-[#374151]">
                                    Regular price <span className="text-[#6B7280]">(₹ / month for rent)</span>
                                </label>
                                <input
                                    id="regularPrice"
                                    type="number"
                                    min="50"
                                    max="1000000000"
                                    required
                                    value={formData.regularPrice}
                                    onChange={handleChange}
                                    className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                             focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>
                        </div>

                        {formData.offer && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex flex-col">
                                    <label htmlFor="discountPrice" className="text-sm font-medium text-[#374151]">
                                        Discounted price <span className="text-[#6B7280]">(₹ / month for rent)</span>
                                    </label>
                                    <input
                                        id="discountPrice"
                                        type="number"
                                        min="0"
                                        max="1000000000"
                                        required
                                        value={formData.discountPrice}
                                        onChange={handleChange}
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                               focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                    />
                                </div>
                            </div>
                        )}
                    </section>

                    {/* RIGHT: Images card (sticky) */}
                    <aside className="lg:sticky lg:top-28 h-max">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-7">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold text-[#1B1B1B]">
                                    Images
                                    <span className="text-[#6B7280] font-normal"> — first image becomes cover</span>
                                </p>
                                <span className="text-xs text-[#6B7280]">(max 6)</span>
                            </div>

                            <div className="mt-4 flex items-stretch gap-3">
                                {/* Hidden native input */}
                                <input
                                    onChange={(e) => setFiles(e.target.files)}
                                    className="hidden"
                                    type="file"
                                    id="images"
                                    accept="image/*"
                                    multiple
                                />

                                {/* Stretchy “input” (label) */}
                                <label
                                    htmlFor="images"
                                    className="flex-1 min-w-0 flex items-center justify-between h-11
               bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4
               text-sm text-[#374151] cursor-pointer hover:bg-[#F3F4F6] transition"
                                >
                                    <span className="inline-flex items-center gap-2 truncate">

                                        {files?.length
                                            ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
                                            : 'Choose images'}
                                    </span>
                                    <span className="text-xs text-[#9CA3AF]">Browse</span>
                                </label>

                                {/* Fixed-size upload button */}
                                <button
                                    type="button"
                                    onClick={handleImageSubmit}
                                    disabled={uploading}
                                    className="shrink-0 h-11 inline-flex items-center gap-2
               bg-[#1B1B1B] hover:bg-black text-white
               rounded-lg px-4 text-sm font-semibold transition disabled:opacity-60"
                                >
                                    <FaCloudUploadAlt className="opacity-90" />
                                    {uploading ? 'Uploading…' : 'Upload'}
                                </button>
                            </div>



                            {imageUploadError && (
                                <p className="mt-2 text-sm text-red-600">{imageUploadError}</p>
                            )}

                            {/* Thumbs */}
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {formData.imageUrls.length > 0 &&
                                    formData.imageUrls.map((url, index) => (
                                        <div
                                            key={index}
                                            className="relative group border border-[#E5E7EB] rounded-xl overflow-hidden"
                                        >
                                            <img src={url} alt="Listing" className="w-full aspect-square object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteImage(index)}
                                                className="absolute top-2 right-2 text-xs font-semibold bg-white/90 border border-[#E5E7EB] rounded-full px-3 py-1 hover:bg-white"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    ))}
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading || uploading}
                                className="mt-6 w-full bg-[#00C896] hover:bg-[#00B085] text-white rounded-lg px-4 py-3 text-sm font-semibold transition disabled:opacity-60"
                            >
                                {loading ? 'Creating…' : 'Create listing'}
                            </button>

                            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                        </div>
                    </aside>
                </form>
            </div>
        </main>
    );
};

export default CreatingListing;
