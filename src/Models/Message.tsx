import User from './User';
import Channel from './Channel';
import Users from '../Services/Users';
import Channels from '../Services/Channels';

class Message {

  _payload: any;
  key: string;
  user: User;
  channel: Channel;
  datetime: Date;
  text: string;

  constructor(key: string, user: User, channel: Channel, payload: any) {
    const { created_ts, text } = payload;
    this._payload = payload;
    this.key = key;
    this.user = user;
    this.channel = channel;
    this.text = text;
    this.datetime = new Date(created_ts);
  }

  encodeMention(text: string) {
    return text
    .replace(/<=([A-Za-z0-9\=]+)=>/, (match, encodedId, offset) => {
      const mentionMember = Users.getById(encodedId);
      if (mentionMember) {
        return mentionMember.name;
      }
      return match;
    })
    .replace(/<-([A-Za-z0-9\=]+)->/, (match, encodedId, offset) => {
      const mentionChannel = Channels.getById(encodedId);
      if (mentionChannel) {
        return mentionChannel.name;
      }
      return match;
    });
  }

  getUserName() {
    if (this.user) {
      return this.user.name;
    } else {
      return '***';
    }
  }

  getChannelName() {
    if (this.channel) {
      return this.channel.name;
    } else {
      '---';
    }
  }

  textOutput() {
    if (this._payload.subtype == 'sticker') {
      const image = this._payload.image;
      return `<img src="${image.url}" height="${image.height}" width="${image.width}" />`;
    }
    return this.encodeMention(this.text);
  }

  datetimeOutput() {
    const [date, timeWithMille] = this.datetime.toISOString().split('T');
    const [time, _] = timeWithMille.split('.');
    return `${date} ${time}`;
  }

}

export default Message;