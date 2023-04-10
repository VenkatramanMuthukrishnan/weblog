import React, { useState } from 'react';
import { Skeleton, Space } from 'antd';
import { DotChartOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { message, Upload,Button } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { InboxOutlined } from '@ant-design/icons';

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};


const { TextArea } = Input;
const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

  
const { Dragger } = Upload;



  
const WidgetOne: React.FC<any> = (props:any) => {
    

    const handleImageChange = (e:any) => {
        const file = e.target.files[0];
        const reader:any = new FileReader();
    
        reader.readAsDataURL(file);
    
        reader.onload = () => {
            props.setBase64Image(reader.result);
        };
      };
      
      const uploadProps: UploadProps = {
        name: 'file',
        multiple: false,
      //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
            handleImageChange(info.file.originFileObj);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
        // beforeUpload:(file: RcFile) => {
        //   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        //   if (!isJpgOrPng) {
        //     message.error('You can only upload JPG/PNG file!');
        //   }
        //   const isLt2M = file.size / 1024 / 1024 < 2;
        //   if (!isLt2M) {
        //     message.error('Image must smaller than 2MB!');
        //   }
        //   return isJpgOrPng && isLt2M;
        // }
      
      };
    
  const handleUpload = async ({ file }:any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      props.setBase64Image(reader.result);
    };
  };
    return (
      <>
      <TextArea rows={4} placeholder="maxLength is 6" maxLength={6}  onChange={(e:any)=>{props.setText(e.target.value);
  }}/>
      <Upload onChange={handleUpload} beforeUpload={() => false}>
      {props.base64Image ? (
        <img src={props.base64Image} alt="Uploaded image" style={{ maxWidth: '100%' }} />
      ) : (
        <div style={{ padding: '20px', border: '1px dashed #ccc', textAlign: 'center' }}>
          Click or drag image to upload
        </div>
      )}
    </Upload>
      </>
      );
}

export default WidgetOne;