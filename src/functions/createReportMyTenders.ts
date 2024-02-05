import axios from "axios"
import { showErrorMessage, showSuccesMessage } from "./Message"

export const createReportMyTender = async () => {
  try {


    showSuccesMessage('Ожидайте отчёт в течение 2-ух минут')

    const createReport = await axios.post(`${process.env.REACT_APP_API}/api/report/createmytendersreport`, {
       
    }, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    showSuccesMessage('Отчёт готов!')

  } catch (error) {
    showErrorMessage('Ошибка создания отчёта, попробуйте позже')
  }
}