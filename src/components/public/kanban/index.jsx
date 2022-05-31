import React from 'react';
import KanbanGroupComponent from './KanBanGroup';
import CardComponent from './card';
import './style.scss';
import {FaCogsIcon} from '~/public/assets/icon';
import Dropdown from '../dropdown';
// import PlanningTitleComponent from './planning-kanban/PlanningTitle'
// import PlanningItemComponent from './planning-kanban/PlanningItem'
// import PlanningGroupComponent from './planning-kanban/PlanningGroup'

const cssClass = 'p_kanban_component';
export const panningSpace = 25;

export const Card = (props) => <CardComponent {...props} />;
export const KanbanGroup = (props) => <KanbanGroupComponent {...props} />;

// //panning space
// export const PlanningTitle = (props) => <PlanningTitleComponent panningSpace={panningSpace} {...props} />
// export const PlanningItem = (props) => <PlanningItemComponent panningSpace={panningSpace} {...props} />
// export const PlanningGroup = (props) => <PlanningGroupComponent panningSpace={panningSpace} {...props} />

const Kanban = (props) => {
  const {
    header,
    carts,
    styleBody,
    styleHeader,
    isSetting,
    onSettingChange,
  } = props;
  return (
    <div className={`${cssClass} kanban`}>
      <div className={`${cssClass}__header`} style={styleHeader && styleHeader}>
        <div>{header}</div>
        {isSetting && (
          <div>
            <Dropdown
              label={<FaCogsIcon className={`${cssClass}__header_icon`} />}
              data={[{value: 'archive_all', text: 'Archive All'}]}
              onChange={(item) => onSettingChange(item)}
            />
          </div>
        )}
      </div>
      <div className={`${cssClass}__body`} style={styleBody && styleBody}>
        {/* { (carts || []).map((item)=> item) } */}
        {carts}
      </div>
    </div>
  );
};

export default Kanban;
