import React, {useRef, useState} from 'react';
import {useEffect} from 'react';
import MoveDraggable from './MoveDraggable';
import './style.scss';
const cssClass = 'position_image_component';

export default (props) => {
  const divRef = useRef(null);
  const [limit, setLimit] = useState({x: 0, y: 0});

  useEffect(() => {
    const {offsetWidth, offsetHeight} = divRef.current || {};
    setLimit({x: offsetWidth - 30, y: offsetHeight - 30});
  }, []);

  const getDefaultPosition = () => {
    const {offsetWidth, offsetHeight} = divRef.current || {};
    const x = parseInt(
      ((offsetWidth || 0) / 100) * ((props.defaultPosition || {}).x || 0),
    );
    const y = parseInt(
      ((offsetHeight || 0) / 100) * ((props.defaultPosition || {}).y || 0),
    );
    if (x == 0 && y == 0) return;
    return props.defaultPosition && {x, y};
  };

  const handleSetPosition = (positionData) => {
    props.setPosition &&
      props.setPosition({
        x: parseInt((positionData.x / limit.x) * 100),
        y: parseInt((positionData.y / limit.y) * 100),
      });
  };

  return (
    <div
      ref={divRef}
      className={`${cssClass}`}
      style={
        props.backgroundImage
          ? {backgroundImage: `url('${props.backgroundImage}')`}
          : {}
      }>
      <MoveDraggable
        position={getDefaultPosition()}
        setPosition={handleSetPosition}
        limit={limit}
      />
    </div>
  );
};
