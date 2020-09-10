'use strict';

goog.provide('Blockly.Blocks.moreToolbox');

goog.require('Blockly.Blocks');

Blockly.Blocks.moreToolbox =
  '<xml id="toolbox-categories" style="display: none">' +
  '<category name="运算" id="more_operator" colour="#40BF4A" secondaryColour="#389438">' +
  '<block type="more_operator_arithmetic" id="more_operator_arithmetic">' +
  '<value name="m01">' +
  '<shadow type="math_number">' +
  '<field name="NUM"></field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m03">' +
  '<shadow type="math_number">' +
  '<field name="NUM"></field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_bit" id="more_operator_bit">' +
  '<value name="m01">' +
  '<shadow type="math_number">' +
  '<field name="NUM"></field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m03">' +
  '<shadow type="math_number">' +
  '<field name="NUM"></field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_round" id="more_operator_round">' +
  '<value name="m02">' +
  '<shadow type="math_number">' +
  '<field name="NUM"></field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_trig" id="more_operator_trig">' +
  '<value name="m02">' +
  '<shadow type="math_number">' +
  '<field name="NUM"></field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<sep gap="36"/>' +
  '<block type="more_operator_compare" id="more_operator_compare">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT"></field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m03">' +
  '<shadow type="text">' +
  '<field name="TEXT"></field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_operation" id="more_operator_operation">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT"></field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m03">' +
  '<shadow type="text">' +
  '<field name="TEXT"></field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_negate" id="more_operator_negate">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT"></field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_bool" id="more_operator_bool"></block>' +
  '<sep gap="36"/>' +
  '<block type="more_operator_max_min" id="more_operator_max_min">' +
  '<value name="m01">' +
  '<shadow type="math_number">' +
  '<field name="NUM">1</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m02">' +
  '<shadow type="math_number">' +
  '<field name="NUM">10</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_random" id="more_operator_random">' +
  '<value name="m01">' +
  '<shadow type="math_number">' +
  '<field name="NUM">1</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m02">' +
  '<shadow type="math_number">' +
  '<field name="NUM">10</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_map" id="more_operator_map">' +
  '<value name="m01">' +
  '<shadow type="math_number">' +
  '<field name="NUM">10</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m02">' +
  '<shadow type="math_number">' +
  '<field name="NUM">1</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m03">' +
  '<shadow type="math_number">' +
  '<field name="NUM">100</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m04">' +
  '<shadow type="math_number">' +
  '<field name="NUM">1</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m05">' +
  '<shadow type="math_number">' +
  '<field name="NUM">1000</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<sep gap="36"/>' +
  '<block type="more_operator_to_number" id="more_operator_to_number">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT">123</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_length" id="more_operator_length">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT">hello</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_letter_of" id="more_operator_letter_of">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT">hello</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m02">' +
  '<shadow type="math_number">' +
  '<field name="NUM">1</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_join" id="more_operator_join">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT">hello</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m02">' +
  '<shadow type="text">' +
  '<field name="TEXT">world</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_contains" id="more_operator_contains">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT">hello</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m02">' +
  '<shadow type="text">' +
  '<field name="TEXT">he</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '<block type="more_operator_starts_ends" id="more_operator_starts_ends">' +
  '<value name="m01">' +
  '<shadow type="text">' +
  '<field name="TEXT">hello</field>' +
  '</shadow>' +
  '</value>' +
  '<value name="m02">' +
  '<shadow type="text">' +
  '<field name="TEXT">he</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '</category>' +
  '<category name="控制" id="more_control" colour="#FFAB19" secondaryColour="#CF8B17">' +
  '<block type="more_control_wait" id="more_control_wait">' +
  '<value name="m01">' +
  '<shadow type="math_number">' +
  '<field name="NUM">1</field>' +
  '</shadow>' +
  '</value>' +
  '</block>' +
  '</category>' +
  '</xml>';
