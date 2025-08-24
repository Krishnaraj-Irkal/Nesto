// client/src/components/Contact.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Contact({ listing }) {
    const { currentUser } = useSelector((s) => s.user);
    const [owner, setOwner] = useState(null);
    const [message, setMessage] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [loadErr, setLoadErr] = useState(false);

    // 1) Gate: if not signed in → sign in prompt
    if (!currentUser) {
        return (
            <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                <p className="text-[#374151]">
                    Please <Link to="/sign-in" className="text-[#00C896] font-semibold underline">sign in</Link> to contact the property owner.
                </p>
            </div>
        );
    }

    // 2) If the viewer is the owner → render nothing
    if (currentUser && listing?.userRef === currentUser._id) {
        return null;
    }

    // 3) Fetch owner details (abort safe)
    useEffect(() => {
        if (!listing?.userRef) return;
        const ac = new AbortController();

        (async () => {
            try {
                setLoadErr(false);
                const res = await fetch(`/api/user/${listing.userRef}`, { signal: ac.signal });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (ac.signal.aborted) return;
                if (data?.success === false) throw new Error(data?.message || 'Failed to load owner');
                setOwner(data);
            } catch (e) {
                if (!ac.signal.aborted) setLoadErr(true);
            }
        })();

        return () => ac.abort();
    }, [listing?.userRef]);

    const subject = `Regarding ${listing?.name || 'your property'}`;
    const body = message || `Hi ${owner?.username || ''},

I’m interested in "${listing?.name}". Please let me know if it’s still available and the next steps.

Thanks!`;
    const mailHref = owner?.email
        ? `mailto:${owner.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        : '#';

    return (
        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
            <h4 className="h-heading text-lg font-semibold text-[#1B1B1B]">Property owner</h4>

            {loadErr ? (
                <p className="mt-2 text-sm text-[#6B7280]">Owner details are unavailable right now.</p>
            ) : (
                <>
                    {/* Owner row */}
                    <div className="mt-3 flex items-center gap-3">
                        {owner?.avatar || owner?.photo ? (
                            <img
                                src={owner.avatar || owner.photo}
                                alt={owner?.username || 'Owner'}
                                className="h-10 w-10 rounded-full object-cover border border-[#E5E7EB]"
                            />
                        ) : (
                            <div className="h-10 w-10 rounded-full bg-[#F8F9FA] border border-[#E5E7EB] flex items-center justify-center text-sm font-semibold text-[#374151]">
                                {(owner?.username?.[0] || 'U').toUpperCase()}
                            </div>
                        )}

                        <div className="min-w-0">
                            <p className="font-semibold text-[#1B1B1B] truncate">{owner?.username || 'Owner'}</p>
                            {owner?.email && (
                                <a href={`mailto:${owner.email}`} className="text-sm text-[#00C896] hover:underline break-all">
                                    {owner.email}
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Reveal message step */}
                    {!showForm ? (
                        <button
                            type="button"
                            onClick={() => setShowForm(true)}
                            className="mt-4 w-full bg-[#1B1B1B] hover:bg-black text-white rounded-lg px-4 py-2 text-sm font-semibold transition"
                        >
                            Write a message
                        </button>
                    ) : (
                        <>
                            <label htmlFor="message" className="block text-sm font-medium text-[#374151] mt-4">
                                Your message
                            </label>
                            <textarea
                                id="message"
                                rows={3}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Introduce yourself and share your preferred dates for a visit…"
                                className="mt-1.5 w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                           placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                            />

                            <div className="mt-3 flex gap-2">
                                {owner?.email && (
                                    <a
                                        href={mailHref}
                                        className="flex-1 text-center bg-[#00C896] hover:bg-[#00B085] text-white rounded-lg px-4 py-2 text-sm font-semibold transition"
                                    >
                                        Send email
                                    </a>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 text-sm font-semibold border border-[#E5E7EB] rounded-lg text-[#1B1B1B] bg-[#F8F9FA] hover:bg-[#F3F4F6] transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
