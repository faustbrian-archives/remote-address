import { isValid as isValidIP } from "ipaddr.js";

import { networkInterfaces } from "./interfaces";

export function isLocal(remoteAddress: string): boolean {
	if (!isValidIP(remoteAddress)) {
		return false;
	}

	if (remoteAddress.startsWith("127.")) {
		return true;
	}

	if (remoteAddress.startsWith("0.")) {
		return true;
	}

	return networkInterfaces("address").includes(remoteAddress);
}

export function isValid(remoteAddress: string): boolean {
	return isValidIP(remoteAddress);
}
