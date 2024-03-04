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
import { methodDeterminingSupplierList, okpd2Nomenclature, regionsList, sourcesTenders } from '../../../data/tendersData';
import { PaginationBlock } from '../../../components/PaginationBlock/PaginationBlock';

export interface IAutoSearchCardProps {
}

export function AutoSearchCard(props: IAutoSearchCardProps) {

  const { id } = useParams()

  const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(false)
  const [loading, setLoading] = useState(false)

  // Advanced Search data
  const [tags, setTags] = React.useState<any>('')
  const [stopTags, setStopTags] = React.useState<any>('')
  const [publicDateFrom, setPublicDateFrom] = React.useState<any>('')
  const [publicDateTo, setPublicDateTo] = React.useState<any>('')
  const [startDateFrom, setStartDateFrom] = React.useState<any>('')
  const [startDateTo, setStartDateTo] = React.useState<any>('')
  const [endDateFrom, setEndDateFrom] = React.useState<any>('')
  const [endDateTo, setEndDateTo] = React.useState<any>('')
  const [fz, setFz] = React.useState<any>('')
  const [tenderNum, setTenderNum] = React.useState<any>('')
  const [customerName, setCustomerName] = React.useState<any>('')
  const [stopCustomerName, setStopCustomerName] = React.useState<any>('')
  const [inn, setInn] = React.useState<any>('')
  const [priceFrom, setPriceFrom] = React.useState<any>('')
  const [priceTo, setPriceTo] = React.useState<any>('')
  const [enablePrice, setEnablePrice] = React.useState<any>('')
  const [source, setSource] = React.useState<any>('')
  const [enableSource, setEnableSource] = React.useState<any>('')
  const [okpd2, setOkpd2] = React.useState<any>([])
  const [region, setRegion] = React.useState<any>([])
  const [methodDeterminingSupplier, setMethodDeterminingSupplier] = useState<any>([])
  const [purchaseStage, setPurchaseStage] = useState<any>([])

  // show by
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
    setRegion([])
    setTenderNum('')
    setCustomerName('')
    setStopCustomerName('false')
    setInn('')
    setPriceFrom('')
    setPriceTo('')
    setEnablePrice('')
    setSource('')
    setEnableSource('')
    setOkpd2([])
    setMethodDeterminingSupplier([])
    setPurchaseStage([])

    showSuccesMessage('Все параметры сброшены!')
  }


  const saveAutoSearch = async () => {

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
      region: region.map((region: any) => region.value).join(';'),
      tenderNum: tenderNum,
      customerName: customerName,
      stopCustomerName: stopCustomerName,
      inn: inn,
      priceFrom: priceFrom,
      priceTo: priceTo,
      enablePrice: enablePrice,
      purchaseStage: purchaseStage.map((stage: any) => stage).join(';'),
      source: source,
      enableSource: enableSource,
      okpd2: okpd2.map((obj: any) => obj.code).join(';'),
      autoSearchId: id,
      methodDeterminingSupplier: methodDeterminingSupplier.map((method: any) => method.value).join(';')
    }, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    showSuccesMessage('Изменения сохранены!')
  }

  const getOkpd2ByCode = (okpd2Str: any) => {
    for (let i = 0; i < okpd2Nomenclature.length; i++) {
      const okpdObj = okpd2Nomenclature[i];

      if (okpd2Str.split(';').includes(okpdObj.code)) {
        return okpdObj
      }

      for (let y = 0; y < okpdObj.child.length; y++) {
        const okpdChildObj = okpdObj.child[y];

        if (okpd2Str.split(';').includes(okpdChildObj.code)) {
          return okpdChildObj
        }
      }
    }
  }

  const getRegionByValue = (value: any) => {

    for (let i = 0; i < regionsList.length; i++) {
      const findRegion: any = regionsList[i];

      if (findRegion.value == value) {
        return findRegion
      }

      for (let y = 0; y < findRegion.child.length; y++) {
        const regionChild = findRegion.child[y];
        console.log(regionChild);


        if (regionChild.value == value) {

          return regionChild
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



      //const getRegion: any = getRegionByValue(data.region)
      const regionValues = data.region.split(';').filter((code: any) => code !== '');
      const getRegion: any = [...regionValues.map((regValue: any) => getRegionByValue(regValue))]

      const inputCodes = data.okpd2.split(';').filter((code: any) => code !== ''); // Разделение строки на отдельные коды и фильтрация пустых элементов
      const getOkpd2 = okpd2Nomenclature.filter((obj: any) => {
        if (inputCodes.includes(obj.code.toString())) {
          return true;
        }
        if (obj.child && obj.child.some((childObj: any) => inputCodes.includes(childObj.code.toString()))) {
          return true;
        }
        return false;
      });

      const getMethodSupplySelect = data.methodDeterminingSupplier.split(';').filter((value: any) => value !== '');
      const getMethodSupplySelectArray = methodDeterminingSupplierList.filter((method: any) => {
        if (getMethodSupplySelect.includes(method.value.toString())) {
          return true;
        }

        return false;
      });





      setCustomerName(data.customerName)
      setEnablePrice(data.enablePrice)
      setEnableSource(data.enableSource)
      setEndDateFrom(data.endDateFrom)
      setEndDateTo(data.endDateTo)
      setFz(data.fz)
      setInn(data.inn)
      setOkpd2(getOkpd2)
      setPriceFrom(data.priceFrom)
      setPriceTo(data.priceTo)
      setPublicDateFrom(data.publicDateFrom)
      setPublicDateTo(data.publicDateTo)
      setRegion(getRegion)
      setSource(data.source)
      setStartDateFrom(data.startDateFrom)
      setStartDateTo(data.startDateTo)
      setStopCustomerName(data.stopCustomerName)
      setStopTags(data.stopTags)
      setTags(data.tags)
      setTenderNum(data.tenderNum)
      setMethodDeterminingSupplier([...getMethodSupplySelectArray])
      setPurchaseStage([...data.purchaseStage.split(';')])

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

  const handlePageChange = async (newPage: number) => {

    setCurrentPage(newPage)

  };


  React.useEffect(() => {
    const getTenders = async () => {
      try {
        setLoading(true)

        const response = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/getresult/${id}?page=${currentPage}&limit=${countShowElements}`, {
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

  }, [currentPage, countShowElements])

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
                      setMethodDeterminingSupplier={setMethodDeterminingSupplier} methodDeterminingSupplier={methodDeterminingSupplier}
                      setPurchaseStage={setPurchaseStage} purchaseStage={purchaseStage}
                      setStopCustomerName={setStopCustomerName} stopCustomerName={stopCustomerName}

                    />
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%' }}>
                      <div style={{ width: '50%', display: 'flex', justifyContent: 'space-around' }}>
                        <div className='AdvancedSearchButton' style={{ backgroundColor: 'dodgerblue', color: 'white', cursor: 'pointer' }}><p>Поиск</p></div>
                        <div className='AdvancedSearchButton' style={{cursor: "pointer"}} onClick={saveAutoSearch} ><p>Сохранить изменения</p></div>
                        <div className='AdvancedSearchButton' style={{cursor: "pointer"}} onClick={() => createReportAutoSearch(id)}><p>Excel</p></div>
                        <div className='AdvancedSearchButton' style={{cursor: "pointer"}} onClick={clearAllFields}><p>Сбросить</p></div>
                      </div>
                    </div>
                  </>
                }
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '30px', width: 'fit-content' }}>
                  <br />
                  <br />
                  <br />
                  <p>Результаты автопоиска</p>
                  {/* <p style={{ fontSize: '16px', color: '#2F3D4A', marginLeft: '10px', paddingTop: '5px' }}>Найдено {count} тендеров</p> */}
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

                    <div className="sort-property" style={{cursor: 'pointer'}} onClick={() => {
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
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', float: 'right', cursor: 'pointer' }} onClick={() => createReportAutoSearch(id)}>
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
                  <PaginationBlock handlePageChange={handlePageChange} currentPage={currentPage} countShowElements={countShowElements} setCountShowElements={setCountShowElements} />
                </div>

              </div>
            </div>
          </div>
      }
    </>
  );
}
