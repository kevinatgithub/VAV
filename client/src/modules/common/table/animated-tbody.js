import React from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const AnimatedTbody = ({ rowIds, Row, style, className }) => {
  return (
    <TransitionGroup component='tbody' style={style} className={className}>
      {rowIds &&
        rowIds.map(r =>
          <CSSTransition key={r} timeout={500} classNames='fade'>
            <Row key={r} griddleKey={r} />
          </CSSTransition>,
        )}
    </TransitionGroup>
  );
};

AnimatedTbody.propTypes = {
  rowIds: PropTypes.object,
  Row: PropTypes.func,
  style: PropTypes.object,
  className: PropTypes.string,
};

export default AnimatedTbody;
