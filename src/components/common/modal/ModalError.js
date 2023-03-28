import styles from './Modal.module.css';

const ModalError = ({errorMessage, onClickOk}) => {  
        return (
        <div className={styles.modal}>
            <p>{errorMessage}</p>
            <button onClick={onClickOk}>
                OK
            </button>            
        </div>
    );
}

export default ModalError;