import CryptoJS from "crypto-js";
export const encrypt = (data, key) => {
	return CryptoJS.AES.encrypt(
		data,
		import.meta.env.VITE_KEY_ENCRYPT
	).toString();
};

export const decrypt = (encryptedData, key) => {
	const bytes = CryptoJS.AES.decrypt(
		encryptedData,
		import.meta.env.VITE_KEY_ENCRYPT
	);
	return bytes.toString(CryptoJS.enc.Utf8);
};
