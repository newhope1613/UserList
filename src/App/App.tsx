import "../../src/global.scss";
import Header from "../shared/Components/Header/Header_1";
import AppRouter from "../AppRouter";
import styles from "./App.module.scss";

function App() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
