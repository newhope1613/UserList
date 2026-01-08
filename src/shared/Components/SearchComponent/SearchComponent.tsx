import { Input } from "antd";
import styles from "./SearchComponent.module.scss";
import type { SearchType } from "../../types";

const SearchComponent = ({ searchUser, setSearchUser }: SearchType) => {
  return (
    <Input
      placeholder="Поиск по имени и фамилий"
      className={styles.searchInput}
      value={searchUser}
      onChange={(e) => setSearchUser(e.target.value)}
    />
  );
};

export default SearchComponent;
