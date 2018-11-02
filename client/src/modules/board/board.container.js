import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex } from 'core/styled';
import { Classes } from '@blueprintjs/core';
import DocumentTitle from 'modules/common/document-title/document-title.component';
import PageContent from 'modules/common/page-content/page-content';
import { Section, SectionTitle, Wrapper, SectionBody, Separator, MonitorModeToggle } from './board.style';
import { unitStatus } from '../../core/utils/values';
import UnitBox from './unit-box.component';
import StatusLegend from './status-legend.component';

class Board extends Component {
  state = {};

  componentWillUnmount() {
    this.props.toggleFullscreen(false);
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
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Truck Line</SectionTitle>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Bus Line</SectionTitle>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Painting</SectionTitle>
              <SectionBody>
                <UnitBox status={unitStatus.MANAGER_CALL} />
                <UnitBox status={unitStatus.MATERIAL_CALL} />
                <UnitBox status={unitStatus.NORMAL} />
                <UnitBox status={unitStatus.NORMAL} />
                <UnitBox status={unitStatus.NORMAL} />
                <UnitBox status={unitStatus.NORMAL} />
                <UnitBox status={unitStatus.NORMAL} />
                <UnitBox status={unitStatus.NORMAL} />
                <UnitBox status={unitStatus.NORMAL} />
                <UnitBox status={unitStatus.NORMAL} />
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Trimming</SectionTitle>
              <SectionBody>
                <UnitBox status={unitStatus.NORMAL} />
              </SectionBody>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Cleaning</SectionTitle>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>PDI</SectionTitle>
            </Section>
            <Section md={1} className={themeClassName}>
              <SectionTitle>Final Inspection</SectionTitle>
            </Section>
          </Flex>
        </Wrapper>
      </PageContent>
    );
  }
}

Board.propTypes = {
  isFullscreen: PropTypes.bool.isRequired,
  toggleFullscreen: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app }) => ({
  isFullscreen: !app.showSidebar && !app.showHeader,
});

const mapDispatchToProps = ({ app }) => ({
  toggleFullscreen: (value) => {
    app.setShowSidebar(!value);
    app.setShowHeader(!value);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
