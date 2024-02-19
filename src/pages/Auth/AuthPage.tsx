import { useState, useEffect } from "react";
import { checkAuth } from "../../functions/CheckAuth.js";
import './authpage.css'
import { AuthPageInput } from "../../components/AuthPageInput/AuthPageInput";
import axios from "axios";
import { showErrorMessage, showSuccesMessage } from "../../functions/Message";
import { AuthNotifModal } from "../../components/NotifModal/AuthNotifModal";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MuiModal from "../../components/MuiModal/MuiModal";

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [openRecoveryModal, setOpenRecoveryModal] = useState(false)

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

    async function submitFunction() {
        showSuccesMessage('На вашу почту выслан новый пароль!')
    }

    return (
        <div className="authmenucontentlogin">
            {
                openRecoveryModal && <MuiModal title={'Восстановление пароля'} text={'На вашу почту будет выслан новый пароль!'} submitFunction={submitFunction} open={openRecoveryModal} setOpen={setOpenRecoveryModal} />

            }

            <div style={{ width: 'fit-content', }}>
                <h3 style={{ margin: '30px', width: 'fit-content', fontSize: '20px' }}>Войти в личный кабинет</h3>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', justifyContent: "center", alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>Email</p>
                    <AuthPageInput setInput={setEmail} value={email} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: "30px", alignItems: 'center' }}>
                    <p style={{ marginRight: '10px', marginLeft: "-18px" }}>Пароль</p>
                    <AuthPageInput setInput={setPassword} value={password} />
                </div>
                <div style={{ display: 'grid', grid: 'center' }}>
                    <div className="authmenucontentloginbutton" onClick={async () => await login()}>
                        <p>Авторизоваться</p>
                    </div>
                    <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => setOpenRecoveryModal(true)} >
                        <p>Забыли пароль?</p>
                    </div>
                </div>
                <div style={{ position: 'absolute', top: '550px', display: 'flex', justifyContent: 'center', width: '100%', left: '0' }}>
                    <p style={{fontSize: '14px'}}>Нажимая <span style={{ textDecoration: 'underline' }}>Авторизоваться</span> вы соглашаетесь с лицензионным соглашением</p>
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

            if (email == '' || phone == '' || inn == '' || name == '') {
                return showErrorMessage('Все поля должны быть заполнены')
            }

            const resposnse = await axios.post(`${process.env.REACT_APP_API}/api/auth/register`, {
                email: email,
                phone: phone,
                inn: inn,
                name: name
            })

            showSuccesMessage('Письмо с паролем направлено на вашу почту.')
            openModal()



        } catch (error) {
            console.log(error);

            showErrorMessage('Пользователь уже существует')
        }
    }


    return (
        <div className="authmenucontentlogin">
            <AuthNotifModal isOpen={isOpen} closeModal={closeModal} />
            <div style={{ width: 'fit-content' }}>
                <h3 style={{ margin: '30px', marginBottom: '0', width: 'fit-content', fontSize: '20px' }}>Для использования личного кабинета необходимо зарегистрироваться</h3>
                <p style={{ margin: '30px', marginTop: '10px', width: '100%', display: 'flex', justifyContent: 'center', fontSize: '14px' }}>После регистрации будет доступен тестовый доступ</p>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px', justifyContent: "center", alignItems: 'center' }}>
                    <p style={{ marginRight: '10px' }}>Имя</p>
                    <AuthPageInput setInput={setName} value={name} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: "10px", alignItems: 'center' }}>
                    <p style={{ marginRight: '10px', marginLeft: "-8px" }}>Email</p>
                    <AuthPageInput setInput={setEmail} value={email} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: "10px", alignItems: 'center' }}>
                    <p style={{ marginRight: '10px', marginLeft: "-34px" }}>Телефон</p>
                    <AuthPageInput setInput={setPhone} value={phone} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", marginBottom: "30px", alignItems: 'center' }}>
                    <p style={{ marginRight: '10px', marginLeft: "-4px" }}>ИНН</p>
                    <AuthPageInput setInput={setInn} value={inn} />
                </div>
                <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <div className="authmenucontentloginbutton" style={{width: '320px'}} onClick={async () => await register()}>
                        <p>Зарегистрироваться</p>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <div style={{ position: 'absolute', top: '550px', display: 'flex', justifyContent: 'center', width: '100%', left: '0' }}>
                    <p style={{fontSize: '14px'}}>Нажимая <span style={{ textDecoration: 'underline' }}>Зарегистрироваться</span> вы соглашаетесь с лицензионным соглашением</p>
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