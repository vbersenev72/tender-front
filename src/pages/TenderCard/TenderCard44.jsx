import {
    BorderedContainer, BorderFitContaienr,
    BorderOpeningContainer,
    LeftSideSection,
    ListItem,
    OrderedList,
    PageContainer,
    RightSideSection, Table, TableCell, TableRow
} from "../../styles";
import {
    TextBlack14pxBold,
    TextBlack14pxRegular,
    TextBlack22pxBold, TextBlue14pxRegular,
    TextGray11pxRegular,
    TextGray14pxRegular
} from "../../constants/fonts";
import { FlexTextColumn, FlexTextRow } from "../../containers/containers";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { ReactComponent as Arrow } from "../../assets/icons/arrow.svg";
import { TenderResults } from "../../components/FZ44/Tender/TenderResults/TenderResults";
import { CriterialInfo } from "../../components/FZ44/Tender/CriterialInfo/CriterialInfo";
import { ZakupkiInfo } from "../../components/FZ44/Tender/ZakupkiInfo/ZakupkiInfo";
import JsonRenderer from "../JsonRenderer";
import { getEvents } from "../../functions/Events";
import { formatDate } from "../../functions/FormateDate";
import { showErrorMessage, showSuccesMessage } from "../../functions/Message";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { PiTagSimpleLight } from "react-icons/pi";
import axios from "axios";
import { GoPaperAirplane } from "react-icons/go";
import { TagsModal } from "../../components/TagsModal/TagsModal";



