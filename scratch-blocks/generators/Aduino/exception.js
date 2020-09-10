'use strict';

goog.provide('Blockly.Arduino.exception');

goog.require('Blockly.Arduino');

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

// for (var i = 0; i < motionArr.length; i++) {

//   Blockly.Arduino[motionArr[i]] = function () {
//     console.log("异常处理!!");
//     return '';
//   };
// }


// Blockly.Arduino.motion_movesteps = function () {
//   console.log("异常处理!!");
//   return '';
// };



