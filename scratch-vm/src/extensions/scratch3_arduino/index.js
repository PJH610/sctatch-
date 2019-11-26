const ArgumentType = require("../../extension-support/argument-type");
const BlockType = require("../../extension-support/block-type");
const TargetType = require("../../extension-support/target-type");
const formatMessage = require("format-message");
//const io = require('socket.io-client');  yarn add socket.io-client socket.io-client@2.2.0
// const serialport = require('serialport');
/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
// const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==';
const blockIconURI = "";
//'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAC4jAAAuIwF4pT92AAAGfmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDEwOjUxOjExKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA1LTA3VDEwOjUxOjExKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QxMDo1MToxMSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1YTNhMTFmOS1kNWZiLWIzNDMtYWU0My0wZDJmZTliODVkOTYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiZGFmODE3Zi1lMGYxLWIwNGYtOWExMi0yNzJiZjdhYWFlNzciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplNzVlYzUzYS1kNzc2LThiNDUtYWZmNy1mNTk1YTlmMGFjMWIiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU3NWVjNTNhLWQ3NzYtOGI0NS1hZmY3LWY1OTVhOWYwYWMxYiIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxMDo1MToxMSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1YTNhMTFmOS1kNWZiLWIzNDMtYWU0My0wZDJmZTliODVkOTYiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMTA6NTE6MTErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+MDlDOUQ4NDE4ODMyMTM2MkYxRTA0RjRGOENENDYwREI8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5cwe1eAAAKqklEQVRYhe2Y64+dR33Hf7+Zea7nutdz8a4XNo7t2MTxliQOsQPZOJCmQS0QgRQlpaEkEjSo6ZuqrUhJmsILWlWiqpB4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'
const menuIconURI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAIAAAADnC86AAAACXBIWXMAAC4jAAAuIwF4pT92AAAGfmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdEV2dD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlRXZlbnQjIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTA1LTA3VDEwOjUxOjExKzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE5LTA1LTA3VDEwOjUxOjExKzA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wNS0wN1QxMDo1MToxMSswODowMCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo1YTNhMTFmOS1kNWZiLWIzNDMtYWU0My0wZDJmZTliODVkOTYiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpiZGFmODE3Zi1lMGYxLWIwNGYtOWExMi0yNzJiZjdhYWFlNzciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDplNzVlYzUzYS1kNzc2LThiNDUtYWZmNy1mNTk1YTlmMGFjMWIiIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJzUkdCIElFQzYxOTY2LTIuMSIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOmU3NWVjNTNhLWQ3NzYtOGI0NS1hZmY3LWY1OTVhOWYwYWMxYiIgc3RFdnQ6d2hlbj0iMjAxOS0wNS0wN1QxMDo1MToxMSswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo1YTNhMTFmOS1kNWZiLWIzNDMtYWU0My0wZDJmZTliODVkOTYiIHN0RXZ0OndoZW49IjIwMTktMDUtMDdUMTA6NTE6MTErMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHBob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPHJkZjpCYWc+IDxyZGY6bGk+MDlDOUQ4NDE4ODMyMTM2MkYxRTA0RjRGOENENDYwREI8L3JkZjpsaT4gPC9yZGY6QmFnPiA8L3Bob3Rvc2hvcDpEb2N1bWVudEFuY2VzdG9ycz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5cwe1eAAAKqklEQVRYhe2Y64+dR33Hf7+Zea7nutdz8a4XNo7t2MTxliQOsQPZOJCmQS0QgRQlpaEkEjSo6ZuqrUhJmsILWlWiqpB4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";

// 数据头
const DATA_HEAD = "0FFF";

// 数据尾
const DATA_TAIL = "0D0A";

//版本号
let data_v = "00";

// 延时
let data_time = 100;

// 封装的websocket方法
function wss(data) {
    ws = new WebSocket("ws://localhost:3000");
    ws.onopen = function() {
        // 调试
        //var data1
        let buf1 = data;
        //console.log(buf1)
        ws.send(buf1);
    };
    ws.onclose = function(event) {
        console.log("连接关闭");
    };
    ws.onerror = function(event) {
        console.error("WebSocket error observed:", event);
        console.log("连接可能中断 保存好项目 从新连接串口!!");
    };

    // Promise 解决异步取值的问题
    function getServerMsg() {
        return new Promise((resolve, reject) => {
            ws.onmessage = function(mes) {
                message = mes.data;
                console.log(message);
                resolve(message);
                if (mes.data !== "") {
                    ws.close();
                }
            };
        });
    }
    return getServerMsg().then(ret => ret);
}

