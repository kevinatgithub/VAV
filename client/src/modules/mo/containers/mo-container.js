import { connect } from 'react-redux';
import MO from '../components/mo';
import { getMosRequest, getMoDetailsRequest, filterByStatus, unselectMachine, searchMo, resetMo } from './mo-actions';

const mapStateToProps = ({ mo }) => ({
  mos: mo.mos,
  selectedMo: mo.selectedMo,
});

const mapDispatchToProps = {
  getMosRequest,
  getMoDetailsRequest,
  filterByStatus,
  searchMo,
  unselectMachine,
  resetMo,
};

export default connect(mapStateToProps, mapDispatchToProps)(MO);
