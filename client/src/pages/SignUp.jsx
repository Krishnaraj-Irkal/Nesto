import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import heroImg from '../assets/signup-page-image.png';

const SignUp = () => {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setLoading(false);
                setError(data.message);
                return;
            }
            setLoading(false);
            setError(null);
            navigate('/sign-in');
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <main className="bg-[#F8F9FA] min-h-screen">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-15 lg:py-12">
                {/* Desktop: 1fr + fixed 480px column; Mobile stacks */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_550px] items-center gap-8">
                    {/* Visual panel (matches Sign In) */}
                    <aside
                        className="hidden lg:block relative rounded-2xl overflow-hidden h-[710px]"
                        style={{
                            backgroundImage:
                                `linear-gradient(135deg, rgba(0,0,0,.45), rgba(0,0,0,.35)), url(${heroImg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 p-8 lg:p-10 flex flex-col justify-end gap-3">
                            <div className="text-white/90 text-sm">Get started</div>
                            <h1 className="text-white text-[34px] leading-[1.15] font-bold">
                                Join <span className="opacity-90">CrownRealty</span>
                            </h1>
                            <p className="text-white/80 max-w-[520px]">
                                Create your account to save searches, track price drops, and message owners directly.
                            </p>
                            <ul className="text-white/75 text-sm space-y-1.5 mt-1">
                                <li>• Save & compare your favourite homes</li>
                                <li>• Personalized alerts for new matches</li>
                                <li>• Seamless contact & visit scheduling</li>
                            </ul>
                        </div>
                    </aside>

                    {/* Form card (identical spacing to Sign In) */}
                    <section className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 lg:p-9 w-full">
                        <div className="mb-4">
                            <Link to="/" className="inline-flex items-baseline gap-1">
                                <span className="text-2xl font-extrabold text-[#1B1B1B]">Crown</span>
                                <span className="text-2xl font-extrabold text-[#4A4A4A]">Realty</span>
                            </Link>
                        </div>

                        <h2 className="text-[22px] font-semibold text-[#1B1B1B]">Create your account</h2>
                        <p className="text-sm text-[#6B7280] mt-1">
                            Have an account?{' '}
                            <Link to="/sign-in" className="font-semibold text-[#1B1B1B] underline">
                                Sign in
                            </Link>
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            {/* Username */}
                            <div className="flex flex-col">
                                <label htmlFor="username" className="text-sm font-medium text-[#374151]">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    placeholder="Your name"
                                    onChange={handleChange}
                                    className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                             placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm font-medium text-[#374151]">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    onChange={handleChange}
                                    className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                             placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <label htmlFor="password" className="text-sm font-medium text-[#374151]">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    placeholder="••••••••"
                                    onChange={handleChange}
                                    className="mt-1.5 bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-4 py-3 text-sm text-[#374151]
                             placeholder-[#9CA3AF] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]"
                                />
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#1B1B1B] hover:bg-black text-white rounded-lg px-4 py-3 text-sm font-semibold
                           transition-transform duration-150 hover:-translate-y-[2px] disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Creating…' : 'Create account'}
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-3 my-1.5">
                                <span className="h-px flex-1 bg-[#E5E7EB]" />
                                <span className="text-xs text-[#6B7280]">or continue with</span>
                                <span className="h-px flex-1 bg-[#E5E7EB]" />
                            </div>

                            {/* OAuth */}
                            <OAuth />
                        </form>

                        {/* Error */}
                        {error && (
                            <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                                {error}
                            </p>
                        )}

                        {/* Legal */}
                        <p className="text-xs text-[#6B7280] mt-5 text-center">
                            By continuing, you agree to our{' '}
                            <a href="#" className="underline text-[#1B1B1B]">Terms</a> and{' '}
                            <a href="#" className="underline text-[#1B1B1B]">Privacy Policy</a>.
                        </p>
                    </section>
                </div>
            </div>
        </main>
    );
};

export default SignUp;
