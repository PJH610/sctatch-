/**
 *  1
 * 处理前端值到硬件值
 * 使用位置: 按键模块1 触摸模块2 拨位模块3 人体红外
 */
module.exports.switcha = function (a) {
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
};

// 2
// 使用位置: 电位模块4 光感5 雨滴6 单灰度
module.exports.switchb = function switchb(b) {
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
};

// 3
// 使用位置: 颜色a1 颜色b2
module.exports.switchc = function switchc(c) {
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
};

// 4
// 使用位置: 颜色a1
module.exports.switchd = function switchd(d) {
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
};

// 5
// 使用位置: 颜色b2
module.exports.switche = function switche(e) {
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
};

// 6
// 使用位置: 温湿度 rgba rgbb 舵机
module.exports.switchf = function switchf(f) {
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
};

// 7
// 使用位置: leda 蜂鸣a 震动a
module.exports.switchg = function switchg(g) {
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
};

// 8
// 使用位置: ledb 蜂鸣b 震动b
module.exports.switchh = function switchh(h) {
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
};

// 9
// 使用位置: ledb 蜂鸣b 震动b
module.exports.switchi = function switchi(i) {
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
};

/**
 * 10
 * 使用位置: 灰度 摇杆模块
 */
module.exports.switchj = function (j) {
    let data_port1 = "";
    switch (j) {
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
    return data_port1;
};

/**
 * 11
 * 使用位置: 灰度
 */
module.exports.switchk = function (k) {
    let data_port2 = "";
    switch (k) {
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
    return data_port2;
};

/**
 * 12
 * 使用位置: 超声测距
 */
module.exports.switchl = function (l) {
    let data_port = "";
    switch (l) {
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
    return data_port;
};

/**
 * 13
 * 使用位置: 灰度
 */
module.exports.switchn = function (n) {
    let data_port2 = "";
    switch (n) {
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
    return data_port2;
};

/**
 * 14
 * 使用位置: 直流电机
 */
module.exports.switchm = function (m) {
    let data_port1 = "";
    switch (m) {
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
    return data_port1;
};

/**
 * 15
 * 使用位置: 直流电机
 */
module.exports.switcho = function (o) {
    let data_port2 = "";
    switch (o) {
        case "停止":
            data_port2 = "00";
            break;
        case "正":
            data_port2 = "01";
            break;
        case "反":
            data_port2 = "02";
            break;
        default:
            data_port2 = "FF";
            break;
    }
    return data_port2;
};

/**
 * 16
 * 使用位置: 舵机
 */
module.exports.switchp = function (p) {
    let data_port2 = "";
    switch (p) {
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
    return data_port2;
};

/**
 * 17
 * 使用位置: 四按键模块
 */
module.exports.switchq = function (q) {
    let data_port1 = "";
    switch (q) {
        case "1":
            data_port1 = "11";
            break;
        case "3":
            data_port1 = "13";
            break;
        case "4":
            data_port1 = "10";
            break;
        case "8":
            data_port1 = "0E";
            break;
        case "9":
            data_port1 = "0F";
            break;
        default:
            data_port1 = "FF";
            break;
    }
    return data_port1;
};

/**
 * 18
 * 使用位置: 四按键模块
 */
module.exports.switchr = function (r) {
    let data_port2 = "";
    switch (r) {
        case "A":
            data_port2 = "00";
            break;
        case "B":
            data_port2 = "01";
            break;
        case "C":
            data_port2 = "02";
            break;
        case "D":
            data_port2 = "03";
            break;
        default:
            data_port2 = "FF";
            break;
    }
    return data_port2;
};

/**
 * 18
 * 使用位置:  摇杆
 */
module.exports.switchs = function (s) {
    let data_port2 = "";
    switch (s) {
        case "X":
            data_port2 = "00";
            break;
        case "Y":
            data_port2 = "01";
            break;
        default:
            data_port2 = "FFFF";
            break;
    }
    return data_port2;
};

/**
 * 19
 * 使用位置: 陀螺仪
 */
module.exports.switcht = function (t) {
    let data_port = "";
    switch (t) {
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
    return data_port;
};

/**
 * 20
 * 使用位置: 四按键
 */
module.exports.switchu = function (u1, u2) {
    let data_port = u1 + "";
    let data_four = parseInt(window.fourControl);
    let data_main = 0;

    switch (u2) {
        case "A":
            if (data_four > 148 && data_four < 154) {
                data_main = 1;
            } else {
                data_main = 0;
            }
            break;
        case "B":
            if (data_four > 173 && data_four < 179) {
                data_main = 1;
            } else {
                data_main = 0;
            }
            break;
        case "C":
            if (data_four > 201 && data_four < 207) {
                data_main = 1;
            } else {
                data_main = 0;
            }
            break;
        case "D":
            if (data_four > 226 && data_four < 232) {
                data_main = 1;
            } else {
                data_main = 0;
            }
            break;
        default:
            data_main = 0;
    }

    if (window.fourControlIndex != data_port) {
        data_main = 0;
    }

    return data_main;
};

/**
 * 20
 * 使用位置: 四按键
 */
module.exports.switchtest = function (u1, u2) {
    let data_four = parseInt(u1);
    let data_main = 0;

    switch (u2) {
        case "A":
            if (data_four > 148 && data_four < 154) {
                data_main = 1;
            } else {
                data_main = 0;
            }
            break;
        case "B":
            if (data_four > 173 && data_four < 179) {
                data_main = 1;
            } else {
                data_main = 0;
            }
            break;
        case "C":
            if (data_four > 201 && data_four < 207) {
                data_main = 1;
            } else {
                data_main = 0;
            }
            break;
        case "D":
            if (data_four > 226 && data_four < 232) {
                data_main = 1;
            } else {
                data_main = 0;
            }
            break;
        default:
            data_main = 0;
    }

    return data_main;
};

/**
 * 处理十六进制转换
 */
module.exports.hexadecimal = function (data_port) {
    let hex = parseInt(data_port).toString(16);
    if (hex.length == 1) return "0" + hex;
    if (hex.length > 2) {
        return "FF";
    } else {
        return hex;
    }
};

/**
 * 禁用端口
 */
module.exports.banPort = function (data_port) {
    if (data_port === "5") {
        console.log("端口五 不可用");
        return;
    }
};

// 处理十六进制数据位单个问题
// function disposeNum(num) {
//     var num16 = num
//     if (num16.length == 1) {
//         num16 = '0' + num16
//         console.log('出现单个字符 需要处理')
//     }
//     return num16
// }
