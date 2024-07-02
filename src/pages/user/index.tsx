import { Avatar, Button, Form, Input, Modal, Space, Table, TableColumnsType, TablePaginationConfig, TableProps, Tag, message } from "antd";
// import type { SearchProps } from 'antd/es/input/Search';
import { Inter } from "next/font/google";
import styles from './index.module.css';
import { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "antd/es/typography/Link";
import { getSchoolList, schoolDelete } from "@/api/school";
import Content from "@/components/Content";
import { UserType } from "@/type";
import { getUserList, userDelete } from "@/api/user";


const inter = Inter({ subsets: ["latin"] });

const COLUMNS: TableColumnsType<UserType> = [
  {
    title: '姓名',
    dataIndex: 'studentName',
  },
  {
    title: '院校',
    dataIndex: 'collegeName',
    render: (value,record) => (
        <Space>
          {value}
        </Space>)
  },
  {
    title: '专业',
    dataIndex: 'major',
  },
  {
    title: '绩点',
    dataIndex: 'gpa',
    render: (value)=>{
      if(value===0) return '-';
      else return value;
    }
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    render: (value,record)=>{
      if(record.auth === 1){
        return <Tag color="purple">管理员</Tag>
      }else {
        if(value===0){
          return <Tag color="green">正常</Tag>
        }else{
          return <Tag color="red">禁用</Tag>
        }
      }
    }
  }
];

export default function School() {
  const onSearch: SearchProps['onSearch'] = async (value) => {
    if(value){
      const newData= allData.filter(item => (item as UserType).studentName.includes(value))
      setData(newData);
      setPagination({...pagination, total: data.length});
    }else{
      setPagination({...pagination, total: data.length});
      setData(allData);
    }
  };
  const [form]=Form.useForm();

  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    total: 25,
  })

  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(()=>{
    async function fetchData() {
      const res = await getUserList();
      console.log("🚀 ~ fetchData ~ res:", res)
      setData(res.data.list);
      setAllData(res.data.list);
      setPagination({...pagination, total: data.length});
    }
    fetchData();
    
  },[])

  const router = useRouter();

  const handleEdit=()=>{
    router.push('/user/edit/1');
  }

  const handleDelete=()=>{
    Modal.confirm({
      title: '确认删除',
      okText: '确定',
      cancelText: '取消',
      async onOk(){
        await userDelete(1);
        message.success('删除成功');
      }
    })
  }
  const handleBan=()=>{
    Modal.confirm({
      title: '确认禁用',
      okText: '确定',
      cancelText: '取消',
      async onOk(){
        // await schoolDelete(1);
        message.success('删除成功');
      }
    })
  }

  const columns= [...COLUMNS,
    {
      title: '操作',
      key: 'action',
      render: (_value: any,record: { auth: number; }) => {
        if(record.auth===0) return(
        <Space size="small">
          <Button type="link" onClick={handleEdit}>编辑</Button>
          <Button type="link" danger onClick={handleBan}>禁用</Button>
          <Button type="link" danger onClick={handleDelete}>删除</Button>
        </Space>)
        else{
          return '-';
        }
      },
    },
  ]

  const handleTableChange: TableProps<UserType>['onChange'] = (pagination: TablePaginationConfig, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    setPagination(pagination);
  };

  return (
    <Content title="院校列表" operation={<Button type="primary" onClick={()=>router.push('/user/add')}>添加</Button>}>
    <Form
      form={form}
      onFinish={console.log}
      initialValues={{
        search: ''
      }}
    >
      <Form.Item name="search">
        <Input.Search placeholder="搜索用户" onSearch={onSearch} enterButton allowClear style={{width:300}}/>
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
    </Content>
  );
}
