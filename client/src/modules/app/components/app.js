import { Component } from 'react';

class App extends Component {
  state = {}

  componentDidMount() {
    // startup here
  }

  render() {
    return this.props.children; // eslint-disable-line react/prop-types
  }
}

export default App;
