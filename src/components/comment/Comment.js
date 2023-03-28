import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';

import styles from './Comment.module.css';

const Comment = ({
    comments,
    isOwner,
    isAdmin,
    commentValue,
    changeCommentValueHandler,
    addCommentHandler
}) => {
    const { user } = useContext(AuthContext);
    const { language } = useContext(LanguageContext);

    return (
        <div className={styles["comments-part"]}>
            <div className={styles.comments}>
                <h1>{languages.comments[language]}:</h1>
                {comments?.map(x =>
                    <div key={x._id || `${x.text} ${x.user.email}`} className={styles["comment-item"]} >
                        <p className={styles["comment-text"]}>{x.text}</p>
                        <p className={styles["comment-userEmail"]}>by {x.user.email}</p>
                    </div>
                )}

                {!comments.length &&
                    <p >{languages.noComments[language]}</p>
                }
            </div>

            {user._id && !isOwner && !isAdmin
                ? <div className={styles["add-comment"]}>
                    <h2>{languages.addComment[language]}:</h2>
                    <form onSubmit={addCommentHandler}>
                        <textarea
                            name="comment"
                            placeholder={languages.pleaseWriteYourComment[language]}
                            value={commentValue}
                            onChange={changeCommentValueHandler}
                        />
                        <input className={styles["btn-add-comment"]} type="submit" value={languages.addComment[language]} />
                    </form>
                </div>
                : <></>}
        </div>
    );
};

export default Comment;
