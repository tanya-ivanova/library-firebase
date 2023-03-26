import { useContext } from "react";
import { LanguageContext } from "../../contexts/LanguageContext";
import { languages } from '../../languages/languages';
import styles from './Home.module.css';


const Home = ({ error }) => {
    const { language } = useContext(LanguageContext);

    if (error) {
        window.location.reload(true);
    }

    return (
        <section className={styles["home-page"]}>
            <div className={styles["img-wrapper"]}>
                <div>{languages.whyReading[language]}</div>
                <img alt="library" src="https://icons.iconarchive.com/icons/itzikgur/my-seven/128/Books-1-icon.png" width="150" height="150" />
            </div>

            <div className={styles["paragraphs-wrapper"]}>
                <div className={styles["home-paragraph"]}>
                    <h1>{languages.strengthensYourBrain[language]}</h1>
                    <p>{languages.strengthensYourBrainParagraph[language]}</p>
                </div>

                <div className={styles["home-paragraph"]}>
                    <h1>{languages.increasesAbilityEmpathize[language]}</h1>
                    <p>{languages.increasesAbilityEmpathizeParagraph[language]}</p>
                </div>

                <div className={styles["home-paragraph"]}>
                    <h1>{languages.buildsVocabulary[language]}</h1>
                    <p>{languages.buildsVocabularyParagraph[language]}</p>
                </div>

                <div className={styles["home-paragraph"]}>
                    <h1>{languages.preventCognitiveDecline[language]}</h1>
                    <p>{languages.preventCognitiveDeclineParagraph[language]}</p>
                </div>

                <div className={styles["home-paragraph"]}>
                    <h1>{languages.reducesStress[language]}</h1>
                    <p>{languages.reducesStressParagraph[language]}</p>
                </div>
            </div>
        </section>
    );
}

export default Home;
