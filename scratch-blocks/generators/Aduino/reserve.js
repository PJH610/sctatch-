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

Blockly.Arduino.base_setup = function () {
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
  if (branch) {
    Blockly.Arduino.setups_['setup_setup'] = branch;
  }
  return '';
};

// 如果 那么
Blockly.Arduino["control_if"] = function () {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
    Blockly.Arduino.ORDER_NONE) || 'false';
  // console.log(argument)
  // CONDITION 条件
  // SUBSTACK 垂直叠加
  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  console.log("statementToCode", Blockly.Arduino.statementToCode);
  console.log(branch);

  var code = 'if (' + argument + ') {\n' + branch + '\n}';
  // var code = 'if (' + argument + ') {\n' + 'if(){}' + '\n}';
  // console.log("标记", this.elseifCount_)
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'false';
    branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (this.elseCount_) {
    branch = Blockly.Arduino.statementToCode(this, 'ELSE');
    code += ' else {\n' + branch + '\n}';
  }
  return code + '\n';
};

// 重复循环
Blockly.Arduino["control_forever"] = function () {
  // If/elseif/else condition.
  // Do while/until loop.
  var logic = Blockly.Arduino.valueToCode(this, 'logic',
    Blockly.Arduino.ORDER_NONE) || 'false';

  var branch = Blockly.Arduino.statementToCode(this, 'SUBSTACK');
  var code = '';
  code += 'while(!(' + logic + ')) {\n';
  code += branch + '\n';
  code += '}\n';
  return code;
};

Blockly.Arduino.controls_switch_case = function () {
  var n = 0;
  var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
    Blockly.Arduino.ORDER_NONE) || 'NULL';
  var branch = '';
  var code = 'switch (' + argument + ') {\n';
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
      Blockly.Arduino.ORDER_NONE) || 'NULL';
    branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
    code += ' case ' + argument + ': \n' + branch + '  break;\n';
  }
  if (this.elseCount_) {
    branch = Blockly.Arduino.statementToCode(this, 'ELSE');
    code += ' default:\n' + branch + '  break;\n';
  }
  code += '}';
  return code + '\n';
};

Blockly.Arduino.controls_for = function () {
  // For loop.
  var variable0 = Blockly.Arduino.variableDB_.getName(
    this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Arduino.valueToCode(this, 'FROM',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '0';
  var step = Blockly.Arduino.valueToCode(this, 'STEP',
    Blockly.Arduino.ORDER_ASSIGNMENT) || '1';
  var branch = Blockly.Arduino.statementToCode(this, 'DO');
  if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
    branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
      '\'' + this.id + '\'') + branch;
  }
  var code;
  var down = 0;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
    argument1.match(/^-?\d+(\.\d+)?$/)) {
    //起止数是常量
    down = (argument1 - argument0 < 0);
    code = 'for (int ' + variable0 + ' = ' + argument0 + '; ' +
      variable0 + (down ? ' >= ' : ' <= ') + argument1 + '; ' +
      variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
      branch + '}\n';
  } else {
    //起止数有变量
    if (step.match(/^-?\d+(\.\d+)?$/)) {
      //步长是常量
      down = step < 0;
      code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
        variable0 + (down ? ' >= ' : ' <= ') + '(' + argument1 + '); ' +
        variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
        branch + '}\n';
    } else {
      //步长是变量
      code = 'for (int ' + variable0 + ' = (' + argument0 + '); ' +
        '(' + argument1 + '>=' + argument0 + ')?(' + variable0 + '<=' + argument1 + '):(' + variable0 + '>=' + argument1 + '); ' +
        variable0 + ' = ' + variable0 + ' + (' + step + ')) {\n' +
        branch + '}\n';
    }

  }
  return code;
};


// more_operator

Blockly.Arduino["more_operator"] = function () {

  var code = 'more_operator';

  return code;
};

// -----------------------------------------硬件模块生成代码------------------------------------

// ------------------------------------------输入模块------------------------------------------
// main
Blockly.Arduino["nano_main_"] = function () {

  var code = 'nano_main_';

  return code;
};

// 1_01按键模块-le_uno_v2_key
Blockly.Arduino.le_uno_v2_key = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  // Blockly.Arduino.definitions_['define_letopo1'] = '#include <letopo_uno_v2.0.h>1';
  Blockly.Arduino.definitions_['le_uno_v2_key_' + dropdown_port] = 'le_io key_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.definitions_['le_uno_v2_key11_'] = 'function(){}' + ';';

  Blockly.Arduino.setups_['key_io_init_' + dropdown_port] = 'key_' + dropdown_port + '.le_io_init(1);';
  var code = 'key_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_01按键模块-le_uno_v2_key
