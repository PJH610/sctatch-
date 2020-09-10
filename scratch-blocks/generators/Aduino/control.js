'use strict';

goog.provide('Blockly.Arduino.loops');

goog.require('Blockly.Arduino');

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

Blockly.Arduino.controls_whileUntil = function () {
    // Do while/until loop.
    var argument0 = Blockly.Arduino.valueToCode(this, 'BOOL',
        Blockly.Arduino.ORDER_NONE) || 'false';
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    if (Blockly.Arduino.INFINITE_LOOP_TRAP) {
        branch = Blockly.Arduino.INFINITE_LOOP_TRAP.replace(/%1/g,
            '\'' + this.id + '\'') + branch;
    }
    if (this.getFieldValue('MODE') == 'UNTIL') {
        if (!argument0.match(/^\w+$/)) {
            argument0 = '(' + argument0 + ')';
        }
        argument0 = '!' + argument0;
    }
    return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

Blockly.Arduino.controls_flow_statements = function () {
    // Flow statements: continue, break.
    switch (this.getFieldValue('FLOW')) {
        case 'BREAK':
            return 'break;\n';
        case 'CONTINUE':
            return 'continue;\n';
    }
    throw 'Unknown flow statement.';
};

Blockly.Arduino.base_delay = function () {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC) || '1000';
    var unit = this.getFieldValue('UNIT');
    var code = unit + '(' + delay_time + ');\n';
    return code;
};

Blockly.Arduino.controls_millis = function () {
    var unit = this.getFieldValue('UNIT');
    var code = unit + "()";
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino.controls_mstimer2 = function () {
    Blockly.Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    var time = Blockly.Arduino.valueToCode(this, 'TIME', Blockly.Arduino.ORDER_ATOMIC);
    var funcName = 'msTimer2_func';
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code = 'void' + ' ' + funcName + '() {\n' + branch + '}\n';
    Blockly.Arduino.definitions_[funcName] = code;
    return 'MsTimer2::set(' + time + ', ' + funcName + ');\n';
};

Blockly.Arduino.controls_mstimer2_start = function () {
    Blockly.Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::start();\n';
};

Blockly.Arduino.controls_mstimer2_stop = function () {
    Blockly.Arduino.definitions_['include_MsTimer2'] = '#include <MsTimer2.h>';
    return 'MsTimer2::stop();\n';
};

Blockly.Arduino.controls_end_program = function () {
    return 'while(true);\n';
};
Blockly.Arduino.controls_interrupts = function () {
    return 'interrupts();\n';
};

Blockly.Arduino.controls_nointerrupts = function () {
    return 'noInterrupts();\n';
};
