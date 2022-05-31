import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {push} from '~/reduxs/routing/actions';

const RoutingComponent = (props) => {
  const dispatch = useDispatch();
  const routing = useSelector((state) => state.routing);

  useEffect(() => {
    if (routing.curScreen) {
      props.history.push(routing.curScreen);
      dispatch(push());
    }
  }, [routing]);
  return '';
};

export default withRouter(RoutingComponent);
