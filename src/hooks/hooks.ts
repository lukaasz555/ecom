import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { useNavigate, createSearchParams } from 'react-router-dom';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useNavigationSearch = () => {
	const navigate = useNavigate();
	return (pathname: string, params: Record<string, string>) =>
		navigate({
			pathname,
			search: `${createSearchParams(params)}`,
		});
};
