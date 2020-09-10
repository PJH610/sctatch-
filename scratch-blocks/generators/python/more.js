'use strict';

goog.provide('Blockly.Python.more');

goog.require('Blockly.Python');

Blockly.Python['math_number'] = function (block) {
  var order;
  var code = parseFloat(block.getFieldValue('NUM'));
  if (isNaN(code)) {
    code = '0';
    order = Blockly.Python.ORDER_ATOMIC;
  } else if (code === Infinity) {
    code = 'float("inf")';
    order = Blockly.Python.ORDER_FUNCTION_CALL;
  } else if (code === -Infinity) {
    code = '-float("inf")';
    order = Blockly.Python.ORDER_UNARY_SIGN;
  } else {
    order = Blockly.Python[code < 0 ? 'ORDER_UNARY_SIGN' : 'ORDER_ATOMIC'];
  }
  return [code, order];
};

Blockly.Python['text'] = function (block) {
  var code = Blockly.Python.quote_(block.getFieldValue('TEXT'));
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['more_operator_arithmetic'] = function (block) {
  var order;
  var m02 = block.getFieldValue('m02');
  if (m02 === '+' || m02 === '-') {
    order = Blockly.Python.ORDER_ADDITIVE;
  } else {
    order = Blockly.Python.ORDER_MULTIPLICATIVE;
  }
  var m01 = Blockly.Python.valueToCode(block, 'm01', order);
  var m03 = Blockly.Python.valueToCode(block, 'm03', order);
  var code = m01 + ' ' + m02 + ' ' + m03;
  return [code, order];
};

Blockly.Python['more_operator_bit'] = function (block) {
  var order;
  var m02 = block.getFieldValue('m02');
  if (m02 === '&') {
    order = Blockly.Python.ORDER_BITWISE_AND;
  } else if (m02 === '|') {
    order = Blockly.Python.ORDER_BITWISE_OR;
  } else if (m02 === '^') {
    order = Blockly.Python.ORDER_BITWISE_XOR;
  } else {
    order = Blockly.Python.ORDER_BITWISE_SHIFT;
  }
  var m01 = Blockly.Python.valueToCode(block, 'm01', order);
  var m03 = Blockly.Python.valueToCode(block, 'm03', order);
  var code = m01 + ' ' + m02 + ' ' + m03;
  return [code, order];
};

Blockly.Python['more_operator_round'] = function (block) {
  var m02, code;
  var m01 = block.getFieldValue('m01');
  if (m01 === '~') {
    m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_BITWISE_NOT);
    code = m01 + m02;
    return [code, Blockly.Python.ORDER_BITWISE_NOT];
  }
  m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_NONE);
  if (m01 === 'round') {
    code = 'round(' + m02 + ')';
  } else {
    Blockly.Python.definitions_['import_math'] = 'import math';
    code = 'math.' + (m01 === 'abs' ? 'fabs' : m01) + '(' + m02 + ')';
  }
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['more_operator_trig'] = function (block) {
  Blockly.Python.definitions_['import_math'] = 'import math';
  var order, m02, code;
  var m01 = block.getFieldValue('m01');
  if (m01 === 'sin' || m01 === 'cos' || m01 === 'tan') {
    order = Blockly.Python.ORDER_FUNCTION_CALL;
    m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_MULTIPLICATIVE);
    code = 'math.' + m01 + '(' + m02 + ' / 180.0 * math.pi)';
  } else {
    order = Blockly.Python.ORDER_MULTIPLICATIVE;
    m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_NONE);
    code = 'math.' + m01 + '(' + m02 + ') / math.pi * 180';
  }
  return [code, order];
};

