import React, { useState, useEffect, useRef } from "react";
import ReactQuill,{Quill} from "react-quill";
import Prism from "prismjs";
import html_beautify from "js-beautify";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import "prismjs/themes/prism.css";
import katex from "katex";
import "katex/dist/katex.min.css";
(window as any).katex = katex;

const Editor = () => {
  const [value, setValue] = useState('');
  const inputRef = useRef<ReactQuill>(null);

 

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
            <EditorToolbar />
      <ReactQuill
            value={value}
            modules={modules}
                    formats={formats}
                    ref={inputRef}
        onChange={onEditorChange}
      />
      <pre className="preview">
        <code className="language-markup">{tidyHtml(value)}</code>
      </pre>
    </div>
  );
};

export default Editor;
