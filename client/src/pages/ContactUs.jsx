import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import heroImg from '../assets/contactus-page.png';

export default function Contact() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) =>
        setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

    // Handoff to email client (no API change)
    const handleSubmit = (e) => {
        e.preventDefault();
        const to = 'hello@nesto.com'; // change if needed
        const subject = encodeURIComponent(`Nesto — ${form.subject || 'New enquiry'}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    };

    const details = [
        {
            icon: <FaMapMarkerAlt />,
            title: 'Our office',
            text: 'Hubballi, Karnataka, India',
            extra: 'Mon–Sat, 10:00–18:00',
        },
        {
            icon: <FaPhoneAlt />,
            title: 'Call us',
            text: '+91 831-000-0000',
            extra: 'We respond within business hours',
            href: 'tel:+918310000000',
        },
        {
            icon: <FaEnvelope />,
            title: 'Email',
            text: 'hello@nesto.com',
            extra: 'We reply within 24 hours',
            href: 'mailto:hello@nesto.com',
        },
        {
            icon: <FaClock />,
            title: 'Working hours',
            text: 'Mon–Sat',
            extra: '10:00 AM – 6:00 PM IST',
        },
    ];

    const faqs = [
        {
            q: 'Do you verify listings?',
            a: 'Yes — we prioritize verified photos, transparent pricing, and clear amenities so you can decide confidently.',
        },
        {
            q: 'Can I schedule a visit?',
            a: 'Of course. Use the contact form or listing “Contact landlord” to request a visit slot.',
        },
        {
            q: 'Do you support rentals and sales?',
            a: 'Both. Filter by Rent/Sale on the search page to see what fits your needs.',
        },
    ];

    return (
        <main className="bg-white">
            {/* HERO */}
            <section
                className="relative h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImg})` }} // provide this image
                aria-label="Contact Nesto"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
                <div className="relative max-w-7xl mx-auto h-full flex items-end px-4 py-10">
                    <div className="w-full">
                        <h1 className="text-white text-4xl sm:text-5xl font-bold leading-tight">
                            Let’s talk about your next home.
                        </h1>
                        <p className="text-white/90 mt-3 max-w-2xl">
                            Reach out for property tours, pricing questions, or help shortlisting homes. We’ll get back within
                            one business day.
                        </p>

                        {/* Quick badges */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            {['Verified listings', 'Expert guidance', 'Fast responses'].map((t) => (
                                <span
                                    key={t}
                                    className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#E5E7EB]
                             text-[#1B1B1B] rounded-full px-3 py-1.5 text-xs font-medium"
                                >
                                    <FaCheck className="text-[#00C896]" /> {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT CONTENT */}
            <section className="py-16 bg-[#F8F9FA]">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: contact info cards */}
                    <aside className="space-y-6.5">
                        {details.map((d) => (
                            <div key={d.title} className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                                <div className="flex items-start gap-3">
                                    <div className="text-[#00C896] text-xl shrink-0">{d.icon}</div>
                                    <div>
                                        <div className="font-semibold text-[#1B1B1B]">{d.title}</div>
                                        {d.href ? (
                                            <a href={d.href} className="text-sm text-[#374151] underline underline-offset-2">
                                                {d.text}
                                            </a>
                                        ) : (
                                            <div className="text-sm text-[#374151]">{d.text}</div>
                                        )}
                                        <div className="text-xs text-[#6B7280] mt-1">{d.extra}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </aside>

                    {/* Middle + Right: form */}
                    <section className="lg:col-span-2">
                        <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8">
                            <h2 className="text-2xl font-semibold text-[#1B1B1B]">Send us a message</h2>
                            <p className="text-sm text-[#6B7280] mt-1">
                                Fill out the form and our team will get back to you shortly.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
                                {/* Name */}
                                <div className="flex flex-col">
                                    <label htmlFor="name" className="text-sm font-medium text-[#374151]">
                                        Full name
                                    </label>
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm
                               text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896]
                               focus:ring-2 focus:ring-[#00C896]"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="flex flex-col">
                                    <label htmlFor="email" className="text-sm font-medium text-[#374151]">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm
                               text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896]
                               focus:ring-2 focus:ring-[#00C896]"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col">
                                    <label htmlFor="phone" className="text-sm font-medium text-[#374151]">
                                        Phone
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={form.phone}
                                        onChange={handleChange}
                                        placeholder="+91"
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm
                               text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896]
                               focus:ring-2 focus:ring-[#00C896]"
                                    />
                                </div>

                                {/* Subject */}
                                <div className="flex flex-col">
                                    <label htmlFor="subject" className="text-sm font-medium text-[#374151]">
                                        Subject
                                    </label>
                                    <input
                                        id="subject"
                                        name="subject"
                                        type="text"
                                        value={form.subject}
                                        onChange={handleChange}
                                        placeholder="I’m interested in…"
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm
                               text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896]
                               focus:ring-2 focus:ring-[#00C896]"
                                    />
                                </div>

                                {/* Message (full width) */}
                                <div className="md:col-span-2 flex flex-col">
                                    <label htmlFor="message" className="text-sm font-medium text-[#374151]">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows="5"
                                        value={form.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about the property, location, budget, or timelines…"
                                        className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm
                               text-[#374151] placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896]
                               focus:ring-2 focus:ring-[#00C896] resize-y"
                                        required
                                    />
                                </div>

                                {/* Submit */}
                                <div className="md:col-span-2 flex items-center justify-between gap-3">
                                    <p className="text-xs text-[#6B7280]">
                                        By submitting, you agree to our Terms & Privacy Policy.
                                    </p>
                                    <button
                                        type="submit"
                                        className="bg-[#1B1B1B] hover:bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold
                               transition-transform duration-150 hover:-translate-y-[2px]"
                                    >
                                        Send message
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                </div>
            </section>

            {/* MAP + FAQ */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="rounded-2xl overflow-hidden border border-[#E5E7EB]">
                        {/* Simple Google Maps embed (Hubballi) */}
                        <iframe
                            title="Nesto Location"
                            src="https://www.google.com/maps?q=Hubballi%2C%20Karnataka&z=12&output=embed"
                            width="100%"
                            height="380"
                            style={{ border: 0 }}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>

                    <div className="bg-[#F8F9FA] border border-[#E5E7EB] rounded-2xl p-6 md:p-8">
                        <h3 className="text-xl font-semibold text-[#1B1B1B]">Frequently asked</h3>
                        <div className="mt-4 divide-y divide-[#E5E7EB]">
                            {faqs.map((f) => (
                                <details key={f.q} className="group py-4">
                                    <summary className="cursor-pointer list-none flex items-center justify-between text-[#1B1B1B] font-medium">
                                        {f.q}
                                        <span className="ml-4 text-[#6B7280] group-open:rotate-45 transition">+</span>
                                    </summary>
                                    <p className="mt-2 text-sm text-[#374151]">{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
