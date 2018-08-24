import { connect } from 'react-redux';
import Header from '../components/header';

const mapStateToProps = state => ({
  user: state.user.details,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
