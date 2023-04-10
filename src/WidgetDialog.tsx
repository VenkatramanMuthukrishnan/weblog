import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import ReactQuill from 'react-quill';

const MyDialog = (props:any) => {
    const [value, setValue] = useState('');

    const onEditorChange = (value: any) => {
        setValue(value);
      };
    
  return (
    <>
      {/* <Button onClick={() => setVisible(true)}>Open Dialog</Button> */}
      <Modal
        title="My Dialog Title"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={()=>props.handleCancel(value)}
      >
         <ReactQuill
            value={value}
        onChange={onEditorChange}
      />
      </Modal>
    </>
  );
};

export default MyDialog;
