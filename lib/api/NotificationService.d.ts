declare class NotificationService {
    state: Stateful<{
        notifications: HyperZNotification[];
        render: boolean;
    }>;
    css: string;
    element: JSX.Element;
    get notifications(): HyperZNotification[];
    set notifications(value: HyperZNotification[]);
    constructor();
    add(params: NotifParams): void;
    remove(notification: HyperZNotification, rendererOnly?: boolean): void;
    subscribe(callback: (notifications: HyperZNotification[]) => void): () => void;
    setRender(render: boolean): void;
}
interface NotifParams {
    title?: string;
    description?: string;
    timeout?: number | "never";
    callback?: (notif: HyperZNotification) => void;
    closeIndicator?: boolean;
    buttons?: Array<{
        text: string;
        style?: "contained" | "outlined" | "text";
        callback: (notif: HyperZNotification) => void;
        close?: boolean;
    }>;
}
declare class HyperZNotification implements NotifParams {
    title: string;
    description: string;
    timeout: number | "never";
    closeIndicator: boolean;
    callback: (_notif: HyperZNotification) => null;
    buttons: Array<{
        text: string;
        style?: "contained" | "outlined" | "text";
        callback: (notif: HyperZNotification) => void;
    }>;
    close: () => void;
    state: Stateful<{
        timedOut: boolean;
    }>;
    css: string;
    element: HTMLElement;
    constructor(params: NotifParams, close: () => void);
}
