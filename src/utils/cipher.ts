import { encrypt, decrypt } from "crypto-js/aes";
import { parse } from "crypto-js/enc-utf8";
import pkcs7 from "crypto-js/pad-pkcs7";
import ECB from "crypto-js/mode-ecb";
import md5 from "crypto-js/md5";
import UTF8 from "crypto-js/enc-utf8";
import Base64 from "crypto-js/enc-base64";
import { storageKey } from "../config/encryptionSetting";

export interface EncryptionParams {
	key: string;
	iv: string;
}

export class AesEncryption {
	private key: any;
	private iv: any;

	constructor(opt: Partial<EncryptionParams> = {}) {
		const { key = storageKey.key, iv = storageKey.iv } = opt;
		this.validateKey({ key, iv });
		this.key = parse(key);
		this.iv = parse(iv);
	}

	get getOptions() {
		return {
			mode: ECB,
			padding: pkcs7,
			iv: this.iv,
		};
	}

	encryptByAES(cipherText: string) {
		return encrypt(cipherText, this.key, this.getOptions).toString();
	}

	decryptByAES(cipherText: string) {
		return decrypt(cipherText, this.key, this.getOptions).toString(UTF8);
	}

	validateKey(opt: Partial<EncryptionParams> = {}) {
		const { key = "", iv = "" } = opt;
		if ([key, iv].some((item) => item.length !== 16)) {
			throw new Error(
				"When hasEncrypt is true, the key or iv must be 16 bits!",
			);
		}
	}
}

export function encryptByBase64(cipherText: string) {
	return UTF8.parse(cipherText).toString(Base64);
}

export function decodeByBase64(cipherText: string) {
	return Base64.parse(cipherText).toString(UTF8);
}

export function encryptByMd5(password: string) {
	return md5(password).toString();
}
