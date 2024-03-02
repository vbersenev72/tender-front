import React, { FC, useContext, useEffect, useState } from 'react'
import { MenuContainer, MenuItem } from './styles'
import { TextGray14pxRegular } from "../../constants/fonts";
import { ReactComponent as Finder } from '../../assets/icons/finder.svg'
import { ReactComponent as ReFinder } from '../../assets/icons/reFinder.svg'
import { ReactComponent as ArrowBack } from '../../assets/icons/arrowBack.svg'
import { ReactComponent as Keeps } from '../../assets/icons/keeps.svg'
import { ReactComponent as TendIcon } from '../../assets/icons/tendersIcon.svg'
import { ReactComponent as StatIcon } from '../../assets/icons/statistic.svg'
import { ReactComponent as Plans } from '../../assets/icons/plans.svg'
import { ReactComponent as UserIcon } from '../../assets/icons/user.svg'
import { useNavigate } from 'react-router-dom';
import { showErrorMessage, showInfoMessage, showSuccesMessage } from '../../functions/Message';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { CiSquarePlus } from "react-icons/ci";
import { FiPlusSquare } from "react-icons/fi";
import axios from 'axios';
import { MenuContext } from '../../MenuContext';
import { MenuFooter } from './MenuFooter/MenuFooter';
import { useLocation } from 'react-router-dom';

