import axios from "axios"
import { showErrorMessage } from "./Message"

export async function checkAuth() {

    try {
        const token = localStorage.getItem('token')

        if (token) {
            const response = await axios.post(process.env.REACT_APP_API + '/api/auth/auth', {}, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).catch(() => {
                showErrorMessage('Вы не авторизованы. Доступ ограничен')
            })

            const newToken = response.data.token
            localStorage.setItem('token', newToken)

            return true
        }

        console.log('Вы не авторизованы');

        return false

    } catch (error) {
        console.log(error);
        return false
    }

}