// 封装的websocket方法
// function wss1(data) {
//     ws = new WebSocket('ws://localhost:3000')
//     ws.onopen = function() {
//         // 调试
//         //var data1
//         let buf1 = data
//         //console.log(buf1)
//         ws.send(buf1)
//     }

//     // Promise 解决异步取值的问题
//     function getServerMsg() {
//         return new Promise((resolve, reject) => {
//             ws.onmessage = function(mes) {
//                 message = mes.data
//                 console.log(message)
//                 resolve(message)
//                 if (mes.data !== '') {
//                     ws.close()
//                 }
//             }
//         })
//     }
//     return getServerMsg().then(ret => ret)
// }
// 处理十六进制数据位单个问题

// function disposeNum(num) {
//     var num16 = num
//     if (num16.length == 1) {
//         num16 = '0' + num16
//         console.log('出现单个字符 需要处理')
//     }
//     return num16
// }

// 封装的 switch 方法1
function switcha(a) {
    var data_port = "";
    switch (a) {
        case "1":
            data_port = "02";
            break;
        case "3":
            data_port = "12";
            break;
        case "4":
            data_port = "0A";
            break;
        case "5":
            data_port = "14";
            break;
        case "6":
            data_port = "09";
            break;
        case "7":
            data_port = "06";
            break;
        case "8":
            data_port = "05";
            break;
        case "9":
            data_port = "03";
            break;
        default:
            data_port = "FF";
            break;
    }
    return data_port;
}

// 封装switch 方法2
function switchb(b) {
    var data_port = "";
    switch (b) {
        case "1":
            data_port = "11";
            break;
        case "3":
            data_port = "13";
            break;
        case "4":
            data_port = "10";
            break;
        case "5":
            data_port = "15";
            break;
        case "8":
            data_port = "0E";
            break;
        case "9":
            data_port = "0F";
            break;
        default:
            data_port = "FF";
            break;
    }
    return data_port;
}

// 封装switch 方法3
function switchc(c) {
    var data_port1 = "";
    switch (c) {
        case "1":
            data_port1 = "040211";
            break;
        case "9":
            data_port1 = "08030F";
            break;
        default:
            data_port1 = "FFFFFF";
            break;
    }
    return data_port1;
}

// RGB 方法4
function switchd(d) {
    var data_port2 = "";
    switch (d) {
        case "R":
            data_port2 = "00";
            break;
        case "G":
            data_port2 = "01";
            break;
        case "B":
            data_port2 = "02";
            break;
        default:
            data_port2 = "FF";
            break;
    }
    return data_port2;
}

// color 方法5
function switche(e) {
    var data_port2 = "";
    switch (e) {
        case "红":
            data_port2 = "00";
            break;
        case "蓝":
            data_port2 = "01";
            break;
        case "绿":
            data_port2 = "02";
            break;
        case "黄":
            data_port2 = "03";
            break;
        case "白":
            data_port2 = "04";
            break;
        case "黑":
            data_port2 = "05";
            break;
        default:
            data_port2 = "F6";
            break;
    }
    return data_port2;
}

// 封装的switch 方法6
function switchf(f) {
    var data_port1 = "";
    switch (f) {
        case "1":
            data_port1 = "02";
            break;
        case "3":
            data_port1 = "12";
            break;
        case "4":
            data_port1 = "0A";
            break;
        case "6":
            data_port1 = "09";
            break;
        case "7":
            data_port1 = "06";
            break;
        case "8":
            data_port1 = "05";
            break;
        case "9":
            data_port1 = "03";
            break;
        default:
            data_port1 = "FF";
            break;
    }
    return data_port1;
}

