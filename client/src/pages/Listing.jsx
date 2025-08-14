import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

const Listing = () => {
    SwiperCore.use([Navigation]);
    const params = useParams();
    const listingId = params.listingId;
    const [listing, setListing] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        const fetchListing = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/listing/get/${listingId}`)
                const data = await res.json();
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setListing(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false)
            }
        }
        fetchListing()
    }, [listingId])
    return (
        <main>
            {loading && (<p className='text-center my-7 text-2xl'>Loading...</p>)}
            {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
            {listing && (
                <>
                    <Swiper navigation>
                        {listing.imageUrls.map((url) => {
                            return (
                                <SwiperSlide key={url}>
                                    <div className="h-[500px]" style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}></div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </>
            )}
        </main>
    )
}

export default Listing