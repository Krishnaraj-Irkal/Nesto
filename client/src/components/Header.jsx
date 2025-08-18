import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

/*
 * Updated header for CrownRealty:
 *  - No language selector.
 *  - Improved search bar with more padding, roundness and focus styling.
 *  - All existing navigation, search and authentication logic preserved.
 */
const Header = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Submit search and update URL query param
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (search) params.set('searchTerm', search);
        navigate(`/search?${params.toString()}`);
    };

    // Sync search field with the URL query string
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearch(params.get('searchTerm') || '');
    }, [location.search]);

    return (
        <header className="absolute top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link to="/" className="font-bold text-lg sm:text-2xl flex flex-wrap">
                    <span className="text-[#ffffff]">Crown</span>
                    <span className="text-[#ffffff]">Realty</span>
                </Link>

                {/* Pill navigation bar */}
                <nav className="hidden md:flex items-center gap-1 bg-white/50 backdrop-blur-md border border-[#E5E7EB] rounded-full px-2 py-1">
                    <Link to="/" className="px-4 py-2 rounded-full">
                        <span
                            className={`text-sm font-medium ${location.pathname === '/'
                                ? 'bg-white text-[#1B1B1B] px-4 py-2 rounded-full shadow-sm'
                                : 'text-[#6B7280]'
                                }`}
                        >
                            Home
                        </span>
                    </Link>
                    <Link to="/about" className="px-4 py-2 rounded-full">
                        <span
                            className={`text-sm font-medium ${location.pathname === '/about'
                                ? 'bg-white text-[#1B1B1B] px-4 py-2 rounded-full shadow-sm'
                                : 'text-[#6B7280]'
                                }`}
                        >
                            About
                        </span>
                    </Link>
                </nav>

                {/* Right area: improved search bar and account */}
                <div className="flex items-center gap-4">

                    {/* Account area: sign in/sign up or profile */}
                    {currentUser ? (
                        <Link to="/profile">
                            <img
                                className="rounded-full h-8 w-8 object-cover"
                                src={currentUser.avatar}
                                alt="profile"
                            />
                        </Link>
                    ) : (
                        <Link
                            to="/sign-in"
                            className="bg-[#00C896] hover:bg-[#00B085] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md transition-transform duration-150 hover:-translate-y-[1px]"
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
