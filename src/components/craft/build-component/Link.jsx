import React from 'react';

export const Link = (props) => {
  return <span {...props}>{props.children}</span>;
};

export const LinkDefaultProps = {};

Link.craft = {
  displayName: 'Link',
  props: LinkDefaultProps,
};
