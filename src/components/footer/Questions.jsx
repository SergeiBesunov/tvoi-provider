import React from 'react'

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeCategory } from '../../redux/slices/filterSlice'
import { scrollToElement } from '../../utils/scrollFunc'

import Dropdown from "./Dropdown";

function Questions() {
   const DOM_ElementForm = React.useRef(null)
   const navigate = useNavigate()
   const dispatch = useDispatch()

React.useEffect(()=>{
   DOM_ElementForm.current = document.querySelector(`.form-connect`)
}, [])


   const quesDropdowns1 = [
      {
         title: 'У меня проблема с интернетом, ТВ или оборудованием, вы можете мне помочь?',
         text: 'К сожалению, мы не можем решить вашу проблему, так как мы работаем только с новыми подключениями. Однако мы можем помочь вам выбрать другого провайдера и подключить его услуги по выгодной цене',
      },
      {
         title: 'Почему мне стоит выбрать ваш сервис?',
         text: 'Твой провайдер предоставляет возможность сравнения всех актуальных тарифных планов без переплат по всем федеральным провайдерам. Вы можете объективно оценить бонусы от каждого из провайдеров, а наши операторы ответят на все интересующие вопросы и помогут определиться с выбором.',
      },
      {
         title: 'Я делаю ремонт и хочу сделать предмонтаж интернета и ТВ, это возможно?',
         text: 'Ряд провайдеров предоставляют такую возможность. Условия предоставления данной услуги отличаются. Оставьте заявку для детальной консультации',
      },
   ];

   const quesDropdowns2 = [
      {
         title: 'Я переезжаю на новый адрес, я могу сохранить свой лицевой счёт?',
         text: 'Если по новому адресу есть техническая возможность подключения к сети этого провайдера, наши специалисты проконсультируют Вас и оформят заявку, если нет — предложат альтернативное подключение.',
      },
      {
         title: 'Сколько стоит подключение?',
         text: 'Стоимость подключения у разных провайдеров отличается, оставьте заявку и наши специалисты проконсультируют Вас по стоимости подключения интересующего Вас провайдера. Также вы можете посмотреть стоимость подключения на странице выбранного тарифа',
      },
      {
         title: 'У меня есть свой роутер, я могу его использовать?',
         text: ' Да, если он соответствует техническим требованиям. Также важным фактором является то,приобретали Вы его самостоятельно или он остался у Вас от другого провайдера.Если у Вас нет подходящего роутера, большинство провайдеров предоставляют его в аренду или рассрочку. Оставьте заявку, и наши специалисты проконсультируют Вас',
      },
   ];

   const openPageTariffs = (value) => {
      dispatch(changeCategory(value))
      navigate('/tariffs')
 }

   return (
      <div className="questions">
         <div className="questions-container">
            <h2 className="title2">Нас часто справшивают</h2>
            <div className="questions__blocks">
               <div className="questions__block">
                {quesDropdowns1.map((obj, i) => <Dropdown key={i} {...obj}/>)}
               </div>
               <div className="questions__block">
               {quesDropdowns2.map((obj, i) => <Dropdown key={i} {...obj}/>)}
               </div>
            </div>
            <div className="questions__buttons">
               <div className="questions__button-block">
                  <button className="blue-button" onClick={()=>scrollToElement(DOM_ElementForm.current)}>Оставить заявку</button>
               </div>
               <div className="questions__button-block">
                  <button className="white-button" onClick={()=>openPageTariffs('all')}>Смотреть тарифы</button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Questions;
