import { FC, useContext, useEffect, useState } from 'react';
import { CompanyName, HeaderContainer } from "./styles";
import { ReactComponent as TenderLogo } from '../../assets/icons/TENDER.svg';
import { FlexRow } from "../../containers/containers";
import { TextWhite14pxRegular } from "../../constants/fonts";
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../../functions/CheckAuth';
import { AuthContext } from '../../AuthContext';

export const Header: FC = () => {

    const navigate = useNavigate()
    const { auth, setAuth }: any = useContext(AuthContext)

    const [isAuth, setIsAuth] = useState(false)


    const redirectToAuth = () => {
        navigate('/auth')
    }



    useEffect(() => {
        const check: any = checkAuth().then((auth) => {
            setIsAuth(auth)
            console.log(auth);
        })
        console.log(check + 'check');

        setIsAuth(check)
    }, [])

    return (
        <HeaderContainer>
            <TenderLogo />
            {
                isAuth
                    ?
                    <FlexRow >
                        <CompanyName>
                            <TextWhite14pxRegular>Название компании</TextWhite14pxRegular>
                        </CompanyName>
                    </FlexRow>
                    :
                    <FlexRow style={{ width: '270px' }}>
                        <CompanyName onClick={() => redirectToAuth()} style={{ backgroundColor: 'green', cursor: 'pointer' }}>
                            <TextWhite14pxRegular>Авторизация</TextWhite14pxRegular>
                        </CompanyName>
                        <CompanyName>
                            <TextWhite14pxRegular>Название компании</TextWhite14pxRegular>
                        </CompanyName>
                    </FlexRow>
            }
        </HeaderContainer>
    );
}