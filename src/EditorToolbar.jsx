import React, { useEffect } from "react";
import * as Quill from "quill";
import katex from "katex";
import "katex/dist/katex.min.css";

window.katex = katex;

// Custom Undo button icon component for Quill editor. You can import it directly
// from 'quill/assets/icons/undo.svg' but I found that a number of loaders do not
// handle them correctly
const CustomUndo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10" />
    <path
      className="ql-stroke"
      d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"
    />
  </svg>
);

// Redo button icon component for Quill editor
const CustomRedo = () => (
  <svg viewBox="0 0 18 18">
    <polygon className="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10" />
    <path
      className="ql-stroke"
      d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"
    />
  </svg>
);

const CustomToolTipWithImage = () => (
  <svg id="Layer_1" width="18" height="18" viewBox="0 0 64 64">
    <g>
      <path
        className="ql-fill ql-stroke"
        fill="#231F20"
        d="M60,0H4C1.789,0,0,1.789,0,4v56c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z
		 M53,54H11c-0.553,0-1-0.447-1-1s0.447-1,1-1h42c0.553,0,1,0.447,1,1S53.553,54,53,54z M53,48H11c-0.553,0-1-0.447-1-1s0.447-1,1-1
		h42c0.553,0,1,0.447,1,1S53.553,48,53,48z M11,28h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1S10.447,28,11,28z
		 M10,23c0-0.553,0.447-1,1-1h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11C10.447,24,10,23.553,10,23z M11,34h18c0.553,0,1,0.447,1,1
		s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1S10.447,34,11,34z M11,40h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1
		S10.447,40,11,40z M54,41c0,0.553-0.447,1-1,1H35c-0.553,0-1-0.447-1-1V23c0-0.553,0.447-1,1-1h18c0.553,0,1,0.447,1,1V41z M62,12
		H2V4c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V12z"
      />
      <path
        className="ql-fill ql-stroke"
        fill="#231F20"
        d="M7,4C5.343,4,4,5.343,4,7s1.343,3,3,3s3-1.343,3-3S8.657,4,7,4z M7,8C6.447,8,6,7.553,6,7s0.447-1,1-1
		s1,0.447,1,1S7.553,8,7,8z"
      />
      <path
        className="ql-fill ql-stroke"
        fill="#231F20"
        d="M33,4H15c-1.657,0-3,1.343-3,3s1.343,3,3,3h18c1.657,0,3-1.343,3-3S34.657,4,33,4z M33,8H15
		c-0.553,0-1-0.447-1-1s0.447-1,1-1h18c0.553,0,1,0.447,1,1S33.553,8,33,8z"
      />
    </g>
  </svg>
);

// Undo and redo functions for Custom Toolbar
function undoChange() {
  this.quill.history.undo();
}
function redoChange() {
  this.quill.history.redo();
}

function generateId() {
  const randomId = Math.random().toString(36).substr(2, 9);
  return randomId;
}

// // Define your custom blot
class MyBlot extends Quill.import("blots/embed") {
  static create(value) {
    const node = super.create();
    node.innerHTML = value.content;
    node.setAttribute("id", value.id);
    return node;
  }
  static value(node) {
    return { content: node.innerHTML };
  }
}

// Register your custom blot with Quill
MyBlot.blotName = "my-blot";
MyBlot.tagName = "span";
MyBlot.className = "tooltip";
Quill.register(MyBlot);

const insertBlock = (id, text, inputRef, secondPageOp) => {
  if (text.length > 0) {
    inputRef.current.editor.format("youtubeEmbedBlot", id); // Apply the highlight format
    const cursorPosition = inputRef.current.editor.getSelection().index;
    inputRef.current.editor.deleteText(cursorPosition, text.length);
    inputRef.current.editor.insertEmbed(cursorPosition, "my-blot", {
      text: text,
      id: id,
      content: `${text}
  <span class="tooltiptext">
    <img
      src="${secondPageOp.base64Image || null}"
      alt="Image"
    />
    ${secondPageOp.text}
  </span> `,
    });
  }
};

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida",
];
Quill.register(Font, true);

// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
    },
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize"],
  },
};

// Formats objects for setting up the Quill editor
export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
  "formula",
  "youtubeEmbedBlot",
  "my-blot",
];

// Quill Toolbar component
export const QuillToolbar = (props) => {
  useEffect(() => {
    if (!!props.secondPageOp?.text) {
      var id = generateId();

      insertBlock(
        id,
        props.selectedText,
        props.inputRef,
        props.secondPageOp || {}
      );
      props.setSecondPageOp({});
      props.setCollapsed(!props.collapsed);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.secondPageOp]);

  return (
    <div id="toolbar">
      <span className="ql-formats">
        <select className="ql-font" defaultValue="arial">
          <option value="arial">Arial</option>
          <option value="comic-sans">Comic Sans</option>
          <option value="courier-new">Courier New</option>
          <option value="georgia">Georgia</option>
          <option value="helvetica">Helvetica</option>
          <option value="lucida">Lucida</option>
        </select>
        <select className="ql-size" defaultValue="medium">
          <option value="extra-small">Size 1</option>
          <option value="small">Size 2</option>
          <option value="medium">Size 3</option>
          <option value="large">Size 4</option>
        </select>
        <select className="ql-header" defaultValue="3">
          <option value="1">Heading</option>
          <option value="2">Subheading</option>
          <option value="3">Normal</option>
        </select>
      </span>
      <span className="ql-formats">
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
      </span>
      <span className="ql-formats">
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
        <button className="ql-indent" value="-1" />
        <button className="ql-indent" value="+1" />
      </span>
      <span className="ql-formats">
        <button className="ql-script" value="super" />
        <button className="ql-script" value="sub" />
        <button className="ql-blockquote" />
        <button className="ql-direction" />
      </span>
      <span className="ql-formats">
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
      </span>
      <span className="ql-formats">
        <button className="ql-link" />
        <button className="ql-image" />
        <button className="ql-video" />
      </span>
      <span className="ql-formats">
        <button className="ql-formula" />
        <button className="ql-code-block" />
        <button className="ql-clean" />
      </span>
      <span className="ql-formats">
        <button className="ql-undo">
          <CustomUndo />
        </button>
        <button className="ql-redo">
          <CustomRedo />
        </button>
      </span>
      <span className="ql-formats">
        <button
          className=" trigger ql-youtubeEmbedBlot"
          disabled={!props.selectedText}
          onClick={() => props.setCollapsed(!props.collapsed)}
        >
          <CustomToolTipWithImage />
        </button>
      </span>
    </div>
  );
};

export default QuillToolbar;
