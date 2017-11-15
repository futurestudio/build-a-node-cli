'use strict'

const { Command } = require('@adonisjs/ace')
const Ora = require('ora')

class Load extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature () {
    return `load`
  }

  /**
   * Use this description to provide additional details
   * about the command.
   */
  static get description () {
    return 'Load movie and TV show sample data'
  }

  /**
   * Handle the "deploy" command
   *
   * @param {*} args   arguments object for the "deploy" command
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle ({ version }, flags) {
    const spinner = Ora('Loading movie sample data').start()

    setTimeout(() => {
      spinner.color = 'magenta'
      spinner.text = 'Loading movie poster and backgrounds'
    }, 2000)

    setTimeout(() => {
      spinner.succeed('Got everything in the pocket')
    }, 5000)
  }
}

module.exports = Load
