import { FC, useContext, useEffect, useState } from 'react';
import { CompanyName, HeaderContainer, InfoLog, InfoLogItem } from "./styles";
import { ReactComponent as TenderLogo } from '../../assets/icons/TENDER.svg';
import { FlexRow } from "../../containers/containers";
import { TextWhite14pxRegular } from "../../constants/fonts";
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../../functions/CheckAuth';
import { AuthContext } from '../../AuthContext';
import BellIcon from './InfoLogComponents/BellIcon';
import MailIcon from './InfoLogComponents/MailIcon';
import UploadIcon from './InfoLogComponents/UploadIcon';
import axios from 'axios';
import { CDropdownMenu, CDropdownItem } from '@coreui/react';


export const Header: FC = () => {

    const navigate = useNavigate()

    const { auth, setAuth }: any = useContext(AuthContext)

    const [showAutoSearchList, setShowAutoSearchList] = useState(false)

    const [isAuth, setIsAuth] = useState(false)
    const [autoSearchList, setAutoSearchList] = useState<any>([])
    const [sum, setSum] = useState(0)

    const redirectToAuth = () => {
        navigate('/auth')
    }


    const getAutoSearches = async () => {
        try {

            const response = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/autosearches/all`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            const autoSearchList = response.data.message

            const result: any = []

            for (let i = 0; i < autoSearchList.length; i++) {
                const element = autoSearchList[i];

                const countTenders = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/count/${element.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                result.push({ ...element, count: countTenders.data.message })

            }

            console.log(result);

            let sumForAll = 0
            for (let i = 0; i < result.length; i++) {
                const autoSearch: any = result[i];
                setSum(sumForAll += autoSearch.count)
            }

            setSum(sumForAll)
            setAutoSearchList([...result])

        } catch (error) {
            console.log(error);
            
        }
    }


    useEffect(() => {
        getAutoSearches()
    }, [])

    return (
        <HeaderContainer>
            <TenderLogo />
            {
                auth
                    ?
                    <FlexRow >
                        <InfoLog>
                            <UploadIcon count={0} />
                            <MailIcon count={0} />
                            {
                                (showAutoSearchList && autoSearchList.length > 0)
                                    ?
                                    <div>
                                        <div onClick={() => setShowAutoSearchList(!showAutoSearchList)}>
                                            <BellIcon count={sum} />
                                        </div>
                                        <div style={{ display: 'flex', position: 'absolute', flexDirection: 'column', backgroundColor: 'white', marginLeft: '-190px', width: '250px', paddingLeft: '15px', paddingRight: '15px', paddingTop: '10px', paddingBottom: '10px', height: 'fit-content', borderRadius: '3px', boxShadow: 'rgba(0, 0, 0, 0.5) 0px 0px 2px' }}>
                                            {
                                                autoSearchList.map((autoSearch: any) => {
                                                    return (
                                                        <div style={{ display: 'flex', color: 'dodgerblue', borderBottom: 'solid 0.6px dodgerblue', padding: '10px', width: '100%', position: 'relative', justifyContent: 'space-between' }}>
                                                            <p style={{ overflow: 'hidden' }}><a style={{ textDecoration: 'none', color: 'dodgerblue' }} href={`/autosearch/${autoSearch.id}`}>{autoSearch.name}</a></p>
                                                            <p style={{ marginLeft: '5px' }}>{autoSearch.count}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div onClick={() => setShowAutoSearchList(!showAutoSearchList)}>
                                        <BellIcon count={sum} />
                                    </div>
                            }

                        </InfoLog>
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