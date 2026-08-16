type WispClientMapping = {
    remoteId: number;
    handler: WebSocket | RTCDataChannel;
    packetCallBack: any;
};
type WispServerMapping = {
    regex: RegExp;
    handler: ((data: any) => WebSocket | RTCDataChannel) | WebSocket | RTCDataChannel;
    lastId: number;
    clients: Map<number, number>;
    defaultBuffer?: number;
};
declare class WispBus {
    static CONNECTING: number;
    static OPEN: number;
    static CLOSING: number;
    static CLOSED: number;
    upstream: WebSocket | RTCDataChannel;
    upstreamBuffer: number;
    lastGlobalID: number;
    lastUpstreamId: number;
    clientMappings: Map<number, WispClientMapping>;
    serverMappings: Map<string, WispServerMapping>;
    upstreamClients: Map<number, number>;
    virtualServerMapping: Map<any, any>;
    constructor(upstreamProvider: WebSocket | RTCDataChannel);
    setUpstreamProvider(upstreamProvider: WebSocket | RTCDataChannel): void;
    registerServer(id: string, regex: RegExp, handler: ((data: any) => WebSocket | RTCDataChannel) | WebSocket | RTCDataChannel): void;
    handleIncomingPacket(sourceID: string, packet: Uint8Array): void;
    handleOutgoingPacket(virtualServerID: number, packet: Uint8Array, packetCallBack?: any): null | undefined;
    getFakeWispProxySocket(): {
        new (): {
            binaryType: string;
            readyState: number;
            bufferedAmount: number;
            virtualServerID: number;
            onopen: () => void;
            onmessage: () => void;
            onclose: () => void;
            send(data: any): void;
            close(code?: number, reason?: string): void;
            addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
            dispatchEvent(event: Event): boolean;
            removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
        };
    };
    getFakeWSProxySocket(): {
        new (url: any, protocols: any): {
            url: any;
            protocols: any;
            binaryType: string;
            stream: any;
            event_listeners: any;
            connection: any;
            onopen: (event: Event) => void;
            onerror: (event: Event) => void;
            onmessage: (event: Event) => void;
            onclose: (event: Event) => void;
            CONNECTING: number;
            OPEN: number;
            CLOSING: number;
            CLOSED: number;
            host: any;
            port: number;
            real_url: string;
            on_conn_close(): void;
            init_connection(): void;
            init_stream(): void;
            send(data: any): void;
            close(): void;
            get bufferedAmount(): number;
            get extensions(): string;
            get protocol(): string;
            get readyState(): number;
            addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void;
            dispatchEvent(event: Event): boolean;
            removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
        };
    };
}
