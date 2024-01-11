import {FC, Fragment} from "react";
import {TextBlack14pxBold, TextGray11pxRegular, TextGray14pxRegular} from "../../../../constants/fonts";
import {FlexTextColumn, FlexTextRow} from "../../../../containers/containers";
import {TableCell, TableRow} from "../CriterialInfo/styles";
import {Table} from "../../../../styles";


interface IZakupkiCharacteristics {
    data?: any
    extradata?: any
}

export  const ZakupkiCharacteristics: FC<IZakupkiCharacteristics> = ({data, extradata}) => {
if (data && extradata)
     {
         return (
             <>
                      <FlexTextRow>
                             <TextGray11pxRegular style={{width: '70%'}}>{extradata.name}</TextGray11pxRegular>
                             <TextGray11pxRegular>{extradata.quantity}</TextGray11pxRegular>
                      </FlexTextRow>
                          <Table>
                              <tbody>
                              <TableRow>
                                  <TableCell style={{width: '30%'}}> <TextGray14pxRegular>НАИМЕНОВАНИЕ ХАРАКТЕРИСТИКИ </TextGray14pxRegular></TableCell>
                                  <TableCell><TextGray14pxRegular>ЗНАЧЕНИЕ ХАРАКТЕРИСТИКИ</TextGray14pxRegular></TableCell>
                                  <TableCell><TextGray14pxRegular>ЕДИНИЦА ИЗМЕРЕНИЯ ХАРАКТЕРИСТИКИ</TextGray14pxRegular></TableCell>
                                  <TableCell><TextGray14pxRegular>ИНСТРУКЦИЯ ПО ЗАПОЛНЕНИЮ ХАРАКТЕРИСТИК В ЗАЯВКЕ</TextGray14pxRegular></TableCell>
                              </TableRow>
                              {
                                  [data].flat().map((one) =>
                                           (
                                              <TableRow>
                                                  <TableCell> <TextGray14pxRegular>{one.name}</TextGray14pxRegular></TableCell>
                                                  <TableCell><TextGray14pxRegular>{one.values?.value?.rangeSet?.valueRange?.minMathNotation ? "≥" : ""}  {one.values?.value?.rangeSet?.valueRange?.min}</TextGray14pxRegular></TableCell>
                                                  <TableCell><TextGray14pxRegular>{one.values?.value?.OKEI?.name}</TextGray14pxRegular></TableCell>
                                                  <TableCell><TextGray14pxRegular>{one.characteristicsFillingInstruction?.name}</TextGray14pxRegular></TableCell>
                                              </TableRow>
                                          )
                                  )
                              }
                              </tbody>
                          </Table>
                </>
              )
         } else return null
     }