const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const TargetType = require("../../extension-support/target-type");
const formatMessage = require("format-message");
const arduinoUtil = require("./arduinoUtil.js");
const arduinoScoket = require("./arduinoScoket.js");
window.fourControl = "";
window.fourControlIndex = "";
// const arduinoScoket = require("./arduinoScoket.js");

//const io = require('socket.io-client');  yarn add socket.io-client socket.io-client@2.2.0
// const serialport = require('serialport');
/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
// const blockIconURI =''
const blockIconURI = "";

const menuIconURI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAC4jAAAuIwF4pT92AAAG/GlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDIwLTAxLTIwVDE0OjM1OjQ1KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIwLTAxLTIwVDE0OjM1OjQ1KzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMC0wMS0yMFQxNDozNTo0NSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozM2QyNGZmMS1lZWI5LTJmNDktYmZiNi0xMTFlYjE0OTY4YmMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDozOTg4ZGRkZC1iNmU5LWZhNDktYjgwMS03ZjMwM2M5ZjAwMDEiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo0ZTNkODRiYS03NzY3LTNlNGQtOTU5MS0zYjExMDE4OGZjM2EiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjRlM2Q4NGJhLTc3NjctM2U0ZC05NTkxLTNiMTEwMTg4ZmMzYSIgc3RFdnQ6d2hlbj0iMjAyMC0wMS0yMFQxNDozNTo0NSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDozM2QyNGZmMS1lZWI5LTJmNDktYmZiNi0xMTFlYjE0OTY4YmMiIHN0RXZ0OndoZW49IjIwMjAtMDEtMjBUMTQ6MzU6NDUrMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+MTc5NzNDQ" +
    "jA4RjA0M0E0NTc4MDhBMTk1MDdFNzRERDE8L3JkZjpsaT4gPHJkZjpsaT5CODJEMDYyOTAwNzVBRjYyNUYzNkRBQjdFMzg1NUZDNzwvcmRmOmxpPiA8cmRmOmxpPmFkb2JlOmRvY2lkOnBob3Rvc2hvcDphOWY5MzkyOS0xOGU0LTkxNGUtOWE2NC0yNDRmZGY2YzA3NTY8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4AobUBAAAZy0lEQVR4nO2aZ5ScV5nnf/eNlVPnqCxLshUtYeMgOWDBGC+sjT0Y7GUw7GIYZliOWRiYPTs7hoHlYDAc2wywO4sJgjHGAdvYBIGTnGQ5SLLU6qDQ6laHqu6unN56w90PVV3KM3P27B59wM+X7qq6732f53+f/FwhpeRPmZRzzcC5prcBONcMnGt6G4BzzcC5prcBONcMnGt6G4BzzcC5pj95ALQTP3zjrXTiwYHU7T39fbq0LW9ycgpdN0DUf/ccB08oet+y5Uc2RtwfTdx/L3PT08Q7OvjobR8j6A9QrZaRUqCqKj6fj5/+9CccPHiQSCSC53mUK2VuueVWzj9/Bem5LPXNJa2tMf6w/RleenEHsVgcgGwmwxVXXc3mKy5lJpVBCAWQJFpi7Nt3gF8/9him6yEv3spfLdp748pn/+7GTEV1NFWTAAKB4zpomkZo4QLB4f3aMz23/PbK2771ozMC8OpE7r3/bknia8vcScaKRRauWUitVkMCSIlh6Kiuzbbdr87umBp9s21mpliq1DQlk8e2bGGrjrSqNUCgqRqaqot8Ni8L+SICBSkluXwOq2LhOhKrWkMIgZQSz0UU8yWZTmcRaCBgbi5DsVgWngtWpSYVVcGTEteRolKuyrnZNKFA2GXgNXVkaPtX9IW3rmhZsZFyqQyARKLrGqWqxYGZHGu2/Dmr9j9xCXBmAMqKefElRpnv3vrvWb3lSm6+9z7s5DQSkNLDbAnjzM1y33fvaB08PLa7t79PZotFsWTxYvoioKkVSk4FqGtAazxIcXqYvS/8ns7OTmq2TbVapcW4lU6/i2eUUYSC57l0BcHNjfHS7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";

// 数据头
const DATA_HEAD = "0FFF";

// 数据尾
const DATA_TAIL = "0D0A";

