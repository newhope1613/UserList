import { Flex, Space, Table, Tag, Drawer } from "antd";
import styles from "./ListOfUser.module.scss";
import type { TableProps } from "antd";
import type { UserType } from "../../shared/types";
import { useEffect, useMemo, useState } from "react";
import api from "../../shared/api/api";
import { deleteUser, patchUser } from "../../features/userApi/user";
import SearchComponent from "../../shared/Components/SearchComponent/SearchComponent";
import UserForm from "../../shared/Form/UserForm/UserForm";

const ListOfUser = () => {
  const [data, setData] = useState<UserType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UserType | null>(null);
  const [searchUser, setSearchUser] = useState("");

  useEffect(() => {
    const fetcher = async () => {
      try {
        setIsLoading(true);
        const tableData = await api.get("/posts");
        console.log(tableData.data);
        const tableDataFromStorage = localStorage.getItem("user") ?? "";
        setData(JSON.parse(tableDataFromStorage));
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
      }
    };

    fetcher();
  }, []);

  const handleDelete = (idUser: string) => {
    try {
      setIsLoading(true);
      deleteUser(idUser);
      const rowData = localStorage.getItem("user") ?? "";
      const data = JSON.parse(rowData);
      setData(data);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const handleEdit = (record: UserType) => {
    setSelected(record);
    setOpen(true);
  };

  const handleUpdate = (selected: UserType, values: UserType) => {
    const updated = patchUser(selected.idUser, values);
    setData((prev) =>
      prev.map((u) => (u.idUser === updated.idUser ? updated : u))
    );

    setOpen(false);
    setSelected(null);
  };

  const filteredUsers = useMemo(() => {
    const value = searchUser.trim().toLowerCase();

    return data.filter(
      (elem) =>
        elem.name.toLowerCase().includes(value) ||
        elem.surname.toLowerCase().includes(value)
    );
  }, [data, searchUser]);

  const columns: TableProps<UserType>["columns"] = [
    {
      title: "ID",
      dataIndex: "idUser",
      key: "id",
    },
    {
      title: "Имя",
      dataIndex: "name",
      key: "name",
      width: 80,
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
      render: (_, record) => (
        <Flex gap="small" align="center" wrap>
          {record.skills.map((tag, i) => (
            <Tag key={i}>{tag.toUpperCase()}</Tag>
          ))}
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
      render: (_, record: UserType) => (
        <Space size="middle">
          <a className={styles.edit} onClick={() => handleEdit(record)}>
            Edit
          </a>
          <a
            className={styles.delete}
            onClick={() => handleDelete(record.idUser)}
          >
            Delete
          </a>
          <Drawer
            title="Редактировать пользователя"
            closable={{ "aria-label": "Close Button" }}
            onClose={() => setOpen(false)}
            open={open}
            destroyOnClose
          >
            {selected && (
              <UserForm
                initialValues={selected}
                onSubmit={(values) => handleUpdate(selected, values)}
                submitText="Изменить"
                showReset={false}
              />
            )}
          </Drawer>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <SearchComponent searchUser={searchUser} setSearchUser={setSearchUser} />
      <Table<UserType>
        rowKey="idUser"
        columns={columns}
        scroll={{ x: "max - content" }}
        dataSource={filteredUsers}
        loading={isLoading}
        className={styles.table}
      />
    </div>
  );
};

export default ListOfUser;
