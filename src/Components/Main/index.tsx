import * as React from 'react';
import Message from '../../Models/Message';
import Client from '../../Services/Client';
import UserService from '../../Services/Users';
import ChannelService from '../../Services/Channels';
import MessageList from '../MessageList';
import config from '../../Config';
import './index.css';

interface MainProps {}

interface MainState {
  data: string;
  messages: Message[];
}

class Main extends React.Component<MainProps, MainState> { 
  client: Client;

  constructor() {
    super();
    this.client = new Client();
    this.state = {
      data: '',
      messages: [],
    };
  }

  connect(url: string) {
    this.client.connect(url);
  }

  updateData(data: string) {
    this.setState({data: data});
  }

  componentDidMount() {
    ChannelService.fetchAll();
    UserService.fetchAll();
    this.client.connect(config.proxyWSUrl);
    this.client.addListener('channel_message', (data: any): void => {
      let msgs = this.state.messages;
      const user = UserService.getById(data.uid);
      const channel = ChannelService.getById(data.vchannel_id);
      const msg = new Message(data.key, user, channel, data);
      if (user) {
        msgs.push(msg);
        this.setState({
          messages: msgs,
        });
      }
    });
  }

render() {
    return (
      <div className="Main">
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default Main;