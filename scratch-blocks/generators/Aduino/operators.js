'use strict';

goog.provide('Blockly.Arduino.math');

goog.require('Blockly.Arduino');


Blockly.Arduino.math_number = function () {
  // Numeric value.
  var code = (this.getFieldValue('NUM'));
  // -4.abs() returns -4 in Dart due to strange order of operation choices.
  // -4 is actually an operator and a number.  Reflect this in the order.
  var order = code < 0 ?
    Blockly.Arduino.ORDER_UNARY_PREFIX : Blockly.Arduino.ORDER_ATOMIC;
  return [code, order];
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


