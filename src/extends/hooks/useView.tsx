import React, { createContext, useContext } from 'react';
import type { Dispatch } from 'react';
import type { Action } from '@views/_common/layout/Reducer';

export interface ViewContextType {
	name?: string
	dispatch?: Dispatch<Action>
	mate?: any
}
const ViewContext = createContext<ViewContextType>({});
const Provider = ViewContext.Provider;
export const useView = () => {
	// const routeContext = React.useContext(RouteContext)
	return useContext(ViewContext);
};
interface Props {
	children: JSX.Element
	value: ViewContextType
}
export const ViewProvider = ({ value, children }: Props) => <Provider value={value}>{children}</Provider>;
