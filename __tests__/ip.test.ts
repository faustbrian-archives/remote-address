import "jest-extended";
import { internalv4, internalv6, isLocal, isValid, networkInterfaces } from "../src";

describe("isLocal", () => {
	it("should pass for 127.* addresses", () => {
		expect(isLocal("127.0.0.1")).toBeTrue();
	});

	it("should pass for 0.* addresses", () => {
		expect(isLocal("0.0.0.0")).toBeTrue();
	});

	it("should fail for any public addresses", () => {
		expect(isLocal("223.255.255.255")).toBeFalse();
	});
});

describe("internalv4", () => {
	it("should pass", () => {
		expect(internalv4()).toBeString();
	});
});

describe("internalv6", () => {
	it("should pass", () => {
		const address = internalv6();

		process.env.GITHUB_ACTIONS ? expect(address).toBeUndefined() : expect(address).toBeString();
	});
});

describe("isValid", () => {
	it("should pass", () => {
		expect(isValid("223.255.255.255")).toBeTrue();
	});

	it("should fail", () => {
		expect(isValid("invalid")).toBeFalse();
	});
});

describe("networkInterfaces", () => {
	it("should pass with a field", () => {
		const addresses = networkInterfaces("address");
		expect(addresses).toBeArray();
		expect(addresses[0]).toBe("127.0.0.1");
	});

	it("should pass without a field", () => {
		const addresses = networkInterfaces();
		expect(addresses).toBeArray();
		expect(addresses[0]).toBeObject();
		expect(addresses[0].address).toBe("127.0.0.1");
	});
});
