'use client'
import { useEffect, useState } from "react";
import Transaction from "@/app/services/transaction";
import { parseCookies } from "nookies";
import '../../globals.css';
import Navbar from "@/app/_components/navbar";

export default function Transactions() {

    const [transactions, setTransactions] = useState<Transaction[] | null>();
    const cookies = parseCookies();
    const jwtToken = cookies.jwt;
    let auth = 'asdf';
    if (jwtToken != undefined) {
        auth = `Bearer ${jwtToken}`;
    }

    useEffect(() => {
        fetch('http://localhost:3000/api/user/transactions', {
            headers: {
                Authorization: auth,
            }
        })
            .then((res) => {
                if (res.status === 401) {
                    alert("Unauthorized");
                    return;
                }
                if (res.status === 404) {
                    alert("Not found");
                    return;
                }
                return res.json();
            })
            .then((data) => {
                setTransactions(data);
                console.log(data);
            })
    });

    // userId Int
    // paymentType PaymentTypes @relation(fields: [paymentTypeId], references: [id])
    // paymentTypeId Int
    // total Decimal?
    // status Boolean @default(false)
    // createdAt DateTime @default(now())
    // updatedAt DateTime? @updatedAt
    // archived Boolean @default(false)
    // transactionsTickets TransactionsTickets[]
    return (
        <div>
            <Navbar type="organizer" loggedIn={true} />
            <div className="m-9 h-fit">
                <h1 className="lg:text-6xl text-lg text-center my-9">Transactions</h1>
                <div className="flex flex-col gap-5 p-5 mb-5">
                    {transactions && transactions.map((transaction: Transaction) => (
                        <div key={transaction.id} className="border-b-2 border-black bg-teal-200 p-2 rounded-xl">
                            <p className="lg:text-xl">Id: {transaction.id}</p>
                            <p className="lg:text-xl">Created At: {new Date(transaction.createdAt).toDateString()}</p>
                            <p className="lg:text-xl">Total: {transaction.total}</p>
                            <a href={'/user/transaction/' + transaction.id} className="lg:text-xl text-blue-500">Detail</a>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}