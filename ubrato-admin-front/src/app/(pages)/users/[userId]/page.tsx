"use client";

import { apiEmployee } from "@/api/services/employee";
import { apiUsers } from "@/api/services/users";
import { EmployeeProps } from "@/api/types/employee";
import { User } from "@/api/types/users";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function UserPage({ params }: { params: { userId: number } }) {
  const [user, setUser] = useState<User>();
  const [formData, setFormData] = useState<User>();

  async function getData() {
    try {
      const response = await apiUsers.getUser({
        query: { userID: params.userId },
        params: undefined,
        body: undefined,
      });
      setUser(response.data.data);
      setFormData(response.data.data);
    } catch (error) {
      toast.error("Произошла ошибка при получении пользователя");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function saveChanges() {}

  const router = useRouter();

  if (user && formData)
    return (
      <div className="flex flex-col gap-3">
        <div
          onClick={() => router.back()}
          className="flex cursor-pointer items-center gap-2"
        >
          <MoveLeftIcon strokeWidth={1} />
          <p>Назад</p>
        </div>
        <form action={saveChanges} className="page-box flex flex-col gap-8 p-6">
          <div
            id="create-user-info-box"
            className="flex w-full flex-col gap-10 md:flex-row"
          >
            {/* <div id="create-user-photo" className="flex flex-col gap-4">
      <div className="lg:h-full min-h-[200px] md:h-[200px] min-w-[200px] rounded-md border border-border lg:min-w-[250px]"></div>
      <Button color="primary" variant="bordered" className="min-h-10">
        Добавить фото
      </Button>
    </div> */}
            <div
              id="create-user-info"
              className="flex w-full flex-col gap-4 *:flex *:flex-col *:justify-between *:gap-4 *:text-start *:md:flex-row *:lg:items-center [&>div>p]:w-full [&>div>p]:max-w-[150px]"
            >
              <div>
                <p>Имя</p>
                <Input
                  required
                  isRequired
                  defaultValue={formData.first_name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [event.target.name]: event.target.value,
                    })
                  }
                  aria-label="first_name"
                  name="first_name"
                  className="w-full"
                  placeholder="Имя"
                />
              </div>
              <div>
                <p>Фамилия</p>
                <Input
                  required
                  isRequired
                  defaultValue={formData.last_name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [event.target.name]: event.target.value,
                    })
                  }
                  aria-label="last_name"
                  name="last_name"
                  className="w-full"
                  placeholder="Фамилия"
                />
              </div>
              <div>
                <p>Отчество</p>
                <Input
                  required
                  isRequired
                  value={formData.middle_name}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [event.target.name]: event.target.value,
                    })
                  }
                  aria-label="middle_name"
                  name="middle_name"
                  className="w-full"
                  placeholder="Отчество"
                />
              </div>
              {/* <div>
        <p>Дата рождения</p>
        <I18nProvider locale="RU-ru">
          <DatePicker
            showMonthAndYearPickers
            maxValue={today(getLocalTimeZone())}
            name="dateOfBirth"
            className="w-full"
          />
        </I18nProvider>
      </div> */}
              <div>
                <p>E-mail</p>
                <Input
                  required
                  isRequired
                  defaultValue={formData.email}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [event.target.name]: event.target.value,
                    })
                  }
                  aria-label="email"
                  name="email"
                  className="w-full"
                  placeholder="Почта"
                />
              </div>
              <div>
                <p>Телефон</p>
                <Input
                  required
                  isRequired
                  defaultValue={formData.phone}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      [event.target.name]: event.target.value,
                    })
                  }
                  aria-label="phone"
                  name="phone"
                  className="w-full"
                  placeholder="Номер телефона"
                />
              </div>
              {/* <div>
              <p>Должность</p>
              <Input
                required
                isRequired
                defaultValue={formData.position}
                // onChange={(event) =>
                //   setFormData({
                //     ...formData,
                //     [event.target.name]: event.target.value,
                //   })
                // }
                aria-label="position"
                name="position"
                className="w-full"
                placeholder="Должность"
              />
            </div> */}
              {/* <div>
              <p>Роль</p>
              <Select
                required
                // isRequired
                selectedKeys={[formData.role]}
                // onSelectionChange={(newValue) => {
                //   if (newValue.anchorKey)
                //     setFormData({ ...formData, role: newValue.anchorKey });
                // }}
                aria-label="role"
                name="role"
                className="w-full"
                placeholder="Выберите роль..."
              >
                <SelectItem key={"user"}>Пользователь</SelectItem>
                <SelectItem key={"employee"}>Сотрудник</SelectItem>
                <SelectItem key={"admin"}>Админ</SelectItem>
                <SelectItem key={"super_admin"}>Супер админ</SelectItem>
              </Select>
            </div> */}
            </div>
          </div>
          {/* <GroupsTable /> */}
          {/* <PermissionsTable /> */}
          <Button
            color="primary"
            // isDisabled={formData === user}
            isDisabled
            className="w-full max-w-[300px] self-end"
            type="submit"
          >
            Сохранить изменения
          </Button>
        </form>
      </div>
    );
}
