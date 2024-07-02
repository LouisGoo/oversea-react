import Content from "@/components/Content";
import ProgramForm from "@/components/ProgramForm";

import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function SchoolAdd() {
  return <Content title='项目添加'><ProgramForm /></Content>;
}
