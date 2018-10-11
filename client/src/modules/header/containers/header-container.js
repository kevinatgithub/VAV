import { connect } from 'react-redux';
import Header from '../components/header';

const mapStateToProps = () => ({
  user: null,
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
