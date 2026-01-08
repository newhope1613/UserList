import { message } from "antd";
import styles from "./CreateUser.module.scss";
import type { UserType } from "../../shared/types";
import { createUser } from "../../features/userApi/user";
import UserForm from "../../shared/Form/UserForm/UserForm";

const CreateUser = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const onSubmit = async (data: UserType) => {
    try {
      await createUser(data);
      messageApi.open({
        type: "success",
        content: "Пользователь успешно добавлен",
      });
    } catch (e) {
      console.error(e);
      messageApi.open({
        type: "error",
        content: "Не удалось добавить пользователя",
      });
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <h1 className={styles.title}>Добавить пользователя</h1>
      <br />
      <UserForm onSubmit={onSubmit} submitText="Добавить" />
    </div>
  );
};

export default CreateUser;
