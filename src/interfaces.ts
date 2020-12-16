import flatten from "lodash.flatten";
import map from "lodash.map";
import { networkInterfaces as osInterfaces } from "os";

export function networkInterfaces(field?: string): any[] {
	const interfaces = Object.values(osInterfaces());

	return field ? flatten(interfaces.map(i => map(i, field))) : flatten(interfaces);
}
