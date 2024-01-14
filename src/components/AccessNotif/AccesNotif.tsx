import * as React from 'react';
import { FaRegBell } from "react-icons/fa";
import './AccesNotif.css'

export function AccesNotif () {
  return (
    <div className='acces-notif-container'>
        <div className="acces-notif-content">
            <FaRegBell size={40}/>
            <p>Вам предоставлен ограниченный доступ. Для полного доступа подключите тариф</p>
            <div>
                <p>Подключить тариф</p>
            </div>
        </div>
    </div>
  );
}
