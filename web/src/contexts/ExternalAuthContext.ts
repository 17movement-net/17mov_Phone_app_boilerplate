import { createContext, useContext } from "react";

export type ExternalAuthContextValue = {
    isAuth: boolean;
    logoutUser: () => void;
};

export const ExternalAuthContext = createContext<ExternalAuthContextValue | null>(null);

export const useExternalAuth = () => {
    const ctx = useContext(ExternalAuthContext);
    if (!ctx) {
        throw new Error("useExternalAuth must be used within <ExternalAuthProvider>");
    }
    return ctx;
};
