import { useDispatch } from 'react-redux';

import { useNuiEvent } from '@/hooks/useNui';
import { updateApp } from '@/store/appSlice';

export const AppStoreManager = () => {
    const dispatch = useDispatch();

    useNuiEvent<string>('App:SetResourceName', (resourceName) => {
        dispatch(updateApp('resourceName', resourceName));
    });

    return null;
};
