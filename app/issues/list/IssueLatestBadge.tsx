'use client';

import React, {useEffect, useState} from 'react';
import {Badge} from "@radix-ui/themes";
import {addMessageListener, makeSocket, Message} from "@/app/issues/webSocket";
import {useRouter} from "next/navigation";

const IssueLatestBadge = () => {
    const [message, setMessage] = useState<Message | undefined>(undefined)
    const router = useRouter();

    useEffect(() => {
        const ws = makeSocket();

        if (ws) {
            addMessageListener(ws, (message) => {
                setMessage(message);
            });

            return () => ws.close();
        }
    }, []);


    const messageOnClick = () => {
        router.refresh();
        setMessage(undefined);
    }

    return (
        <>
            {message?.message.isMessageSent ? <Badge color='yellow' onClick={messageOnClick}><span className="cursor-pointer">Issues Updated</span></Badge> : null}
        </>
    );
};

export default IssueLatestBadge;
