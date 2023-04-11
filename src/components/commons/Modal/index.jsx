import style from './modal.module.scss';
import { useDispatch } from 'react-redux';


function Modal({children, active, setActive}){
const dispatch = useDispatch()

const closeModal = () => {
    dispatch(setActive(false))
}

    return (
        <div className={active ? `${style.modal} ${style.modalActive}` : style.modal} onClick={closeModal}>
            <div className={active ? `${style.content} ${style.contentActive}` : style.content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal