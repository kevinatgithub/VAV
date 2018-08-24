// import PropTypes from 'prop-types';
import React from 'react';
import PropTypes from 'prop-types';
import { Select, Card } from 'antd';
import { Flex, Title, Label, Button } from '../../ui';

const { Option } = Select;

const MachineSidePanel = ({ machines, selectedMachine, onSelectMachine, onAddMachine, onEditMachine, t }) => {
  const defaultValue = selectedMachine && selectedMachine.serialNumber;

  return (
    <Card
      title={
        <Flex fdr>
          <Title primary borderBottomWidth={1} fontWeight={500} borderColor='primary'>
            {t('home.machine').toUpperCase()}
          </Title>
          <Title primary marginRight={20} marginTop={-1} marginLeft={20} fontWeight={200}>
            |
          </Title>
          <Title>{t('home.field').toUpperCase()}</Title>
        </Flex>
      }
    >
      <Flex fdc borderBottomWidth={1} borderColor='primary'>
        <Label>{t('home.selectMachine')}</Label>
        <Select value={defaultValue} onChange={onSelectMachine} style={{ width: '100%' }}>
          {machines &&
            machines.map(m =>
              <Option key={m.serialNumber} value={m.serialNumber}>
                {m.displayName}
              </Option>,
            )}
        </Select>
        <Flex marginVertical={12} paddingTop={12} jcsb ffrw>
          <Button type='primary' marginBottom={25} icon='plus-circle-o' onClick={onAddMachine}>
            {t('home.addMachine')}
          </Button>
          <Button
            type='primary'
            ghost
            marginBottom={25}
            icon='edit'
            onClick={onEditMachine}
            disabled={!selectedMachine}
          >
            {t('home.editMachine')}
          </Button>
        </Flex>
      </Flex>
      <Flex fdc paddingTop={20}>
        <Flex fdr>
          <Label flex={1}>{t('home.engine')}</Label>
          <Label flex={1} color='text'>
            418BHP
          </Label>
        </Flex>
        <Flex fdr>
          <Label flex={1}>{t('home.intake')}</Label>
          <Label flex={1} color='text'>
            3600 mm
          </Label>
        </Flex>
        <Flex fdr>
          <Label flex={1}>{t('home.cleaningType')}</Label>
          <Label flex={1} color='text'>
            Vancweb
          </Label>
        </Flex>
        <Flex fdr>
          <Label flex={1}>{t('home.bunkerType')}</Label>
          <Label flex={1} color='text'>
            WB
          </Label>
        </Flex>
        <Flex fdr>
          <Label flex={1}>{t('home.bunkerVd')}</Label>
          <Label flex={1} color='text'>
            8 ton
          </Label>
        </Flex>
      </Flex>
    </Card>
  );
};

MachineSidePanel.propTypes = {
  machines: PropTypes.array,
  selectedMachine: PropTypes.object,
  onSelectMachine: PropTypes.func,
  onAddMachine: PropTypes.func,
  onEditMachine: PropTypes.func,
  t: PropTypes.func.isRequired,
};

export default MachineSidePanel;
