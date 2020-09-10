'use strict';

goog.provide('Blockly.Arduino.letopo_uno_v2.0');

goog.require('Blockly.Arduino');


//输入模块
//1_01按键模块-le_uno_v2_key
Blockly.Arduino.le_uno_v2_key = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_key_' + dropdown_port] = 'le_io key_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['key_io_init_' + dropdown_port] = 'key_' + dropdown_port + '.le_io_init(1);';
    var code = 'key_' + dropdown_port + '.io_read()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_02触摸模块-le_uno_v2_touch
Blockly.Arduino.le_uno_v2_touch = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_touch_' + dropdown_port] = 'le_io touch_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['touch_io_init_' + dropdown_port] = 'touch_' + dropdown_port + '.le_io_init(1);';
    var code = 'touch_' + dropdown_port + '.io_read()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_03拨位模块-le_uno_v2_switch
Blockly.Arduino.le_uno_v2_switch = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_switch_' + dropdown_port] = 'le_io switch_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['switch_io_init_' + dropdown_port] = 'switch_' + dropdown_port + '.le_io_init(1);';
    var code = 'switch_' + dropdown_port + '.io_read()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_04电位器模块-le_uno_v2_potential
Blockly.Arduino.le_uno_v2_potential = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_potential_' + dropdown_port] = 'le_io potential_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['potential_io_init_' + dropdown_port] = 'potential_' + dropdown_port + '.le_io_init(1);';
    var code = 'potential_' + dropdown_port + '.io_read_analog()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_05光感模块-le_uno_v2_sensitization
Blockly.Arduino.le_uno_v2_sensitization = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_sensitization_' + dropdown_port] = 'le_io sensitization_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['sensitization_io_init_' + dropdown_port] = 'sensitization_' + dropdown_port + '.le_io_init(1);';
    var code = 'sensitization_' + dropdown_port + '.io_read_analog()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_06雨滴模块-le_uno_v2_raindrop
Blockly.Arduino.le_uno_v2_raindrop = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_raindrop_' + dropdown_port] = 'le_io raindrop_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['raindrop_io_init_' + dropdown_port] = 'raindrop_' + dropdown_port + '.le_io_init(1);';
    var code = 'raindrop_' + dropdown_port + '.io_read_analog()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_07灰度模块-le_uno_v2_gray
Blockly.Arduino.le_uno_v2_gray = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_choice = this.getFieldValue('choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_gray_' + dropdown_port] = 'le_io gray_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['gray_io_init_' + dropdown_port] = 'gray_' + dropdown_port + '.le_io_init(1);';
    var code = 'gray_' + dropdown_port + '.io_read_analog(' + dropdown_choice + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_07_1灰度模块带识别-le_uno_v2_gray_discern
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

//1_08人体红外模块-le_uno_v2_bodyinfrare
Blockly.Arduino.le_uno_v2_bodyinfrare = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_bodyinfrare_' + dropdown_port] = 'le_io bodyinfrare_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['bodyinfrare_io_init_' + dropdown_port] = 'bodyinfrare_' + dropdown_port + '.le_io_init(1);';
    var code = 'bodyinfrare_' + dropdown_port + '.io_read()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_09超声测距模块-le_uno_v2_ultrasound
Blockly.Arduino.le_uno_v2_ultrasound = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_ultrasound_' + dropdown_port] = 'le_ultrasound ultrasound_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['ultrasound_init_' + dropdown_port] = 'ultrasound_' + dropdown_port + '.ultrasound_init();';
    var code = 'ultrasound_' + dropdown_port + '.get_ultrasound()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_10温湿度模块-le_uno_v2_dht11
Blockly.Arduino.le_uno_v2_dht11 = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_choice = this.getFieldValue('choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_dht11_' + dropdown_port] = 'le_dht11 dht11_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['dht11_init_' + dropdown_port] = 'dht11_' + dropdown_port + '.le_dht11_init();';
    var code = 'dht11_' + dropdown_port + '.get_humiture(' + dropdown_choice + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_11颜色模块-le_uno_v2_color
