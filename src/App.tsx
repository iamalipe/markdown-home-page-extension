import { Options } from "easymde";
import React, { useCallback, useMemo, useState } from "react";
import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const App = () => {
  const [value, setValue] = useState("Initial");

  const onChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  const autofocusNoSpellcheckerOptions = useMemo(() => {
    return {
      autofocus: true,
      spellChecker: true,
      theme: "darcula",
    } as Options;
  }, []);

  return (
    <SimpleMdeReact
      style={{
        height: "100vh",
        width: "100vw",
      }}
      options={autofocusNoSpellcheckerOptions}
      value={value}
      onChange={onChange}
    />
  );
};

export default App;
