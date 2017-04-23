import Channel from '../Models/Channel';
import config from '../Config';

interface ChannelMap {
  [cid: string]: Channel;
}

class Channels {

  channels: ChannelMap;

  constructor() {
    this.channels = {}
  }

  fetchAll() {
    fetch(`${config.proxyHTTPUrl}/channel.list`, {
      method: "GET",
    }).then((resp) => {
      return resp.json();
    }).then((data: any) => {
      data.map((each: any) => {
        this.channels[each.id] = new Channel(each.id, each.name);
      });
    });
  }

  getById(uid: string): Channel {
    return this.channels[uid];
  }

}

const channels = new Channels();

export default channels;