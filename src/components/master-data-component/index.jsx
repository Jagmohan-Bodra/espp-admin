import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {reqGetPostList} from '~/reduxs/port/action';
import {reqGetWareHouseList} from '~/reduxs/warehouse/action';

const masterDataComponent = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqGetPostList());
    dispatch(reqGetWareHouseList());
  }, []);

  return '';
};

export default masterDataComponent;
