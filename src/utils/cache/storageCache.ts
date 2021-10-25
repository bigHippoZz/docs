import { DEFAULT_CACHE_TIME } from "@/config/encryptionSetting";
import { AesEncryption } from "../cipher";

export interface IStorageCache {
	storage?: Storage;
	prefixKey?: string;
	encryption?: AesEncryption;
	hasEncryption?: boolean;
	timeout?: number | null;
	onError?: (value: any) => void;
}

export class StorageCache {
	private _storage: Storage = sessionStorage;
	private _prefixKey: string = "";
	private _encryption: AesEncryption;
	private _hasEncryption = true;
	private _timeout: number | null;
	public onError = (value: any) => console.log(value);

	constructor(options: IStorageCache) {
		const {
			storage,
			prefixKey,
			encryption,
			hasEncryption,
			timeout,
			onError,
		} = options;
		this._storage = storage ?? this._storage;
		this._prefixKey = prefixKey ?? this._prefixKey;
		this._encryption = encryption ?? new AesEncryption();
		this._hasEncryption = hasEncryption ?? this._hasEncryption;
		this._timeout = timeout ?? DEFAULT_CACHE_TIME;
		this.onError = onError ?? this.onError;
	}

	private _getKey(key: string) {
		return `${this._prefixKey}${key}`;
	}

	set(key: string, value: any, expire?: number | null) {
		try {
			// 设置缓存时间
			expire = expire ? expire : this._timeout ? this._timeout : null;
			const cacheData = JSON.stringify({
				value,
				time: new Date(),
				expire: expire ? new Date().getTime() + expire * 1000 : null,
			});
			// 判断是否要进行缓存
			const realData = this._hasEncryption
				? this._encryption.encryptByAES(cacheData)
				: cacheData;
			this._storage.setItem(this._getKey(key), realData);
			return true;
		} catch (error) {
			this.onError(error);
			return false;
		}
	}

	get(key: string, defaultValue?: any) {
		const cacheData = this._storage.getItem(this._getKey(key));
		if (!cacheData) {
			return defaultValue;
		}
		try {
			const decVal = this._hasEncryption
				? this._encryption.decryptByAES(cacheData)
				: cacheData;
			const { value, expire } = JSON.parse(decVal);
			if (!expire || expire >= new Date().getTime()) {
				return value;
			}
			this.remove(key);
			return null;
		} catch (error) {
			this.onError(error);
			return defaultValue;
		}
	}

	remove(key: string) {
		this._storage.removeItem(this._getKey(key));
	}

	clear() {
		this._storage.clear();
	}
}
