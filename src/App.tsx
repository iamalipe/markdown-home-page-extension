import { useEffect, useState } from "react";
import MDEditor, {
  commands,
  getCommands,
  ICommand,
} from "@uiw/react-md-editor";
import rehypeSanitize from "rehype-sanitize";
import { MdOutlineDesignServices } from "react-icons/md";
import {
  AiOutlineAlignCenter,
  AiOutlineAlignLeft,
  AiOutlineAlignRight,
} from "react-icons/ai";

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
  const [align, setAlign] = useState<"left" | "center" | "right">("left");
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const res = window.localStorage.getItem("init_text");
    if (res === null || res === "0") {
      setValue(init_text);
    }
  }, []);

  // document.documentElement.setAttribute('data-color-mode', 'dark')
  // document.documentElement.setAttribute('data-color-mode', 'light')
  // TODO layoutAlignCommands need to finished
  const layoutAlignCommands: ICommand = {
    name: "layoutAlign",
    keyCommand: "layoutAlign",
    render: (command, disabled, executeCommand) => {
      return (
        <button
          aria-label="Layout Align"
          disabled={disabled}
          onClick={() => {
            setAlign((p) =>
              p === "left" ? "center" : p === "center" ? "right" : "left"
            );
          }}
        >
          {align === "left" ? (
            <AiOutlineAlignLeft size={12} />
          ) : align === "center" ? (
            <AiOutlineAlignCenter size={12} />
          ) : (
            <AiOutlineAlignRight size={12} />
          )}
        </button>
      );
    },
    execute: (state, api) => {
      let modifyText = `## ${state.selectedText}\n`;
      if (!state.selectedText) {
        modifyText = `## `;
      }
      api.replaceSelection(modifyText);
    },
  };

  // TODO themeCommands need to finished
  const themeCommands: ICommand = commands.group([], {
    name: "Theme",
    groupName: "theme",
    icon: <MdOutlineDesignServices size={12} />,
    children: ({ close, execute, getState, textApi }) => {
      return (
        <ul className="flex flex-col !p-1">
          <li className="!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm">
            Theme 1
          </li>
          <li className="!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm">
            Theme 2
          </li>
          <li className="!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm">
            Theme 3
          </li>
          <li className="!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm">
            Theme 4
          </li>
          <li className="hover:bg-slate-500 !p-1 !px-2 !rounded-sm">Theme 5</li>
        </ul>
      );
    },
    // execute: (state, api) => {
    //   console.log("Select Theme");
    // },
    buttonProps: { "aria-label": "Theme" },
  });
  // TODO fontSizeCommands need to finished
  const fontSizeCommands: ICommand = commands.group([], {
    name: "fontSize",
    groupName: "fontSize",
    icon: <MdOutlineDesignServices size={12} />,
    children: ({ close, execute, getState, textApi }) => {
      return (
        <ul className="flex flex-col !p-1">
          <li
            onClick={() => setFontSize(16)}
            className={`!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm ${
              fontSize === 16 ? "bg-slate-500" : ""
            }`}
          >
            16px
          </li>
          <li
            onClick={() => setFontSize(18)}
            className="!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm"
          >
            18px
          </li>
          <li
            onClick={() => setFontSize(20)}
            className="!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm"
          >
            20px
          </li>
          <li
            onClick={() => setFontSize(22)}
            className="!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm"
          >
            22px
          </li>
          <li
            onClick={() => setFontSize(24)}
            className="!mb-1 hover:bg-slate-500 !p-1 !px-2 !rounded-sm"
          >
            24px
          </li>
          <li
            onClick={() => setFontSize(26)}
            className="hover:bg-slate-500 !p-1 !px-2 !rounded-sm"
          >
            26px
          </li>
        </ul>
      );
    },
    // execute: (state, api) => {
    //   console.log("Select Theme");
    // },
    buttonProps: { "aria-label": "fontSize" },
  });

  const onChange = (e: string | undefined) => {
    if (e === undefined) return;

    const res = window.localStorage.getItem("init_text");
    if (res !== null || res === "1") {
      window.localStorage.setItem("init_text", "0");
    }
    window.localStorage.setItem("data", e);
    setValue(e);
  };

  return (
    <div className="w-screen h-screen bg-slate-800 flex overflow-hidden">
      <MDEditor
        fullscreen={true}
        draggable={"false"}
        value={value ? value : undefined}
        onChange={onChange}
        toolbarBottom={true}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
        commands={[...getCommands()]}
        extraCommands={[
          commands.codeEdit,
          commands.codeLive,
          commands.codePreview,
        ]}
      />
    </div>
  );
};

export default App;
