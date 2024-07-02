import { getSchoolList } from "@/api/school";
import { getUserList } from "@/api/user";
import Content from "@/components/Content";
import SchoolForm from "@/components/SchoolForm";
import UserForm from "@/components/UserForm";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function SchoolEdit() {
  const [data, setData] = useState();
  useEffect(()=>{
    async function fetchForm() {
      const res= await getUserList();
      setData(res.data.list[0]);
    }
    fetchForm();
  },[])
  return <Content title="编辑用户"><UserForm formData={data}/></Content>;
}
