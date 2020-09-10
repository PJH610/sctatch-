'use strict';

goog.provide('Blockly.Blocks.nano');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

Blockly.Blocks['nano_main_'] = {
  init: function () {
    this.jsonInit({
      id: 'nano_main_',
      message0: '程序开始',
      category: Blockly.Categories.nano,
      extensions: ['colours_more', 'shape_hat']
    });
  }
};

Blockly.Blocks['nano_digitalWrite_'] = {
  init: function () {
    this.jsonInit({
      id: 'nano_digitalWrite_',
      message0: '设置 %1 数字输出 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'OPERATOR',
          options: [['接口1', '1'], ['接口2', '2']]
        },
        {
          type: 'input_value',
          name: 'NUM'
        }
      ],
      category: Blockly.Categories.nano,
      extensions: ['colours_more', 'shape_statement']
    });
  }
};

Blockly.Blocks['nano_digitalRead_'] = {
  init: function () {
    this.jsonInit({
      id: 'nano_digitalRead_',
      message0: '读取 %1 数字输出',
      args0: [
        {
          type: 'field_dropdown',
          name: 'OPERATOR',
          options: [['接口1', '1'], ['接口2', '2']]
        }
      ],
      category: Blockly.Categories.nano,
      extensions: ['colours_more', 'output_boolean']
    });
  }
};

Blockly.Blocks['uno_chuankou'] = {
  init: function () {
    this.jsonInit({
      id: 'uno_chuankou',
      message0: '按键模块 读取 端口 %1 ',
      args0: [
        {
          "type": "field_dropdown",
          "name": "OPERATOR",
          options: [["1", "1"], ["3", "3"], ["4", "4"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"]]
        }
      ],
      category: Blockly.Categories.nano,
      // colour: colour1,
      // colourSecondary: colourSecondary1,
      extensions: ['colours_more', 'output_number']
    });
  }
};
