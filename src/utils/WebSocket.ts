// // 继承ws 创建实例对象
// class EnhanceWebSocket {
//     queue = []; // 暂存消息队列
//     connectionAttempts = 0; // 重连尝试次数
//     connection = null; // 当前的websocket对象
//     constructor(path, whetherToReconnect = false) {
//         this.path = path;
//         this.whetherToReconnect = whetherToReconnect; // 是否重连
//         this.openConnection();
//     }
//     // 创建websocket 对象
//     openConnection() {
//         try {
//             this.connection = new WebSocket(this.path);
//         } catch (error) {
//             this.connection = null;
//             throw new Error("openConnection () :", error);
//         } finally {
//             this.connectionAttempts += 1;
//         }
//         this.connection.onopen = val => this.onopen(val);
//         this.connection.onmessage = val => this.onmessage(val);
//         this.connection.onclose = val => this.onclose(val);
//         this.connection.onerror = val => this.onerror(val);
//     }
//     // WebSocketServer连接成功后触发
//     onopen() {
//         console.log(`Successfully connected to  server.`);
//         this.emptyTheQueue(this.queue);
//         this.queue = [];
//     }
//     // 接收到WebSocketServer发送过来的数据触发
//     onmessage(event) {}
//     // 连接失败，发送、接收数据失败或者处理数据出现错误
//     onerror(errVal) {
//         console.warn(`Websocket connection error: ${JSON.stringify(errVal)}`);
//         // 出现连接错误的时候，后面一定会执行关闭事件
//     }
//     onclose({ code, reason, wasclean }) {
//         //  close方法的event事件包含 wasclean code reason
//         //  wasclean 表示是否明确的关闭了ws
//         //  code表示后端返回的状态码
//         //  reason 代表后端返回的文本 可以看看有什么
//         console.log(code, "code");
//         console.log(reason, "reason");
//         console.log(wasclean, "wasclean");
//         console.warn(`Closed connection to websocket`);
//         if (this.whetherToReconnect) {
//             this.setTimeout(() => this.openConnection(), this.timeout);
//         }
//     }
//     // 发送消息
//     send(data) {
//         if (typeof data !== "string") {
//             data = this.stringifyData(data);
//         }
//         // this.connection.send(data);
//         if (this.status.status === 0) this.queue.push(data);
//     }
//     //字符串化数据
//     stringifyData(data) {
//         try {
//             return JSON.stringify(data);
//         } catch (error) {
//             throw new Error("stringifyData():" + error);
//         }
//     }
//     parseData(data) {
//         try {
//             return JSON.parse(data);
//         } catch (error) {
//             throw new Error("parseData():" + error);
//         }
//     }
//     emptyTheQueue(queue) {
//         const handle = index => {
//             if (index === queue.length) return;
//             this.connection.send(queue[index]);
//             requestAnimationFrame(() => handle(index + 1));
//         };
//         handle(0);
//     }
//     // 返回当前的状态
//     get status() {
//         switch (this.connection.readyState) {
//             case 0:
//                 return {
//                     status: 0,
//                     value: "正在建立链接",
//                 };
//             case 1:
//                 return {
//                     status: 1,
//                     value: "已经建立链接",
//                 };
//             case 2:
//                 return {
//                     status: 2,
//                     value: "正在关闭链接",
//                 };
//             case 3:
//                 return {
//                     status: 3,
//                     value: "已经关闭链接",
//                 };
//             default:
//                 return "this connection is empty !";
//         }
//     }
//     // 重连时间
//     get timeout() {
//         return (Math.pow(2, Math.min(this.connectionAttempts, 5)) - 1) * 1000;
//     }
//     setTimeout(func, time) {
//         this._setTimeout = window.setTimeout(func, time);
//     }
//     // 彻底关闭websocket
//     requestCloseConnection() {
//         if (
//             this.connection instanceof WebSocket &&
//             (this.status.status !== 2 || this.status.status !== 3)
//         ) {
//             this.connection.onclose = () => {};
//             this.connection.onerror = () => {};
//             console.log(this.connection);
//             this.connection.close();
//         }
//         this.clear();
//     }
//     // 清除各种引用
//     clear() {
//         if (this._setTimeout) {
//             clearTimeout(this._setTimeout);
//             this._setTimeout = null;
//         }
//         this.connection = null;
//         this.connectionAttempts = 0;
//     }
//     chunk(array, func) {
//         function handle() {
//             func(array.shift());
//             if (array.length) setTimeout(handle, 1000);
//         }
//         setTimeout(handle, 1000);
//     }
// }

