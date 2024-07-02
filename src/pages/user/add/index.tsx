import Content from "@/components/Content";
import SchoolForm from "@/components/SchoolForm";
import UserForm from "@/components/UserForm";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function UserAdd() {
  return <Content title='用户添加'><UserForm /></Content>;
}
