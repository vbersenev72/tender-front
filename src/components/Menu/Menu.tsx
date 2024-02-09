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
import { showErrorMessage, showSuccesMessage } from '../../functions/Message';
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { CiSquarePlus } from "react-icons/ci";
import { FiPlusSquare } from "react-icons/fi";
import axios from 'axios';
import { MenuContext } from '../../MenuContext';

export const Menu = ({ auth }: any) => {

    const [isSecondContainerVisible, setSecondContainerVisible] = useState(false);
    const navigate = useNavigate()

    const [showTagsArray, setShowTagsArray] = useState(false)
    const [showAutoSearchesArray, setShowAutoSearchesArray] = useState(false)
    // const [newAutoSearches, setNewAutoSearches] = useState<any>([])

    // let tagsFromLs: any = localStorage.getItem('tags')
    // let autoSearchesFromLs: any = localStorage.getItem('autosearches')

    // const tags = tagsFromLs ? JSON.parse(tagsFromLs) : []
    const [tags, setTags] = useState<any>([])
    const [autoSearches, setAutoSearches] = useState<any>([])

    const { openMenu, setOpenMenu }: any = useContext(MenuContext);

    // Обработчик клика по кнопке
    const handleClick = () => {
        setSecondContainerVisible(!isSecondContainerVisible);
        setOpenMenu(!isSecondContainerVisible)
    };

    const getAutoSearchersCount = async () => {
        try {

            // let newAutoSearches = autoSearches.map((autoSearch: any) => {
            //     let countTenders = axios.get(`${process.env.REACT_APP_API}/api/autosearch/count/${autoSearch.id}`, {
            //         headers: {
            //             authorization: `Bearer ${localStorage.getItem('token')}`
            //         }
            //     }).then((data: any) => data.message)

            //     return { ...autoSearch, count: countTenders }
            // })

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


        } catch (error) {
            showErrorMessage('Что то пошло не так!')
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
            showErrorMessage('Ошибка загрузки меток, попробуйте позже')
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


        } catch (error) {
            showErrorMessage('Ошибка загрузки автопоисков')
        }
    }


    useEffect(() => {
        getAutoSearch().then(() => console.log('Автопоиски загружены!'))
        getAutoSearchersCount().then(() => console.log('Счетчик автопоисков загружен!'))
        getTags().then(() => console.log('Метки загружены!'))
    }, [])

    return (
        <MenuContainer onClick={handleClick} isShow={isSecondContainerVisible}>
            <MenuItem isShow={isSecondContainerVisible}>
                <Finder />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }} href="/">Поиск</a></TextGray14pxRegular>
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

                            return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                        }
                    }}>

                        <ReFinder width={21} height={21} />
                        {(isSecondContainerVisible) && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '190px' }}>
                                <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }}>Автопоиск</a></TextGray14pxRegular>
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

                                return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                            }
                        }}>

                            <ReFinder />
                            {
                                (isSecondContainerVisible) && (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }}>Автопоиск</a></TextGray14pxRegular>
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
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer', justifyContent: ' space-between' }} onClick={() => window.location.href = (`/autosearch/${autoSearch.id}`)}>

                                            <p style={{ fontSize: '14px', color: '#646F80' }}>{autoSearch.name}</p>
                                            <p style={{ color: 'white' }}>{autoSearch.count}</p>
                                        </div>
                                    )
                                })
                            }
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer', }} onClick={() => window.location.href = (`/autosearch`)}>
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

                    return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                }
            }}>
                <TendIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }} >Мои Тендеры</a></TextGray14pxRegular>
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

                            return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                        }
                    }}>

                        <Keeps width={21} height={21} />
                        {(isSecondContainerVisible) && (
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '190px' }}>
                                <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }}>Метки</a></TextGray14pxRegular>
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

                                return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                            }
                        }}>

                            <Keeps />
                            {
                                (isSecondContainerVisible) && (
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                                        <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }}>Метки</a></TextGray14pxRegular>
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
                                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer' }} onClick={() => window.location.href = (`/tags/${tag.id}`)}>
                                            <div style={{ height: '16px', width: '16px', backgroundColor: tag.tag_color, borderRadius: '5px', marginRight: '8px' }} />
                                            <p style={{ fontSize: '14px', color: 'white' }}>{tag.tag_name}</p>
                                        </div>
                                    )
                                })
                            }
                            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '4px', cursor: 'pointer', }} onClick={() => window.location.href = (`/tags`)}>
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

                    return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                }
            }}>
                <StatIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }} >Аналитика</a></TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible} onClick={() => {
                if (auth == true) {
                    return navigate('/plans')
                } else {
                    console.log(auth);

                    return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                }
            }}>
                <Plans />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }}>Планы</a></TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible} onClick={() => {
                if (auth == true) {
                    return navigate('/personal')
                } else {
                    console.log(auth);

                    return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                }
            }}>
                <UserIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{ textDecoration: 'none', color: 'white' }} >Личный кабинет</a></TextGray14pxRegular>
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
        </MenuContainer>
    );
}