export const TenderCard44 = ({ tender }) => {


    const [isExplanationDocsVisible, setExplanationDocsVisible] = useState(false);
    const [isZakupkiDocsVisible, setZakupkiDocsVisible] = useState(false);
    const [isProtocolsContainerVisible, setProtocolsContainerVisible] = useState(false);

    const [isMyTender, setIsMyTender] = useState(false)
    const [markTag, setMarkTag] = useState()
    const [tags, setTags] = useState([])
    const [showTagsPopup, setShowTagsPopup] = useState(false);
    const [popupTagsPosition, setPopupTagsPosition] = useState({ x: 0, y: 0 })

    const regNum = tender?.commonInfo?.purchaseNumber ? tender?.commonInfo?.purchaseNumber : tender?.registrationNumber

    const handleClick = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setExplanationDocsVisible(!isExplanationDocsVisible);
    };
    const handleClickThird = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setZakupkiDocsVisible(!isZakupkiDocsVisible);
    };
    const handleClickProtocols = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setProtocolsContainerVisible(!isProtocolsContainerVisible);
    };

    console.log(tender)


    const addMyTenders = () => {

    }

    const deleteFromMyTenders = () => {

    }

    const addTagWindow = async (event) => {
        try {

            if (!tags || tags.length == 0) return showErrorMessage('Нет активных меток')

            const { pageX, pageY } = event;
            setPopupTagsPosition({ x: pageX, y: pageY });
            setShowTagsPopup(true);



        } catch (error) {
            showErrorMessage('Что то пошло не так, попробуйте позже')
        }

    }

    const getTagForRegNum = async () => {
        try {
            const getAllTags = await axios.get(`${process.env.REACT_APP_API}/api/tags/getall`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            const tags = getAllTags.data.message
            setTags([...tags])

            let result = []

            for (let i = 0; i < tags.length; i++) {
                const tag = tags[i];

                try {

                    const response = await axios.post(`${process.env.REACT_APP_API}/api/tags/gettenderslist`, {
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


    const isMyTenderCheck = async () => {
        try {
            const token = localStorage.getItem('token')

            const response = await axios.get(`${process.env.REACT_APP_API}/api/lk/mytendersall`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const tenders = response.data.message
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


    const addTagToTender = async (regNum, tagId) => {
        try {



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

        } catch (error) {
            showErrorMessage('Эта метка уже добавлена')
        }
    }


    const { events, stage } = getEvents(tender);
    const [lastTender] = tender.tender.sort((a, b) => +b.versionNumber - +a.versionNumber)

    const zakupki = lastTender?.notificationInfo?.purchaseObjectsInfo?.notDrugPurchaseObjectsInfo
        || lastTender?.notificationInfo?.purchaseObjectsInfo?.drugPurchaseObjectsInfo
        || lastTender?.notificationInfo?.purchaseObjectsInfo

    const closeModal = () => {
        setShowTagsPopup(false)
    }

    useEffect(() => {
        getTagForRegNum().then((data) => console.log(data))
        isMyTenderCheck().then((data) => console.log(data))

    }, [])

    if (tender) {
        return (
            <div>
                <div>
                    {(showTagsPopup && tags.length) > 0 && (
                        <TagsModal tags={tags} closeModal={closeModal} addTagToTender={addTagToTender} popupTagsPosition={popupTagsPosition} jsonData={tender} addTag={markTag} setAddTag={setMarkTag} />
                    )

                    }
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ marginLeft: '130px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <p style={{ color: 'gray', fontSize: '14px', marginRight: '10px' }}>Этап закупки</p>
                        <p>{stage}</p>
                    </div>
                    <div style={{ display: 'flex', }}>
                        {
                            !isMyTender
                                ?
                                <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={() => addMyTenders()}>
                                    <CiCirclePlus size={20} color="dodgerblue" />
                                    <p>Добавить в мои тендеры</p>
                                </div>
                                :
                                <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={() => deleteFromMyTenders()} >
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

                        <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={addTagWindow}>
                            <GoPaperAirplane size={20} color="dodgerblue" />
                            <p>Отправить тендерному специалисту</p>
                        </div>

                    </div>
                </div>
                <PageContainer>
                    <LeftSideSection>
                        <BorderedContainer>
                            <TextBlack14pxBold>Общая информация</TextBlack14pxBold>
                            <FlexTextColumn>
                                <TextGray14pxRegular>Номер извещания</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.commonInfo?.purchaseNumber}</TextBlack14pxRegular>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular>Наименование объекта закупки</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.commonInfo?.purchaseObjectInfo}</TextBlack14pxRegular>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular>Этап закупки</TextGray14pxRegular>
                                <TextBlack14pxRegular>{stage}</TextBlack14pxRegular>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular>Способ определения поставщика (подрядчика,
                                    исполнителя)</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.commonInfo?.placingWay?.name}</TextBlack14pxRegular>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular>Наименование электронной площадки</TextGray14pxRegular>
                                <a href={lastTender?.commonInfo?.ETP?.url}>
                                    <TextBlack14pxRegular>{lastTender?.commonInfo?.ETP?.name}</TextBlack14pxRegular>
                                </a>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular>Официальный сайт</TextGray14pxRegular>
                                <a href={lastTender?.commonInfo?.href}>
                                    <TextBlack14pxRegular>{new URL(lastTender?.commonInfo?.href).hostname}</TextBlack14pxRegular>
                                </a>
                            </FlexTextColumn>
                        </BorderedContainer>
                        {lastTender?.purchaseResponsibleInfo?.responsibleOrgInfo ? (
                            <BorderedContainer>
                                <TextBlack14pxBold>Контактная информация</TextBlack14pxBold>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Организация</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.purchaseResponsibleInfo?.responsibleOrgInfo?.fullName}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>ИНН</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.purchaseResponsibleInfo?.responsibleOrgInfo?.INN}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>КПП</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.purchaseResponsibleInfo?.responsibleOrgInfo?.KPP}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Фактический адрес</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.purchaseResponsibleInfo?.responsibleOrgInfo?.factAddress}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Почтовый адрес</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.purchaseResponsibleInfo?.responsibleOrgInfo?.postAddress}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Контакты</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.purchaseResponsibleInfo?.responsibleInfo?.contactPersonInfo?.firstName} {lastTender?.purchaseResponsibleInfo?.responsibleInfo?.contactPersonInfo?.middleName} {lastTender?.purchaseResponsibleInfo?.responsibleInfo?.contactPersonInfo?.lastName}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Телефон</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.purchaseResponsibleInfo?.responsibleInfo?.contactPhone}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Электронная почта</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.purchaseResponsibleInfo?.responsibleInfo?.contactEMail}</TextBlack14pxRegular>
                                </FlexTextColumn>
                            </BorderedContainer>
                        ) : null}
                    </LeftSideSection>
                    <RightSideSection>

                        {lastTender?.notificationInfo ?
                            (<BorderedContainer style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                padding: '25px 50px 25px 50px'
                            }}>
                                <FlexTextColumn style={{ width: 'fit-content' }}>
                                    <TextGray14pxRegular>Цена контракта</TextGray14pxRegular>
                                    <TextBlack22pxBold>{lastTender?.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice} ₽</TextBlack22pxBold>
                                </FlexTextColumn>
                                {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.applicationGuarantee?.amount ? (
                                    <FlexTextColumn style={{ width: 'fit-content' }}>
                                        <TextGray14pxRegular>Обеспечение заявки</TextGray14pxRegular>
                                        <TextBlack22pxBold>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.applicationGuarantee?.amount} ₽</TextBlack22pxBold>
                                    </FlexTextColumn>) : null}
                                {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.amount ? (
                                    <FlexTextColumn style={{ width: 'fit-content' }}>
                                        <TextGray14pxRegular>Обеспечение контракта</TextGray14pxRegular>
                                        <TextBlack22pxBold>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.amount} ₽</TextBlack22pxBold>
                                    </FlexTextColumn>) : null}
                            </BorderedContainer>)
                            : null}
                        {lastTender?.notificationInfo?.procedureInfo ?
                            (
                                <BorderedContainer>
                                    <TextBlack22pxBold>Информация о процедуре закупки</TextBlack22pxBold>
                                    {lastTender?.notificationInfo?.procedureInfo?.collectingInfo?.startDT ?
                                        (<FlexTextRow>
                                            <TextGray14pxRegular>Дата и время начала срока подачи
                                                заявок </TextGray14pxRegular>
                                            <TextBlack14pxRegular>{formatDate(new Date(lastTender?.notificationInfo?.procedureInfo?.collectingInfo?.startDT.slice(0, 10)).toISOString())}</TextBlack14pxRegular>
                                        </FlexTextRow>)
                                        : null}
                                    {lastTender?.notificationInfo?.procedureInfo?.collectingInfo?.endDT ?
                                        (<FlexTextRow>
                                            <TextGray14pxRegular>Дата и время окончания срока подачи
                                                заявок </TextGray14pxRegular>
                                            <TextBlack14pxRegular>{formatDate(new Date(lastTender?.notificationInfo?.procedureInfo?.collectingInfo?.endDT.slice(0, 10)).toISOString())}</TextBlack14pxRegular>
                                        </FlexTextRow>) : null}
                                    {lastTender?.notificationInfo?.procedureInfo?.biddingDate ?
                                        (<FlexTextRow>
                                            <TextGray14pxRegular>Дата проведения процедуры подачи предложений о цене
                                                контракта либо о сумме цен единиц товара, работы,
                                                услуги </TextGray14pxRegular>
                                            <TextBlack14pxRegular>{formatDate(new Date(lastTender?.notificationInfo?.procedureInfo?.biddingDate.slice(0, 10)).toISOString())}</TextBlack14pxRegular>
                                        </FlexTextRow>) : null}
                                    {lastTender?.notificationInfo?.procedureInfo?.firstPartsDate ?
                                        (<FlexTextRow>
                                            <TextGray14pxRegular>Дата окончания срока рассмотрения и оценки первых частей
                                                заявок </TextGray14pxRegular>
                                            <TextBlack14pxRegular>{formatDate(new Date(lastTender?.notificationInfo?.procedureInfo?.firstPartsDate.slice(0, 10)).toISOString())}</TextBlack14pxRegular>
                                        </FlexTextRow>) : null}
                                    {lastTender?.notificationInfo?.procedureInfo?.submissionProcedureDate ?
                                        (<FlexTextRow>
                                            <TextGray14pxRegular>Дата проведения процедуры подачи предложений о цене
                                                контракта </TextGray14pxRegular>
                                            <TextBlack14pxRegular>{formatDate(new Date(lastTender?.notificationInfo?.procedureInfo?.submissionProcedureDate.slice(0, 10)).toISOString())}</TextBlack14pxRegular>
                                        </FlexTextRow>) : null}
                                    {lastTender?.notificationInfo?.procedureInfo?.secondPartsDate ?
                                        (<FlexTextRow>
                                            <TextGray14pxRegular>Дата окончания срока рассмотрения и оценки вторых частей
                                                заявок  </TextGray14pxRegular>
                                            <TextBlack14pxRegular> {formatDate(new Date(lastTender?.notificationInfo?.procedureInfo?.secondPartsDate.slice(0, 10)).toISOString())}</TextBlack14pxRegular>
                                        </FlexTextRow>) : null}
                                    {lastTender?.notificationInfo?.procedureInfo?.summarizingDate ?
                                        (<FlexTextRow>
                                            <TextGray14pxRegular>Дата подведения итогов определения поставщика (подрядчика,
                                                исполнителя) </TextGray14pxRegular>
                                            <TextBlack14pxRegular> {formatDate(new Date(lastTender?.notificationInfo?.procedureInfo?.summarizingDate.slice(0, 10)).toISOString())}</TextBlack14pxRegular>
                                        </FlexTextRow>) : null}
                                </BorderedContainer>)
                            : null}
                        <ZakupkiInfo
                            data={zakupki}
                            extradata={lastTender?.purchaseResponsibleInfo?.responsibleOrgInfo?.fullName} />
                        <BorderedContainer>
                            <TextBlack14pxBold>Условия контракта</TextBlack14pxBold>
                            <FlexTextRow>
                                <TextGray14pxRegular style={{ width: '35%' }}>Начальная (максимальная) цена
                                    контракта</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice} российских
                                    рублей</TextBlack14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow>
                                <TextGray14pxRegular style={{ width: '35%' }}>Источник финансирования</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.budgetInfo?.name}</TextBlack14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow>
                                <TextGray14pxRegular style={{ width: '35%' }}>Идентификационный код
                                    закупки</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.IKZInfo?.purchaseCode}</TextBlack14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow>
                                <TextGray14pxRegular style={{ width: '35%' }}>Место доставки товара, выполнения работы или
                                    оказания услуги</TextGray14pxRegular>
                                <TextBlack14pxRegular>
                                    {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.deliveryPlacesInfo?.deliveryPlaceInfo?.deliveryPlace}
                                </TextBlack14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow>
                                <TextGray14pxRegular style={{ width: '35%' }}>Предусмотрена возможность одностороннего отказа
                                    от исполнения контракта в соответствии со ст. 95 Закона № 44-ФЗ</TextGray14pxRegular>
                                <TextBlack14pxRegular>
                                    {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.isOneSideRejectionSt95 ? "Да" : "Нет"}
                                </TextBlack14pxRegular>
                            </FlexTextRow>
                        </BorderedContainer>
                        <BorderedContainer>
                            <TextBlack14pxBold>Преимущества и требования к участникам</TextBlack14pxBold>
                            <FlexTextRow>
                                <TextGray14pxRegular style={{ width: '35%' }}>Преимущества</TextGray14pxRegular>
                                <TextBlack14pxRegular>{
                                    lastTender?.notificationInfo?.preferensesInfo?.preferenseInfo?.preferenseRequirementInfo?.name ?
                                        lastTender?.notificationInfo?.preferensesInfo?.preferenseInfo?.preferenseRequirementInfo?.name :
                                        "Не установлены"
                                }</TextBlack14pxRegular>
                            </FlexTextRow>
                            <FlexTextRow>
                                <TextGray14pxRegular style={{ width: '35%' }}>Требования к участникам</TextGray14pxRegular>
                                {lastTender?.notificationInfo?.requirementsInfo?.requirementInfo?.length ?
                                    (<OrderedList>
                                        {lastTender?.notificationInfo?.requirementsInfo?.requirementInfo?.map((item, index) => (
                                            <ListItem>
                                                <TextBlack14pxRegular
                                                    key={index}>{item.preferenseRequirementInfo?.name}</TextBlack14pxRegular>
                                                {item.addRequirements ? (
                                                    <OrderedList>
                                                        {
                                                            [item.addRequirements].flat().map((one, index) => (
                                                                <ListItem key={index}>
                                                                    <TextBlack14pxRegular>{one.addRequirement.name}</TextBlack14pxRegular>
                                                                    <TextGray11pxRegular> Дополнительные
                                                                        требования </TextGray11pxRegular>
                                                                    <TextBlack14pxRegular>{one.addRequirement.content}</TextBlack14pxRegular>
                                                                </ListItem>
                                                            ))
                                                        }
                                                    </OrderedList>
                                                ) : null}
                                            </ListItem>
                                        ))
                                        }
                                    </OrderedList>) : <TextBlack14pxRegular> Не установлены </TextBlack14pxRegular>
                                }
                            </FlexTextRow>
                            <FlexTextRow>
                                <TextGray14pxRegular style={{ width: '35%' }}>Ограничения</TextGray14pxRegular>
                                <TextBlack14pxRegular>{
                                    lastTender?.notificationInfo?.restrictionsInfo?.restrictionInfo?.preferenseRequirementInfo?.name ?
                                        lastTender?.notificationInfo?.restrictionsInfo?.restrictionInfo?.preferenseRequirementInfo?.name :
                                        "Не установлены"
                                }</TextBlack14pxRegular>
                            </FlexTextRow>
                        </BorderedContainer>
                        {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee ? (
                            <BorderedContainer>
                                <TextBlack14pxBold>Обеспечение исполнения контракта</TextBlack14pxBold>
                                {/*<FlexTextColumn>*/}
                                {/*    <TextGray14pxRegular style={{width: '35%'}}>Требуется обеспечение исполнения контракта</TextGray14pxRegular>*/}
                                {/*    <TextBlack14pxRegular></TextBlack14pxRegular>*/}
                                {/*</FlexTextColumn>*/}
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Размер обеспечения исполнения
                                        контракта</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.amount} ({lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.part})
                                        %</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Порядок предоставления обеспечения
                                        исполнения контракта, требования к обеспечению</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.procedureInfo}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Платежные реквизиты для обеспечения
                                        исполнения контракта</TextGray14pxRegular>
                                    <TextBlack14pxRegular>р/с {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.account?.settlementAccount}
                                        л/с {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.account?.personalAccount},
                                        БИК {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.account?.bik},
                                        {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.account?.creditOrgName}
                                    </TextBlack14pxRegular>
                                </FlexTextColumn>
                            </BorderedContainer>
                        ) : null}
                        {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.applicationGuarantee ? (
                            <BorderedContainer>
                                <TextBlack14pxBold>Обеспечение заявки</TextBlack14pxBold>
                                {/*<FlexTextColumn>*/}
                                {/*    <TextGray14pxRegular style={{width: '35%'}}>Требуется обеспечение исполнения контракта</TextGray14pxRegular>*/}
                                {/*    <TextBlack14pxRegular></TextBlack14pxRegular>*/}
                                {/*</FlexTextColumn>*/}
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Размер обеспечения исполнения
                                        контракта</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.applicationGuarantee?.amount} ₽</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Порядок предоставления обеспечения
                                        исполнения контракта, требования к обеспечению</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.applicationGuarantee?.procedureInfo}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Платежные реквизиты для обеспечения
                                        исполнения контракта</TextGray14pxRegular>
                                    <TextBlack14pxRegular>р/с {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.applicationGuarantee?.account?.settlementAccount}
                                        л/с {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.account?.personalAccount},
                                        БИК {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.account?.bik},
                                        {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractGuarantee?.account?.creditOrgName}
                                    </TextBlack14pxRegular>
                                </FlexTextColumn>
                            </BorderedContainer>
                        ) : null}
                        <BorderedContainer>
                            <TextBlack14pxBold>Начальная(максимальная) цена контракта</TextBlack14pxBold>
                            <FlexTextColumn>
                                <TextGray14pxRegular style={{ width: '35%' }}>Начальная(максимальная) цена
                                    контракта</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice}</TextBlack14pxRegular>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular style={{ width: '35%' }}>Валюта</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.currency?.name}</TextBlack14pxRegular>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular style={{ width: '35%' }}>Размер аванса</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.advancePaymentSum?.sumInPercents || '0'} %</TextBlack14pxRegular>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular style={{ width: '35%' }}>Идентификационный номер
                                    закупки</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.IKZInfo?.purchaseCode}</TextBlack14pxRegular>
                            </FlexTextColumn>
                        </BorderedContainer>
                        <BorderOpeningContainer>
                            <FlexTextRow style={{ alignItems: 'center' }}>
                                <TextBlack14pxBold style={{ marginRight: '20px' }}>Документы закупки</TextBlack14pxBold>
                                <div
                                    id="arrow"
                                    onClick={handleClickThird}
                                    style={{ transform: isZakupkiDocsVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                >
                                    <Arrow />
                                </div>
                            </FlexTextRow>
                            {isZakupkiDocsVisible && (
                                <BorderFitContaienr>
                                    {
                                        lastTender?.attachmentsInfo?.attachmentInfo?.map((item, index) => (
                                            <a key={index} href={`${item.url}`}>
                                                <TextBlue14pxRegular key={index}>{item.fileName}</TextBlue14pxRegular>
                                            </a>
                                        ))
                                    }
                                </BorderFitContaienr>
                            )}
                        </BorderOpeningContainer>
                        <BorderOpeningContainer>
                            <FlexTextRow style={{ alignItems: 'center' }}>
                                <TextBlack14pxBold style={{ marginRight: '20px' }}>Протоколы</TextBlack14pxBold>
                                <div
                                    id="arrow"
                                    onClick={handleClickProtocols}
                                    style={{ transform: isProtocolsContainerVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                >
                                    <Arrow />
                                </div>
                            </FlexTextRow>
                            {isProtocolsContainerVisible && (
                                <BorderFitContaienr>
                                    <FlexTextColumn>
                                        {
                                            tender?.protocols?.map((item, index) => (
                                                <a key={index} href={item.extPrintFormInfo?.url || item.printFormInfo?.url}>
                                                    {/*download={`Протокол_${item.commonInfo?.docNumber}_от_${item.commonInfo?.signDT}.${item.extPrintFormInfo.fileType}`}*/}
                                                    <TextBlue14pxRegular>Протокол {item.commonInfo?.docNumber} от {item.commonInfo?.publishDTInEIS || item.commonInfo?.docPublishDTInEIS}</TextBlue14pxRegular>
                                                </a>
                                            ))
                                        }
                                    </FlexTextColumn>
                                </BorderFitContaienr>
                            )}
                        </BorderOpeningContainer>
                        {tender?.clarification[0]?.commonInfo ? (
                            <BorderOpeningContainer>
                                <FlexTextRow style={{ alignItems: 'center' }}>
                                    <TextBlack14pxBold style={{ marginRight: '20px' }}>Разъяснения</TextBlack14pxBold>
                                    <div
                                        id="arrow"
                                        onClick={handleClick}
                                        style={{ transform: isExplanationDocsVisible ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    >
                                        <Arrow />
                                    </div>
                                </FlexTextRow>
                                {isExplanationDocsVisible && (
                                    <BorderFitContaienr>
                                        <FlexTextColumn>
                                            {tender?.clarification[0]?.commonInfo?.href ?
                                                (<a href={`${tender?.clarification[0]?.commonInfo?.href}`}>
                                                    <TextBlue14pxRegular>Запрос - ответ
                                                        от {formatDate(tender?.clarification[0]?.commonInfo?.docPublishDTInEIS)}</TextBlue14pxRegular>
                                                </a>) : null
                                            }
                                        </FlexTextColumn>
                                    </BorderFitContaienr>
                                )}
                            </BorderOpeningContainer>
                        ) : null}
                        {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan ? (
                            <BorderedContainer>
                                <TextBlack14pxBold>Информация о сроках исполнения контракта и источниках финансирования</TextBlack14pxBold>
                                {
                                    lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.contractExecutionTermsInfo?.notRelativeTermsInfo ?
                                        <>
                                            <FlexTextColumn>
                                                <TextGray14pxRegular style={{ width: '35%' }}>Дата начала исполнения
                                                    контракта</TextGray14pxRegular>
                                                <TextBlack14pxRegular>{
                                                    lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.contractExecutionTermsInfo?.notRelativeTermsInfo?.isFromConclusionDate ?
                                                        'с даты заключения контракта' :
                                                        lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.contractExecutionTermsInfo?.notRelativeTermsInfo?.startDate}</TextBlack14pxRegular>
                                            </FlexTextColumn>
                                            <FlexTextColumn>
                                                <TextGray14pxRegular style={{ width: '35%' }}>Срок исполнения
                                                    контракта</TextGray14pxRegular>
                                                <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.contractExecutionTermsInfo?.notRelativeTermsInfo?.endDate}</TextBlack14pxRegular>
                                            </FlexTextColumn>
                                        </> : lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.contractExecutionTermsInfo?.relativeTermsInfo ?
                                            <>
                                                <FlexTextColumn>
                                                    <TextGray14pxRegular style={{ width: '35%' }}>Дата начала исполнения контракта</TextGray14pxRegular>
                                                    <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.contractExecutionTermsInfo?.relativeTermsInfo?.start} календарных дней с даты заключения контракта</TextBlack14pxRegular>
                                                </FlexTextColumn>
                                                <FlexTextColumn>
                                                    <TextGray14pxRegular style={{ width: '35%' }}>Срок исполнения
                                                        контракта</TextGray14pxRegular>
                                                    <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.contractExecutionTermsInfo?.relativeTermsInfo?.term} календарных дней с даты заключения контракта</TextBlack14pxRegular>
                                                </FlexTextColumn>
                                            </> : <FlexTextColumn>
                                                <TextBlack14pxRegular> Нет данных </TextBlack14pxRegular>
                                            </FlexTextColumn>
                                }

                                {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.stagesInfo?.length ? (
                                    <FlexTextColumn>
                                        <TextGray14pxRegular style={{ width: '35%' }}>Количество этапов</TextGray14pxRegular>
                                        <TextBlack14pxRegular>{
                                            lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.stagesInfo?.length
                                        }</TextBlack14pxRegular>
                                    </FlexTextColumn>) : null}
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Наименование бюджета</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{
                                        lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.budgetInfo?.name
                                    }</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Код территории муниципального
                                        образования</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.OKTMOInfo?.code}: {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.OKTMOInfo?.name}</TextBlack14pxRegular>
                                </FlexTextColumn>
                            </BorderedContainer>) : null}
                        {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.warrantyInfo ? (
                            <>
                                <BorderedContainer>
                                    <TextBlack14pxBold>Требования к гарантии качества товара, работы, услуги</TextBlack14pxBold>
                                    <FlexTextColumn>
                                        <TextGray14pxRegular style={{ width: '35%' }}>Требуется гарантия качества товара, работы,
                                            услуги</TextGray14pxRegular>
                                        <TextBlack14pxRegular> Да </TextBlack14pxRegular>
                                        <TextGray14pxRegular style={{ width: '35%' }}>Срок, на который предоставляется гарантия и
                                            (или) требования к объёму предоставления гарантий качества
                                            товара.</TextGray14pxRegular>
                                        <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.warrantyInfo?.warrantyTerm}</TextBlack14pxRegular>
                                        <TextGray14pxRegular style={{ width: '35%' }}>Информация о требованиях к гарантийному
                                            обслуживанию товара</TextGray14pxRegular>
                                        <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.warrantyInfo?.manufacturersWarrantyRequirement}</TextBlack14pxRegular>
                                        <TextGray14pxRegular style={{ width: '35%' }}>Срок, на который предоставляется гарантия и
                                            (или) требования к объёму предоставления гарантий качества
                                            товара.</TextGray14pxRegular>
                                        <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.warrantyInfo?.warrantyServiceRequirement}</TextBlack14pxRegular>
                                    </FlexTextColumn>
                                </BorderedContainer>
                                {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.addInfo ? (
                                    <BorderedContainer>
                                        <TextBlack14pxBold style={{ width: '35%' }}> Дополнительная информация</TextBlack14pxBold>
                                        <TextBlack14pxRegular> {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.addInfo} </TextBlack14pxRegular>
                                    </BorderedContainer>
                                ) : null
                                }
                            </>
                        ) : null}
                        {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.financeInfo ? (
                            <BorderedContainer>
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Финансовое обеспечение
                                        закупки</TextGray14pxRegular>
                                    <Table>
                                        <tbody>
                                            <TableRow>
                                                <TableCell><TextGray14pxRegular>НА 2023 ГОД, ₽</TextGray14pxRegular></TableCell>
                                                <TableCell><TextGray14pxRegular>НА 2024 ГОД, ₽</TextGray14pxRegular></TableCell>
                                                <TableCell><TextGray14pxRegular>НА 2025 ГОД, ₽</TextGray14pxRegular></TableCell>
                                                <TableCell><TextGray14pxRegular>НА ПОСЛЕДУЩИЕ ГОДЫ,
                                                    ₽</TextGray14pxRegular></TableCell>
                                                <TableCell><TextGray14pxRegular>ВСЕГО, ₽</TextGray14pxRegular></TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.financeInfo?.currentYear}</TableCell>
                                                <TableCell>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.financeInfo?.firstYear}</TableCell>
                                                <TableCell>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.financeInfo?.secondYear}</TableCell>
                                                <TableCell>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.financeInfo?.subsecYears}</TableCell>
                                                <TableCell>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.financeInfo?.total}</TableCell>
                                            </TableRow>
                                        </tbody>
                                    </Table>
                                </FlexTextColumn>
                            </BorderedContainer>) : null}
                        {
                            lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.stagesInfo ? (
                                <BorderedContainer>
                                    <FlexTextColumn>
                                        <TextGray14pxRegular style={{ width: '35%' }}>За счет бюджетных
                                            средств</TextGray14pxRegular>
                                        <Table>
                                            <tbody>
                                                <TableRow>
                                                    <TableCell><TextGray14pxRegular>КБК</TextGray14pxRegular></TableCell>
                                                    <TableCell><TextGray14pxRegular>НА 2023 ГОД,
                                                        ₽</TextGray14pxRegular></TableCell>
                                                    <TableCell><TextGray14pxRegular>НА 2024 ГОД,
                                                        ₽</TextGray14pxRegular></TableCell>
                                                    <TableCell><TextGray14pxRegular>НА 2025 ГОД,
                                                        ₽</TextGray14pxRegular></TableCell>
                                                    <TableCell><TextGray14pxRegular>НА ПОСЛЕДУЩИЕ ГОДЫ, ₽</TextGray14pxRegular></TableCell>
                                                    <TableCell><TextGray14pxRegular>ВСЕГО, ₽</TextGray14pxRegular></TableCell>
                                                </TableRow>
                                                {
                                                    Object.values(lastTender?.notificationInfo.customerRequirementsInfo.customerRequirementInfo.contractConditionsInfo.contractExecutionPaymentPlan.stagesInfo).map((item, index) =>
                                                    (
                                                        <TableRow>
                                                            <TableCell>{item?.budgetFinancingsInfo?.budgetFinancingInfo?.KBK}</TableCell>
                                                            <TableCell>{item?.budgetFinancingsInfo?.budgetFinancingInfo?.paymentYearInfo?.currentYear}</TableCell>
                                                            <TableCell>{item?.budgetFinancingsInfo?.budgetFinancingInfo?.paymentYearInfo?.firstYear}</TableCell>
                                                            <TableCell>{item?.budgetFinancingsInfo?.budgetFinancingInfo?.paymentYearInfo?.secondYear}</TableCell>
                                                            <TableCell>{item?.budgetFinancingsInfo?.budgetFinancingInfo?.paymentYearInfo?.subsecYears}</TableCell>
                                                            <TableCell>{item?.budgetFinancingsInfo?.budgetFinancingInfo?.paymentYearInfo?.total}</TableCell>
                                                        </TableRow>
                                                    ))
                                                }

                                            </tbody>
                                        </Table>
                                    </FlexTextColumn>
                                </BorderedContainer>) : null}

                        <BorderedContainer>

                            <TextBlack14pxBold>Обеспечение гарантийных обязательств</TextBlack14pxBold>
                            {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.provisionWarranty ? (
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Требуется обеспечение гарантийных
                                        обязательств</TextGray14pxRegular>
                                    <TextBlack14pxRegular>Да</TextBlack14pxRegular>
                                </FlexTextColumn>
                            ) : null}
                            {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.provisionWarranty?.amount ?
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Размер обеспечение гарантийных
                                        обязательств</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.provisionWarranty?.amount} Российский
                                        рубль</TextBlack14pxRegular>
                                </FlexTextColumn> : null
                            }
                            {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.provisionWarranty?.procedureInfo ?
                                <FlexTextColumn>
                                    <TextGray14pxRegular style={{ width: '35%' }}>Порядок предоставления обеспечения гарантийных
                                        обязательств, требования к обеспечению</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{
                                        lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.provisionWarranty?.procedureInfo
                                    }</TextBlack14pxRegular>
                                </FlexTextColumn> : null
                            }
                            {
                                lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.budgetInfo?.name ?
                                    <FlexTextColumn>
                                        <TextGray14pxRegular style={{ width: '35%' }}>Наименование бюджета</TextGray14pxRegular>
                                        <TextBlack14pxRegular>{
                                            lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.budgetInfo?.name
                                        }</TextBlack14pxRegular>
                                    </FlexTextColumn> : null
                            }
                            {
                                lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.OKTMOInfo?.code
                                    || lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.OKTMOInfo?.name ?
                                    <FlexTextColumn>
                                        <TextGray14pxRegular style={{ width: '35%' }}>Код территории муниципального
                                            образования</TextGray14pxRegular>
                                        <TextBlack14pxRegular>{lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.OKTMOInfo?.code}: {lastTender?.notificationInfo?.customerRequirementsInfo?.customerRequirementInfo?.contractConditionsInfo?.contractExecutionPaymentPlan?.financingSourcesInfo?.budgetFinancingsInfo?.OKTMOInfo?.name}</TextBlack14pxRegular>
                                    </FlexTextColumn> : null

                            }
                        </BorderedContainer>
                        {
                            lastTender?.notificationInfo?.criteriaInfo ? (
                                <CriterialInfo
                                    criterias={lastTender?.notificationInfo?.criteriaInfo?.criterionInfo} />
                            ) : null
                        }
                        {
                            tender?.result?.length > 0 ?
                                <TenderResults tender={tender} /> : null
                        }
                        <BorderedContainer>
                            <TextBlack14pxBold> Журнал событий</TextBlack14pxBold>
                            {events?.length ? events.map((a) => (
                                <FlexTextColumn>
                                    <TextGray14pxRegular> {a.date} </TextGray14pxRegular>
                                    <TextBlack14pxRegular> {a.message}</TextBlack14pxRegular>
                                </FlexTextColumn>
                            )) : null}

                        </BorderedContainer>
                        <JsonRenderer tenderID={lastTender?.commonInfo?.purchaseNumber} />
                    </RightSideSection>
                </PageContainer>
            </div>
        )
    } else return null
}