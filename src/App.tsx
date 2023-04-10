import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import Prism from "prismjs";
import { Button, Layout } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import html_beautify from "js-beautify";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "prismjs/themes/prism.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import ImageResize from "quill-image-resize-module-react";
import MyDialog from "./WidgetDialog";
import "./App.css";
import WidgetSteps from "./WidgetSteps";

(window as any).katex = katex;
Quill.register("modules/imageResize", ImageResize);

const Editor = () => {
  const [value, setValue] = useState("");
  const [visible, setVisible] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const handleButtonClick = () => {
    // alert()
    setVisible(false);
  };

  const handleOpen = () => {
    setVisible(true);
    return dialogText;
  };

  const handleDialogCloseClick = () => {
    // alert()
    setVisible(false);
  };

  const inputRef :any= useRef<ReactQuill>(null);

 

  const tidyHtml = (source: string) => {
    return source;
    //   return html_beautify(source, {
    //     unformatted: [],
    //     preserve_newlines: false,
    //     indent_size: 2,
    // indent_char: ' ',
    // wrap_line_length : 78,
    // indent_inner_html: true
    //   });
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [value]);

  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const [selectedText, setSelectedText] = useState('');
  const [secondPageOp, setSecondPageOp] = useState(null);

  // const [selectionIndex, setSelectionIndex] = useState(0);

  // useEffect(() => {
  //   const quill = inputRef.current.getEditor();

  //   quill.on('selection-change', (range:any) => {
  //     if (range) {
  //       setSelectionIndex(range.index);
  //     } else {
  //       setSelectionIndex(0);
  //     }
  //   });

  //   return () => {
  //     quill.off('selection-change');
  //   };
  // }, []);

  const  handleSelectionChange=(range:any, oldRange:any, source:any)=> {
    if (range) {
      const quill = inputRef.current.getEditor();
      const selectedText = quill.getText(range.index, range.length);
      console.log(selectedText);
      setSelectedText(selectedText);
      // if (range) {
      //   if (range.length === 0) {
      //     const index = range.index;
      //     const textBefore = quill.getText(0, index);
      //     const textAfter = quill.getText(index);
      //     const wordBefore = textBefore.match(/(\S+)\s*$/)[1];
      //     const wordAfter = textAfter.match(/^\s*(\S+)/)[1];
      //     const selectedText = wordBefore + wordAfter;
      //     console.log(selectedText);
      //   } else {
      //     const selectedText = quill.getText(range.index, range.length);
      //     console.log(selectedText);
      //   }
      // }
    }
  }

  const onEditorChange = (value: any) => {
    // const quill = inputRef.current.getEditor();
    setValue(value);
  };

  const modulesList = useMemo(() => ({...modules}), [])
  const formatsList = useMemo(() => ([...formats]), [])
  return (
    <div className="container">
      <Layout className="full-height-div">
      <Layout  className="site-layout">
          <Content style={{ margin: '0 16px' ,display: 'flex',flexDirection: 'row' }}>
            <div  className="child-row text-editor">
              
              <p>Current selection index: ${selectedText}</p>
              <div className="custom_tool_div">
              <EditorToolbar handleOpen={handleOpen} selectedText={selectedText}  inputRef={inputRef} secondPageOp={secondPageOp} collapsed={collapsed} setCollapsed={setCollapsed}/>
              <div className="right_tools">
              <Button type="primary" className="trigger" onClick={() => setCollapsed(!collapsed)}> Widget</Button>
             </div>
              </div>
              <ReactQuill
              className="child-row"
                value={value}
                modules={modulesList}
                formats={formatsList}
                ref={inputRef}
                onChange={onEditorChange}
                onChangeSelection={handleSelectionChange}

              />
              <pre className="preview child-row">
                <code className="language-markup">{tidyHtml(value)}</code>
              </pre>
              <MyDialog
                visible={visible}
                handleCancel={handleDialogCloseClick}
                handleOk={handleButtonClick}
              />
            </div>
          </Content>
        </Layout>
      <Sider className="customWidget" reverseArrow collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
      <div className="logo" >
      <WidgetSteps setSecondPageOp={setSecondPageOp}/></div>
      </Sider>
        
      </Layout>
    </div>
  );
};

export default Editor;
