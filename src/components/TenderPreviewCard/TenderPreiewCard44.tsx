import { FC, Fragment, useEffect, useRef, useState } from "react";
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
import { TagsModal } from "../TagsModal/TagsModal";
import { IoEye } from "react-icons/io5";
import { getRegion } from "../../functions/getRegion/getRegion";
import { useNavigate } from "react-router-dom";



export const TenderPreiewCard44: FC = ({ jsonData, auth, myTender, showReadButton }: any) => {

    const [isMyTender, setIsMyTender] = useState(myTender === true)

    const [tags, setTags] = useState<any>([])

    const [showTagsPopup, setShowTagsPopup] = useState(false);
    const [popupTagsPosition, setPopupTagsPosition] = useState({ x: 0, y: 0 });
    const [markTag, setMarkTag] = useState<any>()
    const [readButton, setReadButton] = useState((showReadButton || showReadButton == true) ? true : false)

    const [stage, setStage] = useState<any>('')

    const navigate = useNavigate()

    const regNum: any = jsonData?.commonInfo?.purchaseNumber ? jsonData?.commonInfo?.purchaseNumber : jsonData?.registrationNumber
    const link: any = jsonData?.urlEIS ? jsonData?.urlEIS : jsonData?.printFormInfo.url

    const region: any = getRegion(jsonData.purchaseResponsibleInfo.responsibleOrgInfo.postAddress)

    const getTags = async () => {
        try {
            const getAllTags: any = await axios.get(`${process.env.REACT_APP_API}/api/tags/getall`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const tags = getAllTags.data.message
            setTags([...tags])

            return 'ok'
        } catch (error) {

        }
    }

    const getStage = () => {

        let collectingStartDate = new Date(jsonData?.commonInfo?.publishDTInEIS)
        let collectingEndDate = new Date(jsonData?.notificationInfo?.procedureInfo?.collectingInfo?.endDT)
        let purchaseEndDate = new Date(jsonData?.notificationInfo?.procedureInfo?.summarizingDate)


        if (collectingStartDate.getTime() < new Date().getTime() && (collectingEndDate && collectingEndDate.getTime()) > new Date().getTime()) {
            setStage('Подача заявок')
            return
        }

        if (collectingEndDate && collectingEndDate.getTime() < new Date().getTime()) {
            setStage('Работа комиссии')
            return
        }

        if ((purchaseEndDate && purchaseEndDate.getTime() < new Date().getTime()) && collectingEndDate.getTime() < new Date().getTime()) {
            setStage('Закупка завершена')
            return
        }

        setStage('Определение поставщика завершено')


    }

    const isMyTenderCheck = async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await axios.get(`${process.env.REACT_APP_API}/api/lk/mytendersall`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const tenders: any = response.data.message
            console.log(tenders);

            for (let i = 0; i < tenders.length; i++) {
                const tenderInfo = tenders[i];

                if (tenderInfo.reg_num == regNum) {
                    setIsMyTender(true)
                    break
                }

            }

        } catch (error) {
            console.log(error);
        }
    }

    const getTagForRegNum = async () => {
        try {
            const getAllTags: any = await axios.get(`${process.env.REACT_APP_API}/api/tags/getall`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const tags = getAllTags.data.message
            setTags([...tags])

            let result: any = []

            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];

                try {

                    const response: any = await axios.post(`${process.env.REACT_APP_API}/api/tags/gettenderslist`, {
                        idTag: tag.id
                    }, {
                        headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    })

                    const tenders = response.data.message

                    result.push(...tenders)


                } catch (error) {

                }

            }

            for (let i = 0; i < result.length; i++) {
                try {
                    const tender = result[i];


                    if (tender.reg_num == regNum) {
                        const findTag = await axios.get(`${process.env.REACT_APP_API}/api/tags/${tender.tag_id}`, {
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('token')}`
                            }
                        })

                        setMarkTag(findTag.data.message)
                        return findTag.data.message
                    }
                } catch (error) {

                }

            }
            return
        } catch (error) {
            console.log(error);

        }
    }





    const formatDate = (originalDate: any) => {


        try {
            let parsedDate: any = String((originalDate))
            parsedDate = parseISO(parsedDate);
            return format(parsedDate, 'dd.MM.yyyy');
        } catch (error) {
            console.log(error);
            return 'Нет данных'
        }
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

            if (!tags || tags.length == 0) return showErrorMessage('Нет активных меток')

            if (!auth) {
                return showErrorMessage('Для добавления метки необходимо авторизоваться!')
            }

            const { pageX, pageY } = event;
            setPopupTagsPosition({ x: pageX, y: pageY });
            setShowTagsPopup(true);



        } catch (error) {
            showErrorMessage('Что то пошло не так, попробуйте позже')
        }

    }


    const addTagToTender = async (regNum: any, tagId: any) => {
        try {

            if (!auth) {
                return showErrorMessage('Для сохранения тендера необходимо авторизоваться!')
            }

            const response = await axios.post(`${process.env.REACT_APP_API}/api/tags/addtotender`, {
                regNum: String(regNum),
                idTag: tagId
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })


            showSuccesMessage('Метка добавлена')
            setShowTagsPopup(false)

        } catch (error: any) {
            showErrorMessage('Эта метка уже добавлена')
        }
    }

    const closeModal = () => {
        setShowTagsPopup(false)
    }

    const ReadTender = async () => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_API}/api/autosearch/read/${regNum}`, {}, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setReadButton(false)
            return showSuccesMessage('Отмечено как просмотренное!')

        } catch (error) {
            showErrorMessage('Что то пошло не так, попробуйте позже')
        }
    }

    useEffect(() => {

        getStage()
        isMyTenderCheck().then(() => console.log('зелибоба'))
        getTagForRegNum().then((data: any) => console.log(data))

    }, [])


    return (
        <Fragment>
            {jsonData !== null ? (
                <div>
                    <PrevContainer>
                        <FlexTextColumn style={{ width: '70%', borderRight: '1px solid #F2F2F2' }}>
                            <FlexTextRow style={{ width: '100%' }}>
                                <TextGray14pxRegular>{stage}</TextGray14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow style={{ width: '100%', paddingBottom: '5px', borderBottom: '1px solid #F2F2F2' }}>
                                <TextBlue16pxSemiBold style={{ width: '60%' }}>
                                    {jsonData?.commonInfo?.placingWay?.code && jsonData?.commonInfo?.placingWay?.name
                                        ? `44-ФЗ`
                                        : 'Нет данных'}
                                </TextBlue16pxSemiBold>
                                {jsonData?.commonInfo?.purchaseNumber && (
                                    <Link onClick={() => {
                                        if (!auth) return showErrorMessage('Для доступа к карточке тендера необходимо авторизоваться');
                                        navigate(`/tender/${regNum}`);
                                    }} to={auth ? `/tender/${regNum}` : ''}>
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
                                        {jsonData.commonInfo.placingWay.name
                                            ? jsonData.commonInfo.placingWay.name
                                            : 'Нет данных'
                                        }
                                    </TextBlack14pxRegular>
                                </FlexRow>
                                <FlexRow>
                                    <TextGray14pxRegular>Объект закупки</TextGray14pxRegular>
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
                            <FlexTextRow style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <TextGray14pxRegular style={{ marginRight: '20px' }} >Начальная цена</TextGray14pxRegular>
                                {
                                    readButton
                                    &&
                                    <div style={{ top: '0', right: '0', cursor: 'pointer' }} onClick={ReadTender}>
                                        <IoEye color="dodgerblue" size={28} />
                                    </div>
                                }
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
                                <TextBlack14pxRegular>{region ? region : 'Нет данных'}</TextBlack14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow>
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ marginRight: '20px' }}>Размещено</TextGray14pxRegular>
                                    <TextBlack14pxRegular>
                                        {jsonData.firstPubDate
                                            ? formatDate(jsonData.firstPubDate)
                                            : jsonData?.commonInfo?.publishDTInEIS
                                                ? formatDate(jsonData.commonInfo.publishDTInEIS.slice(0, 10))
                                                : 'Нет данных'
                                        }

                                    </TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ marginRight: '20px' }}>Обновлено</TextGray14pxRegular>
                                    <TextBlack14pxRegular>
                                        {jsonData?.commonInfo?.publishDTInEIS
                                            ? formatDate(jsonData.commonInfo?.publishDTInEIS)
                                            : 'Нет данных'
                                        }


                                    </TextBlack14pxRegular>
                                </FlexTextColumn>
                            </FlexTextRow>
                            <FlexTextRow>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Окончание подачи заявки</TextGray14pxRegular>
                                    <TextBlack14pxRegular>
                                        {jsonData?.notificationInfo?.procedureInfo?.collectingInfo?.endDT
                                            ? formatDate(jsonData.notificationInfo.procedureInfo.collectingInfo.endDT.slice(0, 10))
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
                        {
                            markTag
                                ?
                                <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={addTagWindow}>
                                    <div style={{ backgroundColor: markTag.tag_color, width: '22px', height: '22px', marginRight: '8px', borderRadius: '5px' }} />
                                    <p>{markTag.tag_name}</p>
                                </div>
                                :
                                <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={addTagWindow}>
                                    <PiTagSimpleLight size={20} color="dodgerblue" />
                                    <p>Добавить метку</p>
                                </div>
                        }


                        <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }}>
                            <IoIosLink size={20} color="dodgerblue" />
                            <a href={link} style={{ textDecoration: 'none', color: 'black' }}>
                                <p>Официальный сайт</p>
                            </a>
                        </div>
                        <div>
                            {(showTagsPopup && tags.length) > 0 && (
                                <TagsModal tags={tags} closeModal={closeModal} addTagToTender={addTagToTender} popupTagsPosition={popupTagsPosition} jsonData={jsonData} addTag={markTag} setAddTag={setMarkTag} />
                            )

                            }
                        </div>
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
}
