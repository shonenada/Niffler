
const BASE = 'https://api.bearychat.com/v1';

interface RTMResponse {
  code?: number;
  error?: string;
  user: any;
  ws_host: string;
}

class Client {

  token: string;
  ws_host: string;
  client: WebSocket;
  [listeners: string]: any;

  public constructor(token: string) {
    this.token = token;
    this.ws_host = null;
    this.listeners = {};
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
    const { type, data } = payload;
    const listeners = this.getListeners(type);
    listeners.map((cb: (e: any) => void) => { cb(data); })
  }

  public addListener(type: string, cb: ((arg: any) => any)) {
    if (!this.listeners[type]) {
      this.listeners[type] = [];
    }
    this.listeners[type].push(cb);
  }

  public getUrl(): Promise<RTMResponse> {
    return fetch(`${BASE}/rtm.start`, {
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
  }
}

export default Client;