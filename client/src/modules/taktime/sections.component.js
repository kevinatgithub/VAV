import React from 'react';
import PropTypes from 'prop-types';
import { Classes } from '@blueprintjs/core';
import { Section, SectionsWrapper, SectionsHeader, SectionDivider } from './taktime.style';

function SectionsPanel({ sections, selectedSection, onSelectSection }) {
  const handleClick = section => () => onSelectSection(section);
  return (
    <SectionsWrapper className={Classes.ELEVATION_0}>
      <SectionsHeader title='Sections' />
      <SectionDivider />
      {sections &&
        sections.map(s => (
          <Section
            active={s.id === (selectedSection && selectedSection.id)}
            icon='projects'
            key={s.id}
            text={s.name}
            onClick={handleClick(s)}
          />
        ))}
    </SectionsWrapper>
  );
}

SectionsPanel.propTypes = {
  sections: PropTypes.array,
  selectedSection: PropTypes.object,
  onSelectSection: PropTypes.func.isRequired,
};

export default SectionsPanel;