// led 蜂鸣 震动 大 方法7
function switchg(g) {
    var data_port1 = "";
    switch (g) {
        case "4":
            data_port1 = "0A";
            break;
        case "6":
            data_port1 = "09";
            break;
        case "7":
            data_port1 = "06";
            break;
        case "8":
            data_port1 = "05";
            break;
        case "9":
            data_port1 = "03";
            break;
        default:
            data_port1 = "FF";
            break;
    }
    return data_port1;
}

// led 蜂鸣 震动 小 方法8
function switchh(h) {
    var data_port1 = "";
    switch (h) {
        case "1":
            data_port1 = "02";
            break;
        case "3":
            data_port1 = "12";
            break;
        case "4":
            data_port1 = "0A";
            break;
        case "6":
            data_port1 = "09";
            break;
        case "7":
            data_port1 = "06";
            break;
        case "8":
            data_port1 = "05";
            break;
        case "9":
            data_port1 = "03";
            break;
        default:
            data_port1 = "FF";
            break;
    }
    return data_port1;
}

// led 蜂鸣 震动 小 开关 方法9
function switchi(i) {
    var data_port2 = "";
    switch (i) {
        case "开":
            data_port2 = "01";
            break;
        case "关":
            data_port2 = "00";
            break;
        default:
            data_port2 = "FF";
            break;
    }
    return data_port2;
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "3"
                        },
                        direction: {
                            type: ArgumentType.STRING,
                            menu: "direction",
                            defaultValue: "左"
                        }
                    }
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "1"
                        },
                        temperature: {
                            type: ArgumentType.STRING,
                            menu: "humiture",
                            defaultValue: "温度℃"
                        }
                    }
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
                            defaultValue: "1"
                        },
                        RGB: {
                            type: ArgumentType.STRING,
                            menu: "RGB",
                            defaultValue: "R"
                        }
                    }
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
                            defaultValue: "1"
                        },
                        color: {
                            type: ArgumentType.STRING,
                            menu: "color",
                            defaultValue: "红"
                        }
                    }
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
                            defaultValue: "1"
                        }
                    }
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
                            defaultValue: "X轴旋转角"
                        }
                    }
                },

                "---",

                // -------------------------------输出--------------------------------

                // led模块a15
                {
                    opcode: "ledModela",
                    blockType: BlockType.COMMAND,
                    text: "led模块 设置 端口[index] 亮度为(0~255)[brightness]",
                    arguments: {
                        index: {
                            type: ArgumentType.STRING,
                            menu: "serialPort5",
                            defaultValue: "4"
                        },
                        brightness: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
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
                            defaultValue: "1"
                        },
                        switch: {
                            type: ArgumentType.STRING,
                            menu: "switch",
                            defaultValue: "开"
                        }
                    }
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
                            defaultValue: "4"
                        },
                        loudness: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
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
                            defaultValue: "1"
                        },
                        switch: {
                            type: ArgumentType.STRING,
                            menu: "switch",
                            defaultValue: "开"
                        }
                    }
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
                            defaultValue: "4"
                        },
                        amplitude: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
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
                            defaultValue: "4"
                        },
                        switch: {
                            type: ArgumentType.STRING,
                            menu: "switch",
                            defaultValue: "开"
                        }
                    }
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
                            defaultValue: "1"
                        },
                        index2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 1
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        G: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
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
                            defaultValue: "1"
                        },
                        R: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        G: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        B: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
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
                            menu: "serialPort",
                            defaultValue: "4"
                        },
                        state: {
                            type: ArgumentType.STRING,
                            menu: "motorState",
                            defaultValue: "停止"
                        },
                        rev: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
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
                            defaultValue: "1"
                        },
                        expand: {
                            type: ArgumentType.STRING,
                            menu: "serialPort2",
                            defaultValue: "1"
                        },
                        angle: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        },
                        delayed: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    }
                }
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
                // }
            ],
            menus: {
                serialPort: ["1", "3", "4", "5", "6", "7", "8", "9"],
                serialPort1: ["1", "3", "4", "5", "8", "9"],
                serialPort2: ["1", "2"],
                serialPort3: ["3", "5"],
                serialPort4: ["1", "9"],
                serialPort5: ["4", "7", "8", "9"],
                serialPort6: ["1", "3", "4", "7", "8", "9"],
                serialPort7: ["1", "3", "4", "6", "7", "8", "9"],
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
                    "第四盏灯"
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
                    "R"
                ]
            }
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
        let data_port = "";

        if (args.index == "5") {
            console.log("端口五 不可用");
            return;
        }
        // 调用判断方法
        data_port = switcha(args.index);

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );

        return wss(buf1);
    }
    // 触摸模块2
    touchModel(args) {
        let data_pin = "0501";
        let data_port = "";

        // 调用判断方法
        data_port = switcha(args.index);

        if (args.index == "5") {
            console.log("端口五 不可用");
            return;
        }

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
        //console.log(wss(buf1))
    }

    // 拨位模块3
    outModel(args) {
        let data_pin = "0501";
        let data_port = "";

        // 调用判断方法
        data_port = switcha(args.index);

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 电位模块4
    electricityModel(args) {
        let data_pin = "0502";
        let data_port = "";

        // 调用判断方法
        data_port = switchb(args.index);

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 光感5
    lightModel(args) {
        let data_pin = "0502";
        let data_port = "";

        // 调用判断方法
        data_port = switchb(args.index);

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 雨滴6
    rainModel(args) {
        let data_pin = "0502";
        let data_port = "";

        // 调用判断方法
        data_port = switchb(args.index);

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 灰度
    greyModel(args) {
        let data_pin = "0703";
        let data_port1 = "";
        let data_port2 = "";
        // 待封装的方法 switch1
        switch (args.index) {
            case "3":
                data_port1 = "1213";
                break;
            case "5":
                data_port1 = "1415";
                break;
            default:
                data_port1 = "FFFF";
                break;
        }
        // 待封装的方法 switch2
        switch (args.direction) {
            case "左":
                data_port2 = "00";
                break;
            case "右":
                data_port2 = "01";
                break;
            default:
                data_port2 = "FF";
                break;
        }

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 人体红外
    infraredModel(args) {
        let data_pin = "0501";
        let data_port = "";

        // 调用判断方法
        data_port = switcha(args.index);

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 超声测距
    ultrasoundModel(args) {
        let data_pin = "0604";
        let data_port = "";

        // 调用判断方法
        switch (args.index) {
            case "1":
                data_port = "0211";
                break;
            case "3":
                data_port = "1213";
                break;
            case "4":
                data_port = "0A10";
                break;
            case "8":
                data_port = "050E";
                break;
            case "9":
                data_port = "030F";
                break;
            default:
                data_port = "FFFF";
                break;
        }

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 温湿度
    humitureModel(args) {
        let data_pin = "0605";
        let data_port1 = "";
        let data_port2 = "";
        // 调用判断方法
        data_port1 = switchf(args.index);

        switch (args.temperature) {
            case "温度":
                data_port2 = "00";
                break;
            case "湿度":
                data_port2 = "01";
                break;
            default:
                data_port2 = "FF";
                break;
        }

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 颜色a1
    colorModela(args) {
        let data_pin = "0806";
        let data_port1 = "";
        let data_port2 = "";
        // 调用判断方法
        data_port1 = switchc(args.index);
        data_port2 = switchd(args.RGB);

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 颜色b2
    colorModelb(args) {
        let data_pin = "0807";
        let data_port1 = "";
        let data_port2 = "";
        // 调用判断方法
        data_port1 = switchc(args.index);
        data_port2 = switche(args.color);

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    // 单灰度
    singleModel(args) {
        let data_pin = "0502";
        let data_port = "";

        // 调用判断方法
        data_port = switchb(args.index);

        // 调试
        console.log(data_head + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            data_head + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }
    // 陀螺仪
    gyroModel(args) {
        let data_pin = "0508";
        let data_port = "";

        // 调用判断方法
        switch (args.index) {
            case "X旋转角":
                data_port = "00";
                break;
            case "Y旋转角":
                data_port = "01";
                break;
            case "Z旋转角":
                data_port = "02";
                break;
            default:
                data_port = "FF";
                break;
        }

        // 调试
        console.log(DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL);

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port + DATA_TAIL,
            "hex"
        );
        return wss(buf1);
    }

    //------------------------------------------------------------------------------

    // leda
    ledModela(args) {
        let data_pin = "0609";
        let data_port1 = "";
        let data_port2 = parseInt(args.brightness).toString(16); //输出16进制
        // 调用判断方法
        data_port1 = switchg(args.index);

        // 处理十六进制问题
        if (data_port2.length == 1) {
            data_port2 = "0" + data_port2;
        }

        if (data_port2.length > 2) {
            //alert('数据不能大于255')
            data_port2 = "FF";
        }

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );
        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        //while (a == 1) {}

        // 调用 封装websocket方法
        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // ledb
    ledModelb(args) {
        let data_pin = "060a";
        let data_port1 = "";
        let data_port2 = "";
        // 调用判断方法
        data_port1 = switchh(args.index);
        data_port2 = switchi(args.switch);

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        // setTimeout(function() {
        //     wss(buf1)
        // }, 1000)
        // 调用封装的webscoket方法
        //while (true) {}
        //return false
        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 蜂鸣a
    buzzingModela(args) {
        let data_pin = "0609";
        let data_port1 = "";
        let data_port2 = parseInt(args.loudness).toString(16);
        // 调用判断方法
        data_port1 = switchg(args.index);

        // 处理十六进制问题
        if (data_port2.length == 1) {
            data_port2 = "0" + data_port2;
        }

        if (data_port2.length > 2) {
            //alert('数据不能大于255')
            data_port2 = "FF";
        }

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );

        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 蜂鸣b
    buzzingModelb(args) {
        let data_pin = "060a";
        let data_port1 = "";
        let data_port2 = "";
        // 调用判断方法
        data_port1 = switchh(args.index);
        data_port2 = switchi(args.switch);

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 震动a
    shakeModela(args) {
        let data_pin = "0609";
        let data_port1 = "";
        let data_port2 = parseInt(args.amplitude).toString(16);
        // 调用判断方法
        data_port1 = switchg(args.index);

        // 处理十六进制问题
        if (data_port2.length == 1) {
            data_port2 = "0" + data_port2;
        }

        if (data_port2.length > 2) {
            //alert('数据不能大于255')
            data_port2 = "FF";
        }

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 震动b
    shakeModelb(args) {
        let data_pin = "060a";
        let data_port1 = "";
        let data_port2 = "";
        // 调用判断方法
        data_port1 = switchh(args.index);
        data_port2 = switchi(args.switch);

        // 调试
        console.log(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD + data_v + data_pin + data_port1 + data_port2 + DATA_TAIL,
            "hex"
        );
        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // rgba
    rgbModela(args) {
        let data_pin = "090b";
        let data_port1 = "";
        let data_port2 = parseInt(args.index2).toString(16);
        let data_port3_R = parseInt(args.R).toString(16);
        let data_port3_G = parseInt(args.G).toString(16);
        let data_port3_B = parseInt(args.B).toString(16);
        // 调用判断方
        data_port1 = switchf(args.index);

        // 处理十六进制问题
        if (data_port2.length == 1) {
            data_port2 = "0" + data_port2;
        }
        if (data_port2.length > 2) {
            //alert('数据不能大于255')
            data_port2 = "FF";
        }

        if (data_port3_R.length == 1) {
            data_port3_R = "0" + data_port3_R;
        }
        if (data_port3_R.length > 2) {
            //alert('数据不能大于255')
            data_port3_R = "FF";
        }

        if (data_port3_G.length == 1) {
            data_port3_G = "0" + data_port3_G;
        }
        if (data_port3_G.length > 2) {
            //alert('数据不能大于255')
            data_port3_G = "FF";
        }

        if (data_port3_B.length == 1) {
            data_port3_B = "0" + data_port3_B;
        }
        if (data_port3_B.length > 2) {
            //alert('数据不能大于255')
            data_port3_B = "FF";
        }

        // 调试
        console.log(
            DATA_HEAD +
                data_v +
                data_pin +
                data_port1 +
                data_port2 +
                data_port3_R +
                data_port3_G +
                data_port3_B +
                DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD +
                data_v +
                data_pin +
                data_port1 +
                data_port2 +
                data_port3_R +
                data_port3_G +
                data_port3_B +
                DATA_TAIL,
            "hex"
        );
        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // rgbb
    rgbModelb(args) {
        let data_pin = "080c";
        let data_port1 = "";
        let data_port3_R = parseInt(args.R).toString(16);
        let data_port3_G = parseInt(args.G).toString(16);
        let data_port3_B = parseInt(args.B).toString(16);
        // 调用判断方
        data_port1 = switchf(args.index);

        // 处理十六进制问题
        if (data_port3_R.length == 1) {
            data_port3_R = "0" + data_port3_R;
        }
        if (data_port3_R.length > 2) {
            //alert('数据不能大于255')
            data_port3_R = "FF";
        }

        if (data_port3_G.length == 1) {
            data_port3_G = "0" + data_port3_G;
        }
        if (data_port3_G.length > 2) {
            //alert('数据不能大于255')
            data_port3_G = "FF";
        }

        if (data_port3_B.length == 1) {
            data_port3_B = "0" + data_port3_B;
        }
        if (data_port3_B.length > 2) {
            //alert('数据不能大于255')
            data_port3_B = "FF";
        }

        // 调试
        console.log(
            DATA_HEAD +
                data_v +
                data_pin +
                data_port1 +
                data_port3_R +
                data_port3_G +
                data_port3_B +
                DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD +
                data_v +
                data_pin +
                data_port1 +
                data_port3_R +
                data_port3_G +
                data_port3_B +
                DATA_TAIL,
            "hex"
        );
        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }

    // 直流电机
    motorModel(args) {
        let data_pin = "080d";
        let data_port1 = "";
        let data_port2 = "";
        let data_port3 = parseInt(args.rev).toString(16);
        // 调用判断方法
        switch (args.index) {
            case "4":
                data_port1 = "0A10";
                break;
            case "6":
                data_port1 = "0900";
                break;
            case "7":
                data_port1 = "0601";
                break;
            case "8":
                data_port1 = "050E";
                break;
            case "9":
                data_port1 = "030F";
                break;
            default:
                data_port1 = "FF";
                break;
        }
        switch (args.state) {
            case "停止":
                data_port2 = "01";
                break;
            case "正":
                data_port2 = "02";
                break;
            case "反":
                data_port2 = "03";
                break;
            default:
                data_port2 = "FF";
                break;
        }

        // 处理十六进制问题
        if (data_port3.length == 1) {
            data_port3 = "0" + data_port3;
        }
        if (data_port3.length > 2) {
            //alert('数据不能大于255')
            data_port3 = "FF";
        }

        // 调试
        console.log(
            DATA_HEAD +
                data_v +
                data_pin +
                data_port1 +
                data_port2 +
                data_port3 +
                DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD +
                data_v +
                data_pin +
                data_port1 +
                data_port2 +
                data_port3 +
                DATA_TAIL,
            "hex"
        );
        wss(buf1);
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, data_time);
        });
    }
    // 舵机
    engineModel(args) {
        let data_pin = "070e";
        let data_port1 = "";
        let data_port2 = "";
        let data_port3 = parseInt(args.angle).toString(16);
        let data_port4 = parseInt(args.delayed).toString(16);
        // 调用判断方法
        data_port1 = switchf(args.index);

        switch (args.expand) {
            case "1":
                data_port2 = "01";
                break;
            case "2":
                data_port2 = "02";
                break;
            default:
                data_port2 = "FF";
                break;
        }

        // 处理十六进制问题
        if (data_port3.length == 1) {
            data_port3 = "0" + data_port3;
        }
        if (data_port3.length > 2) {
            //alert('数据不能大于255')
            data_port3 = "FF";
        }
        if (data_port4.length == 1) {
            data_port4 = "0" + data_port4;
        }
        if (data_port4.length > 2) {
            //alert('数据不能大于255')
            data_port4 = "FF";
        }

        // 调试
        console.log(
            DATA_HEAD +
                data_v +
                data_pin +
                data_port1 +
                data_port2 +
                data_port3 +
                data_port4 +
                DATA_TAIL
        );

        let buf1 = new Buffer(
            DATA_HEAD +
                data_v +
                data_pin +
                data_port1 +
                data_port2 +
                data_port3 +
                data_port4 +
                DATA_TAIL,
            "hex"
        );
        wss(buf1);
        return new Promise(resolve => {
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
}

module.exports = ArduinoBlocks;