Blockly.Python['more_operator_compare'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = block.getFieldValue('m02');
  var m03 = Blockly.Python.valueToCode(block, 'm03', Blockly.Python.ORDER_NONE);
  var code = m01 + ' ' + m02 + ' ' + m03;
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python['more_operator_operation'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = block.getFieldValue('m02');
  var m03 = Blockly.Python.valueToCode(block, 'm03', Blockly.Python.ORDER_NONE);
  var code = m01 + ' ' + m02 + ' ' + m03;
  return [code, Blockly.Python[m02 === 'and' ? 'ORDER_LOGICAL_AND' : 'ORDER_LOGICAL_OR']];
};

Blockly.Python['more_operator_negate'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var code = 'not ' + m01;
  return [code, Blockly.Python.ORDER_LOGICAL_NOT];
};

Blockly.Python['more_operator_bool'] = function (block) {
  var m01 = block.getFieldValue('m01');
  return [m01, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['more_operator_max_min'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_NONE);
  var m03 = block.getFieldValue('m03');
  var code = m03 + '(' + m01 + ', ' + m02 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['more_operator_random'] = function (block) {
  var m02, code;
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m03 = block.getFieldValue('m03');
  if (m03 === 'int') {
    m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_ADDITIVE);
    code = 'int(random.uniform(' + m01 + ', ' + m02 + ' + 1))';
  } else {
    m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_NONE);
    code = 'random.uniform(' + m01 + ', ' + m02 + ')';
  }
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['more_operator_map'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_ADDITIVE);
  var m03 = Blockly.Python.valueToCode(block, 'm03', Blockly.Python.ORDER_NONE);
  var m04 = Blockly.Python.valueToCode(block, 'm04', Blockly.Python.ORDER_ADDITIVE);
  var m05 = Blockly.Python.valueToCode(block, 'm05', Blockly.Python.ORDER_NONE);
  var code = m04 + ' + (' + m05 + ' - ' + m04 + ') * (' + m01 + ' - ' + m02 + ') / (' + m03 + ' - ' + m02 + ')';
  return [code, Blockly.Python.ORDER_ADDITIVE];
};

Blockly.Python['more_operator_to_string'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = block.getFieldValue('m02');
  var code = m02 + '(' + m01 + ')';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['more_operator_to_number'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = block.getFieldValue('m02');
  var code = m02 + '(str(' + m01 + '))';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['more_operator_length'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var code = 'len(str(' + m01 + '))';
  return [code, Blockly.Python.ORDER_FUNCTION_CALL];
};

Blockly.Python['more_operator_letter_of'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_NONE);
  var m03 = Blockly.Python.valueToCode(block, 'm03', Blockly.Python.ORDER_NONE);
  var code = 'str(' + m01 + ')[' + m02 + ' - 1 : ' + m03 + ']';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['more_operator_join'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_NONE);
  var code = 'str(' + m01 + ') + str(' + m02 + ')';
  return [code, Blockly.Python.ORDER_ADDITIVE];
};

Blockly.Python['more_operator_contains'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_NONE);
  var code = 'str(' + m01 + ').find(str(' + m02 + ')) > -1';
  return [code, Blockly.Python.ORDER_RELATIONAL];
};

Blockly.Python['more_operator_starts_ends'] = function (block) {
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = Blockly.Python.valueToCode(block, 'm02', Blockly.Python.ORDER_NONE);
  var m03 = block.getFieldValue('m03');
  var code = 'str(' + m01 + ').' + m03 + 'swith(str(' + m02 + '))';
  return [code, Blockly.Python.ORDER_MEMBER];
};

Blockly.Python['more_control_wait'] = function (block) {
  Blockly.Python.definitions_['import_utime'] = 'import utime';
  var m01 = Blockly.Python.valueToCode(block, 'm01', Blockly.Python.ORDER_NONE);
  var m02 = block.getFieldValue('m02');
  var options = {
    s: 'sleep',
    ms: 'sleep_ms',
    us: 'sleep_us'
  };
  var code = 'utime.' + options[m02] + '(' + m01 + ')\n';
  return code;
};

// 新增
Blockly.Python['control_if'] = function (block) {
  // If/elseif/else condition.
  var n = 0;
  var code = '', branchCode, conditionCode;
  if (Blockly.Python.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += Blockly.Python.injectId(Blockly.Python.STATEMENT_PREFIX, block);
  }
  do {
    conditionCode = Blockly.Python.valueToCode(block, 'IF' + n,
      Blockly.Python.ORDER_NONE) || 'False';
    branchCode = Blockly.Python.statementToCode(block, 'DO' + n) ||
      Blockly.Python.PASS;
    if (Blockly.Python.STATEMENT_SUFFIX) {
      branchCode = Blockly.Python.prefixLines(
        Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
        Blockly.Python.INDENT) + branchCode;
    }
    code += (n == 0 ? 'if ' : 'elif ') + conditionCode + ':\n' + branchCode;
    ++n;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || Blockly.Python.STATEMENT_SUFFIX) {
    branchCode = Blockly.Python.statementToCode(block, 'ELSE') ||
      Blockly.Python.PASS;
    if (Blockly.Python.STATEMENT_SUFFIX) {
      branchCode = Blockly.Python.prefixLines(
        Blockly.Python.injectId(Blockly.Python.STATEMENT_SUFFIX, block),
        Blockly.Python.INDENT) + branchCode;
    }
    code += 'else:\n' + branchCode;
  }
  return code;
};
