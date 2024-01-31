'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import '../../../globals.css';
import Navbar from "@/app/_components/navbar";
import Transaction from "@/app/services/transaction";
import TransactionTicket from "@/app/services/transactionTicket";

export default function Page({ params }: { params: { id: number } }) {
    const [transaction, setTransaction] = useState<Transaction | null>(null);
    const [transactionTickets, setTransactionTickets] = useState<TransactionTicket[] | null>(null);

    const transactionId = params.id
    const cookies = parseCookies();
    const jwtToken = cookies.jwt;
    let auth = 'asdf';
    if (jwtToken != undefined) {
        auth = `Bearer ${jwtToken}`;
    }
    const router = useRouter();

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/transactions/${transactionId}`, {
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
                    router.push('/user/transaction');
                    return;
                }
                return res.json();
            })
            .then((data: Transaction) => {
                setTransaction(data);
            }).catch((err) => {
                console.log(err);
            })
    });

    useEffect(() => {
        fetch(`http://localhost:3000/api/user/transaction/${transactionId}/transactionTickets`, {
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
                    router.push('/user/transaction');
                    return;
                }
                return res.json();
            })
            .then((data: TransactionTicket[]) => {
                setTransactionTickets(data);
            }).catch((err) => {
                console.log(err);
            })
    });


    if (transaction && transactionTickets) {
        return (
            <div>
                <Navbar type="organizer" loggedIn={true} />
                {/* display transaction detail */}
                <div className="m-9 h-fit">
                    <h1 className="lg:text-6xl text-lg text-center my-9">Transaction Detail</h1>
                    <div className="bg-teal-200 p-5 mb-5 rounded-xl">
                        <div>
                            <p className="lg:text-xl">Id: {transaction.id}</p>
                            <p className="lg:text-xl">Created At: {new Date(transaction.createdAt).toDateString()}</p>
                            <p className="lg:text-xl">Total: {transaction.total}</p>
                        </div>
                    </div>

                    <h1 className="lg:text-6xl text-lg text-center my-9">Ticket Detail</h1>
                    <div className="bg-teal-200 p-5 mb-5 rounded-xl">
                        <div>
                            {transactionTickets.map((transactionTicket: TransactionTicket) => (
                                <div key={transactionTicket.id} className="mb-2 border-b-black border-b-2">
                                    <p className="lg:text-xl">Id: {transactionTicket.id}</p>
                                    <p className="lg:text-xl">Event: {transactionTicket.ticket.event.name}</p>
                                    <p className="lg:text-xl">Ticket Name: {transactionTicket.ticket.name}</p>
                                    <p className="lg:text-xl">Ticket Description: {transactionTicket.ticket.description}</p>
                                    <p className="lg:text-xl">Promo Date: {transactionTicket.promosDate?.name}</p>
                                    <p className="lg:text-xl">Promo Referral: {transactionTicket.promosReferral?.name}</p>
                                    <p className="lg:text-xl">Ticket Price: {transactionTicket.ticket.price}</p>
                                    <p className="lg:text-xl">Ticket Quantity: {transactionTicket.amount}</p>
                                    <p className="lg:text-xl">Total Price: {transactionTicket.total}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}