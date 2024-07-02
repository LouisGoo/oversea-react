import Content from "@/components/Content";
import SchoolForm from "@/components/SchoolForm";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function SchoolAdd() {
  return <Content title='院校添加'><SchoolForm /></Content>;
}
