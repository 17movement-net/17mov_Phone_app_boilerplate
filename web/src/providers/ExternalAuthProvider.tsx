import { ExternalAuthContext } from "@/contexts/ExternalAuthContext";
import { useNavigateWithApps } from "@/hooks/useNavigateWithApps";
import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

export const ExternalAuthProvider = ({
    authPage,
    homePage,
    children,
}: {
    authPage: string;
    homePage: string;
    children: React.ReactNode;
}) => {
    const isAuth = useIsAuthenticated();
    const location = useLocation();
    const navigate = useNavigateWithApps();

    const path = location.pathname;
    const isInsideAuth = path === authPage || path.startsWith(authPage + "/");

    const logoutUser = useCallback(() => {
        useSignOut();
        navigate(authPage);
    }, [navigate, authPage]);

    useEffect(() => {
        if (!isAuth) {
            if (!isInsideAuth) navigate(authPage);
            return;
        }

        if (isAuth && isInsideAuth) {
            navigate(homePage);
            return;
        }
    }, [isAuth, isInsideAuth, authPage, homePage, navigate]);

    if (!isAuth && !isInsideAuth) return null;
    if (isAuth && isInsideAuth) return null;

    return (
        <ExternalAuthContext.Provider value={{ isAuth, logoutUser }}>
            {children}
        </ExternalAuthContext.Provider>
    );
};