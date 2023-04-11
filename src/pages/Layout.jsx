import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toggleModalForm, toggleModalPolicy } from '../redux/slices/modalSlices';
import Footer from '../components/footer/Footer';
import Header from '../components/header/Header';

import Modal from '../components/commons/Modal';
import ModalForm from '../components/ModalConnectForm';
import ModalPolicy from '../components/ModalPolicy';

function Layout() {

const {activeModalForm, activeModalPolicy} = useSelector((state)=>state.modals)

   return (
      <>
         <Header />
         <div className="main">
            <Outlet />
         </div>
         <Footer />

         <Modal active={activeModalForm} setActive={toggleModalForm}>
            <ModalForm/>
         </Modal>

         <Modal active={activeModalPolicy} setActive={toggleModalPolicy}>
            <ModalPolicy />
         </Modal>
      </>
   );
}

export default Layout;
