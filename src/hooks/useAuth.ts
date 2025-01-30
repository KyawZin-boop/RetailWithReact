import Cookies from "js-cookie"
import { useState } from "react"

export default function useAuth() {
	const token = Cookies.get("retail-app-token")
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!token)

	const userLogin = (input: string) => {
		Cookies.set("retail-app-token", input)
		console.log(input)
		setIsAuthenticated(true)
	}

	const userLogout = () => {
		Cookies.remove("retail-app-token")

		setIsAuthenticated(false)
	}

	return { isAuthenticated, userLogin, userLogout }
}