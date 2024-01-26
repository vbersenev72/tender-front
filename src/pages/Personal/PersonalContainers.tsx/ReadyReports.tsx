import * as React from 'react';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import './ReadyReports/style.css'


export interface IReadyReportsProps {
}

export function ReadyReports(props: IReadyReportsProps) {
  return (
    <div className='personal-menu-content-property'>

      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-start'
      }}>
        <p style={{ color: '#909EBB', padding: '20px' }}>Отчеты хранятся 2 месяца с даты создания</p>
      </div>

      <div style={{
        width: '100%',
        padding: '20px'
      }}>
        <table className='report-table'>
          <thead>
            <tr>
              <th>Отчет</th>
              <th>Дата создания</th>
              <th>Удаление</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Скачать <a href="link_to_excel_file">Excel-2019-08-24 19:34:44</a></td>
              <td>24.08.2019</td>
              <td>      <FormControlLabel control={<Checkbox defaultChecked />} label="Удалить" /></td>
            </tr>
            <tr>
              <td>Скачать <a href="link_to_excel_file">Excel-2019-08-25 19:34:44</a></td>
              <td>25.08.2019</td>
              <td>      <FormControlLabel control={<Checkbox defaultChecked />} label="Удалить" /></td>
            </tr>
            <tr>
              <td>Скачать <a href="link_to_excel_file">Excel-2019-08-26 19:34:44</a></td>
              <td>26.08.2019</td>
              <td>      <FormControlLabel control={<Checkbox defaultChecked />} label="Удалить" /></td>
            </tr>
            <tr>
              <td>Скачать <a href="link_to_excel_file">Excel-2019-08-26 19:34:44</a></td>
              <td>26.08.2019</td>
              <td>      <FormControlLabel control={<Checkbox defaultChecked />} label="Удалить" /></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <p style={{ color: '#2F3D4A', padding: '20px', textDecoration: 'underline', cursor: 'pointer' }} >Удалить выбранные</p>
        <p style={{ color: '#2F3D4A', padding: '20px', textDecoration: 'underline', cursor: 'pointer' }}>Удалить все</p>

      </div>

    </div>
  );
}
