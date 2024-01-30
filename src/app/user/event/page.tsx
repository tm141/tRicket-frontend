'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useDebounce } from "use-debounce";
import '../../globals.css';
import Navbar from "@/app/_components/navbar";
import Event from "@/app/services/event";

export default function Page({ params }: { params: { id: number } }) {
    const [event, setEvent] = useState<Event[] | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    
    const cookies = parseCookies();
    const jwtToken = cookies.jwt;
    let auth = 'asdf';
    if (jwtToken != undefined) {
        auth = `Bearer ${jwtToken}`;
    }
    const router = useRouter();

    useEffect(() => {
        if (debouncedSearchTerm) {
        fetch(`http://localhost:3000/api/user/events`, {
            headers: {
                Authorization: auth,
            }
        })
            .then((res) => {
                if (res.status === 401) {
                    alert("Unauthorized");
                    router.push('/user/login');
                    return;
                }
                return res.json();
            })
            .then((data: Event[]) => {
                setEvent(data);
            }).catch((err) => {
                console.log(err);
            })
        }
    }, [debouncedSearchTerm]);

    if (!event) return <p>Loading...</p>

    return (
        <div>
            <Navbar type="user" loggedIn={true} />
            {/* implement advanced search bar */}
            <div className="m-9 h-fit">
                <h1 className="lg:text-6xl text-lg text-center my-9">Events</h1>
                <input type="text" className="border-2 border-black rounded-xl p-2 m-5" placeholder="Search" />
                <div className="flex flex-col gap-5 p-5 mb-5">
                    {event && event.map((event: Event) => (
                        <div key={event.id} className="border-b-2 border-black bg-teal-200 p-2 rounded-xl">
                            <p className="lg:text-xl font-bold">Name: {event.name}</p>
                            <p className="lg:text-xl">Description: {event.description}</p>
                            <p className="lg:text-xl">Location: {event.location}</p>
                            <p className="lg:text-xl">Show Time: {new Date(event.showTime).toDateString()}</p>
                            <p className="lg:text-xl">Organizer: {event.organizer.name}</p>
                            <a href={`/user/event/${event.id}`} className="lg:text-xl text-blue-500">View Event</a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}