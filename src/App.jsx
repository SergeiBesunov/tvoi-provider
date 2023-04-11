import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './pages/Layout';
import Home from './pages/Home';
import Contacts from './pages/Contacts';
import Comparison from './pages/Comparison';
import Tariffs from './pages/Tariffs';
import Tariff from './pages/Tariff';


function App() {
   return (
         <Routes>
            <Route path="/" element={<Layout />}>
               <Route index element={<Home />} />
               <Route path="compare" element={<Comparison />} />
               <Route path="tariffs" element={<Tariffs />} />
               <Route path="contacts" element={<Contacts />} />
               <Route path="tariff/:id" element={<Tariff />} />
            </Route>
         </Routes>
   );
}

export default App;
