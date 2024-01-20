import * as React from 'react';
import { useState, useEffect } from 'react';
import Select from 'react-select'
import './TagsPage.css'
import { showErrorMessage, showSuccesMessage } from '../../../functions/Message';
import axios from 'axios';


export interface ITagsPageProps {
}

export function TagsPage(props: ITagsPageProps) {

  const [tags, setTags] = useState<any>([])

  const [createTagColor, setCreateTagColor] = useState('white')
  const [createTagName, setCreateTagName] = useState('')

  useEffect(() => {

    getAllTags()

  }, [])



  const colorTagsOptions = [
    { value: 'red', label: 'Красный', color: 'red' },
    { value: 'blue', label: 'Синий', color: 'red' },
    { value: 'purple', label: 'Пурпурный', color: 'red' },
    { value: 'green', label: 'Зеленый', color: 'red' },
    { value: 'orange', label: 'Оранжевый', color: 'red' },
    { value: 'violet', label: 'Фиолетовый', color: 'red' }
  ]


  const getAllTags = async () => {
    try {

      const getAllTags: any = await axios.get(`${process.env.REACT_APP_API}/api/tags/getall`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      console.log(getAllTags.data.message);

      for (let i = 0; i < getAllTags.data.message.length; i++) {
        const tag = getAllTags.data.message[i];

        const countTenders: any = await axios.post(`${process.env.REACT_APP_API}/api/tags/getcounttenders`, {
          idTag: tag.id
        }, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }).then((data: any) => { setTags([...tags, { ...tag, count: data.message }]) }) ////////////

      }


    } catch (error: any) {
      showErrorMessage(error.data)
    }
  }


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
      setTags([...tags, createTag.createTag])

    } catch (error: any) {
      console.log(error);
      showErrorMessage(error)
    }
  }


  return (
    <div className='TagsPage-container'>
      <div className="TagsPage-content">
        <div style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: '30px', width: 'fit-content', marginBottom: '10px' }}><p>Метки</p></div>

        <div style={{ height: '38px', display: 'flex', flexDirection: 'row' }}>

          <div style={{ height: '36px', width: '36px', backgroundColor: createTagColor, borderRadius: '5px', border: '1px solid gray', marginRight: '15px' }} />

          <Select options={colorTagsOptions} onChange={(color: any) => setCreateTagColor(color.value)} />

          <input type="text" placeholder='Название метки' style={{ height: '100%', width: '40%', marginLeft: '15px', padding: '10px', border: '1px solid gray', borderRadius: '5px' }} onChange={(e: any) => setCreateTagName(e.target.value)} value={createTagName} />

          <div style={{ width: '18%', backgroundColor: 'dodgerblue', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', overflow: 'hidden', cursor: 'pointer' }} onClick={() => createTag()}>Добавить</div>

        </div>

        {/* <div>
          {
            tags.map((tag: any) => {
              <div>{tag.tag_name}</div>
            })
          }
        </div> */}

      </div>
    </div>
  );
}
