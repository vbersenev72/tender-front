import * as React from 'react';
import { useState } from 'react';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { showErrorMessage, showSuccesMessage } from '../../../functions/Message';
import axios from 'axios';

export interface IFeedBacksProps {
}

export default function FeedBacks(props: IFeedBacksProps) {

  const [showAnswer, setShowAnswer] = useState(0)
  const [text, setText] = useState('')

  const PopularQuestions: any = [
    {
      id: 1,
      question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, asperiores? Quis beatae exercitationem asperiores voluptate fugiat doloremque culpa quam suscipit?',
      answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe rem earum laboriosam dignissimos cumque, illo debitis quasi inventore commodi velit esse, distinctio culpa! Laboriosam voluptate labore eaque, consectetur rem dignissimos vitae repellendus vero, sapiente aut, error nobis ipsam asperiores odit quasi consequuntur iusto recusandae quidem consequatur accusamus nisi. Numquam iste natus itaque corrupti ab. Dicta eos, odio ex ipsa similique asperiores assumenda repellendus aliquid iste dolore, perferendis quidem in quaerat.'
    },
    {
      id: 2,
      question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, asperiores? Quis beatae exercitationem asperiores voluptate fugiat doloremque culpa quam suscipit?',
      answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe rem earum laboriosam dignissimos cumque, illo debitis quasi inventore commodi velit esse, distinctio culpa! Laboriosam voluptate labore eaque, consectetur rem dignissimos vitae repellendus vero, sapiente aut, error nobis ipsam asperiores odit quasi consequuntur iusto recusandae quidem consequatur accusamus nisi. Numquam iste natus itaque corrupti ab. Dicta eos, odio ex ipsa similique asperiores assumenda repellendus aliquid iste dolore, perferendis quidem in quaerat.'
    },
    {
      id: 3,
      question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, asperiores? Quis beatae exercitationem asperiores voluptate fugiat doloremque culpa quam suscipit?',
      answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe rem earum laboriosam dignissimos cumque, illo debitis quasi inventore commodi velit esse, distinctio culpa! Laboriosam voluptate labore eaque, consectetur rem dignissimos vitae repellendus vero, sapiente aut, error nobis ipsam asperiores odit quasi consequuntur iusto recusandae quidem consequatur accusamus nisi. Numquam iste natus itaque corrupti ab. Dicta eos, odio ex ipsa similique asperiores assumenda repellendus aliquid iste dolore, perferendis quidem in quaerat.'
    },
    {
      id: 4,
      question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, asperiores? Quis beatae exercitationem asperiores voluptate fugiat doloremque culpa quam suscipit?',
      answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe rem earum laboriosam dignissimos cumque, illo debitis quasi inventore commodi velit esse, distinctio culpa! Laboriosam voluptate labore eaque, consectetur rem dignissimos vitae repellendus vero, sapiente aut, error nobis ipsam asperiores odit quasi consequuntur iusto recusandae quidem consequatur accusamus nisi. Numquam iste natus itaque corrupti ab. Dicta eos, odio ex ipsa similique asperiores assumenda repellendus aliquid iste dolore, perferendis quidem in quaerat.'
    },
    {
      id: 5,
      question: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet, asperiores? Quis beatae exercitationem asperiores voluptate fugiat doloremque culpa quam suscipit?',
      answer: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe rem earum laboriosam dignissimos cumque, illo debitis quasi inventore commodi velit esse, distinctio culpa! Laboriosam voluptate labore eaque, consectetur rem dignissimos vitae repellendus vero, sapiente aut, error nobis ipsam asperiores odit quasi consequuntur iusto recusandae quidem consequatur accusamus nisi. Numquam iste natus itaque corrupti ab. Dicta eos, odio ex ipsa similique asperiores assumenda repellendus aliquid iste dolore, perferendis quidem in quaerat.'
    },

  ]


  async function giveFeedbackEmail() {
    try {

      const send = await axios.post(`${process.env.REACT_APP_API}/api/lk/sendtogivefeedback`, {
        text: text
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      showSuccesMessage(send.data.message)

      setText('')

    } catch (error:any) {
      console.log(error);
      showErrorMessage(error.data.response.data.message)
    }
  }

  return (
    <div className='personal-menu-content-property'>
      <div style={{ marginBottom: '30px', textAlign: 'center', alignItems: 'center', justifyContent: 'center', marginTop: '30px' }}>
        <p>Обращайтесь к нам по любому возникшему вопросу, одним из удобных вам способом</p>
      </div>

      <div style={{ display: 'flex', width: '60%', justifyContent: "space-between", marginBottom: '50px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <img src="https://i.ibb.co/LhMS6by/25-01-2024-183320.jpg" alt="" width={'90px'} height={'90px'} />
          <p>Позвоните нам!</p>
          <p>Звонки по всей России бесплатны!</p>
          <p>8 800 4456-78-43</p>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
          <img src="https://i.ibb.co/0DQxwSD/25-01-2024-183137.jpg" alt="" width={'90px'} height={'90px'} />
          <p>Напишите свой вопрос</p>
          <p>на электронную почту</p>
          <p>help@TENDER.ru</p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', width: '40%', }}>
        <p>Опишите свою проблему или задайте вопрос</p>

        <textarea style={{ height: '150px', writingMode: 'horizontal-tb', }} onChange={(e: any) => setText(e.target.value)} value={text}/>
        <br />

        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div onClick={giveFeedbackEmail} style={{ display: 'flex', width: '30%', height: '50px', backgroundColor: 'dodgerblue', color: 'white', cursor: 'pointer', alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
            <p>Отправить</p>
          </div>
        </div>

      </div>

      <br />
      <br />
      <br />
      <br />


      <p style={{ fontSize: '22px', fontWeight: 'normal' }}>Частые вопросы</p>

      <br />
      <br />

      <div style={{ width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center' }}>
        {
          PopularQuestions.map((question: any) => {
            if (showAnswer != question.id) {
              return (
                <div key={question.id} style={{
                  width: '100%',
                  padding: '15px',
                  border: '0.6px dodgerblue solid',
                  marginBottom: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <p>{question.id}. {question.question}</p>
                  <div style={{ cursor: 'pointer' }} onClick={() => setShowAnswer(question.id)}>
                    <SlArrowDown size={25} />
                  </div>
                </div>
              )
            } else {
              return (
                <div style={{
                  width: '100%',
                  border: '0.6px dodgerblue solid',
                  marginBottom: '10px',
                }}>
                  <div key={question.id} style={{
                    width: '100%',
                    padding: '15px',
                    borderBottom: '0.6px dodgerblue solid',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <p>{question.id}. {question.question}</p>
                    <div style={{ cursor: 'pointer' }} onClick={() => setShowAnswer(0)}>
                      <SlArrowUp size={25} />
                    </div>
                  </div>

                  <div key={question.id} style={{
                    width: '100%',
                    padding: '15px',
                    // border: '0.6px dodgerblue solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <p>{question.answer}</p>
                  </div>

                </div>
              )
            }
          })
        }
      </div>
      <br />
      <br />



    </div>
  );
}
