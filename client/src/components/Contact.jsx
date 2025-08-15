import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Contact({ listing }) {
    const [landloard, setLandloard] = useState(null);
    const [message, setMessage] = useState('')
    const onChange = (e) => {
        setMessage(e.target.value)
    }
    useEffect(() => {
        const fetchLandloard = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`);
                const data = await res.json();
                setLandloard(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchLandloard()
    }, [listing.userRef]);
    return (
        <>
            {landloard && (
                <div className='flex flex-col gap-2'>
                    <p>Contact <span className='font-semibold'>{landloard.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
                    <textarea className='w-full border p-3 rounded-lg' placeholder='Enter your message here' onChange={onChange} value={message} name="message" id="message" rows='2' ></textarea>
                    <Link className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95' to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`}>
                        Send Message
                    </Link>
                </div>
            )}
        </>
    )
}

