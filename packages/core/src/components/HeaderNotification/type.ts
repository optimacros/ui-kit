export interface Notification {
    unreadCount: number;
    active: boolean;
    visible: boolean;
    toggle: () => void;
}
