import * as product from "./product/queries";
import * as record from "./record/queries"
class API {
	product: typeof product;
	record: typeof record;

	constructor() {
		this.product = product;
		this.record = record;
	}
}

const api = new API();

export default api;