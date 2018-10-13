import React from 'react';
import PropTypes from 'prop-types';
import { Classes, Divider, Tag, Intent } from '@blueprintjs/core';
import { Button, Flex, Span, Row, CardBody, CardFooter } from 'core/styled';
import { moStatus } from 'core/utils/values';
import MoStatus from 'modules/common/mo-status/mo-status';
import style from './mo-details.style';

const { Wrapper, Header, Title, Details, SectionTitle } = style;

function MoDetails({ mo, onClose, onShowReleaseToProdPane, onShowReprintDialog, releaseToProd }) {
  const labelClassName = `${Classes.TEXT_MUTED} ${Classes.TEXT_SMALL}`;
  const sectionRowStyles = { marginBottom: 22, flexShrink: 0 };

  return (
    <Wrapper className={Classes.ELEVATION_4}>
      <Header>
        <Flex flex={1} aic>
          <Title>{mo.id}</Title>
          <MoStatus round intent={MoStatus.getStatusIntent(mo.status)}>
            {mo.status}
          </MoStatus>
        </Flex>
        {!releaseToProd && <Button minimal icon='cross' onClick={onClose} />}
      </Header>
      <Details>
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>MO DATE</Span>
          <Span marginTop={5}>{mo.date}</Span>
        </Flex>
        <Divider />
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>DEALER</Span>
          <Span marginTop={5}>{mo.dealer}</Span>
        </Flex>
        <Divider />
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>CUSTOMER</Span>
          <Span marginTop={5}>{mo.customer}</Span>
        </Flex>
        <Divider />
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>CHASSIS MODEL</Span>
          <Span marginTop={5}>{mo.chassisModel}</Span>
        </Flex>
        <Divider />
        <Flex fdc aic flex={1}>
          <Span className={labelClassName}>QUANTITY</Span>
          <Span marginTop={5}>{mo.quantity}</Span>
        </Flex>
      </Details>
      <CardBody>
        <Flex flexShrink='0' fdc paddingBottom={10}>
          <SectionTitle>Body</SectionTitle>
          <Row style={sectionRowStyles}>
            <Row.Col md={6}>
              <Flex fdc flex={1}>
                <Span className={Classes.TEXT_MUTED}>Type of Body</Span>
                <Span marginTop={5}>{mo.typeOfBody}</Span>
              </Flex>
            </Row.Col>
            <Row.Col md={6}>
              <Flex fdc flex={1}>
                <Span className={Classes.TEXT_MUTED}>Paint Scheme</Span>
                <Span marginTop={5}>{mo.paintScheme}</Span>
              </Flex>
            </Row.Col>
          </Row>
          <Row style={sectionRowStyles}>
            <Row.Col md={6}>
              <Flex fdc flex={1}>
                <Span className={Classes.TEXT_MUTED}>Body Dimension</Span>
                <Span marginTop={5}>{mo.bodyDimension}</Span>
              </Flex>
            </Row.Col>
          </Row>
        </Flex>
        <Flex flexShrink='0' fdc paddingBottom={10}>
          <SectionTitle>Chassis Information</SectionTitle>
          <Row style={sectionRowStyles}>
            <Row.Col md={6}>
              <Flex fdc flex={1}>
                <Span className={Classes.TEXT_MUTED}>Chassis Arrival Date</Span>
                <Span marginTop={5}>{mo.chassisArrivalDate}</Span>
              </Flex>
            </Row.Col>
            <Row.Col md={6}>
              <Flex fdc flex={1}>
                <Span className={Classes.TEXT_MUTED}>Other Instructions</Span>
                <Span marginTop={5}>{mo.otherInstruction}</Span>
              </Flex>
            </Row.Col>
          </Row>
          <Row style={sectionRowStyles}>
            <Row.Col md={12}>
              <Flex fdc flex={1}>
                <Span className={Classes.TEXT_MUTED}>Chassis Numbers</Span>
                <Flex marginTop={5}>
                  {mo.chassis && mo.chassis.length > 0
                    ? mo.chassis.map(c => (
                      <Flex height='auto' key={c.id} marginRight={6} marginBottom={6}>
                        <Tag>{c.id}</Tag>
                      </Flex>
                    ))
                    : 'Not available'}
                </Flex>
              </Flex>
            </Row.Col>
          </Row>
        </Flex>
        <Flex flexShrink='0' fdc paddingBottom={10}>
          <SectionTitle>Attachments</SectionTitle>
          <Row style={sectionRowStyles}>
            <Row.Col md={12}>Not yet implemented!</Row.Col>
          </Row>
        </Flex>
      </CardBody>
      {!releaseToProd && (
        <CardFooter jcfe paddingBottom={30}>
          {mo.status === moStatus.IN_PROGRESS && (
            <Button icon='print' onClick={onShowReprintDialog} marginRight={5}>
              Re-print
            </Button>
          )}
          {mo.status !== moStatus.CLOSED && (
            <Button rightIcon='chevron-right' intent={Intent.PRIMARY} onClick={onShowReleaseToProdPane}>
              Release to Production
            </Button>
          )}
        </CardFooter>
      )}
    </Wrapper>
  );
}

MoDetails.propTypes = {
  mo: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onShowReleaseToProdPane: PropTypes.func.isRequired,
  onShowReprintDialog: PropTypes.func.isRequired,
  releaseToProd: PropTypes.bool.isRequired,
};

export default MoDetails;
