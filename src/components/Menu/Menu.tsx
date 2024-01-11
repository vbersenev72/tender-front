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

export const Menu: FC = () => {

    const [isSecondContainerVisible, setSecondContainerVisible] = useState(false);

    // Обработчик клика по кнопке
    const handleClick = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setSecondContainerVisible(!isSecondContainerVisible);
    };

    return(
        <MenuContainer isShow={isSecondContainerVisible}>
            <MenuItem isShow={isSecondContainerVisible}>
                <Finder />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular>Поиск</TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible}>
                <ReFinder />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular>Автопоиск</TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible}>
                <TendIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular>Мои тендеры</TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible}>
                <Keeps />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular>Заметки</TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible}>
                <StatIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular>Аналитика</TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible}>
                <Plans />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular>Планы</TextGray14pxRegular>
                )}
            </MenuItem>
            <MenuItem isShow={isSecondContainerVisible}>
                <UserIcon />
                {isSecondContainerVisible && (
                    <TextGray14pxRegular><a style={{textDecoration: 'none', color: 'white'}} href="/personal">Личный кабинет</a></TextGray14pxRegular>
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