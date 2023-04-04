import styles from './Modal.module.css';

const ModalError = ({errorMessage, onClickOk}) => {  
        return (
        <div className={styles.modal}>
            {errorMessage.map(message => <p key={message}>{message}</p>)}
            <button onClick={onClickOk}>
                OK
            </button>            
        </div>
    );
}

export default ModalError;