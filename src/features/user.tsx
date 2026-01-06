import api from "../shared/api/api";
import type { UserType } from "../shared/types";

export const createUser = async ({
  name,
  surname,
  email,
  skills,
}: UserType) => {
  try {
    console.log(name, surname, email, skills);
    await api.post("/posts", { name, surname, email, skills });
  } catch (e) {
    console.error("Hello", e);
  }
};
