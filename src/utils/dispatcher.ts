class Dispatcher<T> {
	private _currentListeners: ((action: T) => void)[] | null;

	private _nextListeners: ((action: T) => void)[];

	public constructor() {
		this._currentListeners = this._nextListeners = [];
	}

	public subscribe(listener: (action: T) => void): () => void {
		this._ensureCanMutateNextListeners();

		this._nextListeners.push(listener);

		let isSubscribed = false;

		return () => {
			if (isSubscribed) {
				return;
			}
			isSubscribed = true;
			this._ensureCanMutateNextListeners();

			const index = this._nextListeners.indexOf(listener);

			this._nextListeners.splice(index, 1);

			this._currentListeners = null;
		};
	}

	private _ensureCanMutateNextListeners() {
		if (this._currentListeners === this._nextListeners) {
			this._nextListeners = this._currentListeners.slice();
		}
	}

	public dispatch(action: T): T {
		const listeners = (this._currentListeners = this._nextListeners);

		for (let i = 0; i < listeners.length; i++) {
			const listener = listeners[i];
			listener(action);
		}
		return action;
	}
}
