import * as React from 'react';
import AdvancedSearch from '../../../components/AdvancedSearch/AdvancedSearch';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './AutoSearchCard.css'
import { TailSpin } from 'react-loader-spinner';
import { LoaderTest } from '../../../styles';
import { showErrorMessage, showSuccesMessage } from '../../../functions/Message';
import axios from 'axios';

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
  const [fz, setFz] = React.useState('')
  const [region, setRegion] = React.useState('')
  const [tenderNum, setTenderNum] = React.useState('')
  const [customerName, setCustomerName] = React.useState('')
  const [stopCustomerName, setStopCustomerName] = React.useState('')
  const [inn, setInn] = React.useState('')
  const [priceFrom, setPriceFrom] = React.useState('')
  const [priceTo, setPriceTo] = React.useState('')
  const [enablePrice, setEnablePrice] = React.useState('')
  const [source, setSource] = React.useState('')
  const [enableSource, setEnableSource] = React.useState('')
  const [okpd2, setOkpd2] = React.useState('')

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

  const excelExport = () => {
    showSuccesMessage('Ожидайте отчёт в течение 5 минут.')
  }

  const saveAutoSearch = async () => {
    showSuccesMessage('Изменения сохранены!')
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

        const tendersList = response.data.message
        setTenders([...tendersList])
        setBeforeTenders([...tendersList])

        setLoading(false)

      } catch (error) {
        showErrorMessage('Произошла ошибка, попробуйте позже')
      }
    }

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
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '30px', width: 'fit-content' }}>
                  <p>Параметры автопоиска</p>
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
                    <AdvancedSearch props={[
                      tags, setTags,
                      stopTags, setStopTags,
                      publicDateFrom, setPublicDateFrom,
                      publicDateTo, setPublicDateTo,
                      startDateFrom, setStartDateFrom,
                      startDateTo, setStartDateTo,
                      endDateFrom, setEndDateFrom,
                      endDateTo, setEndDateTo,
                      fz, setFz,
                      region, setRegion,
                      tenderNum, setTenderNum,
                      customerName, setCustomerName,
                      stopCustomerName, setStopCustomerName,
                      inn, setInn,
                      priceFrom, setPriceFrom,
                      priceTo, setPriceTo,
                      enablePrice, setEnablePrice,
                      source, setSource,
                      enableSource, setEnableSource,
                      okpd2, setOkpd2
                    ]} />
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%' }}>
                      <div style={{ width: '50%', display: 'flex', justifyContent: 'space-around' }}>
                        <div className='AdvancedSearchButton' style={{ backgroundColor: 'dodgerblue', color: 'white' }}><p>Поиск</p></div>
                        <div className='AdvancedSearchButton' onClick={saveAutoSearch} ><p>Сохранить изменения</p></div>
                        <div className='AdvancedSearchButton' onClick={excelExport}><p>Excel</p></div>
                        <div className='AdvancedSearchButton' onClick={clearAllFields}><p>Сбросить</p></div>
                      </div>
                    </div>



                  </>
                }



              </div>
            </div>
          </div>
      }
    </>
  );
}
