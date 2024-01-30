'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import '../../../globals.css';
import Navbar from "@/app/_components/navbar";
import Event from "@/app/services/event";
import Modal from "react-modal";
import Ticket from "@/app/services/ticket";
import Transaction from "@/app/services/transaction";

export default function Page({ params }: { params: { id: number } }) {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [event, setEvent] = useState<Event | null>(null);
    const [selectedTicketId, setSelectedTicketId] = useState(null);
    const [selectedTicketAmount, setSelectedTicketAmount] = useState(null);
    const [PromoDateId, setPromoDateId] = useState(null);
    const [PromoReferralId, setPromoReferralId] = useState(null);
    const [referralCode, setReferralCode] = useState(null);
    const [usePoint, setUsePoint] = useState(false);
    const [createdTransaction,setCreatedTransaction] = useState<Transaction |null>(null);

    function handleSelectedTicketId(e: any) {
        setSelectedTicketId(e.target.value);
    }

    function handleSelectedTicketAmount(e: any) {
        setSelectedTicketAmount(e.target.value);
    }

    function handlePromoDateId(e: any) {
        setPromoDateId(e.target.value);
    }

    function handlePromoReferralId(e: any) {
        setPromoReferralId(e.target.value);
    }

    function handleRefferalCode(e: any) {
        setReferralCode(e.target.value);
    }

    function handleUsePoint(e: any) {
        setUsePoint(e.target.value);
    }

    function handleBuyTicket() {
        fetch('http://localhost:3000/api/user/createTransaction', {
            method: 'POST',
            headers: {
                Authorization: auth,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ticketId: selectedTicketId,
                ticketAmount: selectedTicketAmount,
                promosDateId: PromoDateId,
                promosReferralId: PromoReferralId,
                referralCode: referralCode,
                usePoints: usePoint,
            }),
        })
            .then((res) => {
                if (res.status === 401) {
                    alert(res.status);
                    router.refresh;
                    return;
                }
                if (res.status === 401) {
                    alert("Unauthorized");
                    router.push('/user/login');
                    return;
                }
                if (res.status === 404) {
                    alert("Not found");
                    router.push('/user/event');
                    return;
                }
                return res.json();
            }).then((data:Transaction) => {
                setCreatedTransaction(data);
            }).catch((err) => {
                console.log(err);
            })
        router.push(`/user/transaction/latest`);
    }



    function openModal() {
        setModalIsOpen(true);
    }

    function closeModal() {
        setModalIsOpen(false);
    }

    const eventId = params.id
    const cookies = parseCookies();
    const jwtToken = cookies.jwt;
    let auth = 'asdf';
    if (jwtToken != undefined) {
        auth = `Bearer ${jwtToken}`;
    }
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/events/${eventId}`, {
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
                if (res.status === 404) {
                    alert("Not found");
                    router.push('/user/dashboard');
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

    let tempDate = null;
    if (event) {
        tempDate = new Date(event.showTime);
    }

    if (!event) return <p>Loading...</p>

    return (
        <div>
            <Navbar type="user" loggedIn={true} />
            <div className="m-9 h-fit">
                <h1 className="lg:text-6xl text-lg text-center my-9">Event</h1>
                <div className="bg-teal-200 p-5 mb-5 rounded-xl">
                    <p className="lg:text-xl font-bold">Name: {event.name}</p>
                    <p className="lg:text-xl">Description: {event.description}</p>
                    <p className="lg:text-xl">Location: {event.location}</p>
                    <p className="lg:text-xl">Show Time: {tempDate?.toDateString()}</p>
                    <p className="lg:text-xl">Organizer: {event.organizer.name}</p>
                    {/* <a href={`/user/event/${event.id}`} className="lg:text-xl text-blue-500">View Event</a> */}
                    {/* button to show modal that function as transaction form */}
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={openModal}>
                        Buy Ticket
                    </button>
                    {/* 
                        id: number;
                        ticketId: number;
                        ticket: Ticket;
                        amount: number;
                        promosDate: PromoDate;
                        promosReferral: PromoReferral;
                        promosDateId: number;
                        promosReferralId: number;
                        referralCode: string;
                        usePoints: boolean;
                        total: number;
                        createdAt: Date;
                        updatedAt: Date;
                        archived: boolean; 
                    */}
                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        contentLabel="Buy Ticket"
                        className="modalContent"
                        overlayClassName="modalOverlay"
                    >
                        <h2>Hello</h2>
                        {/* create input select for every event.ticket */}
                        <div>
                            <label>
                                Ticket:
                                <select name="ticketType" onChange={handleSelectedTicketId}>
                                    <option value="">Select a ticket</option>
                                    {event.tickets.map((ticket: Ticket) => (
                                        <option key={ticket.id} value={ticket.id}>{ticket.name} : Price({ticket.price}) : Available({ticket.amount})</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                        <hr />
                        <div>
                            <label>
                                Ticket Amount: <input type="number" name="amount" onChange={handleSelectedTicketAmount} />
                            </label>
                        </div>
                        <hr />
                        {event.promosDates && (
                            <div>
                                <label>
                                    Promo Date:
                                    <select name="promoDate" onChange={handlePromoDateId}>
                                        {event.promosDates.map((promoDate: any) => (
                                            <option key={promoDate.id} value={promoDate.id}>{promoDate.name} : {promoDate.discount}</option>
                                        ))}
                                    </select>
                                </label>
                                <hr />
                            </div>
                        )}
                        {event.promosReferrals && (
                            <div>
                                <label>
                                    Promo Referral:
                                    <select name="promoReferral" onChange={handlePromoReferralId}>
                                        {event.promosReferrals.map((promoReferral: any) => (
                                            <option key={promoReferral.id} value={promoReferral.id}>{promoReferral.name} : {promoReferral.discount}</option>
                                        ))}
                                    </select>
                                </label>
                                <label>
                                    Referral Code: <input type="text" name="referralCode" onChange={handleRefferalCode} />
                                </label>
                                <hr />
                            </div>
                        )}
                        <div>
                            <label>
                                Use Point: <input type="checkbox" name="usePoint" onChange={handleUsePoint} />
                            </label>
                        </div>
                        <hr />

                        <div>
                            <button type="submit" value="Submit" onClick={handleBuyTicket} >Buy</button>
                        </div>
                        <hr />
                        <div>
                            <button onClick={closeModal}>close</button>
                        </div>
                        <hr />
                    </Modal>
                </div>
            </div>
        </div>
    )
}