import * as product from "./product/queries";
class API {
	product: typeof product;

	constructor() {
		this.product = product;
	}
}

const api = new API();

export default api;