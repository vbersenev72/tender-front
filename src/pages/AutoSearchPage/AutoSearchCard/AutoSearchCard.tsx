import * as React from 'react';
import AdvancedSearch from '../../../components/AdvancedSearch/AdvancedSearch';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './AutoSearchCard.css'
import { TailSpin } from 'react-loader-spinner';
import { LoaderTest } from '../../../styles';
import { showErrorMessage, showSuccesMessage } from '../../../functions/Message';
import axios from 'axios';
import { RiFileExcel2Line } from 'react-icons/ri';
import { TenderPreiewCard223, TenderPreiewCard44 } from '../../../components/TenderPreviewCard';
import { createReport } from '../../../functions/createReport';
import { createReportAutoSearch } from '../../../functions/createReportAutoSearch';
import { Okpd2Select } from '../../../components/OKPD2Select/Okpd2Select';
import { okpd2Nomenclature } from '../../../data/tendersData';

export interface IAutoSearchCardProps {
}

export function AutoSearchCard(props: IAutoSearchCardProps) {

  const { id } = useParams()

  const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false)
  const [loading, setLoading] = useState(false)

  // Advanced Search data
  const [tags, setTags] = React.useState('')
  const [stopTags, setStopTags] = React.useState('')
  const [publicDateFrom, setPublicDateFrom] = React.useState('')
  const [publicDateTo, setPublicDateTo] = React.useState('')
  const [startDateFrom, setStartDateFrom] = React.useState('')
  const [startDateTo, setStartDateTo] = React.useState('')
  const [endDateFrom, setEndDateFrom] = React.useState('')
  const [endDateTo, setEndDateTo] = React.useState('')
  const [fz, setFz] = React.useState<any>('')
  const [region, setRegion] = React.useState<any>('')
  const [tenderNum, setTenderNum] = React.useState('')
  const [customerName, setCustomerName] = React.useState('')
  const [stopCustomerName, setStopCustomerName] = React.useState('')
  const [inn, setInn] = React.useState('')
  const [priceFrom, setPriceFrom] = React.useState('')
  const [priceTo, setPriceTo] = React.useState('')
  const [enablePrice, setEnablePrice] = React.useState('')
  const [source, setSource] = React.useState('')
  const [enableSource, setEnableSource] = React.useState('')
  const [okpd2, setOkpd2] = React.useState<any>('')

  // show by
  const [showAll, setShowAll] = useState(true)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showFinished, setShowFinished] = useState(false)

  const [showPeriod, setShowPeriod] = useState(false)
  const [startPeriod, setStartPeriod] = useState(new Date())
  const [endPeriod, setEndPeriod] = useState(new Date())

  const [currentPage, setCurrentPage] = useState<any>(1)
  const [tenders, setTenders] = useState<any>([])
  const [beforeTenders, setBeforeTenders] = useState<any>([])



  const [count, setCount] = useState('')
  // sort by
  const [sortByDateAdded, setSortByDateAdded] = useState(true)
  const [sortByDateStart, setSortByDateStart] = useState(false)
  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortByDateFinished, setSortByDateFinished] = useState(false)
  const [sortByDatePublic, setSortByDatePublic] = useState(false)



  const clearAllFields = () => {
    setTags('')
    setStopTags('')
    setPublicDateFrom('')
    setPublicDateTo('')
    setStartDateFrom('')
    setStartDateTo('')
    setEndDateFrom('')
    setEndDateTo('')
    setFz('')
    setRegion('')
    setTenderNum('')
    setCustomerName('')
    setStopCustomerName('')
    setInn('')
    setPriceFrom('')
    setPriceTo('')
    setEnablePrice('')
    setSource('')
    setEnableSource('')
    setOkpd2('')

    showSuccesMessage('Все параметры сброшены!')
  }


  const saveAutoSearch = async () => {
    // console.log(
    //   tags, '\n',
    //   stopTags, '\n',
    //   publicDateFrom, '\n',
    //   publicDateTo, '\n',
    //   startDateFrom, '\n',
    //   startDateTo, '\n',
    //   endDateFrom, '\n',
    //   endDateTo, '\n',
    //   fz, '\n',
    //   region, '\n',
    //   tenderNum, '\n',
    //   customerName, '\n',
    //   stopCustomerName, '\n',
    //   inn, '\n',
    //   priceFrom, '\n',
    //   priceTo, '\n',
    //   enablePrice, '\n',
    //   source, '\n',
    //   enableSource, '\n',
    //   okpd2, '\n',
    // )

    const saveAutosearchParams = await axios.post(`${process.env.REACT_APP_API}/api/autosearch/edit`, {
      tags: tags,
      stopTags: stopTags,
      publicDateFrom: publicDateFrom,
      publicDateTo: publicDateTo,
      startDateFrom: startDateFrom,
      startDateTo: startDateTo,
      endDateFrom: endDateFrom,
      endDateTo: endDateTo,
      fz: fz,
      region: region.value,
      tenderNum: tenderNum,
      customerName: customerName,
      stopCustomerName: stopCustomerName,
      inn: inn,
      priceFrom: priceFrom,
      priceTo: priceTo,
      enablePrice: enablePrice,
      purchaseStage: '',
      methodDeterminingSupplier: '',
      source: source,
      enableSource: enableSource,
      okpd2: okpd2.code,
      autoSearchId: id
    }, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    showSuccesMessage('Изменения сохранены!')
  }

  const getOkpd2ByCode = (code: any) => {
    for (let i = 0; i < okpd2Nomenclature.length; i++) {
      const okpdObj = okpd2Nomenclature[i];

      if (okpdObj.code == code) {
        return okpdObj
      }

      for (let y = 0; y < okpdObj.child.length; y++) {
        const okpdChildObj = okpdObj.child[y];

        if (okpdChildObj.code == code) {
          return okpdChildObj
        }
        
      }

    }
   
  }

  const getAutoSearchFields = async () => {
    try {
      setLoading(true)
      const response: any = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(response.data.message);
      const data = response.data.message

      const getOkpd2: any = getOkpd2ByCode(data.okpd2)
      console.log('getokpd2' + ' ' + JSON.stringify(getOkpd2));


      setCustomerName(data.customerName)
      setEnablePrice(data.enablePrice)
      setEnableSource(data.enableSource)
      setEndDateFrom(data.endDateFrom)
      setEndDateTo(data.endDateTo)
      setFz(data.fz)
      setInn(data.inn)
      setOkpd2(getOkpd2.name)
      setPriceFrom(data.priceFrom)
      setPriceTo(data.priceTo)
      setPublicDateFrom(data.publicDateFrom)
      setPublicDateTo(data.publicDateTo)
      setRegion(data.region)
      setSource(data.source)
      setStartDateFrom(data.startDateFrom)
      setStartDateTo(data.startDateTo)
      setStopCustomerName(data.stopCustomerName)
      setStopTags(data.stopTags)
      setTags(data.tags)
      setTenderNum(data.tenderNum)


      setLoading(false)

    } catch (error) {
      console.log(error);
      showErrorMessage('Что то пошло не так')
    }
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


    setTenders(newTendersArray)

  }

  const sortByDateStartTenders = () => {

    const newTendersArray = beforeTenders.sort((a: any, b: any) => {
      console.log(a);

      if (a.fz == 'fz223') {
        const aDate = a?.publicationDateTime
        const bDate = b.fz == 'fz223' ? b?.publicationDateTime : b?.notificationInfo?.procedureInfo?.collectingInfo?.startDT

        return new Date(bDate).getTime() - new Date(aDate).getTime()
      } else {
        const aDate = a?.notificationInfo?.procedureInfo?.collectingInfo?.startDT
        const bDate = b.fz == 'fz223' ? b?.publicationDateTime : b?.notificationInfo?.procedureInfo?.collectingInfo?.startDT

        return new Date(bDate).getTime() - new Date(aDate).getTime()
      }
    })


    setTenders(newTendersArray)

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


    setTenders(newTendersArray)
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


    setTenders(newTendersArray)
  }

  const handlePageChange = async (newPage: number) => {

    setCurrentPage(newPage)

  };


  React.useEffect(() => {
    const getTenders = async () => {
      try {
        setLoading(true)

        const response = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/getresult/${id}?page=${currentPage}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        let countTenders = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/count/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })


        const tendersList = response.data.message
        setCount(countTenders.data.message)
        setTenders([...tendersList])
        setBeforeTenders([...tendersList])

        setLoading(false)

      } catch (error) {
        showErrorMessage('Произошла ошибка, попробуйте позже')
      }
    }

    getAutoSearchFields()

    getTenders()

  }, [currentPage])

  return (
    <>
      {
        loading
          ?
          <LoaderTest>
            <TailSpin color="#3294F4" height={150} width={150} />
          </LoaderTest>
          :
          <div className='AutoSearchCard-container'>
            <div className="AutoSearchCard-content">
              <div className="AutoSearchCard-preview">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '26px', width: 'fit-content', }}>
                  <p style={{ lineHeight: '25.23px' }}>Параметры автопоиска</p>
                  {
                    showAdvancedSearch
                      ?
                      <p style={{ fontSize: '18px', color: '#2F3D4A', marginLeft: '10px', paddingTop: '5px' }} onClick={() => setShowAdvancedSearch(false)}>Свернуть</p>
                      :
                      <p style={{ fontSize: '18px', color: '#2F3D4A', marginLeft: '10px', paddingTop: '5px' }} onClick={() => setShowAdvancedSearch(true)}>Развернуть</p>
                  }
                </div>

                {
                  showAdvancedSearch
                  &&
                  <>
                    <AdvancedSearch

                      tags={tags} setTags={setTags}
                      stopTags={stopTags} setStopTags={setStopTags}
                      publicDateFrom={publicDateFrom} setPublicDateFrom={setPublicDateFrom}
                      publicDateTo={publicDateTo} setPublicDateTo={setPublicDateTo}
                      startDateFrom={startDateFrom} setStartDateFrom={setStartDateFrom}
                      startDateTo={startDateTo} setStartDateTo={setStartDateTo}
                      endDateFrom={endDateFrom} setEndDateFrom={setEndDateFrom}
                      endDateTo={endDateTo} setEndDateTo={setEndDateTo}
                      fz={fz} setFz={setFz}
                      region={region} setRegion={setRegion}
                      tenderNum={tenderNum} setTenderNum={setTenderNum}
                      customerName={customerName} setCustomerName={setCustomerName}
                      inn={inn} setInn={setInn}
                      priceFrom={priceFrom} setPriceFrom={setPriceFrom}
                      priceTo={priceTo} setPriceTo={setPriceTo}
                      enablePrice={enablePrice} setEnablePrice={setEnablePrice}
                      source={source} setSource={setSource}
                      enableSource={enableSource} setEnableSource={setEnableSource}
                      okpd2={okpd2} setOkpd2={setOkpd2}

                    />
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%' }}>
                      <div style={{ width: '50%', display: 'flex', justifyContent: 'space-around' }}>
                        <div className='AdvancedSearchButton' style={{ backgroundColor: 'dodgerblue', color: 'white' }}><p>Поиск</p></div>
                        <div className='AdvancedSearchButton' onClick={saveAutoSearch} ><p>Сохранить изменения</p></div>
                        <div className='AdvancedSearchButton' onClick={() => createReportAutoSearch(id)}><p>Excel</p></div>
                        <div className='AdvancedSearchButton' onClick={clearAllFields}><p>Сбросить</p></div>
                      </div>
                    </div>
                  </>
                }
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '30px', width: 'fit-content' }}>
                  <br />
                  <br />
                  <br />
                  <p>Результаты автопоиска</p>
                  <p style={{ fontSize: '16px', color: '#2F3D4A', marginLeft: '10px', paddingTop: '5px' }}>Найдено {count} тендеров</p>
                </div>

                <div className="Mytenders-sort">
                  <div className='Mytenders-sort-list'>
                    <div style={{ color: 'gray', paddingLeft: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '15px' }}><p>Сортировать по</p></div>

                    <div className="sort-property" onClick={() => {
                      setSortByDateAdded(false)
                      setSortByDateStart(true)
                      setSortByPrice(false)
                      setSortByDateFinished(false)
                      setSortByDatePublic(false)
                      sortByDateStartTenders()

                    }}>
                      {
                        !sortByDateStart
                          ?
                          <p>Дата начала подачи заявок</p>
                          :
                          <p style={{ fontWeight: 'bold' }}>Дата начала подачи заявок</p>
                      }
                    </div>

                    <div className="sort-property" onClick={() => {
                      setSortByDateAdded(false)
                      setSortByDateStart(false)
                      setSortByPrice(true)
                      setSortByDateFinished(false)
                      setSortByDatePublic(false)
                      sortByPriceTenders()

                    }}>
                      {
                        !sortByPrice
                          ?
                          <p>Цена</p>
                          :
                          <p style={{ fontWeight: 'bold' }}>Цена</p>
                      }
                    </div>

                    <div className="sort-property" onClick={() => {
                      setSortByDateAdded(false)
                      setSortByDateStart(false)
                      setSortByPrice(false)
                      setSortByDateFinished(true)
                      setSortByDatePublic(false)

                      sortByDateFinishedTenders()

                    }}>
                      {
                        !sortByDateFinished
                          ?
                          <p>Дата окончания</p>
                          :
                          <p style={{ fontWeight: 'bold' }}>Дата окончания</p>
                      }
                    </div>

                    <div className="sort-property" onClick={() => {
                      setSortByDateAdded(false)
                      setSortByDateStart(false)
                      setSortByPrice(false)
                      setSortByDateFinished(false)
                      setSortByDatePublic(true)

                      sortByDatePublicTenders()

                    }}>
                      {
                        !sortByDatePublic
                          ?
                          <p>Дата публикации</p>
                          :
                          <p style={{ fontWeight: 'bold' }}>Дата публикации</p>
                      }
                    </div>

                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', float: 'right' }} onClick={() => createReportAutoSearch(id)}>
                    <RiFileExcel2Line size={30} color='#3294F4' />
                  </div>
                </div>
                <br />

                <div className='MyTendersList-container'>
                  <div className="MyTendersList-content">
                    {tenders
                      .map((item: any, index: any) => (

                        item ?
                          item?.fz === 'fz223' ? (<TenderPreiewCard223 key={index} jsonData={item} auth={true} showReadButton={true} />) :
                            (<TenderPreiewCard44 key={index} jsonData={item} auth={true} showReadButton={true} />)
                          : null

                      ))}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                    <button onClick={() => handlePageChange((currentPage - 1))} disabled={currentPage === 1}>
                      Назад
                    </button>
                    <span style={{ margin: '0 10px' }}>Страница {currentPage}</span>
                    <button onClick={() => {
                      handlePageChange((currentPage + 1))
                    }}>
                      Вперед
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
      }
    </>
  );
}
