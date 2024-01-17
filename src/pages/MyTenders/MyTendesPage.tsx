import * as React from 'react';
import { LoaderTest } from '../../styles';
import { TailSpin } from 'react-loader-spinner';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { showErrorMessage, showSuccesMessage } from '../../functions/Message';
import { TextBlack22pxRegular } from '../../constants/fonts';
import './MyTendersPage.css'
import { SiMicrosoftexcel } from "react-icons/si";
import { RiFileExcel2Line } from "react-icons/ri";
import { MyTendersList } from '../../components/MyTendersComponents/MyTendersList/MyTendersList';


export interface IMyTendersPageProps {
}

export function MyTendersPage(props: IMyTendersPageProps) {

  const [loading, setLoading] = useState(false)


  return (
    <div>
        <div className='Mytenders-container'>

          <div className='Mytenders-content'>
            <div className="Mytenders-preview">
              <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '30px', width: 'fit-content'}}><p>Мои тендеры</p></div>
              <div className="preview-properties">
                <div className="preview-property"><p>Все</p></div>
                <div className="preview-property"><p>Текущие</p></div>
                <div className="preview-property"><p>Завершенные</p></div>
                <div className="preview-property"><p>За период</p></div>
              </div>
            </div>

            <div className="Mytenders-sort">
              <div className='Mytenders-sort-list'>
                <div style={{ color: 'gray', paddingLeft: '0px', display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '15px' }}><p>Сортировать по</p></div>
                <div className="sort-property"><p>Дата добавления в мои тендеры</p></div>
                <div className="sort-property"><p>Дата начала подачи заявок</p></div>
                <div className="sort-property"><p>Цена</p></div>
                <div className="sort-property"><p>Дата окончания</p></div>
                <div className="sort-property"><p>Дата публикации</p></div>
              </div>
              <div style={{display:'flex', justifyContent: 'center', alignItems: 'center', padding: '15px', float: 'right'}}>
              <RiFileExcel2Line size={30} color='#3294F4' />
              </div>
            </div>
            <br />
            
            <MyTendersList/>
          </div>

        </div>
    </div>
  );
}
