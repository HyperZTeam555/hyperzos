"use strict";
class Networking {
    bus;
    libcurl;
    libcurl_src = "/libs/libcurl/libcurl.mjs";
    libcurl_wasm = "/libs/libcurl/libcurl.wasm";
    external = {
        fetch: window.fetch, // Default until another thing is registered ig
    };
    WebSocket;
    Socket;
    TLSSocket;
    constructor(wisp_server) {
        this.bus = new WispBus(new WebSocket(wisp_server));
        //@ts-ignore
        import(this.libcurl_src).then(async (m) => {
            this.libcurl = m.libcurl;
            this.libcurl.load_wasm(this.libcurl_wasm);
            this.libcurl.transport = this.bus.getFakeWSProxySocket();
        });
        document.addEventListener("libcurl_load", () => {
            this.libcurl.set_websocket(wisp_server);
            this.external.fetch = this.libcurl.fetch;
            Object.assign(this, {
                WebSocket: this.libcurl.WebSocket,
                Socket: this.libcurl.WispConnection,
                TLSSocket: this.libcurl.TLSSocket,
            });
            console.debug("libcurl.js ready!");
        });
    }
    loopback = {
        addressMap: new Map(),
        call: async (port, request) => {
            return await this.loopback.addressMap.get(port)(request);
        },
        set: async (port, handler) => {
            this.loopback.addressMap.set(port, handler);
        },
        deregister: async (port) => {
            this.loopback.addressMap.delete(port);
        },
    };
    fetch = async (input, init) => {
        const url = new URL(input instanceof Request ? input.url : input.toString());
        if (url.hostname === "localhost") {
            // we will assume if theres no port, its 80, god forbid it being 443
            const port = Number(url.port) || 80;
            let request;
            if (typeof input === "string" || input instanceof URL) {
                request = new Request(input, init);
            }
            else if (input instanceof Request) {
                request = input;
            }
            if (this.loopback.addressMap.has(port)) {
                return this.loopback.call(port, request);
            }
        }
        return this.external.fetch(input, init);
    };
}
//# sourceMappingURL=Networking.js.map