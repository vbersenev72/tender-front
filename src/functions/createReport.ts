import axios from "axios"
import { showErrorMessage, showSuccesMessage } from "./Message"

export const createReport = async (tenders: any) => {
  try {

    let newTenders = tenders.map((tenderData:any) => {
      if (tenderData.fz == 'fz223') return tenderData.registrationNumber
      if (tenderData.fz == 'fz44') return tenderData.commonInfo.purchaseNumber
    })

    const createReport = await axios.post(`${process.env.REACT_APP_API}/api/report/create`, {
      tenders: [...newTenders]
    }, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    showSuccesMessage('Ожидайте отчёт в течение 2-ух минут')

  } catch (error) {
    showErrorMessage('Произошла ошибка, попробуйте позже')
  }
}