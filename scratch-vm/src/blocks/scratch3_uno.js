class Scratch3UnoBlocks {
  constructor(runtime) {
    /**
     * The runtime instantiating this block package.
     * @type {Runtime}
     */
    this.runtime = runtime;


  }

  /**
* Retrieve the block primitives implemented by this package.
* @return {object.<string, Function>} Mapping of opcode to Function.
*/
  getPrimitives() {
    return {
      le_uno_v2_key: () => { }

    };
  }


}

module.exports = Scratch3UnoBlocks;
