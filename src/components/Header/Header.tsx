import {FC} from 'react';
import {CompanyName, HeaderContainer} from "./styles";
import {ReactComponent as TenderLogo} from '../../assets/icons/TENDER.svg';
import {FlexRow} from "../../containers/containers";
import {TextWhite14pxRegular} from "../../constants/fonts";

export const Header: FC = () => {
    return(
        <HeaderContainer>
            <TenderLogo />
            <FlexRow>
                <CompanyName>
                    <TextWhite14pxRegular>Название компании</TextWhite14pxRegular>
                </CompanyName>
            </FlexRow>
        </HeaderContainer>
    );
}