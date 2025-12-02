import type { RouteType } from '@/types/types';
import { AuthLogin, AuthRegister } from '@/views/Auth';

import Homepage from '@/views/Homepage';
import Page from '@/views/Page';

export const AppRoutes: RouteType[] = [
    {
        path: '/',
        element: <Homepage />,
        className: '',
    },
    {
        path: '/page',
        element: <Page />,
        className: '',
    },
    {
        path: '/auth',
        element: <AuthLogin />,
        className: '',
    },
    {
        path: '/auth/register',
        element: <AuthRegister />,
        className: '',
    },
];
