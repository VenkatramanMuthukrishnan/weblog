import React, { useState, useEffect, useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import Prism from "prismjs";
import {  Layout } from "antd";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "prismjs/themes/prism.css";
import katex from "katex";
import "katex/dist/katex.min.css";
import ImageResize from "quill-image-resize-module-react";
import "./App.css";
import WidgetSteps from "./WidgetSteps";

(window as any).katex = katex;
Quill.register("modules/imageResize", ImageResize);

const Editor = () => {
  const [value, setValue] = useState("");


  const inputRef :any= useRef<ReactQuill>(null);

 

  const tidyHtml = (source: string) => {
    return source;
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [value]);

  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(true);
  const [selectedText, setSelectedText] = useState('');
  const [secondPageOp, setSecondPageOp] = useState(null);


  const  handleSelectionChange=(range:any, oldRange:any, source:any)=> {
    if (range) {
      const quill = inputRef.current.getEditor();
      const selectedText = quill.getText(range.index, range.length);
      setSelectedText(selectedText);
    }
  }

  const onEditorChange = (value: any) => {
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
              
              <p>Editor</p>
              <div className="custom_tool_div">
              <EditorToolbar selectedText={selectedText}  inputRef={inputRef} secondPageOp={secondPageOp} collapsed={collapsed} setCollapsed={setCollapsed}  setSecondPageOp={setSecondPageOp}/>
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
