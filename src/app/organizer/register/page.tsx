'use client'

import Navbar from '@/app/_components/navbar';
import '../../globals.css';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter();

    function handleSubmit(e: any) {
        e.preventDefault();
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries());
        console.log(value);


        fetch('http://localhost:3000/api/organizer/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
            .then((res) => {
                if (res.status === 400) {
                    alert("Invalid email or password");
                    return;
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                router.push('/oganizer/login');
            }).catch((err) => {
                console.log(err);
            });
    }

    // name String
    // password String
    // address String
    // phone String
    // email String @unique
    return (
        <div>
            <Navbar type="organizer" loggedIn={false}/>
            <div className="flex justify-center items-center min-h-screen">
                <div className="w-full lg:w-1/2 bg-white p-8 flex flex-col justify-center items-center">
                    <h1 className="text-3xl text-gray-900 mb-8">Register</h1>
                    <form className="w-full flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                        />
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="email"
                            placeholder="Email"
                            name="email"
                            required
                        />
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="text"
                            placeholder="Address"
                            name="address"
                            required
                        />
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            required
                        />
                        <input
                            className="w-full border border-gray-400 mb-4 p-3 rounded outline-none text-sm"
                            type="password"
                            placeholder="Password"
                            name="password"
                            required
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}