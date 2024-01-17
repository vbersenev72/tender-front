import * as React from 'react';
import { useState, useEffect } from 'react';
import { MyTenderCard44fz } from '../MyTenderCard/MyTenderCard44fz';
import axios from 'axios';
import { showSuccesMessage, showErrorMessage } from '../../../functions/Message';
import { MyTenderCard223fz } from '../MyTenderCard/MyTenderCard223fz';




export interface IMyTendersListProps {
}

export function MyTendersList() {

  const [tenders, setTenders] = useState<any>()
  const [loading, setLoading] = useState(false)

  const [showAll, setShowAll] = useState(true)
  const [showCurrent, setShowCurrent] = useState(false)
  const [showFinished, setShowFinished] = useState(false)

  const [showPeriod, setShowPeriod] = useState(false)
  const [startPeriod, setStartPeriod] = useState('')
  const [endPeriod, setEndPeriod] = useState('')


  // sort by
  const [sortByDateAdded, setSortByDateAdded] = useState(true)
  const [sortByDateStart, setSortByDateStart] = useState(false)
  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortByDateFinished, setSortByDateFinished] = useState(false)
  const [sortByDatePublic, setSortByDatePublic] = useState(false)

  const getMyTenders = async () => {
    try {
      setLoading(true)

      const token = localStorage.getItem('token')

      const response = await axios.get(`${process.env.REACT_APP_API}/api/lk/mytenders`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      const tenders: any = response.data.message
      console.log(tenders);


      setTenders(tenders)

      setLoading(false)
    } catch (error) {
      showErrorMessage('Что то пошло не так, попробуйте позже!')
    }
  }


  useEffect(() => {
    getMyTenders()
  }, [])


  return (
    <div className='MyTendersList-container'>
      <div className="MyTendersList-content">
        {
          (!tenders || tenders.length == 0)
            ?
            <h1>У вас нет сохраненных тендеров</h1>
            :
            tenders.map((tender: any) => {
              tender.fz === 'fz223' ? <MyTenderCard223fz key={tender._id} /> : <MyTenderCard44fz key={tender._id} />
            })
        }
      </div>
    </div>
  );
}
