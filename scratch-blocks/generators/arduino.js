/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Helper functions for generating Arduino for blocks.
 * @author gasolin@gmail.com (Fred Lin)
 */
'use strict';

goog.provide('Blockly.Arduino');

goog.require('Blockly.Generator');

/**
 * Arduino code generator.
 * @type !Blockly.Generator
 */
Blockly.Arduino = new Blockly.Generator('Arduino');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Arduino.addReservedWords(
  // http://arduino.cc/en/Reference/HomePage
  'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,interger, constants,floating,point,void,bookean,char,unsigned,byte,int,short,word,long,float,double,string,String,array,static, volatile,const,sizeof,pinMode,digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,detachInterrupt,interrupts,noInterrupts,A0,A1,A2,A3,A4,A5,A6,A7,A8,A9,A10,A11,A12,A13,A14,A15');

/**
 * Order of operation ENUMs.
 *
 */
Blockly.Arduino.ORDER_ATOMIC = 0; // 0 "" ...
Blockly.Arduino.ORDER_UNARY_POSTFIX = 1; // expr++ expr-- () [] .
Blockly.Arduino.ORDER_UNARY_PREFIX = 2; // -expr !expr ~expr ++expr --expr
Blockly.Arduino.ORDER_MULTIPLICATIVE = 3; // * / % ~/
Blockly.Arduino.ORDER_ADDITIVE = 4; // + -
Blockly.Arduino.ORDER_SHIFT = 5; // << >>
Blockly.Arduino.ORDER_RELATIONAL = 6; // is is! >= > <= <
Blockly.Arduino.ORDER_EQUALITY = 7; // == != === !==
Blockly.Arduino.ORDER_BITWISE_AND = 8; // &
Blockly.Arduino.ORDER_BITWISE_XOR = 9; // ^
Blockly.Arduino.ORDER_BITWISE_OR = 10; // |
Blockly.Arduino.ORDER_LOGICAL_AND = 11; // &&
Blockly.Arduino.ORDER_LOGICAL_OR = 12; // ||
Blockly.Arduino.ORDER_CONDITIONAL = 13; // expr ? expr : expr
Blockly.Arduino.ORDER_ASSIGNMENT = 14; // = *= /= ~/= %= += -= <<= >>= &= ^= |=
Blockly.Arduino.ORDER_NONE = 99; // (...)

/*
 * Arduino Board profiles
 *
 */

