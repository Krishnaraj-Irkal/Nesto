import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import SignIn from "./pages/SignIn"
import Header from "./components/Header"
import Footer from "./components/Footer"
import CreateListing from './pages/CreatingListing'
import SignUp from "./pages/SignUp"
import PrivateRoute from "./components/PrivateRoute"
import UpdateListing from "./pages/UpdateListing"
import Listing from "./pages/Listing"
import Search from "./pages/Search"
import Contact from './pages/ContactUs'


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/update-listing/:listingId" element={<UpdateListing />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
