'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import '../../../globals.css';
import Navbar from "@/app/_components/navbar";
import Event from "@/app/services/event";
import Ticket from "@/app/services/ticket";
import Transaction from "@/app/services/transaction";
import OrganizerEventDetail from "@/app/services/organizerEventDetail";
import { Card, Text, Metric, LineChart, Title } from "@tremor/react";
import { formatterIDR } from "@/app/lib/formatterIDR";

export default function Page({ params }: { params: { id: number } }) {
    const [event, setEvent] = useState<Event | null>(null);
    const [eventDetail, setEventDetail] = useState<OrganizerEventDetail | null>(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chart, setChart] = useState([{}]);

    const eventId = params.id
    const cookies = parseCookies();
    const jwtToken = cookies.jwt;
    let auth = 'asdf';
    if (jwtToken != undefined) {
        auth = `Bearer ${jwtToken}`;
    }
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/api/organizer/events/${eventId}`, {
            headers: {
                Authorization: auth,
            }
        })
            .then((res) => {
                if (res.status === 401) {
                    alert("Unauthorized");
                    router.push('/organizer/login');
                    return;
                }
                if (res.status === 404) {
                    alert("Not found");
                    router.push('/organizer/dashboard');
                    return;
                }
                return res.json();
            })
            .then((data: Event) => {
                setEvent(data);
            }).catch((err) => {
                console.log(err);
            })
    });

    useEffect(() => {
        fetch(`http://localhost:3000/api/organizer/events/${eventId}/detail`, {
            headers: {
                Authorization: auth,
            }
        })
            .then((res) => {
                if (res.status === 401) {
                    alert("Unauthorized");
                    router.push('/organizer/login');
                    return;
                }
                if (res.status === 404) {
                    alert("Not found");
                    router.push('/organizer/dashboard');
                    return;
                }
                return res.json();
            })
            .then(
                (data: OrganizerEventDetail) => {
                    setEventDetail(data);
                    let time: string[] = [];
                    let chartData: [{ date: string, count: number }] = [{date:'0', count:0}];
                    // let chartData: [{ date: string, count: number }] = [{ date: '2024-01-01', count: 0 }];
                    data.transactionsTickets.forEach((transactionTicket) => {
                        // Format date to 'YYYY-MM-DD'
                        const date = new Date(transactionTicket.createdAt.toString()).toISOString().split('T')[0];
                        if (!time.includes(date)) {
                            time.push(date);
                            chartData.push({ date: date, count: transactionTicket.amount });
                        } else {
                            chartData.forEach((data) => {
                                if (data.date == date) {
                                    data.count += transactionTicket.amount;
                                }
                            })
                        }
                    });
                    if (chartData) {setChart(chartData) };
                    console.log(chart);
                }).catch((err) => {
                    console.log(err);
                })
    });

    let tempDate = null;
    if (event) {
        tempDate = new Date(event.showTime);
    }

    if (!event) return <div><Navbar type="organizer" loggedIn={false} /><p>Loading...</p></div>

    // const valueFormatter = (number: number) => `$ ${new Intl.NumberFormat("id").format(number).toString()}`;
    const valueFormatter = (number: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    let tempRevenue = (eventDetail)?formatterIDR(eventDetail.total):"0";
    return (
        <div>
            <Navbar type="organizer" loggedIn={true} />
            <div className="m-9 h-fit">
                <h1 className="lg:text-6xl text-lg text-center my-9">Event</h1>
                <div className="flex ">
                    <Card className="max-w-xs m-5">
                        <Text>Ticket Sold</Text>
                        <Metric>{(eventDetail?.attendeeCount) ?? '0'}</Metric>
                        
                    </Card>

                    <Card className="max-w-xs m-5">
                        <Text>Revenue</Text>
                        <Metric>{tempRevenue}</Metric>
                    </Card>


                </div>
                <div className="m-5 max-h-[480px]">
                    <Card>
                        <Title>Sale Chart</Title>
                        <LineChart
                            className="mt-6"
                            data={chart}
                            index="date"
                            categories={["count"]}
                            colors={["emerald"]}
                            // valueFormatter={valueFormatter}
                        // yAxisWidth={40}
                        />
                    </Card>
                </div>
                {/* display event transaction chart */}
                <div className="bg-teal-200 p-5 mb-5 rounded-xl">
                    <p className="lg:text-xl font-bold">Name: {event.name}</p>
                    <p className="lg:text-xl">Description: {event.description}</p>
                    <p className="lg:text-xl">Location: {event.location}</p>
                    <p className="lg:text-xl">Show Time: {tempDate?.toDateString()}</p>
                    <p className="lg:text-xl">Organizer: {event.organizer.name}</p>

                    {/* <p className="lg:text-xl">Attendees/TicketSold: {(eventDetail?.attendeeCount)??'0'}</p>
                    <p className="lg:text-xl">Total Revenue: {(eventDetail?.total)??'0'}</p> */}
                    {/* display event ticket chart */}
                </div>


                <div>
                    {/* display ticket */}
                    <h1 className="lg:text-6xl text-lg text-center my-9">Tickets</h1>
                    <div className="bg-teal-200 p-5 mb-5 rounded-xl">
                        {event.tickets.map((ticket: Ticket) => (
                            <div key={ticket.id} className="mb-2 border-b-black border-b-2">
                                <p className="lg:text-xl font-bold">Name: {ticket.name}</p>
                                <p className="lg:text-xl">Description: {ticket.description}</p>
                                <p className="lg:text-xl">Price: {formatterIDR(ticket.price)}</p>
                                <p className="lg:text-xl">Amount: {ticket.amount}</p>

                                {/* display ticket sale count */}
                                {/* display ticket sale chart */}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
}