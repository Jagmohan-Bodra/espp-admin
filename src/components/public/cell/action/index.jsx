import React from 'react';
import styleGlobal from '~/public/assets/styleGlobal';
import {Button, Space} from 'antd';
import {
  ButtonEditIcon,
  ButtonDeleteIcon,
  DownloadIcon,
  UploadIcon,
  ButtonEyesIcon,
  SendIcon,
  TrashRestoreIcon,
  SettingIcon,
} from '~/public/assets/icon';

const cssClass = styleGlobal.P_ACTION_CELL;

export const ViewIconButton = (props) => (
  <Button
    icon={<ButtonEyesIcon color={'#777'} />}
    {...props}
    className={`${cssClass}__btn-action ${props.className} view-action`}
  />
);

export const EditIconButton = (props) => (
  <Button
    icon={<ButtonEditIcon />}
    {...props}
    className={`${cssClass}__btn-action ${props.className} edit-action`}
  />
);

export const DeleteIconButton = (props) => (
  <Button
    icon={<ButtonDeleteIcon />}
    {...props}
    className={`${cssClass}__btn-action delete-action ${props.className || ''}`}
  />
);

export const DownloadIconButton = (props) => (
  <Button
    icon={<DownloadIcon />}
    {...props}
    className={`${cssClass}__btn-down-up download-action ${
      props.className || ''
    }`}
  />
);

export const UploadIconButton = (props) => (
  <Button
    icon={<UploadIcon />}
    {...props}
    className={`${cssClass}__btn-down-up upload-action ${
      props.className || ''
    }`}
  />
);

export const DownloadViewIconButton = (props) => (
  <Button
    {...props}
    icon={<DownloadIcon />}
    className={`${cssClass}__btn-down-up download-view-action ${
      props.className || ''
    }`}>
    {' '}
    View
  </Button>
);

export const DownloadIconTextButton = (props) => (
  <Button
    {...props}
    className={`${cssClass}__text_icon download-action ${
      props.className || ''
    }`}>
    <Space size={4} align="baseline">
      <DownloadIcon color={'white'} />
      Download
    </Space>
  </Button>
);

export const ViewIconTextButton = (props) => (
  <Button
    {...props}
    className={`${cssClass}__text_icon download-action ${
      props.className || ''
    }`}>
    <Space size={4} align="baseline">
      <ButtonEyesIcon color={'white'} />
      View
    </Space>
  </Button>
);

export const ClassAttendanceButton = (props) => (
  <Button
    {...props}
    className={`${cssClass}__text_icon btn-class-attendance ${
      props.className || ''
    }`}>
    Class attendance
  </Button>
);

export const SendButton = (props) => (
  <Button
    icon={<SendIcon color={`#339af0`} />}
    {...props}
    className={`${cssClass}__btn-action ${props.className} view-action`}
  />
);

export const TrashRestoreButton = (props) => (
  <Button
    icon={<TrashRestoreIcon color={`#339af0`} />}
    {...props}
    className={`${cssClass}__btn-action ${props.className} view-action`}
  />
);

export const SettingIconButton = (props) => (
  <Button
    icon={<SettingIcon color={`#777`} />}
    className={`${cssClass}__btn-action ${props.className} view-action`}
    {...props}
  />
);

const ActionCell = (props) => {
  const {icons} = props;
  return (
    <div className={`${cssClass}`}>
      <Space size={'small'}>{(icons || []).map((item) => item)}</Space>
    </div>
  );
};

export const ButtonAction = (props) => {
  const {icon} = props;
  return (
    <div className={`${cssClass}`}>
      <Space size={'small'}>{icon}</Space>
    </div>
  );
};

export default ActionCell;
