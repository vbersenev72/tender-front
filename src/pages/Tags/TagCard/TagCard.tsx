import * as React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { showErrorMessage } from '../../../functions/Message';
import axios, { all } from 'axios';
import { TenderPreiewCard223, TenderPreiewCard44 } from '../../../components/TenderPreviewCard';
import { LoaderTest } from '../../../styles';
import { TailSpin } from 'react-loader-spinner';
import { RiFileExcel2Line } from 'react-icons/ri';


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
  const [tenders, setTenders] = useState<any>([])
  const [beforeTenders, setBeforeTenders] = useState<any>([])
  const [tagTendersList, setTagTendersList] = useState<any>([])

  // sort by
  const [sortByDateAdded, setSortByDateAdded] = useState(true)
  const [sortByDateStart, setSortByDateStart] = useState(false)
  const [sortByPrice, setSortByPrice] = useState(false)
  const [sortByDateFinished, setSortByDateFinished] = useState(false)
  const [sortByDatePublic, setSortByDatePublic] = useState(false)

  React.useEffect(() => {

    const getTendersByTag = async () => {
      try {
        setLoading(true)

        const response = await axios.post(`${process.env.REACT_APP_API}/api/tags/gettenders`, {
          page: currentPage,
          idTag: id
        }, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const allTenders = response.data.message

        setTenders([...allTenders])
        setTagTendersList([...allTenders])
        setBeforeTenders([...allTenders])

        setLoading(false)


      } catch (error) {
        showErrorMessage('Что то пошло не так, попробуйте позже')
      }
    }

    getTendersByTag()

  }, [currentPage, setCurrentPage,])

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

    </div>
  </div>

  <div className="Mytenders-sort">
    <div className='Mytenders-sort-list'>
      <div style={{ color: 'gray', paddingLeft: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '15px' }}><p>Сортировать по</p></div>

      <div className="sort-property" onClick={() => {
        setSortByDateAdded(true)
        setSortByDateStart(false)
        setSortByPrice(false)
        setSortByDateFinished(false)
        setSortByDatePublic(false)
        //sortByDateAddedTenders()

      }}>
        {
          !sortByDateAdded
            ?
            <p>Дата добавления в мои тендеры</p>
            :
            <p style={{ fontWeight: 'bold' }}>Дата добавления в мои тендеры</p>
        }

      </div>

      <div className="sort-property" onClick={() => {
        setSortByDateAdded(false)
        setSortByDateStart(true)
        setSortByPrice(false)
        setSortByDateFinished(false)
        setSortByDatePublic(false)
        //sortByDateStartTenders()

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
        //sortByPriceTenders()

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

        //sortByDateFinishedTenders()

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

        //sortByDatePublicTenders()

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', float: 'right' }}>
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
</div>

</div>

  );
}
