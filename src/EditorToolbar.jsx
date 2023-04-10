import React, { useEffect } from "react";
// import { Quill } from "react-quill";
import * as Quill from 'quill';

// import { EmbedBlot } from 'parchment/dist/src/blot/embed';
import katex from "katex";
import "katex/dist/katex.min.css";
import { Button } from "antd";

window.katex = katex;

const Inline = Quill.import('blots/inline');


// export class YoutubeEmbedBlot extends Inline   {

//   static create(value) {
//     const node = super.create(value);
//     // node.
//     node.setAttribute('class', 'my-div-class');
//     node.setAttribute('data-id', value);
//     // node.innerHTML = `<p>Hello, world!</p>`;
//     node.style.backgroundColor = 'yellow'; // Set the highlight color
//     return node;
//   }

//   static formats(node) {
//     return node.getAttribute('class');
//   }

//   // static create(videoId) {
//   //   let node = super.create();
//   //   // node.setAttribute('href', videoId)
//   //   // node.setAttribute('target', '_blank')
//   //   // node.innerText = videoId
//   //   node.innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
//   //   return node;
//   // }

//   // static value(node) {
//   //   return node.firstChild.src.split('/').pop();
//   // }

//   //  // let value be hash containing both href and text
//   //  static value(node) {
//   //   return { url: node.getAttribute('href'), text: node.innerText }
//   // }
  
//   // static formats(node) {
//   //   return node.getAttribute('href')
//   // }

// }

// YoutubeEmbedBlot.blotName = 'youtubeEmbedBlot';
// YoutubeEmbedBlot.tagName = 'span';
// YoutubeEmbedBlot.className = 'youtubeEmbedBlot';

// // Register the custom blot with Quill
// Quill.register(YoutubeEmbedBlot,true);
// // Quill.register('YoutubeEmbedBlot',YoutubeEmbedBlot,true);

// Quill.register({
//   'formats/youtubeEmbedBlot': YoutubeEmbedBlot
// },true);
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
  <svg id="Layer_1"
	 width="18" height="18" viewBox="0 0 64 64"  >
<g>
	<path className="ql-fill ql-stroke" fill="#231F20" d="M60,0H4C1.789,0,0,1.789,0,4v56c0,2.211,1.789,4,4,4h56c2.211,0,4-1.789,4-4V4C64,1.789,62.211,0,60,0z
		 M53,54H11c-0.553,0-1-0.447-1-1s0.447-1,1-1h42c0.553,0,1,0.447,1,1S53.553,54,53,54z M53,48H11c-0.553,0-1-0.447-1-1s0.447-1,1-1
		h42c0.553,0,1,0.447,1,1S53.553,48,53,48z M11,28h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1S10.447,28,11,28z
		 M10,23c0-0.553,0.447-1,1-1h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11C10.447,24,10,23.553,10,23z M11,34h18c0.553,0,1,0.447,1,1
		s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1S10.447,34,11,34z M11,40h18c0.553,0,1,0.447,1,1s-0.447,1-1,1H11c-0.553,0-1-0.447-1-1
		S10.447,40,11,40z M54,41c0,0.553-0.447,1-1,1H35c-0.553,0-1-0.447-1-1V23c0-0.553,0.447-1,1-1h18c0.553,0,1,0.447,1,1V41z M62,12
		H2V4c0-1.104,0.896-2,2-2h56c1.104,0,2,0.896,2,2V12z"/>
	<path className="ql-fill ql-stroke" fill="#231F20" d="M7,4C5.343,4,4,5.343,4,7s1.343,3,3,3s3-1.343,3-3S8.657,4,7,4z M7,8C6.447,8,6,7.553,6,7s0.447-1,1-1
		s1,0.447,1,1S7.553,8,7,8z"/>
	<path className="ql-fill ql-stroke" fill="#231F20" d="M33,4H15c-1.657,0-3,1.343-3,3s1.343,3,3,3h18c1.657,0,3-1.343,3-3S34.657,4,33,4z M33,8H15
		c-0.553,0-1-0.447-1-1s0.447-1,1-1h18c0.553,0,1,0.447,1,1S33.553,8,33,8z"/>
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

function insertHeart() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "♥");
  this.quill.setSelection(cursorPosition + 1);
}

function generateId() {
  const randomId = Math.random().toString(36).substr(2, 9);
  return randomId;
}

