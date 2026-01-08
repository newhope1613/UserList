import api from "../../shared/api/api";
import type { UserType } from "../../shared/types";
import { forrmattedData } from "../../shared/utils/formattedData";

export const createUser = async (data: UserType) => {
  const now = forrmattedData();
  const { name, surname, email, skills } = data;
  const idUser = crypto.randomUUID().split("").splice(0, 4).join("");
  try {
    const response = await api.post("/posts", {
      idUser,
      name,
      surname,
      email,
      skills,
      date: now,
    });
    console.log(response.data);
    const existingRaw = localStorage.getItem("user");
    const existingUsers: UserType[] = existingRaw
      ? JSON.parse(existingRaw)
      : [];
    localStorage.setItem(
      "user",
      JSON.stringify([response.data, ...existingUsers])
    );
  } catch (e) {
    console.error(e);
  }
};

export const deleteUser = (idUser: string) => {
  try {
    const existingRaw = localStorage.getItem("user");
    const existingUsers: UserType[] = existingRaw
      ? JSON.parse(existingRaw)
      : [];
    const newArr = existingUsers.filter((elem) => elem.idUser != idUser);
    localStorage.setItem("user", JSON.stringify(newArr));
  } catch (e) {
    console.error(e);
  }
};

export const patchUser = (
  idUser: string,
  patch: Partial<UserType>
): UserType => {
  const existingRaw = localStorage.getItem("user");
  const existingUsers: UserType[] = existingRaw ? JSON.parse(existingRaw) : [];

  const index = existingUsers.findIndex((u) => u.idUser === idUser);
  if (index === -1) {
    throw new Error("User not found");
  }

  const updated: UserType = {
    ...existingUsers[index],
    ...patch,
    idUser,
  };

  existingUsers[index] = updated;
  localStorage.setItem("user", JSON.stringify(existingUsers));

  return updated;
};
