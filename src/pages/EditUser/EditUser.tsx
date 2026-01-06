import { Button, Card, Input, Select } from "antd";
import styles from "./EditUser.module.scss";

const EditUser = () => {
  return (
    <div className={styles.container}>
      <Card
        title={<span className={styles.title}>Добавить пользователя</span>}
        variant="borderless"
      >
        <div className={styles.wrapped}>
          <div className={styles.name}>
            <p>Имя</p>
            <Input placeholder="Напишите имя" />
            <p>Фамилия</p>
            <Input placeholder="Напишите фамилию" />
            <p>email</p>
            <Input placeholder="Напишите email" type="email" />
            <p>Навыки</p>
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Добавьте навык и нажмите Enter"
            />
          </div>
          <div className={styles.buttons}>
            <Button color="danger" variant="solid">
              Очистить
            </Button>
            <Button color="primary" variant="solid">
              Добавить
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EditUser;
