import React from 'react';
import AceEditor from 'react-ace';
// import "ace-builds/webpack-resolver";
// import "ace-builds/src-noconflict/mode-css";
// import "ace-builds/src-noconflict/theme-github";
// import "ace-builds/src-noconflict/ext-language_tools"

const EditCode = (props) => {
  const {value, hanleChange} = props;
  const onLoad = () => {};
  const onChange = (value) => hanleChange && hanleChange(value);
  return (
    <AceEditor
      placeholder="css style"
      // mode="css"
      // theme="github"
      name="blah2"
      onLoad={onLoad}
      onChange={onChange}
      fontSize={12}
      showPrintMargin={true}
      showGutter={false}
      highlightActiveLine={true}
      className={`w-100 h-100`}
      defaultValue={value}
      setOptions={{
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        enableSnippets: true,
        showLineNumbers: true,
        tabSize: 2,
        highlightActiveLine: false,
        highlightSelectedWord: false,
        selectionStyle: 'line',
        behavioursEnabled: false,
      }}
    />
  );
};

export default EditCode;
