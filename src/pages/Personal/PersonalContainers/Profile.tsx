import * as React from 'react';
import './Profile/style.css'
import { Checkbox, FormControlLabel } from '@mui/material';
import { CiStar } from "react-icons/ci";
import { GiWallet } from "react-icons/gi";
import { showErrorMessage, showSuccesMessage } from '../../../functions/Message';
import { LoaderTest } from '../../../styles';
import { TailSpin } from 'react-loader-spinner';
import axios from 'axios';
import { useFetcher } from 'react-router-dom';


export interface IProfileProps {
}

export function Profile(props: IProfileProps) {

  const [userInfo, setUserInfo] = React.useState<any>()
  const [loading, setLoading] = React.useState(true)

  const [name, setName] = React.useState<any>('')
  const [phone, setPhone] = React.useState<any>('')
  const [email, setEmail] = React.useState<any>('')


  const [oldPass, setOldPass] = React.useState<any>('')
  const [newPass, setNewPass] = React.useState<any>('')
  const [reEnterNewPass, setReEnterNewPass] = React.useState<any>('')

  const [companyName, setCompanyName] = React.useState<any>('')
  const [companyInn, setCompanyInn] = React.useState<any>('')
  const [companyAddress, setCompanyAddress] = React.useState<any>('')
  const [companyPostAddress, setCompanyPostAddress] = React.useState<any>('')

  const [pushNotif, setPushNotif] = React.useState<any>()
  const [emailNotif, setEmailNotif] = React.useState<any>()

  const getUserInfo = async () => {
    try {

      setLoading(true)
      const user = await axios.post(`${process.env.REACT_APP_API}/api/auth/auth`, {}, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const userData = user.data.user
      console.log(userData);


      setName(userData.name)
      setPhone(userData.phone)
      setEmail(userData.email)
      setCompanyName(userData.company_name)
      setCompanyInn(userData.company_inn)
      setCompanyAddress(userData.company_address)
      setCompanyPostAddress(userData.post_address)
      setPushNotif(userData.push_notif)
      setEmailNotif(userData.email_notif)



      setUserInfo(userData)

      setLoading(false)

    } catch (error) {
      showErrorMessage('Что то пошло не так, попробуйте позже')
    }
  }

  const editProfile = async () => {
    try {

      const editProfile = await axios.post(`${process.env.REACT_APP_API}/api/lk/profile`, {
        name: name,
        phone: phone,
        email: email,
        companyName: companyName,
        companyInn: companyInn,
        companyAddress: companyAddress,
        postAddress: companyPostAddress,
        pushNotif: pushNotif,
        emailNotif: emailNotif,
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      return showSuccesMessage('Профиль обновлён!')


    } catch (error) {
      showErrorMessage('Произошла ошибка, попробуйте позже!')
    }
  }

  const changePassword = async () => {
    try {

      const changePassword = await axios.post(`${process.env.REACT_APP_API}/api/lk/changepass`, {
        oldPassword: oldPass,
        newPassword: newPass,
        copyNewPassword: reEnterNewPass
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      showSuccesMessage('Пароль изменён!')

      setOldPass('')
      setNewPass('')
      setReEnterNewPass('')

    } catch (error: any) {

      console.log(error.response.data.message);
      return showErrorMessage(error.response.data.message)
    }
  }

  const getDate = () => {

    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const formattedDate = `${day < 10 ? '0' + day : day}.${month < 10 ? '0' + month : month}.${year}`;

    return formattedDate
  }


  React.useEffect(() => {
    getUserInfo().then(() => console.log(userInfo))

  }, [])

  return (
    <div className='personal-menu-content-property'>
      {
        loading
          ?
          (
            <LoaderTest>
              <TailSpin color="#3294F4" height={150} width={150} />
            </LoaderTest>
          )
          :
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}>
            <div style={{
              width: '50%',
              padding: '20px'
            }}>

              <p style={{
                color: 'dodgerblue',
                fontSize: '20px'
              }}>Основная информация</p>
              <br />
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '40px' }}>ФИО</p>
                <input type="text" style={{ width: '100%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} value={name && name} onChange={(e: any) => setName(e.target.value)} />
              </div>
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '10px' }}>Телефон</p>
                <input type="text" style={{ width: '100%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} value={phone && phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '30px' }}>Почта</p>
                <input type="text" style={{ width: '100%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} value={email} onChange={(e: any) => setEmail(e.target.value)} />
              </div>
              <br />


              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  border: '0.8px solid dodgerblue',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  padding: '10px 20px 10px 20px',
                  width: 'fit-content'
                }}
                  onClick={() => editProfile()}
                >
                  <p>Сохранить</p>
                </div>
              </div>

              <br />
              <br />
              {/* ///////////////////// */}
              <p style={{
                color: 'dodgerblue',
                fontSize: '20px'
              }}>Изменить пароль</p>
              <br />
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '22px' }}>Старый пароль</p>
                <input type="text" style={{ width: '80%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} onChange={(e: any) => setOldPass(e.target.value)} />
              </div>
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '28px' }}>Новый пароль</p>
                <input type="text" style={{ width: '80%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} onChange={(e: any) => setNewPass(e.target.value)} />
              </div>
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '0' }}>Повторить пароль</p>
                <input type="text" style={{ width: '80%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} onChange={(e:any)=>setReEnterNewPass(e.target.value)} />
              </div>
              <br />

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  border: '0.8px solid dodgerblue',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  padding: '10px 20px 10px 20px',
                  width: 'fit-content'
                }}
                  onClick={changePassword}
                >
                  <p>Сохранить</p>
                </div>
              </div>
              {/* ///////////////////// */}
              <br />
              <br />

              <p style={{
                color: 'dodgerblue',
                fontSize: '20px'
              }}>Информация о компании</p>
              <br />
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '60px' }}>Название</p>
                <input type="text" style={{ width: '100%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} value={companyName && companyName} onChange={(e: any) => setCompanyName(e.target.value)} />
              </div>
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '100px' }}>ИНН</p>
                <input type="text" style={{ width: '100%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} value={companyInn && companyInn} onChange={(e: any) => setCompanyInn(e.target.value)} />
              </div>
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '5px' }}>Юридический адрес</p>
                <input type="text" style={{ width: '100%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} value={companyAddress && companyAddress} onChange={(e: any) => setCompanyAddress(e.target.value)} />
              </div>
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <p style={{ marginRight: '30px' }}>Почтовый адрес</p>
                <input type="text" style={{ width: '100%', height: '30px', border: '0.6px solid gray', borderRadius: '3px' }} value={companyPostAddress && companyPostAddress} onChange={(e: any) => setCompanyPostAddress(e.target.value)} />
              </div>
              <br />


              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  textAlign: 'center',
                  alignItems: 'center',
                  border: '0.8px solid dodgerblue',
                  borderRadius: '5px',
                  backgroundColor: 'white',
                  cursor: 'pointer',
                  padding: '10px 20px 10px 20px',
                  width: 'fit-content'
                }}
                  onClick={() => editProfile()}
                >
                  <p>Сохранить</p>
                </div>
              </div>

              <br />
              <br />
              {/* ///////////////////// */}

              <p style={{
                color: 'dodgerblue',
                fontSize: '20px'
              }}>Уведомления</p>
              <br />
              <br />

              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <FormControlLabel control={<Checkbox defaultChecked={emailNotif && emailNotif} />} label="Включить e-mail уведомления" />
              </div>


              <div style={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between'
              }}>
                <FormControlLabel control={<Checkbox defaultChecked={pushNotif && pushNotif} />} label="Включить Push уведомления" />
              </div>
              <br />


            </div>


            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              <div style={{ display: 'flex', justifyContent: 'center', }}>

                <div style={{
                  padding: '20px',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'column',
                  display: 'flex'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                    <GiWallet color='dodgerblue' size={30} />
                    <p style={{
                      marginLeft: '8px'
                    }}>Баланс</p>
                  </div>
                  <br />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                    marginLeft: '0',
                    flexDirection: 'column'
                  }}>
                    <h3 style={{ display: 'flex', justifyContent: 'flex-start' }}>{userInfo.balance ? userInfo.balance : 0} руб.</h3>
                    <p style={{ display: 'flex', justifyContent: 'flex-start', color: '#909EBB', fontSize: '12px' }}>Текущий баланс на {getDate()}</p>
                  </div>

                  <br />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '100%'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '10px 22px 10px 22px',
                      backgroundColor: 'dodgerblue',
                      color: 'white',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}>
                      <p>Пополнить</p>
                    </div>
                  </div>

                </div>



                <div style={{
                  padding: '20px',
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'column',
                  display: 'flex'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    width: '100%'
                  }}>
                    <CiStar color='dodgerblue' size={30} />
                    <p style={{
                      marginLeft: '8px'
                    }}>Тариф</p>
                  </div>

                  <br />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    width: '100%',
                    marginLeft: '0',
                    flexDirection: 'column',
                    height: '42px'
                  }}>
                    <h3 style={{ display: 'flex', justifyContent: 'flex-start' }}>{
                      userInfo.tariff == 'test' ? 'Тестовый' : userInfo.tariff == 'std' ? 'Стандарт' : 'VIP'
                    }</h3>
                  </div>

                  <br />

                  <div style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '100%'
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      padding: '10px 22px 10px 22px',
                      backgroundColor: 'dodgerblue',
                      color: 'white',
                      borderRadius: '5px',
                      cursor: 'pointer'
                    }}>
                      <p>Изменить</p>
                    </div>
                  </div>

                </div>

              </div>
              <br />
              <br />
              <br />

              <div style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  padding: '10px 22px 10px 22px',
                  backgroundColor: 'dodgerblue',
                  color: 'white',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  width: '50%'
                }}>
                  <p>Подключить демо доступ</p>
                </div>
              </div>
            </div>

          </div>
      }

    </div>
  );
}
