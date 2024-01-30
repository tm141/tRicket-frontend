'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import '../../globals.css';

export default function Logout(){
    //delete the jwt cookie
    const router = useRouter();

    useEffect(() => {
        document.cookie = `jwt=; path=/; max-age=0; secure; samesite=strict`;
        router.push('/user/login');
    });
}