//set default profile to arduino standard-compatible board
//profile["default"] = profile["arduino_standard"];
//alert(profile.default.digital[0]);

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Arduino.init = function (workspace) {
  // Create a dictionary of definitions to be printed before setups.
  Blockly.Arduino.definitions_ = Object.create(null);
  // Create a dictionary of setups to be printed before the code.
  Blockly.Arduino.setups_ = Object.create(null);
  //Blockly.Arduino.variableTypes_ = Object.create(null);//处理变量类型

  if (!Blockly.Arduino.variableDB_) {
    Blockly.Arduino.variableDB_ =
      new Blockly.Names(Blockly.Arduino.RESERVED_WORDS_);
  } else {
    Blockly.Arduino.variableDB_.reset();
  }

  //var defvars = [];
  //var variables = Blockly.Variables.allVariables(workspace);
  //for (var x = 0; x < variables.length; x++) {
  //defvars[x] = 'long ' +
  //	Blockly.Arduino.variableDB_.getName(variables[x],
  //	Blockly.Variables.NAME_TYPE) + ';\n';
  //}
  //Blockly.Arduino.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Arduino.finish = function (code) {
  // Indent every line.
  code = '  ' + code.replace(/\n/g, '\n  ');
  code = code.replace(/\n\s+$/, '\n');
  code = 'void loop(){\n' + code + '\n}';

  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions_var = []; //变量定义
  var definitions_fun = []; //函数定义
  for (var name in Blockly.Arduino.definitions_) {
    var def = Blockly.Arduino.definitions_[name];
    if (def.match(/^#include/)) {
      imports.push(def);
    } else if (name.match(/^var_declare/)) {
      definitions_var.push(def);
    } else {
      definitions_fun.push(def);
    }
  }

  // Convert the setups dictionary into a list.
  var setups = [];
  for (var name in Blockly.Arduino.setups_) {
    setups.push(Blockly.Arduino.setups_[name]);
  }

  var allDefs = imports.join('\n') + '\n\n' + definitions_var.join('\n') + '\n\n' + definitions_fun.join('\n') + '\n\nvoid setup(){\n  ' + setups.join('\n  ') + '\n}' + '\n\n';
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.  A trailing semicolon is needed to make this legal.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Arduino.scrubNakedValue = function (line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped Arduino string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Arduino string.
 * @private
 */
Blockly.Arduino.quote_ = function (string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  //return goog.string.quote(string);
  return "\"" + string + "\"";
};

/**
 * Common tasks for generating Arduino from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Arduino code created for this block.
 * @return {string} Arduino code with comments and subsequent blocks added.
 * @private
 */
Blockly.Arduino.scrub_ = function (block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Arduino.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Arduino.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Arduino.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Arduino.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};
// ---------------------------------异常处理---------------------------------
// 不支持硬件的积木 统一按返回空字符串
var motionArr = ['motion_movesteps', 'motion_turnright', 'motion_turnleft', 'motion_pointindirection', 'motion_pointtowards_menu', 'motion_pointtowards', 'motion_goto_menu', 'motion_gotoxy', 'motion_goto', 'motion_glidesecstoxy', 'motion_glideto_menu', 'motion_glideto', 'motion_changexby', 'motion_setx', 'motion_changeyby', 'motion_sety', 'motion_ifonedgebounce', 'motion_setrotationstyle', 'motion_xposition', 'motion_yposition', 'motion_direction', 'motion_scroll_right', 'motion_scroll_up', 'motion_align_scene', 'motion_xscroll', 'motion_yscroll'];

var looksArr = ['looks_sayforsecs', 'looks_say', 'looks_thinkforsecs', 'looks_think', 'looks_show', 'looks_hide', 'looks_hideallsprites', 'looks_changeeffectby', 'looks_seteffectto', 'looks_cleargraphiceffects', 'looks_changesizeby', 'looks_setsizeto', 'looks_size', 'looks_changestretchby', 'looks_setstretchto', 'looks_costume', 'looks_switchcostumeto', 'looks_nextcostume', 'looks_switchbackdropto', 'looks_backdrops', 'looks_gotofrontback', 'looks_goforwardbackwardlayers', 'looks_backdropnumbername', 'looks_costumenumbername', 'looks_switchbackdroptoandwait', 'looks_nextbackdrop'];

var soundArr = ['sound_sounds_menu', 'sound_play', 'sound_playuntildone', 'sound_stopallsounds', 'sound_seteffectto', 'sound_changeeffectby', 'sound_cleareffects', 'sound_changevolumeby', 'sound_setvolumeto', 'sound_volume'];

var eventArr = ['event_whentouchingobject', 'event_touchingobjectmenu', 'event_whenflagclicked', 'event_whenthisspriteclicked', 'event_whenstageclicked', 'event_whenbroadcastreceived', 'event_whenbackdropswitchesto', 'event_whengreaterthan', 'event_broadcast_menu', 'event_broadcast', 'event_broadcastandwait', 'event_whenkeypressed'];

var sensingArr = ['sensing_touchingobject', 'sensing_touchingobjectmenu', 'sensing_touchingcolor', 'sensing_coloristouchingcolor', 'sensing_distanceto', 'sensing_distancetomenu', 'sensing_askandwait', 'sensing_answer', 'sensing_keypressed', 'sensing_keyoptions', 'sensing_mousedown', 'sensing_mousex', 'sensing_mousey', 'sensing_setdragmode', 'sensing_loudness', 'sensing_loud', 'sensing_timer', 'sensing_resettimer', 'sensing_of_object_menu', 'sensing_of', 'sensing_current', 'sensing_dayssince2000', 'sensing_username', 'sensing_userid'];

var proceduresArr = ['procedures_definition', 'procedures_call', 'procedures_prototype', 'procedures_declaration', 'argument_reporter_boolean', 'argument_reporter_string_number', 'argument_editor_boolean', 'argument_editor_string_number'];

var controArr = ['control_stop', 'control_start_as_clone', 'control_create_clone_of_menu', 'control_create_clone_of', 'control_delete_this_clone', 'control_get_counter', 'control_incr_counter', 'control_all_at_once'];

var errArr = [motionArr, looksArr, soundArr, eventArr, sensingArr, controArr, proceduresArr];


for (var i = 0; i < errArr.length; i++) {
  for (var j = 0; j < errArr[i].length; j++) {
    var data = errArr[i][j];
    Blockly.Arduino[data] = function () {
      console.log("异常处理!!");
      return '';
    };
  }
}

// ------------------------------------------原生代码块-----------------------------------------

// 基本
Blockly.Arduino.base_setup = function () {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
  if (branch) {
    Blockly.Arduino.setups_['setup_setup'] = branch;
  }
  return '';
};

// 重复循环
Blockly.Arduino["control_forever"] = function () {
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = '';
  code += 'while( true ) {\n';
  code += branch + '\n';
  code += '}\n';
  return code;
};

// 循环10次
Blockly.Arduino["control_repeat"] = function () {
  var times = Blockly.Arduino.valueToCode(this, 'TIMES', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = '';
  code += 'for(i = 0; i < ' + times + '; i++) {\n';
  code += branch + '\n';
  code += '}\n';
  return code;
};

// if
Blockly.Arduino["control_if"] = function () {
  var argument = Blockly.Arduino.valueToCode(this, 'CONDITION',
    Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = 'if (' + argument + ') {\n' + branch + '\n}';
  return code + '\n';
};

// if else
Blockly.Arduino["control_if_else"] = function () {
  var argument = Blockly.Arduino.valueToCode(this, 'CONDITION',
    Blockly.Arduino.ORDER_NONE) || 'false';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = 'if (' + argument + ') {\n' + branch + '\n}';
  branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK2');
  code += ' else {\n' + branch + '\n}';
  return code + '\n';
};

// 等待几秒
Blockly.Arduino["control_wait"] = function () {
  var argument = Blockly.Arduino.valueToCode(this, 'DURATION',
    Blockly.Arduino.ORDER_ATOMIC) || '1';
  argument = argument * 1000;
  var code = 'delay (' + argument + ')\n';
  return code + '\n';
};

// 等待直到条件成立
Blockly.Arduino["control_wait_until"] = function () {
  var argument = Blockly.Arduino.valueToCode(this, 'CONDITION',
    Blockly.Arduino.ORDER_ATOMIC) || 'false';
  var code = 'while ( true ) { if(' + argument + '){ break; }\n';
  return code + '\n';
};

// 重复循环直到条件成立
Blockly.Arduino["control_repeat_until"] = function () {
  var times = Blockly.Arduino.valueToCode(this, 'CONDITION', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = '';
  code += 'while( ' + times + ' ) {\n';
  code += branch + '\n';
  code += '}\n';
  return code;
};

// 两数相加
Blockly.Arduino.operator_add = function () {
  var order = Blockly.Arduino.ORDER_ADDITIVE;
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'NUM2', order) || '0';
  var code = argument0 + "+" + argument1;
  return [code, order];
};

// 两数相减
Blockly.Arduino.operator_subtract = function () {
  var order = Blockly.Arduino.ORDER_ADDITIVE;
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'NUM2', order) || '0';
  var code = argument0 + "-" + argument1;
  return [code, order];
};
// 两数相乘
Blockly.Arduino.operator_multiply = function () {
  var order = Blockly.Arduino.ORDER_MULTIPLICATIVE;
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'NUM2', order) || '0';
  var code = argument0 + "*" + argument1;
  return [code, order];
};
// 两数相除
Blockly.Arduino.operator_divide = function () {
  var order = Blockly.Arduino.ORDER_MULTIPLICATIVE;
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'NUM2', order) || '0';
  var code = argument0 + "/" + argument1;
  return [code, order];
};

// 两数直接随机数
Blockly.Arduino.operator_random = function () {
  // Random integer between [X] and [Y].
  var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
    Blockly.Arduino.ORDER_NONE) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
    Blockly.Arduino.ORDER_NONE) || '0';
  var code = 'random(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

// < 比较器
Blockly.Arduino.operator_lt = function () {
  // Comparison operator.

  // var order = (operator == '==' || operator == '!=') ?
  //     Blockly.Arduino.ORDER_EQUALITY : Blockly.Arduino.ORDER_RELATIONAL;
  var order = Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', order) || '0';
  var code = argument0 + ' < ' + argument1;
  return [code, order];
};

// = 比较器
Blockly.Arduino.operator_equals = function () {

  var order = Blockly.Arduino.ORDER_EQUALITY;
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', order) || '0';
  var code = argument0 + ' == ' + argument1;
  return [code, order];
};

// > 比较器
Blockly.Arduino.operator_gt = function () {

  var order = Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', order) || '0';
  var code = argument0 + ' > ' + argument1;
  return [code, order];
};

// 与门
Blockly.Arduino.operator_and = function () {

  var order = Blockly.Arduino.ORDER_LOGICAL_AND;
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', order) || '0';
  var code = argument0 + ' && ' + argument1;
  return [code, order];
};

// 或门
Blockly.Arduino.operator_or = function () {

  var order = Blockly.Arduino.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND1', order) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'OPERAND2', order) || '0';
  var code = argument0 + ' || ' + argument1;
  return [code, order];
};

// 非 operator_not
Blockly.Arduino.operator_not = function () {

  var order = Blockly.Arduino.ORDER_RELATIONAL;
  var argument0 = Blockly.Arduino.valueToCode(this, 'OPERAND', order) || 'false';
  var code = '! ' + argument0;
  return [code, order];
};

// 连接字符串
Blockly.Arduino.operator_join = function () {
  // Text value.
  var order = Blockly.Arduino.ORDER_ATOMIC;
  var a = 'String(' + Blockly.Arduino.valueToCode(this, 'STRING1', order) + ')';
  var b = 'String(' + Blockly.Arduino.valueToCode(this, 'STRING2', order) + ')';
  return [a + ' + ' + b, order];
};

// ** 的第几个字符
Blockly.Arduino.operator_letter_of = function () {
  var order = Blockly.Arduino.ORDER_ATOMIC;
  var str = Blockly.Arduino.valueToCode(this, 'STRING', order) || '\"\"';
  var at = Blockly.Arduino.valueToCode(this, 'LETTER', order) || '0';
  return ['String(' + str + ')' + '.charAt(' + at + ')', order];
};

// 字符长度
Blockly.Arduino.operator_length = function () {
  var str = Blockly.Arduino.valueToCode(this, 'STRING', Blockly.Arduino.ORDER_ATOMIC) || '\"\"';
  return ['String(' + str + ')' + '.length()', Blockly.Arduino.ORDER_ATOMIC];
};

// 包含字符?
Blockly.Arduino.operator_contains = function () {
  var str1 = 'String(' + (Blockly.Arduino.valueToCode(this, 'STRING1', Blockly.Arduino.ORDER_ATOMIC) || '\"\"') + ')';
  var str2 = 'String(' + (Blockly.Arduino.valueToCode(this, 'STRING2', Blockly.Arduino.ORDER_ATOMIC) || '\"\"') + ')';
  var dowhat = "equals";
  return [str1 + '.' + dowhat + '(' + str2 + ')', Blockly.Arduino.ORDER_ATOMIC];
};

// 取余数
Blockly.Arduino.operator_mod = function () {
  var order = Blockly.Arduino.ORDER_MULTIPLICATIVE;
  var argument0 = Blockly.Arduino.valueToCode(this, 'A', order) || '1';
  var argument1 = Blockly.Arduino.valueToCode(this, 'B', order) || '1';
  var code = '(long) ( ' + argument0 + ' ) % (long) ( ' + argument1 + ' )';
  return [code, order];
};

// 四舍五入
Blockly.Arduino.operator_round = function () {
  var order = Blockly.Arduino.ORDER_ATOMIC;
  var argument0 = Blockly.Arduino.valueToCode(this, 'NUM', order) || '0';

  var code = 'round( ' + argument0 + ' )';
  return [code, order];
};

//绝对值
Blockly.Arduino.operator_mathop = function () {
  // Math operators with single operand.
  var operator = this.getFieldValue('OPERATOR');
  var code;
  var arg;
  console.log(operator);
  if (operator == 'abs') {
    arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_UNARY_PREFIX) || '0';
  }

  if (operator == 'sin' || operator == 'cos' || operator == 'tan' ||
    operator == 'asin' || operator == 'acos' || operator == 'atan') {
    arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_MULTIPLICATIVE) || '0';
  }
  arg = Blockly.Arduino.valueToCode(this, 'NUM', Blockly.Arduino.ORDER_NONE) || '0';

  switch (operator) {
    case "abs":
      code = 'abs( ' + arg + ' )';
      break;
    case "floor":
      code = 'floor( ' + arg + ' )';
      break;
    case "ceiling":
      code = 'ceil( ' + arg + ' )';
      break;
    case "sqrt":
      code = 'sqrt( ' + arg + ' )';
      break;
    case "sin":
      code = 'sin(' + arg + ' / 180.0 * 3.14159)';
      break;
    case "cos":
      code = 'cos(' + arg + ' / 180.0 * 3.14159)';
      break;
    case "tan":
      code = 'tan(' + arg + ' / 180.0 * 3.14159)';
      break;
    case "asin":
      code = 'asin(' + arg + ' / 180.0 * 3.14159)';
      break;
    case "acos":
      code = 'acos(' + arg + ' / 180.0 * 3.14159)';
      break;
    case "atan":
      code = 'atan(' + arg + ' / 180.0 * 3.14159)';
      break;
    case "ln":
      code = 'log(' + arg + ')';
      break;
    case "log":
      code = 'log(' + arg + ') / log(10)';
      break;
    case "e ^":
      code = 'exp(' + arg + ')';
      break;
    case "10 ^":
      code = 'pow(10,' + arg + ')';
      break;

    default:
      break;
  }
  return [code, Blockly.Arduino.ORDER_MULTIPLICATIVE];
};

