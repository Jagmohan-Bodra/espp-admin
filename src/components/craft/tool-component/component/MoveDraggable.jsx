import React, {useState} from 'react';
import Draggable from 'react-draggable';

export default (props) => {
  const {limit} = props;
  const [position, setPosition] = useState({x: 0, y: 0});

  const getPositionData = ({x, y}) => {
    let positionData = {x, y};
    if (x >= limit.x) {
      positionData.x = limit.x;
    }
    if (y >= limit.y) {
      positionData.y = limit.y;
    }
    if (x < 0) {
      positionData.x = 0;
    }
    if (y < 0) {
      positionData.y = 0;
    }
    return positionData;
  };

  const handleStart = (e, data) => {
    const positionData = getPositionData({x: data.x, y: data.y});
    setPosition(positionData);
    props.setPosition && props.setPosition(positionData);
  };
  const handleDrag = (e, data) => {
    const positionData = getPositionData({x: data.x, y: data.y});
    setPosition(positionData);
  };
  const handleStop = (e, data) => {
    const positionData = getPositionData({x: data.x, y: data.y});
    setPosition(positionData);
    props.setPosition && props.setPosition(positionData);
  };
  return (
    <Draggable
      defaultPosition={props.position && props.position}
      position={position}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}>
      <div style={{position: 'relative', width: '30px', height: '30px'}}>
        <div className="o_focus_point"></div>
      </div>
    </Draggable>
  );
};
