import JsonRenderer from "../JsonRenderer";
import { useState } from "react";
import {
    BorderedContainer,
    LeftSideSection,
    PageContainer,
    RightSideSection,
    Table,
    TableCell,
    TableRow
} from "../../styles";
import {
    TextBlack14pxBold,
    TextBlack14pxRegular,
    TextBlack22pxRegular, TextGray11pxRegular,
    TextGray14pxRegular
} from "../../constants/fonts";
import { FlexRow, FlexTextColumn } from "../../containers/containers";
import { formatDate } from "../../functions/FormateDate";
import { Documents } from "../../components/FZ223/Tender/Documents/Documents";
import { getEvents223 } from "../../functions/Events223";
import axios from "axios";
import { showErrorMessage, showSuccesMessage } from "../../functions/Message";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { PiTagSimpleLight } from "react-icons/pi";
import { GoPaperAirplane } from "react-icons/go";
import { TagsModal } from "../../components/TagsModal/TagsModal";
import { GrStatusGood } from "react-icons/gr";
import { useEffect } from "react";



function getRef(url) {
    const params = new URL(url).searchParams
    return `https://zakupki.gov.ru/epz/order/notice/notice223/common-info.html?${params}`
}



export const TenderCard223 = ({ tender }) => {

    const [lastTender] = tender.tender.sort((a, b) => +b.version - +a.version)
    const events = getEvents223(tender)
    const stage = events[0].stage ? events[0].stage : 'Подача заявок'
    console.log(events);

    formatDate(lastTender?.publicationPlannedDate || tender.tender[0].publicationDateTime)

    console.log(tender)

    const [isSended, setIsSended] = useState(false)
    const [isMyTender, setIsMyTender] = useState()
    const [markTag, setMarkTag] = useState()
    const [tags, setTags] = useState([])
    const [showTagsPopup, setShowTagsPopup] = useState(false);
    const [popupTagsPosition, setPopupTagsPosition] = useState({ x: 0, y: 0 })

    const regNum = tender.tender[0]?.commonInfo?.purchaseNumber ? tender.tender[0]?.commonInfo?.purchaseNumber : tender.tender[0]?.registrationNumber

    const addMyTenders = async () => {
        try {


            const response = await axios.post(`${process.env.REACT_APP_API}/api/lk/mytenders`, {
                regNum: String(regNum)
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

    const deleteFromMyTenders = async () => {
        try {



            const response = await axios.delete(`${process.env.REACT_APP_API}/api/lk/mytenders/${regNum}`, {
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

    const sendTenderSpecialist = async () => {
        try {

            const send = await axios.post(`${process.env.REACT_APP_API}/api/lk/sendtenderspecialist`, {
                regNum: regNum
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            showSuccesMessage('Отправлено тендерному специалисту!')
            setIsSended(true)

        } catch (error) {
            showErrorMessage(error.data.response.data.message)
        }
    }


    const checkSendTenderSpecialist = async () => {
        try {

            const response = await axios.post(`${process.env.REACT_APP_API}/api/lk/checksendtenderspecialist`, {
                regNum: regNum
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            setIsSended(response.data.message)

        } catch (error) {
            showErrorMessage(error.data.response.data.message)
        }
    }

    const closeModal = () => {
        setShowTagsPopup(false)
    }

    async function checkAllFunction() {
        await isMyTenderCheck()
        await getTagForRegNum()
        await checkSendTenderSpecialist()
    }


    useEffect(() => {

        checkAllFunction()

    }, [isMyTender])




    if (tender) {
        return (

            <div>
                  <div>
                    {(showTagsPopup && tags.length) > 0 && (
                        <TagsModal tags={tags} closeModal={closeModal} addTagToTender={addTagToTender} popupTagsPosition={popupTagsPosition} jsonData={tender.tender[0]} addTag={markTag} setAddTag={setMarkTag} />
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
                        {
                            !isSended
                                ?
                                <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }} onClick={sendTenderSpecialist}>
                                    <GoPaperAirplane size={20} color="dodgerblue" />
                                    <p>Отправить тендерному специалисту</p>
                                </div>
                                :
                                <div style={{ display: 'flex', padding: '10px', alignItems: 'center', cursor: 'pointer' }}>
                                    <GrStatusGood size={20} color="dodgerblue" />
                                    <p>Отправлено тендерному специалисту!</p>
                                </div>
                        }

                    </div>
                    </div>
            <PageContainer>
                <LeftSideSection>
                    <BorderedContainer>
                        <TextBlack22pxRegular>Сведения о закупке</TextBlack22pxRegular>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Реестровый номер извещения</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.registrationNumber}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Способ осуществления закупки</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.purchaseCodeName}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Наименование закупки</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.name}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Редакция</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.version}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Дата размещения извещения</TextGray14pxRegular>
                            <TextBlack14pxRegular>{formatDate(lastTender?.publicationPlannedDate || tender.tender[0].publicationDateTime)}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        {
                            lastTender?.publicationDateTime &&
                            <FlexTextColumn>
                                <TextGray14pxRegular>Дата размещения текущей редакции извещения</TextGray14pxRegular>
                                <TextBlack14pxRegular>{formatDate(lastTender?.publicationDateTime)}</TextBlack14pxRegular>
                            </FlexTextColumn>
                        }
                        {
                            lastTender?.modificationDate &&
                            <FlexTextColumn>
                                <TextGray14pxRegular>Дата принятия решения о внесении изменений</TextGray14pxRegular>
                                <TextBlack14pxRegular>{formatDate(lastTender?.modificationDate)}</TextBlack14pxRegular>
                            </FlexTextColumn>
                        }
                        {
                            lastTender?.modificationDescription &&
                            <FlexTextColumn>
                                <TextGray14pxRegular>Причина внесения изменений</TextGray14pxRegular>
                                <TextBlack14pxRegular>{lastTender?.modificationDescription}</TextBlack14pxRegular>
                            </FlexTextColumn>
                        }
                        {lastTender.electronicPlaceInfo &&
                            <FlexTextColumn>
                                <TextGray14pxRegular>Наименование электронной площадки</TextGray14pxRegular>
                                <a href={lastTender.electronicPlaceInfo.url}>
                                    <TextBlack14pxRegular>{lastTender.electronicPlaceInfo.name}</TextBlack14pxRegular>
                                </a>
                            </FlexTextColumn>
                        }
                        {
                            lastTender.urlEIS ?
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Официальный сайт</TextGray14pxRegular>
                                    <a href={getRef(lastTender.urlEIS)}>
                                        <TextBlack14pxRegular>{new URL('https://zakupki.gov.ru').host}</TextBlack14pxRegular>
                                    </a>
                                </FlexTextColumn> : null
                        }
                    </BorderedContainer>

                    <BorderedContainer>
                        <TextBlack22pxRegular>Сведения о заказчике</TextBlack22pxRegular>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Наименование организации</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.placer.mainInfo.fullName}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexRow>
                            <TextGray14pxRegular>ИНН</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.placer.mainInfo.inn}</TextBlack14pxRegular>
                            <TextGray14pxRegular>КПП</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.placer.mainInfo.kpp}</TextBlack14pxRegular>
                            <TextGray14pxRegular>ОГРН</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.placer.mainInfo.ogrn}</TextBlack14pxRegular>
                        </FlexRow>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Место нахождения</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.placer.mainInfo.legalAddress}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Почтовый адрес</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.placer.mainInfo.postalAddress}</TextBlack14pxRegular>
                        </FlexTextColumn>
                    </BorderedContainer>

                    <BorderedContainer>
                        <TextBlack22pxRegular>Требования к участникам закупки</TextBlack22pxRegular>
                        <FlexTextColumn>
                            <TextBlack14pxRegular>{lastTender.notDishonest ?
                                "Требования к отсутствию участников закупки в реестре недобросовестных поставщиков" :
                                "Нет требований"
                            }</TextBlack14pxRegular>
                        </FlexTextColumn>
                    </BorderedContainer>

                    <BorderedContainer>
                        <TextBlack22pxRegular>Контактная информация</TextBlack22pxRegular>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Контактное лицо</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.contact.lastName ? lastTender.contact.lastName : ""} {lastTender.contact.firstName ? lastTender.contact.firstName : ""} {lastTender.contact.middleName ? lastTender.contact.middleName : ""}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Адрес электронной почты</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.contact.email}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Контактный телефон</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.contact.phone}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        {
                            lastTender.contact.additionalContactInfo ?
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Дополнительная контактная информация</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender.contact.additionalContactInfo}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                : null
                        }
                    </BorderedContainer>

                    <BorderedContainer>
                        <TextBlack22pxRegular>Порядок проведения процедуры</TextBlack22pxRegular>
                        {
                            lastTender.documentationDelivery?.applSubmisionPlace ?
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Место подачи заявок</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender.documentationDelivery.applSubmisionPlace}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                : lastTender.placingProcedure?.summingupPlace ?
                                    <FlexTextColumn>
                                        <TextGray14pxRegular>Место подачи заявок</TextGray14pxRegular>
                                        <TextBlack14pxRegular>{lastTender.placingProcedure?.summingupPlace}</TextBlack14pxRegular>
                                    </FlexTextColumn>
                                    : null
                        }
                        {
                            lastTender.applSubmisionStartDate ?
                                <FlexTextColumn>
                                    <TextGray14pxRegular>Дата начала срока подачи заявок</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{formatDate(lastTender.applSubmisionStartDate)}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                : null
                        }
                        <FlexTextColumn>
                            <TextGray14pxRegular>Дата и время окончания срока подачи заявок (по местному времени заказчика)</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.submissionCloseDateTime ? new Date(lastTender.submissionCloseDateTime).toLocaleString() : "Не указана"}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Порядок подачи заявок</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.summingupOrder ? lastTender.summingupOrder : "Отсутствует"}</TextBlack14pxRegular>
                        </FlexTextColumn>
                    </BorderedContainer>

                    {
                        lastTender.documentationDelivery ?
                            <BorderedContainer>
                                <TextBlack22pxRegular>Предоставление документации</TextBlack22pxRegular>
                                {
                                    lastTender.documentationDelivery.deliveryStartDateTime || lastTender.documentationDelivery.deliveryEndDateTime ?
                                        <FlexTextColumn>
                                            <TextGray14pxRegular>Срок предоставления</TextGray14pxRegular>
                                            <TextBlack14pxRegular>{lastTender.documentationDelivery.deliveryStartDateTime ? "c " + formatDate(new Date(lastTender.documentationDelivery.deliveryStartDateTime).toISOString()) : ""}
                                                {lastTender.documentationDelivery.deliveryEndDateTime ? " по " + formatDate(new Date(lastTender.documentationDelivery.deliveryEndDateTime).toISOString()) : ""}</TextBlack14pxRegular>
                                        </FlexTextColumn>
                                        : null
                                }
                                {
                                    lastTender.documentationDelivery.place ?
                                        <FlexTextColumn>
                                            <TextGray14pxRegular>Место предоставления</TextGray14pxRegular>
                                            <TextBlack14pxRegular>{lastTender.documentationDelivery.place}</TextBlack14pxRegular>
                                        </FlexTextColumn>
                                        : null
                                }
                                {
                                    lastTender.documentationDelivery.procedure ?
                                        <FlexTextColumn>
                                            <TextGray14pxRegular>Порядок предоставления</TextGray14pxRegular>
                                            <TextBlack14pxRegular>{lastTender.documentationDelivery.procedure}</TextBlack14pxRegular>
                                        </FlexTextColumn>
                                        : null
                                }
                                {/*<FlexTextColumn>*/}
                                {/*    <TextGray14pxRegular>Официальный сайт ЕИС, на котором размещена документация</TextGray14pxRegular>*/}
                                {/*    <TextBlack14pxRegular>www.zakupki.gov.ru</TextBlack14pxRegular>*/}
                                {/*</FlexTextColumn>*/}

                                <FlexTextColumn>
                                    <TextGray14pxRegular>Внесение платы за предоставление конкурсной документации</TextGray14pxRegular>
                                    <TextBlack14pxRegular>{lastTender.jointPurchase == "false" ? "Требования не установлены" : "-"}</TextBlack14pxRegular>
                                </FlexTextColumn>
                            </BorderedContainer>
                            : null
                    }
                </LeftSideSection>
                <RightSideSection>
                    <BorderedContainer>
                        <TextBlack22pxRegular> Сведения о лотах </TextBlack22pxRegular>
                        <Table>
                            <thead>
                                <TableRow>
                                    <TableCell style={{ width: '35%' }}><TextGray11pxRegular>НОМЕР, НАИМЕНОВАНИЕ ЛОТА</TextGray11pxRegular>	</TableCell>
                                    <TableCell style={{ width: '10%' }}><TextGray11pxRegular>ЦЕНТРАЛИЗОВАННАЯ ЗАКУПКА</TextGray11pxRegular></TableCell>
                                    <TableCell><TextGray11pxRegular>СВЕДЕНИЯ О ЦЕНЕ ДОГОВОРА</TextGray11pxRegular></TableCell>
                                    <TableCell><TextGray11pxRegular>КЛАССИФИКАЦИЯ ПО ОКПД2</TextGray11pxRegular></TableCell>
                                    <TableCell>	<TextGray11pxRegular>КЛАССИФИКАЦИЯ ПО ОКВЭД2</TextGray11pxRegular></TableCell>
                                </TableRow>
                            </thead>
                            <tbody>
                                {
                                    [lastTender.lots].flat().map(a => (
                                        [a.lot].flat().map(b => (
                                            <TableRow>
                                                <TableCell style={{ width: '35%' }}><TextBlack14pxRegular>{a.lot.ordinalNumber} {b.lotData?.subject}</TextBlack14pxRegular>	</TableCell>
                                                <TableCell style={{ width: '10%' }}><TextBlack14pxRegular>{
                                                    b.lotData?.centralized ? "Да" : "Нет"
                                                }</TextBlack14pxRegular></TableCell>
                                                <TableCell><TextBlack14pxRegular>Начальная (максимальная) цена договора: {b.lotData?.initialSum ||
                                                    b.lotData?.maxContractPrice
                                                } ₽</TextBlack14pxRegular></TableCell>
                                                {b.lotData?.lotItems ? (
                                                    <>
                                                        <TableCell><TextBlack14pxRegular>
                                                            {[b.lotData?.lotItems.lotItem].flat().map((curr) => Object.values(curr.okpd2 || {}).join(' ')).join(' \n ')}
                                                        </TextBlack14pxRegular></TableCell>
                                                        <TableCell>	<TextBlack14pxRegular>
                                                            {[b.lotData?.lotItems.lotItem].flat().map((curr) => Object.values(curr.okved2 || {}).join(' ')).join('\n')}
                                                        </TextBlack14pxRegular></TableCell>
                                                    </>
                                                ) : (
                                                    <>
                                                        <TableCell><TextBlack14pxRegular>
                                                            {b.lotData.okpd2 || "Отсутсвует"}
                                                        </TextBlack14pxRegular></TableCell>
                                                        <TableCell><TextBlack14pxRegular>
                                                            {b.lotData.okved2 || "Отсутсвует"}
                                                        </TextBlack14pxRegular></TableCell>
                                                    </>
                                                )
                                                }

                                            </TableRow>
                                        )
                                        ))
                                    )
                                }
                            </tbody>
                        </Table>
                    </BorderedContainer>
                    <Documents tender={tender} />
                    <BorderedContainer>
                        <TextBlack14pxBold> Журнал событий</TextBlack14pxBold>
                        {events?.length ? events.map(a => (
                            <FlexTextColumn>
                                <TextGray14pxRegular> {a.date}</TextGray14pxRegular>
                                <TextBlack14pxRegular> {a.message}</TextBlack14pxRegular>
                            </FlexTextColumn>
                        )) : null}
                    </BorderedContainer>
                    <JsonRenderer tenderID={tender.tender[0]?.registrationNumber} />
                </RightSideSection>
            </PageContainer>

            </div>
        )
    } else return null
}
