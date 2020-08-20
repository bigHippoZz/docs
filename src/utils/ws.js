// 继承ws 创建实例对象
class enchanceWebSocket extends WebSocket {
    // 参数对象
    params = {};
    // 连接状态
    status = "disconnect";
    constructor(path) {
        super(path);
        super.onerror = this.onerror;
        super.onopen = this.onopen;
        super.onmessage = this.onmessage;
        this._resolve = () => {};
        this._reject = () => {};
    }
    // WebSocketServer连接成功后触发
    onopen() {
        super.send(this.params);
        this.status = "connected";
    }
    // 接收到WebSocketServer发送过来的数据触发
    onmessage(event) {
        this._resolve(event);
    }
    // 连接失败，发送、接收数据失败或者处理数据出现错误
    onerror(errVal) {
        this._reject(errVal);
    }
    // 发送消息
    send(params) {
        return new Promise((resolve, reject) => {
            if (this.status === "disconnect") this.params = params;
            else super.send(params);
            this._resolve = resolve;
            this._reject = reject;
        });
    }
}
