import { Link } from 'react-router-dom';

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="bg-white text-[#1B1B1B]">
            {/* Top row: brand left, links right */}
            <div className="border-t border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto px-4 py-6
                        flex flex-col md:flex-row md:items-center md:justify-between gap-4
                        text-sm font-medium text-[#374151]">
                    {/* Left: brand */}
                    <span className="order-1 h-heading text-xl font-bold">
                        CrownRealty
                    </span>

                    {/* Right: all links */}
                    <nav className="order-2 md:ml-auto flex flex-wrap gap-6">
                        <Link to="/" className="hover:text-[#00C896]">Home</Link>
                        <Link to="/about" className="hover:text-[#00C896]">About</Link>
                        <Link to="/search" className="hover:text-[#00C896]">Properties</Link>
                        <Link to="/contact" className="hover:text-[#00C896]">Contact</Link>
                    </nav>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto px-4 py-4
                        flex flex-col sm:flex-row justify-between items-center
                        text-xs text-[#6B7280]">
                    <span>© {year} CrownRealty. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
}
