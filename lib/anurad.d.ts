interface InitScriptExports {
    name: string;
    provides: string[];
    description: string;
    depend: () => Promise<void>;
    start: () => Promise<void>;
    stop: () => Promise<void>;
}
type InitScriptFrame = HTMLIFrameElement & {
    contentWindow: Window & {
        initScript: InitScriptExports;
    };
};
declare class HyperZd extends Process {
    pid: number;
    initScripts: HyperZdInitScript[];
    title: string;
    constructor(pid: number);
    addInitScript(script: string): Promise<void>;
    get alive(): boolean;
    kill(): Promise<void>;
}
declare class HyperZdInitScript implements Process {
    #private;
    pid: number;
    script: string;
    frame: InitScriptFrame;
    window: InitScriptFrame["contentWindow"];
    info?: InitScriptExports;
    get title(): string;
    set title(value: string);
    constructor(script: string, pid: number, args?: string[]);
    get alive(): boolean;
    get args(): string[];
    kill(): void;
    stdin: WritableStream<Uint8Array>;
    stderr: ReadableStream<Uint8Array>;
    stdout: ReadableStream<Uint8Array>;
}
