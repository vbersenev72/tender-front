import * as React from 'react';
import { LoaderTest } from '../../styles';
import { TailSpin } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { showErrorMessage, showSuccesMessage } from '../../functions/Message';
import { TextBlack22pxRegular } from '../../constants/fonts';
import './MyTendersPage.css'
import { SiMicrosoftexcel } from "react-icons/si";
import { RiFileExcel2Line } from "react-icons/ri";
import { MyTendersList } from '../../components/MyTendersComponents/MyTendersList/MyTendersList';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { TenderPreiewCard223, TenderPreiewCard44 } from '../../components/TenderPreviewCard';
import { createReport } from '../../functions/createReport';
import { createReportMyTender } from '../../functions/createReportMyTenders';
import { PaginationBlock } from '../../components/PaginationBlock/PaginationBlock';


export interface IMyTendersPageProps {
}

export function MyTendersPage(props: any) {

  const [loading, setLoading] = useState(false)

  const [showAll, setShowAll] = useState(true)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showFinished, setShowFinished] = useState(false)

  const [showPeriod, setShowPeriod] = useState(false)
  const [startPeriod, setStartPeriod] = useState(new Date())
  const [endPeriod, setEndPeriod] = useState(new Date())

  const [currentPage, setCurrentPage] = useState<any>(1)
  const [countShowElements, setCountShowElements] = useState(10)

  const [tenders, setTenders] = useState<any>([])
  const [beforeTenders, setBeforeTenders] = useState<any>([])
  const [myTendersList, setMyTendersList] = useState<any>([])

  // sort by
  const [sortByDateAdded, setSortByDateAdded] = useState(true)
  const [sortByDateStart, setSortByDateStart] = useState(false)
  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortByDateFinished, setSortByDateFinished] = useState(false)
  const [sortByDatePublic, setSortByDatePublic] = useState(false)

  const [getTagForRegNumList, setGetTagForRegNumList] = useState<any>([])

  const getMyTenders = async () => {
    try {
      setLoading(true)

      const page = currentPage

      const token = localStorage.getItem('token')

      const response = await axios.get(`${process.env.REACT_APP_API}/api/lk/mytenders/${page}?limit=${countShowElements}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      const tenders: any = response.data.message
      console.log(tenders);


      setTenders(tenders)
      setMyTendersList(tenders)

      const allTenders = []

      for (let i = 0; i < tenders.length; i++) {
        const tenderInfo = tenders[i];

        const response = await axios.get(`${process.env.REACT_APP_API}/api/find/${tenderInfo.reg_num}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        console.log(response.data);

        const tender = response.data.message.tender[0]
        allTenders.push(tender)

      }

      setTenders([...allTenders])
      setBeforeTenders([...allTenders])

      setLoading(false)
    } catch (error) {
      console.log(error);

      showErrorMessage('Что то пошло не так, попробуйте позже!')
    }
  }

  const handlePageChange = async (newPage: number) => {
    console.log(newPage);

    setCurrentPage(newPage)
    console.log(currentPage);

  };


  const showAllTenders = () => {
    setTenders(beforeTenders)
  }

  const showCurrentTenders = () => {
    const newTendersArray = beforeTenders.map((tender: any) => {

      if (tender.fz == 'fz223') {
        if (!tender.applSubmisionStartDate) {
          return
        }
        if (new Date(tender.applSubmisionStartDate).getTime() > new Date().getTime()) {
          return tender
        }
      }

      if (tender.fz == 'fz44') {
        if (!tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT) {
          return
        }
        if (new Date(tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT).getTime() > new Date().getTime()) {

          return tender
        }
      }

    })

    setTenders(newTendersArray)
  }

  const showFinishedTenders = () => {
    const newTendersArray = beforeTenders.map((tender: any) => {

      if (tender.fz == 'fz223') {
        if (!tender.applSubmisionStartDate) {
          return
        }
        if (new Date(tender.applSubmisionStartDate).getTime() < new Date().getTime()) {
          return tender
        }
      }

      if (tender.fz == 'fz44') {
        if (!tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT) {
          return
        }
        if (new Date(tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT).getTime() < new Date().getTime()) {

          return tender
        }
      }

    })

    setTenders(newTendersArray)
  }

  const showPeriodTenders = () => {
    const newTendersArray = beforeTenders.map((tender: any) => {

      if (tender.fz == 'fz223') {
        if (!tender.applSubmisionStartDate) {
          return
        }
        if (new Date(tender.applSubmisionStartDate).getTime() > startPeriod.getTime() && new Date(tender.applSubmisionStartDate).getTime() < endPeriod.getTime()) {
          return tender
        }
      }

      if (tender.fz == 'fz44') {
        if (!tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT) {
          return
        }
        if (new Date(tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT).getTime() > startPeriod.getTime() && new Date(tender.notificationInfo?.procedureInfo?.collectingInfo?.endDT).getTime() < endPeriod.getTime()) {

          return tender
        }
      }

    })

    setTenders(newTendersArray)
  }

  const sortByPriceTenders = () => {

    const newTendersArray = beforeTenders.sort((a: any, b: any) => {
      console.log(a);

      if (a.fz == 'fz223') {
        const aPrice = a.lots?.lot?.lotData?.initialSum
        const bPrice = b.fz == 'fz223' ? b.lots?.lot?.lotData?.initialSum : b.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice

        return parseFloat(aPrice) - parseFloat(bPrice)
      } else {
        const aPrice = a.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice
        const bPrice = b.fz == 'fz223' ? b.lots?.lot?.lotData?.initialSum : b.notificationInfo?.contractConditionsInfo?.maxPriceInfo?.maxPrice

        return parseFloat(aPrice) - parseFloat(bPrice)
      }
    })

    if (sortByPrice) {
      const reverseTenders = tenders.reverse()
      setTenders([...reverseTenders])
    } else {
      setTenders([...newTendersArray])
    }

  }

  const sortByDateAddedTenders = () => {

    let mergedArray = beforeTenders.map((obj2: any) => {
      const matchingObj = myTendersList.find((obj1: any) => obj1.reg_num === obj2?.commonInfo?.purchaseNumber || obj1.reg_num === obj2?.registrationNumber);
      return { ...obj2, dateAdded: matchingObj?.createdAt };
    });

    mergedArray.sort((a: any, b: any) => {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });

    console.log(mergedArray);


    setTenders(mergedArray)

  }

  const sortByDateStartTenders = () => {

    const newTendersArray = beforeTenders.sort((a: any, b: any) => {
      console.log(a);

      if (a.fz == 'fz223') {
        const aDate = a?.modificationDate
        const bDate = b.fz == 'fz223' ? b?.modificationDate : b?.customDate

        return new Date(bDate).getTime() - new Date(aDate).getTime()
      } else {
        const aDate = a?.customDate
        const bDate = b.fz == 'fz223' ? b?.modificationDate : b?.customDate

        return new Date(bDate).getTime() - new Date(aDate).getTime()
      }
    })

    if (sortByDateStart) {
      const reverseTenders = tenders.reverse()
      setTenders([...reverseTenders])
    } else {
      setTenders([...newTendersArray])
    }

  }

  const sortByDateFinishedTenders = () => {
    const newTendersArray = beforeTenders.sort((a: any, b: any) => {
      console.log(a);

      if (a.fz == 'fz223') {
        const aDate = a?.submissionCloseDateTime
        const bDate = b.fz == 'fz223' ? b?.submissionCloseDateTime : b?.notificationInfo?.procedureInfo?.collectingInfo?.endDT

        return new Date(bDate).getTime() - new Date(aDate).getTime()
      } else {
        const aDate = a?.notificationInfo?.procedureInfo?.collectingInfo?.endDT
        const bDate = b.fz == 'fz223' ? b?.submissionCloseDateTime : b?.notificationInfo?.procedureInfo?.collectingInfo?.endDT

        return new Date(bDate).getTime() - new Date(aDate).getTime()
      }
    })

    if (sortByDateFinished) {
      const reverseTenders = tenders.reverse()
      setTenders([...reverseTenders])
    } else {
      setTenders([...newTendersArray])
    }

  }

  const sortByDatePublicTenders = () => {

    const newTendersArray = beforeTenders.sort((a: any, b: any) => {
      console.log(a);

      if (a.fz == 'fz223') {
        const aDate = a?.publicationDateTime
        const bDate = b.fz == 'fz223' ? b?.publicationDateTime : b?.commonInfo?.publishDTInEIS

        return new Date(bDate).getTime() - new Date(aDate).getTime()
      } else {
        const aDate = a?.commonInfo?.publishDTInEIS
        const bDate = b.fz == 'fz223' ? b?.publicationDateTime : b?.commonInfo?.publishDTInEIS


        return new Date(bDate).getTime() - new Date(aDate).getTime()
      }
    })

    if (sortByDatePublic) {
      const reverseTenders = tenders.reverse()
      setTenders([...reverseTenders])
    } else {
      setTenders([...newTendersArray])
    }


  }



  useEffect(() => {
    getMyTenders()
    sortByDateAddedTenders()

  }, [currentPage, setCurrentPage, countShowElements])



  return (
    <div>
      <div className='Mytenders-container'>

        <div className='Mytenders-content'>
          <div className="Mytenders-preview">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', width: 'fit-content' }}><p>Мои тендеры</p></div>
            <div className="preview-properties">

              <div className="preview-property" style={{ cursor: 'pointer' }} onClick={() => {
                setShowAll(true)
                setShowCurrent(false)
                setShowFinished(false)
                setShowPeriod(false)
                showAllTenders()
              }}>
                {
                  showAll
                    ?
                    <p style={{ fontWeight: 'bold' }}>Все</p>
                    :
                    <p>Все</p>
                }
              </div>

              <div className="preview-property" style={{ cursor: 'pointer' }} onClick={() => {
                setShowAll(false)
                setShowCurrent(true)
                setShowFinished(false)
                setShowPeriod(false)
                showCurrentTenders()
              }}>
                {
                  showCurrent
                    ?
                    <p style={{ fontWeight: 'bold' }}>Текущие</p>
                    :
                    <p>Текущие</p>
                }
              </div>

              <div className="preview-property" style={{ cursor: 'pointer' }} onClick={() => {
                setShowAll(false)
                setShowCurrent(false)
                setShowFinished(true)
                setShowPeriod(false)
                showFinishedTenders()
              }}>
                {
                  showFinished
                    ?
                    <p style={{ fontWeight: 'bold' }}>Завершенные</p>
                    :
                    <p>Завершенные</p>
                }
              </div>

              <div className="preview-property" style={{ cursor: 'pointer' }} onClick={() => {
                setShowAll(false)
                setShowCurrent(false)
                setShowFinished(false)
                setShowPeriod(true)
                showPeriodTenders()
              }}>
                {
                  !showPeriod
                    ?
                    <>
                      <p>За период</p>
                    </>
                    :
                    <>
                      <p style={{ fontWeight: 'bold' }}>За период</p>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        Начало периода:<DatePicker selected={startPeriod} onChange={(date: any) => setStartPeriod(date)} />
                        Конец периода:<DatePicker selected={endPeriod} onChange={(date: any) => setEndPeriod(date)} />
                      </div>
                    </>

                }
              </div>
            </div>
          </div>

          <div className="Mytenders-sort">
            <div className='Mytenders-sort-list'>
              <div style={{ color: 'gray', paddingLeft: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '15px' }}><p>Сортировать по</p></div>


              <div className="sort-property" style={{ cursor: 'pointer' }} onClick={() => {
                sortByDatePublicTenders()

                setSortByDateAdded(false)
                setSortByDateStart(false)
                setSortByPrice(false)
                setSortByDatePublic(true)
                setSortByDateFinished(false)


              }}>
                {
                  !sortByDatePublic
                    ?
                    <p>Размещено</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Размещено</p>
                }
              </div>

              <div className="sort-property" style={{ cursor: 'pointer' }} onClick={() => {
                sortByDateStartTenders()

                setSortByDateAdded(false)
                setSortByPrice(false)
                setSortByDateFinished(false)
                setSortByDateStart(true)
                setSortByDatePublic(false)

              }}>
                {
                  !sortByDateStart
                    ?
                    <p>Обновлено</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Обновлено</p>
                }
              </div>

              <div className="sort-property" style={{ cursor: 'pointer' }} onClick={() => {
                sortByPriceTenders()

                setSortByDateAdded(false)
                setSortByDateStart(false)
                setSortByDateFinished(false)
                setSortByDatePublic(false)
                setSortByPrice(true)

              }}>
                {
                  !sortByPrice
                    ?
                    <p>Цена</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Цена</p>
                }
              </div>

              <div className="sort-property" style={{ cursor: 'pointer' }} onClick={() => {

                sortByDateFinishedTenders()

                setSortByDateAdded(false)
                setSortByDateStart(false)
                setSortByPrice(false)
                setSortByDateFinished(true)
                setSortByDatePublic(false)

              }}>
                {
                  !sortByDateFinished
                    ?
                    <p>Дата окончания</p>
                    :
                    <p style={{ fontWeight: 'bold' }}>Дата окончания</p>
                }
              </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', float: 'right', cursor: 'pointer' }} onClick={() => createReportMyTender()}>
              <RiFileExcel2Line size={30} color='#3294F4' />
            </div>
          </div>
          <br />

          {loading ? (
            <LoaderTest>
              <TailSpin color="#3294F4" height={150} width={150} />
            </LoaderTest>
          )
            :
            <div className='MyTendersList-container'>
              <div className="MyTendersList-content">
                {tenders
                  .map((item: any, index: any) => (

                    item ?
                      item?.fz === 'fz223' ? (<TenderPreiewCard223 key={index} jsonData={item} myTender={true} auth={true} />) :
                        (<TenderPreiewCard44 key={index} jsonData={item} myTender={true} auth={true} />)
                      : null

                  ))}
              </div>
              <PaginationBlock handlePageChange={handlePageChange} currentPage={currentPage} countShowElements={countShowElements} setCountShowElements={setCountShowElements} />
            </div>
          }
        </div>

      </div>
    </div>
  );
}
