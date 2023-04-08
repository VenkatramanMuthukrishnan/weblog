export const LIST_OF_COLOURS = [
  "#0290D7",
  "#4D4D4D",
  "#999999",
  "#F44E3B",
  "#FE9200",
  "#FCDC00",
  "#DBDF00",
];

export const toolbarModules = {
  listsAndIndents: [
    { list: "ordered" },
    { list: "bullet" },
    { indent: "-1" },
    { indent: "+1" },
  ],
  characterFormats: [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    'link', 'image'
  ],
  colors: [
    { color: [...LIST_OF_COLOURS] },
    { background: [...LIST_OF_COLOURS] },
  ],
};

export const formatsSettings = {
  listsAndIndents: ["list", "bullet", "indent"],
  characterFormats: [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    'link', 'image'
  ],
  colors: ["color", "background"],
};

export const formats = [
  ...formatsSettings.characterFormats,
  ...formatsSettings.colors,
  ...formatsSettings.listsAndIndents,
];

export const modules = {
  toolbar: [
    [{ 'font': [] }],
    [{ header: [1, 2,3, false] }],
    toolbarModules.characterFormats,
    toolbarModules.colors,
    toolbarModules.listsAndIndents,
  ],
  clipboard: { matchVisual: false },
  history: {
    delay: 2000,
    maxStack: 100,
    userOnly: true,
  },
};