// // Define your custom blot
class MyBlot extends Quill.import('blots/embed') {
  static create(value) {
    const node = super.create();
    node.innerHTML = value.content;
    node.setAttribute('id', value.id);
    // node.innerText =""
    // node.value=value.text;
    return node;
  }
  static value(node) {
    return { content: node.innerHTML };
  }
}

// Register your custom blot with Quill
MyBlot.blotName = 'my-blot';
MyBlot.tagName = 'span';
MyBlot.className = 'tooltip';
Quill.register(MyBlot);
// Quill.register({
//   'formats/my-blot': YoutubeEmbedBlot
// },true);

function getSelectedText() {
  var range = this.quill.getSelection();
  return ;
};

const insertBlock=(id,text,inputRef,secondPageOp)=>{
  if(text.length>0){
  inputRef.current.editor.format('youtubeEmbedBlot',id); // Apply the highlight format
  const cursorPosition = inputRef.current.editor.getSelection().index;
  inputRef.current.editor.deleteText(cursorPosition,text.length);
  inputRef.current.editor.insertEmbed(cursorPosition  , 'my-blot', {text:text,id:id, content: `${text}
  <span class="tooltiptext">
    <img
      src="${secondPageOp.base64Image||null}"
      alt="Image"
    />
    ${secondPageOp.text}
  </span> ` });
  }
  // inputRef.current.editor.deleteText(cursorPosition+text.length-1,1)

// inputRef.current.editor.setSelection(cursorPosition + 4, 'silent');
// inputRef.current.editor.deleteText(cursorPosition,text.length);
}

// function handleYoutubeEmbed () {
//   var id=generateId();
//   var range = this.quill.getSelection();

//  var text=  range ? this.quill.getText(range.index, range.length) : '';
//   this.quill.format('youtubeEmbedBlot',id); // Apply the highlight format
//   this.quill.insertEmbed(this.quill.getSelection(), 'my-blot', { content: `<div ${id} class="tooltip">
//   ${text}
//   <span class="tooltiptext">
//     <img
//       src="data:image/png;base64,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"
//       alt="Example Image"
//     />
//     <p>This is an example tooltip with an image and some text.</p>
//   </span>
// </div>` });

//   // const exampleElement = document.querySelector(`[data-id="${id}"]`);
//   // const newParagraph = document.createElement("p");
//   //     const paragraphText = document.createTextNode("New paragraph added.");
//   //     newParagraph.appendChild(paragraphText);
//   // exampleElement.appendChild(newParagraph);
//   // const videoId = prompt('Enter YouTube video ID:');
//   // if (videoId) {
//   //   const cursorPosition = this.quill.getSelection().index;
//     // this.quill.insertText(cursorPosition, '\n', 'user');

//     // this.quill.insertText(cursorPosition, "♥");
//     // // this.quill.format('link', "value");
//     // // this.quill.insertEmbed(cursorPosition + 1, 'youtubeEmbedBlot', videoId);
//     // this.quill.insertEmbed('youtubeEmbedBlot', videoId);

//     // this.quill.setSelection(cursorPosition + 4, 'silent');
//   // }
// };
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
  "lucida"
];
Quill.register(Font, true);


// Modules object for setting up the Quill editor
export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: undoChange,
      redo: redoChange,
      // youtubeEmbedBlots: insertBlock,
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize']
  }
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
  "code-block","formula","youtubeEmbedBlot","my-blot"
];

// Quill Toolbar component
export const QuillToolbar = (props) => {
  const handleYoutubeEmbed =() =>{
    var id=generateId();
  //   var range = this.quill.getSelection();
  
  //  var text=  range ? this.quill.getText(range.index, range.length) : '';
   insertBlock(id,props.selectedText,props.inputRef,props.secondPageOp||{});
  }

  useEffect(()=>{
    if(!!props.secondPageOp?.text){
    var id=generateId();
  //   var range = this.quill.getSelection();
  
  //  var text=  range ? this.quill.getText(range.index, range.length) : '';
   insertBlock(id,props.selectedText,props.inputRef,props.secondPageOp||{});
   props.setSecondPageOp({})
   props.setCollapsed(!props.collapsed);
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[ props.secondPageOp]);

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
      <button className=" trigger ql-youtubeEmbedBlot"
        // onClick={handleYoutubeEmbed} 
       onClick={() => props.setCollapsed(!props.collapsed)}>
        <CustomToolTipWithImage />
      </button>
    </span>
    {/* <Button > Widget</Button> */}

  </div>
);
}

export default QuillToolbar;