// ------------------------------数字-----------------------

// 数字
Blockly.Arduino.math_number = function () {
  var code = (this.getFieldValue('NUM'));
  var order = code < 0 ?
    Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};
// 循环十次用到
Blockly.Arduino.math_whole_number = function () {
  var code = (this.getFieldValue('NUM'));
  var order = code < 0 ?
    Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};
// 等待1秒用到
Blockly.Arduino.math_positive_number = function () {
  var code = (this.getFieldValue('NUM'));
  var order = code < 0 ?
    Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};

// 绝对值那里用到
// Blockly.Arduino.operator_mathop = function () {
//   var code = (this.getFieldValue('NUM'));
//   var order = code < 0 ?
//     Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
//   return [code, order];
// };

// text
Blockly.Arduino.text = function () {
  var code = (this.getFieldValue('TEXT'));
  var order = code < 0 ?
    Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};




// -----------------------------------------硬件模块生成代码------------------------------------

// ------------------------------------------输入模块------------------------------------------
// main
Blockly.Arduino["nano_main_"] = function () {

  var code = 'nano_main_';

  return code;
};

// 1_01按键模块-uno_key
Blockly.Arduino.uno_key = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  // Blockly.Arduino.definitions_['define_letopo1'] = '#include <letopo_uno_v2.0.h>1';
  Blockly.Arduino.definitions_['le_uno_v2_key_' + dropdown_port] = 'le_io key_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.definitions_['le_uno_v2_key11_'] = 'function(){}' + ';';

  Blockly.Arduino.setups_['key_io_init_' + dropdown_port] = 'key_' + dropdown_port + '.le_io_init(1);';
  var code = 'key_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


