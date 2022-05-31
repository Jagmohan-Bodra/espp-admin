import React from 'react';
import {CALENDAR_TIME_WINDOW} from '~/config';
import Kanban, {
  PlanningItem,
  PlanningTitle,
  PlanningGroup,
  KanbanGroup,
} from './index';

const PlannungHour = CALENDAR_TIME_WINDOW.to - CALENDAR_TIME_WINDOW.from;

let stt = 1000;
const keyGenaral = () => {
  if (stt > 1000000) stt = 1000;
  return stt++;
};

const planningItemNull = (
  from,
  to,
  onClick,
  dataSource,
  isAM,
  {leftComponent, rightComponent, hoverComponent, item, color, panningSpace},
) => {
  let arr = [];
  for (var i = from; i < to; i++) {
    const hour = isAM ? CALENDAR_TIME_WINDOW.from + i : 12 + i;
    arr.push(
      <PlanningItem
        key={keyGenaral()}
        row={1}
        color={color && color(item, hour)}
        position={i}
        onClick={() => onClick && onClick(item, hour)}
        leftComponent={leftComponent && leftComponent(item, hour)}
        rightComponent={rightComponent && rightComponent(item, hour)}
        hoverComponent={hoverComponent && hoverComponent(item, hour)}
        panningSpace={panningSpace}
      />,
    );
  }
  return arr;
};

const planningGroupBy = ({
  dataSource,
  leftComponent,
  rightComponent,
  hoverComponent,
  onClick,
  row,
  color,
  panningSpace,
}) => {
  return row.map((item) => {
    return [
      <PlanningGroup
        panningSpace={panningSpace}
        key={keyGenaral()}
        text={`AM`}
        row={12 - CALENDAR_TIME_WINDOW.from}
        item={[
          ...planningItemNull(
            0,
            12 - CALENDAR_TIME_WINDOW.from,
            onClick,
            dataSource,
            true,
            {
              leftComponent,
              rightComponent,
              hoverComponent,
              item,
              color,
              panningSpace,
            },
          ),
        ]}
      />,
      <PlanningGroup
        panningSpace={panningSpace}
        key={keyGenaral()}
        text={`PM`}
        row={CALENDAR_TIME_WINDOW.to - 12}
        item={[
          ...planningItemNull(
            0,
            CALENDAR_TIME_WINDOW.to - 12,
            onClick,
            dataSource,
            false,
            {
              leftComponent,
              rightComponent,
              hoverComponent,
              item,
              color,
              panningSpace,
            },
          ),
        ]}
      />,
    ];
  });
};

const renderKanbanByColumn = ({
  dataSource,
  leftComponent,
  rightComponent,
  hoverComponent,
  onClick,
  header,
  row,
  color,
  panningSpace,
}) => {
  return (
    <Kanban
      key={keyGenaral()}
      header={header}
      carts={planningGroupBy({
        dataSource,
        leftComponent,
        rightComponent,
        hoverComponent,
        onClick,
        row,
        color,
        panningSpace,
      })}
      styleHeader={{
        lineHeight: '2.0em',
        height: '60px',
        backgroundColor: 'white',
        color: '#4c4c4c',
      }}
      styleBody={{padding: '0'}}
    />
  );
};

const renderHeaderByColumn = ({
  dataSource,
  setTitle,
  setHeader,
  panningSpace,
}) => {
  return (
    <Kanban
      key={keyGenaral()}
      header={setHeader && setHeader}
      styleBody={{padding: '0'}}
      styleHeader={{
        lineHeight: '3.5em',
        height: '60px',
        backgroundColor: 'white',
        color: '#4c4c4c',
        fontSize: '16px',
      }}
      carts={dataSource.map((item) => (
        <PlanningTitle
          key={keyGenaral()}
          title={setTitle && setTitle(item)}
          row={PlannungHour}
          panningSpace={panningSpace}
        />
      ))}
    />
  );
};

const CalendaClass = (props) => {
  return (
    <div>
      <KanbanGroup
        className={`fixed`}
        kanbans={(props.columns || []).map((column) =>
          (column || {}).isTitle
            ? renderHeaderByColumn({
                ...column,
                panningSpace: props.panningSpace,
              })
            : renderKanbanByColumn({
                ...column,
                row: props.row,
                panningSpace: props.panningSpace,
              }),
        )}
      />
    </div>
  );
};

export default CalendaClass;
