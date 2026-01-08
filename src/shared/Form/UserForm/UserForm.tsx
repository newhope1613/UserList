import { Button, Input, Select } from "antd";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import styles from "./UserForm.module.scss";
import type { UserFormProps, UserType } from "../../types";

const UserForm = ({
  initialValues,
  onSubmit,
  submitText = "Добавить",
  showReset = true,
}: UserFormProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserType>({
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      skills: [],
      ...initialValues,
    },
  });

  const submitHandler: SubmitHandler<UserType> = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className={styles.wrapped}>
        <div className={styles.name}>
          <label>Имя</label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Имя обязательное поле",
              maxLength: { value: 30, message: "Максимум 30 символов" },
            }}
            render={({ field }) => (
              <Input placeholder="Введите имя" {...field} />
            )}
          />
          {errors.name && (
            <span className={styles.required}>{errors.name.message}</span>
          )}

          <label>Фамилия</label>
          <Controller
            name="surname"
            control={control}
            rules={{
              required: "Фамилия обязательное поле",
              maxLength: { value: 30, message: "Максимум 30 символов" },
            }}
            render={({ field }) => (
              <Input placeholder="Введите фамилию" {...field} />
            )}
          />
          {errors.surname && (
            <span className={styles.required}>{errors.surname.message}</span>
          )}

          <label>Email</label>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email обязательное поле",
              maxLength: { value: 30, message: "Максимум 30 символов" },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Введите email корректно",
              },
            }}
            render={({ field }) => (
              <Input placeholder="Введите email" type="email" {...field} />
            )}
          />
          {errors.email && (
            <span className={styles.required}>{errors.email.message}</span>
          )}

          <label>Навыки</label>
          <Controller
            name="skills"
            control={control}
            rules={{ required: "Навыки обязательное поле" }}
            render={({ field }) => (
              <Select
                mode="tags"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                placeholder="Добавьте навык и нажмите Enter"
              />
            )}
          />
          {errors.skills && (
            <span className={styles.required}>{errors.skills.message}</span>
          )}
        </div>

        <div className={styles.buttons}>
          {showReset && (
            <Button color="danger" variant="solid" onClick={() => reset()}>
              Очистить
            </Button>
          )}

          <Button
            color="primary"
            variant="solid"
            onClick={handleSubmit(submitHandler)}
          >
            {submitText}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
