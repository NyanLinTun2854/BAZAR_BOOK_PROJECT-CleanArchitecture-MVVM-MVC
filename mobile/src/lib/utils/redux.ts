import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

import {AppDispatch} from '@store/index';
import {RootState} from '@store/rootReducer';

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
