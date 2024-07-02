import { Avatar, Button, Form, Input, Modal, Space, Table, TableColumnsType, TablePaginationConfig, TableProps, message } from "antd";
// import type { SearchProps } from 'antd/es/input/Search';
import { Inter } from "next/font/google";
import styles from './index.module.css';
import { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Content from "@/components/Content";
import { getProgramList, programDelete } from "@/api/program";

interface DataType {
  programId: React.Key,
  collegeName: string,
  region: string,
  logoUrl: string,
  introduction: string,
  programName: string,
  major: string,
  language: string,
  requirement: string,
  remark: string,
}

const inter = Inter({ subsets: ["latin"] });

const COLUMNS: TableColumnsType<DataType> = [
  {
    title:'项目',
    dataIndex: 'programName',
  },
  {
    title: '院校',
    dataIndex: 'collegeName',
    render: (value,record) => (
        <Space>
          <Avatar src={record.logoUrl} />
          {value}
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
      {
        text: '韩国',
        value: '韩国',
      }
    ],
    onFilter: (value, record) => record.region.indexOf(value as string) === 0,
  },
  {
    title: '专业',
    dataIndex: 'major',
  },
  {
    title: '备注',
    dataIndex: 'remark',
  }
];

export default function Program() {
  const onSearch: SearchProps['onSearch'] = async (value) => {
    if(value){
      const newData= allData.filter(item => (item as DataType).collegeName.includes(value))
      setPagination({...pagination, total: data.length});
      setData(newData);
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
    total: 2,
  })

  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  useEffect(()=>{
    async function fetchData() {
      const res = await getProgramList();
      console.log("🚀 ~ fetchData ~ res:", res)
      setData(res.data.list);
      setAllData(res.data.list);
      setPagination({...pagination, total: data.length});
    }
    fetchData();
    
  },[])

  const router = useRouter();

  const handleSchoolEdit=()=>{
    router.push('/program/edit/id');
  }

  const handleDelete=()=>{
    Modal.confirm({
      title: '确认删除',
      okText: '确定',
      cancelText: '取消',
      async onOk(){
        await programDelete(1);
        message.success('删除成功');
      }
    })
  }
  const columns= [...COLUMNS,
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="small">
          <Button type="link" onClick={handleSchoolEdit}>编辑</Button>
          <Button type="link" danger onClick={handleDelete}>删除</Button>
        </Space>
      ),
    },
  ]

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination: TablePaginationConfig, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    setPagination(pagination);
  };

  return (
    <Content title="项目列表" operation={<Button type="primary" onClick={()=>router.push('/program/add')}>添加</Button>}>
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
      <div className={styles.tableWrap}>
      <Table 
        columns={columns} 
        dataSource={data} 
        onChange={handleTableChange} 
        scroll={{ y: 380}}
        pagination={{...pagination,total: pagination.total, showTotal: ()=>`共${pagination.total}条`}}
        rowKey={(record)=>`${record.programId}`}
        expandable={{
          expandedRowRender: (record)=>(<>
            {record.introduction}<br />
            申请要求：{record.requirement}<br />
            语言要求：{record.language}
          </>),
          rowExpandable: (record) => !!record.introduction
        }}
      />
      </div>
    </Content>
  );
}
