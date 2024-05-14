import {useContext} from 'react';
import {ModalContext} from './ModalContext';

export default function Modal({children, title}) {
  const {close} = useContext(ModalContext);

  return (
    <div className="modal">
      <div className="modal-body">
        <div className="modal-title">
          {title}
          <button onClick={close}>Close</button>
        </div>
        {children && children}
      </div>
    </div>
  );
}
