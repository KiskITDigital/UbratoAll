"use client";

import { Accordion, AccordionItem, cn } from "@nextui-org/react";
import {
  BadgeAlertIcon,
  ChevronLeftIcon,
  ChevronsLeftIcon,
  ClipboardIcon,
  DotIcon,
  FoldersIcon,
  HouseIcon,
  LaptopMinimalIcon,
  MailIcon,
  MessageSquareIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, ReactNode, useState } from "react";

type SidebarMenuItem = {
  name: string;
  link: string;
};

type SidebarMenuGroup = {
  name: string;
  icon?: ReactNode;
  items: (SidebarMenuGroup | SidebarMenuItem)[];
};

export type SidebarMenu = SidebarMenuGroup[];

const mockIcon = <BadgeAlertIcon />;
const ICON_SIZE = 20;

const sidebarOptions: SidebarMenu = [
  {
    name: "Сотрудники",
    icon: <HouseIcon size={ICON_SIZE} />,
    items: [
      { name: "Cписок сотрудников", link: "/users" },
      { name: "Группы сотрудников", link: "/users/groups" },
    ],
  },
  {
    name: "Клиенты",
    icon: <UserIcon size={ICON_SIZE} />,
    items: [
      { name: "Список клиентов", link: "/clients" },
      { name: "Верификация", link: "/clients/requests" },
      { name: "Блокировка", link: "/clients/block" },
      // { name: "Статус ФНС", link: "/clients/status" },
      // { name: "Отзывы", link: "/clients/feedback" },
      // { name: "Выгрузка данных", link: "/clients/data" },
    ],
  },
  {
    name: "Тендеры",
    icon: <ClipboardIcon size={ICON_SIZE} />,
    items: [
      { name: "Список тендеров", link: "/tenders" },
      { name: "Тендерные заявки", link: "/tenders/requests" },
      // { name: "Контроль модерации", link: "" },
      // { name: "Вопрос по тендерам", link: "" },
      // { name: "Контроль модерации вопросов", link: "" },
      // { name: "Жалобы на тендеры", link: "" },
      // { name: "Модерация отзывов", link: "" },
      // { name: "Контроль модерации отзывов", link: "" },
    ],
  },
  {
    name: "Уведомления",
    icon: <MessageSquareIcon size={ICON_SIZE} />,
    items: [{ name: "Уведомления", link: "/notifications" }],
  },
  {
    name: "Обратная связь",
    icon: <MailIcon size={ICON_SIZE} />,
    items: [
      { name: "Модерация обратных звонков", link: "/settings/profile" },
      { name: "Контроль обратных звонков", link: "/settings/account" },
    ],
  },
  {
    name: "Каталоги",
    icon: <FoldersIcon size={ICON_SIZE} />,
    items: [
      { name: "Каталог объектов", link: "/catalogs" },
      { name: "Каталог услуг", link: "/catalogs" },
    ],
  },
  {
    name: "Контент",
    icon: <LaptopMinimalIcon size={ICON_SIZE} />,
    items: [
      {
        name: "Главная страница",
        items: [
          { name: "Главная Мета-теги", link: "/content/homepage/meta" },
          { name: "Главная SEO-тексты", link: "/content/homepage/seo" },
        ],
      },
      {
        name: "Новости и статьи",
        items: [{ name: "Новости", link: "/content/news" }],
      },
      {
        name: "О сервисе",
        items: [
          { name: "О сервисе", link: "/content/about" },
          { name: "Информация Заказчикам", link: "/content/clients" },
          { name: "Информация Исполнителям", link: "/content/contractors" },
          { name: "Правовая информация", link: "/content/rights" },
          { name: "ЧаВо", link: "/content/faq" },
          { name: "База знаний", link: "/content/knowledge" },
          { name: "Контакты", link: "/content/contacts" },
          { name: "Карта сайта", link: "/content/map" },
        ],
      },
    ],
  },
];

export default function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const pathname = usePathname();

  const [selectedKeys, setSelectedKeys] = useState();

  function handleSelect(keys: any) {
    setSelectedKeys(keys);
    setSidebarOpen(true);
  }

  function setSidebarState(newState: boolean) {
    setSidebarOpen(newState);
    if (newState === false) setSelectedKeys(undefined);
  }

  // May be rewriten to use less <Accordion> components for optimization.
  // 1 initial component for all groups and then 1 component per category
  function renderSidebarMenu(
    option: SidebarMenuGroup | SidebarMenuItem,
    index: string,
  ) {
    if ("link" in option)
      return (
        <Link
          href={option.link}
          className={cn(
            "flex items-center gap-2 rounded-md pr-4 transition-all duration-200 ease-in-out",
            pathname === option.link ? "bg-primary text-white" : "hover:bg-card",
          )}
        >
          <DotIcon size={40} className="min-w-10" />
          <p className="truncate text-sm">{option.name}</p>
        </Link>
      );
    return (
      <Accordion
        showDivider={false}
        selectedKeys={!sidebarOpen ? [] : selectedKeys}
        onSelectionChange={(keys) => handleSelect(keys)}
        className="w-full px-0"
        selectionMode="multiple"
      >
        <AccordionItem
          key={index + "-item"}
          aria-label={option.name}
          startContent={option.icon}
          title={sidebarOpen ? option.name : ""}
          indicator={sidebarOpen ? <ChevronLeftIcon size={ICON_SIZE} /> : <></>}
          classNames={{
            content: "pl-3 pt-2 pb-0 flex flex-col gap-2 min-w-[52px]",
            trigger: cn(
              "data-[open]:bg-card rounded-md px-4 py-3 transition-colors truncate h-12 hover:bg-card/50",
              !sidebarOpen && "max-w-[52px]",
            ),
            title: "text-base font-semibold",
          }}
        >
          {option.items.map((optionItem, optionItemIndex) => (
            <Fragment key={`${index}-${optionItemIndex}`}>
              {renderSidebarMenu(optionItem, `${index}-${optionItemIndex}`)}
            </Fragment>
          ))}
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <aside
      className={cn(
        "flex h-screen w-full flex-col gap-4 overflow-y-auto py-4 transition-all duration-300 ease-in-out",
        sidebarOpen
          ? "min-w-[250px] max-w-[300px]"
          : "min-w-[80px] max-w-[80px]",
      )}
    >
      <div className="relative flex h-10 w-full items-center justify-center px-4">
        <img
          className={cn(!sidebarOpen && "hidden")}
          src={sidebarOpen ? "/logo/ubrato.svg" : "/logo/ubrato-small.svg"}
        />
        <div
          className={cn(
            "absolute cursor-pointer transition-all duration-200 ease-in-out",
            !sidebarOpen ? "m-auto rotate-180" : "right-8",
          )}
          onClick={() => setSidebarState(!sidebarOpen)}
        >
          <ChevronsLeftIcon />
        </div>
      </div>
      <div className="flex flex-col gap-2 px-3">
        {sidebarOptions.map((option, optionIndex) => (
          <Fragment key={`option-fragment-${optionIndex}`}>
            {renderSidebarMenu(option, `option-${optionIndex}`)}
          </Fragment>
        ))}
      </div>
    </aside>
  );
}
