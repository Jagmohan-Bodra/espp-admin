import {notification} from 'antd';

export function alertCreateSuccessful() {
  notification.success({
    message: 'Create successful',
    description: '',
    placement: 'topRight',
  });
}

export function alertUpdateSuccessful() {
  notification.success({
    message: 'Update successful',
    description: '',
    placement: 'topRight',
  });
}

export function alertDeleteSuccessful() {
  notification.success({
    message: 'Delete successful',
    description: '',
    placement: 'topRight',
  });
}

export function alertPermissionDenied() {
  notification.warning({
    message: 'Permission denied',
    description: '',
    placement: 'topRight',
  });
}
