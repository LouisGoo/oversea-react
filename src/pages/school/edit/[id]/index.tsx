import { getSchoolList } from "@/api/school";
import Content from "@/components/Content";
import SchoolForm from "@/components/SchoolForm";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function SchoolEdit() {
  const [data, setData] = useState();
  useEffect(()=>{
    async function fetchForm() {
      const res= await getSchoolList();
      setData(res.data.list[0]);
    }
    fetchForm();
  },[])
  return <Content title="编辑院校"><SchoolForm formData={data}/></Content>;
}