//版本号
let data_v = "00";

// 延时
let data_time = 250;

// 数据头数据尾重复的问题
function merge_data() {
    let string_data = "";
    for (var i = 0; i < arguments.length; i++) {
        string_data += arguments[i];
    }

    return DATA_HEAD + data_v + string_data + DATA_TAIL;
}

// merge_data("11", "22", "33");

// 封装的websocket方法
function wss(data) {
    // 调试16进制转换成功与否
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
                if (mes.data !== "") {
                    ws.close();
                }
            };
        });
    }
    return getServerMsg().then((ret) => ret);
}

//const TOPIC = 'eim/arduino'

// EIM: Everything Is Message
class ArduinoBlocks {
    constructor(runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;

        // websocket
        //this.ws = new WebSocket('ws://localhost:3000')

        // const url = new URL(window.location.href);
        // var adapterHost = url.searchParams.get('adapter_host'); // 支持树莓派(分布式使用)
        // if (!adapterHost) {
        //     var adapterHost = "codelab-adapter.codelab.club";
        // }

        // this.socket = io(`//${adapterHost}:12358` + '/test', {
        //     transports: ['websocket']
        // });
        // this.socket.on('sensor', msg => {
        //     console.log(msg.data);
        //     this.data = msg.data;
        //     const topic = this.data.topic;
        //     const message = this.data.payload;

        //     // 任何消息都进入
        //     this.message = message; // 可能被清空
        //     this.topic = topic;
        //     this.origin_message = message;
        //     // }
        // });
    }

