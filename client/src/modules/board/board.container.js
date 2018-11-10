import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex } from 'core/styled';
import { Classes } from '@blueprintjs/core';
import DocumentTitle from 'modules/common/document-title/document-title.component';
import PageContent from 'modules/common/page-content/page-content';
import { Section, SectionTitle, Wrapper, SectionBody, Separator, MonitorModeToggle } from './board.style';
import UnitBox from './unit-box.component';
import StatusLegend from './status-legend.component';

class Board extends Component {
  state = {};

  componentDidMount() {
    this.props.getDashboardRequest();
  }

  componentWillUnmount() {
    const { stopRealtimeUpdate, toggleFullscreen } = this.props;
    toggleFullscreen(false);
    stopRealtimeUpdate();
  }

  getUnitsInSection(sectionId) {
    const unitsInSection = this.props.sections[sectionId] || [];
    return (
      <Fragment>
        {unitsInSection.map(unit =>
          <UnitBox key={unit.chassisNumber} unit={unit} />,
        )}
      </Fragment>
    );
  }

  handleToggleFullscreen = (e) => {
    this.props.toggleFullscreen(e.target.checked);
  };

  render() {
    const { isFullscreen } = this.props;
    const themeClassName = isFullscreen && Classes.DARK;

    return (
      <PageContent paddingless fullscreen={isFullscreen}>
        <DocumentTitle pageTitle='Visualization Board' />
        <Wrapper fdc full className={themeClassName}>
          <Flex aic jcfe padding={'8px 35px'} marginBottom={10}>
            <StatusLegend />
            <Separator />
            <MonitorModeToggle label='Monitor Mode' value={isFullscreen} onChange={this.handleToggleFullscreen} />
          </Flex>
          <Flex flex={1} paddingTop={5} overflowY='auto'>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Chassis Assembly</SectionTitle>
              <SectionBody>
                {this.getUnitsInSection(1)}
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Truck Line</SectionTitle>
              <SectionBody>
                {this.getUnitsInSection(2)}
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Bus Line</SectionTitle>
              <SectionBody>
                {this.getUnitsInSection(3)}
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Painting</SectionTitle>
              <SectionBody>
                {this.getUnitsInSection(4)}
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Trimming</SectionTitle>
              <SectionBody>
                {this.getUnitsInSection(5)}
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Cleaning</SectionTitle>
              <SectionBody>
                {this.getUnitsInSection(6)}
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>PDI</SectionTitle>
              <SectionBody>
                {this.getUnitsInSection(7)}
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Final Inspection</SectionTitle>
              <SectionBody>
                {this.getUnitsInSection(8)}
              </SectionBody>
            </Section>
          </Flex>
        </Wrapper>
      </PageContent>
    );
  }
}

Board.propTypes = {
  sections: PropTypes.object,
  getDashboardRequest: PropTypes.func.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
  stopRealtimeUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app, board }) => ({
  isFullscreen: !app.showSidebar && !app.showHeader,
  sections: board.sectionsDictionary,
});

const mapDispatchToProps = ({ app, board: { getDashboardRequest, stopRealtimeUpdate } }) => ({
  toggleFullscreen: (value) => {
    app.setShowSidebar(!value);
    app.setShowHeader(!value);
  },
  getDashboardRequest,
  stopRealtimeUpdate,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
