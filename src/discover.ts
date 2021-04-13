import { isValid, parse } from "ipaddr.js";

const defaultHeaders = [
	"x-client-ip",
	"x-forwarded-for",
	"cf-connecting-ip",
	"fastly-client-ip",
	"true-client-ip",
	"x-real-ip",
	"x-cluster-client-ip",
	"x-forwarded",
	"forwarded-for",
	"forwarded",
];

function containsAddress(
	header: string,
	request: any,
	headers: string[]
): boolean {
	return headers.includes(header) && isValid(request.headers[header]);
}

function addressToString(value: string): string | undefined {
	try {
		return parse(value).toString();
	} catch (error) {
		return undefined;
	}
}

export function discoverFromHeader(
	header: string,
	request: any
): string | undefined {
	return isValid(request.headers[header])
		? addressToString(request.headers[header])
		: undefined;
}

export function discoverXClientIp(request: any): string | undefined {
	return discoverFromHeader("x-client-ip", request);
}

export function discoverXForwardedFor(request: any): string | undefined {
	const header = request.headers["x-forwarded-for"];

	if (!header) {
		return undefined;
	}

	return header
		.split(",")
		.map((e: string) => {
			const ip = e.trim();

			if (ip.includes(":")) {
				const splitted = ip.split(":");

				if (splitted.length === 2) {
					return splitted[0];
				}
			}
			return ip;
		})
		.map(addressToString)
		.find(isValid);
}

export function discoverCFConnectingIp(request: any): string | undefined {
	return discoverFromHeader("cf-connecting-ip", request);
}

export function discoverFastlyClientIp(request: any): string | undefined {
	return discoverFromHeader("fastly-client-ip", request);
}

export function discoverTrueClientIp(request: any): string | undefined {
	return discoverFromHeader("true-client-ip", request);
}

export function discoverXRealIp(request: any): string | undefined {
	return discoverFromHeader("x-real-ip", request);
}

export function discoverXClusterClientIp(request: any): string | undefined {
	return discoverFromHeader("x-cluster-client-ip", request);
}

export function discoverXForwarded(request: any): string | undefined {
	return discoverFromHeader("x-forwarded", request);
}

export function discoverForwardedFor(request: any): string | undefined {
	return discoverFromHeader("forwarded-for", request);
}

export function discoverForwarded(request: any): string | undefined {
	return discoverFromHeader("forwarded", request);
}

export function discover(
	request: any,
	headers: string[] = []
): string | undefined {
	if (!headers.length) {
		headers = defaultHeaders;
	}

	if (request.headers && headers) {
		if (containsAddress("x-client-ip", request, headers)) {
			return request.headers["x-client-ip"];
		}

		if (headers.includes("x-forwarded-for")) {
			const remoteAddress = discoverXForwardedFor(request);

			if (remoteAddress) {
				return remoteAddress;
			}
		}

		if (containsAddress("cf-connecting-ip", request, headers)) {
			return addressToString(request.headers["cf-connecting-ip"]);
		}

		if (containsAddress("fastly-client-ip", request, headers)) {
			return addressToString(request.headers["fastly-client-ip"]);
		}

		if (containsAddress("true-client-ip", request, headers)) {
			return addressToString(request.headers["true-client-ip"]);
		}

		if (containsAddress("x-real-ip", request, headers)) {
			return addressToString(request.headers["x-real-ip"]);
		}

		if (containsAddress("x-cluster-client-ip", request, headers)) {
			return addressToString(request.headers["x-cluster-client-ip"]);
		}

		if (containsAddress("x-forwarded", request, headers)) {
			return addressToString(request.headers["x-forwarded"]);
		}

		if (containsAddress("forwarded-for", request, headers)) {
			return addressToString(request.headers["forwarded-for"]);
		}

		if (containsAddress("forwarded", request, headers)) {
			return addressToString(request.headers.forwarded);
		}
	}

	if (request.connection) {
		if (isValid(request.connection.remoteAddress)) {
			return addressToString(request.connection.remoteAddress);
		}

		if (
			request.connection.socket &&
			isValid(request.connection.socket.remoteAddress)
		) {
			return addressToString(request.connection.socket.remoteAddress);
		}
	}

	if (request.socket && isValid(request.socket.remoteAddress)) {
		return addressToString(request.socket.remoteAddress);
	}

	if (request.info && isValid(request.info.remoteAddress)) {
		return addressToString(request.info.remoteAddress);
	}

	if (request.ip && isValid(request.ip)) {
		return addressToString(request.ip);
	}

	if (
		request.requestContext &&
		request.requestContext.identity &&
		isValid(request.requestContext.identity.sourceIp)
	) {
		return addressToString(request.requestContext.identity.sourceIp);
	}

	return undefined;
}
