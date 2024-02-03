import * as React from 'react';
import { Checkbox } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import './ReadyReports/style.css'
import { showErrorMessage, showSuccesMessage } from '../../../functions/Message';
import axios from 'axios';


export interface IReadyReportsProps {
}

export function ReadyReports(props: IReadyReportsProps) {

  const [reports, setReports] = React.useState<any>([])


  const handleCheckboxChange = (id: any) => {
    const updatedCheckboxes = reports.map((report: any) => {
      if (report.id === id) {
        return {
          ...report,
          delete: !report.delete,
        };
      }
      return report;
    });
    setReports(updatedCheckboxes);
  };


  const handleDeleteChecked = () => {
    const updatedCheckboxes = reports.filter((report: any) => !report.delete);
    setReports(updatedCheckboxes);
  };


  const deleteReports = async () => {
    try {

      for (let i = 0; i < reports.length; i++) {
        const report = reports[i];

        if (report.delete == true) {
          const id = report.id
          const deleteReports = await axios.delete(`${process.env.REACT_APP_API}/api/report/delete/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          const newReports = reports.filter((report: any) => report.id != id)
          setReports([...newReports])
        }

      }

      showSuccesMessage('Отчеты удалены!')

    } catch (error) {
      showErrorMessage('Что то пошло не так, попробуйте позже')
    }
  }

  const deleteAllReports = async () => {
    try {

      for (let i = 0; i < reports.length; i++) {
        const report = reports[i];

          const id = report.id
          const deleteReports = await axios.delete(`${process.env.REACT_APP_API}/api/report/delete/${id}`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`
            }
          })

          setReports([])
      }

      showSuccesMessage('Отчеты удалены!')

    } catch (error) {
      showErrorMessage('Что то пошло не так, попробуйте позже')
    }
  }




  const getReports = async () => {
    try {

      const reports = await axios.get(`${process.env.REACT_APP_API}/api/report/`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      let readyReports = reports.data.message
      readyReports = readyReports.map((report: any) => {
        return { ...report, delete: false }
      })
      console.log(readyReports);


      setReports([...readyReports])

    } catch (error) {
      showErrorMessage('Что то пошло не так, попробуйте позже')
    }
  }

  React.useEffect(() => {
    getReports()
  }, [])

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
          {
            reports.length == 0
              ?
              <h1>Нет готовых отчётов</h1>
              :
              <tbody>
                {
                  reports.map((report: any) => {
                    return (
                      <tr>
                        <td>Скачать <a href={`${process.env.REACT_APP_API}` + `${report.link}`}>{report.link.slice(1, 17)}</a></td>
                        <td>{report.link.slice(7, 17)}</td>
                        <td>      <FormControlLabel control={<Checkbox checked={report.delete} onChange={() => handleCheckboxChange(report.id)} />} label="Удалить" /></td>
                      </tr>
                    )
                  })
                }
              </tbody>
          }
        </table>
      </div>

      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <p style={{ color: '#2F3D4A', padding: '20px', textDecoration: 'underline', cursor: 'pointer' }} onClick={deleteReports}>Удалить выбранные</p>
        <p style={{ color: '#2F3D4A', padding: '20px', textDecoration: 'underline', cursor: 'pointer' }} onClick={deleteAllReports}>Удалить все</p>

      </div>

    </div>
  );
}
