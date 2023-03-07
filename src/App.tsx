import { useEffect, useState } from "react";
import Editor from "rich-markdown-editor";

const init_text = `
# Welcome to the Markdown note-taking extension!

This extension allows you to take notes in Markdown style directly in your browser. With Markdown, you can easily format your notes with headings, bold and italic text, lists, and more.
We hope you enjoy using this extension for all your note-taking needs!

[Markdown Guide](https://www.markdownguide.org/)
`;

const App = () => {
  const [value, setValue] = useState<string | null>(
    window.localStorage.getItem("data")
  );

  useEffect(() => {
    const res = window.localStorage.getItem("init_text");

    if (res === null || res === "0") {
      setValue(init_text);
    }
  }, []);

  const onChange = (e: any) => {
    console.log(e);

    // if (e === undefined) return;

    // const res = window.localStorage.getItem("init_text");
    // if (res === null || res === "0") {
    //   window.localStorage.setItem("init_text", "1");
    // }
    // window.localStorage.setItem("data", e);
    // setValue(e);
  };

  return (
    <div className="w-screen h-screen bg-slate-800 flex overflow-hidden">
      <Editor />
      {/* <Editor onChange={onChange} value={value || undefined} /> */}
    </div>
  );
};

export default App;
