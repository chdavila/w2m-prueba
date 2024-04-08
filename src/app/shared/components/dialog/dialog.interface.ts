export interface DialogCustom {
    title: string;
    subtitle: string;
    hasErrorBtn: boolean;
    errorLobel?: string;
    errorFn?: () => void;
    successLabel: string;
    successFn?: () => void;
}