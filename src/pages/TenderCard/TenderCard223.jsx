import JsonRenderer from "../JsonRenderer";
import {useState} from "react";
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
import {FlexRow, FlexTextColumn} from "../../containers/containers";
import {formatDate} from "../../functions/FormateDate";
import {Documents} from "../../components/FZ223/Tender/Documents/Documents";


export const TenderCard223 = ({tender}) => {



    const [isSecondContainerVisible, setSecondContainerVisible] = useState(false);
    const [isThirdContainerVisible, setThirdContainerVisible] = useState(false);
    const [isProtocolsContainerVisible, setProtocolsContainerVisible] = useState(false);

    const handleClick = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setSecondContainerVisible(!isSecondContainerVisible);
    };
    const handleClickThird = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setThirdContainerVisible(!isThirdContainerVisible);
    };
    const handleClickProtocols = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setProtocolsContainerVisible(!isProtocolsContainerVisible);
    };

    const [lastTender] = tender.tender.sort((a, b) => a.version - b.version)
    console.log(tender)
    if (tender) {
        return (
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
                            <TextBlack14pxRegular>{formatDate(lastTender.publicationDateTime)}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Дата размещения текущей редакции извещения</TextGray14pxRegular>
                            <TextBlack14pxRegular>{formatDate(tender?.tender?.[0]?.modificationDate)}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Дата принятия решения о внесении изменений</TextGray14pxRegular>
                            <TextBlack14pxRegular>{}</TextBlack14pxRegular>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Причина внесения изменений</TextGray14pxRegular>
                            <TextBlack14pxRegular>{tender?.tender?.[0]?.version}</TextBlack14pxRegular>
                        </FlexTextColumn>


                        <FlexTextColumn>
                            <TextGray14pxRegular>Официальный сайт</TextGray14pxRegular>
                            <a href={tender?.tender?.[0]?.commonInfo?.ETP?.url}>
                                <TextBlack14pxRegular>{tender?.tender?.[0]?.commonInfo?.ETP?.url}</TextBlack14pxRegular>
                            </a>
                        </FlexTextColumn>
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
                            <TextBlack14pxRegular>{lastTender.contact.lastName + " " + lastTender.contact.firstName + lastTender.contact.middleName}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Адрес электронной почты</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.contact.email}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Контактный телефон</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.contact.phone}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Дополнительная контактная информация</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.contact.additionalContactInfo}</TextBlack14pxRegular>
                        </FlexTextColumn>
                    </BorderedContainer>

                    <BorderedContainer>
                        <TextBlack22pxRegular>Порядок проведения процедуры</TextBlack22pxRegular>
                        <TextBlack14pxBold>Подача заявок</TextBlack14pxBold>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Место подачи заявок</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.documentationDelivery.applSubmisionPlace}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Дата начала срока подачи заявок</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.applSubmisionStartDate}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Дата и время окончания срока подачи заявок (по местному времени заказчика)</TextGray14pxRegular>
                            <TextBlack14pxRegular>{new Date(lastTender.submissionCloseDateTime).toLocaleString()}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Порядок подачи заявок</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.summingupOrder}</TextBlack14pxRegular>
                        </FlexTextColumn>
                    </BorderedContainer>

                    <BorderedContainer>
                        <TextBlack22pxRegular>Предоставление документации</TextBlack22pxRegular>
                        <FlexTextColumn>
                            <TextGray14pxRegular>Срок предоставления</TextGray14pxRegular>
                            <TextBlack14pxRegular>c {lastTender.documentationDelivery.deliveryStartDateTime} по {lastTender.documentationDelivery.deliveryEndDateTime}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Место предоставления</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.documentationDelivery.place}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Порядок предоставления</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.documentationDelivery.procedure}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Официальный сайт ЕИС, на котором размещена документация</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.summingupOrder}</TextBlack14pxRegular>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray14pxRegular>Внесение платы за предоставление конкурсной документации</TextGray14pxRegular>
                            <TextBlack14pxRegular>{lastTender.jointPurchase == "false" ? "Требования не установлены" : ""}</TextBlack14pxRegular>
                        </FlexTextColumn>
                    </BorderedContainer>

                </LeftSideSection>
                <RightSideSection>
                    <BorderedContainer>
                        <TextBlack22pxRegular> Сведения о лотах </TextBlack22pxRegular>
                        <Table>
                            <thead>
                                <TableRow>
                                    <TableCell style={{width:'35%'}}><TextGray11pxRegular>НОМЕР, НАИМЕНОВАНИЕ ЛОТА</TextGray11pxRegular>	</TableCell>
                                    <TableCell style={{width:'10%'}}><TextGray11pxRegular>ЦЕНТРАЛИЗОВАННАЯ ЗАКУПКА</TextGray11pxRegular></TableCell>
                                    <TableCell><TextGray11pxRegular>СВЕДЕНИЯ О ЦЕНЕ ДОГОВОРА</TextGray11pxRegular></TableCell>
                                    <TableCell><TextGray11pxRegular>КЛАССИФИКАЦИЯ ПО ОКПД2</TextGray11pxRegular></TableCell>
                                    <TableCell>	<TextGray11pxRegular>КЛАССИФИКАЦИЯ ПО ОКВЭД2</TextGray11pxRegular></TableCell>
                                </TableRow>
                            </thead>
                            <tbody>
                            {
                                [lastTender.lots].flat().map(a=> (
                                    <TableRow>
                                        <TableCell style={{width:'35%'}}><TextBlack14pxRegular>{a.lot.ordinalNumber} {a.lot.lotData?.subject}</TextBlack14pxRegular>	</TableCell>
                                        <TableCell style={{width:'10%'}}><TextBlack14pxRegular>{
                                            a.lot.lotData?.centralized ? "Да" : "Нет"
                                        }</TextBlack14pxRegular></TableCell>
                                        <TableCell><TextBlack14pxRegular>Начальная (максимальная) цена договора: {a.lot.lotData?.initialSum} ₽</TextBlack14pxRegular></TableCell>
                                        <TableCell><TextBlack14pxRegular>{Object.values(a.lot.lotData?.lotItems?.lotItem?.okpd2 || {})}</TextBlack14pxRegular></TableCell>
                                        <TableCell>	<TextBlack14pxRegular>{Object.values(a.lot.lotData?.lotItems?.lotItem?.okved2 || {})}</TextBlack14pxRegular></TableCell>
                                    </TableRow>
                                    )
                                )
                            }
                            </tbody>
                        </Table>
                    </BorderedContainer>
                    <Documents tender={tender}/>
                    <JsonRenderer tenderID={tender.tender[0]?.registrationNumber} />
                </RightSideSection>
            </PageContainer>
           )
    } else return null
}