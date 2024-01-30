'use client';
import '../../globals.css';
import Navbar from '@/app/_components/navbar';
import { useState } from 'react';

export default function LoginPage() {
    // document.cookie = 'jwt=YourJWTToken; path=/; max-age=3600; secure; samesite=strict';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function signIn() {
        fetch('http://localhost:3000/api/user/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ loginEmail: email, password: password }),
        })
            .then((res) => {
                if(res.status === 400){
                    alert("Invalid email or password");
                    return;
                }
                return res.json();
            })
            .then((data) => {
                document.cookie = `jwt=${data.token}; path=/; max-age=86400; secure; samesite=strict`;
                window.location.href = '/user/dashboard';
            })
            .catch((err) => {
                console.log(err);
            });
    }

    //create a login page
    return (
        <div>
            <Navbar type="user" loggedIn={false} />
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black"
                            id="email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-black mb-3"
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
                            type="button" onClick={signIn}
                        >
                            Sign In
                        </button>
                        <a
                            className="inline-block align-baseline font-bold text-sm text-teal-500 hover:text-teal-800"
                            href="/user/register"
                        >
                            Register
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}