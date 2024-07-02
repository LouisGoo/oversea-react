
import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Space,
  Image,
  message,
  Avatar
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useRouter } from 'next/router';
import styles from './inde.module.css';
import { ProgramType, SchoolType } from '@/type';
import { programAdd } from '@/api/program';
import { getSchoolList } from '@/api/school';

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export default function ProgramForm ({formData} :{formData?:ProgramType}) {

    const [form] = useForm();
    const onReset = () => {
        form.resetFields();
    };

    useEffect(()=>{
      if(formData){

        form.resetFields();
      }

    })

    const [showPreview, setShowPreview] = useState(false);
    const [preview, setPreview] = useState('');
    const [collegeName, setCollegeName] = useState('');

    const handleShowPreview = () => {
        if(formData){
          const value = form.getFieldValue('collegeName');
          if(value !== ''){
            const schoolData= schoolList.filter(item => (item as SchoolType).collegeName.includes(value))
            setCollegeName(value);
            setPreview((schoolData[0] as SchoolType)?.logoUrl);
          }
        }
        setShowPreview(!showPreview);
    }
    const handleChangePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if(value !== ''){
        const schoolData= schoolList.filter(item => (item as SchoolType).collegeName.includes(value))
        setCollegeName(value);
        setPreview((schoolData[0] as SchoolType)?.logoUrl);
      }else{
        setShowPreview(false);
      }
      
    }

    const router = useRouter();

    const handleFinish = async (values: ProgramType) => {
        console.log("🚀 ~ handleFinish ~ values:", values)
        await programAdd(values);
        message.success("添加成功");
        router.push("/program")
    }

    const [schoolList, setSchoolList] = useState([]);

    useEffect(()=>{
        async function fetchSchool() {
            const res = await getSchoolList();
            setSchoolList(res.data.list);
        }
        fetchSchool();

    },[])

    return (
        <>
          <Form
            form={form}
            className={styles.form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinish={handleFinish}
            initialValues={formData}
          >
            <Form.Item label="项目名称" name="programName" rules={[{required: true, message:"请输入项目名称"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="院校" name="collegeName" rules={[{required: true, message:"请输入院校名称"}]}>
                <Space.Compact style={{ width: '100%' }}>
                    <Input onChange={handleChangePreview} defaultValue={form.getFieldValue('collegeName')}/>
                    <Button type="primary" onClick={handleShowPreview}>预览</Button>
                </Space.Compact>
            </Form.Item>
            {showPreview && <Form.Item label=" " colon={false}>
                <Space>
                    <Avatar src={preview} />
                    {collegeName}
                </Space></Form.Item>}
            <Form.Item label="地区" name="region" rules={[{required: true, message:"请输入院校所在国家/地区"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="项目介绍" name="introduction" rules={[{required: true, message:"请输入项目介绍"}]}>
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="申请要求" name="requirement">
              <Input />
            </Form.Item>
            <Form.Item label="语言要求" name="language" rules={[{required: true, message:"请输入语言要求"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="专业限制" name="major">
              <Input />
            </Form.Item>
            <Form.Item {...tailLayout} >
                <Space>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    重置
                </Button>
                </Space>
            </Form.Item>
          </Form>
        </>
      );
}
