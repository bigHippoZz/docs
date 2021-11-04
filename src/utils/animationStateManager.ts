import { isThenable } from "./is";

export interface IRect {
	left: number;
	top: number;
}
export interface AnimationState {
	target: AnimationElement;
	fromRect?: IRect;
	toRect?: IRect;
}
export interface AnimationElement extends HTMLElement {
	_callback: ((event?: TransitionEvent) => void) | null;
	_animating?: boolean | null;
}

export type AnimationManagerOptions = KeyframeAnimationOptions;

const getRect = (el: HTMLElement): IRect => {
	const rect = el.getBoundingClientRect();
	return {
		left: rect.left,
		top: rect.top,
	};
};

const forceReflow = () => {
	document.body.offsetTop;
};

// const matrix = (target: Node | null, selfOnly: boolean = true): IRect => {
// 	let appliedTransform = "";
// 	do {
// 		const { transform } = window.getComputedStyle(target as any);
// 		appliedTransform = transform + " " + appliedTransform;
// 	} while (!selfOnly && (target = target!.parentNode));
// 	const matrixConstructor =
// 		window.DOMMatrix ||
// 		window.WebKitCSSMatrix ||
// 		// @ts-ignore
// 		window.CSSMatrix ||
// 		// @ts-ignore
// 		window.MSCSSMatrix;
// 	const instance = new matrixConstructor(appliedTransform);
// 	return {
// 		top: instance?.f ?? 0,
// 		left: instance?.e ?? 0,
// 	};
// };

const equalsRect = (a: IRect, b: IRect): boolean => {
	return (
		Math.round(a.left) === Math.round(b.left) &&
		Math.round(a.top) === Math.round(b.top)
	);
};

export class AnimationManager {
	private _animationState: AnimationState[] = [];
	constructor(
		private el: HTMLElement,
		readonly options: AnimationManagerOptions,
	) {}
	public async withAnimation(executor: () => Promise<void> | void) {
		this._captureAnimationState();
		let result: ReturnType<typeof executor>;
		if (isThenable((result = executor()))) {
			result.then(() => this._animated());
		} else {
			this._animated();
		}
	}

	private _captureAnimationState() {
		this._animationState.length = 0;
		const children = Array.from(this.el.children);
		children.forEach((child) => {
			const rect = getRect(child as HTMLElement);
			const position = {
				target: child as AnimationElement,
				fromRect: rect,
			} as AnimationState;
			this._animationState.push(position);
		});
	}

	private _animated() {
		// 读 写分离能够有效的防止图层抖动
		this._animationState.forEach(this._callPendingAnimation.bind(this));
		this._animationState.forEach(this._recordAnimationPosition.bind(this));
		const movedChild = this._animationState.filter(
			this._moveElementToPosition.bind(this),
		);
		// 回流
		forceReflow();
		movedChild.forEach(this._backToOriginalPosition.bind(this));
		this._animationState.length = 0;
	}

	private _callPendingAnimation(state: AnimationState) {
		state.target._callback?.();
	}

	private _recordAnimationPosition(state: AnimationState) {
		state.toRect = getRect(state.target);
	}

	private _moveElementToPosition(state: AnimationState) {
		let child = state.target,
			fromRect = state.fromRect!,
			toRect = state.toRect!;
		const style = child.style;
		if (!equalsRect(fromRect, toRect)) {
			const transformX = fromRect.left - toRect.left;
			const transformY = fromRect.top - toRect.top;
			style.transform = `translate(${transformX}px,${transformY}px)`;
			style.transition = ``;
			return state;
		}
	}
	private _backToOriginalPosition(state: AnimationState) {
		let child = state.target;
		const style = child.style;
		style.transform = ``;
		style.transition = `transform ${this.options.duration}ms ${
			this.options.easing ?? "ease"
		}`;
		child._animating = true;
		const transitionedHandler = ((child as AnimationElement)._callback = (
			event: TransitionEvent,
		) => {
			if (event && event.target !== child) {
				return;
			}
			event && (child._animating = null);
			if (!event || /transform$/.test(event.propertyName)) {
				child.removeEventListener("transitionend", transitionedHandler);
				child._callback = null;
				style.transform = ``;
				style.transition = ``;
			}
		});
		child.addEventListener("transitionend", transitionedHandler);
	}
}