    /**
     * The key to load & store a target's test-related state.
     * @type {string}
     */
    static get STATE_KEY() {
        return "Scratch.arduino";
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo() {
        return {
            id: "arduino",
            colour: "#58A0F2",
            colourSecondary: "#AACBF2",
            colourTertiary: "#58A0F2",
            name: "LETOPO-UNO",
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            //showStatusButton: true,
            blocks: [
                // --------------------------输入------------------------------
                // 按键模块1
                {
                    opcode: "keyModel",
                    blockType: BlockType.REPORTER,
                    text: "按键模块 读取 端口[index]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort",
                            defaultValue: "1",
                        },
                    },
                },
                // 触摸模块2
                {
                    opcode: "touchModel",
                    blockType: BlockType.REPORTER,
                    text: "触摸模块 读取 端口[index]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort",
                            defaultValue: "1",
                        },
                    },
                },
                // 拨位模块3
                {
                    opcode: "outModel",
                    blockType: BlockType.REPORTER,
                    text: "拨位模块 读取 端口[index]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort",
                            defaultValue: "1",
                        },
                    },
                },
                // 电位模块4
                {
                    opcode: "electricityModel",
                    blockType: BlockType.REPORTER,
                    text: "电位模块 读取 端口[index]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort1",
                            defaultValue: "1",
                        },
                    },
                },
                // 光感模块5
                {
                    opcode: "lightModel",
                    blockType: BlockType.REPORTER,
                    text: "光感模块 读取 端口[index]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort1",
                            defaultValue: "1",
                        },
                    },
                },
                // 雨滴模块6
                {
                    opcode: "rainModel",
                    blockType: BlockType.REPORTER,
                    text: "雨滴模块 读取 端口[index]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort1",
                            defaultValue: "1",
                        },
                    },
                },
                // 灰度模块7
                {
                    opcode: "greyModel",
                    blockType: BlockType.REPORTER,
                    text: "灰度模块 读取 端口[index] [direction]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort3",
                            defaultValue: "3",
                        },
                        direction: {
                            type: ArgumentType.STRING,
                            menu: "direction",
                            defaultValue: "左",
                        },
                    },
                },
                // 人体红外模块8
                {
                    opcode: "infraredModel",
                    blockType: BlockType.REPORTER,
                    text: "人体红外模块 读取 端口[index]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort",
                            defaultValue: "1",
                        },
                    },
                },
                // 超声测距模块9
                {
                    opcode: "ultrasoundModel",
                    blockType: BlockType.REPORTER,
                    text: "超声测距模块 读取 端口[index] 单位:cm",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort",
                            defaultValue: "1",
                        },
                    },
                },
                // 温湿度模块10
                {
                    opcode: "humitureModel",
                    blockType: BlockType.REPORTER,
                    text: "温湿度模块 读取 端口[index] [temperature]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort",
                            defaultValue: "1",
                        },
                        temperature: {
                            type: ArgumentType.STRING,
                            menu: "humiture",
                            defaultValue: "温度℃",
                        },
                    },
                },
                // 颜色模块a 11
                {
                    opcode: "colorModela",
                    blockType: BlockType.REPORTER,
                    text: "颜色模块 读取 端口[index] 读取[RGB]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort4",
                            defaultValue: "1",
                        },
                        RGB: {
                            type: ArgumentType.STRING,
                            menu: "RGB",
                            defaultValue: "R",
                        },
                    },
                },
                //颜色模块b12
                {
                    opcode: "colorModelb",
                    blockType: BlockType.REPORTER,
                    text: "颜色模块 读取 端口[index] 读取[color]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort4",
                            defaultValue: "1",
                        },
                        color: {
                            type: ArgumentType.STRING,
                            menu: "color",
                            defaultValue: "红",
                        },
                    },
                },
                // 单灰度模块13
                {
                    opcode: "singleModel",
                    blockType: BlockType.REPORTER,
                    text: "单灰度模块 读取 端口[index] ",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort1",
                            defaultValue: "1",
                        },
                    },
                },
                // 陀螺仪模块14
                {
                    opcode: "gyroModel",
                    blockType: BlockType.REPORTER,
                    text: "陀螺仪模块  端口3 读取[index] ",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "XY",
                            defaultValue: "X轴旋转角",
                        },
                    },
                },

                "---",

                // -------------------------------输出--------------------------------

                // 四按键模块 -获取
                {
                    opcode: "fourControlTowModela",
                    blockType: BlockType.COMMAND,
                    text: "获取四按键模块 端口[index] ",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort1",
                            defaultValue: "1",
                        },
                    },
                },

                // 四按键模块 应用
                {
                    opcode: "fourControlModel",
                    blockType: BlockType.REPORTER,
                    text: "四按键模块 [index] [control] 是否被按下",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort",
                            defaultValue: "1",
                        },
                        control: {
                            type: ArgumentType.STRING,
                            menu: "control2",
                            defaultValue: "A",
                        },
                    },
                },

                "---",

                // 摇杆模块 28
                {
                    opcode: "rockerControlModel",
                    blockType: BlockType.REPORTER,
                    text: "摇杆模块 [index] [control] 是否被按下",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort3",
                            defaultValue: "3",
                        },
                        control: {
                            type: ArgumentType.STRING,
                            menu: "control3",
                            defaultValue: "X",
                        },
                    },
                },

                "---",

                // led模块a15
                {
                    opcode: "ledModela",
                    blockType: BlockType.COMMAND,
                    text: "led模块 设置 端口[index] 亮度为(0~255)[brightness]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort5",
                            defaultValue: "4",
                        },
                        brightness: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },

                // led模块b16
                {
                    opcode: "ledModelb",
                    blockType: BlockType.COMMAND,
                    text: "led模块 设置 端口[index] [switch]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort6",
                            defaultValue: "1",
                        },
                        switch: {
                            type: ArgumentType.STRING,
                            menu: "switch",
                            defaultValue: "开",
                        },
                    },
                },
                "---",

                // 蜂鸣模块a17
                {
                    opcode: "buzzingModela",
                    blockType: BlockType.COMMAND,
                    text: "蜂鸣模块 设置 端口[index] 响度为(0~255)[loudness]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort5",
                            defaultValue: "4",
                        },
                        loudness: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },

                // 蜂鸣模块b18
                {
                    opcode: "buzzingModelb",
                    blockType: BlockType.COMMAND,
                    text: "蜂鸣模块 设置 端口[index] [switch]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort6",
                            defaultValue: "1",
                        },
                        switch: {
                            type: ArgumentType.STRING,
                            menu: "switch",
                            defaultValue: "开",
                        },
                    },
                },
                "---",

                // 震动模块a19
                {
                    opcode: "shakeModela",
                    blockType: BlockType.COMMAND,
                    text: "震动模块 设置 端口[index] 响度为(0~255)[amplitude]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort5",
                            defaultValue: "4",
                        },
                        amplitude: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                // 震动模块b20
                {
                    opcode: "shakeModelb",
                    blockType: BlockType.COMMAND,
                    text: "震动模块 设置 端口[index] [switch]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort6",
                            defaultValue: "4",
                        },
                        switch: {
                            type: ArgumentType.STRING,
                            menu: "switch",
                            defaultValue: "开",
                        },
                    },
                },
                "---",

                // rgb模块a21
                {
                    opcode: "rgbModela",
                    blockType: BlockType.COMMAND,
                    text:
                        "rgb模块 设置 端口[index] [index2] 亮度为(0~255) R值[R] G值[G] B值[B]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort7",
                            defaultValue: "1",
                        },
                        index2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1,
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        G: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                // rgb模块b22
                {
                    opcode: "rgbModelb",
                    blockType: BlockType.COMMAND,
                    text:
                        "rgb模块 设置 端口[index] 全部亮度为(0~255) R值[R] G值[G] B值[B]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort7",
                            defaultValue: "1",
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        G: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                "---",

                // 直流电机模块23
                {
                    opcode: "motorModel",
                    blockType: BlockType.COMMAND,
                    text:
                        "直流电机模块 设置 端口[index] [state]转 速度为(0~255)[rev]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort8",
                            defaultValue: "4",
                        },
                        state: {
                            type: ArgumentType.STRING,
                            menu: "motorState",
                            defaultValue: "停止",
                        },
                        rev: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                // 舵机模块24
                {
                    opcode: "engineModel",
                    blockType: BlockType.COMMAND,
                    text:
                        "舵机模块 设置 端口[index] 拓展口[expand]角度(10~170) [angle]延时(毫秒) [delayed] ",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort7",
                            defaultValue: "1",
                        },
                        expand: {
                            type: ArgumentType.STRING,
                            menu: "serialPort2",
                            defaultValue: "1",
                        },
                        angle: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                        delayed: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0,
                        },
                    },
                },
                // ------------------------通信模块-----------------------------
                // 获取遥控数据25
                // {
                //     opcode: 'getControlModel',
                //     blockType: BlockType.COMMAND,
                //     text: '获取遥控数据 ',
                //     arguments: {}
                // },
                // // 遥控模块 26
                // {
                //     opcode: 'ControlModel',
                //     blockType: BlockType.COMMAND,
                //     text: '遥控 [index1] 是否被按下',
                //     arguments: {
                //         index1: {
                //             type: ArgumentType.STRING,
                //             menu: 'control',
                //             defaultValue: '左'
                //         }
                //     }
                // 四按键模块 27
                // {
                //     opcode: "fourControlModel",
                //     blockType: BlockType.REPORTER,
                //     text: "四按键模块 [index] [control] 是否被按下",
                //     arguments: {
                //         index: {
                //             type: ArgumentType.STRING,
                //             menu: "serialPort",
                //             defaultValue: "1",
                //         },
                //         control: {
                //             type: ArgumentType.STRING,
                //             menu: "control2",
                //             defaultValue: "A",
                //         },
                //     },
                // },
            ],
            menus: {
                serialPort: ["1", "3", "4", "8", "9"],
                serialPort1: ["1", "3", "4", "5", "8", "9"],
                serialPort2: ["1", "2"],
                serialPort3: ["3", "5"],
                serialPort4: ["1", "9"],
                serialPort5: ["4", "8", "9"],
                serialPort6: ["1", "3", "4", "8", "9"],
                serialPort7: ["1", "3", "4", "8", "9"],
                serialPort8: ["4", "8", "9"],
                direction: ["左", "右"],
                humiture: ["温度℃", "湿度%"],
                RGB: ["R", "G", "B"],
                color: ["红", "蓝", "绿", "黄", "白", "黑"],
                XY: ["X旋转角", "Y旋转角", "Z旋转角"],
                switch: ["开", "关"],
                light: [
                    "全部灯",
                    "第一盏灯",
                    "第二盏灯",
                    "第三盏灯",
                    "第四盏灯",
                ],
                motorState: ["停止", "正", "反"],
                control: [
                    "上",
                    "下",
                    "左",
                    "右",
                    "A",
                    "B",
                    "C",
                    "D",
                    "E",
                    "F",
                    "L",
                    "R",
                ],
                control2: ["A", "B", "C", "D"],
                control3: ["X", "Y"],
            },
        };
    }

    /**
     * Retrieve the block primitives implemented by this package.
     * @return {object.<string, Function>} Mapping of opcode to Function.
     */

    // setLed(args) {
    //     const payload = `ser.write(bytearray([0xff,0xaa,0x9,0x0,0x2,0x8,0x7,0x2,${args.index},${args.red},${args.green},${args.blue}]))`;
    //     this.socket.emit('actuator', { topic: TOPIC, payload: payload });
    //     return;
    // }

    // 按键模块1
    keyModel(args) {
        let data_pin = "0501";
        let data_port = arduinoUtil.switcha(args.index);
        let total_data = merge_data(data_pin, data_port);

        // 端口不可用提示
        arduinoUtil.banPort(args.index);

        return wss(total_data);
    }
    // 触摸模块2
    touchModel(args) {
        let data_pin = "0501";
        let data_port = arduinoUtil.switcha(args.index);
        let total_data = merge_data(data_pin, data_port);
        // 端口不可用提示
        arduinoUtil.banPort(args.index);

        return wss(total_data);
    }

    // 拨位模块3
    outModel(args) {
        let data_pin = "0501";
        let data_port = arduinoUtil.switcha(args.index);
        let total_data = merge_data(data_pin, data_port);

        return wss(total_data);
    }

    // 电位模块4
    electricityModel(args) {
        let data_pin = "0502";
        let data_port = arduinoUtil.switchb(args.index);
        let total_data = merge_data(data_pin, data_port);

        return wss(total_data);
    }

    // 光感5
    lightModel(args) {
        let data_pin = "0502";
        let data_port = arduinoUtil.switchb(args.index);
        let total_data = merge_data(data_pin, data_port);

        return wss(total_data);
    }

    // 雨滴6
    rainModel(args) {
        let data_pin = "0502";
        let data_port = arduinoUtil.switchb(args.index);
        let total_data = merge_data(data_pin, data_port);

        return wss(total_data);
    }

    // 灰度
    greyModel(args) {
        let data_pin = "0703";
        let data_port1 = arduinoUtil.switchj(args.index);
        let data_port2 = arduinoUtil.switchk(args.direction);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        return wss(total_data);
    }

    // 人体红外
    infraredModel(args) {
        let data_pin = "0501";
        let data_port = arduinoUtil.switcha(args.index);
        let total_data = merge_data(data_pin, data_port);

        return wss(total_data);
    }

    // 超声测距
    ultrasoundModel(args) {
        let data_pin = "0604";
        let data_port = arduinoUtil.switchl(args.index);
        let total_data = merge_data(data_pin, data_port);

        return wss(total_data);
    }

    // 温湿度
    humitureModel(args) {
        let data_pin = "0605";
        let data_port1 = arduinoUtil.switchf(args.index);
        let data_port2 = arduinoUtil.switchn(args.temperature);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        return wss(total_data);
    }

    // 颜色a1
    colorModela(args) {
        let data_pin = "0806";
        let data_port1 = arduinoUtil.switchc(args.index);
        let data_port2 = arduinoUtil.switchd(args.RGB);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        return wss(total_data);
    }

    // 颜色b2
    colorModelb(args) {
        let data_pin = "0807";
        let data_port1 = arduinoUtil.switchc(args.index);
        let data_port2 = arduinoUtil.switche(args.color);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        // 调用判断方法

        return wss(total_data);
    }

    // 单灰度
    singleModel(args) {
        let data_pin = "0502";
        let data_port = arduinoUtil.switchb(args.index);
        let total_data = merge_data(data_pin, data_port);

        return wss(total_data);
    }
    // 陀螺仪
    gyroModel(args) {
        let data_pin = "0508";
        let data_port = arduinoUtil.switcht(args.index);
        let total_data = merge_data(data_pin, data_port);

        return wss(total_data);
    }

    //------------------------------------------------------------------------------

    // leda
    ledModela(args) {
        let data_pin = "0609";
        let data_port1 = arduinoUtil.switchg(args.index);
        let data_port2 = arduinoUtil.hexadecimal(args.brightness); //输出16进制
        let total_data = merge_data(data_pin, data_port1, data_port2);

        // 调用 封装websocket方法
        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // ledb
    ledModelb(args) {
        let data_pin = "060a";
        let data_port1 = arduinoUtil.switchh(args.index);
        let data_port2 = arduinoUtil.switchi(args.switch);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 蜂鸣a
    buzzingModela(args) {
        let data_pin = "0609";
        let data_port1 = arduinoUtil.switchg(args.index);
        let data_port2 = arduinoUtil.hexadecimal(args.loudness);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 蜂鸣b
    buzzingModelb(args) {
        let data_pin = "060a";
        let data_port1 = arduinoUtil.switchh(args.index);
        let data_port2 = arduinoUtil.switchi(args.switch);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 震动a
    shakeModela(args) {
        let data_pin = "0609";
        let data_port1 = arduinoUtil.switchg(args.index);
        let data_port2 = arduinoUtil.hexadecimal(args.amplitude);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 震动b
    shakeModelb(args) {
        let data_pin = "060a";
        let data_port1 = arduinoUtil.switchh(args.index);
        let data_port2 = arduinoUtil.switchi(args.switch);
        let total_data = merge_data(data_pin, data_port1, data_port2);

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // rgba
    rgbModela(args) {
        let data_pin = "090b";
        let data_port1 = arduinoUtil.switchf(args.index);
        let data_port2 = arduinoUtil.hexadecimal(args.index2);
        let data_port3_R = arduinoUtil.hexadecimal(args.R);
        let data_port3_G = arduinoUtil.hexadecimal(args.G);
        let data_port3_B = arduinoUtil.hexadecimal(args.B);
        let total_data = merge_data(
            data_pin,
            data_port1,
            data_port2,
            data_port3_R,
            data_port3_G,
            data_port3_B
        );

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // rgbb
    rgbModelb(args) {
        let data_pin = "080c";
        let data_port1 = arduinoUtil.switchf(args.index);
        let data_port3_R = arduinoUtil.hexadecimal(args.R);
        let data_port3_G = arduinoUtil.hexadecimal(args.G);
        let data_port3_B = arduinoUtil.hexadecimal(args.B);
        let total_data = merge_data(
            data_pin,
            data_port1,
            data_port3_R,
            data_port3_G,
            data_port3_B
        );

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 直流电机
    motorModel(args) {
        let data_pin = "080e";
        let data_port1 = arduinoUtil.switchm(args.index);
        let data_port2 = arduinoUtil.switcho(args.state);
        let data_port3 = arduinoUtil.hexadecimal(args.rev);
        let total_data = merge_data(
            data_pin,
            data_port1,
            data_port2,
            data_port3
        );

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }
    // 舵机
    engineModel(args) {
        let data_pin = "070e";
        let data_port1 = arduinoUtil.switchf(args.index);
        let data_port2 = arduinoUtil.switchp(args.expand);
        let data_port3 = arduinoUtil.hexadecimal(args.angle);
        let data_port4 = arduinoUtil.hexadecimal(args.delayed);
        let total_data = merge_data(
            data_pin,
            data_port1,
            data_port2,
            data_port3,
            data_port4
        );

        wss(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 获取遥控数据
    // getControlModel(args) {
    //     console.log('test', args.VALUE)
    // }

    // // 获取遥控数据 处理方法
    // ControlModel(args) {
    //     console.log('test', args.VALUE)
    // }

    // 摇杆模块 处理方法
    rockerControlModel(args) {
        let data_pin = "0712";
        let data_port1 = arduinoUtil.switchj(args.index);
        let data_port2 = arduinoUtil.switchs(args.control);

        let total_data = merge_data(data_pin, data_port1, data_port2);

        // 调用 封装websocket方法
        return arduinoScoket.arduinoWss3(args.control, total_data);
    }

    // 四按键模块 处理方法 -- 圆
    fourControlModel(args) {
        return arduinoUtil.switchu(args.index, args.control);
    }

    // 四按键模块 处理方法2
    fourControlTowModela(args) {
        let data_pin = "0611";
        let data_port1 = arduinoUtil.switchq(args.index);
        window.fourControlIndex = args.index;

        // let total_data = DATA_HEAD + data_v + data_pin + data_port1 + DATA_TAIL;
        let total_data = merge_data(data_pin, data_port1);

        // 调用封装通信wws2
        arduinoScoket.arduinoWss2(total_data);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 150);
        });
    }
}

module.exports = ArduinoBlocks;
