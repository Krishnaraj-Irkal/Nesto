import React from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });
            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.error('Google sign in error:', error);
        }
    };

    return (
        <button
            type="button"
            onClick={handleGoogleClick}
            className="w-full inline-flex items-center justify-center gap-3
                 bg-white border border-[#E5E7EB] text-[#1B1B1B]
                 px-4 py-3 rounded-lg text-sm font-semibold
                 hover:bg-[#F8F9FA]
                 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-[#00C896]
                 transition"
            aria-label="Continue with Google"
        >
            {/* Google 'G' */}
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.826 32.66 29.274 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.911 6.053 29.728 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20c10.493 0 19.127-8.056 19.127-20 0-1.341-.147-2.651-.416-3.917z" />
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.818C14.5 16.019 18.9 12 24 12c3.059 0 5.842 1.153 7.961 3.039l5.657-5.657C34.911 6.053 29.728 4 24 4 16.318 4 9.678 8.337 6.306 14.691z" />
                <path fill="#4CAF50" d="M24 44c5.186 0 9.944-1.98 13.52-5.22l-6.234-5.274C29.22 35.338 26.77 36 24 36c-5.248 0-9.783-3.318-11.41-7.953l-6.5 5.01C8.4 39.692 15.63 44 24 44z" />
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-1.054 3.044-3.196 5.267-5.717 6.524.001-.001 6.234 5.274 6.234 5.274l.433.309C39.35 36.205 44 31.047 44 24c0-1.341-.147-2.651-.389-3.917z" />
            </svg>
            Continue with Google
        </button>
    );
};

export default OAuth;