export const Menu = ({ auth }: any) => {

    const [isSecondContainerVisible, setSecondContainerVisible] = useState(false);
    const navigate = useNavigate()

    const [showTagsArray, setShowTagsArray] = useState(false)
    const [showAutoSearchesArray, setShowAutoSearchesArray] = useState(false)

    const [tags, setTags] = useState<any>([])
    const [autoSearches, setAutoSearches] = useState<any>([])

    const [sum, setSum] = useState()

    const { openMenu, setOpenMenu }: any = useContext(MenuContext);

    // Обработчик клика по кнопке
    const handleClick = () => {
        setSecondContainerVisible(!isSecondContainerVisible);
        setOpenMenu(!isSecondContainerVisible)
    };

    const location = useLocation()

    const isCurrentLocation = (currentLocation: any) => {
        const regex = new RegExp(`^${currentLocation}/\\d+$`)
        return regex.test(location.pathname)

    }



    const getAutoSearchersCount = async () => {
        try {


            let newAutoSearches: any = []
            let sumForAll: any = 0

            for (let i = 0; i < autoSearches.length; i++) {
                const autoSearch = autoSearches[i];

                let countTenders = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/count/${autoSearch.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                sumForAll += countTenders.data.message
                setSum(sumForAll)
                newAutoSearches.push({ ...autoSearch, count: countTenders.data.message })

            }

            console.log(newAutoSearches);
            console.log(sumForAll);





            setAutoSearches([...newAutoSearches])


        } catch (error) {
            console.log(error);

        }
    }

    const getTags = async () => {
        try {
            const getAllTags: any = await axios.get(`${process.env.REACT_APP_API}/api/tags/getall`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const tags = getAllTags.data.message
            setTags([...tags])
        } catch (error) {
            console.log(error);
        }
    }

    const getAutoSearch = async () => {
        try {

            const getAll: any = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/autosearches/all`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })


            const autoSearches = getAll.data.message
            console.log(autoSearches);

            let newAutoSearches: any = []

            for (let i = 0; i < autoSearches.length; i++) {
                const autoSearch = autoSearches[i];

                let countTenders = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/count/${autoSearch.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                newAutoSearches.push({ ...autoSearch, count: countTenders.data.message })

            }

            console.log(newAutoSearches);

            setAutoSearches([...newAutoSearches])



            newAutoSearches = []
            let sumForAll: any = 0

            for (let i = 0; i < autoSearches.length; i++) {
                const autoSearch = autoSearches[i];

                let countTenders = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/count/${autoSearch.id}`, {
                    headers: {
                        authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                sumForAll += countTenders.data.message
                setSum(sumForAll)
                newAutoSearches.push({ ...autoSearch, count: countTenders.data.message })

            }

            console.log(newAutoSearches);
            console.log(sumForAll);





            setAutoSearches([...newAutoSearches])



        } catch (error) {
            console.log(error);

        }
    }


    useEffect(() => {
        getAutoSearch().then(() => console.log('Автопоиски загружены!'))
        getTags().then(() => console.log('Метки загружены!'))
        // getAutoSearchersCount().then(() => console.log('Счетчик автопоисков загружен!'))
    }, [])

    return (
        <MenuContainer onClick={handleClick} isShow={isSecondContainerVisible}>
            <MenuItem isShow={isSecondContainerVisible}>
                <Finder />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (isCurrentLocation('/tender') || location.pathname == '/') ? 'white' : 'gray', }} href="/">Поиск</a></TextGray14pxRegular>
                )}
            </MenuItem>
            {
                !showAutoSearchesArray

                    ?

                    <MenuItem style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '15%', paddingRight: '3%' }} isShow={isSecondContainerVisible} onClick={(e: any) => {
                        if (auth == true) {
                            e.stopPropagation()
                            return setShowAutoSearchesArray(true)

                        } else {
                            console.log(auth);

                            navigate('/auth')
                            showInfoMessage('Необходима авторизация!')

                            return
                        }
                    }}>

                        <ReFinder width={21} height={21} />
                        {(isSecondContainerVisible) && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '190px' }}>
                                <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (isCurrentLocation('/autosearch') || location.pathname == '/autosearch') ? 'white' : 'gray' }}>Автопоиск</a></TextGray14pxRegular>
                                <p style={{ color: 'dodgerblue', fontWeight: 'bold' }}>{sum}</p>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <SlArrowDown color='white' size={15} />
                                </div>
                            </div>
                        )}

                    </MenuItem>

                    :

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >

                        <MenuItem style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '15%', paddingRight: '3%' }} isShow={isSecondContainerVisible} onClick={(e: any) => {
                            if (auth == true) {
                                e.stopPropagation()
                                return setShowAutoSearchesArray(false)

                            } else {
                                console.log(auth);

                                navigate('/auth')
                                showInfoMessage('Необходима авторизация!')

                                return
                            }
                        }}>

                            <ReFinder />
                            {
                                (isSecondContainerVisible) && (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (isCurrentLocation('/autosearch') || location.pathname == '/autosearch') ? 'white' : 'gray' }}>Автопоиск</a></TextGray14pxRegular>
                                        <p style={{ color: 'dodgerblue', fontWeight: 'bold' }}>{sum}</p>
                                        <div style={{ display: 'flex', alignItems: 'center', }} onClick={() => setShowTagsArray(true)}>
                                            <SlArrowUp color='white' size={15} />
                                        </div>
                                    </div>
                                )
                            }
                        </MenuItem>

                        <div hidden={!isSecondContainerVisible}>
                            {
                                autoSearches.map((autoSearch: any) => {
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center', padding: '6px', cursor: 'pointer', justifyContent: ' space-between' }} onClick={() => window.location.href = (`/autosearch/${autoSearch.id}`)}>

                                            <p style={{ fontSize: '14px', color: (location.pathname == `/autosearch/${autoSearch.id}`) ? 'white' : 'gray' }}>{autoSearch.name}</p>
                                            <p style={{ color: 'white' }}>{autoSearch.count}</p>
                                        </div>
                                    )
                                })
                            }
                            <div style={{ display: 'flex', alignItems: 'center', padding: '6px' , cursor: 'pointer', }} onClick={() => window.location.href = (`/autosearch`)}>
                                <div style={{ height: '20px', width: '20px', borderRadius: '5px', marginRight: '4px', }}><FiPlusSquare size='18px' color='white' /></div>
                                <p style={{ fontSize: '14px', color: 'white' }}>Управление автопоисками</p>
                            </div>
                        </div>
                    </div>

            }
            <MenuItem isShow={isSecondContainerVisible} onClick={() => {
                if (auth == true) {
                    return navigate('/mytenders')
                } else {
                    console.log(auth);

                    navigate('/auth')
                    showInfoMessage('Необходима авторизация!')

                    return
                }
            }}>
                <TendIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (location.pathname == '/mytenders') ? 'white' : 'gray' }} >Мои Тендеры</a></TextGray14pxRegular>
                )}
            </MenuItem>
            {
                !showTagsArray

                    ?

                    <MenuItem style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '15%', paddingRight: '3%' }} isShow={isSecondContainerVisible} onClick={(e: any) => {
                        if (auth == true) {
                            e.stopPropagation()
                            return setShowTagsArray(true)

                        } else {
                            console.log(auth);

                            navigate('/auth')
                            showInfoMessage('Необходима авторизация!')

                            return
                        }
                    }}>

                        <Keeps width={21} height={21} />
                        {(isSecondContainerVisible) && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '190px' }}>
                                <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (isCurrentLocation('/tags') || location.pathname == '/tags') ? 'white' : 'gray' }}>Метки</a></TextGray14pxRegular>
                                <div style={{ display: 'flex', alignItems: 'center', }}>
                                    <SlArrowDown color='white' size={15} />
                                </div>
                            </div>
                        )}

                    </MenuItem>

                    :

                    <div
                        style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >

                        <MenuItem style={{ paddingTop: '10px', paddingBottom: '10px', paddingLeft: '15%', paddingRight: '3%' }} isShow={isSecondContainerVisible} onClick={(e: any) => {
                            if (auth == true) {
                                e.stopPropagation()
                                return setShowTagsArray(false)

                            } else {
                                console.log(auth);

                                navigate('/auth')
                                showInfoMessage('Необходима авторизация!')

                                return
                            }
                        }}>

                            <Keeps />
                            {
                                (isSecondContainerVisible) && (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (isCurrentLocation('/tags') || location.pathname == '/tags') ? 'white' : 'gray' }}>Метки</a></TextGray14pxRegular>
                                        <div style={{ display: 'flex', alignItems: 'center', }} onClick={() => setShowTagsArray(true)}>
                                            <SlArrowUp color='white' size={15} />
                                        </div>
                                    </div>
                                )
                            }
                        </MenuItem>

                        <div hidden={!isSecondContainerVisible}>
                            {
                                tags.map((tag: any) => {
                                    return (
                                        <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '6px' }} onClick={() => window.location.href = (`/tags/${tag.id}`)}>
                                            <div style={{ height: '14px', width: '14px', backgroundColor: tag.tag_color, borderRadius: '3px', marginRight: '8px' }} />
                                            <p style={{ fontSize: '14px', color: (location.pathname == `/tags/${tag.id}`) ? 'white' : 'gray' }}>{tag.tag_name}</p>
                                        </div>
                                    )
                                })
                            }
                            <div style={{ display: 'flex', alignItems: 'center', padding: '6px' , cursor: 'pointer', }} onClick={() => window.location.href = (`/tags`)}>
                                <div style={{ height: '20px', width: '20px', borderRadius: '5px', marginRight: '4px', }}><FiPlusSquare size='18px' color='white' /></div>
                                <p style={{ fontSize: '14px', color: 'white' }}>Управление метками</p>
                            </div>
                        </div>
                    </div>

            }

            <MenuItem isShow={isSecondContainerVisible} onClick={() => {
                if (auth == true) {
                    return navigate('/analitics')
                } else {
                    console.log(auth);

                    navigate('/auth')
                    showInfoMessage('Необходима авторизация!')

                    return
                }
            }}>
                <StatIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (location.pathname == '/analitics') ? 'white' : 'gray' }} >Аналитика</a></TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible} onClick={() => {
                if (auth == true) {
                    return navigate('/plans')
                } else {
                    console.log(auth);

                    navigate('/auth')
                    showInfoMessage('Необходима авторизация!')

                    return
                }
            }}>
                <Plans />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (location.pathname == '/plans') ? 'white' : 'gray' }}>Планы</a></TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible} onClick={() => {
                if (auth == true) {
                    return navigate('/personal')
                } else {
                    console.log(auth);

                    navigate('/auth')
                    showInfoMessage('Необходима авторизация!')

                    return
                }
            }}>
                <UserIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: (location.pathname == '/personal') ? 'white' : 'gray' }} >Личный кабинет</a></TextGray14pxRegular>
                )}
            </MenuItem>
            {isSecondContainerVisible ? (
                <MenuItem isShow={isSecondContainerVisible} style={{ border: 'none', cursor: 'pointer' }} onClick={handleClick}>
                    <ArrowBack />
                    <TextGray14pxRegular>Свернуть</TextGray14pxRegular>
                </MenuItem>
            ) :
                <MenuItem isShow={isSecondContainerVisible} style={{ border: 'none', cursor: 'pointer' }} onClick={handleClick}>
                    <ArrowBack onClick={handleClick} style={{ transform: 'rotate(180deg)' }} />
                </MenuItem>
            }

            {
                isSecondContainerVisible && (
                    <div style={{ marginTop: '80%' }}>
                        <MenuFooter />
                    </div>
                )
            }
        </MenuContainer>
    );
}