// let log = console.log;

// // 记得清空ws
// // this.cloudProvider.requestCloseConnection();
// // this.cloudProvider = null;
// class CloudProvider {
//     /**
//      * A cloud data provider which creates and manages a web socket connection
//      * to the Scratch cloud data server. This provider is responsible for
//      * interfacing with the VM's cloud io device.
//      * @param {string} cloudHost The url for the cloud data server
//      * @param {VirtualMachine} vm The Scratch virtual machine to interface with
//      * @param {string} username The username to associate cloud data updates with
//      * @param {string} projectId The id associated with the project containing
//      * cloud data.
//      */
//     constructor(cloudHost, vm, username, projectId) {
//         this.vm = vm;
//         this.username = username;
//         this.projectId = projectId;
//         this.cloudHost = cloudHost;

//         this.connectionAttempts = 0;

//         // A queue of messages to send which were received before the
//         // connection was ready
//         this.queuedData = [];

//         this.openConnection();

//         // Send a message to the cloud server at a rate of no more
//         // than 10 messages/sec.
//         this.sendCloudData = throttle(this._sendCloudData, 100);
//     }

//     /**
//      * Open a new websocket connection to the clouddata server.
//      * @param {string} cloudHost The cloud data server to connect to.
//      */
//     openConnection() {
//         this.connectionAttempts += 1;

//         try {
//             this.connection = new WebSocket(
//                 (location.protocol === "http:" ? "ws://" : "wss://") +
//                     this.cloudHost
//             );
//         } catch (e) {
//             log.warn("Websocket support is not available in this browser", e);
//             this.connection = null;
//             return;
//         }

//         this.connection.onerror = this.onError.bind(this);
//         this.connection.onmessage = this.onMessage.bind(this);
//         this.connection.onopen = this.onOpen.bind(this);
//         this.connection.onclose = this.onClose.bind(this);
//     }

//     onError(event) {
//         log.error(`Websocket connection error: ${JSON.stringify(event)}`);
//         // Error is always followed by close, which handles reconnect logic.
//     }

//     onMessage(event) {
//         const messageString = event.data;
//         // Multiple commands can be received, newline separated
//         messageString.split("\n").forEach(message => {
//             if (message) {
//                 // .split can also contain '' in the array it returns
//                 const parsedData = this.parseMessage(JSON.parse(message));
//                 this.vm.postIOData("cloud", parsedData);
//             }
//         });
//     }

//     onOpen() {
//         // Reset connection attempts to 1 to make sure any subsequent reconnects
//         // use connectionAttempts=1 to calculate timeout
//         this.connectionAttempts = 1;
//         this.writeToServer("handshake");
//         log.info(`Successfully connected to clouddata server.`);

//         // Go through the queued data and send off messages that we weren't
//         // ready to send before
//         this.queuedData.forEach(data => {
//             this.sendCloudData(data);
//         });
//         // Reset the queue
//         this.queuedData = [];
//     }

//     onClose() {
//         log.info(`Closed connection to websocket`);
//         const randomizedTimeout = this.randomizeDuration(
//             this.exponentialTimeout()
//         );
//         this.setTimeout(this.openConnection.bind(this), randomizedTimeout);
//     }

//     exponentialTimeout() {
//         return (Math.pow(2, Math.min(this.connectionAttempts, 5)) - 1) * 1000;
//     }

//     randomizeDuration(t) {
//         return Math.random() * t;
//     }

//     setTimeout(fn, time) {
//         log.info(
//             `Reconnecting in ${(time / 1000).toFixed(1)}s, attempt ${
//                 this.connectionAttempts
//             }`
//         );
//         this._connectionTimeout = window.setTimeout(fn, time);
//     }

