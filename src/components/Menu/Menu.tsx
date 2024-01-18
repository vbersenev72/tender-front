import React, {FC, useState} from 'react'
import {MenuContainer, MenuItem} from './styles'
import {TextGray14pxRegular} from "../../constants/fonts";
import {ReactComponent as Finder} from '../../assets/icons/finder.svg'
import {ReactComponent as ReFinder} from '../../assets/icons/reFinder.svg'
import {ReactComponent as ArrowBack} from '../../assets/icons/arrowBack.svg'
import {ReactComponent as Keeps} from '../../assets/icons/keeps.svg'
import {ReactComponent as TendIcon} from '../../assets/icons/tendersIcon.svg'
import {ReactComponent as StatIcon} from '../../assets/icons/statistic.svg'
import {ReactComponent as Plans} from '../../assets/icons/plans.svg'
import {ReactComponent as UserIcon} from '../../assets/icons/user.svg'
import { useNavigate } from 'react-router-dom';
import { showErrorMessage } from '../../functions/Message';

export const Menu = ({auth}: any) => {

    const [isSecondContainerVisible, setSecondContainerVisible] = useState(false);
    const navigate = useNavigate()

    // Обработчик клика по кнопке
    const handleClick = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setSecondContainerVisible(!isSecondContainerVisible);
    };

    return(
        <MenuContainer onClick={handleClick} isShow={isSecondContainerVisible}>
            <MenuItem isShow={isSecondContainerVisible}>
                <Finder />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{textDecoration: 'none', color: 'white'}} href="/">Поиск</a></TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible}>
                <ReFinder />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{textDecoration: 'none', color: 'white'}} href="/autosearch">Автопоиск</a></TextGray14pxRegular>
                )}
            </MenuItem>
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
                    <TextGray14pxRegular><a style={{textDecoration: 'none', color: 'white'}} >Мои Тендеры</a></TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible} onClick={() => {
                if (auth == true) {
                    return navigate('/notes')
                } else {
                    console.log(auth);
                    
                    return showErrorMessage('Для использования этого раздела необходимо авторизоваться')
                }
            }}>
                <Keeps />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{textDecoration: 'none', color: 'white'}}>Заметки</a></TextGray14pxRegular>
                )}
            </MenuItem>
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
                    <TextGray14pxRegular><a style={{textDecoration: 'none', color: 'white'}} >Аналитика</a></TextGray14pxRegular>
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
                    <TextGray14pxRegular><a style={{textDecoration: 'none', color: 'white'}}>Планы</a></TextGray14pxRegular>
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
                    <TextGray14pxRegular><a style={{textDecoration: 'none', color: 'white'}} >Личный кабинет</a></TextGray14pxRegular>
                )}
            </MenuItem>
                {isSecondContainerVisible ? (
                        <MenuItem isShow={isSecondContainerVisible} style={{border: 'none', cursor: 'pointer'}} onClick={handleClick}>
                        <ArrowBack />
                        <TextGray14pxRegular>Свернуть</TextGray14pxRegular>
                    </MenuItem>
                ) :
                    <MenuItem isShow={isSecondContainerVisible} style={{border: 'none', cursor: 'pointer'}} onClick={handleClick}>
                        <ArrowBack onClick={handleClick} style={{transform: 'rotate(180deg)'}}/>
                    </MenuItem>
                }
        </MenuContainer>
    );
}