// 1_02触摸模块-uno_touch
Blockly.Arduino.uno_touch = function () {
  var dropdown_port = this.getFieldValue('port');
  // console.log(dropdown_port);
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_touch_' + dropdown_port] = 'le_io touch_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['touch_io_init_' + dropdown_port] = 'touch_' + dropdown_port + '.le_io_init(1);';
  var code = 'touch_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_03拨位模块-uno_switch
Blockly.Arduino.uno_switch = function () {
  var dropdown_port = this.getFieldValue('port');
  console.log(dropdown_port);
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_switch_' + dropdown_port] = 'le_io switch_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['switch_io_init_' + dropdown_port] = 'switch_' + dropdown_port + '.le_io_init(1);';
  var code = 'switch_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_04电位器模块-le_uno_v2_potential
Blockly.Arduino.uno_potential = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_potential_' + dropdown_port] = 'le_io potential_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['potential_io_init_' + dropdown_port] = 'potential_' + dropdown_port + '.le_io_init(1);';
  var code = 'potential_' + dropdown_port + '.io_read_analog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_05光感模块-uno_sensitization
Blockly.Arduino.uno_sensitization = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_sensitization_' + dropdown_port] = 'le_io sensitization_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['sensitization_io_init_' + dropdown_port] = 'sensitization_' + dropdown_port + '.le_io_init(1);';
  var code = 'sensitization_' + dropdown_port + '.io_read_analog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_06雨滴模块-uno_raindrop
Blockly.Arduino.uno_raindrop = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_raindrop_' + dropdown_port] = 'le_io raindrop_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['raindrop_io_init_' + dropdown_port] = 'raindrop_' + dropdown_port + '.le_io_init(1);';
  var code = 'raindrop_' + dropdown_port + '.io_read_analog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_07灰度模块-uno_gray
Blockly.Arduino.uno_gray = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_gray_' + dropdown_port] = 'le_io gray_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['gray_io_init_' + dropdown_port] = 'gray_' + dropdown_port + '.le_io_init(1);';
  var code = 'gray_' + dropdown_port + '.io_read_analog(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_07_1灰度模块带识别-uno_gray_discern
Blockly.Arduino.uno_gray_discern = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  var dropdown_select = this.getFieldValue('select');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_gray_' + dropdown_port] = 'le_io gray_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['gray_io_init_' + dropdown_port] = 'gray_' + dropdown_port + '.le_io_init(1);';
  var code = 'gray_' + dropdown_port + '.io_analog_discern(' + dropdown_choice + ',100,' + dropdown_select + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_08人体红外模块-uno_bodyinfrare
Blockly.Arduino.uno_bodyinfrare = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_bodyinfrare_' + dropdown_port] = 'le_io bodyinfrare_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['bodyinfrare_io_init_' + dropdown_port] = 'bodyinfrare_' + dropdown_port + '.le_io_init(1);';
  var code = 'bodyinfrare_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_09超声测距模块-uno_ultrasound
Blockly.Arduino.uno_ultrasound = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_ultrasound_' + dropdown_port] = 'le_ultrasound ultrasound_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['ultrasound_init_' + dropdown_port] = 'ultrasound_' + dropdown_port + '.ultrasound_init();';
  var code = 'ultrasound_' + dropdown_port + '.get_ultrasound()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_10温湿度模块-uno_dht11
Blockly.Arduino.uno_dht11 = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_dht11_' + dropdown_port] = 'le_dht11 dht11_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['dht11_init_' + dropdown_port] = 'dht11_' + dropdown_port + '.le_dht11_init();';
  var code = 'dht11_' + dropdown_port + '.get_humiture(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_11颜色模块-uno_color
Blockly.Arduino.uno_color = function () {
  var dropdown_port = this.getFieldValue('port');
  // var dropdown_speed = this.getTitleValue('speed');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_color_' + dropdown_port] = 'le_color color_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['color_init_' + dropdown_port] = 'color_' + dropdown_port + '.color_init();';
  var code = 'color_' + dropdown_port + '.color(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_11_1颜色模块-uno_color_recognition
Blockly.Arduino.uno_color_recognition = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('color_choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_color_' + dropdown_port] = 'le_color color_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['color_init_' + dropdown_port] = 'color_' + dropdown_port + '.color_init();';
  var code = 'color_' + dropdown_port + '.color_recognition(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_12单灰度模块-uno_singlegray
Blockly.Arduino.uno_singlegray = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_singlegray_' + dropdown_port] = 'le_io singlegray_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['singlegray_io_init_' + dropdown_port] = 'singlegray_' + dropdown_port + '.le_io_init(1);';
  var code = 'singlegray_' + dropdown_port + '.io_read_analog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_13六轴陀螺仪模块-uno_gyro
Blockly.Arduino.uno_gyro = function () {
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.setups_['le_uno_v2_gyro'] = 'IMU::init();' + '\n\t' + 'IMU::read();';
  var code = null;
  if (dropdown_choice == 1) {
    code = 'IMU::getRoll()';
  }
  else if (dropdown_choice == 2) {
    code = 'IMU::getPitch()';
  }
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_14四按键模块-uno_fourkeys
Blockly.Arduino.uno_fourkeys = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_fourkeys' + dropdown_port] = 'le_fourkeys fourkeys_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['fourkeys' + dropdown_port] = 'fourkeys_' + dropdown_port + '.fourkeys_init();';
  var code = 'fourkeys_' + dropdown_port + '.fourkeys(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_14四按键模块-uno_rocker
Blockly.Arduino.uno_rocker = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_rocker_' + dropdown_port] = 'le_io rocker_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['rocker_io_init_' + dropdown_port] = 'rocker_' + dropdown_port + '.le_io_init(1);';
  var code = 'rocker_' + dropdown_port + '.io_read_analog(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_16磁力计模块-uno_magnetic
Blockly.Arduino.uno_magnetic = function () {
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.setups_['le_uno_v2_magnetic'] = 'HMC5883_init();';
  var code = "get_magnetic_strength(" + dropdown_choice + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// ---------------------------------------输出------------------------------------

// 2_01led模块-uno_led
Blockly.Arduino.uno_led = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
  // console.log(dropdown_logic);
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_led_' + dropdown_port] = 'le_io led_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['led_io_init_' + dropdown_port] = 'led_' + dropdown_port + '.le_io_init(0);';
  Blockly.Arduino.setups_['led_pwm_init_' + dropdown_port] = 'led_' + dropdown_port + '.io_pwm_init();';
  var code = 'led_' + dropdown_port + '.io_write_analog(' + dropdown_logic + ',1);';
  return code + '\n';
};

// 2_011led模块-uno_led_simple
Blockly.Arduino.uno_led_simple = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_led_' + dropdown_port] = 'le_io led_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['led_io_init_' + dropdown_port] = 'led_' + dropdown_port + '.le_io_init(0);';
  var code = 'led_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
  return code + '\n';
};


// 2_02蜂鸣模块-uno_buzzer
Blockly.Arduino.uno_buzzer = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_buzzer_' + dropdown_port] = 'le_io buzzer_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['buzzer_io_init_' + dropdown_port] = 'buzzer_' + dropdown_port + '.le_io_init(0);';
  Blockly.Arduino.setups_['buzzer_pwm_init_' + dropdown_port] = 'buzzer_' + dropdown_port + '.io_pwm_init();';
  var code = 'buzzer_' + dropdown_port + '.io_write_analog(' + dropdown_logic + ',1);';
  return code + '\n';
};

// 2_021蜂鸣模块-uno_buzzer_simple
Blockly.Arduino.uno_buzzer_simple = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_buzzer_' + dropdown_port] = 'le_io buzzer_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['buzzer_io_init_' + dropdown_port] = 'buzzer_' + dropdown_port + '.le_io_init(0);';
  var code = 'buzzer_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
  return code + '\n';
};

// 2_03震动模块-uno_shake
Blockly.Arduino.uno_shake = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_shake_' + dropdown_port] = 'le_io shake_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['shake_io_init_' + dropdown_port] = 'shake_' + dropdown_port + '.le_io_init(0);';
  Blockly.Arduino.setups_['shake_pwm_init_' + dropdown_port] = 'shake_' + dropdown_port + '.io_pwm_init();';
  var code = 'shake_' + dropdown_port + '.io_write_analog(' + dropdown_logic + ',1);';
  return code + '\n';
};

