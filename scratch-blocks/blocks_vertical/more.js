'use strict';

goog.provide('Blockly.Blocks.more');
goog.provide('Blockly.Constants.More');

goog.require('Blockly.Blocks');
goog.require('Blockly.Colours');
goog.require('Blockly.ScratchBlocks.VerticalExtensions');

/**
 * more_operator
 */
Blockly.Blocks['more_operator_arithmetic'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_arithmetic',
      message0: '%1 %2 %3',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'field_dropdown',
          name: 'm02',
          options: [['+', '+'], ['-', '-'], ['×', '*'], ['÷', '/'], ['%', '%']]
        },
        {
          type: 'input_value',
          name: 'm03'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_bit'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_bit',
      message0: '%1 %2 %3',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'field_dropdown',
          name: 'm02',
          options: [['按位与', '&'], ['按位或', '|'], ['按位异或', '^'], ['左移', '<<'], ['右移', '>>']]
        },
        {
          type: 'input_value',
          name: 'm03'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_round'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_round',
      message0: '%1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'm01',
          options: [
            ['四舍五入', 'round'],
            ['向上取整', 'ceil'],
            ['向下取整', 'floor'],
            ['取绝对值', 'abs'],
            ['按位取反', '~']
          ]
        },
        {
          type: 'input_value',
          name: 'm02'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_trig'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_trig',
      message0: '%1 %2',
      args0: [
        {
          type: 'field_dropdown',
          name: 'm01',
          options: [
            ['sin', 'sin'],
            ['cos', 'cos'],
            ['tan', 'tan'],
            ['asin', 'asin'],
            ['acos', 'acos'],
            ['atan', 'atan']
          ]
        },
        {
          type: 'input_value',
          name: 'm02'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_compare'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_compare',
      message0: '%1 %2 %3',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'field_dropdown',
          name: 'm02',
          options: [['=', '=='], ['≠', '!='], ['<', '<'], ['≤', '<='], ['>', '>'], ['≥', '>=']]
        },
        {
          type: 'input_value',
          name: 'm03'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_boolean']
    });
  }
};

Blockly.Blocks['more_operator_operation'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_operation',
      message0: '%1 %2 %3',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'field_dropdown',
          name: 'm02',
          options: [['与', 'and'], ['或', 'or']]
        },
        {
          type: 'input_value',
          name: 'm03'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_boolean']
    });
  }
};

Blockly.Blocks['more_operator_negate'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_negate',
      message0: '非 %1',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_boolean']
    });
  }
};

Blockly.Blocks['more_operator_bool'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_bool',
      message0: '%1',
      args0: [
        {
          type: 'field_dropdown',
          name: 'm01',
          options: [['真', 'True'], ['假', 'False'], ['空', 'None']]
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_boolean']
    });
  }
};

Blockly.Blocks['more_operator_max_min'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_max_min',
      message0: '%1 和 %2 中的 %3',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'input_value',
          name: 'm02'
        },
        {
          type: 'field_dropdown',
          name: 'm03',
          options: [['最大值', 'max'], ['最小值', 'min']]
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_random'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_random',
      message0: '%1 到 %2 的随机 %3',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'input_value',
          name: 'm02'
        },
        {
          type: 'field_dropdown',
          name: 'm03',
          options: [['整数', 'int'], ['小数', 'float']]
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_map'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_map',
      message0: '映射 %1 从 [ %2 , %3 ] 到 [ %4 , %5 ]',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'input_value',
          name: 'm02'
        },
        {
          type: 'input_value',
          name: 'm03'
        },
        {
          type: 'input_value',
          name: 'm04'
        },
        {
          type: 'input_value',
          name: 'm05'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_to_string'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_to_string',
      message0: '%1 转成 %2',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'field_dropdown',
          name: 'm02',
          options: [['字符串', 'str'], ['ASCII字符', 'chr']]
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_to_number'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_to_number',
      message0: '" %1 " 转成 %2',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'field_dropdown',
          name: 'm02',
          options: [['整数', 'int'], ['小数', 'float'], ['ASCII数值', 'ord']]
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_length'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_length',
      message0: '" %1 " 的字符数',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_number']
    });
  }
};

Blockly.Blocks['more_operator_letter_of'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_letter_of',
      message0: '" %1 " 的第 %2 个字符到第 %3 个字符',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'input_value',
          name: 'm02'
        },
        {
          type: 'input_value',
          name: 'm03'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_string']
    });
  }
};

Blockly.Blocks['more_operator_join'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_join',
      message0: '连接 " %1 " 和 " %2 "',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'input_value',
          name: 'm02'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_string']
    });
  }
};

Blockly.Blocks['more_operator_contains'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_contains',
      message0: '" %1 " 包含 " %2 " ?',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'input_value',
          name: 'm02'
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_boolean']
    });
  }
};

