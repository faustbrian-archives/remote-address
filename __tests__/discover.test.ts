import "jest-extended";
import { discover } from "../src";

let request;
const remoteAddress = "127.0.0.1";

beforeEach(() => {
	request = { headers: {} };
});

describe("discover", () => {
	it('should pass with the "x-client-ip" header', () => {
		request.headers["x-client-ip"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "x-forwarded-for" header', () => {
		request.headers["x-forwarded-for"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "cf-connecting-ip" header', () => {
		request.headers["cf-connecting-ip"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "fastly-client-ip" header', () => {
		request.headers["fastly-client-ip"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "true-client-ip" header', () => {
		request.headers["true-client-ip"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "x-real-ip" header', () => {
		request.headers["x-real-ip"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "x-cluster-client-ip" header', () => {
		request.headers["x-cluster-client-ip"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "x-forwarded" header', () => {
		request.headers["x-forwarded"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "forwarded-for" header', () => {
		request.headers["forwarded-for"] = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "forwarded" header', () => {
		request.headers.forwarded = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "connection.remoteAddress" property', () => {
		request.connection = { remoteAddress };

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "socket.remoteAddress" property', () => {
		request.socket = { remoteAddress };

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "connection.socket.remoteAddress" property', () => {
		request.connection = { socket: { remoteAddress } };

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "info.remoteAddress" property', () => {
		request.info = { remoteAddress };

		expect(discover(request)).toBe(remoteAddress);
	});

	it('should pass with the "ip" property', () => {
		request.ip = remoteAddress;

		expect(discover(request)).toBe(remoteAddress);
	});
});
