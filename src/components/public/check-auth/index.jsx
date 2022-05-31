import {useDispatch} from 'react-redux';
import {throwErr} from '~/reduxs/error/action';
import {push} from '~/reduxs/routing/actions';
import ROUTE_PATH from '~/routers/path';

const CheckAuth = () => {
  const dispatch = useDispatch();
  if (!localStorage.getItem('access_token')) {
    dispatch(
      throwErr({
        code: 401,
        message: 'You are not allowed to access!',
      }),
    );
    dispatch(push(ROUTE_PATH.LOGIN_SCREEN));
  }
  return '';
};

export default CheckAuth;
