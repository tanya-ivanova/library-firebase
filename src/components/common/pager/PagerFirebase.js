import styles from './PagerFirebase.module.css';

const PagerFirebase = ({
    isBeginning,
    isEmpty,
    fetchLess,
    fetchMore
}) => {
    return (
        <div className={styles["pagination-section"]}>
            <div>
                {!isBeginning && <button onClick={fetchLess}>Prev books</button>}
            </div>
            <div>
                {!isEmpty && <button onClick={fetchMore}>Next books</button>}
            </div>
        </div>
    );
};

export default PagerFirebase;