import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Profile from "./pages/Profile"
import SignIn from "./pages/Signin"
import Header from "./components/Header"
import Footer from "./components/Footer"
import SignUp from "./pages/SignUp"


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
