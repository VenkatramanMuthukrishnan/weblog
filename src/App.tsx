import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import Prism from "prismjs";
import html_beautify from "js-beautify";
import { modules, formats } from "./constants";

import "react-quill/dist/quill.snow.css";
import "prismjs/themes/prism.css";

// const Quill = ReactQuill.Quill;
// Quill.register(Quill.import("attributors/style/align"), true);

const defaultContent = "";

const CustomButton = () => <span className="octicon octicon-star" />;

/*
 * Custom toolbar component including insertStar button and dropdowns
 */
const CustomToolbar = () => (
  <div id="toolbar">
    <select
      className="ql-header"
      defaultValue={""}
      onChange={(e) => e.persist()}
    >
      <option value="1"></option>
      <option value="2"></option>
      <option selected></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <select className="ql-color">
      <option value="red"></option>
      <option value="green"></option>
      <option value="blue"></option>
      <option value="orange"></option>
      <option value="violet"></option>
      <option value="#d0d1d2"></option>
      <option selected></option>
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

const Editor = () => {
  const [value, setValue] = useState(defaultContent);

  const handlePaste = (clipboardData: any, editor: any) => {
    // Manipulate clipboard data here before pasting
    editor.clipboard.dangerouslyPasteHTML(clipboardData.getData("text/html"));
  };

  const onEditorChange = (value: any) => {
    setValue(value);
  };

  const tidyHtml = (source: string) => {
    return html_beautify(source, {
      unformatted: [],
      preserve_newlines: false,
    });
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [value]);

  return (
    <div className="text-editor">
      <ReactQuill
            value={value}
            modules={modules}
                    formats={formats}
        onChange={onEditorChange}
      />
      <pre className="preview">
        <code className="language-markup">{tidyHtml(value)}</code>
      </pre>
    </div>
  );
};

export default Editor;
