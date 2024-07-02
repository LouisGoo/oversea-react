import { getProgramList } from "@/api/program";
import Content from "@/components/Content";
import ProgramForm from "@/components/ProgramForm";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";


const inter = Inter({ subsets: ["latin"] });

export default function ProgramEdit() {
  const [data, setData] = useState();
  useEffect(()=>{
    async function fetchForm() {
      const res= await getProgramList();
      setData(res.data.list[0]);
    }
    fetchForm();
  },[])
  return <Content title="编辑项目"><ProgramForm formData={data}/></Content>;
}
