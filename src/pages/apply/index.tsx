import { Avatar, Button, Dropdown, Form, Input, MenuProps, Modal, Space, Table, TableColumnsType, TablePaginationConfig, TableProps, Tag, message } from "antd";
// import type { SearchProps } from 'antd/es/input/Search';
import { Inter } from "next/font/google";
import styles from './index.module.css';
import { SearchProps } from "antd/es/input/Search";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Content from "@/components/Content";
import { getProgramList, programDelete } from "@/api/program";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { ApplyType } from "@/type";
import { getApplyList } from "@/api/apply";
import React from "react";

const inter = Inter({ subsets: ["latin"] });


export default function Apply() {
  const onSearch: SearchProps['onSearch'] = async (value) => {
    if(value){
      const newData= allData.filter(item => (item as ApplyType).studentName.includes(value))
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

  const [data, setData] = useState<ApplyType[]>([]);
  const [allData, setAllData] = useState<ApplyType[]>([]);
  useEffect(()=>{
    async function fetchData() {
      const res = await getApplyList();
      console.log("🚀 ~ fetchData ~ res:", res)
      setData(res.data.list);
      setAllData(res.data.list);
      setPagination({...pagination, total: data.length});
    }
    fetchData();
    
  },[])

  const router = useRouter();

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

  const handleTagClick=(key: number) => {
    console.log("🚀 ~ handleTagClick ~ key:", key)
    
    setData([{
      programId: 1,
      collegeId: 1024,
      collegeName: "浦项科技大学",
      programName: "POSTECH Open Lab 项目",
      logoUrl: "https://www.qschina.cn/sites/default/files/pohang-university-of-science-and-technology-postech_592560cf2aeae70239af4c7b_small.jpg",
      academyName: "软件学院",
      major: "管理学",
      region: "韩国",
      introduction: "韩国浦项工科大学成立于1986年，位于韩国浦项市，是一所具有很高实力和知名度的大学。POSTECH Open Lab 项目旨在促进两校间学生交流，为参加项目的学生提供很好的在浦项工业大学研究学习以及体验韩国文化的机会。2017年POSTECH Open Lab项目学校将最终选拔两名学生参加。",
      studentName: "陆云涛",
      status: key,
      language: "TOEFL iBT 79、雅思6.0或以上",
      requirement: "GPA 3.3或以上",
      remark: "免学费",
    },...allData.slice(1)])
  }
  const items: MenuProps['items'] = [
    {
      key: 0,
      label: <Tag color="#108ee9" onClick={()=>handleTagClick(0)}>已申请</Tag>,
    },
    {
      key: 1,
      label: <Tag color="#f50" onClick={()=>handleTagClick(1)}>申请失败</Tag>
    },
    {
      key: 2,
      label: <Tag color="#87d068" onClick={()=>handleTagClick(2)}>申请成功</Tag>
    },
  ];

  const [open, setOpen] = React.useState<boolean>(false);

  const handleStudentClick=()=>{
    setOpen(true);
  }

const COLUMNS: TableColumnsType<ApplyType> = [
  {
    title:'申请人',
    dataIndex: 'studentName',
    render: (value,record)=>
      <Button type="link" onClick={handleStudentClick}>{value}</Button>
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
    title:'项目',
    dataIndex: 'programName',
  },
  {
    title: '状态',
    dataIndex: 'status',
    render: (value,record)=>{
      if(value === 0){
        return <Tag color="#108ee9">已申请</Tag>
      }else if(value === 1){
        return <Tag color="#f50">申请失败</Tag>
      }else{
        return <Tag color="#87d068">申请成功</Tag>
      }
      
    }
  },
];

  const columns= [...COLUMNS,
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space size="small">
          {/* <Button type="link" onClick={handleEdit}>编辑状态</Button> */}
          <Dropdown menu={{ items }}>
            <Button type="link" onClick={(e) => e.preventDefault()} >
              <Space>
                编辑状态
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
          <Button type="link" danger onClick={handleDelete}>删除</Button>
        </Space>
      ),
    },
  ]

  const handleTableChange: TableProps<ApplyType>['onChange'] = (pagination: TablePaginationConfig, filters, sorter, extra) => {
    // console.log('params', pagination, filters, sorter, extra);
    setPagination(pagination);
  };

  return (
    <>
    <Content title="申请列表" >
    <Form
      form={form}
      onFinish={console.log}
      initialValues={{
        search: ''
      }}
    >
      <Form.Item name="search">
        <Input.Search placeholder="搜索申请人" onSearch={onSearch} enterButton allowClear style={{width:300}}/>
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
    <Modal
      title={<p>申请人信息</p>}
      footer={null}
      open={open}
      onCancel={() => setOpen(false)}
    >
      <p>院校背景：中国科学技术大学</p>
      <p>gpa：3.5</p>
      <p>语言水平：雅思7.5</p>
    </Modal>
  </>
  );
}
