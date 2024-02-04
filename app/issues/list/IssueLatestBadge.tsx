'use client';

import React, {useEffect, useState} from 'react';
import {Badge} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import {useWebSocket} from "@/app/contexts/WebSocketContext";
import {useSession} from "next-auth/react";

const IssueLatestBadge = () => {
    const router = useRouter();
    const {message} = useWebSocket();
    const { data: session } = useSession();

    const [isVisible, setIsVisible] = useState<boolean>(true);

    useEffect(() => {
        setIsVisible(true);
    }, [message]);

    const handleBadgeClick = () => {
        router.refresh();
        setIsVisible(false);
    };

    return (
        <>
            {message?.message.senderEmail != session?.user?.email && message?.message.isMessageSent && isVisible ? <Badge color='yellow' onClick={handleBadgeClick} className="mt-1"><span className="cursor-pointer">Issues Updated</span></Badge> : null}
        </>
    );
};

export default IssueLatestBadge;
