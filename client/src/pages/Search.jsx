import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import heroImg from '../assets/searchpage.png';

const Search = () => {
    // Filter state
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc',
    });
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Parse URL query parameters on mount and when URL changes
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTerm = urlParams.get('searchTerm') || '';
        const type = urlParams.get('type') || 'all';
        const parking = urlParams.get('parking') === 'true';
        const furnished = urlParams.get('furnished') === 'true';
        const offer = urlParams.get('offer') === 'true';
        const sort = urlParams.get('sort') || 'created_at';
        const order = urlParams.get('order') || 'desc';
        setSidebardata({ searchTerm, type, parking, furnished, offer, sort, order });

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/get?${searchQuery}`);
            const data = await res.json();
            setShowMore(data.length > 8);
            setListings(data);
            setLoading(false);
        };
        fetchListings();
    }, [location.search]);

    // Update filter fields
    const handleChange = (e) => {
        const { id, value, checked } = e.target;
        // Update type radio buttons
        if (id === 'all' || id === 'rent' || id === 'sale') {
            setSidebardata((prev) => ({ ...prev, type: id }));
        }
        // Update searchTerm text
        if (id === 'searchTerm') {
            setSidebardata((prev) => ({ ...prev, searchTerm: value }));
        }
        // Toggle checkboxes
        if (['parking', 'furnished', 'offer'].includes(id)) {
            setSidebardata((prev) => ({ ...prev, [id]: checked }));
        }
        // Update sort select (value is "price" or "date", plus order)
        if (id === 'sort') {
            const [sortKey, sortOrder] = value.split('|');
            setSidebardata((prev) => ({
                ...prev,
                sort: sortKey,
                order: sortOrder,
            }));
        }
    };

    // Submit search parameters
    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        params.set('searchTerm', sidebardata.searchTerm);
        params.set('type', sidebardata.type);
        params.set('parking', sidebardata.parking);
        params.set('furnished', sidebardata.furnished);
        params.set('offer', sidebardata.offer);
        params.set('sort', sidebardata.sort);
        params.set('order', sidebardata.order);
        navigate(`/search?${params.toString()}`);
    };

    // Load more listings
    const onShowMoreClick = async () => {
        const startIndex = listings.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/listing/get?${searchQuery}`);
        const data = await res.json();
        // Hide “Show More” if fewer than 9 results are returned
        if (data.length < 9) setShowMore(false);
        setListings((prev) => [...prev, ...data]);
    };

    return (
        <section className="bg-[#F8F9FA]">
            {/* HERO: background image + overlay + heading + form */}
            <div
                className="relative h-[120vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />

                <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-end pt-20 px-4 py-10 space-y-8">
                    <h1 className="h-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
                        Explore properties
                    </h1>

                    {/* Filter & search form over the image */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white backdrop-blur-md border border-[#E5E7EB] rounded-2xl p-8 space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Search input */}
                            <div className="flex flex-col">
                                <label htmlFor="searchTerm" className="text-sm font-medium text-[#6B7280] mb-1">
                                    Search
                                </label>
                                <input
                                    type="text"
                                    id="searchTerm"
                                    value={sidebardata.searchTerm}
                                    onChange={handleChange}
                                    placeholder="Search by name or description"
                                    className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>

                            {/* Type: All, Rent, Sale */}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-[#6B7280] mb-2">Type</span>
                                <div className="flex items-center gap-4">
                                    {['all', 'rent', 'sale'].map((val) => (
                                        <label key={val} className="flex items-center gap-2 text-sm text-[#374151]">
                                            <input
                                                type="radio"
                                                id={val}
                                                name="type"
                                                checked={sidebardata.type === val}
                                                onChange={handleChange}
                                                className="h-4 w-4 text-[#00C896] border-gray-300 focus:ring-[#00C896]"
                                            />
                                            {val === 'all' ? 'Rent & Sale' : val.charAt(0).toUpperCase() + val.slice(1)}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Offer toggle */}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-[#6B7280] mb-2">Special offers</span>
                                <label className="flex items-center gap-2 text-sm text-[#374151]">
                                    <input
                                        type="checkbox"
                                        id="offer"
                                        checked={sidebardata.offer}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-[#00C896] border-gray-300 focus:ring-[#00C896]"
                                    />
                                    Show discounted listings only
                                </label>
                            </div>
                        </div>

                        {/* Amenities & sort row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Amenities */}
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-[#6B7280] mb-2">Amenities</span>
                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 text-sm text-[#374151]">
                                        <input
                                            type="checkbox"
                                            id="parking"
                                            checked={sidebardata.parking}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-[#00C896] border-gray-300 focus:ring-[#00C896]"
                                        />
                                        Parking
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-[#374151]">
                                        <input
                                            type="checkbox"
                                            id="furnished"
                                            checked={sidebardata.furnished}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-[#00C896] border-gray-300 focus:ring-[#00C896]"
                                        />
                                        Furnished
                                    </label>
                                </div>
                            </div>

                            {/* Sort select */}
                            <div className="flex flex-col">
                                <label htmlFor="sort" className="text-sm font-medium text-[#6B7280] mb-2">
                                    Sort by
                                </label>
                                <select
                                    id="sort"
                                    value={`${sidebardata.sort}|${sidebardata.order}`}
                                    onChange={handleChange}
                                    className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm text-[#374151] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                >
                                    <option value="regularPrice|desc">Price: High to low</option>
                                    <option value="regularPrice|asc">Price: Low to high</option>
                                    <option value="created_at|desc">Latest</option>
                                    <option value="created_at|asc">Oldest</option>
                                </select>
                            </div>

                            {/* Submit button */}
                            <div className="flex items-end">
                                <button
                                    type="submit"
                                    className="bg-[#1B1B1B] hover:bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold w-full md:w-auto transition-transform duration-150 hover:-translate-y-[2px]"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* LISTINGS BELOW THE HERO */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="space-y-10">
                    <h2 className="h-heading text-2xl font-semibold text-[#1B1B1B]">Listings</h2>

                    {!loading && listings.length === 0 && (
                        <p className="text-center text-lg text-[#6B7280]">No listings found!</p>
                    )}
                    {loading && (
                        <p className="text-center text-lg text-[#6B7280]">Loading...</p>
                    )}
                    {!loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {listings.map((listing) => (
                                <ListingItem key={listing._id} listing={listing} />
                            ))}
                        </div>
                    )}
                    {showMore && (
                        <div className="text-center">
                            <button
                                onClick={onShowMoreClick}
                                className="bg-[#00C896] hover:bg-[#00B085] text-white px-8 py-3 rounded-full text-sm font-medium transition-transform duration-150 hover:-translate-y-[2px]"
                            >
                                Show more
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>

    );
};

export default Search;
