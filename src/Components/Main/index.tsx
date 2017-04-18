import * as React from 'react';
import Client from '../../Services/Client';
import './index.css';

interface MainProps {}

interface MainState {
  data: string;
}

class Main extends React.Component<MainProps, MainState> {
  
  client: Client;

  constructor() {
    super();
    this.state = {
      data: '',
    }
  }

  connect(url: string) {
    this.client.connect(url);
  }

  updateData(data: string) {
    this.setState({data: data});
  }

  componentDidMount() {
  }

  render() {
    return (
      <div className="Main">
      </div>
    );
  }
}

export default Main;