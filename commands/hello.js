'use strict'

const { Command } = require('@adonisjs/ace')

class Hello extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature () {
    return `hello { name?: Say hello to the named user }`
  }

  /**
   * Use this description to provide additional details
   * about the command
   */
  static get description () {
    return 'Say hello'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object
   */
  async handle ({ name }) {
    console.log(`Hello ${name || 'Stranger'}`)
  }
}

module.exports = Hello