//     parseMessage(message) {
//         const varData = {};
//         switch (message.method) {
//             case "set": {
//                 varData.varUpdate = {
//                     name: message.name,
//                     value: message.value,
//                 };
//                 break;
//             }
//         }
//         return varData;
//     }

//     /**
//      * Format and send a message to the cloud data server.
//      * @param {string} methodName The message method, indicating the action to perform.
//      * @param {string} dataName The name of the cloud variable this message pertains to
//      * @param {string | number} dataValue The value to set the cloud variable to
//      * @param {string} dataNewName The new name for the cloud variable (if renaming)
//      */
//     writeToServer(methodName, dataName, dataValue, dataNewName) {
//         const msg = {};
//         msg.method = methodName;
//         msg.user = this.username;
//         msg.project_id = this.projectId;

//         // Optional string params can use simple falsey undefined check
//         if (dataName) msg.name = dataName;
//         if (dataNewName) msg.new_name = dataNewName;

//         // Optional number params need different undefined check
//         if (typeof dataValue !== "undefined" && dataValue !== null)
//             msg.value = dataValue;

//         const dataToWrite = JSON.stringify(msg);
//         if (this.connection && this.connection.readyState === WebSocket.OPEN) {
//             this.sendCloudData(dataToWrite);
//         } else if (
//             msg.method === "create" ||
//             msg.method === "delete" ||
//             msg.method === "rename"
//         ) {
//             // Save data for sending when connection is open, iff the data
//             // is a create, rename, or  delete
//             this.queuedData.push(dataToWrite);
//         }
//     }

//     /**
//      * Send a formatted message to the cloud data server.
//      * @param {string} data The formatted message to send.
//      */
//     _sendCloudData(data) {
//         this.connection.send(`${data}\n`);
//     }

//     /**
//      * Provides an API for the VM's cloud IO device to create
//      * a new cloud variable on the server.
//      * @param {string} name The name of the variable to create
//      * @param {string | number} value The value of the new cloud variable.
//      */
//     createVariable(name, value) {
//         this.writeToServer("create", name, value);
//     }

//     /**
//      * Provides an API for the VM's cloud IO device to update
//      * a cloud variable on the server.
//      * @param {string} name The name of the variable to update
//      * @param {string | number} value The new value for the variable
//      */
//     updateVariable(name, value) {
//         this.writeToServer("set", name, value);
//     }

//     /**
//      * Provides an API for the VM's cloud IO device to rename
//      * a cloud variable on the server.
//      * @param {string} oldName The old name of the variable to rename
//      * @param {string} newName The new name for the cloud variable.
//      */
//     renameVariable(oldName, newName) {
//         this.writeToServer("rename", oldName, null, newName);
//     }

//     /**
//      * Provides an API for the VM's cloud IO device to delete
//      * a cloud variable on the server.
//      * @param {string} name The name of the variable to delete
//      */
//     deleteVariable(name) {
//         this.writeToServer("delete", name);
//     }

//     /**
//      * Closes the connection to the web socket and clears the cloud
//      * provider of references related to the cloud data project.
//      */
//     requestCloseConnection() {
//         if (
//             this.connection &&
//             this.connection.readyState !== WebSocket.CLOSING &&
//             this.connection.readyState !== WebSocket.CLOSED
//         ) {
//             log.info("Request close cloud connection without reconnecting");
//             // Remove listeners, after this point we do not want to react to connection updates
//             this.connection.onclose = () => {};
//             this.connection.onerror = () => {};
//             this.connection.close();
//         }
//         this.clear();
//     }

//     /**
//      * Clear this provider of references related to the project
//      * and current state.
//      */
//     clear() {
//         this.connection = null;
//         this.vm = null;
//         this.username = null;
//         this.projectId = null;
//         if (this._connectionTimeout) {
//             clearTimeout(this._connectionTimeout);
//             this._connectionTimeout = null;
//         }
//         this.connectionAttempts = 0;
//     }
// }

// export { EnhanceWebSocket, CloudProvider };
