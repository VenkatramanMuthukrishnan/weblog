import React from "react";
import { Input } from "antd";
import { Upload } from "antd";

const { TextArea } = Input;

const WidgetOne: React.FC<any> = (props: any) => {
  const handleUpload = async ({ file }: any) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      props.setBase64Image(reader.result);
    };
  };
  return (
    <>
      <TextArea
        rows={4}
        placeholder="maxLength is 6"
        maxLength={6}
        onChange={(e: any) => {
          props.setText(e.target.value);
        }}
      />
      <Upload onChange={handleUpload} beforeUpload={() => false}>
        {
        // !!props.secondPageOp && !!props.secondPageOp.base64Image ? (
        //   <img
        //     src={props.secondPageOp.base64Image}
        //     alt="Uploaded image"
        //     style={{ maxWidth: "100%" }}
        //   />
        // ) :
         (
          <div
            style={{
              padding: "20px",
              border: "1px dashed #ccc",
              textAlign: "center",
            }}
          >
            Click or drag image to upload
          </div>
        )}
      </Upload>
    </>
  );
};

export default WidgetOne;
