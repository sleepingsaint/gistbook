import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { File } from "../types";

const CustomEditor: React.FC<{ file: File | undefined }> = ({ file }) => {
    const [value, setValue] = useState<string>("// welcome to gistbook");

    useEffect(() => {
        if (file) {
            fetch(file.raw_url)
                .then((data) => data.text())
                .then((data) => {
                    setValue(data);
                })
                .catch((err) => console.log(err));
        }
    }, [file]);

    return (
        <Editor
            height="100vh"
            language={file?.language?.toLowerCase() ?? "txt"}
            defaultValue={value}
            defaultLanguage="javascript"
            value={value}
            theme="vs-dark"
        />
    );
};

export default CustomEditor;
