import { EncryptionParams } from "@/utils/cipher";

// 设置默认的缓存时间
export const DEFAULT_CACHE_TIME = 60 * 60 * 24;

// 进行缓存加密
export const enableStorageEncryption = __DEV__;

// 加密秘钥
export const storageKey: EncryptionParams = {
	key: "111122220000@@@@",
	iv: "_111122220000@@@",
};
