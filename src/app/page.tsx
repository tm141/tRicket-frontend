
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";
import Event from "./_components/event/landingPageEvent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "tRicket",
    description: "tRicket landing page",
};

export default function Page() {

    return (
        <div>
            <Navbar type="user" loggedIn={false} />
            <section className="text-gray-600 body-font mt-0 mb-auto pb-16">
                <img className="h-[450px] lg:w-screen mb-10 object-cover object-center" alt="hero" src="/img/hero.jpg" />
                <div className="container mx-auto flex items-center justify-center flex-col">
                    <div className="text-center lg:w-2/3 w-full">
                        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Find Your Perfect Event</h1>
                        <div className="flex justify-center">
                            <a href="/event" className="inline-flex text-white bg-teal-500 border-0 py-2 px-6 focus:outline-none hover:bg-teal-600 rounded text-lg">Browse Events</a>
                        </div>
                    </div>
                </div>
            </section>
            <Event />
        </div>

    )
}
