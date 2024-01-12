import axios from "axios"

export async function checkAuth() {

    const token = localStorage.getItem('token')

    if (token) {
        const response = await axios.post(process.env.REACT_APP_API+'/api/auth/auth', {}, {
            headers: {
                authorization: token
            }
        })

        if (response.status == 400 || response.status == 401) {
            // console.log('Вы не авторизованы');
        } else {
            const token = response.data.token
            localStorage.setItem('token', token)

            return true
        }
    }

    console.log('Вы не авторизованы');


    return false

}