Blockly.Blocks['more_operator_starts_ends'] = {
  init: function() {
    this.jsonInit({
      id: 'more_operator_starts_ends',
      message0: '" %1 " 以 " %2 " %3 ?',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'input_value',
          name: 'm02'
        },
        {
          type: 'field_dropdown',
          name: 'm03',
          options: [['开始', 'start'], ['结束', 'end']]
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_operators', 'output_boolean']
    });
  }
};

/**
 * more_control
 */
Blockly.Blocks['more_control_wait'] = {
  init: function() {
    this.jsonInit({
      id: 'more_control_wait',
      message0: '等待 %1 %2',
      args0: [
        {
          type: 'input_value',
          name: 'm01'
        },
        {
          type: 'field_dropdown',
          name: 'm02',
          options: [['秒', 's'], ['毫秒', 'ms'], ['微秒', 'us']]
        }
      ],
      category: Blockly.Categories.more,
      extensions: ['colours_control', 'shape_statement']
    });
  }
};

// Blockly.Blocks["more_control_if"] = {
//   init: function() {
//     this.jsonInit({
//       id: "more_control_if",
//       message0: "如果 %1 那么",
//       message1: "%1",
//       args0: [
//         {
//           type: "input_value",
//           name: "IF0",
//           check: "Boolean"
//         }
//       ],
//       args1: [
//         {
//           type: "input_statement",
//           name: "DO0"
//         }
//       ],
//       category: Blockly.Categories.more,
//       mutator: "more_control_if_mutator",
//       extensions: ["colours_control", "shape_statement"]
//     });
//   }
// };
// Blockly.Blocks["more_control_if_if"] = {
//   init: function() {
//     this.jsonInit({
//       id: "more_control_if_if",
//       message0: "如果",
//       category: Blockly.Categories.more,
//       extensions: ["colours_control", "shape_hat"]
//     });
//   }
// };
// Blockly.Blocks["more_control_if_elseif"] = {
//   init: function() {
//     this.jsonInit({
//       id: "more_control_if_elseif",
//       message0: "否则如果",
//       category: Blockly.Categories.more,
//       extensions: ["colours_control", "shape_statement"]
//     });
//   }
// };
// Blockly.Blocks["more_control_if_else"] = {
//   init: function() {
//     this.jsonInit({
//       id: "more_control_if_else",
//       message0: "否则",
//       category: Blockly.Categories.more,
//       extensions: ["colours_control", "shape_end"]
//     });
//   }
// };

// Blockly.Constants.More.MORE_CONTROL_IF_MUTATOR_MIXIN = {
//   elseifCount_: 0,
//   elseCount_: 0,

//   /**
//    * Create XML to represent the number of else-if and else inputs.
//    * @return {Element} XML storage element.
//    * @this Blockly.Block
//    */
//   mutationToDom: function() {
//     if (!this.elseifCount_ && !this.elseCount_) {
//       return null;
//     }
//     var container = document.createElement("mutation");
//     if (this.elseifCount_) {
//       container.setAttribute("elseif", this.elseifCount_);
//     }
//     if (this.elseCount_) {
//       container.setAttribute("else", 1);
//     }
//     return container;
//   },
//   /**
//    * Parse XML to restore the else-if and else inputs.
//    * @param {!Element} xmlElement XML storage element.
//    * @this Blockly.Block
//    */
//   domToMutation: function(xmlElement) {
//     this.elseifCount_ = parseInt(xmlElement.getAttribute("elseif"), 10) || 0;
//     this.elseCount_ = parseInt(xmlElement.getAttribute("else"), 10) || 0;
//     this.rebuildShape_();
//   },
//   /**
//    * Populate the mutator's dialog with this block's components.
//    * @param {!Blockly.Workspace} workspace Mutator's workspace.
//    * @return {!Blockly.Block} Root block in mutator.
//    * @this Blockly.Block
//    */
//   decompose: function(workspace) {
//     var containerBlock = workspace.newBlock("more_control_if_if");
//     containerBlock.initSvg();
//     var connection = containerBlock.nextConnection;
//     for (var i = 1; i <= this.elseifCount_; i++) {
//       var elseifBlock = workspace.newBlock("more_control_if_elseif");
//       elseifBlock.initSvg();
//       connection.connect(elseifBlock.previousConnection);
//       connection = elseifBlock.nextConnection;
//     }
//     if (this.elseCount_) {
//       var elseBlock = workspace.newBlock("more_control_if_else");
//       elseBlock.initSvg();
//       connection.connect(elseBlock.previousConnection);
//     }
//     return containerBlock;
//   },
//   /**
//    * Reconfigure this block based on the mutator dialog's components.
//    * @param {!Blockly.Block} containerBlock Root block in mutator.
//    * @this Blockly.Block
//    */
//   compose: function(containerBlock) {
//     var clauseBlock = containerBlock.nextConnection.targetBlock();
//     // Count number of inputs.
//     this.elseifCount_ = 0;
//     this.elseCount_ = 0;
//     var valueConnections = [null];
//     var statementConnections = [null];
//     var elseStatementConnection = null;
//     while (clauseBlock) {
//       switch (clauseBlock.type) {
//         case "more_control_if_elseif":
//           this.elseifCount_++;
//           valueConnections.push(clauseBlock.valueConnection_);
//           statementConnections.push(clauseBlock.statementConnection_);
//           break;
//         case "more_control_if_else":
//           this.elseCount_++;
//           elseStatementConnection = clauseBlock.statementConnection_;
//           break;
//         default:
//           throw TypeError("Unknown block type: " + clauseBlock.type);
//       }
//       clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
//     }
//     this.updateShape_();
//     // Reconnect any child blocks.
//     this.reconnectChildBlocks_(valueConnections, statementConnections, elseStatementConnection);
//   },
//   /**
//    * Store pointers to any connected child blocks.
//    * @param {!Blockly.Block} containerBlock Root block in mutator.
//    * @this Blockly.Block
//    */
//   saveConnections: function(containerBlock) {
//     var clauseBlock = containerBlock.nextConnection.targetBlock();
//     var i = 1;
//     while (clauseBlock) {
//       switch (clauseBlock.type) {
//         case "more_control_if_elseif":
//           var inputIf = this.getInput("IF" + i);
//           var inputDo = this.getInput("DO" + i);
//           clauseBlock.valueConnection_ = inputIf && inputIf.connection.targetConnection;
//           clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
//           i++;
//           break;
//         case "more_control_if_else":
//           var inputDo = this.getInput("ELSE");
//           clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
//           break;
//         default:
//           throw TypeError("Unknown block type: " + clauseBlock.type);
//       }
//       clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
//     }
//   },
//   /**
//    * Reconstructs the block with all child blocks attached.
//    */
//   rebuildShape_: function() {
//     var valueConnections = [null];
//     var statementConnections = [null];
//     var elseStatementConnection = null;

