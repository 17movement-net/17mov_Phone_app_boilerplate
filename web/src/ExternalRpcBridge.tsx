import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

declare global {
    interface Window extends Partial<ExternalAppDispatcher> {
        __externalAppReady?: boolean;
    }
}

type ExternalAppActionMap = {
    NAVIGATE: { payload: { path: string }; result: void };
    GetCurrentRoute: { payload: unknown; result: string };
};

type ExternalAppAction = keyof ExternalAppActionMap;

type ActionPayload<A extends ExternalAppAction> = ExternalAppActionMap[A]['payload'];

type ActionResult<A extends ExternalAppAction> = ExternalAppActionMap[A]['result'];

type ExternalAppDispatcher = {
    __dispatchAction: <A extends ExternalAppAction>(
        action: A,
        payload: ActionPayload<A>,
    ) => ActionResult<A> | Promise<ActionResult<A>>;
};

const ExternalRpcBridge = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const locationRef = useRef(location);

    useEffect(() => {
        locationRef.current = location;
    }, [location]);

    useLayoutEffect(() => {
        window.__dispatchAction = (action: any, payload: any) => {
            switch (action) {
                case 'GetCurrentRoute': {
                    const l = locationRef.current;
                    return l.pathname + l.search + l.hash;
                }
                case 'Navigate': {
                    return navigate(payload.path);
                }
                default:
                    throw new Error(`Unknown action: ${String(action)}`);
            }
        };

        window.__externalAppReady = true;

        return () => {
            delete window.__dispatchAction;
            delete window.__externalAppReady;
        };
    }, [navigate]);

    return null;
};

export default ExternalRpcBridge;
