import {BorderedContainer, LeftSideSection, PageContainer} from "../../../../styles";
import {FlexRow, FlexTextColumn, FlexTextRow} from "../../../../containers/containers";
import {
    TextBlack11pxRegular,
    TextBlack14pxRegular, TextBlue16pxSemiBold,
    TextGray11pxRegular,
    TextGray14pxRegular
} from "../../../../constants/fonts";
import {LeftSideSection35, RightSideSection65} from "../../../FZ44/Tender/CriterialInfo/styles";
import {Link} from "react-router-dom";


export const Documents = ({tender}) => {

    const protocols = tender.purchaseProtocol.sort((a, b) => +a.version - +b.version)
    const docs = tender.tender.sort((a, b) => +a.version - +b.version)
        console.log(protocols)
    return (
        <>
            <BorderedContainer>
                <TextBlack14pxRegular> Документация по закупке </TextBlack14pxRegular>
                { docs.map((doc,index) => index === 0 ? (
                    <FlexRow>
                        <FlexTextColumn>
                            <TextBlack11pxRegular> Извещение о закупке № {doc.registrationNumber} (Версия №{doc.registrationNumber}) </TextBlack11pxRegular>
                            <FlexRow>
                                <FlexTextColumn>
                                    <TextGray11pxRegular>Размещено</TextGray11pxRegular>
                                    <TextBlack14pxRegular>{doc.publicationDateTime}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray11pxRegular>Редакция</TextGray11pxRegular>
                                    <TextBlack14pxRegular> Действующая </TextBlack14pxRegular>
                                </FlexTextColumn>
                            </FlexRow>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray11pxRegular>Прикрепленные файлы</TextGray11pxRegular>
                            {
                                [doc.attachments.document].flat().map((doc) => (
                                <a href={doc.url}>
                                    <TextBlack11pxRegular >
                                        {doc.fileName}
                                    </TextBlack11pxRegular>
                                </a>
                                ))
                            }
                         </FlexTextColumn>
                        </FlexRow>
                ) : (
                    <FlexRow>
                                <FlexTextColumn>
                                    <TextGray11pxRegular> Извещение о закупке № {doc.registrationNumber} (Версия №{doc.registrationNumber}) </TextGray11pxRegular>
                                    <FlexRow>
                                        <FlexTextColumn>
                                            <TextGray11pxRegular>Размещено</TextGray11pxRegular>
                                            <TextGray14pxRegular>{doc.publicationDateTime}</TextGray14pxRegular>
                                        </FlexTextColumn>
                                        <FlexTextColumn>
                                            <TextGray11pxRegular>Редакция</TextGray11pxRegular>
                                            <TextGray14pxRegular>Недействующая </TextGray14pxRegular>
                                        </FlexTextColumn>
                                    </FlexRow>
                                </FlexTextColumn>

                                <FlexTextColumn>
                                    <TextGray11pxRegular>Прикрепленные файлы</TextGray11pxRegular>
                                    {
                                        [doc.attachments.document].flat().map((doc) => (
                                            <a href={doc.uri}>
                                                <TextBlack11pxRegular >
                                                    {doc.fileName}
                                                </TextBlack11pxRegular>
                                            </a>
                                        ))
                                    }
                                </FlexTextColumn>
                    </FlexRow>
                ))}
            </BorderedContainer>
            <BorderedContainer>
                <TextBlack14pxRegular> Протоколы работы комиссии </TextBlack14pxRegular>
                { protocols.map((doc,index) => index === 0 ? (
                    <FlexRow>
                        <FlexTextColumn>
                            <TextBlack11pxRegular> Иной протокол № {doc.registrationNumber} </TextBlack11pxRegular>
                            <FlexRow>
                                <FlexTextColumn>
                                    <TextGray11pxRegular>Размещено</TextGray11pxRegular>
                                    <TextBlack14pxRegular>{doc.publicationDateTime}</TextBlack14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray11pxRegular>Редакция</TextGray11pxRegular>
                                    <TextBlack14pxRegular> Действующая </TextBlack14pxRegular>
                                </FlexTextColumn>
                            </FlexRow>
                        </FlexTextColumn>
                        <FlexTextColumn>
                            <TextGray11pxRegular>Прикрепленные файлы</TextGray11pxRegular>
                            {
                                [doc.attachments.document].flat().map((doc) => (
                                    <a href={doc.url}>
                                        <TextBlack11pxRegular >
                                            {doc.fileName}
                                        </TextBlack11pxRegular>
                                    </a>
                                ))
                            }
                        </FlexTextColumn>
                    </FlexRow>
                ) : (
                    <FlexRow>
                        <FlexTextColumn>
                            <TextBlack11pxRegular> Иной протокол № {doc.registrationNumber} </TextBlack11pxRegular>
                            <FlexRow>
                                <FlexTextColumn>
                                    <TextGray11pxRegular>Размещено</TextGray11pxRegular>
                                    <TextGray14pxRegular>{doc.publicationDateTime}</TextGray14pxRegular>
                                </FlexTextColumn>
                                <FlexTextColumn>
                                    <TextGray11pxRegular>Редакция</TextGray11pxRegular>
                                    <TextGray14pxRegular>Недействующая </TextGray14pxRegular>
                                </FlexTextColumn>
                            </FlexRow>
                        </FlexTextColumn>

                        <FlexTextColumn>
                            <TextGray11pxRegular>Прикрепленные файлы</TextGray11pxRegular>
                            {
                                [doc.attachments.document].flat().map((doc) => (
                                    <a href={doc.uri}>
                                        <TextBlack11pxRegular >
                                            {doc.fileName}
                                        </TextBlack11pxRegular>
                                    </a>
                                ))
                            }
                        </FlexTextColumn>
                    </FlexRow>
                ))}
            </BorderedContainer>
        </>
    )
}