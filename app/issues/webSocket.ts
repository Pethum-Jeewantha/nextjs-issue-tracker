// This file contains the logic for creating and managing a WebSocket connection

export interface Message {
    message: {
        isMessageSent: boolean;
    }
}

export function makeSocket(): WebSocket | undefined {
    try {
        const webSocket = new WebSocket(process.env.NEXT_PUBLIC_WEBSOCKET_URL!);

        webSocket.onopen = () => console.log('WebSocket Connected');

        webSocket.onclose = () => console.log('WebSocket Disconnected');

        return webSocket;
    } catch (e) {
        console.error("Error connecting to the WebSocket server");
        return undefined;
    }
}

export function closeSocket(webSocket: WebSocket) {
    webSocket.close();
}

export function sendMessage(webSocket: WebSocket, message: Message) {
    if(webSocket && webSocket.readyState === WebSocket.OPEN) {
        webSocket.send(JSON.stringify(message));
    } else {
        console.error('WebSocket not connected');
    }
}

export function addMessageListener(webSocket: WebSocket, callback: (message: Message) => void) {
    webSocket.onmessage = (event) => callback(JSON.parse(event.data));
}
