import { Flex, Space, Table, Tag } from "antd";
import styles from "./ListOfUser.module.scss";
import type { TableProps } from "antd";
import type { UserType } from "../../shared/types";

const columns: TableProps<UserType>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Имя",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Фамилия",
    dataIndex: "surname",
    key: "surname",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Skills",
    key: "skills",
    dataIndex: "skills",
    render: (_, { skills }) => (
      <Flex gap="small" align="center" wrap>
        {skills.map((tag) => {
          return <Tag key={tag}>{tag.toUpperCase()}</Tag>;
        })}
      </Flex>
    ),
  },
  {
    title: "Дата регистраций",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a className={styles.edit}>Edit {record.name}</a>
        <a className={styles.delete}>Delete</a>
      </Space>
    ),
  },
];

const data: UserType[] = [
  {
    id: 2,
    name: "Bakdaulet",
    surname: "Abdubdek",
    email: "bakdauletabdubek@gmail.com",
    skills: ["playing basketball", "eating shit"],
    date: "12.11.2025",
  },
  {
    id: 2,
    name: "Nurbakit",
    surname: "Abdubdek",
    email: "nurbahit00@gmail.com",
    skills: ["playing basketball", "eating shit"],
    date: "12.11.2025",
  },
];

const ListOfUser = () => {
  return (
    <div className={styles.container}>
      <Table<UserType>
        columns={columns}
        dataSource={data}
        className={styles.table}
      />
    </div>
  );
};

export default ListOfUser;
