/**
 * 封装webscoket 与arduino通信桥梁
 */
module.exports.arduinoWss = function (data) {
    ws = new WebSocket("ws://localhost:3000");
    ws.onopen = function () {
        // 调试
        let buf1 = data;
        ws.send(buf1);
    };
    ws.onclose = function (event) {
        console.log("连接关闭");
    };
    ws.onerror = function (event) {
        ws.close();
        console.error("WebSocket error observed:", event);
        console.log("连接可能中断 保存好项目 从新连接串口!!");
    };

    // Promise 解决异步取值的问题
    function getServerMsg() {
        return new Promise((resolve, reject) => {
            ws.onmessage = function (mes) {
                message = mes.data;
                resolve(message);
                if (mes.data !== "") {
                    ws.close();
                }
            };
        });
    }
    return getServerMsg().then((ret) => ret);
};

// 用于 四按键获取数据模块
module.exports.arduinoWss2 = function (data) {
    // 调试
    console.log(data);
    let buf1 = new Buffer(data, "hex");
    ws = new WebSocket("ws://localhost:3000");
    ws.onopen = function () {
        ws.send(buf1);
    };
    ws.onclose = function (event) {
        console.log("连接关闭");
    };
    ws.onerror = function (event) {
        ws.close();
        console.error("WebSocket error observed:", event);
        console.log("连接可能中断 保存好项目 从新连接串口!!");
    };

    // Promise 解决异步取值的问题
    function getServerMsg() {
        return new Promise((resolve, reject) => {
            ws.onmessage = function (mes) {
                message = mes.data;
                resolve(message);
                // 全局fourControl
                window.fourControl = message;
                if (mes.data !== "") {
                    ws.close();
                }
            };
        });
    }
    return getServerMsg().then((ret) => ret);
};

/**
 * 封装webscoket 与arduino通信桥梁
 * 用于 摇杆模块
 */
module.exports.arduinoWss3 = function (direction, data) {
    // 调试
    console.log(data);
    let buf1 = new Buffer(data, "hex");
    ws = new WebSocket("ws://localhost:3000");
    ws.onopen = function () {
        ws.send(buf1);
    };
    ws.onclose = function (event) {
        console.log("连接关闭");
    };
    ws.onerror = function (event) {
        ws.close();
        console.error("WebSocket error observed:", event);
        console.log("连接可能中断 保存好项目 从新连接串口!!");
    };

    // Promise 解决异步取值的问题
    function getServerMsg() {
        return new Promise((resolve, reject) => {
            ws.onmessage = function (mes) {
                let message = parseInt(mes.data);
                let message_temp = 0;
                console.log(message);
                switch (direction) {
                    case "X":
                        // 正
                        if (message >= 0 && message < 110) {
                            let data1 = 240 * message;
                            console.log(data1);
                            let data2 = 26160 - data1;
                            let data3 = parseInt(data2 / 109);
                            message_temp = data3;
                        }
                        if (message >= 110 && message <= 115) {
                            message_temp = 0;
                        }
                        // 负
                        if (message > 115 && message <= 250) {
                            let data1 = 240 * message;
                            let data2 = 27840 - data1;
                            let data3 = parseInt(data2 / 134);
                            message_temp = data3;
                        }
                        if (message > 250) message_temp = -240;

                        break;
                    case "Y":
                        // 负
                        if (message >= 0 && message < 109) {
                            let data1 = message * 180;
                            let data2 = data1 - 19440;
                            message_temp = parseInt(data2 / 108);
                        }
                        if (message >= 109 && message <= 112) {
                            message_temp = 0;
                        }
                        // 正
                        if (message > 112 && message <= 248) {
                            let data1 = 180 * message;
                            let data2 = data1 - 20340;
                            let data3 = parseInt(data2 / 135);
                            message_temp = data3;
                        }
                        if (message > 248) message_temp = 180;

                        break;

                    default:
                        message_temp = 0;
                        break;
                }
                resolve(message_temp);
                if (mes.data !== "") {
                    ws.close();
                }
            };
        });
    }
    return getServerMsg().then((ret) => ret);
};
