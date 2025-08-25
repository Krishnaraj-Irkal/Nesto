import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, } from 'swiper/modules';
import 'swiper/css/bundle';
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkedAlt,
    FaParking,
    FaShare,
    FaImages,
} from 'react-icons/fa';
import Contact from '../components/Contact';

SwiperCore.use([Navigation]);

const Listing = () => {
    const { listingId } = useParams();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${listingId}`);
                const data = await res.json();
                if (data?.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                console.log(data);
                setListing(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };
        fetchListing();
    }, [listingId]);


    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            alert('Link copied!');
        }
    };

    const rupees = (n) => (typeof n === 'number' ? n : Number(n || 0)).toLocaleString('en-IN');

    if (loading) return <p className="text-center my-7 text-2xl">Loading...</p>;
    if (error || !listing) return <p className="text-center my-7 text-2xl">Something went wrong!</p>;

    const isRent = listing.type === 'rent';
    const hasOffer = !!listing.offer;
    const currentPrice = hasOffer ? listing.discountPrice : listing.regularPrice;
    const youSave = hasOffer ? Math.max(0, Number(listing.regularPrice) - Number(listing.discountPrice)) : 0;



    return (
        <main className="bg-white">
            {/* HERO GALLERY */}
            <div className="mx-auto">
                <div className="relative overflow-hidden">
                    <Swiper navigation className="md:h-[80vh] h-[40vh]">
                        {listing?.imageUrls?.map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-full"
                                    style={{
                                        background: `url(${url}) center / cover no-repeat`,
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Overlay: share + photo count */}
                    <div className="absolute bottom-4 right-4 flex items-center gap-3 z-50 ">
                        <button
                            onClick={handleShare}
                            className="bg-white/90 backdrop-blur-md border border-[#E5E7EB] rounded-full px-4 py-2 text-sm font-medium text-[#374151] hover:bg-white transition"
                            title="Share listing"
                        >
                            <span className="inline-flex items-center gap-2">
                                <FaShare /> {copied ? 'Copied!' : 'Share'}
                            </span>
                        </button>
                        <div className="bg-white/90 backdrop-blur-md border border-[#E5E7EB] rounded-full px-3 py-2 text-xs font-semibold text-[#374151]">
                            <span className="inline-flex items-center gap-1">
                                <FaImages /> {listing?.imageUrls?.length || 0} photos
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <section className="max-w-7xl mx-auto px-4 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8 relative z-10">
                    {/* LEFT: MAIN DETAILS */}
                    <div className="lg:col-span-2 space-y-6 bg-white border border-[#E5E7EB] rounded-2xl p-6">
                        {/* Title */}
                        <div className="flex flex-wrap items-center justify-between gap-4">
                            <h1
                                className="h-heading text-2xl sm:text-3xl md:text-4xl font-bold text-[#1B1B1B] leading-tight
                           flex-1 min-w-0 break-words whitespace-pre-line"
                            >
                                {listing.name}
                            </h1>
                        </div>

                        {/* Address */}
                        <p className="flex items-start gap-2 text-[#6B7280] text-sm">
                            <FaMapMarkedAlt className="mt-0.5 text-[#00C896]" />
                            <span className="min-w-0 break-words whitespace-pre-line leading-relaxed" style={{ overflowWrap: 'anywhere' }}>
                                {listing.address}
                            </span>
                        </p>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-3 pt-2">
                            <span className="inline-block bg-[#1B1B1B] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {isRent ? 'For Rent' : 'For Sale'}
                            </span>
                            {hasOffer && (
                                <span className="inline-block bg-[#00C896] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                    Limited Offer
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <h2 className="h-heading text-xl font-semibold text-[#1B1B1B] mb-2">Description</h2>
                            <p className="text-[#374151] leading-relaxed whitespace-pre-line break-words">{listing.description}</p>
                        </div>

                        {/* Features */}
                        <div className="border-t border-[#E5E7EB] pt-6">
                            <h3 className="h-heading text-xl font-semibold text-[#1B1B1B] mb-4">Key features</h3>
                            <ul className="text-[#374151] font-medium text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                                <li className="flex items-center gap-2 whitespace-nowrap">
                                    <FaBed className="text-base text-[#9CA3AF]" />
                                    {listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                                </li>
                                <li className="flex items-center gap-2 whitespace-nowrap">
                                    <FaBath className="text-base text-[#9CA3AF]" />
                                    {listing.bathrooms} {listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
                                </li>
                                <li className="flex items-center gap-2 whitespace-nowrap">
                                    <FaParking className="text-base text-[#9CA3AF]" />
                                    {listing.parking ? 'Parking Spot' : 'No Parking'}
                                </li>
                                <li className="flex items-center gap-2 whitespace-nowrap">
                                    <FaChair className="text-base text-[#9CA3AF]" />
                                    {listing.furnished ? 'Furnished' : 'Not Furnished'}
                                </li>
                            </ul>
                        </div>

                    </div>

                    {/* RIGHT: STICKY PRICE / CTA + LISTER DETAILS */}
                    <aside className="lg:col-span-1">
                        <div className="lg:sticky lg:top-6 space-y-4">
                            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                                {/* Price */}
                                <div className="mb-3">
                                    <div className="flex items-end gap-3">
                                        <p className="text-2xl sm:text-3xl font-extrabold text-[#1B1B1B]">
                                            ₹{rupees(currentPrice)}
                                            {isRent && <span className="text-sm font-medium text-[#6B7280]"> / month</span>}
                                        </p>
                                        {hasOffer && (
                                            <span className="line-through text-[#6B7280]">₹{rupees(listing.regularPrice)}</span>
                                        )}
                                    </div>
                                    {hasOffer && youSave > 0 && (
                                        <div className="mt-2 inline-block bg-[#00C896] text-white text-xs font-semibold px-3 py-1 rounded-full">
                                            You save ₹{rupees(youSave)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Contact listing={listing} />
                            {/* Trust note */}
                            <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-4">
                                <p className="text-sm text-[#6B7280]">
                                    Verified listing. Get expert help at every step of renting or buying.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    );
};

export default Listing;
