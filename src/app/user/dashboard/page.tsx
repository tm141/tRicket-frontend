'use client'
import { useEffect, useState } from "react"
import User from "@/app/services/user";
import PaymentType from "@/app/services/paymenType";
import { parseCookies } from "nookies";
import '../../globals.css';
import Navbar from "@/app/_components/navbar";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { formatterIDR } from "@/app/lib/formatterIDR";


export default function Dashboard() {
    const [data, setData] = useState<User | null>(null);
    const [paymentType, setPaymentType] = useState<PaymentType[] | null>(null);
    const cookies = parseCookies();
    const jwtToken = cookies.jwt;
    let auth = 'asdf';
    if (jwtToken != undefined) {
        auth = `Bearer ${jwtToken}`;
    }
    const router = useRouter();

    useEffect(() => {
        fetch('http://localhost:3000/api/user/dashboard', {
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
                    router.push('/user/login');
                    return;
                }
                return res.json();
            })
            .then((data) => {
                setData(data);
                console.log(data);
            })
    }, []);

    // useEffect(() => {
    //     if (data) {
    //         fetch('http://localhost:3000/api/paymentTypes')
    //             .then((res) => res.json())
    //             .then((data) => {
    //                 setPaymentType(data);
    //                 console.log(data);
    //             })
    //     }
    // }, []);

    // if (!data) return <p className="bg-teal-200 flex justify-center items-center w-screen h-screen text-6xl">no user data</p>;

    // let tempPaymentType: string[] = [];
    // if (!paymenType) return <p className="bg-teal-200 flex justify-center items-center w-screen h-screen text-6xl">No Payment Type data</p>

    // if (paymentType) {
    //     paymentType.forEach((paymentType: PaymentType) => {
    //         tempPaymentType[paymentType.id] = paymentType.name;
    //     })
    // }

    if (data) {
        const pointExpDate = data.pointsExpDate!==null ? new Date(data.pointsExpDate).toDateString() : '-';
        return (
            <div>
                <Head>
                    <title>Dashboard</title>
                </Head>
                <Navbar type="user" loggedIn={true} />
                <div className="m-9 h-fit">
                    <h1 className="lg:text-6xl text-lg text-center my-9">Dashboard</h1>

                    <div className="bg-teal-200 p-5 mb-5 rounded-xl">
                        <h2 className="lg:text-2xl font-bold">User Data</h2>
                        <p className="lg:text-xl">First Name: {data?.fName}</p>
                        <p className="lg:text-xl">Last Name: {data?.lName}</p>
                        <p className="lg:text-xl">Email: {data?.email}</p>
                        <p className="lg:text-xl">Points: {data?.points}</p>
                        <p className="lg:text-xl">Points Expiration Date: {pointExpDate}</p>
                        <p className="lg:text-xl">Referral Code: {data?.referralCode}</p>
                    </div>

                    <div className="bg-teal-200 p-5 mb-5 rounded-xl h-fit">
                        <h2 className="lg:text-2xl font-bold border-b-2 border-black">Transactions</h2>
                        {data?.transactions.map((transaction) => (
                            <div className="border-b-2 border-black" key={transaction.id}>
                                {/* <p>Payment Type: {tempPaymentType[transaction.paymentTypeId]}</p> */}
                                <p>Total: {formatterIDR(transaction.total)}</p>
                                {/* <p>Status: {transaction.status}</p> */}
                                <p>Created At: {new Date(transaction.createdAt).toDateString()}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}