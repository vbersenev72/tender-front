import styled from "styled-components";
import {TextBlue14pxRegular} from "./constants/fonts";

export const PageContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #F4F6F9;
  height: 100vh;
  padding: 20px;
  padding-left: 7%;
  gap: 20px;
`;
export const LeftSideSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 30%;
  gap: 20px;
`;
export const RightSideSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 70%;
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
  font-family: 'Open-Sans', sans-serif;
  font-size: 14px;
  font-weight: 400;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  text-align: left; //need to right
  padding: 8px;
`;

export const LoaderTest = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const OrderedList = styled.ol`
  /* убираем стандартную нумерацию */
  list-style: none;
  /* Идентифицируем счетчик и даем ему имя li. Значение счетчика не указано - по умолчанию оно равно 0 */
  counter-reset: li;
`;

export const ListItem =
  styled.li`
  /* Определяем элемент, который будет нумероваться — li. Псевдоэлемент before указывает, что содержимое, вставляемое при помощи свойства content, будет располагаться перед пунктами списка. Здесь же устанавливается значение приращения счетчика (по умолчанию равно 1). */
   counter-increment: li;
   /* С помощью свойства content выводится номер пункта списка. counters() означает, что генерируемый текст представляет собой значения всех счетчиков с таким именем. Точка в кавычках добавляет разделяющую точку между цифрами, а точка с пробелом добавляется перед содержимым каждого пункта списка */
   content: counters(li, ".") ". ";
 `;
