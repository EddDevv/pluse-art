import styles from "./MainAvatar.module.scss"

type PropsType = {
    bg: string;
    text: string;
}
const MainAvatar = ({ bg, text }: PropsType) => {
    return (
        <div className={styles.round} style={{ backgroundColor: bg }}>
            {text}
        </div>
    )
}

export default MainAvatar;