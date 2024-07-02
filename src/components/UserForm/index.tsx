
import React, { useEffect, useState } from 'react';
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
import { UserType } from '@/type';
import { userAdd } from '@/api/user';
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

export default function UserForm ({formData} :{formData?:UserType}){

    const [form] = useForm();
    const onReset = () => {
        form.resetFields();
    };

    useEffect(()=>{
      if(formData){

        form.resetFields();
      }

    })


    const router = useRouter();

    const handleFinish = async (values: UserType) => {
        console.log("🚀 ~ handleFinish ~ values:", values)
        await userAdd(values);
        message.success("添加成功");
        router.push("/user")
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
            <Form.Item label="姓名" name="studentName" rules={[{required: true, message:"请输入姓名"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="学校" name="collegeName" rules={[{required: true, message:"请输入校名"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="专业" name="major" rules={[{required: true, message:"请输入专业"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="绩点" name="gpa" rules={[{required: true, message:"请输入绩点"}]}>
              <Input />
            </Form.Item>
            <Form.Item label="语言能力" name="language" rules={[{required: true, message:"请输入语言能力"}]}>
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
