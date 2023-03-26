import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import styles from './Like.module.css';

const Like = ({
    totalLikes,
    isLiked
}) => {
    const { language } = useContext(LanguageContext);

    const likesStyle = `${styles.likes} fa fa-thumbs-up`;

    return (
        <div className={likesStyle}>
            <p>{languages.likes[language]}: {totalLikes}</p>
            {isLiked
                ? <p>{languages.alreadyLikedBook[language]}</p>
                : <></>
            }
        </div>
    );
}

export default Like;
