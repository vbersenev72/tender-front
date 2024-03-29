import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { showErrorMessage } from '../../../functions/Message';
import axios, { all } from 'axios';
import { TenderPreiewCard223, TenderPreiewCard44 } from '../../../components/TenderPreviewCard';
import { LoaderTest } from '../../../styles';
import { TailSpin } from 'react-loader-spinner';
import { RiFileExcel2Line } from 'react-icons/ri';
import './TagCard.css'
import { createReportTag } from '../../../functions/createReportTags';
import { PaginationBlock } from '../../../components/PaginationBlock/PaginationBlock';


export interface ITagCardProps {
}

export function TagCard(props: ITagCardProps) {

  const { id } = useParams();
  const [loading, setLoading] = useState(true)

  const [showAll, setShowAll] = useState(true)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showFinished, setShowFinished] = useState(false)

  const [showPeriod, setShowPeriod] = useState(false)
  const [startPeriod, setStartPeriod] = useState(new Date())
  const [endPeriod, setEndPeriod] = useState(new Date())

  const [currentPage, setCurrentPage] = useState<any>(1)
  const [countShowElements, setCountShowElements] = useState(10)

  const [tenders, setTenders] = useState<any>([])
  const [tag, setTag] = useState<any>({})
  const [beforeTenders, setBeforeTenders] = useState<any>([])
  const [tagTendersList, setTagTendersList] = useState<any>([])

  // sort by
  const [sortByDateAdded, setSortByDateAdded] = useState(true)
  const [sortByDateStart, setSortByDateStart] = useState(false)
  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortByDateFinished, setSortByDateFinished] = useState(false)
  const [sortByDatePublic, setSortByDatePublic] = useState(false)

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

  React.useEffect(() => {

    const getTendersByTag = async () => {
      try {
        setLoading(true)

        const response = await axios.post(`${process.env.REACT_APP_API}/api/tags/gettenders`, {
          page: currentPage,
          idTag: id,
          limit: countShowElements
        }, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const getTag = await axios.get(`${process.env.REACT_APP_API}/api/tags/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        console.log(getTag.data.message);






        const allTenders = response.data.message

        setTenders([...allTenders])
        setTagTendersList([...allTenders])
        setBeforeTenders([...allTenders])
        setTag(getTag.data.message)

        setLoading(false)


      } catch (error) {
        showErrorMessage('Что то пошло не так, попробуйте позже')
      }
    }

    getTendersByTag()

  }, [currentPage, setCurrentPage, countShowElements])

  const handlePageChange = async (newPage: number) => {
    console.log(newPage);

    setCurrentPage(newPage)
    console.log(currentPage);

  };

  return (
    <div>
      <div className='TagCard-container'>

        <div className='TagCard-content'>
          <div className="TagCard-preview">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', width: 'fit-content' }}><p>Метки</p></div>
            <div key={tag.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>

              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ height: '22px', width: '22px', backgroundColor: tag.tag_color, borderRadius: '5px', marginRight: '8px' }} />
                <p style={{ fontSize: '14px' }}>{tag.tag_name}</p>
              </div>

              <p style={{ fontSize: '12px', color: '#8F9090', marginLeft: '10px' }}>{tenders.length} Тендеров</p>
            </div>
          </div>


          <div className="Mytenders-sort">
            <div className='Mytenders-sort-list'>
              <div style={{ color: 'gray', paddingLeft: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '15px' }}><p>Сортировать по</p></div>


              <div className="sort-property" style={{cursor: 'pointer'}} onClick={() => {
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

              <div className="sort-property"  style={{cursor: 'pointer'}} onClick={() => {
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

              <div className="sort-property" style={{cursor: 'pointer'}} onClick={() => {
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

              <div className="sort-property" style={{cursor: 'pointer'}} onClick={() => {

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
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', float: 'right', cursor: 'pointer' }} onClick={() => createReportTag(tag)}>
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
                      item?.fz === 'fz223' ? (<TenderPreiewCard223 key={index} jsonData={item} myTender={true} auth={true} tag={tag} />) :
                        (<TenderPreiewCard44 key={index} jsonData={item} myTender={true} auth={true} tag={tag} />)
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
