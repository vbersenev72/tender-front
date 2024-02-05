import axios from "axios"
import { showErrorMessage, showSuccesMessage } from "./Message"

export const createReportAutoSearch = async (autoSearchId:any) => {
  try {
    if (!autoSearchId) return

    showSuccesMessage('Ожидайте отчёт в течение 2-ух минут')

    const createReport = await axios.post(`${process.env.REACT_APP_API}/api/report/createautosearchreport`, {
        autoSearchId: autoSearchId
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