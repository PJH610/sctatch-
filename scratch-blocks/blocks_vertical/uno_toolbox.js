'use strict';

goog.provide('Blockly.Blocks.unoToolbox');

goog.require('Blockly.Blocks');

Blockly.Blocks.unoToolbox =
  '<xml id="toolbox-categories" style="display: none">' +
  '<category name="Uno" id="uno" colour="#58A0F2" secondaryColour="#AACBF2" showStatusButton="true">' +
  '<block type="uno_main" id="uno_main"></block>' +
  '<block type="le_uno_v2_led" id="le_uno_v2_led">' +
  '<value name="NUM">' +
  '<shadow type="math_number">' +
  '<field name="NUM">1</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="uno_digitalRead" id="uno_digitalRead"></block>' +
  '</category>' +

  '</xml>';
