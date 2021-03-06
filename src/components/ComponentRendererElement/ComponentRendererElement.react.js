import PropTypes from 'prop-types';
import { Component } from 'react';
import './ComponentRendererElement.less';

export default
class ComponentRendererElement extends Component {
  componentWillMount(nextProps) {
    this._oldStyles = [].slice.call(document.head.getElementsByTagName('style'));
  }

  componentWillUpdate(nextProps) {
    if (this.props.componentId !== nextProps.componentId) {
      this.flushComponentSpecificStyles();
    }
  }

  flushComponentSpecificStyles() {
    // webpack styles loader fix. Little tricky. But I have no more ideas =)
    let stylesDiff = this._newStyles.filter(newStyle =>
      !this._oldStyles.some(oldStyle => oldStyle === newStyle)
    );
    stylesDiff.map(style => style.parentNode.removeChild(style));
  }

  render() {
    this._newStyles = [].slice.call(document.head.getElementsByTagName('style'));
    return this.props.element || null;
  }
}

ComponentRendererElement.propTypes = {
  element: PropTypes.element,
  componentId: PropTypes.string
};
