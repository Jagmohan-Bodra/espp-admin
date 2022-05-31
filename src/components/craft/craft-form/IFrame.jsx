import React, {useState} from 'react';
import {createPortal} from 'react-dom';

export const IFrame = ({children, ...props}) => {
  const [contentRef, setContentRef] = useState(null);
  const mountNode = (((contentRef || {}).contentWindow || {}).document || {})
    .body;

  const headNode = (((contentRef || {}).contentWindow || {}).document || {})
    .head;

  return (
    <iframe
      {...props}
      ref={setContentRef}
      style={{width: '100%', minHeight: '100vh'}}>
      {headNode &&
        createPortal(
          <>
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"
            />
            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/antd/4.5.2/antd.min.css"
            />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
              rel="stylesheet"
            />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
              rel="stylesheet"
            />

            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
              href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
              rel="stylesheet"></link>
            <style> {`${props.styles}`} </style>
          </>,
          headNode,
        )}
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};
