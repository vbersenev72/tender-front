import * as React from 'react';

export interface ITarrifsProps {
}

export default function Tarrifs(props: ITarrifsProps) {

  const [clickTariff, setClickTariff] = React.useState(0)

  const tarrifsList: any = [
    {
      id: 1,
      name: 'Тестовый',
      description: 'При тарифе стандарт доступны все разделы за исключением Аналитика (раздел о конкурентах)',
      price: 'Бесплатно'
    },
    {
      id: 2,
      name: 'Стандарт',
      description: 'При тарифе стандарт доступны все разделы за исключением Аналитика (раздел о конкурентах)',
      price: '340 руб/мес'
    },
    {
      id: 3,
      name: 'VIP',
      description: 'При тарифе VIP доступно все, включая аналитику',
      price: '450 руб/мес'
    },
  ]


  return (
    <div className='personal-menu-content-property'>
      <br />
      <br />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '60%', }}>
        {
          tarrifsList.map((tarrif: any) => {
            if (tarrif.id == clickTariff) {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '30%', border: '2px solid dodgerblue', flexDirection: 'column', textAlign: 'center', height: '350px', borderRadius: '5px' }}
                onClick={()=>setClickTariff(tarrif.id)}
                >

                  <p style={{
                    color: 'dodgerblue',
                    fontWeight: 'bold',
                    fontSize: '22px',
                    marginTop: '20px'
                  }}>{tarrif.name}</p>

                  <p>{tarrif.price}</p>

                  <p style={{ fontSize: '13px' }}>{tarrif.description}</p>

                  <div style={{
                    backgroundColor: 'white',
                    width: 'fit-content',
                    padding: '10px 18px 10px 18px',
                    borderRadius: '5px',
                    border: 'dodgerblue 1px solid',
                    color: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: '30px',
                    cursor: 'pointer'
                  }}>
                    <p>Подключить</p>
                  </div>
                </div>
              )
            } else {
              return (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '30%', border: '0.6px solid gray', flexDirection: 'column', textAlign: 'center', height: '350px', borderRadius: '5px' }}
                onClick={()=>setClickTariff(tarrif.id)}
                >

                  <p style={{
                    color: 'dodgerblue',
                    fontWeight: 'bold',
                    fontSize: '22px',
                    marginTop: '20px'
                  }}>{tarrif.name}</p>

                  <p>{tarrif.price}</p>

                  <p style={{ fontSize: '13px' }}>{tarrif.description}</p>

                  <div style={{
                    backgroundColor: 'dodgerblue',
                    width: 'fit-content',
                    padding: '10px 18px 10px 18px',
                    borderRadius: '5px',
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    marginBottom: '30px',
                    cursor: 'pointer'
                  }}>
                    <p>Подключить</p>
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
