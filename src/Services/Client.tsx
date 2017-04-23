import config from '../Config';

interface RTMResponse {
  code?: number;
  error?: string;
  user: any;
  ws_host: string;
}

class Client {

  pingId: number;
  ws_host: string;
  client: WebSocket;
  [listeners: string]: any;

  public constructor() {
    this.pingId = 0;
    this.ws_host = null;
    this.listeners = {};
  }

  private ping() {
    const payload = {
      type: 'ping',
      call_id: this.pingId,
    }
    this.pingId = this.pingId + 1;
    this.client.send(JSON.stringify(payload));
  }

  private onOpen() {
    console.log('Connected');
  }

  private onDisconnected() {
    console.log('Disconnected');
  }

  public getListeners(type: string) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    return this.listeners[type];
  }

  public onMessage(e: MessageEvent): void {
    const payload = JSON.parse(e.data);
    const listeners = this.getListeners(payload.type);
    listeners.map((cb: (e: any) => void) => { cb(payload); })
  }

  public addListener(type: string, cb: ((arg: any) => any)) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(cb);
  }

  public getUrl(): Promise<RTMResponse> {
    return fetch(`${config.proxyHTTPUrl}/rtm.start`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: this.token
      }),
    }).then((resp): Promise<RTMResponse> => {
      return resp.json();
    }).then((data: RTMResponse) => {
      if (data.code != 0) {
        throw new Error(data.error);
      } else {
        return data;
      }
    }).then((rv: RTMResponse) => {
      this.ws_host = rv.ws_host;
      return rv;
    });
  }

  public connect(url: string) {
    this.client = new WebSocket(url);
    this.client.onopen = (): void => { this.onOpen(); };
    this.client.onmessage = (e): void => { this.onMessage(e); };
    setInterval((): void => { this.ping() }, 10000);
  }
}

export default Client;