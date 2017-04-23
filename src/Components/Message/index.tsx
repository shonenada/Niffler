import * as React from 'react';
import MessageModel from '../../Models/Message';
import './index.css';

interface MessageProps {
  message: MessageModel;
}

interface MessageState {}

class Message extends React.Component<MessageProps, MessageState> {

  render() {
    const message = this.props.message;

    const username = message.getUserName();
    const channel = message.getChannelName();
    const datetime = message.datetimeOutput();
    const messageText = message.textOutput();

    return (
      <div className="Message">
        <div className="Message-user">
          <span className="Message-username">{username} @ {channel}</span>
          <span className="Message-datetime">{datetime}</span>
        </div>
        <div className="Message-msg">
          <span dangerouslySetInnerHTML={{__html: messageText}} />
        </div>
      </div>
    );
  }

}

export default Message;