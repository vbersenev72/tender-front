import React from 'react';
import { FaBell } from 'react-icons/fa';

function BellIcon({ count }:any) {
  return (
    <div style={{ position: 'relative', margin: '5px', display: 'grid', grid: 'center', cursor: 'pointer' }}>
      <FaBell size={24} color='dodgerblue'/>
      {count > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: 'red',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
          }}
        >
          {count}
        </div>
      )}
    </div>
  );
}

export default BellIcon;