interface AppManifest {
    /**
     * The name of the app.
     */
    name: string;
    /**
     * The package name of the app. This should be unique to the app and should be in reverse domain notation.
     * For example, if the app is called "My App" and is made by "My Company", the package name should be
     */
    package: string;
    /**
     * The type of the app. This can be "auto" or "manual". If it is "manual", the app will be handled by the
     * handler specified in the handler field. If it is "auto", the app will be handled by the index file
     * specified in the index field. If the type is not "manual" or "auto", it will be handled by the anura
     * library specified in the type field.
     */
    type: "auto" | "manual" | string;
    /**
     * The index file for the app. This is the file that will be loaded when the app is launched when the app
     * is in auto mode.
     */
    index?: string;
    /**
     * The icon for the app. This should be a URL to an image file.
     */
    icon: string;
    /**
     * The handler for the app. This is the file that will be loaded when the app is launched when the app
     * is in manual mode.
     */
    handler?: string;
    /**
     * Whether or not the app should be hidden from the app list. This is useful for apps that are
     * only meant to be launched by other apps.
     */
    hidden?: boolean;
    /**
     * The background color of the element directly behind the app's window. This is optional and defaults
     * to the system theme's background color.
     */
    background?: string;
    /**
     * This contains the properties for the default app window.
     */
    wininfo: string | WindowInformation;
    /**
     * Whether or not the app should use the IDB wrapper. This option allows the app to access indexedDB without
     * worrying about the app purging anura's own databases.
     */
    useIdbWrapper?: boolean;
}
declare class ExternalApp extends App {
    manifest: AppManifest;
    source: string;
    icon: string;
    constructor(manifest: AppManifest, source: string);
    static serializeArgs(args: string[]): string;
    static deserializeArgs(args: string): string[];
    open(args?: string[]): Promise<WMWindow | undefined>;
}
