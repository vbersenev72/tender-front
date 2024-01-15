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
import { checkAuth } from "../../functions/CheckAuth.js";
import { showErrorMessage } from "../../functions/Message";
import { useNavigate } from "react-router-dom";

interface ITender {
    jsonData: any,
    auth: any,
    setAuth: any
}

export const TenderPreiewCard223: FC<ITender> = ({ jsonData, auth, setAuth }) => {

    const navigate = useNavigate()

    useEffect(() => {
        checkAuth().then((auth) => setAuth(auth))
    }, [])

    const formatDate = (originalDate: string) => {
        const parsedDate = parseISO(originalDate);
        return format(parsedDate, 'dd.MM.yyyy');
    };

    return (
        <Fragment>
            {jsonData !== null ? (
                <PrevContainer>
                    <FlexTextColumn style={{ width: '70%', borderRight: '1px solid #F2F2F2' }}>
                        <FlexTextRow style={{ width: '100%' }}>
                            <TextGray14pxRegular>Работа комиссии</TextGray14pxRegular>
                        </FlexTextRow>
                        <FlexTextRow style={{ width: '100%', paddingBottom: '5px', borderBottom: '1px solid #F2F2F2' }}>
                            <TextBlue16pxSemiBold style={{ width: '60%' }}>
                                223-ФЗ Электронный аукцион
                            </TextBlue16pxSemiBold>
                            {jsonData?.registrationNumber ? (
                                <Link onClick={() => {
                                    if (!auth) return showErrorMessage('Для доступа к карточке тендера необходимо авторизоваться');
                                    navigate(`/tender/${jsonData?.registrationNumber}`);
                                } } to={auth ? `/tender/${jsonData?.registrationNumber}` : ''}>
                                    <TextBlue16pxSemiBold style={{ width: '40%' }}>
                                        № {jsonData.registrationNumber}
                                    </TextBlue16pxSemiBold>
                                </Link>
                            ) : null}
                        </FlexTextRow>
                        <FlexTextColumn style={{ gap: '10px', marginTop: '10px', paddingRight: '10px' }}>
                            <FlexRow>
                                <div className="tenderProp">
                                    <TextGray14pxRegular style={{ marginRight: '20px' }}>Тип заявки</TextGray14pxRegular>
                                </div>
                                <div className="tenderData">
                                    <TextBlack14pxRegular>
                                        {jsonData?.purchaseCodeName
                                            ? '  ' + jsonData.purchaseCodeName
                                            : 'Нет данных'
                                        }
                                    </TextBlack14pxRegular>
                                </div>
                            </FlexRow>
                            <FlexRow>
                                <div className="tenderProp" >
                                    <TextGray14pxRegular style={{ marginRight: '20px' }}>Объём закупки</TextGray14pxRegular>
                                </div>
                                <div className="tenderData">
                                    <TextBlue14pxRegular>
                                        {jsonData?.name
                                            ? '  ' + jsonData.name
                                            : 'Нет данных'
                                        }
                                    </TextBlue14pxRegular>
                                </div>
                            </FlexRow>
                            <FlexRow>
                                <div className="tenderProp" >
                                    <TextGray14pxRegular style={{ marginRight: '20px' }}>Заказчик</TextGray14pxRegular>
                                </div>
                                <div className="tenderData">
                                    <TextBlack14pxRegular>
                                        {jsonData?.customer.mainInfo?.fullName
                                            ? '  ' + jsonData.customer.mainInfo.fullName
                                            : 'Нет данных'
                                        }
                                    </TextBlack14pxRegular>
                                </div>
                            </FlexRow>
                        </FlexTextColumn>
                    </FlexTextColumn>
                    <FlexTextColumn style={{ width: '30%', paddingLeft: '15px' }}>
                        <FlexTextRow style={{ width: '100%' }}>
                            <TextGray14pxRegular style={{ marginRight: '20px' }} >Начальная цена</TextGray14pxRegular>
                        </FlexTextRow>
                        <FlexTextRow style={{ width: '100%' }}>
                            <TextBlack22pxRegular>
                                {jsonData?.lots
                                    ? `${[jsonData.lots].flat().reduce((acc, curr) => acc + Number(curr.lot?.lotData?.initialSum) || 0, 0)} ₽`
                                    : 'Нет данных'
                                }
                            </TextBlack22pxRegular>
                        </FlexTextRow>
                        <FlexTextRow style={{ width: '30%', justifyContent: 'space-between', marginRight: '20px' }}>
                            <TextGray14pxRegular>Регион</TextGray14pxRegular>
                            <TextBlack14pxRegular>{jsonData.customer?.mainInfo?.region}</TextBlack14pxRegular>
                        </FlexTextRow>
                        <FlexTextRow>
                            <FlexTextColumn>
                                <TextGray14pxRegular style={{ marginRight: '20px' }}>Дата начала</TextGray14pxRegular>
                                <TextBlack14pxRegular>
                                    {jsonData?.applSubmisionStartDate
                                        ? jsonData.publicationDateTime
                                        : 'Нет данных'
                                    }
                                </TextBlack14pxRegular>
                            </FlexTextColumn>
                            <FlexTextColumn>
                                <TextGray14pxRegular style={{ marginRight: '20px' }}>Дата окончания</TextGray14pxRegular>
                                <TextBlack14pxRegular>
                                    {jsonData?.submissionCloseDateTime
                                        ? jsonData.submissionCloseDateTime
                                        : 'Нет данных'
                                    }
                                </TextBlack14pxRegular>
                            </FlexTextColumn>
                        </FlexTextRow>
                        <FlexTextRow>
                            <FlexTextColumn>
                                <TextGray14pxRegular style={{ marginRight: '20px' }}>Дата публикации</TextGray14pxRegular>
                                <TextBlack14pxRegular>
                                    {jsonData?.publicationDateTime
                                        ? formatDate(jsonData.publicationDateTime)
                                        : 'Нет данных'
                                    }
                                </TextBlack14pxRegular>
                            </FlexTextColumn>
                        </FlexTextRow>
                    </FlexTextColumn>
                </PrevContainer>
            ) : null}
        </Fragment>
    );
}