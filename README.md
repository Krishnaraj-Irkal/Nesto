# Nesto

Nesto is a modern MERN web app for discovering, listing, and managing residential properties for **rent** and **sale**. It combines a clean UI, fast search, and trustworthy details so users can make decisions with confidence.

---

## What you can do

- **Browse properties**  
  Explore verified listings with full-bleed image galleries, clear specs, and rupee pricing.

- **Powerful search & filters**  
  Search by name/description and filter by type (Rent/Sale), amenities (Parking, Furnished), offers, and sort by price or recency.

- **Create & manage listings**  
  Owners can add, edit, and delete listings (up to 6 images, first becomes the cover). Cloud-based image uploads with size checks.

- **See key details at a glance**  
  Bedrooms, bathrooms, furnished/parking status, rent vs sale badges, discount and “You save” info (when applicable).

- **Contact the lister**  
  View owner details on the listing page and send an email via your email app (hidden if you’re the owner).

- **Secure sign in**  
  Email/password and Google sign-in. Profile page for updating avatar, username, email, and password.

- **Responsive, accessible UI**  
  Consistent design system, readable typography, and mobile-first layouts.

---

## Pages at a glance

- **Home** – Hero with search + quick filters; featured content.
- **Search** – Banner hero with background image; filters in a clean card.
- **Listing detail** – Swiper image gallery, sticky price/CTA, features, and lister info.
- **Create / Update listing** – Two-column form with a sticky images panel and Upload flow.
- **Profile** – Update account info and manage your own listings.
- **Auth (Sign In / Sign Up)** – Matching layouts with Google OAuth.
- **About** – Full-height hero, who we are, and value highlights.
- **Contact** – Simple form that opens the user’s email app with prefilled details.

---

## Why users like it

- **Clarity**: clean cards, solid contrast, and predictable navigation.  
- **Speed**: minimal friction from search to contact.  
- **Trust**: verified listing details, consistent formatting, and owner visibility.

---

## Tech (brief)

- **Frontend**: React (Vite), React Router, Redux Toolkit, Tailwind utilities, Swiper.
- **Auth**: Email/password + Google (Firebase).
- **Images**: Cloudinary unsigned uploads (size-limited).
- **Backend**: Node.js, Express, MongoDB (REST APIs under `/api`).

---

## Quick start (dev)

```bash
# server
npm i
nodemon api/index.js

# client
cd client
npm install
npm run dev
