import Stores from "@stores/index";
import { Provider } from "mobx-react";
import type { JSXElementConstructor, ReactElement } from "react";
import React from "react";
import ReactDOM from 'react-dom';
import "./index.scss";
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';

type CONFIG = {
	size?: string | null,
	zIndex?: string,
	trasitionType?: string | number,
	getContainer?: string,
}

export class CreatePortal<T> {

	public transitionTime = 150;

	public config: CONFIG;

	public wrapped: React.FC<T>;

	public dom: HTMLElement = null;

	constructor(wrapped: React.FC<T>, config: CONFIG) {
		this.config = config;
		this.wrapped = wrapped;
	}

	popup(props: T | any) { // 只是传props进来，别的不管
		return this._render(props);
	}

	public destroy() {
		console.log("执行销毁事件");
	}

	_render(props: T): Promise<any> {

		return new Promise((resolve, reject) => {
			const div = document.createElement("div");
			const Wrapped: React.FC<T> = this.wrapped;
			const config = this.config;
			div.style.zIndex = config.zIndex ?? '3';
			const body = config.getContainer ? document.querySelector(config.getContainer) : document.body;

			body.appendChild(div);

			this.dom = div;
			this.destroy = this._onClose.bind(this, div, body, reject);
			// 动画效果
			div.className = this._getClassName() + " transition-before";
			this._transition(div, div.className + ' transition-complete');
			ReactDOM.render(
				<Provider {...Stores}>
					<ConfigProvider locale={zhCN}>
						<Wrapped
							{...props}
							onClose={() => this._onClose(div, body, reject)}
							onSure={(res: any) => this._onSure(div, body, () => resolve(res))}
						/>
					</ConfigProvider>

				</Provider>,
				div
			);
		});
	}

	_onClose(dom: Element, container: Element, reject: (reason?: any) => void) {
		reject();

		this._transition(dom, this._getClassName());

		const _timer = setTimeout(() => {

			try {
				if (container.contains(dom)) {
					container.removeChild(dom);

				}
			} catch (error) {
				console.log(container);

				console.error(error);
			}
			clearTimeout(_timer);

		}, this.transitionTime);
	}

	_onSure(dom: Element, container: Element, resolve: () => void) {
		resolve();
		this._transition(dom, this._getClassName());
		const _timer = setTimeout(() => {
			container.removeChild(dom);
			this.dom = null;
			clearTimeout(_timer);
		}, this.transitionTime);
	}

	_getClassName(): string {

		if (this.config.trasitionType) {
			switch (this.config.trasitionType) {
				case "slide":
					return "c-portal c-portal-slide";

				default:
					return "c-portal";
			}
		} else {
			switch (this.config.size) {
				case "full":
					return "c-portal c-portal-modal full-screen";
				case "w800":
					return "c-portal c-portal-modal w800";
				case "w900":
					return "c-portal c-portal-modal w900";
				case "w1100":
					return "c-portal c-portal-modal w1100";
				case "w1200":
					return "c-portal c-portal-modal w1200";
				case "w1300":
					return "c-portal c-portal-modal w1300";
				case "w1400":
					return "c-portal c-portal-modal w1400";
				default:
					return "c-portal c-portal-modal";
			}
		}
	}

	_transition(div: Element, className: string) {
		const _timer = setTimeout(() => {
			div.className = className.replace("transition-before", "");
			clearTimeout(_timer);
		}, 0);
	}
}
