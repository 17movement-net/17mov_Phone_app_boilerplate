import { type ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, type HTMLMotionProps } from 'motion/react';

import { cn } from '@/lib/utils';
import { appStore } from '@/store/appSlice';
import type { RouteType } from '@/types/types';

const GetExitMotionFromSiblings = (siblings: RouteType[], current_location: string, toPage: string | -1) => {
    if (toPage === -1) return { x: '100%' };

    current_location = current_location.split('?')[0];
    toPage = toPage.split('?')[0];
    current_location = '/' + current_location.split('/').slice(2).join('/');
    toPage = '/' + toPage.split('/').slice(2).join('/');
    let fromPageIndex = siblings.findIndex((route) => route.path === current_location);
    let toPageIndex = siblings.findIndex((route) => route.path === toPage);

    if (fromPageIndex === -1) {
        fromPageIndex = siblings.findIndex((route) => {
            if (!route.path) return false;
            const routeParts = route.path.split('/');
            const locParts = current_location.split('/');
            if (routeParts.length !== locParts.length) return false;
            return routeParts.every((part, i) => part.startsWith(':') || part === locParts[i]);
        });
    }

    if (toPageIndex === -1) {
        toPageIndex = siblings.findIndex((route) => {
            if (!route.path) return false;
            const routeParts = route.path.split('/');
            const locParts = toPage.split('/');
            if (routeParts.length !== locParts.length) return false;
            return routeParts.every((part, i) => part.startsWith(':') || part === locParts[i]);
        });
    }

    if (fromPageIndex === toPageIndex && fromPageIndex !== -1) {
        const getLastNumber = (path: string) => {
            const parts = path.split('/');
            const last = parts[parts.length - 1];
            const num = Number(last);
            return isNaN(num) ? null : num;
        };

        const fromNum = getLastNumber(current_location);
        const toNum = getLastNumber(toPage);

        if (fromNum !== null && toNum !== null) {
            if (fromNum > toNum) {
                return { x: '100%' };
            } else if (fromNum < toNum) {
                return { x: '-100%' };
            }
        }
    }

    const isGoingBack = fromPageIndex > toPageIndex && toPageIndex !== -1;
    return isGoingBack ? { x: '100%' } : { x: '-100%' };
};

const GetEnterMotionFromSiblings = (siblings: RouteType[], current_location: string, fromPage: string | -1) => {
    if (fromPage === -1) return { x: '-100%' };

    current_location = current_location.split('?')[0];
    fromPage = fromPage.split('?')[0];
    current_location = '/' + current_location.split('/').slice(2).join('/');
    fromPage = '/' + fromPage.split('/').slice(2).join('/');
    let fromPageIndex = siblings.findIndex((route) => route.path === fromPage);
    let toPageIndex = siblings.findIndex((route) => route.path === current_location);

    if (fromPageIndex === -1) {
        fromPageIndex = siblings.findIndex((route) => {
            if (!route.path) return false;
            const routeParts = route.path.split('/');
            const locParts = fromPage.split('/');
            if (routeParts.length !== locParts.length) return false;
            return routeParts.every((part, i) => part.startsWith(':') || part === locParts[i]);
        });
    }

    if (toPageIndex === -1) {
        toPageIndex = siblings.findIndex((route) => {
            if (!route.path) return false;
            const routeParts = route.path.split('/');
            const locParts = current_location.split('/');
            if (routeParts.length !== locParts.length) return false;
            return routeParts.every((part, i) => part.startsWith(':') || part === locParts[i]);
        });
    }

    if (fromPageIndex === toPageIndex && fromPageIndex !== -1) {
        const getLastNumber = (path: string) => {
            const parts = path.split('/');
            const last = parts[parts.length - 1];
            const num = Number(last);
            return isNaN(num) ? null : num;
        };

        const fromNum = getLastNumber(fromPage);
        const toNum = getLastNumber(current_location);

        if (fromNum !== null && toNum !== null) {
            if (fromNum > toNum) {
                return { x: '-100%' };
            } else if (fromNum < toNum) {
                return { x: '100%' };
            }
        }
    }

    const isGoingBack = fromPageIndex > toPageIndex;
    return isGoingBack ? { x: '-100%' } : { x: '100%' };
};

interface InsideAppVariantProps {
    from?: string;
    currentLocation: string;
    toPage: string | -1 | null;
    siblings: RouteType[];
}

const InsideAppAnimation = ({
    children,
    className,
    classNameOverride,
    siblings,
    animationEnabled,
}: {
    children: ReactNode;
    className?: string;
    classNameOverride?: string;
    motionProps?: HTMLMotionProps<'div'>;
    enable?: boolean;
    siblings: RouteType[];
    animationEnabled: boolean;
}) => {
    const app = useSelector(appStore);
    const location = useLocation();
    const state = location.state as {
        from?: string;
    };

    if (!animationEnabled) {
        return (
            <div
                className={
                    classNameOverride ??
                    cn(
                        'absolute left-[-1px] top-0 size-full !w-[302px] will-change-transform overflow-y-auto overflow-x-hidden px-3 pt-4 pb-12 bg-white',
                        className,
                    )
                }
            >
                {children}
            </div>
        );
    }

    return (
        <motion.div
            className={
                classNameOverride ??
                cn(
                    'absolute left-[-1px] top-0 size-full !w-[302px] will-change-transform overflow-y-auto overflow-x-hidden px-3 pt-4 pb-12 bg-white',
                    className,
                )
            }
            variants={{
                initial: ({ from, currentLocation, toPage, siblings }: InsideAppVariantProps) => {
                    if (from && from !== currentLocation && toPage) {
                        return GetEnterMotionFromSiblings(siblings, currentLocation, toPage == -1 ? -1 : from);
                    }

                    if (!toPage) {
                        return { x: '0%' };
                    }

                    return { x: '100%' };
                },
                animate: () => ({
                    x: '0%',
                }),
                exit: ({ toPage, siblings, currentLocation }: InsideAppVariantProps) => {
                    if (toPage) {
                        return GetExitMotionFromSiblings(siblings, currentLocation, toPage);
                    }

                    return { x: '-100%' };
                },
            }}
            initial='initial'
            animate='animate'
            exit='exit'
            custom={{
                from: state?.from,
                currentLocation: location.pathname,
                toPage: app.toPage,
                siblings: siblings,
            }}
            transition={{
                ease: 'easeInOut',
                duration: 0.2,
            }}
        >
            {children}
        </motion.div>
    );
};

const AppSubRoutes = ({ routes }: { routes: RouteType[] }) => {
    const location = useLocation();

    return (
        <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname}>
                {routes.map((route, idx) => (
                    <Route
                        key={route.path ?? (route.index ? 'index' : `route-${idx}`)}
                        index={route.index}
                        path={route.index ? undefined : route.path}
                        element={
                            <InsideAppAnimation
                                classNameOverride={route.classNameOverride}
                                className={route.className}
                                motionProps={route.motion}
                                siblings={routes}
                                animationEnabled={route.framerMotion ?? true}
                            >
                                {route.element}
                            </InsideAppAnimation>
                        }
                    />
                ))}
            </Routes>
        </AnimatePresence>
    );
};

export { AppSubRoutes, GetEnterMotionFromSiblings, GetExitMotionFromSiblings };
