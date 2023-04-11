import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTariffsById } from '../redux/slices/tariffsByIdSlice';
import { useParams } from 'react-router-dom';

import { categoriesOptionsByPageTariff } from '../options';
import CardTariffById from '../components/CardTariffById';
import TariffCardSkeleton from '../components/commons/TariffCardSkeleton';
import ErrorBlock from '../components/commons/ErrorBlock';

function Tariff() {
   const dispatch = useDispatch();
  
   const getTariffById = (id) => {
      dispatch(fetchTariffsById(id));
   };

   const { id } = useParams();

   React.useEffect(() => {
      if (id) {getTariffById(id)} 
      window.scrollTo(0,0)
   }, []);

   const { tariff, statusLoading, error } = useSelector((state) => state.tariff);
   const { category } = tariff;
   const geo = useSelector((state) => state.filters.geo_id.name);
   const categoryName = category
      ? categoriesOptionsByPageTariff.find((obj) => obj.id === category)
      : '';

   const renderContent = () => {
      if (statusLoading === `pending`) {
         return <TariffCardSkeleton />;
      } else if (statusLoading === `sucsess`) {
         return <CardTariffById {...tariff} category={categoryName} geo={geo} />;
      } else if (statusLoading === `fail`) {
         return <ErrorBlock title={error} />;
      }
   };

   return (
      <div className="tariff-canvas">
         <div className="tariff-container">
            <div className="tariff-wrapper">{renderContent()}</div>
         </div>
      </div>
   );
}
export default Tariff;
