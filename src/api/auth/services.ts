import { LoginPayload } from "./types"
import axios from '../../configs/axios'

const baseUrl = 'User'

const login = async (credentials: LoginPayload) => {
    const response = await axios.post(`${baseUrl}/Login`, credentials)
    return response.data
}

export default { login }