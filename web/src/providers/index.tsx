import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import store from '@/store';

import LanguageProvider from './LanguageProvider';
import NavigateProvider from './NavigateProvider';
import NuiProvider from './NuiProvider';
import { ExternalAuthProvider } from './ExternalAuthProvider';

const ProvidersManager = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <NavigateProvider>
                <ExternalAuthProvider authPage='/auth' homePage='/'>
                    <NuiProvider>
                        <LanguageProvider>{children}</LanguageProvider>
                    </NuiProvider>
                </ExternalAuthProvider>
            </NavigateProvider>
        </Provider>
    );
};

export default ProvidersManager;
