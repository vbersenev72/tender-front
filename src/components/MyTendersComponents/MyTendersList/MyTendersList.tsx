import * as React from 'react';
import { useState, useEffect } from 'react';
import { MyTenderCard44fz } from '../MyTenderCard/MyTenderCard44fz';
import axios from 'axios';
import { showSuccesMessage, showErrorMessage } from '../../../functions/Message';
import { MyTenderCard223fz } from '../MyTenderCard/MyTenderCard223fz';
import { TenderPreiewCard44 } from '../../TenderPreviewCard/TenderPreiewCard44';
import { TenderPreiewCard223 } from '../../TenderPreviewCard/TenderPreiewCard223';
import { LoaderTest } from '../../../styles';
import { TailSpin } from 'react-loader-spinner';




export interface IMyTendersListProps {
}

export function MyTendersList(props: any) {

  const [currentPage, setCurrentPage] = useState<any>(1)
  const [tenders, setTenders] = useState<any>([])
  const [myTendersIds, setMyTendersIds] = useState([])


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

      const page = currentPage

      const token = localStorage.getItem('token')

      const response = await axios.get(`${process.env.REACT_APP_API}/api/lk/mytenders/${page}`, {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      const tenders: any = response.data.message
      console.log(tenders);


      setTenders(tenders)

      const allTenders = []

      for (let i = 0; i < tenders.length; i++) {
        const tenderInfo = tenders[i];

        const response = await axios.get(`${process.env.REACT_APP_API}/api/find/${tenderInfo.reg_num}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        console.log(response.data);

        const tender = response.data.tender[0]
        allTenders.push(tender)

      }

      setTenders([...allTenders])

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

  useEffect(() => {
    getMyTenders()

  }, [currentPage, setCurrentPage,])


  return (
    <>
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
                  item?.fz === 'fz223' ? (<TenderPreiewCard223 key={index} jsonData={item} myTender={true} auth={props.auth} />) :
                    (<TenderPreiewCard44 key={index} jsonData={item} myTender={true} auth={props.auth} />)
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
      }
    </>
  );
}
