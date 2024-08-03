import {
  Archive,
  LayoutDashboard,
  ListOrdered,
  NotebookPen,
  Settings,
  Users,
} from "lucide-react";

export const navLinks = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="text-text dark:text-darkText" />,
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: <NotebookPen className="text-text dark:text-darkText" />,
  },
  {
    name: "Products",
    path: "/products",
    icon: <Archive className="text-text dark:text-darkText" />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <Users className="text-text dark:text-darkText" />,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: <ListOrdered className="text-text dark:text-darkText" />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings className="text-text dark:text-darkText" />,
  },
];

export const products = [
  {
    title: "Adidas Shoes",
    price: "199",
    ratings: "4.5",
    itemsSold: "39",
    img: "/images/show 1.jpg",
  },
  {
    title: "Nike Sneakers",
    price: "149",
    ratings: "4.2",
    itemsSold: "27",
    img: "/images/show 2.jpg",
  },
  {
    title: "Puma Running Shoes",
    price: "129",
    ratings: "4.7",
    itemsSold: "56",
    img: "/images/show 3.jpg",
  },
  {
    title: "Reebok Classic",
    price: "179",
    ratings: "4.4",
    itemsSold: "42",
    img: "/images/show 4.jpg",
  },
  {
    title: "New Balance Sneakers",
    price: "139",
    ratings: "4.6",
    itemsSold: "33",
    img: "/images/show 5.jpg",
  },
  {
    title: "Converse Chuck Taylor",
    price: "89",
    ratings: "4.3",
    itemsSold: "48",
    img: "/images/show 6.jpg",
  },
  {
    title: "Vans Old Skool",
    price: "109",
    ratings: "4.8",
    itemsSold: "62",
    img: "/images/show 7.jpg",
  },
  {
    title: "Adidas Superstar",
    price: "159",
    ratings: "4.5",
    itemsSold: "37",
    img: "/images/show 8.jpg",
  },
  {
    title: "Nike Air Max",
    price: "179",
    ratings: "4.7",
    itemsSold: "51",
    img: "/images/show 9.jpg",
  },
  {
    title: "Puma Suede",
    price: "119",
    ratings: "4.4",
    itemsSold: "45",
    img: "/images/show 10.jpg",
  },
  {
    title: "Reebok Nano",
    price: "149",
    ratings: "4.6",
    itemsSold: "29",
    img: "/images/show 11.jpg",
  },
];
