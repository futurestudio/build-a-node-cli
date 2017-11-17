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
    return 'Load sample data'
  }

  /**
   * Handle the "deploy" command
   *
   * @param {*} args   arguments object for the "deploy" command
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle ({ version }, flags) {
    const spinner = Ora('Loading movie sample data')
    spinner.start()

    setTimeout(() => {
      spinner.color = 'magenta'
      spinner.text = 'Loading movie poster and backgrounds'
    }, 1000)

    setTimeout(() => {
      spinner.color = 'yellow'
      spinner.text = 'Starting the rocket'
    }, 2000)

    setTimeout(() => {
      spinner.color = 'green'
      spinner.text = 'Boarding passengers'
    }, 3000)

    setTimeout(() => {
      spinner.color = 'cyan'
      spinner.text = 'Launch the rocket!!!!'
    }, 4000)

    setTimeout(() => {
      spinner.succeed('Houston? We landed!')
    }, 5000)
  }
}

module.exports = Load
