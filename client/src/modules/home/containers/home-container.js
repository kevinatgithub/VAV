import { connect } from 'react-redux';
import Home from '../components/home';
import { getMachinesRequest, addMachineRequest, editMachineRequest, selectMachine } from './home-actions';

const mapStateToProps = state => ({
  machines: state.home.current.machines,
  selectedMachine: state.home.current.selectedMachine,
});

const mapDispatchToProps = {
  getMachinesRequest,
  addMachineRequest,
  editMachineRequest,
  selectMachine,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
