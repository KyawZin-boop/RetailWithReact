import DefaultLayout from "@/layouts/DefaultLayout";
import HomeView from "@/modules/home/HomeView";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "@/store";
import { Provider } from "react-redux";
import Loader from "@/components/Loader";
import { Toaster } from "./ui/toaster";
import AuthLayout from "@/layouts/AuthLayout";
import LoginView from "@/modules/home/auth/LoginView";
import NotFoundView from "@/modules/home/not-found/NotFoundView";
import ProductView from "@/modules/Product/ProductView";
import RecordView from "@/modules/Record/RecordView";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "",
				element: <HomeView />,
            },
			{
				path: "product",
				element: <ProductView />,
			},
			{
				path: "record",
				element: <RecordView />,
			}
		],
	},
	{
		path: "/auth",
		element: <AuthLayout />,
		children: [
			{
				path: "",
				element: <Navigate to="login" replace />,
			},
			{
				path: "login",
				element: <LoginView />,
			},
		],
	},
	{
		path: "*",
		element: <NotFoundView />,
	},
]);

const Wrapper = () => {
	const queryClient = new QueryClient();

	return (
		<>
			<Provider store={store}>
				<QueryClientProvider client={queryClient}>
					<Loader />
					<Toaster />
					<RouterProvider router={router}></RouterProvider>
				</QueryClientProvider>
			</Provider>
		</>
	);
};

export default Wrapper;