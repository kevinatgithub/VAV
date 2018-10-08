import { connect } from 'react-redux';
import MO from './components/mo';

const mapStateToProps = ({ mos, selectedMo }) => ({
  mos: mos.data,
  selectedMo: selectedMo.data,
  selectedMoId: selectedMo.id,
  preparingToProcess: selectedMo.preparingToProcess,
});

const mapDispatchToProps = ({
  mos: { getMosRequest, filterByStatus, searchMo },
  selectedMo: { getMoDetailsRequest, unselectMo, setPreparingToProcess },
}) => ({
  getMosRequest,
  getMoDetailsRequest,
  filterByStatus,
  searchMo,
  unselectMo,
  setPreparingToProcess,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MO);
