import styled from "styled-components";
import { TextBlue14pxRegular } from "../../../../constants/fonts";

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #F4F6F9;
  height: 100vh;
  padding: 20px;
  padding-left: 7%;
  gap: 20px;
`;
export const LeftSideSection35 = styled.section`
  display: flex;
  flex-direction: column;
  width: 35%;
  gap: 20px;
`;
export const RightSideSection65 = styled.section`
  display: flex;
  flex-direction: column;
  width: 65%;
  gap: 20px;
`;
export const BorderedContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 25px;
  gap: 10px;
  background-color: white;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;
export const BorderOpeningContainer = styled(BorderedContainer)`

`;
export const BorderFitContaienr = styled(BorderedContainer)`
  padding: 0px;
`;
export const Atext14pxBlue = styled(TextBlue14pxRegular)`
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableRow = styled.tr`
  //&:nth-child(even) {
  //  background-color: #f2f2f2;
  //}
`;

export const TableCell = styled.td`
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  text-align: left; //need to right
  padding: 8px;
`;