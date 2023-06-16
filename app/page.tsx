"use client";

import { useState, useEffect } from 'react';
import Buttons from "./components/Buttons";

export default function Home() {
    const [title, setTitle] = useState('');

    useEffect(() => {
        const fetchTitle = async () => {
            const res = await fetch('/api/title');
            const data = await res.json();
            setTitle(data.title);
        };

        // Fetch the title immediately
        fetchTitle();

        // Then set up polling
        const intervalId = setInterval(fetchTitle, 1200000); // Fetch every 20 minutes

        // Clean up function
        return () => clearInterval(intervalId);
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className='text-yellow-300'>{title}</h1>
            <Buttons />
        </main>
    );
}
