import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { FiUser } from 'react-icons/fi';

const HERO_ROUTES = ['/', '/about-us', '/contact-us', '/search'];

export default function Header() {
    const { currentUser } = useSelector((s) => s.user);
    const [search, setSearch] = useState('');
    const [onHero, setOnHero] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // keep URL<->search in sync even if we don’t render the input here
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearch(params.get('searchTerm') || '');
    }, [location.search]);

    const handleSearchSubmit = (e) => {
        e?.preventDefault?.();
        const params = new URLSearchParams();
        if (search) params.set('searchTerm', search);
        navigate(`/search?${params.toString()}`);
    };

    // Detect hero presence or use route fallback
    useEffect(() => {
        const hasHero = !!document.querySelector('[data-hero="true"]');
        setOnHero(hasHero || HERO_ROUTES.includes(location.pathname));
    }, [location.pathname]);

    const linkClass = (path) => {
        const active = location.pathname === path;
        if (onHero) {
            return `px-3 py-1.5 rounded-full text-sm font-medium transition ${active
                ? 'bg-white text-[#1B1B1B] shadow-sm'
                : 'text-white/90 hover:text-white'
                }`;
        }
        return `px-3 py-1.5 rounded-full text-sm font-medium transition ${active
            ? 'bg-[#F8F9FA] text-[#1B1B1B]'
            : 'text-[#6B7280] hover:text-[#1B1B1B]'
            }`;
    };

    return (
        <header className={`${onHero ? 'absolute top-3' : 'relative mt-3'} left-0 right-0 z-50 mb-2`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-4">
                <div
                    className={[
                        'flex items-center justify-between gap-3 rounded-full px-3 sm:px-3 py-3 backdrop-blur-lg',
                        onHero
                            // translucent pill for dark hero sections
                            ? 'border border-white/30'
                            // solid pill for light backgrounds
                            : 'bg-white/95 border border-[#E5E7EB] shadow-md'
                    ].join(' ')}
                    style={
                        onHero
                            ? {
                                background:
                                    'linear-gradient(180deg, rgba(244,244,244,0.25) 0%, rgba(244,244,244,0.30) 100%)',
                            }
                            : undefined
                    }
                >
                    {/* Brand */}
                    <Link to="/" title="Nesto Home" aria-label="Nesto Home">
                        <img
                            src={onHero ? '/nesto-logo-text-white.svg' : '/nesto-logo-text-black.svg'}
                            alt="Nesto Logo"
                            className="h-4 w-auto transition"
                        />
                    </Link>

                    {/* Center nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        <Link to="/" className={linkClass('/')} title="Home">Home</Link>
                        <Link to="/about-us" className={linkClass('/about-us')} title="About Us">About Us</Link>
                        <Link
                            to="/search"
                            className={linkClass('/search')}
                            title="Property List"
                            onClick={(e) => {
                                if (!location.pathname.startsWith('/search')) handleSearchSubmit(e);
                            }}
                        >
                            Property List
                        </Link>
                        <Link to="/contact-us" className={linkClass('/contact-us')} title="Contact Us">
                            Contact Us
                        </Link>
                    </nav>

                    {/* Right: profile/sign-in */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {currentUser ? (
                            <Link
                                to="/profile"
                                className={[
                                    'h-8 w-8 overflow-hidden rounded-full flex items-center justify-center',
                                    onHero ? 'ring-1 ring-white/40 bg-white/20' : 'ring-1 ring-[#E5E7EB] bg-white'
                                ].join(' ')}
                                title="Profile"
                            >
                                {currentUser.avatar ? (
                                    <img src={currentUser.avatar} alt="profile" className="h-full w-full object-cover" />
                                ) : (
                                    <FiUser className={onHero ? 'text-white' : 'text-[#1B1B1B]'} size={18} />
                                )}
                            </Link>
                        ) : (
                            <Link
                                to="/sign-in"
                                className={[
                                    'h-8 px-4 rounded-full flex items-center justify-center text-sm font-semibold transition',
                                    onHero
                                        ? 'text-white bg-white/20 ring-1 ring-white/40 hover:bg-white/30'
                                        : 'text-white bg-[#1B1B1B] hover:bg-black'
                                ].join(' ')}
                                title="Sign In"
                                aria-label="Sign In"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
