import { useEffect, useRef } from 'react';
import { AppSubRoutes } from './components/Animations';
import { useNuiCallback } from './hooks/useNui';
import { AppRoutes } from './routes';

const App = () => {
    const IsNUILoaded = useRef(false);

    const [NuiLoaded] = useNuiCallback('Core:NuiLoaded');

    useEffect(() => {
        if (IsNUILoaded.current) return;

        NuiLoaded().then(() => {
            setExternalRouting(
                window.name,
                AppRoutes.map((route) => ({
                    path: route.path,
                    index: route.index ?? false,
                })),
            );
        });

        IsNUILoaded.current = true;
    }, [NuiLoaded]);

    return (
        <div className='w-screen h-screen relative overflow-hidden'>
            <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
                <AppSubRoutes routes={AppRoutes} />
            </div>
        </div>
    );
};

export default App;