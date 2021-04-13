import { v4, v6 } from "default-gateway";
import { isValid, parse, parseCIDR } from "ipaddr.js";

import { networkInterfaces } from "./interfaces";

function findAddressByGateway(gateway: string): string | undefined {
	const gatewayIp = parse(gateway);
	let ip: string | undefined;

	networkInterfaces().some((addr) => {
		const prefix = parse(addr.netmask).prefixLengthFromSubnetMask();
		const network = parseCIDR(`${addr.address}/${prefix}`);

		const sameKind: boolean = network[0].kind() === gatewayIp.kind();

		// @ts-ignore
		if (network[0] && sameKind && gatewayIp.match(network)) {
			ip = network[0].toString();
		}

		return Boolean(ip);
	});

	if (!isValid(ip as string)) {
		ip = undefined;
	}

	return ip;
}

export function internalv4(): string | undefined {
	try {
		return findAddressByGateway(v4.sync().gateway);
	} catch (err) {
		return undefined;
	}
}

export function internalv6(): string | undefined {
	try {
		return findAddressByGateway(v6.sync().gateway);
	} catch (err) {
		return undefined;
	}
}
