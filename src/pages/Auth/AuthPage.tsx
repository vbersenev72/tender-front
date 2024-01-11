import { useState, useEffect } from "react";
import { checkAuth } from "../../functions/CheckAuth.js";
import './authpage.css'

function AuthPage() {

    const [auth, useAuth] = useState<boolean>(false)

    const [isRegister, setIsRegister] = useState<boolean>(false)

    useEffect(() => {
        checkAuth()
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
                        'register'
                        :
                        "login"

                }
            </div>
        </div>
    );
}

export default AuthPage;