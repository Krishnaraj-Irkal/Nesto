import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { FaBed, FaBath } from 'react-icons/fa';

/*
 * ListingItem component
 *
 * This component renders an individual property card with a polished
 * design inspired by high‑end real estate sites.  It preserves all
 * existing functional props (listing data) while reorganising the
 * layout to highlight key information: status (for sale or rent),
 * number of bedrooms and bathrooms, price, address and the listing
 * name.  Images are cropped to maintain aspect ratio and only the
 * top corners are rounded to match the design language used across
 * the application.  A subtle shadow on hover conveys interactivity.
 */
export default function ListingItem({ listing }) {
    // Determine which price to display
    const price = listing.offer ? listing.discountPrice : listing.regularPrice;
    const formattedPrice = price.toLocaleString('en-IN');

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden w-full">
            <Link to={`/listing/${listing._id}`} className="block">
                {/* Image with a status badge */}
                <div className="relative">
                    <img
                        src={
                            listing.imageUrls?.[0] ||
                            'https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/Sales_Blog/real-estate-business-compressor.jpg?width=595&height=400&name=real-estate-business-compressor.jpg'
                        }
                        alt={listing.name}
                        className="w-full h-56 md:h-64 object-cover rounded-t-2xl"
                    />
                    {/* Show “For Rent” or “For Sale” depending on listing.type */}
                    <span className="absolute top-4 left-4 bg-[#1B1B1B] text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </span>
                </div>

                <div className="p-4 space-y-3">
                    {/* Features row: bedrooms and bathrooms */}
                    <div className="flex items-center text-sm text-[#6B7280] gap-4">
                        <div className="flex items-center gap-1">
                            <FaBed className="h-4 w-4" />
                            <span>
                                {listing.bedrooms} {listing.bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <FaBath className="h-4 w-4" />
                            <span>
                                {listing.bathrooms} {listing.bathrooms > 1 ? 'Bathrooms' : 'Bathroom'}
                            </span>
                        </div>
                    </div>

                    {/* Listing name */}
                    <h3 className="h-heading text-xl font-semibold text-[#1B1B1B] truncate">
                        {listing.name}
                    </h3>

                    {/* Listing price */}
                    <p className="text-lg font-bold text-[#1B1B1B]">
                        ₹{formattedPrice}
                        {listing.type === 'rent' && (
                            <span className="text-sm font-medium text-[#6B7280]"> / month</span>
                        )}
                    </p>

                    {/* Address row */}
                    <div className="flex items-center gap-1 text-sm text-[#6B7280] truncate">
                        <MdLocationOn className="h-4 w-4 text-[#00C896]" />
                        <span>{listing.address}</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}
