import { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { LanguageContext } from "../../contexts/LanguageContext";
import { useValidateForm } from "../../hooks/useValidateForm";
import { languages } from '../../languages/languages';

import styles from './Comment.module.css';

const Comment = ({
    comments,
    isOwner,
    isAdmin,
    values,
    changeCommentValueHandler,
    addCommentHandler,
    deleteCommentHandler
}) => {
    const { user } = useContext(AuthContext);
    const { language } = useContext(LanguageContext);

    const { minLength, isFormValid, errors } = useValidateForm(values);
    const isCommentEmpty = !values.comment;

    return (
        <div className={styles["comments-part"]}>
            <div className={styles.comments}>
                <h1>{languages.comments[language]}:</h1>
                {comments?.map(x =>
                    <div key={x._id || `${x.text} ${x.user.email}`} className={styles["comment-item"]} >
                        <p className={styles["comment-text"]}>{x.text}</p>
                        <p className={styles["comment-userEmail"]}>by {x.user.email}</p>
                        {isAdmin && <button className={styles["btn-delete-comment"]} onClick={() => deleteCommentHandler(x._id)}>Delete comment</button>}
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
                        <div>
                            <textarea
                                name="comment"
                                placeholder={languages.pleaseWriteYourComment[language]}
                                value={values.comment}
                                onChange={changeCommentValueHandler}
                                onKeyUp={(e) => minLength(e, 3)}
                            />
                            {errors.comment &&
                                <p className="error">
                                    {languages.commentErrorMessage[language]}
                                </p>
                            }
                        </div>
                        <button
                            type="submit"
                            className={`${!isFormValid || isCommentEmpty ? 'button-disabled' : ''}`}
                            disabled={!isFormValid || isCommentEmpty}
                        >
                            {languages.addComment[language]}
                        </button>
                    </form>
                </div>
                : <></>}
        </div>
    );
};

export default Comment;
