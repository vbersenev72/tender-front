import { FC, Fragment, useEffect, useState } from "react";
import { PrevContainer } from "./styles";
import { FlexRow, FlexTextColumn, FlexTextRow } from "../../containers/containers";
import {
    TextBlack14pxRegular,
    TextBlack22pxBold, TextBlack22pxRegular, TextBlue14pxRegular,
    TextBlue16pxSemiBold,
    TextGray14pxRegular
} from "../../constants/fonts";
import { ReactComponent as RubleIcon } from '../../assets/icons/ruble.svg'
import { format, parseISO } from 'date-fns';
import { Link } from "react-router-dom";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { PiTagSimpleLight } from "react-icons/pi";
import { IoIosLink } from "react-icons/io";
import { showErrorMessage, showSuccesMessage } from "../../functions/Message";
import axios from "axios";
import React from "react";

interface ITender {
    jsonData: any,
    auth: boolean,
    myTender: any
}

export const TenderPreiewCard44: FC<ITender> = ({ jsonData, auth, myTender }: any) => {

    const [isMyTender, setIsMyTender] = useState(myTender === true)

    const [showTagsPopup, setShowTagsPopup] = useState(false);
    const [popupTagsPosition, setPopupTagsPosition] = useState({ x: 0, y: 0 });


    const getLSTags: any = localStorage.getItem('tags')
    const parseLSTags: any = JSON.parse(getLSTags)
    const [tags, setTags] = useState<any>(parseLSTags)

    const formatDate = (originalDate: string) => {
        const parsedDate = parseISO(originalDate);
        return format(parsedDate, 'dd.MM.yyyy');
    };

    const addMyTenders = async (id: any) => {
        try {

            if (!auth) {
                return showErrorMessage('Для сохранения тендера необходимо авторизоваться!')
            }

            const response = await axios.post(`${process.env.REACT_APP_API}/api/lk/mytenders`, {
                regNum: String(id)
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setIsMyTender(true)
            showSuccesMessage('Тендер успешно добавлен!')


        } catch (error) {
            showErrorMessage('Тендер уже добавлен!')
        }
    }

    const deleteFromMyTenders = async (id: any) => {
        try {

            if (!auth) {
                return showErrorMessage('Для удаления тендера необходимо авторизоваться!')
            }

            const response = await axios.delete(`${process.env.REACT_APP_API}/api/lk/mytenders/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setIsMyTender(false)
            showSuccesMessage('Тендер успешно удален!')


        } catch (error) {
            showErrorMessage('Тендер уже удален!')
        }
    }

    const addTagWindow = async (event: any) => {
        try {


            const allTags: any = localStorage.getItem('tags')

            setTags(JSON.parse(allTags))
            console.log(tags);


            const { clientX, clientY } = event;
            setPopupTagsPosition({ x: clientX, y: clientY });
            setShowTagsPopup(true);

        } catch (error) {
            showErrorMessage('Что то пошло не так, попробуйте позже')
        }

    }

    return (
        <Fragment>
            {jsonData !== null ? (
                <div>
                    <PrevContainer>
                        <FlexTextColumn style={{ width: '70%', borderRight: '1px solid #F2F2F2' }}>
                            <FlexTextRow style={{ width: '100%' }}>
                                <TextGray14pxRegular>Работа комиссии</TextGray14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow style={{ width: '100%', paddingBottom: '5px', borderBottom: '1px solid #F2F2F2' }}>
                                <TextBlue16pxSemiBold style={{ width: '60%' }}>
                                    {jsonData?.commonInfo?.placingWay?.code && jsonData?.commonInfo?.placingWay?.name
                                        ? `${jsonData.commonInfo.placingWay.code} ${jsonData.commonInfo.placingWay.name}`
                                        : 'Нет данных'}
                                </TextBlue16pxSemiBold>
                                {jsonData?.commonInfo?.purchaseNumber && (
                                    <Link to={`/tender/${jsonData?.commonInfo?.purchaseNumber}`}>
                                        <TextBlue16pxSemiBold style={{ width: '40%' }}>
                                            № {jsonData.commonInfo.purchaseNumber}
                                        </TextBlue16pxSemiBold>
                                    </Link>
                                )}
                            </FlexTextRow>
                            <FlexTextColumn style={{ gap: '10px', marginTop: '10px', paddingRight: '10px' }}>
                                <FlexRow>
                                    <TextGray14pxRegular>Тип заявки</TextGray14pxRegular>
                                    <TextBlack14pxRegular>
                                        {jsonData?.commonInfo?.purchaseObjectInfo
                                            ? jsonData.commonInfo?.purchaseObjectInfo
                                            : 'Нет данных'
                                        }
                                    </TextBlack14pxRegular>
                                </FlexRow>
                                <FlexRow>
                                    <TextGray14pxRegular>Объём закупки</TextGray14pxRegular>
                                    <TextBlue14pxRegular>{jsonData?.purchaseResponsibleInfo?.responsibleOrgInfo?.fullName
                                        ? jsonData.purchaseResponsibleInfo.responsibleOrgInfo.fullName
                                        : 'Нет данных'
                                    }</TextBlue14pxRegular>
                                </FlexRow>
                                <FlexRow>
                                    <TextGray14pxRegular>Заказчик</TextGray14pxRegular>
                                    <TextBlack14pxRegular>
                                        {jsonData?.purchaseResponsibleInfo?.responsibleOrgInfo?.fullName
                                            ? jsonData.purchaseResponsibleInfo.responsibleOrgInfo.fullName
                                            : 'Нет данных'
                                        }
                                    </TextBlack14pxRegular>
                                </FlexRow>
                            </FlexTextColumn>
                        </FlexTextColumn>
                        <FlexTextColumn style={{ width: '30%', paddingLeft: '15px' }}>
                            <FlexTextRow style={{ width: '100%' }}>
                                <TextGray14pxRegular >Начальная цена</TextGray14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow style={{ width: '100%' }}>
                                <TextBlack22pxRegular>
                                    {jsonData?.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice
                                        ? `${jsonData.notificationInfo.contractConditionsInfo.maxPriceInfo.maxPrice} ₽`
                                        : 'Нет данных'
                                    }
                                </TextBlack22pxRegular>
                            </FlexTextRow>
                            <FlexTextRow style={{ width: '30%', justifyContent: 'space-between' }}>
                                <TextGray14pxRegular>Регион</TextGray14pxRegular>
                                <TextBlack14pxRegular>СПБ</TextBlack14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Дата начала</TextGray14pxRegular>
                                    <TextBlack14pxRegular>
                                        {jsonData?.notificationInfo?.procedureInfo?.collectingInfo?.startDT
                                            ? formatDate(jsonData.notificationInfo.procedureInfo.collectingInfo.startDT)
                                            : 'Нет данных'
                                        }
                                    </TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Дата окончания</TextGray14pxRegular>
                                    <TextBlack14pxRegular>
                                        {jsonData?.notificationInfo?.procedureInfo?.collectingInfo?.endDT
                                            ? formatDate(jsonData.notificationInfo.procedureInfo.collectingInfo.endDT)
                                            : 'Нет данных'
                                        }
                                    </TextBlack14pxRegular>
                                </FlexTextColumn>
                            </FlexTextRow>
                            <FlexTextRow>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Дата публикации</TextGray14pxRegular>
                                    <TextBlack14pxRegular>
                                        {jsonData?.commonInfo?.publishDTInEIS
                                            ? formatDate(jsonData.commonInfo.publishDTInEIS)
                                            : 'Нет данных'
                                        }
                                    </TextBlack14pxRegular>
                                </FlexTextColumn>
                            </FlexTextRow>
                        </FlexTextColumn>
                    </PrevContainer>
                    <div style={{
                        width: '80%',
                        display: 'flex',
                        // flexDirection: 'column',
                        marginLeft: '10%',
                        backgroundColor: 'white',
                        height: 'auto',
                        padding: '15px'
                    }}>
                        {
                            !isMyTender
                                ?
                                <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={() => addMyTenders(jsonData?.commonInfo?.purchaseNumber)}>
                                    <CiCirclePlus size={20} color="dodgerblue" />
                                    <p>Добавить в мои тендеры</p>
                                </div>
                                :
                                <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={() => deleteFromMyTenders(jsonData?.commonInfo?.purchaseNumber)} >
                                    <CiCircleMinus size={20} color="dodgerblue" />
                                    <p>Удалить из моих тендеров</p>
                                </div>
                        }
                        <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={(event: any) => addTagWindow(event)}>
                            <PiTagSimpleLight size={20} color="dodgerblue" />
                            <p>Добавить метку</p>
                        </div>
                        <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }}>
                            <IoIosLink size={20} color="dodgerblue" />
                            <p>Официальный сайт</p>
                        </div>
                        <div>
                            {showTagsPopup && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: popupTagsPosition.y,
                                        left: popupTagsPosition.x,
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 1fr 1fr',
                                        width: 'fit-content',
                                        height: 'fit-content',
                                        backgroundColor: 'white'
                                    }}
                                >
                                        {
                                            tags.map((tag: any) => {
                                                <div style={{ display: 'flex', padding: '10px' }}>
                                                    <div style={{ backgroundColor: tag.tag_color, width: '18px', height: '18px' }} />
                                                    <p>{tag.tag_name}</p>
                                                </div>
                                            })
                                        }
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
}