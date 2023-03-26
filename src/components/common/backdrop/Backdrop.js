import styles from './Backdrop.module.css';

const Backdrop = (props) => {
    return <div role='button' className={styles.backdrop} onClick={props.onClick} />;
}
  
export default Backdrop;
