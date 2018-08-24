import { css } from 'styled-components';
import format from './format';

export const mainProps = () => css``;

export const textAlignProps = props => css`
  ${props.tac && 'text-align: center'};
  ${props.tar && 'text-align: right'};
  ${props.tal && 'text-align: left'};
`;

export const overflowProps = props => css`
  ${props.overflowX && `overflow-x: ${props.overflowX}`};
  ${props.overflowY && `overflow-y: ${props.overflowY}`};
  ${props.overflow && `overflow: ${props.overflow}`};
`;

export const positionProps = props => css`
  ${props.float && `float: ${props.float}`};
  ${props.position && `position: ${props.position}`};
  ${props.display && `display: ${props.display}`};
  ${props.zIndex && `z-index: ${props.zIndex}`};
  ${props.left && `left: ${props.left}`};
  ${props.right && `right: ${format(props.right)}`};
  ${props.top && `top: ${format(props.top)}`};
  ${props.left && `left: ${props.left}`};
  ${props.bottom && `bottom: ${props.bottom}`};
`;

export const widthProps = props => css`
  ${props.width && `width: ${format(props.width)}`};
  ${props.minWidth && `min-width: ${format(props.minWidth)}`};
  ${props.maxWidth && `max-width: ${format(props.maxWidth)}`};
`;
export const heightProps = props => css`
  ${props.height && `height: ${format(props.height)}`};
  ${props.minHeight && `min-height: ${format(props.minHeight)}`};
  ${props.maxHeight && `max-height: ${format(props.maxHeight)}`};
`;
export const marginProps = props => css`
  ${props.marginBottom && `margin-bottom: ${format(props.marginBottom)}`};
  ${props.marginTop && `margin-top: ${format(props.marginTop)}`};
  ${props.marginLeft && `margin-left: ${format(props.marginLeft)}`};
  ${props.marginRight && `margin-right: ${format(props.marginRight)}`};
  ${props.margin && `margin: ${format(props.margin)}`};
  ${props.marginVertical &&
    `margin-top: ${format(props.marginVertical)}; margin-bottom: ${format(props.marginVertical)};`};
  ${props.marginHorizontal &&
    `margin-left: ${format(props.marginHorizontal)}; margin-right: ${format(props.marginHorizontal)};`};
`;

export const paddingProps = props => css`
  ${props.paddingBottom && `padding-bottom: ${format(props.paddingBottom)}`};
  ${props.paddingTop && `padding-top: ${format(props.paddingTop)}`};
  ${props.paddingLeft && `padding-left: ${format(props.paddingLeft)}`};
  ${props.paddingRight && `padding-right: ${format(props.paddingRight)}`};
  ${props.padding && `padding:${format(props.padding)}`};
  ${props.paddingVertical &&
    `padding-top: ${format(props.paddingVertical)}; padding-bottom: ${format(props.paddingVertical)};`};
  ${props.paddingHorizontal &&
    `padding-left: ${format(props.paddingHorizontal)}; padding-right: ${format(props.paddingHorizontal)};`};
`;

export const borderProps = props => css`
  ${props.borderWidth && `border-width: ${format(props.borderWidth)}`};
  ${props.borderColor && `border-color: ${props.theme.color[props.borderColor] || props.borderColor}`};
  ${props.borderWidth && 'border-style: solid'};
  ${props.borderBottomWidth && 'border-bottom-style: solid '};
  ${props.borderTopWidth && 'border-top-style: solid'};
  ${props.borderLeftWidth && 'border-left-style: solid'};
  ${props.borderRightWidth && 'border-right-style: solid'};
  ${props.outline && `outling: ${props.outline}`};
  ${props.boxShadow && `box-shadow: ${props.boxShadow}`};

  ${props.borderRadius && `border-radius: ${format(props.borderRadius)}`};
  ${props.borderBottomWidth && `border-bottom-width: ${format(props.borderBottomWidth)}`};
  ${props.borderLeftWidth && `border-left-width: ${format(props.borderLeftWidth)}`};
  ${props.borderTopWidth && `border-top-width: ${format(props.borderTopWidth)}`};
  ${props.borderRightWidth && `border-right-width: ${format(props.borderRightWidth)}`};
  ${props.borderBottomRightRadius && `border-bottom-right-radius: ${format(props.borderBottomRightRadius)}`};
  ${props.borderBottomLeftRadius && `border-bottom-left-radius: ${format(props.borderBottomLeftRadius)}`};
  ${props.borderBottomColor && `border-bottom-color: ${props.borderBottomColor}`};
  ${props.borderLeftColor && `border-left-color: ${props.borderLeftColor}`};
  ${props.borderTopColor && `border-top-color: ${props.borderTopColor}`};
  ${props.borderRightColor && `border-right-color: ${props.borderRightColor}`};
`;

