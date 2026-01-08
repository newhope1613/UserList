export interface UserType {
  idUser: string;
  name: string;
  surname: string;
  email: string;
  skills: string[];
  date?: string;
}

export interface UserFormProps {
  initialValues?: Partial<UserType>;
  onSubmit: (data: UserType) => void | Promise<void>;
  submitText?: string;
  showReset?: boolean;
}

export interface SearchType {
  searchUser: string;
  setSearchUser: (searchUser: string) => void;
}
