import { connect } from 'react-redux';
import { registerUser } from './register-actions';
import Register from '../components/register';

const mapDispatchToProps = {
  registerUser,
};

const mapStateToProps = state => ({
  loading: state.register.loading,
  registered: state.register.registered,
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
