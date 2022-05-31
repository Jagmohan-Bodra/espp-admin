import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import KanbanGroupComponent from './KanBanGroup';
import ClassCardComponent from './class-card';

const cssClass = styleGlobal.P_KANBAN_COMPONENT;

export const ClassCard = (props) => <ClassCardComponent {...props} />;
export const KanbanGroup = (props) => <KanbanGroupComponent {...props} />;

const CalendaKanban = (props) => {
  const {header, carts} = props;
  return (
    <div className={`${cssClass} calenda_kanban`}>
      <div className={`${cssClass}__header`}>{header}</div>
      <div className={`${cssClass}__body`}>
        {(carts || []).map((item, index) => (
          <div key={index}>
            {item}
            <div className={`${cssClass}__dr`}></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendaKanban;
