import React from 'react';
import { Link } from 'react-router-dom';

import { scrollToElement } from '../../utils/scrollFunc';
import Logo from '../../assets/logo.svg';
import HeaderTop from './HeaderTop';
import SelectedNav from './SelectedNav';

function Header() {
   const DOM_NavMenu = React.useRef(null);
   const DOM_ElementQuestion = React.useRef(null);

   const toggleBurgerMenu = () => {
      DOM_NavMenu.current.classList.toggle('nav-mobile--hidden');
   };

   const openNavSelect = ({ target }) => {
      const dropdownList = target.querySelector('.nav-select');
      dropdownList.classList.remove('nav-select--hidden');
   };

   const closeNavSelect = ({ target }) => {
      const dropdownList = target.closest('.nav-select') || target.querySelector('.nav-select');
      dropdownList.classList.add('nav-select--hidden');
   };

   React.useEffect(() => {
      DOM_ElementQuestion.current = document.querySelector('.questions');
   }, []);

   const closeNavMenu = () => {
      DOM_NavMenu.current.classList.add('nav-mobile--hidden');
   };

   const handleClickOnQuestions = () => {
      scrollToElement(DOM_ElementQuestion.current);
      closeNavMenu();
   };

  // Вешаем обработчик отлавливания клика на документ для закрытия мобильного меню навигации
   React.useEffect(() => {
      const handleClickOnNavMenuMobile = ({ target }) => {
         console.log(target)
         if (!target.closest('.header__nav-list') && !target.closest('.burger-menu')){
            closeNavMenu()
         }
      };

      document.body.addEventListener(`click`, handleClickOnNavMenuMobile);
   }, []);



   return (
      <div className="header">
         <HeaderTop />

         <div className="header__bot">
            <div className="header-container">
               <div className="header__bot-inner">
                  <div className="header-logo">
                     <Link to="/">
                        <img width="150px" src={Logo} alt="logo" />
                     </Link>
                  </div>
                  <nav className="header__nav">
                     <div className="burger-menu" onClick={toggleBurgerMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                     </div>

                     <ul className="header__nav-list nav-mobile--hidden" ref={DOM_NavMenu}>
                        <li
                           className="header__nav-list-item"
                           onMouseEnter={(e) => openNavSelect(e)}
                           onMouseLeave={(e) => closeNavSelect(e)}>
                           <button className="header__nav-link link--disabled">Тарифы</button>
                           <SelectedNav closeNavSelect={closeNavSelect} closeMenu={closeNavMenu} />
                        </li>
                        <li className="header__nav-list-item" >
                           <button className="header__nav-link" onClick={handleClickOnQuestions}>
                              Частые вопросы
                           </button>
                        </li>
                        <li
                           className="header__nav-list-item"
                           onMouseEnter={(e) => openNavSelect(e)}
                           onMouseLeave={(e) => closeNavSelect(e)}>
                           <button className="header__nav-link link--disabled">
                              Спецпредложения
                           </button>
                           <SelectedNav closeNavSelect={closeNavSelect} closeMenu={closeNavMenu} />
                        </li>

                        <li className="header__nav-list-item" onClick={closeNavMenu}>
                           <Link to="/contacts" className="header__nav-link">
                              Контакты
                           </Link>
                        </li>
                     </ul>
                  </nav>

                  <div className="header__phone">
                     <button className="blue-button header__phone-but">8 (800) 553-92-92</button>

                     <button className="header__phone-but--mobile">
                        <svg
                           className="phone-text-icon"
                           xmlns="http://www.w3.org/2000/svg"
                           width="14.722"
                           height="14.722"
                           viewBox="0 0 14.722 14.722">
                           <path
                              id="Path_98"
                              data-name="Path 98"
                              d="M14.612,1.281C14.3.339,8.674-1.868,3.4,3.311H3.4l-.042.045L3.312,3.4V3.4C-1.868,8.674.339,14.3,1.281,14.612c2.118.706,4.943-2.119,4.237-4.237-.316-.948-3.531-.707,0-4.237q.164-.164.3-.317c.1-.092.207-.193.317-.3,3.531-3.531,3.289-.316,4.237,0C12.493,6.224,15.317,3.4,14.612,1.281Z"
                              transform="translate(0 14.722) rotate(-90)"
                              fill="#fff"></path>
                        </svg>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Header;