Blockly.Arduino.le_uno_v2_color = function () {
    var dropdown_port = this.getFieldValue('port');
    //var dropdown_speed = this.getFieldValue('speed');
    var dropdown_choice = this.getFieldValue('choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_color_' + dropdown_port] = 'le_color color_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['color_init_' + dropdown_port] = 'color_' + dropdown_port + '.color_init();';
    var code = 'color_' + dropdown_port + '.color(' + dropdown_choice + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_11_1颜色模块-le_uno_v2_color_recognition
Blockly.Arduino.le_uno_v2_color_recognition = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_choice = this.getFieldValue('color_choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_color_' + dropdown_port] = 'le_color color_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['color_init_' + dropdown_port] = 'color_' + dropdown_port + '.color_init();';
    var code = 'color_' + dropdown_port + '.color_recognition(' + dropdown_choice + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_12单灰度模块-le_uno_v2_singlegray
Blockly.Arduino.le_uno_v2_singlegray = function () {
    var dropdown_port = this.getFieldValue('port');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_singlegray_' + dropdown_port] = 'le_io singlegray_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['singlegray_io_init_' + dropdown_port] = 'singlegray_' + dropdown_port + '.le_io_init(1);';
    var code = 'singlegray_' + dropdown_port + '.io_read_analog()';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//1_13六轴陀螺仪模块-le_uno_v2_gyro
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

//1_14四按键模块-le_uno_v2_fourkeys
Blockly.Arduino.le_uno_v2_fourkeys = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_choice = this.getFieldValue('choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_fourkeys' + dropdown_port] = 'le_fourkeys fourkeys_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['fourkeys' + dropdown_port] = 'fourkeys_' + dropdown_port + '.fourkeys_init();';
    var code = 'fourkeys_' + dropdown_port + '.fourkeys(' + dropdown_choice + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//输出模块
//2_01led模块-le_uno_v2_led
Blockly.Arduino.le_uno_v2_led = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_led_' + dropdown_port] = 'le_io led_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['led_io_init_' + dropdown_port] = 'led_' + dropdown_port + '.le_io_init(0);';
    Blockly.Arduino.setups_['led_pwm_init_' + dropdown_port] = 'led_' + dropdown_port + '.io_pwm_init();';
    var code = 'led_' + dropdown_port + '.io_write_analog(' + dropdown_logic + ',1);';
    return code + '\n';
};

//2_011led模块-le_uno_v2_led_simple
Blockly.Arduino.le_uno_v2_led_simple = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_choice = this.getFieldValue('choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_led_' + dropdown_port] = 'le_io led_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['led_io_init_' + dropdown_port] = 'led_' + dropdown_port + '.le_io_init(0);';
    var code = 'led_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
    return code + '\n';
};

//2_02蜂鸣模块-le_uno_v2_buzzer
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

//2_021蜂鸣模块-le_uno_v2_buzzer_simple
Blockly.Arduino.le_uno_v2_buzzer_simple = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_choice = this.getFieldValue('choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_buzzer_' + dropdown_port] = 'le_io buzzer_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['buzzer_io_init_' + dropdown_port] = 'buzzer_' + dropdown_port + '.le_io_init(0);';
    var code = 'buzzer_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
    return code + '\n';
};

//2_03震动模块-le_uno_v2_shake
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

//2_031震动模块-le_uno_v2_shake_simple
Blockly.Arduino.le_uno_v2_shake_simple = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_choice = this.getFieldValue('choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_shake_' + dropdown_port] = 'le_io shake_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['shake_io_init_' + dropdown_port] = 'shake_' + dropdown_port + '.le_io_init(0);';
    var code = 'shake_' + dropdown_port + '.io_write(' + dropdown_choice + ');';
    return code + '\n';
};

//2_04RGB模块-le_uno_v2_rgb
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
    var code = 'rgb_' + dropdown_port + '.setPixelColor(' + number + ',rgb_' + dropdown_port + '.Color(' + rvalue + ',' + gvalue + ',' + bvalue + '));'// +  '\n' + 'rgb_' + dropdown_port + '.show();';
    return code + '\n';
};

