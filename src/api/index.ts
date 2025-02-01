import * as product from "./product/queries";
import * as record from "./record/queries"
import * as cart from "./cart/queries"
class API {
	product: typeof product;
	record: typeof record;
	cart: typeof cart;

	constructor() {
		this.product = product;
		this.record = record;
		this.cart = cart;
	}
}

const api = new API();

export default api;