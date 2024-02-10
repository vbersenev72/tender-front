import * as React from 'react';
import { FaRegBell } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';


import './AccesNotif.css'
import { MenuContext } from '../../MenuContext';

export function AccesNotif(props: any) {

  const navigate = useNavigate()

  const { openMenu, setOpenMenu }: any = React.useContext(MenuContext);

  if (props.openAccesNotif) {
    return (
      <div>
        <div className='acces-notif-container' style={{width: openMenu ? '80%' : '100%'}}>
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
      </div>
    );
  } else {
    return <></>
  }

}