//2_041RGB模块-le_uno_v2_rgb_all
Blockly.Arduino.le_uno_v2_rgb_all = function () {
    var dropdown_port = this.getFieldValue('port');
    var rvalue = Blockly.Arduino.valueToCode(this, 'rvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var gvalue = Blockly.Arduino.valueToCode(this, 'gvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
    var bvalue = Blockly.Arduino.valueToCode(this, 'bvalue', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_rgb_' + dropdown_port] = 'le_rgb rgb_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['rgb_init_' + dropdown_port] = 'rgb_' + dropdown_port + '.begin();';
    var code = 'rgb_' + dropdown_port + '.fill(rgb_' + dropdown_port + '.Color(' + rvalue + ',' + gvalue + ',' + bvalue + '));' //+  '\n' + 'rgb_' + dropdown_port + '.show();';
    return code + '\n';
};

//2_05电机模块-le_uno_v2_motor
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

//2_06舵机模块-le_uno_v2_servomotor
Blockly.Arduino.le_uno_v2_servomotor = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_choice = this.getFieldValue('choice');
    var dropdown_angle = Blockly.Arduino.valueToCode(this, 'angle', Blockly.Arduino.ORDER_ATOMIC) || '90';
    var dropdown_delayms = Blockly.Arduino.valueToCode(this, 'delayms', Blockly.Arduino.ORDER_ATOMIC) || '100';
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_servomotor_' + dropdown_port + dropdown_choice] = 'Servo servo_' + dropdown_port + '_' + dropdown_choice + ';' + '\n' + 'le_servo crtlservo_' + dropdown_port + '_' + dropdown_choice + '(' + dropdown_port + ',' + dropdown_choice + ');';
    var code = 'servo_' + dropdown_port + '_' + dropdown_choice + '.attach(crtlservo_' + dropdown_port + '_' + dropdown_choice + '.servo_pin());' + '\n' + 'servo_' + dropdown_port + '_' + dropdown_choice + '.write(' + dropdown_angle + ');' + '\n' + 'delay(' + dropdown_delayms + ');' + '\n' + 'servo_' + dropdown_port + '_' + dropdown_choice + '.detach();';
    return code + '\n';
};

////2_07四按键模块led-le_uno_v2_fourkeysled
Blockly.Arduino.le_uno_v2_fourkeysled = function () {
    var dropdown_port = this.getFieldValue('port');
    var dropdown_logic = Blockly.Arduino.valueToCode(this, 'logic', Blockly.Arduino.ORDER_ATOMIC) || '0';
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.definitions_['le_uno_v2_fourkeys' + dropdown_port] = 'le_fourkeys fourkeys_' + dropdown_port + '(' + dropdown_port + ');';
    Blockly.Arduino.setups_['fourkeys' + dropdown_port] = 'fourkeys_' + dropdown_port + '.fourkeys_init();';
    var code = 'fourkeys_' + dropdown_port + '.fourkeysled(' + dropdown_logic + ');';
    return code + '\n';
};

//通讯模块
//3_01获取2.4G模块数据-le_uno_v2_24G_serial
Blockly.Arduino.le_uno_v2_24G_get_serial = function () {
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    var code = 'nrf_get();';
    return code + '\n';
};

//3_022.4G模块-le_uno_v2_24G_serial
Blockly.Arduino.le_uno_v2_24G_serial = function () {
    var dropdown_choice = this.getFieldValue('choice');
    Blockly.Arduino.definitions_['define_letopo'] = '#include <letopo_uno_v2.0.h>';
    Blockly.Arduino.setups_['nrf_init'] = 'NRF24L01_Config_Master();';
    var code = 'nrf_val(' + dropdown_choice + ')';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
};

//语句模块
//4_01重复执行X次-le_uno_v2_repetitions
Blockly.Arduino.le_uno_v2_repetitions = function () {
    // For loop.
    var variable0 = /*Blockly.Arduino.variableDB_.getName(
        this.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE)*/ 'WLGQ';
    var argument0 = /*Blockly.Arduino.valueToCode(this, 'FROM',
        Blockly.Arduino.ORDER_ASSIGNMENT) ||*/ '1';
    var argument1 = Blockly.Arduino.valueToCode(this, 'TO',
        Blockly.Arduino.ORDER_ASSIGNMENT) || '10';
    var step = /*Blockly.Arduino.valueToCode(this, 'STEP',
        Blockly.Arduino.ORDER_ASSIGNMENT) ||*/ '1';;
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

//4_02重复执行直到-le_uno_v2_whileUntil
Blockly.Arduino.le_uno_v2_whileUntil = function () {
    // Do while/until loop.
    var logic = Blockly.Arduino.valueToCode(this, 'logic',
        Blockly.Arduino.ORDER_NONE) || 'false';
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    var code = '';
    code += 'while(!(' + logic + ')) {\n';
    code += branch + '\n';
    code += '}\n';
    return code;
};

//4_03初始化-le_uno_v2_base_setup
Blockly.Arduino.le_uno_v2_base_setup = function () {
    var branch = Blockly.Arduino.statementToCode(this, 'DO');
    branch = branch.replace(/(^\s*)|(\s*$)/g, "");//去除两端空格
    if (branch) {
        Blockly.Arduino.setups_['setup_setup'] = branch;
    }
    return '';
};

//4_04停止程序-le_uno_v2_end_program
Blockly.Arduino.le_uno_v2_end_program = function () {
    return 'while(true);\n';
};

//4_05延时-le_uno_v2_millis
Blockly.Arduino.le_uno_v2_base_delay = function () {
    var delay_time = Blockly.Arduino.valueToCode(this, 'DELAY_TIME', Blockly.Arduino.ORDER_ATOMIC);
    var unit = this.getFieldValue('UNIT');
    if (unit == 'delayseconds') {
        var code = 'delay(' + delay_time + ' * 1000);\n';
    }
    else {
        var code = unit + '(' + delay_time + ');\n';
    }
    return code;
};

//4_06如果-le_uno_v2_if
Blockly.Arduino.le_uno_v2_if = function () {
    // If/elseif/else condition.
    var n = 0;
    var argument = Blockly.Arduino.valueToCode(this, 'IF' + n,
        Blockly.Arduino.ORDER_NONE) || 'false';
    var branch = Blockly.Arduino.statementToCode(this, 'DO' + n);
    var code = 'if (' + argument + ') {\n' + branch + '\n}';
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

//4_07重复执行直到-le_uno_v2_waitUntil
Blockly.Arduino.le_uno_v2_waitUntil = function () {
    var logic = Blockly.Arduino.valueToCode(this, 'logic',
        Blockly.Arduino.ORDER_NONE) || 'false';
    var code = 'while(' + logic + ') {}\n';
    return code;
};
