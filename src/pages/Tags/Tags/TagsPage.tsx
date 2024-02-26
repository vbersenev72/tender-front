import * as React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select'
import './TagsPage.css'
import { showErrorMessage, showSuccesMessage } from '../../../functions/Message';
import axios from 'axios';
import { LoaderTest } from '../../../styles';
import { TailSpin } from 'react-loader-spinner';
import { FaCheck } from "react-icons/fa";


export interface ITagsPageProps {
}

export function TagsPage(props: ITagsPageProps) {

  const [tags, setTags] = useState<any>([])

  const [loading, setLoading] = useState(false)

  const [createTagColor, setCreateTagColor] = useState('white')
  const [createTagName, setCreateTagName] = useState('')

  const [selectTagId, setSelectTagId] = useState(0)

  const [selectTagIdEdit, setSelectTagIdEdit] = useState(0)
  const [selectTagEditName, setSelectTagEditName] = useState('')

  useEffect(() => {
    const getAllTags = async () => {
      try {
        setLoading(true);
        const getAllTags: any = await axios.get(`${process.env.REACT_APP_API}/api/tags/getall`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });

        const newAllTags: any = [];

        for (let i = 0; i < getAllTags.data.message.length; i++) {
          const tag: any = getAllTags.data.message[i];

          let count = await axios.post(`${process.env.REACT_APP_API}/api/tags/getcounttenders`, {
            idTag: tag.id
          }, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });

          const newTag = { ...tag, count: count.data.message };

          newAllTags.push(newTag);
        }

        setTags([...newAllTags]);
        console.log(newAllTags);
        console.log(tags);


        setLoading(false);
      } catch (error: any) {
        showErrorMessage('Произошла ошибка, попробуйте позже')
      }
    };

    getAllTags();

  }, []);




  const colorTagsOptions = [
    { value: '#D11E1E', label: 'Красный' },
    { value: '#337DDE', label: 'Голбой', },
    { value: '#7A0058', label: 'Пурпурный', },
    { value: '#47DE00', label: 'Зеленый', },
    { value: '#FFB803', label: 'Оранжевый', },
    { value: '#4800BD', label: 'Фиолетовый', },
    { value: '#0091B1', label: 'Бирюзовый' },
    { value: '#002993', label: 'Синий' },
    { value: 'black', label: 'Черный' },
  ]

  const createTag = async () => {
    try {

      if (createTagName == '') return showErrorMessage('Придумайте имя для метки')
      if (createTagColor == 'white') return showErrorMessage('Выберите цвет метки')


      const createTag: any = await axios.post(`${process.env.REACT_APP_API}/api/tags/create`, {
        name: createTagName,
        color: createTagColor
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })



      setCreateTagName('')

      showSuccesMessage('Метка создана')
      setTimeout(() => { }, 1000);
      window.location.reload()

    } catch (error: any) {
      console.log(error);
      showErrorMessage('Произошла ошибка, попробуйте позже')
    }
  }


  const deleteTag = async (id: any) => {
    try {

      const deleteTag: any = await axios.delete(`${process.env.REACT_APP_API}/api/tags/delete/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      showSuccesMessage('Метка успешно удалена')
      setTimeout(() => { }, 1000);
      window.location.reload()

    } catch (error: any) {
      console.log(error);
      showErrorMessage('Произошла ошибка, попробуйте позже')
    }
  }

  const saveEditTag = async (id: any) => {
    try {

      if (selectTagEditName == '') return showErrorMessage('Имя не может быть пустым')

      const editTag: any = await axios.post(`${process.env.REACT_APP_API}/api/tags/edit`, {
        idTag: id,
        name: selectTagEditName
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      showSuccesMessage('Метка успешно обновлена')
      setTimeout(() => { }, 1200);
      window.location.reload()

    } catch (error: any) {
      console.log(error);
      showErrorMessage('Произошла ошибка, попробуйте позже')
    }
  }


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
            <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: '30px', width: 'fit-content', marginBottom: '10px' }}><p>Метки</p></div>

            <div style={{ height: '38px', display: 'flex', flexDirection: 'row', marginBottom: '25px' }}>

              <div style={{ height: '36px', width: '36px', backgroundColor: createTagColor, borderRadius: '5px', marginRight: '15px' }} />

              <Select options={colorTagsOptions} onChange={(color: any) => setCreateTagColor(color.value)} />

              <input type="text" placeholder='Название метки' style={{ height: '100%', width: '35%', marginLeft: '15px', padding: '10px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e: any) => setCreateTagName(e.target.value)} value={createTagName} />

              <div style={{ width: '18%', backgroundColor: 'dodgerblue', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', overflow: 'hidden', cursor: 'pointer' }} onClick={() => createTag()}>Добавить</div>

            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: tags.length != 0 ? '0.6px solid #D6D6D6' : 'none', borderRadius: '5px', flex: 'wrap' }} >
              {
                tags.length == 0
                  ?
                  <h1>Нет активных меток</h1>
                  :
                  tags.map((tag: any) => (
                    selectTagId != tag.id
                      ?
                      <div key={tag.id} style={{ display: 'flex', alignItems: 'center', padding: '25px', justifyContent: 'space-between' }} onClick={() => {
                        setSelectTagId(tag.id)
                        setSelectTagIdEdit(0)
                      }}>

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <div style={{ height: '22px', width: '22px', backgroundColor: tag.tag_color, borderRadius: '5px', marginRight: '15px' }} />
                          <p style={{ fontSize: '14px' }}>{tag.tag_name}</p>
                        </div>

                        <p style={{ fontSize: '12px', color: '#8F9090' }}>{tag.count} Тендеров</p>
                      </div>
                      :
                      selectTagIdEdit != tag.id
                        ?
                        <div key={tag.id} style={{ display: 'flex', alignItems: 'center', padding: '25px', justifyContent: 'space-between' }} onClick={() => setSelectTagId(tag.id)}>

                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ height: '22px', width: '22px', backgroundColor: tag.tag_color, borderRadius: '5px', marginRight: '15px' }} />
                            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>{tag.tag_name}</p>
                          </div>

                          <div style={{ display: 'flex' }}>
                            <p style={{ fontSize: '12px', marginRight: '15px', cursor: 'pointer' }} onClick={() => {
                              setSelectTagIdEdit(tag.id)
                              setSelectTagEditName(tag.tag_name)
                            }}>Редактировать</p>
                            <p style={{ fontSize: '12px', cursor: 'pointer' }} onClick={async () => await deleteTag(tag.id)}>Удалить</p>
                          </div>
                        </div>
                        :
                        <div key={tag.id} style={{ display: 'flex', alignItems: 'center', padding: '25px', justifyContent: 'space-between' }}>

                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ height: '22px', width: '22px', backgroundColor: tag.tag_color, borderRadius: '5px', marginRight: '15px' }} />
                            <input style={{ fontSize: '14px', width: '200px' }} placeholder='Новое имя метки' value={selectTagEditName} onChange={(e: any) => setSelectTagEditName(e.target.value)} />
                          </div>

                          <div style={{ display: 'flex' }}>
                            <p style={{ fontSize: '12px', marginRight: '15px', display: 'flex', alignItems: 'center', textAlign: 'center', cursor: 'pointer' }} onClick={() => saveEditTag(tag.id)}><FaCheck size={15} />Сохранить</p>
                            <p style={{ fontSize: '12px', cursor: 'pointer' }} onClick={async () => await deleteTag(tag.id)}>Удалить</p>
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
