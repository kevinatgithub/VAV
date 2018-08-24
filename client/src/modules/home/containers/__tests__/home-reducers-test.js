import { machines, selectedMachine } from '../home-reducers';
import {
  getMachinesRequest,
  getMachinesSuccess,
  addMachineRequest,
  editMachineRequest,
  selectMachine,
} from '../home-actions';

describe('home-reducers', () => {
  const dummyMachines = [{
    displayName: 'Machine 1',
    serialNumber: 'L212121',
  }];

  it('handles machines mutation', () => {
    expect(
      machines({}, getMachinesRequest()),
    ).toEqual([]);

    expect(
      machines(null, getMachinesSuccess(dummyMachines)),
    ).toEqual(dummyMachines);

    const [added] = dummyMachines;
    expect(
      machines([], addMachineRequest(added)),
    ).toEqual([added]);

    const edited = { ...dummyMachines[0], displayName: 'test' };
    expect(
      machines(dummyMachines, editMachineRequest(edited)),
    ).toEqual([edited]);
  });

  it('handles selecteMachine mutation', () => {
    const [selected] = dummyMachines;
    expect(
      selectedMachine(null, selectMachine(selected)),
    ).toEqual(selected);

    expect(
      selectedMachine(null, selectMachine(selected)),
    ).toEqual(selected);

    expect(
      selectedMachine(null, selectMachine()),
    ).toEqual(null);
  });
});
