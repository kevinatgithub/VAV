import React from 'react';
import PropTypes from 'prop-types';
import {
  Classes,
  Divider,
  Tag,
  Intent,
  Popover,
  PopoverInteractionKind,
  Position,
  MenuItem,
  Menu,
} from '@blueprintjs/core';
import style from './mo-details-style';
import { Button, Flex, Span, Row } from '../../ui';
import { CardBody, CardFooter } from '../../ui/card';
import MoStatus from '../../common/mo-status/mo-status';
import { moStatuses } from '../../utils/values';

const { Wrapper, Header, Title, Details, SectionTitle } = style;

const MoDetails = ({ mo, onClose, onShowReleaseToProdPane, releaseToProd }) => {
  const labelClassName = `${Classes.TEXT_MUTED} ${Classes.TEXT_SMALL}`;
  const fileMenu =
    <Menu>
      <MenuItem icon='print' text='Re-print' />
      <MenuItem icon='map' text='Map' />
    </Menu>;
  return (
    <Wrapper className={Classes.ELEVATION_4}>
      <Header>
        <Flex flex={1} aic>
          <Title>{mo.id}</Title>
          <MoStatus round intent={MoStatus.getStatusIntent(mo.status.trim())}>
            {mo.status.trim()}
          </MoStatus>
        </Flex>
        {!releaseToProd && <Button minimal icon='cross' onClick={onClose} />}
      </Header>
      <Details>
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>DATE</Span>
          <Span marginTop={3}>{mo.date}</Span>
        </Flex>
        <Divider />
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>DEALER</Span>
          <Span marginTop={3}>{mo.dealer}</Span>
        </Flex>
        <Divider />
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>CUSTOMER</Span>
          <Span marginTop={3}>{mo.customer}</Span>
        </Flex>
        <Divider />
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>CHASSIS MODEL</Span>
          <Span marginTop={3}>{mo.chassisModel}</Span>
        </Flex>
        <Divider />
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>QUANTITY</Span>
          <Span marginTop={3}>{mo.quantity}</Span>
        </Flex>
      </Details>
      <CardBody>
        <SectionTitle>Body</SectionTitle>
        <Row style={{ paddingBottom: 25 }}>
          <Row.Col md={6}>
            <Flex fdc flex={1}>
              <Span className={Classes.TEXT_MUTED}>Type of Body</Span>
              <Span marginTop={3}>{mo.typeOfBody}</Span>
            </Flex>
          </Row.Col>
          <Row.Col md={6}>
            <Flex fdc flex={1}>
              <Span className={Classes.TEXT_MUTED}>Paint Scheme</Span>
              <Span marginTop={3}>{mo.paintScheme}</Span>
            </Flex>
          </Row.Col>
        </Row>
        <Row style={{ paddingBottom: 45 }}>
          <Row.Col md={6}>
            <Flex fdc flex={1}>
              <Span className={Classes.TEXT_MUTED}>Body Dimension</Span>
              <Span marginTop={3}>{mo.bodyDimension}</Span>
            </Flex>
          </Row.Col>
        </Row>
        <SectionTitle>Chassis Information</SectionTitle>
        <Row style={{ paddingBottom: 25 }}>
          <Row.Col md={6}>
            <Flex fdc flex={1}>
              <Span className={Classes.TEXT_MUTED}>Chassis Arrival Date</Span>
              <Span marginTop={3}>{mo.chassisArrivalDate}</Span>
            </Flex>
          </Row.Col>
          <Row.Col md={6}>
            <Flex fdc flex={1}>
              <Span className={Classes.TEXT_MUTED}>Other Instructions</Span>
              <Span marginTop={3}>{mo.otherInstruction}</Span>
            </Flex>
          </Row.Col>
        </Row>
        <Row style={{ paddingBottom: 45 }}>
          <Row.Col md={12}>
            <Flex fdc flex={1}>
              <Span className={Classes.TEXT_MUTED}>Chassis Numbers</Span>
              <Flex marginTop={3}>
                {mo.chassis.length
                  ? mo.chassis.map(c =>
                    <Flex height='auto' key={c} marginRight={6} marginBottom={6}>
                      <Tag>{c}</Tag>
                    </Flex>,
                  )
                  : 'Not available'}
              </Flex>
            </Flex>
          </Row.Col>
        </Row>
      </CardBody>
      {!releaseToProd &&
      <CardFooter jcfe paddingBottom={20}>
        {mo.status === moStatuses.IN_PROGRESS &&
        <Popover content={fileMenu} position={Position.BOTTOM_RIGHT} interactionKind={PopoverInteractionKind.CLICK}>
          <Button rightIcon='caret-down' marginRight={5}>
                Actions
          </Button>
        </Popover>
        }
        {mo.status !== moStatuses.CLOSED &&
        <Button rightIcon='chevron-right' intent={Intent.PRIMARY} onClick={onShowReleaseToProdPane}>
              Release to Production
        </Button>
        }
      </CardFooter>
      }
    </Wrapper>
  );
};

MoDetails.propTypes = {
  mo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onShowReleaseToProdPane: PropTypes.func.isRequired,
  releaseToProd: PropTypes.bool.isRequired,
};

export default MoDetails;