//     if (this.getInput("ELSE")) {
//       elseStatementConnection = this.getInput("ELSE").connection.targetConnection;
//     }
//     var i = 1;
//     while (this.getInput("IF" + i)) {
//       var inputIf = this.getInput("IF" + i);
//       var inputDo = this.getInput("DO" + i);
//       valueConnections.push(inputIf.connection.targetConnection);
//       statementConnections.push(inputDo.connection.targetConnection);
//       i++;
//     }
//     this.updateShape_();
//     this.reconnectChildBlocks_(valueConnections, statementConnections, elseStatementConnection);
//   },
//   /**
//    * Modify this block to have the correct number of inputs.
//    * @this Blockly.Block
//    * @private
//    */
//   updateShape_: function() {
//     // Delete everything.
//     if (this.getInput("ELSE")) {
//       this.removeInput("ELSE_");
//       this.removeInput("ELSE");
//     }
//     var i = 1;
//     while (this.getInput("IF" + i)) {
//       this.removeInput("IF" + i);
//       this.removeInput("IF_" + i);
//       this.removeInput("DO" + i);
//       i++;
//     }
//     // Rebuild block.
//     for (var i = 1; i <= this.elseifCount_; i++) {
//       this.appendValueInput("IF" + i)
//           .setCheck("Boolean")
//           .appendField("否则如果");
//       this.appendDummyInput("IF_" + i).appendField("那么");
//       this.appendStatementInput("DO" + i);
//     }
//     if (this.elseCount_) {
//       this.appendDummyInput("ELSE_").appendField("否则");
//       this.appendStatementInput("ELSE");
//     }
//   },
//   /**
//    * Reconnects child blocks.
//    * @param {!Array<?Blockly.RenderedConnection>} valueConnections List of value
//    * connectsions for if input.
//    * @param {!Array<?Blockly.RenderedConnection>} statementConnections List of
//    * statement connections for do input.
//    * @param {?Blockly.RenderedConnection} elseStatementConnection Statement
//    * connection for else input.
//    */
//   reconnectChildBlocks_: function(valueConnections, statementConnections, elseStatementConnection) {
//     for (var i = 1; i <= this.elseifCount_; i++) {
//       Blockly.Mutator.reconnect(valueConnections[i], this, "IF" + i);
//       Blockly.Mutator.reconnect(statementConnections[i], this, "DO" + i);
//     }
//     Blockly.Mutator.reconnect(elseStatementConnection, this, "ELSE");
//   }
// };

// Blockly.Extensions.registerMutator(
//     "more_control_if_mutator",
//     Blockly.Constants.More.MORE_CONTROL_IF_MUTATOR_MIXIN,
//     null,
//     ["more_control_if_elseif", "more_control_if_else"]
// );
