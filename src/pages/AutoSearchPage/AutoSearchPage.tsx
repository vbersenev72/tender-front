import { Select } from '@mui/material';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { LoaderTest } from '../../styles';
import { FaCheck } from 'react-icons/fa';
import { showErrorMessage, showSuccesMessage } from '../../functions/Message';
import axios from 'axios';

export interface IAutoSearchPageProps {
}

export function AutoSearchPage(props: IAutoSearchPageProps) {

  const [autoSearches, setAutoSearches] = useState<any>([])

  const [loading, setLoading] = useState(false)

  const [createAutoSearchName, setCreateAutoSearchName] = useState('')
  const [selectAutoSearchId, setSelectAutoSearchId] = useState(0)


  const [selectAutoSearchEditId, setSelectAutoSearchEditId] = useState(0)
  const [selectAutoSearchEditName, setSelectAutoSearchEditName] = useState('')

  const createAutoSearch = async () => {
    try {

      if (createAutoSearchName == '') return showErrorMessage('Имя автопоиска не может быть пустым')

      const response = await axios.post(`${process.env.REACT_APP_API}/api/autosearch/create`, {
        name: createAutoSearchName,
        tags: '',
        stopTags: '',
        publicDateFrom: '',
        publicDateTo: '',
        startDateFrom: '',
        startDateTo: '',
        endDateFrom: '',
        endDateTo: '',
        fz: '',
        region: "",
        tenderNum: "",
        customerName: '',
        stopCustomerName: '',
        inn: '',
        priceFrom: '',
        priceTo: '',
        enablePrice: '',
        purchaseStage: '',
        methodDeterminingSupplier: '',
        source: '',
        enableSource: '',
        okpd2: '',
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      showSuccesMessage('Автопоиск создан!')

      setTimeout(() => {}, 2000);

      window.location.reload()

    } catch (error: any) {
      showErrorMessage(error.response.data.message)
    }
  }

  const deleteAutoSearch = (id: any) => {
    try {

    } catch (error: any) {
      showErrorMessage(error.response.data.message)
    }
  }

  const editAutoSearch = (id: any) => {
    try {

    } catch (error: any) {
      showErrorMessage(error.response.data.message)
    }
  }

  const getAll = async () => {
    try {

      setLoading(true)

      const getAll: any = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/autosearches/all`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const newGetAll: any = []

      for (let i = 0; i < getAll.data.message.length; i++) {
        const autoSearch = getAll.data.message[i];

        let count = await axios.get(`${process.env.REACT_APP_API}/api/autosearch/count/${autoSearch.id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const newAutoSearch = { ...autoSearch, count: count.data.message }

        newGetAll.push(newAutoSearch)

      }

      setAutoSearches([...newGetAll])

      setLoading(false)

    } catch (error) {
      showErrorMessage('Произошла ошибка, попробуйте позже')
    }
  }

  useEffect(() => {
    getAll()
  }, [])

  return (
    <>
      {loading ? (
        <LoaderTest>
          <TailSpin color="#3294F4" height={150} width={150} />
        </LoaderTest>
      )
        :
        <div className='TagsPage-container'>
          <div className="TagsPage-content">
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: '30px', width: 'fit-content', marginBottom: '10px' }}><p>Автопоиск</p></div>

            <div style={{ height: '38px', display: 'flex', flexDirection: 'row', marginBottom: '25px' }}>

              <input type="text" placeholder='Название автопоиска' style={{ height: '100%', width: '35%', marginLeft: '15px', padding: '10px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e: any) => setCreateAutoSearchName(e.target.value)} value={createAutoSearchName} />

              <div style={{ width: '18%', backgroundColor: 'dodgerblue', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', overflow: 'hidden', cursor: 'pointer' }} onClick={() => createAutoSearch()}>Добавить</div>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', border: autoSearches.length != 0 ? '0.6px solid #D6D6D6' : 'none', borderRadius: '5px', flex: 'wrap' }} >
              {
                autoSearches.length == 0
                  ?
                  <h1>Нет активных Автопоисков</h1>
                  :
                  autoSearches.map((tag: any) => (
                    selectAutoSearchId != tag.id
                      ?
                      <div key={tag.id} style={{ display: 'flex', alignItems: 'center', padding: '25px', justifyContent: 'space-between' }} onClick={() => {
                        setSelectAutoSearchId(tag.id)
                        setSelectAutoSearchEditId(0)
                      }}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>

                          <p style={{ fontSize: '14px' }}>{tag.name}</p>
                        </div>

                        <p style={{ fontSize: '12px', color: '#8F9090' }}>{tag.count} Тендеров</p>
                      </div>
                      :
                      selectAutoSearchEditId != tag.id
                        ?
                        <div key={tag.id} style={{ display: 'flex', alignItems: 'center', padding: '25px', justifyContent: 'space-between' }} onClick={() => setSelectAutoSearchId(tag.id)}>

                          <div style={{ display: 'flex', alignItems: 'center' }}>

                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{tag.name}</p>
                          </div>

                          <div style={{ display: 'flex' }}>
                            <p style={{ fontSize: '12px', marginRight: '15px', cursor: 'pointer' }} onClick={() => {
                              setSelectAutoSearchEditId(tag.id)
                              setSelectAutoSearchEditName(tag.name)
                            }}>Редактировать</p>
                            <p style={{ fontSize: '12px', cursor: 'pointer' }} onClick={async () => await deleteAutoSearch(tag.id)}>Удалить</p>
                          </div>
                        </div>
                        :
                        <div key={tag.id} style={{ display: 'flex', alignItems: 'center', padding: '25px', justifyContent: 'space-between' }}>

                          <div style={{ display: 'flex', alignItems: 'center' }}>

                            <input style={{ fontSize: '14px', width: '200px' }} placeholder='Новое имя метки' value={selectAutoSearchEditName} onChange={(e: any) => setSelectAutoSearchEditName(e.target.value)} />
                          </div>

                          <div style={{ display: 'flex' }}>
                            <p style={{ fontSize: '12px', marginRight: '15px', display: 'flex', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }} onClick={() => editAutoSearch(tag.id)}><FaCheck size={15} />Сохранить</p>
                            <p style={{ fontSize: '12px', cursor: 'pointer' }} onClick={async () => await deleteAutoSearch(tag.id)}>Удалить</p>
                          </div>
                        </div>
                  ))}
            </div>

          </div>
        </div>
      }
    </>
  );
}
