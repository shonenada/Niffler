import * as React from 'react';
import MessageModel from '../../Models/Message';
import Message from '../Message';
import './index.css';

interface MessageListProps {
  messages: MessageModel[];
}

interface MessageListState {}

class MessageList extends React.Component<MessageListProps, MessageListState> {
  render() {
    const messageList = this.props.messages.map((ele: MessageModel) => {
      return (
        <Message key={ele.key} message={ele} />
      );
    });
    return (
      <div className="MessageList">
        {messageList}
      </div>
    );
  }
}

export default MessageList