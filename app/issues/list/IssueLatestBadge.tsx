'use client';

import React, {useEffect, useState} from 'react';
import {Badge} from "@radix-ui/themes";
import {useRouter} from "next/navigation";
import {useWebSocket} from "@/app/contexts/WebSocketContext";

const IssueLatestBadge = () => {
    const router = useRouter();
    const {message} = useWebSocket();

    return (
        <>
            {message?.message.isMessageSent ? <Badge color='yellow' onClick={() => router.refresh()}><span className="cursor-pointer">Issues Updated</span></Badge> : null}
        </>
    );
};

export default IssueLatestBadge;
