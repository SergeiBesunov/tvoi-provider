import React from 'react';

import { useSelector } from 'react-redux';

import TariffCard from './commons/TariffCard';
import TariffCardSkeleton from './commons/TariffCardSkeleton';
import ErrorBlock from './commons/ErrorBlock';

export default React.memo(function TariffsCardContainer() {
   const { statusLoading, tariffs, error } = useSelector((state) => state.tariffs);

   const cards = tariffs.map((obj, i) => <TariffCard key={i} {...obj} />);
   const skeleton = [...new Array(4)].map((_, i) => <TariffCardSkeleton key={i} />);

   const renderContent = () => {
      if (statusLoading === `pending`) {
         return skeleton;
      } else if (tariffs.length < 1 && statusLoading === `sucsess`) {
         return (
            <ErrorBlock
               title={'Нет тарифов по данному запросу'}
               decription={'Попробуйте выбрать другие параметры'}
            />
         );
      } else if (statusLoading === `sucsess`) {
         return cards;
      } else if (statusLoading === `fail`) {
         return <ErrorBlock title={error} />;
      }
   };

   return <div className="tariffs__cards">{renderContent()}</div>;
});
