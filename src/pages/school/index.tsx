import { Avatar, Button, Form, Input, Space, Table, TableColumnsType, TablePaginationConfig, TableProps } from "antd";
// import type { SearchProps } from 'antd/es/input/Search';
import { Inter } from "next/font/google";
import styles from './index.module.css';
import { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "antd/es/typography/Link";
import { getSchoolList } from "@/api/school";

interface DataType {
  collegeId: React.Key,
  collegeName: string,
  region: string,
  city: string,
  qsrank: number,
  rkrank: number,
  logoUrl: string,
  siteUrl: string,
  introduction: string,
  avgScore: number,
}

const inter = Inter({ subsets: ["latin"] });

const COLUMNS: TableColumnsType<DataType> = [
  {
    title: '院校',
    dataIndex: 'collegeName',
    render: (value,record) => (
        <Space>
          <Avatar src={record.logoUrl} />
          <Link href={record.siteUrl} target="blank">{value}</Link>
        </Space>)
  },
  {
    title: '国家/地区',
    dataIndex: 'region',
    filters: [
      {
        text: '英国',
        value: 'United Kingdom',
      },
      {
        text: '美国',
        value: 'United States',
      },
    ],
    onFilter: (value, record) => record.region.indexOf(value as string) === 0,
  },
  {
    title: 'QS排名',
    dataIndex: 'qsrank',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => a.qsrank - b.qsrank,
  },
];

export default function School() {
  const onSearch: SearchProps['onSearch'] = async (value) => {
    if(value){
      const newData= allData.filter(item => item.collegeName.includes(value))
      setData(newData);
    }else{
      setData(allData);
    }
  };
  const [form]=Form.useForm();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 0,
  })

  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(()=>{
    async function fetchData() {
      const res = await getSchoolList();
      console.log("🚀 ~ fetchData ~ res:", res)
      setData(res.data.list);
      setAllData(res.data.list);
    }
    fetchData();
    
  },[])

  const router = useRouter();

  const handleSchoolEdit=()=>{
    router.push('/school/edit/id');
  }

  const columns= [...COLUMNS,
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="link" onClick={handleSchoolEdit}>编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ]

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination: TablePaginationConfig, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    setPagination(pagination);
  };

  return (
    <>
    <Form
      form={form}
      onFinish={console.log}
      initialValues={{
        search: ''
      }}
    >
      <Form.Item name="search">
        <Input.Search placeholder="搜索院校" onSearch={onSearch} enterButton allowClear style={{width:300}}/>
      </Form.Item>
    </Form>
      <Space style={{ marginBottom: 16 }}>
        {/* <Button onClick={setQsSort}>Sort age</Button> */}
        {/* <Button onClick={clearFilters}>清除筛选</Button>
        <Button onClick={clearAll}>清除筛选与排序</Button> */}
      </Space>
      <div className={styles.tableWrap}>
      <Table 
        columns={columns} 
        dataSource={data} 
        onChange={handleTableChange} 
        // scroll={{y:'100vh'}}  
        scroll={{ y: 380}}
        pagination={{...pagination,total: pagination.total, showTotal: ()=>`共${pagination.total}条`}}
      />
      </div>
    </>
  );
}
