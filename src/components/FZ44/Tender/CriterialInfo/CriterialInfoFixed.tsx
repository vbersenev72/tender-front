import {BorderedContainer} from "../../../../styles";
import {TextBlack14pxBold, TextBlack14pxRegular, TextGray14pxRegular} from "../../../../constants/fonts";
import {FlexTextColumn, FlexTextRow} from "../../../../containers/containers";
import {FC, Fragment, useEffect, useState} from "react";
import {Table, TableCell, TableRow} from "./styles";
import {ReactComponent as Arrow} from "../../../../assets/icons/arrow.svg";

interface Criterion {
    name: string;
    value: string;
    indicators?: Indicator[];
}

interface Indicator {
    details: Detail[];
    purchaseObjectCharsInfo: PurchaseObjectCharsInfo;
    addInfo?: string;
}

interface Detail {
    name: string | undefined;
    value: string;
}

interface PurchaseObjectCharsInfo {
    name: string;
    code: string
}

export const CriterialInfoFixed: FC<{ criterias: any[] }> = ({ criterias }) => {

    const critData = criterias.map((crit: Criterion) => {
        if (Object.keys(crit)[0] === 'costCriterionInfo') {
            const value = Object.values(crit)[0].valueInfo.value;
            return {
                name: "Цена контракта, сумма цен единиц товара, работы, услуги",
                value: value,
            };
        } else if (Object.keys(crit)[0] === 'qualitativeCriterionInfo') {
            const { code, valueInfo, indicatorsInfo } = Object.values(crit)[0];

            let name = '';
            switch (code) {
                case 'QF':
                {
                    name = "Качественные, функциональные и экологические характеристики объекта закупки";
                    break;
                }
                case 'QO':
                {
                    name = `Квалификация участников закупки, в том числе наличие у них финансовых ресурсов,
            на праве собственности или ином законном основании оборудования и других материальных ресурсов,
            опыта работы, связанного с предметом контракта, и деловой репутации, специалистов и иных работников определенного уровня квалификации`;
                    break;
                }
            }

            const { indicatorInfo } = indicatorsInfo;

            const indicators: Indicator[] = [indicatorInfo].flat().map((one) => {
                const { detailIndicatorsInfo, purchaseObjectCharsInfo, addInfo } = one;
                const details: Detail[] = [detailIndicatorsInfo].flat().map((one) => {
                    return [one.detailIndicatorInfo].flat().map((one) => {
                        const { value, indicatorInfo } = one;
                        const { manualEnteredName, indicatorDictInfo, orderEvalIndicatorsInfo } = indicatorInfo;
                        const name = manualEnteredName || indicatorDictInfo?.name;
                        return {
                            name,
                            value,
                        };
                    });
                }).flat();
                return {
                    details,
                    purchaseObjectCharsInfo,
                    addInfo,
                };
            });

            const { value } = valueInfo;
            return {
                name,
                value,
                indicators,
            };
        }
    })

    const [isSecondContainerVisible, setSecondContainerVisible] = useState(false);
    const [isThirdContainerVisible, setThirdContainerVisible] = useState(false);
    const handleClick2 = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setSecondContainerVisible(!isSecondContainerVisible);
    };
    const handleClick3 = () => {
        // Изменяем состояние для показа/скрытия второго контейнера
        setThirdContainerVisible(!isThirdContainerVisible);
    };


    return (
        <BorderedContainer>
            <TextBlack14pxBold>Критерии оценки заявок участиков</TextBlack14pxBold>
            <Table>
                <TableRow>
                    <TableCell style={{width: '70%'}}> <TextGray14pxRegular>Наименование критерия </TextGray14pxRegular></TableCell>
                    <TableCell><TextGray14pxRegular>Значимость критерия, %</TextGray14pxRegular></TableCell>
                </TableRow>
                <TableRow style={{width: '100%'}}>
                    <TableCell style={{borderTop: 'none'}}><TextBlack14pxRegular>{critData[0]?.name}</TextBlack14pxRegular></TableCell>
                    <TableCell style={{borderTop: 'none'}}><TextBlack14pxRegular>{critData[0]?.value}</TextBlack14pxRegular></TableCell>
                </TableRow>
                {critData?.slice(0).map((crit, index) => (
                    index !== 0 && (
                    <Fragment>
                            <TableRow style={{width: '100%'}}>
                                <TableCell style={{borderTop: 'none'}}>
                                    <FlexTextRow>
                                        <div
                                            id="arrow"
                                            onClick={handleClick2}
                                            style={{ transform: isSecondContainerVisible ? 'rotate(0deg)' : 'rotate(270deg)' , marginRight: '5%'}}
                                        >
                                            <Arrow />
                                        </div>
                                        <TextBlack14pxRegular>{crit?.name}</TextBlack14pxRegular>
                                    </FlexTextRow>
                                </TableCell>
                                <TableCell style={{borderTop: 'none'}}><TextBlack14pxRegular>{crit?.value}</TextBlack14pxRegular></TableCell>
                            </TableRow>
                            <TableRow>
                        {isSecondContainerVisible ? (
                            <Table style={{marginLeft: '7%', width: '136%'}}>
                        <TableRow>
                            <TableCell style={{width: '70%', borderTop: 'none'}}> <TextGray14pxRegular>Показатели критерия оценки заявок</TextGray14pxRegular></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{width: '50%'}}> <TextGray14pxRegular>Наименование критерия </TextGray14pxRegular></TableCell>
                            <TableCell style={{width: '20%'}}><TextGray14pxRegular>Значимость критерия, %</TextGray14pxRegular></TableCell>
                            <TableCell style={{width: '20%'}}><TextGray14pxRegular>ДОПОЛНИТЕЛЬНАЯ
                                ИНФОРМАЦИЯ О СОДЕРЖАНИИ
                                И ПОРЯДКЕ ОЦЕНКИ ПО ПОКАЗАТЕЛЮ</TextGray14pxRegular></TableCell>
                        </TableRow>
                        {crit?.indicators?.map((indicator, item) => (
                            <>
                                {indicator?.details?.map((detail, detailIndex) => (
                                    <Fragment>
                                        <TableRow>
                                            <TableCell>
                                                <FlexTextRow>
                                                    <div
                                                        id="arrow"
                                                        onClick={handleClick3}
                                                        style={{ transform: isThirdContainerVisible ? 'rotate(0deg)' : 'rotate(270deg)' , marginRight: '5%'}}
                                                    >
                                                        <Arrow />
                                                    </div>
                                                    <TextBlack14pxRegular style={{width: '80%'}}>{indicator?.purchaseObjectCharsInfo?.name}</TextBlack14pxRegular>
                                                </FlexTextRow>
                                            </TableCell>
                                            <TableCell><TextBlack14pxRegular style={{width: '35%'}}>{detail.value}</TextBlack14pxRegular></TableCell>
                                            <TableCell>
                                                {/*<FlexTextColumn style={{width: '35%'}}>*/}
                                                {/*    <TextGray14pxRegular style={{width: '35%'}}>Mock Row</TextGray14pxRegular>*/}
                                                {/*    <TextGray14pxRegular style={{width: '35%'}}>Mock Row</TextGray14pxRegular>*/}
                                                {/*    <TextGray14pxRegular style={{width: '35%'}}>Mock Row</TextGray14pxRegular>*/}
                                                {/*</FlexTextColumn>*/}
                                            </TableCell>
                                        </TableRow>
                                        {isThirdContainerVisible ? (
                                            <Table style={{marginLeft: '7%', width: '143%'}}>
                                                <TableRow>
                                                    <TableCell style={{width: '70%', borderTop: 'none'}}><TextGray14pxRegular>Детализирующие показатели</TextGray14pxRegular></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{width: '50%'}}><TextGray14pxRegular>НАИМЕНОВАНИЕ ДЕТАЛИЗИРУЮЩЕГО ПОКАЗАТЕЛЯ</TextGray14pxRegular></TableCell>
                                                    <TableCell style={{width: '20%'}}><TextGray14pxRegular>ЗНАЧИМОСТЬ ДЕТАЛИЗИРУЮЩЕГО ПОКАЗАТЕЛЯ, %</TextGray14pxRegular></TableCell>
                                                    <TableCell style={{width: '30%'}}><TextGray14pxRegular>ПОРЯДОК ОЦЕНКИ ПО ПОКАЗАТЕЛЮ</TextGray14pxRegular></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell style={{width: '50%'}}><TextBlack14pxRegular>{detail.name}</TextBlack14pxRegular></TableCell>
                                                    <TableCell style={{width: '20%'}}><TextBlack14pxRegular>{detail.value}</TextBlack14pxRegular></TableCell>
                                                    <TableCell style={{width: '20%'}}><TextBlack14pxRegular></TextBlack14pxRegular></TableCell>
                                                </TableRow>
                                            </Table>
                                        ) : null }
                                    </Fragment>
                                ))}
                            </>
                        ))}
                    </Table>
                    ) : null}
                </TableRow>
                </Fragment>
                )))}
            </Table>
        </BorderedContainer>
    );
};
