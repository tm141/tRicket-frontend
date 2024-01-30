'use client';
import { useEffect, useState } from "react";
import Head from "next/head";
import TricketEvent from '../../services/event';
import Navbar from "@/app/_components/navbar";
import Footer from "@/app/_components/footer";
import "@/app/globals.css";
import Ticket from "@/app/services/ticket";
import { CartProvider } from "../../user/cart/cartContextData";
import AddTicketToCartModal from "./_addToCartModal";

export default function EventPage({ params }: { params: { id: number, type: 'user' | 'organizer'} }) {
    const [data, setData] = useState<TricketEvent | null>(null);
    const [isLoading, setLoading] = useState(true);

    const id = params.id;

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/events/${id}`)
            .then((res) => res.json())
            .then((data: TricketEvent) => {
                setData(data);
                setLoading(false)
            }).catch((err) => {
                console.log(err);
            })
    }, []);

    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No Event data</p>

    console.log(data);
    return (
        <div>
            <CartProvider>
                <Navbar type="user" loggedIn={false} />
                <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
                        <h1 className="text-6xl font-bold">
                            {data.name}
                        </h1>

                        <p className="mt-3 text-2xl">
                            {data.description}
                        </p>

                        <div className="flex flex-wrap items-center justify-around  mt-6 sm:w-full">
                            <div className="p-6 mt-6 text-left border w-full rounded-xl shadow-xl">
                                <h3 className="text-2xl font-bold">Event Details</h3>
                                <p className="mt-4 text-xl">
                                    Event Name: {data.name}
                                </p>
                                <p className="mt-4 text-xl">
                                    Event Description: {data.description}
                                </p>
                                <p className="mt-4 text-xl">
                                    Event Location: {data.location}
                                </p>
                                <p className="mt-4 text-xl">
                                    Event Start Date: {data.showTime.toString()}
                                </p>
                                {data.tickets.map((ticket: Ticket) => (
                                    <div key={ticket.id} className="p-6 mt-6 text-left border w-full rounded-xl shadow-xl">
                                        <h3 className="text-2xl font-bold">Ticket Details</h3>
                                        <p className="mt-4 text-xl">
                                            Ticket Name: {ticket.name}
                                        </p>
                                        <p className="mt-4 text-xl">
                                            Ticket Description: {ticket.description}
                                        </p>
                                        <p className="mt-4 text-xl">
                                            Price: {ticket.price}
                                        </p>
                                        <p className="mt-4 text-xl">
                                            Ticket Amount: {ticket.amount}
                                        </p>

                                        {/* <AddTicketToCartModal ticket={ticket} /> */}
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </main>
                </div>
                <Footer />
            </CartProvider>
        </div>
    )
}
