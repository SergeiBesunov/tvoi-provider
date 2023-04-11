import React from 'react'
import imgTel from '../assets/icon-svg/tel.svg'
import imgLocation from '../assets/icon-svg/addr.svg'

function Contacts(){

   React.useEffect(()=>{
      window.scrollTo(0,0)
    }, [])

    return(
        <div className="contacts">
        <div className="contacts-container">

           <div className="contacts__info">
              <h2 className="title2">Контакты</h2>

              <div className="contacts__info-row">
                 <img src={imgTel} alt="img"/>
                 <div className="contacts__info-row-block">
                    <p>Адрес офиса:</p>
                    <h3>Россия, Новосибирск, Серебренниковская улица, 20, офис 602.</h3>
                 </div>
              </div>

              <div className="contacts__info-row">
                 <img src={imgLocation} alt="img"/>
                 <div className="contacts__info-row-block">
                    <p>Телефон подключения:</p>
                    <h3>8 (800) 558-92-52</h3>
                 </div>
              </div>
           </div>

           <div className="contacts__map">
              <div style={{position: 'relative', overflow: 'hidden'}}>
                 <a href="https://yandex.ru/maps/65/novosibirsk/?utm_medium=mapframe&utm_source=maps" style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '0px'}}>Новосибирск</a>
                 <a href="https://yandex.ru/maps/65/novosibirsk/?ll=82.927375%2C55.024322&mode=whatshere&utm_medium=mapframe&utm_source=maps&whatshere%5Bpoint%5D=82.926452%2C55.024529&whatshere%5Bzoom%5D=17&z=17" style={{color: '#eee', fontSize: '12px', position: 'absolute', top: '14px'}}>Серебренниковская улица, 20 — Яндекс Карты</a>
                 <iframe src="https://yandex.ru/map-widget/v1/?ll=82.927375%2C55.024322&mode=whatshere&whatshere%5Bpoint%5D=82.926452%2C55.024529&whatshere%5Bzoom%5D=17&z=17" width="100%" height="400" frameBorder="1" allowFullScreen={true} style={{position: 'relative'}} title='map'></iframe>
              </div>
           </div>

           <div className="contacts__button">
              <button className="blue-button">Обратный звонок</button>
           </div>
        </div>

     </div>
    )
}

export default Contacts 