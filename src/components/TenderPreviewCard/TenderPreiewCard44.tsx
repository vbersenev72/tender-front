import {FC, Fragment} from "react";
import {PrevContainer} from "./styles";
import {FlexRow, FlexTextColumn, FlexTextRow} from "../../containers/containers";
import {
    TextBlack14pxRegular,
    TextBlack22pxBold, TextBlack22pxRegular, TextBlue14pxRegular,
    TextBlue16pxSemiBold,
    TextGray14pxRegular
} from "../../constants/fonts";
import {ReactComponent as RubleIcon} from '../../assets/icons/ruble.svg'
import { format, parseISO } from 'date-fns';
import { Link } from "react-router-dom";

interface ITender {
    jsonData: any,
}

export const TenderPreiewCard44: FC<ITender> = ({jsonData}) => {

    const formatDate = (originalDate: string) => {
        const parsedDate = parseISO(originalDate);
        return format(parsedDate, 'dd.MM.yyyy');
    };

    return (
        <Fragment>
            {jsonData !== null ? (
            <PrevContainer>
                <FlexTextColumn style={{width: '70%', borderRight: '1px solid #F2F2F2'}}>
                    <FlexTextRow style={{width: '100%'}}>
                        <TextGray14pxRegular>Работа комиссии</TextGray14pxRegular>
                    </FlexTextRow>
                    <FlexTextRow style={{width: '100%', paddingBottom: '5px', borderBottom: '1px solid #F2F2F2'}}>
                        <TextBlue16pxSemiBold style={{width: '60%'}}>
                            {jsonData?.commonInfo?.placingWay?.code && jsonData?.commonInfo?.placingWay?.name
                                ? `${jsonData.commonInfo.placingWay.code} ${jsonData.commonInfo.placingWay.name}`
                                : 'Нет данных'}
                        </TextBlue16pxSemiBold>
                        {jsonData?.commonInfo?.purchaseNumber && (
                            <Link to={`/tender/${jsonData?.commonInfo?.purchaseNumber}`}>
                                <TextBlue16pxSemiBold style={{width: '40%'}}>
                                    № {jsonData.commonInfo.purchaseNumber}
                                </TextBlue16pxSemiBold>
                            </Link>
                        )}
                    </FlexTextRow>
                    <FlexTextColumn style={{gap: '10px', marginTop: '10px', paddingRight: '10px'}}>
                        <FlexRow>
                            <TextGray14pxRegular>Тип заявки</TextGray14pxRegular>
                            <TextBlack14pxRegular>
                                {jsonData?.commonInfo.purchaseObjectInfo
                                    ? jsonData.commonInfo.purchaseObjectInfo
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
                <FlexTextColumn style={{width: '30%', paddingLeft: '15px'}}>
                    <FlexTextRow style={{width: '100%'}}>
                        <TextGray14pxRegular >Начальная цена</TextGray14pxRegular>
                    </FlexTextRow>
                    <FlexTextRow style={{width: '100%'}}>
                        <TextBlack22pxRegular>
                            {jsonData?.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice
                                ? `${jsonData.notificationInfo.contractConditionsInfo.maxPriceInfo.maxPrice} ₽`
                                : 'Нет данных'
                            }
                        </TextBlack22pxRegular>
                    </FlexTextRow>
                    <FlexTextRow style={{width: '30%', justifyContent: 'space-between'}}>
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
            ) : null }
        </Fragment>
);
}