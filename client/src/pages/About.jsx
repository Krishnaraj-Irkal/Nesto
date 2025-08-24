// client/src/pages/About.jsx
import React from 'react';
import {
    FaCheckCircle,
    FaHome,
    FaSearch,
    FaHandshake,
    FaLeaf,
    FaShieldAlt,
    FaStar,
} from 'react-icons/fa';
import heroImg from '../assets/aboutus.png';

const About = () => {
    return (
        <main className="bg-white">
            {/* HERO — full viewport height */}
            <section
                className="relative h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImg})` }} // swap if needed
                aria-label="About Nesto"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
                <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-end py-10 px-4">
                    {/* Headline & subcopy */}
                    <div className="flex flex-col lg:flex-row items-start lg:items-start gap-6">
                        <h1 className="h-heading text-white text-4xl sm:text-5xl leading-tight lg:w-2/3">
                            We make finding a home clear, confident, and human.
                        </h1>
                        <p className="text-white/90 lg:w-1/3">
                            Nesto brings verified listings, sharp search, and expert guidance together so you can move forward
                            with certainty—whether you’re renting or buying.
                        </p>
                    </div>

                    {/* Hero quick facts */}
                    <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
                        {[
                            { k: '100%', v: 'Client satisfaction' },
                            { k: '500+', v: 'Properties sold' },
                            { k: '150+', v: 'Cities & localities' },
                            { k: '2,000+', v: 'Verified reviews' },
                        ].map((i) => (
                            <div
                                key={i.k}
                                className="bg-white/90 backdrop-blur-md border border-[#E5E7EB] rounded-xl p-4 text-center"
                            >
                                <div className="text-xl font-extrabold text-[#1B1B1B]">{i.k}</div>
                                <div className="text-xs text-[#6B7280]">{i.v}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* WHO WE ARE */}
            <section className="py-16 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
                    <div className="space-y-6">
                        <h2 className="h-heading text-3xl font-semibold text-[#1B1B1B]">Who we are</h2>
                        <p className="text-[#374151] leading-relaxed">
                            We’re a full-stack real estate platform built for speed, trust, and clarity. Our marketplace combines
                            high-quality imagery, transparent pricing, and powerful filters—so you can compare properties quickly and
                            make decisions confidently. Save your favourites, track price drops, and message owners in one place.
                        </p>
                        <ul className="space-y-3 text-[#374151]">
                            {[
                                'Verified listings with real photos & clear specs',
                                'Smart filters by price, amenities, offers & recency',
                                'Secure auth, saved searches and alerts',
                                'Human support from enquiry to closing',
                            ].map((t) => (
                                <li key={t} className="flex items-start gap-3">
                                    <FaCheckCircle className="mt-[2px] text-[#00C896]" />
                                    <span>{t}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <FaSearch className="text-2xl text-[#00C896]" />
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Advanced search</h3>
                            <p className="text-sm text-[#6B7280] mt-2">
                                Powerful filters and recommendations surface the right homes faster.
                            </p>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <FaShieldAlt className="text-2xl text-[#00C896]" />
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Verified listings</h3>
                            <p className="text-sm text-[#6B7280] mt-2">Authentic media, clear specs, and transparent pricing.</p>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <FaHandshake className="text-2xl text-[#00C896]" />
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Human support</h3>
                            <p className="text-sm text-[#6B7280] mt-2">From shortlist to site-visit—experts by your side.</p>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <FaLeaf className="text-2xl text-[#00C896]" />
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Modern & mindful</h3>
                            <p className="text-sm text-[#6B7280] mt-2">Thoughtful design and sustainable choices where possible.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUE PILLARS */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="h-heading text-3xl font-semibold text-[#1B1B1B]">What we value</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: <FaHome />, title: 'Trust first', text: 'Accuracy over hype. Details you can rely on.' },
                            { icon: <FaSearch />, title: 'Clarity', text: 'Clean design, quick comparisons, simple decisions.' },
                            { icon: <FaHandshake />, title: 'Care', text: 'People > properties. We lead with empathy.' },
                            { icon: <FaStar />, title: 'Delight', text: 'From micro-interactions to speed—we sweat details.' },
                        ].map((c) => (
                            <div key={c.title} className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                                <div className="text-[#00C896] text-2xl">{c.icon}</div>
                                <h3 className="mt-3 font-semibold text-[#1B1B1B]">{c.title}</h3>
                                <p className="text-sm text-[#6B7280] mt-2">{c.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TIMELINE */}
            {/* HOW IT WORKS (replaces timeline) */}
            <section className="py-16 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="h-heading text-3xl font-semibold text-[#1B1B1B]">
                        How Nesto helps you
                    </h2>

                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Step 01 */}
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00C896]/10 text-[#00C896] text-sm font-semibold">01</span>
                                <div className="text-[#00C896] text-xl"><FaSearch /></div>
                            </div>
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Discover</h3>
                            <p className="text-sm text-[#6B7280] mt-2">
                                Search verified listings with powerful filters for type, price, amenities, and offers.
                            </p>
                        </div>

                        {/* Step 02 */}
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00C896]/10 text-[#00C896] text-sm font-semibold">02</span>
                                <div className="text-[#00C896] text-xl"><FaStar /></div>
                            </div>
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Compare</h3>
                            <p className="text-sm text-[#6B7280] mt-2">
                                Clear photos, transparent pricing, and saved searches make side-by-side decisions easy.
                            </p>
                        </div>

                        {/* Step 03 */}
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00C896]/10 text-[#00C896] text-sm font-semibold">03</span>
                                <div className="text-[#00C896] text-xl"><FaHandshake /></div>
                            </div>
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Connect</h3>
                            <p className="text-sm text-[#6B7280] mt-2">
                                Message owners securely, schedule visits, and keep conversations in one place.
                            </p>
                        </div>

                        {/* Step 04 */}
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#00C896]/10 text-[#00C896] text-sm font-semibold">04</span>
                                <div className="text-[#00C896] text-xl"><FaHome /></div>
                            </div>
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Close</h3>
                            <p className="text-sm text-[#6B7280] mt-2">
                                Get guidance from enquiry to closing—confident, simple, and fast.
                            </p>
                        </div>
                    </div>

                    {/* Credibility strip (optional, lightweight & useful for a portfolio) */}
                    <div className="mt-8 bg-white border border-[#E5E7EB] rounded-2xl p-6">
                        <h3 className="font-semibold text-[#1B1B1B]">Why choose Nesto</h3>
                        <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm text-[#374151]">
                            <li className="flex items-start gap-2"><FaCheckCircle className="mt-[2px] text-[#00C896]" /> Verified listings & clear pricing</li>
                            <li className="flex items-start gap-2"><FaCheckCircle className="mt-[2px] text-[#00C896]" /> Secure authentication & saved searches</li>
                            <li className="flex items-start gap-2"><FaCheckCircle className="mt-[2px] text-[#00C896]" /> Modern UI for quick comparison</li>
                            <li className="flex items-start gap-2"><FaCheckCircle className="mt-[2px] text-[#00C896]" /> Human support whenever you need it</li>
                        </ul>
                    </div>
                </div>
            </section>


            {/* CTA */}
            <section className="py-16 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="rounded-3xl bg-[#1B1B1B] text-white px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <div>
                            <h3 className="h-heading text-2xl font-semibold">Ready to find your next home?</h3>
                            <p className="text-white/80 mt-2">
                                Explore verified listings, compare quickly, and move with confidence.
                            </p>
                        </div>
                        <a
                            href="/search"
                            className="bg-[#00C896] hover:bg-[#00B085] text-white px-6 py-3 rounded-lg text-sm font-semibold transition-transform duration-150 hover:-translate-y-[2px]"
                        >
                            Explore properties
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
