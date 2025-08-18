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

const About = () => {
    return (
        <main className="bg-white">
            {/* HERO */}
            <section
                className="relative h-[56vh] bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/about-hero.jpg')" }} // replace if needed
                aria-label="About CrownRealty"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
                <div className="relative max-w-7xl mx-auto h-full flex flex-col justify-center px-4">
                    <div className="flex flex-col lg:flex-row items-start lg:items-end gap-6">
                        <h1 className="h-heading text-white text-4xl sm:text-5xl leading-tight lg:w-2/3">
                            We make finding a home clear, confident, and human.
                        </h1>
                        <p className="text-white/90 lg:w-1/3">
                            CrownRealty brings verified listings, smart search, and expert guidance together so you can move forward
                            with certainty—whether you’re renting or buying.
                        </p>
                    </div>

                    {/* Hero quick facts */}
                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl">
                        {[
                            { k: '100%', v: 'Client satisfaction' },
                            { k: '500+', v: 'Properties sold' },
                            { k: '150+', v: 'Cities & localities' },
                            { k: '2,00+', v: 'Verified reviews' },
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
                            make decisions confidently.
                        </p>
                        <ul className="space-y-3 text-[#374151]">
                            {[
                                'Verified listings and transparent info',
                                'Smart filters with price, amenities, and offers',
                                'Secure sign-in and saved searches',
                                'Dedicated guidance from enquiry to closing',
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
                                Powerful filters and recommendations to surface the right homes faster.
                            </p>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <FaShieldAlt className="text-2xl text-[#00C896]" />
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Verified listings</h3>
                            <p className="text-sm text-[#6B7280] mt-2">Authentic photos, clear specs, and transparent pricing.</p>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <FaHandshake className="text-2xl text-[#00C896]" />
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Human support</h3>
                            <p className="text-sm text-[#6B7280] mt-2">From shortlist to site-visit—our experts are with you.</p>
                        </div>
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                            <FaLeaf className="text-2xl text-[#00C896]" />
                            <h3 className="mt-3 font-semibold text-[#1B1B1B]">Modern & mindful</h3>
                            <p className="text-sm text-[#6B7280] mt-2">Thoughtful design and sustainable choices where possible.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* VALUES STRIP */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="h-heading text-3xl font-semibold text-[#1B1B1B]">What we value</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                        {[
                            { icon: <FaHome />, title: 'Trust first', text: 'Accuracy over hype. Details you can rely on.' },
                            { icon: <FaSearch />, title: 'Clarity', text: 'Clean design, quick comparisons, simple decisions.' },
                            { icon: <FaHandshake />, title: 'Care', text: 'People > properties. We lead with empathy.' },
                            { icon: <FaStar />, title: 'Delight', text: 'From micro-interactions to fast pages—we sweat details.' },
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
            <section className="py-16 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="h-heading text-3xl font-semibold text-[#1B1B1B]">Our journey</h2>
                    <div className="mt-10 relative">
                        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-[2px] bg-[#E5E7EB]" />
                        <div className="space-y-10">
                            {[
                                {
                                    year: '2023',
                                    title: 'CrownRealty is born',
                                    body: 'We set out to build a faster, cleaner, more trustworthy home-search experience.',
                                },
                                {
                                    year: '2024',
                                    title: 'Verified data & offers',
                                    body: 'Discounts, transparent pricing, and better photos became core to our marketplace.',
                                },
                                {
                                    year: '2025',
                                    title: 'Scaling across cities',
                                    body: 'Smarter filters, improved messaging, and a refined design system for consistency.',
                                },
                            ].map((t, i) => (
                                <div
                                    key={t.year}
                                    className={`flex flex-col sm:flex-row items-start gap-4 ${i % 2 ? 'sm:flex-row-reverse' : ''
                                        }`}
                                >
                                    <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 sm:w-1/2">
                                        <div className="text-xs font-semibold text-[#00C896]">{t.year}</div>
                                        <h3 className="mt-1 font-semibold text-[#1B1B1B]">{t.title}</h3>
                                        <p className="mt-2 text-sm text-[#6B7280]">{t.body}</p>
                                    </div>
                                    <div className="hidden sm:block sm:w-1/2" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* TEAM PREVIEW (placeholders) */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-end justify-between">
                        <h2 className="h-heading text-3xl font-semibold text-[#1B1B1B]">Meet the team</h2>
                        <a
                            href="#!"
                            className="text-sm font-semibold text-[#1B1B1B] border border-[#E5E7EB] rounded-full px-4 py-2 hover:bg-[#F8F9FA] transition"
                        >
                            We’re hiring →
                        </a>
                    </div>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-4">
                                <div className="h-40 w-full rounded-xl bg-[#F8F9FA]" aria-hidden />
                                <div className="mt-3">
                                    <div className="font-semibold text-[#1B1B1B]">Teammate {i}</div>
                                    <div className="text-sm text-[#6B7280]">Role title</div>
                                </div>
                            </div>
                        ))}
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
