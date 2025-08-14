import React, { useState } from 'react'
import axios from 'axios';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CreatingListing = () => {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user)
    const [files, setFiles] = useState([])
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

    })
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
        const formData = new FormData();
        const timestamp = Math.round(new Date().getTime() / 1000);

        formData.append('file', file);
        formData.append('timestamp', timestamp);
        formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY); // Use Vite env variables
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET); // Use Vite env variables

        try {
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' } }
            );
            return response.data.secure_url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleDeleteImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index),
        })
    }

    const handleChange = (e) => {
        if (e.target.id === 'sale' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id,
            })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked,
            })
        }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value,
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) return setError('You must upload atleast one image')
            if (+formData.regularPrice < +formData.discountPrice) return setError('Discount Price must be less then Regular Price')
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    ...formData,
                    userRef: currentUser._id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false)
        }
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className="flex flex-col gap-4 flex-1">
                    <input onChange={handleChange} value={formData.name} type="text" id="name" placeholder='Name' className='border p-3 rounded-lg' maxLength='62' minLength='10' required />
                    <textarea onChange={handleChange} value={formData.description} id="description" placeholder='Description' className='border p-3 rounded-lg' required />
                    <input onChange={handleChange} value={formData.address} type="text" id="address" placeholder='Address' className='border p-3 rounded-lg' required />
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.type === 'sale'} type="checkbox" className='w-5' id="sale" />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.type === 'rent'} type="checkbox" className='w-5' id="rent" />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.parking} type="checkbox" className='w-5' id="parking" />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.furnished} type="checkbox" className='w-5' id="furnished" />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input onChange={handleChange} checked={formData.offer} type="checkbox" className='w-5' id="offer" />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleChange} value={formData.bedrooms} className='p-3 border border-gray-300 rounded-lg' type="number" id="bedrooms" min='1' max='10' required />
                            <p>Bedrooms</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleChange} value={formData.bathrooms} className='p-3 border border-gray-300 rounded-lg' type="number" id="bathrooms" min='1' max='10' required />
                            <p>Bathrooms</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input onChange={handleChange} value={formData.regularPrice} className='p-3 border border-gray-300 rounded-lg' type="number" id="regularPrice" min='50' max='1000000' required />
                            <div className='flex flex-col items-center'>
                                <p>Regular Price</p>
                                <span className='text-xs'>($ / month)</span>
                            </div>

                        </div>
                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                                <input onChange={handleChange} value={formData.discountPrice} className='p-3 border border-gray-300 rounded-lg' type="number" id="discountPrice" min='0' max='1000000' required />
                                <div className='flex flex-col items-center'>
                                    <p>Discounted Price</p>
                                    <span className='text-xs'>($ / month)</span>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <p className='font-semibold '>Images: <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span></p>
                    <div className='flex gap-4'>
                        <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple />
                        <button type='button' onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercease hover:shadow-lg disabled:opacity-80'>{uploading ? 'Uploading...' : 'Upload'}</button>
                    </div>
                    {imageUploadError && <p className='text-red-700 text-sm'>{imageUploadError}</p>}
                    {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => {
                        return (
                            <div key={index} className='flex justify-between p-3 border rounded-lg items-center'>
                                <img src={url} alt="Listing image" className='w-20 h-20 object-contain rounded-lg' />
                                <button type="button" onClick={() => handleDeleteImage(index)} className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75 disabled:opacity-80 '>Delete</button>
                            </div>
                        )
                    })}
                    <button disabled={loading || uploading} className='p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 bg-slate-700 text-white'>{loading ? 'Creating...' : 'Creating Listing'}</button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
                </div>

            </form>
        </main>
    )
}

export default CreatingListing