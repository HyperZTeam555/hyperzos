declare class Settings {
    cache: {
        [key: string]: any;
    };
    fs: HyperZFilesystem;
    private constructor();
    static new(fs: HyperZFilesystem, defaultsettings: {
        [key: string]: any;
    }): Promise<Settings>;
    get(prop: string): any;
    has(prop: string): boolean;
    set(prop: string, val: any, subprop?: string): Promise<void>;
    save(): Promise<void>;
    remove(prop: string, subprop?: string): Promise<void>;
}
