'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useDebounce } from "use-debounce";
import '../globals.css';
import Navbar from "@/app/_components/navbar";
import Event from "@/app/services/event";

export default function Page({ params }: { params: { id: number } }) {
    const [event, setEvent] = useState<Event[] | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
    const [page, setPage] = useState(1);

    const cookies = parseCookies();
    const jwtToken = cookies.jwt;
    let auth = 'asdf';
    if (jwtToken != undefined) {
        auth = `Bearer ${jwtToken}`;
    }
    const router = useRouter();

    useEffect(() => {
        handleSearch()
    }, [debouncedSearchTerm, startDate, endDate, page]);
    // useEffect(() => {
    //     fetch(`http://localhost:3000/api/user/events`, {
    //         headers: {
    //             Authorization: auth,
    //         }
    //     })
    //         .then((res) => {
    //             if (res.status === 401) {
    //                 alert("Unauthorized");
    //                 router.push('/user/login');
    //                 return;
    //             }
    //             return res.json();
    //         })
    //         .then((data: Event[]) => {
    //             setEvent(data);
    //         }).catch((err) => {
    //             console.log(err);
    //         })


    // }, [debouncedSearchTerm, startDate, endDate]);

    function handleSearchTermParam(e: any) {
        // setSearchTerm(new URLSearchParams({ searchTerm: e.target.value }).toString());
        setSearchTerm(e.target.value);
    }
    function handleStartDateParam(e: any) {
        // setStartDate(new URLSearchParams({ startDate: e.target.value }).toString());
        setStartDate(e.target.value);
    }
    function handleEndDateParam(e: any) {
        // setEndDate(new URLSearchParams({ endDate: e.target.value }).toString());
        setEndDate(e.target.value);
    }

    // let fetchUrl = `http://localhost:3000/api/user/events?page=${page}`
    // if (debouncedSearchTerm) {
    //     fetchUrl = fetchUrl + `?${searchTerm}`
    // }
    // if (startDate) {
    //     fetchUrl = fetchUrl + `&${startDate}`
    // }
    // if (endDate) {
    //     fetchUrl = fetchUrl + `&${endDate}`
    // }

    function handlePrevious() {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
        }
    }

    function handleNext() {
        const newPage = page + 1;
        setPage(newPage);
    }


    function handleSearch() {
        let fetchUrl = `http://localhost:3000/api/user/events?page=${page}`
        if (debouncedSearchTerm) {
            fetchUrl = fetchUrl + `&searchTerm=${searchTerm}`
        }
        if (startDate) {
            fetchUrl = fetchUrl + `&startDate=${startDate}`
        }
        if (endDate) {
            fetchUrl = fetchUrl + `&endDate=${endDate}`
        }
        console.log(fetchUrl);
        fetch(fetchUrl, {
            headers: {
                Authorization: auth,
            }
        }).then((res) => {
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

    const navbar = jwtToken == undefined ? <Navbar type="user" loggedIn={false} /> : <Navbar type="user" loggedIn={true} />
    if (!event) return (
        <div>
            {navbar}
            {/* implement advanced search bar */}
            <div className="m-9 h-fit">
                <h1 className="lg:text-6xl text-lg text-center my-9">Events</h1>
                <input type="text" className="border-2 border-black rounded-xl p-2 m-5" placeholder="Search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

                <div className="flex flex-col gap-5 p-5 mb-5">
                    <p>Loading</p>
                </div>
            </div>
        </div>
    )

    return (
        <div>
            {navbar}
            {/* implement advanced search bar */}
            <div className="m-9 h-fit">
                <h1 className="lg:text-6xl text-lg text-center my-9">Events</h1>
                <div className="flex">
                    <label>
                        <p>Event Name</p>
                        <input type="text" className="border-2 border-black rounded-xl p-2 m-5" placeholder="Search" onChange={(e) => { handleSearchTermParam(e) }} />
                    </label>
                    <label>
                        <p>Start Date</p>
                        <input type="date" className="border-2 border-black rounded-xl p-2 m-5" placeholder="Start Date" onChange={handleStartDateParam} />
                    </label>
                    <label>
                        <p>End Date</p>
                        <input type="date" className="border-2 border-black rounded-xl p-2 m-5" placeholder="End Date" onChange={handleEndDateParam} />
                    </label>
                    <button className="border-2 border-black rounded-xl p-2 m-5" onClick={handleSearch}>Search</button>
                </div>
                <div className="flex flex-col gap-5 p-5 mb-5">
                    {event && event.map((event: Event) => (
                        <div key={event.id} className="border-b-2 border-black bg-teal-200 p-2 rounded-xl">
                            <p className="lg:text-xl font-bold">Name: {event.name}</p>
                            <p className="lg:text-xl">Description: {event.description}</p>
                            <p className="lg:text-xl">Location: {event.location}</p>
                            <p className="lg:text-xl">Show Time: {new Date(event.showTime).toDateString()}</p>
                            <p className="lg:text-xl">Organizer: {event.organizer.name}</p>
                            <a href={`/user/login`} className="lg:text-xl text-blue-500">Login to view event detail</a>
                        </div>
                    ))}
                </div>
                {/* create pagination button of 5 */}
                <div className="flex justify-center">
                    <button className="border-2 border-black rounded-xl p-2 m-5" onClick={(e) => { handlePrevious(); }}>Previous</button>
                    <button className="border-2 border-black rounded-xl p-2 m-5" onClick={(e) => { handleNext(); }}>Next</button>
                </div>
            </div>
        </div>
    )
}