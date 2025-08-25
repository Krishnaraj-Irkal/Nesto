// client/src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';
import heroImg from '../assets/hero.png';
import featuredVilla from '../assets/featured-villa-exterior-hero.jpeg';
import smallSpace from '../assets/small-space-living-banner.jpeg';
import livingStyle from '../assets/crownrealty-difference-lifestyle.jpeg';
import modernKitchen from '../assets/thumb-kitchen.jpeg';
import Testimonials from '../components/Testimonials';

const Home = () => {
    const [listings, setListings] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    // Fetch latest 3 listings for the “premier houses” section
    useEffect(() => {
        async function fetchListings() {
            try {
                const res = await fetch('/api/listing/get?limit=3&sort=created_at&order=desc');
                const data = await res.json();
                setListings(data);
            } catch (err) {
                console.error(err);
            }
        }
        fetchListings();
    }, []);
    const [address, setAddress] = useState('');
    const [rooms, setRooms] = useState('');

    // Prevent page reload and trigger your existing search handler
    const onSubmit = (e) => {
        e.preventDefault();
        handleSearch(e);
    };

    // Handle quick search from hero
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchTerm) params.set('searchTerm', searchTerm);
        if (address) params.set('address', address);
        if (rooms) {
            // Extract number from room string (handles "2 bedrooms", "2 beds", "2bedroom", etc.)
            const roomNumber = rooms.match(/\d+/);

            if (roomNumber) {
                const bhkFormat = `${roomNumber[0]}bhk`;
                params.set('seatchTerm', bhkFormat);
            }
        }
        navigate(`/search?${params.toString()}`);
    };

    return (
        <>
            {/* Hero area */}
            <section
                className="relative min-h-screen sm:h-[110vh] md:h-[120vh] lg:h-[130vh] xl:h-[140vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImg})` }}
            >
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />

                <div className="relative max-w-7xl mx-auto min-h-screen sm:h-full flex flex-col justify-center sm:justify-end px-4 sm:px-6 py-8 sm:pb-12 md:pb-16">
                    {/* Category chips above the headline */}
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                        {['House', 'Apartment', 'Residential'].map((cat) => (
                            <button
                                key={cat}
                                className="px-3 py-1 sm:px-4 sm:py-1.5 bg-white/80 text-[#374151] rounded-full text-xs sm:text-sm font-medium shadow-sm hover:bg-white transition-colors"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Hero text and tagline */}
                    <div className="flex flex-col lg:flex-row items-start lg:gap-10 mb-4 sm:mb-6 md:mb-8 lg:mb-10">
                        {/* Left side: stronger headline and subheading */}
                        <div className="lg:w-2/3 mb-3 sm:mb-4 lg:mb-0">
                            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold">
                                Find Your Dream Home or Perfect Rental
                            </h1>
                        </div>

                        {/* Right side: additional descriptive text about your service */}
                        <div className="lg:w-1/3">
                            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                                Browse thousands of curated listings across India. From cozy
                                city apartments to spacious family homes, our platform connects you with the
                                properties that fit your lifestyle and budget.
                            </p>
                        </div>
                    </div>

                    {/* Search container */}
                    <form
                        onSubmit={onSubmit}
                        className="w-full bg-white bg-opacity-90 backdrop-blur-md border border-[#E5E7EB] rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 space-y-4 sm:space-y-6"
                    >
                        {/* Headline for the search form */}
                        <h2 className="text-lg sm:text-xl font-semibold text-[#1B1B1B]">
                            Find the best place
                        </h2>

                        {/* Input grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {/* Functional search field */}
                            <div className="sm:col-span-2 lg:col-span-1">
                                <label
                                    htmlFor="property-type"
                                    className="block text-xs sm:text-sm font-medium text-[#6B7280] mb-1"
                                >
                                    Looking for
                                </label>
                                <input
                                    id="property-type"
                                    type="text"
                                    placeholder="Enter type"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-3 py-2.5 sm:py-2 text-sm text-[#374151] placeholder-[#6B7280] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20"
                                />
                            </div>
                            {/* Non‑functional placeholder fields for UI only */}
                            <div>
                                <label
                                    htmlFor="location"
                                    className="block text-xs sm:text-sm font-medium text-[#6B7280] mb-1"
                                >
                                    Locations
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="Location"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-3 py-2.5 sm:py-2 text-sm text-[#374151] placeholder-[#6B7280] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="rooms"
                                    className="block text-xs sm:text-sm font-medium text-[#6B7280] mb-1"
                                >
                                    Number of rooms
                                </label>
                                <input
                                    id="rooms"
                                    type="text"
                                    placeholder="2 Bed rooms"
                                    value={rooms}
                                    onChange={(e) => setRooms(e.target.value)}
                                    className="w-full bg-[#F8F9FA] border border-[#E5E7EB] rounded-lg px-3 py-2.5 sm:py-2 text-sm text-[#374151] placeholder-[#6B7280] focus:outline-none focus:border-[#00C896] focus:ring-2 focus:ring-[#00C896]/20"
                                />
                            </div>
                        </div>

                        {/* Search button */}
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-[#1B1B1B] hover:bg-black text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:-translate-y-[1px] active:translate-y-0"
                            >
                                Search Properties
                            </button>
                        </div>
                    </form>
                </div>
            </section>

            <section className="py-20 bg-[#F8F9FA]">
                {/* Top header row */}
                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center mb-12 gap-8">
                    {/* Big headline */}
                    <h2 className="h-heading text-2xl sm:text-5xl font-semibold text-[#1B1B1B]">
                        Your primary home might begin to feel left out.
                    </h2>
                </div>

                {/* Main two‑column layout below the header */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 px-4">
                    {/* Left: slider images */}
                    <div className="relative overflow-hidden rounded-3xl">
                        <img
                            src={featuredVilla}
                            alt="Featured property"
                            className="w-full h-96 object-cover rounded-3xl"
                        />
                        <div className="absolute bottom-4 left-4 right-4 flex gap-4 overflow-x-auto">
                            {[smallSpace, modernKitchen, livingStyle].map((thumb, idx) => (
                                <img
                                    key={idx}
                                    src={thumb}
                                    alt={`thumbnail ${idx + 1}`}
                                    className="w-24 h-16 rounded-lg object-cover"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right: stacked content boxes (no shadows, neutral background) */}
                    <div className="flex flex-col space-y-8">
                        <div className="bg-[#e9e9e9] rounded-3xl p-8">
                            <h3 className="h-heading text-2xl font-semibold text-[#1B1B1B]">
                                Big things can happen in small spaces.
                            </h3>
                            <p className="text-[#6B7280] mt-4">
                                With thoughtful design and smart organisation, you can maximise every inch, making room for
                                creativity.
                            </p>
                        </div>

                        <div className="bg-[#e9e9e9] rounded-3xl p-8">
                            <h3 className="h-heading text-2xl font-semibold text-[#1B1B1B]">
                                Discover the Nesto difference
                            </h3>
                            <p className="text-[#6B7280] mt-4">
                                Our platform offers advanced search filters, verified listings and expert guidance to help
                                you find the perfect home quickly and confidently.
                            </p>
                            <button className="mt-6 bg-[#00C896] hover:bg-[#00B085] text-white px-6 py-3 rounded-lg text-sm font-medium">
                                Start your search →
                            </button>
                        </div>
                    </div>
                </div>
            </section>


            {/* Premier houses preview */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-semibold text-[#1B1B1B]">Explore our premier houses</h2>
                        <button
                            onClick={() => navigate('/search?sort=created_at&order=desc')}
                            className="bg-[#1B1B1B] hover:bg-black text-white px-5 py-2 rounded-full text-sm"
                        >
                            See All Properties →
                        </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {listings.map((listing) => (
                            <ListingItem key={listing._id} listing={listing} />
                        ))}
                    </div>
                </div>
            </section>
            {/* Testimonials */}
            <Testimonials />

            <div className="bg-white mx-auto px-12 py-12 flex flex-col md:flex-row justify-between items-start gap-8">
                {/* Left: large headline (Josefin Sans via .h-heading) */}
                <div className="md:w-2/3">
                    <h3 className="h-heading text-3xl sm:text-5xl font-bold leading-tight">
                        Discover Your Perfect Home with Expert Guidance
                    </h3>
                </div>
                <div className="md:w-1/3 flex justify-end">
                    <button
                        onClick={() => navigate('/search')}
                        className="mt-3 bg-[#00C896] hover:bg-[#00B085] text-white px-6 py-3 rounded-lg text-sm font-semibold"
                    >
                        Explore properties →
                    </button>
                </div>
            </div>


        </>
    );
};

export default Home;

