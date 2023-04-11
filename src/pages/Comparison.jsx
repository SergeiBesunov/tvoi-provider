import React from 'react'
import CardComparison from '../components/CardComparison';
import { useSelector } from 'react-redux';

function Comparison() {
   const { tariffs, totalAdded } = useSelector((state) => state.comparison);

   React.useEffect(()=>{
      window.scrollTo(0,0)
    }, [])

   return (
      <div className="comparisons">
         <h2 className="title2">Сравнение тарифов</h2>

         {totalAdded === 0 ? (
            <div className="comparisons__empty">
               <p className="comparisons__empty-text">Тарифы для сравнения еще не выбраны</p>
            </div>
         ) : (
            <div className="comparisons__tariffs">
               <div className="comparisons__tariffs-bg">
                  <div className="comparisons__tariffs-bg-row"></div>
                  <div className="comparisons__tariffs-bg-row">Абонентская плата</div>
                  <div className="comparisons__tariffs-bg-row">Наличие акций</div>
                  <div className="comparisons__tariffs-bg-row">Абонентская плата по акции</div>
                  <div className="comparisons__tariffs-bg-row">Скорость доступа в интернет</div>
                  <div className="comparisons__tariffs-bg-row">Количество каналов</div>
                  <div className="comparisons__tariffs-bg-row">Количество HD каналов</div>
                  <div className="comparisons__tariffs-bg-row">Мобильный интернет</div>
                  <div className="comparisons__tariffs-bg-row">Мобильная связь</div>
                  <div className="comparisons__tariffs-bg-row">SMS-сообщения</div>
                  <div className="comparisons__tariffs-bg-row">Стоимость подключения</div>
                  <div className="comparisons__tariffs-bg-row">Роутер</div>
                  <div className="comparisons__tariffs-bg-row">Приставка</div>
                  <div className="comparisons__tariffs-bg-row"></div>
               </div>

               <div className="comparisons__tariffs-items-wrapper">
                  <div className="comparisons__tariffs-items">
                    {tariffs.map((obj)=> <CardComparison key={obj.id} {...obj}/>)}
                    
                  </div>
               </div>
            </div>
         )}
      </div>
   );
}

export default Comparison;