// 2_031震动模块-uno_shake_simple
Blockly.Arduino.uno_shake_simple = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_shake_' + dropdown_port] = 'le_io shake_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['shake_io_init_' + dropdown_port] = 'shake_' + dropdown_port + '.le_io_init(0);';
  var code = 'shake_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
  return code + '\n';
};

// 2_04RGB模块-uno_rgb
Blockly.Arduino.uno_rgb = function () {
  var dropdown_port = this.getFieldValue('port');
  // var number = this.getFieldValue('number');
  // if(number == '全部灯')
  // {
  //     number = 0;
  // }
  var number = Blockly.Arduino.valueToCode(this, 'number', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var rvalue = Blockly.Arduino.valueToCode(this, 'rvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var gvalue = Blockly.Arduino.valueToCode(this, 'gvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var bvalue = Blockly.Arduino.valueToCode(this, 'bvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_rgb_' + dropdown_port] = 'le_rgb rgb_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['rgb_init_' + dropdown_port] = 'rgb_' + dropdown_port + '.begin();';
  var code = 'rgb_' + dropdown_port + '.setPixelColor(' + number + ',rgb_' + dropdown_port + '.Color(' + rvalue + ',' + gvalue + ',' + bvalue + '));';// +  '\n' + 'rgb_' + dropdown_port + '.show();';
  return code + '\n';
};

// 2_041RGB模块-uno_rgb_all
Blockly.Arduino.uno_rgb_all = function () {
  var dropdown_port = this.getFieldValue('port');
  var rvalue = Blockly.Arduino.valueToCode(this, 'rvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var gvalue = Blockly.Arduino.valueToCode(this, 'gvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var bvalue = Blockly.Arduino.valueToCode(this, 'bvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_rgb_' + dropdown_port] = 'le_rgb rgb_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['rgb_init_' + dropdown_port] = 'rgb_' + dropdown_port + '.begin();';
  var code = 'rgb_' + dropdown_port + '.fill(rgb_' + dropdown_port + '.Color(' + rvalue + ',' + gvalue + ',' + bvalue + '));'; //+  '\n' + 'rgb_' + dropdown_port + '.show();';
  return code + '\n';
};

// 2_042rgb灯带-uno_rgb_strip
Blockly.Arduino.uno_rgb_strip = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_number = Blockly.Arduino.valueToCode(this, 'number', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var rvalue = Blockly.Arduino.valueToCode(this, 'rvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var gvalue = Blockly.Arduino.valueToCode(this, 'gvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var bvalue = Blockly.Arduino.valueToCode(this, 'bvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_rgb_' + dropdown_port] = 'le_rgb rgb_' + dropdown_port + '(' + dropdown_port + ',' + dropdown_number + ');';
  Blockly.Arduino.setups_['rgb_init_' + dropdown_port] = 'rgb_' + dropdown_port + '.begin();';
  var code = 'rgb_' + dropdown_port + '.fill(rgb_' + dropdown_port + '.Color(' + rvalue + ',' + gvalue + ',' + bvalue + '));'; //+  '\n' + 'rgb_' + dropdown_port + '.show();';
  return code + '\n';
};

// 2_043rgb灯带像素-uno_rgb_strip_pixel
Blockly.Arduino.uno_rgb_strip_pixel = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_number = Blockly.Arduino.valueToCode(this, 'number', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var dropdown_pixel = Blockly.Arduino.valueToCode(this, 'pixel', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var rvalue = Blockly.Arduino.valueToCode(this, 'rvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var gvalue = Blockly.Arduino.valueToCode(this, 'gvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var bvalue = Blockly.Arduino.valueToCode(this, 'bvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_rgb_' + dropdown_port] = 'le_rgb rgb_' + dropdown_port + '(' + dropdown_port + ',' + dropdown_number + ');';
  Blockly.Arduino.setups_['rgb_init_' + dropdown_port] = 'rgb_' + dropdown_port + '.begin();';
  var code = 'rgb_' + dropdown_port + '.setPixelColor(' + dropdown_pixel + ',rgb_' + dropdown_port + '.Color(' + rvalue + ',' + gvalue + ',' + bvalue + '));';
  return code + '\n';
};

// 2_05电机模块-uno_motor
Blockly.Arduino.uno_motor = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_direct = this.getFieldValue('direct');
  var dropdown_speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_motor_' + dropdown_port] = 'le_motor motor_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['motor_init_' + dropdown_port] = 'motor_' + dropdown_port + '.motor_init();';
  var code = 'motor_' + dropdown_port + '.motor_run(' + dropdown_direct + ',' + dropdown_speed + ');';
  return code + '\n';
};

// 2_06舵机模块-uno_servomotor
Blockly.Arduino.uno_servomotor = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  var dropdown_angle = Blockly.Arduino.valueToCode(this, 'angle', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var dropdown_delayms = Blockly.Arduino.valueToCode(this, 'delayms', Blockly.Arduino.ORDER_ATOMIC) || '100';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_servomotor_' + dropdown_port + dropdown_choice] = 'Servo servo_' + dropdown_port + '_' + dropdown_choice + ';' + '\n' + 'le_servo crtlservo_' + dropdown_port + '_' + dropdown_choice + '(' + dropdown_port + ',' + dropdown_choice + ');';
  var code = 'servo_' + dropdown_port + '_' + dropdown_choice + '.attach(crtlservo_' + dropdown_port + '_' + dropdown_choice + '.servo_pin());' + '\n' + 'servo_' + dropdown_port + '_' + dropdown_choice + '.write(constrain(' + dropdown_angle + ', 5, 175));' + '\n' + 'delay(' + dropdown_delayms + ');' + '\n' + 'servo_' + dropdown_port + '_' + dropdown_choice + '.detach();';
  return code + '\n';
};

// 2_07四按键模块 uno_fourkeysled
Blockly.Arduino.uno_fourkeysled = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_fourkeys' + dropdown_port] = 'le_fourkeys fourkeys_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['fourkeys' + dropdown_port] = 'fourkeys_' + dropdown_port + '.fourkeys_init();';
  var code = 'fourkeys_' + dropdown_port + '.fourkeysled(' + dropdown_logic + ');';
  return code + '\n';
};

// ---------------------------------------------通讯模块----------------------------------------
// 3_01获取2.4G模块数据-uno_24G_serial
Blockly.Arduino.uno_24G_get_serial = function () {
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  var code = 'nrf_get();';
  return code + '\n';
};

// 3_022.4G模块-uno_24G_serial
Blockly.Arduino.uno_24G_serial = function () {
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.setups_['nrf_init'] = 'NRF24L01_Config_Master();';
  var code = 'nrf_val(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 3_03新2.4G模块-uno_24G_serial_new
Blockly.Arduino.uno_24G_serial_new = function () {
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.setups_['nrf_init'] = 'NRF24L01_Config_Master();';
  var code = 'nrf_val(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};


// 测试

Blockly.Arduino.nano_digitalWrite = function () {
  var code = 'aaaaaaaaaaaaaaaaa';
  return code;
};




