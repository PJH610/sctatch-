'use strict';

goog.provide('Blockly.Blocks.uno');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

var colour1 = "#4C97FF";
var colourSecondary1 = '#3373CC';

Blockly.Blocks['uno_main'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_main',
      message0: '程序开始',
      category: Blockly.Categories.control,
      extensions: ['colours_more', 'shape_hat']
    });
  }
};

// ------------------------------------------输入模块--------------------------------------
// 1_1.按键模块
Blockly.Blocks['uno_key'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_key',
      message0: '按键模块 读取 端口 %1 ',
      args0: [
        {
          "type": "field_dropdown",
          "name": "OPERATOR",
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.control,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};


// 1_2.触摸模块
Blockly.Blocks['uno_touch'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_touch',
      message0: '触摸模块 读取 端口 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_3.拨位模块
Blockly.Blocks['uno_switch'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_switch',
      message0: '拨位模块 读取 端口 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_4.电位器模块
Blockly.Blocks['uno_potential'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_potential',
      message0: '电位器模块 读取 端口 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["5", "5"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_5.光杆模块
Blockly.Blocks['uno_sensitization'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_sensitization',
      message0: '光杆模块 读取 端口 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["5", "5"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_6.雨滴模块
Blockly.Blocks['uno_raindrop'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_raindrop',
      message0: '雨滴模块 读取 端口 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["5", "5"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_7_1.灰度模块
Blockly.Blocks['uno_gray'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_gray',
      message0: '灰度模块 读取 端口 %1  %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["3", "3"], ["5", "5"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["左", "1"], ["右", "0"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_7_2.灰度模块带识别
Blockly.Blocks['uno_gray_discern'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_gray_discern',
      message0: '灰度模块 识别 端口 %1  %2 识别到 %3 ',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["3", "3"], ["5", "5"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["左", "1"], ["右", "0"]]
        },
        {
          type: 'field_dropdown',
          name: 'select',
          options: [["黑", "1"], ["白", "0"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_8.人体红外
Blockly.Blocks['uno_bodyinfrare'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_bodyinfrare',
      message0: '人体红外模块 读取 端口 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_9.超声测距
Blockly.Blocks['uno_ultrasound'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_ultrasound',
      message0: '超声测距模块 读取 端口 %1 单位 : cm',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_10温湿度模块
Blockly.Blocks['uno_dht11'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_dht11',
      message0: '温湿度模块 读取 端口 %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["温度℃", "0"], ["湿度%", "1"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_11_1.颜色度模块
Blockly.Blocks['uno_color'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_color',
      message0: '颜色度模块 端口 %1 读取 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["9", "9"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["R", "1"], ["G", "2"], ["B", "3"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_11_2.颜色度模块 2
Blockly.Blocks['uno_color_recognition'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_color_recognition',
      message0: '颜色度模块 端口 %1 是否为 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["9", "9"]]
        },
        {
          type: 'field_dropdown',
          name: 'color_choice',
          options: [["红", "1"], ["蓝", "2"], ["绿", "3"], ["黄", "4"], ["白", "5"], ["黑", "6"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_12.单灰度模块
Blockly.Blocks['uno_singlegray'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_singlegray',
      message0: '单灰度模块 读取 端口 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["5", "5"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_13.六轴陀螺仪模块
Blockly.Blocks['uno_gyro'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_gyro',
      message0: '陀螺仪模块 端口3 读取 %1 ',
      args0: [
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["X轴旋转角", "1"], ["Y轴旋转角", "2"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_14.四按键模块
Blockly.Blocks['uno_fourkeys'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_fourkeys',
      message0: '四按键模块 端口 %1 是否被按下 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["A", "0"], ["B", "1"], ["C", "2"], ["D", "3"]]
        }
      ],

      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_15.摇杆模块
Blockly.Blocks['uno_rocker'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_rocker',
      message0: '摇杆模块 端口 %1 方向的值 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["3", "3"], ["5", "5"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["X", "0"], ["Y", "1"]]
        }
      ],

      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 1_16.磁力计模块
Blockly.Blocks['uno_magnetic'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_magnetic',
      message0: '磁力计模块 端口3 读取 %1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["X方向磁场强度", "0"], ["Y方向磁场强度", "1"], ["z方向磁场强度", "2"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// --------------------------------------输出模块---------------------------------

// 2_02_1leda
Blockly.Blocks['uno_led'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_led',
      message0: 'led模块 设置 端口 %1 亮度度为(0~255) %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [['4', '4'], ['7', '7'], ['8', '8'], ['9', '9']]
        },
        {
          type: 'input_value',
          name: 'logic'
        }
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

// 2_01_2 ledb
Blockly.Blocks['uno_led_simple'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_led_simple',
      message0: 'led模块 设置 端口 %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [['4', '4'], ['7', '7'], ['8', '8'], ['9', '9']]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["开", "1"], ["关", "0"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['shape_statement']
    });
  }
};

// 2_02_1蜂鸣模块a
Blockly.Blocks['uno_buzzer'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_buzzer',
      message0: '蜂鸣模块 设置 端口 %1 响度为(0~255) %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["4", "4"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'input_value',
          name: 'logic'
        }
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

// 2_02_2蜂鸣模块b
Blockly.Blocks['uno_buzzer_simple'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_buzzer_simple',
      message0: '蜂鸣模块 设置 端口 %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["开", "1"], ["关", "0"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['shape_statement']
    });
  }
};

// 2_03_1震动模块a
Blockly.Blocks['uno_shake'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_shake',
      message0: '震动模块 设置 端口 %1 振幅为(0~255) %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["4", "4"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'input_value',
          name: 'logic'
        }
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

// 2_03_2震动模块b
Blockly.Blocks['uno_shake_simple'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_shake_simple',
      message0: '震动模块 设置 端口 %1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["开", "1"], ["关", "0"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['shape_statement']
    });
  }
};

// 2_04_1RGB模块
Blockly.Blocks['uno_rgb'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_rgb',
      message0: 'rgb模块 设置 端口 %1 第 %2 盏 亮度为(0~255) R值 %3 G值 %4 B值 %5',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'input_value',
          name: 'number'
        },
        {
          type: 'input_value',
          name: 'rvalue'
        },
        {
          type: 'input_value',
          name: 'gvalue'
        },
        {
          type: 'input_value',
          name: 'bvalue'
        }
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};
// 2_04_2RGB模块
Blockly.Blocks['uno_rgb_all'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_rgb_all',
      message0: 'rgb模块 设置 端口 %1 全部亮度为(0~255) R值 %2 G值 %3 B值 %4',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'input_value',
          name: 'rvalue'
        },
        {
          type: 'input_value',
          name: 'gvalue'
        },
        {
          type: 'input_value',
          name: 'bvalue'
        }
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

// 2_04_3rgb灯带
Blockly.Blocks['uno_rgb_strip'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_rgb_strip',
      message0: 'rgb灯带 灯数 %1 设置 端口 %2 亮度为(0~255) R值 %3 G值 %4 B值 %5',
      args0: [
        {
          type: 'input_value',
          name: 'number'
        },
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'input_value',
          name: 'rvalue'
        },
        {
          type: 'input_value',
          name: 'gvalue'
        },
        {
          type: 'input_value',
          name: 'bvalue'
        }
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

// 2_04_4rgb灯带像素
Blockly.Blocks['uno_rgb_strip_pixel'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_rgb_strip_pixel',
      message0: 'rgb灯带 灯数 %1 设置 端口 %2 第 %3 盏 亮度为(0~255) R值 %4 G值 %5 B值 %6',
      args0: [
        {
          type: 'input_value',
          name: 'number'
        },
        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'input_value',
          name: 'pixel'
        },
        {
          type: 'input_value',
          name: 'rvalue'
        },
        {
          type: 'input_value',
          name: 'gvalue'
        },
        {
          type: 'input_value',
          name: 'bvalue'
        }
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

// 2_05电机模块
Blockly.Blocks['uno_motor'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_motor',
      message0: '直流电机 设置 端口 %1 %2 转 速度为(0~255) %3',
      args0: [

        {
          type: 'field_dropdown',
          name: 'port',
          options: [["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'field_dropdown',
          name: 'direct',
          options: [["停止", "0"], ["正", "1"], ["反", "2"]]
        },
        {
          type: 'input_value',
          name: 'speed'
        },

      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};
// 2_06舵机模块
Blockly.Blocks['uno_servomotor'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_servomotor',
      message0: '舵机模块 设置 端口 %1 拓展口 %2 角度为(5~175) %3 延时(毫秒) %4',
      args0: [

        {
          type: 'field_dropdown',
          name: 'port',
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        },
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["1", "1"], ["2", "2"]]
        },
        {
          type: 'input_value',
          name: 'angle'
        },
        {
          type: 'input_value',
          name: 'delayms'
        },

      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

// 2_07四按键模块led
Blockly.Blocks['uno_fourkeysled'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_fourkeysled',
      message0: '四按键模块LED 设置 端口 %1 亮度为(0~255) %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'port',
          options: [['4', '4'], ['8', '8'], ['9', '9']]
        },
        {
          type: 'input_value',
          name: 'logic'
        }
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

// -----------------------------------------通信模块----------------------------------------

// 3_01获取2.4G模块数据
Blockly.Blocks['uno_24G_get_serial'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_24G_get_serial',
      message0: '获取遥控数据',
      args0: [
      ],
      colour: colour1,
      colourSecondary: colourSecondary1,
      category: Blockly.Categories.uno,
      extensions: ['shape_statement']
    });
  }
};

//3_022.4G模块
Blockly.Blocks['uno_24G_serial'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_24G_serial',
      message0: '遥控 %1 是否被按下',
      args0: [
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["←", "1"], ["↓", "2"], ["↑", "3"], ["→", "4"], ["□", "5"], ["Δ", "6"], ["〇", "7"], ["X", "8"], ["右2键", "12"], ["右1键", "11"], ["左2键", "15"], ["左1键", "14"], ["左摇杆前方向", "16"], ["左摇杆后方向", "17"], ["左摇杆左方向", "18"], ["左摇杆右方向", "19"], ["右摇杆前方向", "20"], ["右摇杆后方向", "21"], ["右摇杆左方向", "22"], ["右摇杆右方向", "23"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};

// 3_03新2.4G模块
Blockly.Blocks['uno_24G_serial_new'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_24G_serial_new',
      message0: '模块遥控 %1 是否被按下',
      args0: [
        {
          type: 'field_dropdown',
          name: 'choice',
          options: [["←", "1"], ["↓", "2"], ["↑", "3"], ["→", "4"], ["B", "5"], ["D", "6"], ["C", "7"], ["A", "8"], ["F", "12"], ["E", "13"], ["R", "15"], ["L", "14"]]
        }
      ],
      category: Blockly.Categories.uno,
      colour: colour1,
      colourSecondary: colourSecondary1,
      extensions: ['output_number']
    });
  }
};


Blockly.Blocks['procedures_aaa'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "procedures_aaa",
      "message0": "函数 %1",
      "message1": "%1", // Statement

      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "TIMES"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "category": Blockly.Categories.uno,
      "extensions": ["colours_control", "shape_end"]
    });
  }
};

Blockly.Blocks['control_repeat_test'] = {
  /**
   * Block for repeat n times (external number).
   * https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#so57n9
   * @this Blockly.Block
   */
  init: function () {
    this.jsonInit({
      "id": "control_repeat_test",
      "message0": Blockly.Msg.CONTROL_REPEAT,
      "message1": "%1", // Statement
      "message2": "%1", // Icon
      "lastDummyAlign2": "RIGHT",
      "args0": [
        {
          "type": "input_value",
          "name": "TIMES"
        }
      ],
      "args1": [
        {
          "type": "input_statement",
          "name": "SUBSTACK"
        }
      ],
      "args2": [
        {
          "type": "field_image",
          "src": Blockly.mainWorkspace.options.pathToMedia + "repeat.svg",
          "width": 24,
          "height": 24,
          "alt": "*",
          "flip_rtl": true
        }
      ],
      "category": Blockly.Categories.control,
      "extensions": ["colours_control", "shape_statement"]
    });
  }
};
