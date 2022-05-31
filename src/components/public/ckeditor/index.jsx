import React from 'react';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor-build-npm';
import colors from './colors';
import Config from '~/config';

const ENDPOINT_UPLOAD_IMAGE = Config.API_URL + '/v1/drive/upload';

class MyUploadAdapter {
  constructor(loader) {
    // CKEditor 5's FileLoader instance.
    this.loader = loader;

    // URL where to send files.
    this.url = ENDPOINT_UPLOAD_IMAGE;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
        }),
    );
  }

  // Aborts the upload process.
  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  // Example implementation using XMLHttpRequest.
  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open('POST', this.url, true);
    // headers={{
    //   Authorization: `Bearer ${localStorage.getItem('access_token')}`,
    // }}
    xhr.setRequestHeader(
      'Authorization',
      `Bearer ${localStorage.getItem('access_token')}`,
    );
    xhr.responseType = 'json';
  }

  // Initializes XMLHttpRequest listeners.
  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = "Couldn't upload file:" + ` ${file.name}.`;

    xhr.addEventListener('error', () => reject(genericErrorText));
    xhr.addEventListener('abort', () => reject());
    xhr.addEventListener('load', () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error
            ? response.error.message
            : genericErrorText,
        );
      }

      // If the upload is successful, resolve the upload promise with an object containing
      // at least the "default" URL, pointing to the image on the server.

      resolve({
        default: ((response.data || [])[0] || {}).filePath,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener('progress', (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  // Prepares the data and sends the request.
  _sendRequest(file) {
    const data = new FormData();
    data.append('files', file);
    this.xhr.send(data);
  }
}
function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
const CkEditor = (props) => {
  return (
    <CKEditor
      ref={props.refs}
      editor={ClassicEditor}
      onReady={(editor) => editor.setData(props.value || '')}
      data={props.value || ''}
      onBlur={props.onBlur}
      // onReady={(editor) => {
      //   console.log('Editor is ready to use!', editor);
      //   editor.
      //   // console.log(Array.from (editor.ui.componentFactory.names ()))
      // }}
      onChange={(event, editor) => {
        const data = editor.getData();
        props.onChange && props.onChange(data);
      }}
      config={{
        extraPlugins: [MyCustomUploadAdapterPlugin],
        toolbar: {
          items: [
            'heading',
            '|',
            'fontfamily',
            'fontsize',
            '|',
            'alignment',
            '|',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'strikethrough',
            'underline',
            'subscript',
            'superscript',
            '|',
            'link',
            '|',
            'outdent',
            'indent',
            '|',
            'bulletedList',
            'numberedList',
            '|',
            'code',
            'codeBlock',
            '|',
            'insertTable',
            '|',
            'uploadImage',
            'blockQuote',
            '|',
            'htmlEmbed',
            '|',
            'specialCharacters',
            '|',
            'undo',
            'redo',
          ],
          shouldNotGroupWhenFull: true,
        },
        fontColor: {
          colors,
          columns: 20,
          documentColors: 200,
        },
        fontBackgroundColor: {
          colors,
          columns: 20,
          documentColors: 200,
        },
      }}
    />
  );
};

export default CkEditor;
