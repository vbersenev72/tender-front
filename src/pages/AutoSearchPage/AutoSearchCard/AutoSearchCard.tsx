import * as React from 'react';
import AdvancedSearch from '../../../components/AdvancedSearch/AdvancedSearch';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './AutoSearchCard.css'

export interface IAutoSearchCardProps {
}

export function AutoSearchCard(props: IAutoSearchCardProps) {

  const { id } = useParams()

  const [showAdvancedSearch, setShowAdvancedSearch] = React.useState(true)

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
  const [tag, setTag] = useState<any>({})
  const [beforeTenders, setBeforeTenders] = useState<any>([])
  const [tagTendersList, setTagTendersList] = useState<any>([])

  // sort by
  const [sortByDateAdded, setSortByDateAdded] = useState(true)
  const [sortByDateStart, setSortByDateStart] = useState(false)
  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortByDateFinished, setSortByDateFinished] = useState(false)
  const [sortByDatePublic, setSortByDatePublic] = useState(false)


  return (
    <div>
      <div className='AutoSearchCard-container'>
        <div className="AutoSearchCard-content">
          <div className="AutoSearchCard-preview">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: '30px', width: 'fit-content' }}>
              <p>Параметры автопоиска</p>
              {
                showAdvancedSearch
                  ?
                  <p style={{ fontSize: '18px', color: '#2F3D4A', marginLeft: '10px', paddingTop: '5px' }} onClick={()=>setShowAdvancedSearch(false)}>Свернуть</p>
                  :
                  <p style={{ fontSize: '18px', color: '#2F3D4A', marginLeft: '10px', paddingTop: '5px' }} onClick={()=>setShowAdvancedSearch(true)}>Развернуть</p>
              }
            </div>

            {
              showAdvancedSearch && <AdvancedSearch/>
            }

          </div>
        </div>
      </div>
    </div>
  );
}
