import React from 'react';

import Questions from './Questions';
import FooterConnectForm from '../FooterConnectForm';
import { useDispatch } from 'react-redux';
import { toggleModalPolicy } from '../../redux/slices/modalSlices';

function Footer() {
   const dispatch = useDispatch();

   const openModalPolicy = () => {
      dispatch(toggleModalPolicy(true));
   };

   const [visibilityForm, setVisibilityForm] = React.useState(true);

   return (
      <div className="footer">
         <Questions />

         <div className="footer-info">
            <div className="footer-info-container">
               <div className="footer-info__columns">
                  <div className="footer-info__col">
                     <h3 className="footer-info__col-title">
                        <span>9</span> лет
                     </h3>
                     <p>сотрудничества с ведущими провайдерами страны</p>
                  </div>
                  <div className="footer-info__col">
                     <h3 className="footer-info__col-title">
                        <span>89</span> регионов
                     </h3>
                     <p>в которых мы подключаем интернет и ТВ</p>
                  </div>
                  <div className="footer-info__col">
                     <h3 className="footer-info__col-title">
                        <span>468470</span>
                     </h3>
                     <p>абонентов, которых мы уже подключили</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="connect">
            <div className="connect-container">
               <div className="connect-top">
                  <h2 className="connect-title">Подключиться проще, чем Вы думаете</h2>
                  <p className="connect-text">
                     Вам нужно всего лишь выбрать интересующие Вас услуги, а остальное мы сделаем за
                     Вас.
                  </p>
                  <div className="connect__actions">
                     <div className="connect__actions-col">
                        <h2>01.</h2>
                        <h3>Заявка</h3>
                        <p className="connect-text">
                           Оформите заявку онлайн или позвоните нам на бесплатную горячую линию
                        </p>
                     </div>
                     <div className="connect__actions-col">
                        <h2>02.</h2>
                        <h3>Звонок оператора</h3>
                        <p className="connect-text">
                           Наши специалисты проконсультируют Вас и оформят заявку на подключение
                        </p>
                     </div>
                     <div className="connect__actions-col">
                        <h2>03.</h2>
                        <h3>Подключение</h3>
                        <p className="connect-text">
                           В удобное для Вас время монтажник подключит выбранные Вами услуги
                        </p>
                     </div>
                  </div>
               </div>

               <div className="connect-bot">
                  <h2 className="connect-title">Не определились с тарифом?</h2>
                  <p className="connect-text">
                     Наши специалисты всегда готовы помочь Вам с выбором тарифа и рассказать об
                     особенностях подключения разных провайдеров. Просто позвоните нам на бесплатную
                     горячую линию или закажите обратный звонок.
                  </p>
                  <div className="connect__buttons">
                     <button className={`connect__button ${!visibilityForm && `but--active`}`} onClick={()=>setVisibilityForm(false)}>Позвонить специалисту</button>
                     <button className={`connect__button ${visibilityForm && `but--active`}`} onClick={()=>setVisibilityForm(true)}>Обратный звонок</button>
                  </div>
               </div>

               {visibilityForm ? (
                  <div className="form-wrapper">
                     <FooterConnectForm />
                  </div>
               ) : (
                  <div className="connect__call">
                     <h2>Пожалуйста, позвоните по телефону бесплатной горячей линии</h2>
                     <p>8 (800) 551-90-53</p>
                  </div>
               )}

            </div>
         </div>

         <div className="footer-bot">
            <div className="footer-bot-container">
               <div className="footer-bot__columns">
                  <button onClick={openModalPolicy}>Политика конфиденциальности</button>
                  <button>О компании</button>
                  <button>Таблица адресов</button>
               </div>
               <p className="footer-bot__text">
                  © 2021 tvoi-provider.ru - официальный партнёрский сайт ИП Александрин Сергей Николаевич
                  (ОГРНИП: 5674289399393942 / ИНН: 92929376467232). Вся информация на
                  сайте размещена на основании партнерских договоров с провайдерами услуг связи.
                  Посещая сайт tvoi-provider.ru, Вы предоставляете согласие на обработку данных о
                  посещении Вами сайта tvoi-provider.ru (данные cookies и иные пользовательские данные),
                  сбор которых осуществляется на условиях Политики обработки персональных данных.
                  Указанные данные могут быть использованы для их последующей обработки системами
                  Google Analytics, Яндекс.Метрика и др., которая осуществляется с целью
                  функционирования сайта tvoi-provider.ru. Отправляя заявку, Вы принимаете{' '}
                  <button onClick={openModalPolicy}>Политику конфиденциальности</button> и даёте
                  согласие на обработку Ваших персональных данных
               </p>
               <p className="footer-bot__map">
                  <a href="/">Карта сайта</a>
               </p>
            </div>
         </div>
      </div>
   );
}

export default Footer;
