import React, { useMemo, useState, useEffect, useRef } from 'react';
import testimonials from '../assets/testimonials';

// const avatarsForCluster = (items) => items.slice(0, 3);

export default function Testimonials() {
    const items = useMemo(() => testimonials ?? [], []);
    console.log(items)
    const [idx, setIdx] = useState(0);
    const active = items[idx] ?? {};
    const gridRef = useRef(null);

    const next = () => setIdx((i) => (i + 1) % items.length);
    const prev = () => setIdx((i) => (i - 1 + items.length) % items.length);

    // Keyboard support: ← →
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    if (!items.length) return null;

    return (
        <section className="py-20 bg-[#F8F9FA]">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header row */}
                <div className="flex items-start justify-between">
                    <h2 className="h-heading text-3xl sm:text-4xl font-semibold text-[#1B1B1B]">
                        What our clients say<br className="hidden sm:block" /> about us
                    </h2>

                </div>

                {/* Content grid */}
                <div className="relative mt-12 flex flex-col md:flex-row gap-5">
                    {/* Left: portrait (defines the height) */}
                    <div className="rounded-3xl overflow-hidden aspect-square w-[260px] sm:w-[320px] md:w-[380px] md:ml-[100px] flex-shrink-0">
                        <img
                            src={active.avatar}
                            alt={active.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right: quote card — same height as left */}
                    <div className="bg-white rounded-3xl border border-[#F3F4F6] p-8 md:p-10 h-[260px] sm:h-[340px] md:h-[420px] md:mr-[100px] flex-1 min-w-0 flex flex-col justify-between overflow-y-auto">
                        <svg className="w-8 h-8 text-[#00C896]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M7.5 5C4.46 5 2 7.46 2 10.5V19h8v-8H7c.02-1.65 1.35-3 3-3V5H7.5zm9 0C13.46 5 11 7.46 11 10.5V19h8v-8h-3c.02-1.65 1.35-3 3-3V5H16.5z" />
                        </svg>

                        <p className="mt-5 text-xl sm:text-2xl text-[#374151] leading-8 sm:leading-9">
                            {active.quote}
                        </p>

                        <div className="pt-6">
                            <p className="text-[#1B1B1B] font-semibold">{active.name}</p>
                            <p className="text-[#6B7280] text-sm">
                                {active.role}{active.location ? ` · ${active.location}` : ''}
                            </p>
                        </div>
                    </div>

                    {/* Arrows (unchanged) */}
                    <button
                        type="button"
                        onClick={prev}
                        aria-label="Previous testimonial"
                        className="hidden md:flex absolute left-[-16px] top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F8F9FA] transition"
                    >
                        ←
                    </button>
                    <button
                        type="button"
                        onClick={next}
                        aria-label="Next testimonial"
                        className="hidden md:flex absolute right-[-16px] top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full border border-[#E5E7EB] bg-white hover:bg-[#F8F9FA] transition"
                    >
                        →
                    </button>
                </div>



                {/* Dots */}
                <div className="mt-6 flex items-center justify-center gap-2">
                    {items.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setIdx(i)}
                            aria-label={`Go to testimonial ${i + 1}`}
                            className={`h-2 w-2 rounded-full transition ${i === idx ? 'bg-[#00C896]' : 'bg-[#E5E7EB]'
                                }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
