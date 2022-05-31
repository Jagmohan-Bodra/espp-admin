import React from 'react';
import {useNode, Element} from '@craftjs/core';

import {Text} from './Text';
import {Button} from './Button';
import {Container, ContainerSettings, ContainerDefaultProps} from './Container';

export const CardTop = ({children}) => {
  const {
    connectors: {connect},
  } = useNode();
  return (
    <div ref={connect} className="text-only">
      {children}
    </div>
  );
};

export const CardBottom = ({children}) => {
  const {
    connectors: {connect},
  } = useNode();
  return <div ref={connect}>{children}</div>;
};

export const Card = ({background, padding = 20}) => {
  return (
    <Container background={background} padding={padding}>
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </Element>
      <Element id="buttons" is={CardBottom} canvas>
        <Button size="small" variant="contained" color="primary">
          {' '}
          Learn more
        </Button>
      </Element>
    </Container>
  );
};

Card.craft = {
  props: ContainerDefaultProps,
  related: {
    settings: ContainerSettings,
  },
};