Blockly.Arduino.uno_key1 = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  // Blockly.Arduino.definitions_['define_letopo1'] = '#include <letopo_uno_v2.0.h>1';
  Blockly.Arduino.definitions_['le_uno_v2_key_' + dropdown_port] = 'le_io key_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.definitions_['le_uno_v2_key11_'] = 'function(){}' + ';';

  Blockly.Arduino.setups_['key_io_init_' + dropdown_port] = 'key_' + dropdown_port + '.le_io_init(1);';
  var code = 'key_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_01按键模块-le_uno_v2_key
Blockly.Arduino.uno_key2 = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  // Blockly.Arduino.definitions_['define_letopo1'] = '#include <letopo_uno_v2.0.h>1';
  Blockly.Arduino.definitions_['le_uno_v2_key_' + dropdown_port] = 'le_io key_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.definitions_['le_uno_v2_key11_'] = 'function(){}' + ';';

  Blockly.Arduino.setups_['key_io_init_' + dropdown_port] = 'key_' + dropdown_port + '.le_io_init(1);';
  var code = 'key_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};
// 1_01按键模块-le_uno_v2_key
Blockly.Arduino.uno_key3 = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  // Blockly.Arduino.definitions_['define_letopo1'] = '#include <letopo_uno_v2.0.h>1';
  Blockly.Arduino.definitions_['le_uno_v2_key_' + dropdown_port] = 'le_io key_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.definitions_['le_uno_v2_key11_'] = 'function(){}' + ';';

  Blockly.Arduino.setups_['key_io_init_' + dropdown_port] = 'key_' + dropdown_port + '.le_io_init(1);';
  var code = 'key_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_02触摸模块-le_uno_v2_touch
