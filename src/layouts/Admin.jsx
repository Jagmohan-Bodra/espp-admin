import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from '~/components/layout/header';
import PublishModal from '~/components/public/modals/ModalConfirmCommon/PublishModal';
import './style.scss';
const cssClass = 'admin_page';
class Admin extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    isBoxVisible: false,
  };

  toggleBox = () => {
    this.setState((prevState) => ({isBoxVisible: !prevState.isBoxVisible}));
  };

  render() {
    const {PageComponent, isNullHeader} = this.props;
    return (
      <div id="wapper_main" className={`${cssClass}`}>
        {!isNullHeader && <Header />}
        <div className={`${cssClass}__content-wrapper`}>{PageComponent}</div>
        <PublishModal />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isCollapse: state.layout.isCollapse,
  };
};

const mapDispathToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispathToProps)(Admin);
