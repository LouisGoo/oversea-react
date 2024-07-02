
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Space,
  Image,
  message
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { SchoolType } from '@/type/school';
import { schoolAdd } from '@/api/school';
import { useRouter } from 'next/router';
import styles from './inde.module.css';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

export default function SchoolForm ({formData} :{formData?:SchoolType}){

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

    const handleShowPreview = () => {
        if(formData){
          setPreview(form.getFieldValue('logoUrl'));
        }
        setShowPreview(!showPreview);
    }
    const handleChangePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        // form.setFieldValue('logoUrl',e.target.value);
        setPreview(e.target.value);
    }

    const router = useRouter();

    const handleFinish = async (values: SchoolType) => {
        console.log("🚀 ~ handleFinish ~ values:", values)
        await schoolAdd(values);
        message.success("添加成功");
        router.push("/school")
    }

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
            <Form.Item label="大学" name="collegeName" rules={[{required: true, message:"请输入校名"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="校徽" name="logoUrl" rules={[{required: true, message:"请输入校徽链接"}]}>
                <Space.Compact style={{ width: '100%' }}>
                    <Input onChange={handleChangePreview} defaultValue={form.getFieldValue('logoUrl')}/>
                    <Button type="primary" onClick={handleShowPreview}>预览</Button>
                </Space.Compact>
            </Form.Item>
            {showPreview && <Form.Item label=" " colon={false}><Image src={preview} alt='' /></Form.Item>}
            <Form.Item label="地区" name="region" rules={[{required: true, message:"请输入院校所在国家/地区"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="官网" name="siteUrl">
              <Input />
            </Form.Item>
            <Form.Item label="QS排名" name="qsrank" rules={[{required: true, message:"请输入院校qs排名"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="软科排名" name="rkrank">
              <Input />
            </Form.Item>
            <Form.Item label="综合评分" name="avgScore">
              <Input />
            </Form.Item>
            <Form.Item label="简介" name="introduction">
              <Input.TextArea />
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
