// client/src/pages/Search.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import heroImg from '../assets/searchpage.png';

const DEFAULTS = {
    searchTerm: '',
    address: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
};

const Search = () => {
    const [sidebardata, setSidebardata] = useState(DEFAULTS);
    const [loading, setLoading] = useState(false);
    const [listings, setListings] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Parse URL -> state, fetch results
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);

        const parseBool = (key) => urlParams.get(key) === 'true';
        const stateFromUrl = {
            searchTerm: urlParams.get('searchTerm') || DEFAULTS.searchTerm,
            address: urlParams.get('address') || DEFAULTS.address,
            type: urlParams.get('type') || DEFAULTS.type,
            parking: parseBool('parking'),
            furnished: parseBool('furnished'),
            offer: parseBool('offer'),
            sort: urlParams.get('sort') || DEFAULTS.sort,
            order: urlParams.get('order') || DEFAULTS.order,
        };

        setSidebardata(stateFromUrl);

        const fetchListings = async () => {
            setLoading(true);
            setShowMore(false);
            const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
            const data = await res.json();
            setShowMore(data.length > 8);
            setListings(data);
            setLoading(false);
        };
        fetchListings();
    }, [location.search]);

    // Field changes
    const handleChange = (e) => {
        const { id, value, checked, type, name } = e.target;

        // radios for type
        if (id === 'all' || id === 'rent' || id === 'sale') {
            setSidebardata((p) => ({ ...p, type: id }));
            return;
        }

        // text fields
        if (id === 'searchTerm' || id === 'address') {
            setSidebardata((p) => ({ ...p, [id]: value }));
            return;
        }

        // checkboxes
        if (['parking', 'furnished', 'offer'].includes(id)) {
            setSidebardata((p) => ({ ...p, [id]: checked }));
            return;
        }

        // sort select: "field|order"
        if (id === 'sort') {
            const [sortKey, sortOrder] = value.split('|');
            setSidebardata((p) => ({ ...p, sort: sortKey, order: sortOrder }));
            return;
        }
    };

    // Build URL only with changed fields
    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        const setIf = (key, val, pred = true) => {
            if (pred) params.set(key, val);
        };

        // text fields if non-empty
        if (sidebardata.searchTerm.trim())
            setIf('searchTerm', sidebardata.searchTerm.trim());
        if (sidebardata.address.trim())
            setIf('address', sidebardata.address.trim());

        // type only if not default
        if (sidebardata.type !== DEFAULTS.type)
            setIf('type', sidebardata.type);

        // checkboxes only when true
        ['parking', 'furnished', 'offer'].forEach((k) => {
            if (sidebardata[k] === true) params.set(k, 'true');
        });

        // sort/order only if not default
        if (sidebardata.sort !== DEFAULTS.sort)
            setIf('sort', sidebardata.sort);
        if (sidebardata.order !== DEFAULTS.order)
            setIf('order', sidebardata.order);

        const qs = params.toString();
        navigate(`/search${qs ? `?${qs}` : ''}`);
    };

    const onShowMoreClick = async () => {
        const startIndex = listings.length;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
        const data = await res.json();
        if (data.length < 9) setShowMore(false);
        setListings((prev) => [...prev, ...data]);
    };

    return (
        <section className="bg-[#F8F9FA]">
            {/* HERO */}
            <div
                className="relative h-[230vh] md:h-[100vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
                <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-end pt-20 px-4 py-10 space-y-8">
                    <h1 className="h-heading text-3xl sm:text-4xl md:text-5xl font-semibold text-white">
                        Explore properties
                    </h1>

                    {/* Filter form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white backdrop-blur-md border border-[#E5E7EB] rounded-2xl p-8 space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <label htmlFor="searchTerm" className="text-sm font-medium text-[#6B7280] mb-1">
                                    Keyword
                                </label>
                                <input
                                    type="text"
                                    id="searchTerm"
                                    value={sidebardata.searchTerm}
                                    onChange={handleChange}
                                    placeholder="Name, features, description…"
                                    className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="address" className="text-sm font-medium text-[#6B7280] mb-1">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    value={sidebardata.address}
                                    onChange={handleChange}
                                    placeholder="City, locality or address"
                                    className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-2 text-sm text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>

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
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

            {/* LISTINGS */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="space-y-10">
                    <h2 className="h-heading text-2xl font-semibold text-[#1B1B1B]">Listings</h2>

                    {!loading && listings.length === 0 && (
                        <p className="text-center text-lg text-[#6B7280]">No listings found!</p>
                    )}
                    {loading && <p className="text-center text-lg text-[#6B7280]">Loading...</p>}

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