Blockly.Arduino.le_uno_v2_touch = function () {
  var dropdown_port = this.getFieldValue('port');
  // console.log(dropdown_port);
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_touch_' + dropdown_port] = 'le_io touch_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['touch_io_init_' + dropdown_port] = 'touch_' + dropdown_port + '.le_io_init(1);';
  var code = 'touch_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_03拨位模块-le_uno_v2_switch
Blockly.Arduino.le_uno_v2_switch = function () {
  var dropdown_port = this.getFieldValue('port');
  console.log(dropdown_port);
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_switch_' + dropdown_port] = 'le_io switch_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['switch_io_init_' + dropdown_port] = 'switch_' + dropdown_port + '.le_io_init(1);';
  var code = 'switch_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_04电位器模块-le_uno_v2_potential
Blockly.Arduino.le_uno_v2_potential = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_potential_' + dropdown_port] = 'le_io potential_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['potential_io_init_' + dropdown_port] = 'potential_' + dropdown_port + '.le_io_init(1);';
  var code = 'potential_' + dropdown_port + '.io_read_analog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_05光感模块-le_uno_v2_sensitization
Blockly.Arduino.le_uno_v2_sensitization = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_sensitization_' + dropdown_port] = 'le_io sensitization_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['sensitization_io_init_' + dropdown_port] = 'sensitization_' + dropdown_port + '.le_io_init(1);';
  var code = 'sensitization_' + dropdown_port + '.io_read_analog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_06雨滴模块-le_uno_v2_raindrop
Blockly.Arduino.le_uno_v2_raindrop = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_raindrop_' + dropdown_port] = 'le_io raindrop_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['raindrop_io_init_' + dropdown_port] = 'raindrop_' + dropdown_port + '.le_io_init(1);';
  var code = 'raindrop_' + dropdown_port + '.io_read_analog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_07灰度模块-le_uno_v2_gray
Blockly.Arduino.le_uno_v2_gray = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_gray_' + dropdown_port] = 'le_io gray_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['gray_io_init_' + dropdown_port] = 'gray_' + dropdown_port + '.le_io_init(1);';
  var code = 'gray_' + dropdown_port + '.io_read_analog(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_07_1灰度模块带识别-le_uno_v2_gray_discern
Blockly.Arduino.le_uno_v2_gray_discern = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  var dropdown_select = this.getFieldValue('select');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_gray_' + dropdown_port] = 'le_io gray_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['gray_io_init_' + dropdown_port] = 'gray_' + dropdown_port + '.le_io_init(1);';
  var code = 'gray_' + dropdown_port + '.io_analog_discern(' + dropdown_choice + ',100,' + dropdown_select + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_08人体红外模块-le_uno_v2_bodyinfrare
Blockly.Arduino.le_uno_v2_bodyinfrare = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_bodyinfrare_' + dropdown_port] = 'le_io bodyinfrare_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['bodyinfrare_io_init_' + dropdown_port] = 'bodyinfrare_' + dropdown_port + '.le_io_init(1);';
  var code = 'bodyinfrare_' + dropdown_port + '.io_read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_09超声测距模块-le_uno_v2_ultrasound
Blockly.Arduino.le_uno_v2_ultrasound = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_ultrasound_' + dropdown_port] = 'le_ultrasound ultrasound_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['ultrasound_init_' + dropdown_port] = 'ultrasound_' + dropdown_port + '.ultrasound_init();';
  var code = 'ultrasound_' + dropdown_port + '.get_ultrasound()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_10温湿度模块-le_uno_v2_dht11
Blockly.Arduino.le_uno_v2_dht11 = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_dht11_' + dropdown_port] = 'le_dht11 dht11_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['dht11_init_' + dropdown_port] = 'dht11_' + dropdown_port + '.le_dht11_init();';
  var code = 'dht11_' + dropdown_port + '.get_humiture(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_11颜色模块-le_uno_v2_color
Blockly.Arduino.le_uno_v2_color = function () {
  var dropdown_port = this.getFieldValue('port');
  // var dropdown_speed = this.getTitleValue('speed');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_color_' + dropdown_port] = 'le_color color_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['color_init_' + dropdown_port] = 'color_' + dropdown_port + '.color_init();';
  var code = 'color_' + dropdown_port + '.color(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_11_1颜色模块-le_uno_v2_color_recognition
Blockly.Arduino.le_uno_v2_color_recognition = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('color_choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_color_' + dropdown_port] = 'le_color color_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['color_init_' + dropdown_port] = 'color_' + dropdown_port + '.color_init();';
  var code = 'color_' + dropdown_port + '.color_recognition(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_12单灰度模块-le_uno_v2_singlegray
Blockly.Arduino.le_uno_v2_singlegray = function () {
  var dropdown_port = this.getFieldValue('port');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_singlegray_' + dropdown_port] = 'le_io singlegray_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['singlegray_io_init_' + dropdown_port] = 'singlegray_' + dropdown_port + '.le_io_init(1);';
  var code = 'singlegray_' + dropdown_port + '.io_read_analog()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_13六轴陀螺仪模块-le_uno_v2_gyro
Blockly.Arduino.le_uno_v2_gyro = function () {
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

// 1_14四按键模块-le_uno_v2_fourkeys
Blockly.Arduino.le_uno_v2_fourkeys = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_fourkeys' + dropdown_port] = 'le_fourkeys fourkeys_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['fourkeys' + dropdown_port] = 'fourkeys_' + dropdown_port + '.fourkeys_init();';
  var code = 'fourkeys_' + dropdown_port + '.fourkeys(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_14四按键模块-le_uno_v2_rocker
Blockly.Arduino.le_uno_v2_rocker = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_rocker_' + dropdown_port] = 'le_io rocker_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['rocker_io_init_' + dropdown_port] = 'rocker_' + dropdown_port + '.le_io_init(1);';
  var code = 'rocker_' + dropdown_port + '.io_read_analog(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 1_16磁力计模块-le_uno_v2_magnetic
Blockly.Arduino.le_uno_v2_magnetic = function () {
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.setups_['le_uno_v2_magnetic'] = 'HMC5883_init();';
  var code = "get_magnetic_strength(" + dropdown_choice + ")";
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// ---------------------------------------输出------------------------------------
// 数字
Blockly.Arduino.math_number = function () {
  // Numeric value.
  var code = (this.getFieldValue('NUM'));
  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
    Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
};

// 2_01led模块-le_uno_v2_led
Blockly.Arduino.le_uno_v2_led = function () {
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

// 2_011led模块-le_uno_v2_led_simple
Blockly.Arduino.le_uno_v2_led_simple = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_led_' + dropdown_port] = 'le_io led_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['led_io_init_' + dropdown_port] = 'led_' + dropdown_port + '.le_io_init(0);';
  var code = 'led_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
  return code + '\n';
};

// 2_011led模块-le_uno_v2_led_simple
Blockly.Arduino.le_uno_v2_led_simple = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_led_' + dropdown_port] = 'le_io led_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['led_io_init_' + dropdown_port] = 'led_' + dropdown_port + '.le_io_init(0);';
  var code = 'led_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
  return code + '\n';
};

// 2_02蜂鸣模块-le_uno_v2_buzzer
Blockly.Arduino.le_uno_v2_buzzer = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_buzzer_' + dropdown_port] = 'le_io buzzer_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['buzzer_io_init_' + dropdown_port] = 'buzzer_' + dropdown_port + '.le_io_init(0);';
  Blockly.Arduino.setups_['buzzer_pwm_init_' + dropdown_port] = 'buzzer_' + dropdown_port + '.io_pwm_init();';
  var code = 'buzzer_' + dropdown_port + '.io_write_analog(' + dropdown_logic + ',1);';
  return code + '\n';
};

// 2_021蜂鸣模块-le_uno_v2_buzzer_simple
Blockly.Arduino.le_uno_v2_buzzer_simple = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_buzzer_' + dropdown_port] = 'le_io buzzer_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['buzzer_io_init_' + dropdown_port] = 'buzzer_' + dropdown_port + '.le_io_init(0);';
  var code = 'buzzer_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
  return code + '\n';
};

// 2_03震动模块-le_uno_v2_shake
Blockly.Arduino.le_uno_v2_shake = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_shake_' + dropdown_port] = 'le_io shake_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['shake_io_init_' + dropdown_port] = 'shake_' + dropdown_port + '.le_io_init(0);';
  Blockly.Arduino.setups_['shake_pwm_init_' + dropdown_port] = 'shake_' + dropdown_port + '.io_pwm_init();';
  var code = 'shake_' + dropdown_port + '.io_write_analog(' + dropdown_logic + ',1);';
  return code + '\n';
};

// 2_031震动模块-le_uno_v2_shake_simple
Blockly.Arduino.le_uno_v2_shake_simple = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_shake_' + dropdown_port] = 'le_io shake_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['shake_io_init_' + dropdown_port] = 'shake_' + dropdown_port + '.le_io_init(0);';
  var code = 'shake_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
  return code + '\n';
};

// 2_04RGB模块-le_uno_v2_rgb
Blockly.Arduino.le_uno_v2_rgb = function () {
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

// 2_041RGB模块-le_uno_v2_rgb_all
Blockly.Arduino.le_uno_v2_rgb_all = function () {
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

// 2_042rgb灯带-le_uno_v2_rgb_strip
Blockly.Arduino.le_uno_v2_rgb_strip = function () {
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

// 2_043rgb灯带像素-le_uno_v2_rgb_strip_pixel
Blockly.Arduino.le_uno_v2_rgb_strip_pixel = function () {
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

// 2_05电机模块-le_uno_v2_motor
Blockly.Arduino.le_uno_v2_motor = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_direct = this.getFieldValue('direct');
  var dropdown_speed = Blockly.Arduino.valueToCode(this, 'speed', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_motor_' + dropdown_port] = 'le_motor motor_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['motor_init_' + dropdown_port] = 'motor_' + dropdown_port + '.motor_init();';
  var code = 'motor_' + dropdown_port + '.motor_run(' + dropdown_direct + ',' + dropdown_speed + ');';
  return code + '\n';
};

// 2_06舵机模块-le_uno_v2_servomotor
Blockly.Arduino.le_uno_v2_servomotor = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_choice = this.getFieldValue('choice');
  var dropdown_angle = Blockly.Arduino.valueToCode(this, 'angle', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var dropdown_delayms = Blockly.Arduino.valueToCode(this, 'delayms', Blockly.Arduino.ORDER_ATOMIC) || '100';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_servomotor_' + dropdown_port + dropdown_choice] = 'Servo servo_' + dropdown_port + '_' + dropdown_choice + ';' + '\n' + 'le_servo crtlservo_' + dropdown_port + '_' + dropdown_choice + '(' + dropdown_port + ',' + dropdown_choice + ');';
  var code = 'servo_' + dropdown_port + '_' + dropdown_choice + '.attach(crtlservo_' + dropdown_port + '_' + dropdown_choice + '.servo_pin());' + '\n' + 'servo_' + dropdown_port + '_' + dropdown_choice + '.write(constrain(' + dropdown_angle + ', 5, 175));' + '\n' + 'delay(' + dropdown_delayms + ');' + '\n' + 'servo_' + dropdown_port + '_' + dropdown_choice + '.detach();';
  return code + '\n';
};

// 2_07四按键模块led-le_uno_v2_fourkeysled
Blockly.Arduino.le_uno_v2_fourkeysled = function () {
  var dropdown_port = this.getFieldValue('port');
  var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.definitions_['le_uno_v2_fourkeys' + dropdown_port] = 'le_fourkeys fourkeys_' + dropdown_port + '(' + dropdown_port + ');';
  Blockly.Arduino.setups_['fourkeys' + dropdown_port] = 'fourkeys_' + dropdown_port + '.fourkeys_init();';
  var code = 'fourkeys_' + dropdown_port + '.fourkeysled(' + dropdown_logic + ');';
  return code + '\n';
};

// ---------------------------------------------通讯模块----------------------------------------
// 3_01获取2.4G模块数据-le_uno_v2_24G_serial
Blockly.Arduino.le_uno_v2_24G_get_serial = function () {
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  var code = 'nrf_get();';
  return code + '\n';
};

// 3_022.4G模块-le_uno_v2_24G_serial
Blockly.Arduino.le_uno_v2_24G_serial = function () {
  var dropdown_choice = this.getFieldValue('choice');
  Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
  Blockly.Arduino.setups_['nrf_init'] = 'NRF24L01_Config_Master();';
  var code = 'nrf_val(' + dropdown_choice + ')';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

// 3_03新2.4G模块-le_uno_v2_24G_serial_new
Blockly.Arduino.le_uno_v2_24G_serial_new = function () {
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




