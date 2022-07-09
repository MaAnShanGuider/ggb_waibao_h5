import { JsxEmit } from "typescript";

declare global {
	interface RouteInstance {
		name: string,
		component?: React.LazyExoticComponent<() => JSX.Element> | JsxEmit.Element,
		redirectTo?: string,
		children?: RouteInstance[],
		path?: string,
		meta?: {
			keepAlive: boolean
		}
	}
}