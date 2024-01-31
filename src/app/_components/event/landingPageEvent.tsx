'use client';
import { useEffect, useState } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

export default function Event() {
    const [data, setData] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3000/api/user/events?limit=5')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
            })
    }, []);

    if (isLoading) return <div><p>Loading...</p></div>
    if (!data) return <p>No Event data</p>
    console.log(data);
    return (
        <div>
            <h1 className="text-4xl text-center">Checkout These Events!</h1>
            <div className="px-6 pb-6">
                <div className="flex flex-col gap-2 mx-24">
                    {data && (data as any[]).map((event) => (
                        <a key={event.id} href={`/event/${event.id}`} className="p-1 bg-teal-200 rounded">
                            <div key={event.id} className="p-1 bg-teal-200 rounded">
                                <h2 className="font-bold">Event: {event.name}</h2>
                                <p>{event.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>

    )
}