export const fontProps = props => css`
  ${props.fontSize && `font-size: ${format(props.fontSize)}`};
  ${props.fontWeight && `font-weight: ${props.fontWeight}`};
  ${props.color && `color: ${props.color}`};
  ${props.underline && 'text-decoration: underline'};
  ${props.whiteSpace && `white-space: ${props.whiteSpace}`};
  ${props.textOverflow && `text-overflow: ${props.textOverflow}`};
`;

export const flexProps = props => css`
  ${props.fdc && `flex-direction: ${'column'}`};
  ${props.fdr && `flex-direction: ${'row'}`};
  ${props.fw && `flex-wrap: ${'wrap'}`};
  ${props.fnw && `flex-wrap: ${'nowrap'}`};
  ${props.jcsb && `justify-content: ${'space-between'}`};
  ${props.jcfe && `justify-content: ${'flex-end'}`};
  ${props.jcfe && 'display: flex'};
  ${props.jcsa && `justify-content: ${'space-around'}`};
  ${props.jcc && `justify-content: ${'center'}`};
  ${props.aic && `align-items: ${'center'}`};
  ${props.aifs && `align-items: ${'flex-start'}`};
  ${props.ffrw && `flex-flow: ${'row wrap'}`};
  ${props.aife && `align-items: ${'flex-end'}`};
  ${props.flex && `flex: ${props.flex}`};
  ${(props.fdc || props.fdr || props.jcc || props.jcsa || props.aic || props.jcsb) && 'display: flex'};
  ${props.flexGrow && `flex-grow: ${props.flexGrow}`};
  ${props.flexShrink && `flex-shrink: ${props.flexShrink}`};
  ${props.flexWrap && `flex-grow: ${props.flexWrap}`};
`;

export const backgroundProps = props => css`
  ${props.backgroundColor && `background-color: ${props.backgroundColor}`};
  ${props.backgroundSize && `background-size: ${props.backgroundSize}`};
  ${props.background && `background: ${props.background}`};
  ${props.backgroundImage && `background-image: url("${props.backgroundImage}")`};
  ${props.opacity && `opacity: ${props.opacity}`};
`;

export const indentProps = props => css`
  ${props.indent && `margin-left: ${props.indent}em`};
`;

export const extraProps = props => css`
  ${props.cursor && `cursor: ${props.cursor}`};
  ${props.blur && `filter: blur(${format(props.blur)}) `};
  ${props.animation && `animation: ${props.animation}`};
  ${props.boxShadow && `box-shadow: ${props.boxShadow}`};
`;

export const buttonProps = props => css`
  ${props.small && 'padding: 4px'};
  ${props.big && 'padding: 10px'};
  ${props.disabledColor &&
    `&:disabled {
      background: ${props.disabledColor};
      border-color: ${props.disabledColor};
      cursor: not-allowed;
    }`};
`;

export const hoverProps = props => css`
  ${props.hoverBackground &&
    `
    &:hover {
      background: ${props.hoverBackground};
    }
  `};
  ${props.hoverColor &&
    `
    &:hover {
      color: ${props.hoverColor};
    }
  `};
`;
