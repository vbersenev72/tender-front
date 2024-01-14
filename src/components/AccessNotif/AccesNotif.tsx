import * as React from 'react';
import { FaRegBell } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';


import './AccesNotif.css'

export function AccesNotif(props: any) {

  const navigate = useNavigate()

  if (props.openAccesNotif) {
    return (
      <div className='acces-notif-container'>
        <div className="acces-notif-content">
          <FaRegBell size={40} />
          <p style={{ padding: '20px' }}>Вам предоставлен ограниченный доступ. Для полного доступа подключите тариф</p>
          <div className='acces-notif-button' onClick={() => navigate('/auth')}>
            <p>Подключить тариф</p>
          </div>
          <div className='acces-notif-cross' onClick={() => props.setOpenAccesNotif(false)}>
            <RxCross1 />
          </div>
        </div>
      </div>
    );
  } else {
    return <></>
  }

}
