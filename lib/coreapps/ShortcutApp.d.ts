interface HyperZShortcut {
    name: string;
    command: string;
    icon?: string;
    console?: boolean;
}
declare function b26(s: string): string;
declare class ShortcutApp extends App implements HyperZShortcut {
    static launchShortcut(props: HyperZShortcut): Promise<any>;
    name: string;
    package: string;
    icon: string;
    console: boolean;
    command: string;
    constructor(filePath: string, props: HyperZShortcut);
    open(): Promise<void>;
}
