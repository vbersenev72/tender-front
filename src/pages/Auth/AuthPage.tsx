import { useState, useEffect } from "react";
import { checkAuth } from "../../functions/CheckAuth.js";
import './authpage.css'
import { AuthPageInput } from "../../components/AuthPageInput/AuthPageInput";
import axios from "axios";
import { showErrorMessage, showSuccesMessage } from "../../functions/Message";
import { AuthNotifModal } from "../../components/NotifModal/AuthNotifModal";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')



    useEffect(() => {

    }, [])

    async function login() {
        try {

            if (email == '' || password == '') {
                console.log('Все поля должны быть заполнены');

                return showErrorMessage('Все поля должны быть заполнены')
            }

            const response = await axios.post(`${process.env.REACT_APP_API}/api/auth/login`, {
                email: email,
                password: password
            })

            const token = response.data.token

            localStorage.setItem('token', token)

            window.location.href = '/'

        } catch (error) {
            showErrorMessage('Проверьте правильность введённых данных')
        }
    }

    return (
        <div className="authmenucontentlogin">
            <div style={{ width: 'fit-content' }}>
                <h3 style={{ margin: '30px', width: 'fit-content', fontSize: '20px' }}>Войти в личный кабинет</h3>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', justifyContent: "center" }}>
                    <p style={{ marginRight: '10px' }}>Email:</p>
                    <AuthPageInput setInput={setEmail} value={email} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: "30px" }}>
                    <p style={{ marginRight: '10px', marginLeft: "-18px" }}>Пароль:</p>
                    <AuthPageInput setInput={setPassword} value={password} />
                </div>
                <div className="authmenucontentloginbutton" onClick={async () => await login()}>
                    <p>Авторизоваться</p>
                </div>
            </div>
        </div>
    )

}

function Register() {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [inn, setInn] = useState('')

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () => {
        setIsOpen(false);
    };

    const openModal = () => {
        setIsOpen(true);
    };


    async function register() {
        try {
            const resposnse = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {
                email: email,
                phone: phone,
                inn: inn,
                name: name
            })

            showSuccesMessage('Письмо с паролем направлено на вашу почту.')
            openModal()



        } catch (error) {
            showErrorMessage('Пользователь уже существует')
        }
    }


    return (
        <div className="authmenucontentlogin">
            <AuthNotifModal isOpen={isOpen} closeModal={closeModal} />
            <div style={{ width: 'fit-content' }}>
                <h3 style={{ margin: '30px', width: 'fit-content', fontSize: '20px' }}>Для использования личного кабинета необходимо зарегистрироваться</h3>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', justifyContent: "center" }}>
                    <p style={{ marginRight: '10px' }}>Имя:</p>
                    <AuthPageInput setInput={setName} value={name} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: "10px" }}>
                    <p style={{ marginRight: '10px', marginLeft: "-8px" }}>Email:</p>
                    <AuthPageInput setInput={setEmail} value={email} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: "10px" }}>
                    <p style={{ marginRight: '10px', marginLeft: "-34px" }}>Телефон:</p>
                    <AuthPageInput setInput={setPhone} value={phone} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: "30px" }}>
                    <p style={{ marginRight: '10px', marginLeft: "-4px" }}>ИНН:</p>
                    <AuthPageInput setInput={setInn} value={inn} />
                </div>
                <div className="authmenucontentloginbutton" onClick={async () => await register()}>
                    <p>Зарегистрироваться</p>
                </div>
            </div>
        </div>
    )
}

function AuthPage() {

    const [auth, useAuth] = useState<boolean>(false)

    const [isRegister, setIsRegister] = useState<boolean>(false)

    useEffect(() => {

    })


    return (
        <div className="authcontainer">
            <div className="authmenucontainer">
                <div className="authmenubody">
                    <div className="authmenuproperty">
                        <div onClick={() => setIsRegister(false)} className={!isRegister ? "authmenuprop" : "authmenupropactive"}><p>Авторизация</p></div>
                        <div onClick={() => setIsRegister(true)} className={isRegister ? "authmenuprop" : "authmenupropactive"}><p>Регистрация</p></div>
                    </div>
                </div>
            </div>
            <div className="authmenucontent">
                {
                    isRegister
                        ?
                        <Register />
                        :
                        <Login />

                }
            </div>
        </div>
    );
}

export default AuthPage;