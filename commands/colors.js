'use strict'

const { Command } = require('@adonisjs/ace')

class Colors extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature () {
    return `colorful`
  }

  /**
   * Use this description to provide additional details
   * about the command
   */
  static get description () {
    return 'Colorful outputs :)'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object, contains only data if you’ve added arguments in the signature
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle (args, flags) {
    this.success('Went smooth like chocolate!')
    this.info('Well, this is an info text ;-)')
    this.warn('Warning warning: get ur freak on!!!')
    this.error('This seems bad. Really bad. I mean, like so bad to stay in bed.')

    console.log('') // empty line

    this.completed('action', 'message.js')
    this.failed('action', 'fail.js')
  }
}

module.exports = Colors
