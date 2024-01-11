import {BorderedContainer, Table, TableCell, TableRow} from "../../../../styles";
import {TextBlack14pxBold, TextBlack14pxRegular, TextBlack22pxBold, TextGray11pxRegular} from "../../../../constants/fonts";
import {FlexTextColumn} from "../../../../containers/containers";
import {formatDate} from "../../../../functions/FormateDate";

const codesFinal = ['ИЭОК1', 'ЦПА1']
export const TenderResults = ({tender}) => {

   const protocolFinal = tender.protocol?.length > 1 ? tender.protocol.find((p) => codesFinal.includes(p.commonInfo?.docNumber)) : tender.protocol[0]
    console.log(protocolFinal)

    return(
        <BorderedContainer>
            <TextBlack22pxBold>Результат определения поставщика (подрядчика, исполнителя), сформированный на основании размещенных протоколов</TextBlack22pxBold>
            <FlexTextColumn>
                <TextGray11pxRegular> Наименование протокола определения поставщика (подрядчика, исполнителя)</TextGray11pxRegular>
                <TextBlack14pxBold> Протокол подведения итогов определения поставщика (подрядчика, исполнителя) от
                    {formatDate(tender.result[0].createDate)}
                    № {tender.result[0].foundationProtocolNumber}
                </TextBlack14pxBold>
            </FlexTextColumn>
            <Table>
                <thead>
                <TableRow>
                    <TableCell><TextGray11pxRegular>Заказчик(и), с которыми планируется заключить контракт</TextGray11pxRegular></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><TextBlack14pxRegular>{tender.tender[0].purchaseResponsibleInfo?.responsibleOrgInfo?.fullName}</TextBlack14pxRegular></TableCell>
                </TableRow>
                </thead>
                <tbody>
                <TableRow>
                    <TableCell><TextGray11pxRegular> Участники, с которыми планируется заключить контракт </TextGray11pxRegular></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell><TextGray11pxRegular>ИДЕНТИФИКАЦИОННЫЕ НОМЕРА УЧАСТНИКОВ, С КОТОРЫМИ ПЛАНИРУЕТСЯ ЗАКЛЮЧИТЬ КОНТРАКТ</TextGray11pxRegular></TableCell>
                    <TableCell><TextGray11pxRegular>ПОРЯДКОВЫЕ НОМЕРА, ПОЛУЧЕННЫЕ ПО РЕЗУЛЬТАТАМ РАССМОТРЕНИЯ ЗАЯВОК</TextGray11pxRegular></TableCell>
                    <TableCell><TextGray11pxRegular>ПРЕДЛОЖЕНИЯ УЧАСТНИКОВ, ₽</TextGray11pxRegular></TableCell>
                </TableRow>
                { protocolFinal ? [protocolFinal.protocolInfo?.applicationsInfo?.applicationInfo].flat().map(app =>
                        <TableRow>
                            <TableCell><TextBlack14pxRegular>{app.commonInfo?.appNumber}</TextBlack14pxRegular></TableCell>
                            <TableCell><TextBlack14pxRegular>{app.admittedInfo?.appAdmittedInfo?.appRating === '1' ? '1 - Победитель' : `${app.admittedInfo?.appAdmittedInfo?.appRating} номер` }</TextBlack14pxRegular></TableCell>
                            <TableCell><TextBlack14pxRegular>{
                                app.admittedInfo?.appAdmittedInfo?.conditionsScoringInfo?.conditionScoringInfo[0]?.costCriterionInfo?.offer ||
                                app.admittedInfo?.appAdmittedInfo?.appRating === '1' ? app.finalPrice : 'Нет данных'}</TextBlack14pxRegular></TableCell>
                        </TableRow>
                ) : null }
                </tbody>
            </Table>
            { protocolFinal?.abandonedReason ? (
             <FlexTextColumn>
                <TextGray11pxRegular> Основание признания торгов несостоявшимися </TextGray11pxRegular>
                <TextBlack14pxRegular> { protocolFinal.abandonedReason.name } </TextBlack14pxRegular>
            </FlexTextColumn>
            ) : null}

            <FlexTextColumn>
                <TextGray11pxRegular> Дата и время формирования результатов определения постаыщика (подрядчика, исполнителя) </TextGray11pxRegular>
                <TextBlack14pxRegular> { new Date(tender.result[0].createDate).toLocaleString()} </TextBlack14pxRegular>
            </FlexTextColumn>

        </BorderedContainer>)
}