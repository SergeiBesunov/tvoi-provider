import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PopapSearchCity from './PopapSearchCity';

function HeaderTop() {
   const totalAddedToComparison = useSelector((state) => state.comparison.totalAdded);

   return (
      <div className="header__top">
         <div className="header-container">
            <div className="header__top-inner">
               <div className="header__comprasion">
                  <Link to="/compare" className="header__comprasion-link">
                     <span>Сравнение ({totalAddedToComparison})</span>
                  </Link>
               </div>
               <PopapSearchCity />
            </div>
         </div>
      </div>
   );
}

export default HeaderTop;
