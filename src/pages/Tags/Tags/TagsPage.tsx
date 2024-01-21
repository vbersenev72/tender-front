import * as React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select'
import './TagsPage.css'
import { showErrorMessage, showSuccesMessage } from '../../../functions/Message';
import axios from 'axios';
import { LoaderTest } from '../../../styles';
import { TailSpin } from 'react-loader-spinner';


export interface ITagsPageProps {
}

export function TagsPage(props: ITagsPageProps) {

  const [tags, setTags] = useState<any>([])

  const [loading, setLoading] = useState(false)

  const [createTagColor, setCreateTagColor] = useState('white')
  const [createTagName, setCreateTagName] = useState('')

  const [flag, setFlag] = useState(false)

  const changeFlag = () => {
    setFlag(!flag)
  }

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
        showErrorMessage(error.data);
      }
    };

    getAllTags();

  }, [flag]);




  const colorTagsOptions = [
    { value: 'red', label: 'Красный', color: 'red' },
    { value: 'blue', label: 'Синий', color: 'red' },
    { value: 'purple', label: 'Пурпурный', color: 'red' },
    { value: 'green', label: 'Зеленый', color: 'red' },
    { value: 'orange', label: 'Оранжевый', color: 'red' },
    { value: 'violet', label: 'Фиолетовый', color: 'red' }
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
      showErrorMessage(error)
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: tags.length != 0 ? '1px solid #c3bfbf' : 'none', borderRadius: '5px', flex: 'wrap' }} >
              {
                tags.length == 0
                  ?
                  <h1>Нет активных меток</h1>
                  :
                  tags.map((tag: any) => (
                    <div key={tag.id} style={{ display: 'flex', alignItems: 'center', padding: '25px', justifyContent: 'space-between' }}>

                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ height: '22px', width: '22px', backgroundColor: tag.tag_color, borderRadius: '5px', marginRight: '15px' }} />
                        <p style={{ fontSize: '14px' }}>{tag.tag_name}</p>
                      </div>

                      <p style={{ fontSize: '12px' }}>{tag.count} Тендеров</p>
                    </div>
                  ))}
            </div>

          </div>
        </div>
      }
    </>

  );
}
