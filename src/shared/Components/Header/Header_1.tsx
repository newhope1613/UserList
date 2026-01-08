import { Link } from "react-router";
import styles from "./Header.module.scss";
import { siteConfig } from "../../siteConfig";
import { EDIT_USER, USERS } from "../../consts";

const Header = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{siteConfig.nameOfApp}</h1>
      <div className={styles.navigationLinks}>
        <Link className={styles.a} to={USERS}>
          Список пользователей
        </Link>
        <Link className={styles.a} to={EDIT_USER}>
          Добавить пользователя
        </Link>
      </div>
    </div>
  );
};

export default Header;
