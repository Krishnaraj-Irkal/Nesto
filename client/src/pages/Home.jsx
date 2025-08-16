import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

const Home = () => {
    const [offerListings, setOfferListings] = useState([]);
    const [salelistings, setSaleListings] = useState([]);
    const [rentlistings, setRentListings] = useState([]);
    SwiperCore.use([Navigation])
    console.log(offerListings)
    useEffect(() => {
        const fetchOfferListing = async () => {
            try {
                const res = await fetch('/api/listing/get?offer=true&limit=4')
                const data = await res.json();
                setOfferListings(data);
                fetchRentListing();
            } catch (error) {
                console.log(error)
            }
        }

        const fetchRentListing = async () => {
            try {
                const res = await fetch('/api/listing/get?type=rent&limit=4')
                const data = await res.json();
                setRentListings(data);
                fetchSaleListing();
            } catch (error) {
                console.log(error)
            }
        }

        const fetchSaleListing = async () => {
            try {
                const res = await fetch('/api/listing/get?type=sale&limit=4')
                const data = await res.json();
                setSaleListings(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchOfferListing();
    }, [])

    return (
        <div>
            {/* Top Side */}
            <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span> <br />place with ease</h1>
                <div className="text-gay-400 text-xs sm:text-sm">
                    CrownEstate wil help you find your home fast, easy and comforable
                    <br />
                    Our exper support are always availabe.
                </div>
                <Link className='text-xs sm:text-sm text-blue-800 font-bold hover:underline' to={`/search`}>
                    Let's get started...
                </Link>
            </div>
            {/* Swiper */}
            <Swiper navigation>
                {
                    offerListings && offerListings.length > 0 &&
                    offerListings.map((listing) => (
                        <SwiperSlide>
                            <div style={{ background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize: 'cover' }} className="h-[500px]" key={listing._id}></div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            {/* Listing  */}
            <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
                {offerListings && offerListings.length > 0 && (
                    <div className="">
                        <div className="my-3">
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>
                                More offers
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {offerListings.map((listing => (
                                <ListingItem listing={listing} key={listing._id} />
                            )))}
                        </div>
                    </div>
                )}
                {rentlistings && rentlistings.length > 0 && (
                    <div className="">
                        <div className="my-3">
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for rent</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>
                                More offers
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {rentlistings.map((listing => (
                                <ListingItem listing={listing} key={listing._id} />
                            )))}
                        </div>
                    </div>
                )}
                {salelistings && salelistings.length > 0 && (
                    <div className="">
                        <div className="my-3">
                            <h2 className='text-2xl font-semibold text-slate-600'>Recent places for sale</h2>
                            <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>
                                More offers
                            </Link>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {salelistings.map((listing => (
                                <ListingItem listing={listing} key={listing._id} />
                            )))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    )
}

export default Home