import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white text-[#1B1B1B]">
            {/* Top banner with headline and contact info */}


            {/* Navigation row: left links, brand centre, right links */}
            <div className="border-t border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-sm font-medium text-[#374151]">
                    {/* Left group */}
                    <nav className="flex flex-wrap gap-6 mb-4 md:mb-0">
                        <Link to="/" className="hover:text-[#00C896]">Home</Link>
                        <Link to="/about" className="hover:text-[#00C896]">About</Link>
                        <Link to="/search" className="hover:text-[#00C896]">Properties</Link>
                        <Link to="/services" className="hover:text-[#00C896]">Services</Link>
                    </nav>
                    {/* Brand in the centre */}
                    <span className="h-heading text-xl font-bold mb-4 md:mb-0">CrownRealty</span>
                    {/* Right group */}
                    <nav className="flex flex-wrap gap-6">
                        <Link to="/gallery" className="hover:text-[#00C896]">Gallery</Link>
                        <Link to="/faq" className="hover:text-[#00C896]">FAQ</Link>
                        <Link to="/pricing" className="hover:text-[#00C896]">Pricing</Link>
                        <Link to="/contact" className="hover:text-[#00C896]">Contact</Link>
                    </nav>
                </div>
            </div>

            {/* Bottom bar with copyright and legal links */}
            <div className="border-t border-[#E5E7EB]">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center text-xs text-[#6B7280]">
                    <span>© {new Date().getFullYear()} CrownRealty. All rights reserved.</span>
                    <div className="flex space-x-4 mt-2 sm:mt-0">
                        <Link to="/terms" className="hover:text-[#00C896]">Terms &amp; Conditions</Link>
                        <Link to="/privacy" className="hover:text-[#00C896]">Privacy Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
