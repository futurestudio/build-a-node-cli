'use strict'

const { Command } = require('@adonisjs/ace')
const Ora = require('ora')

class Load extends Command {
  static get signature() {
    return `ora`
  }

  static get description() {
    return 'Ora spinners for long running tasks'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object, contains only data if you’ve added arguments in the signature
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle(args, flags) {
    const spinner = Ora('Fueling the rocket')
    spinner.start()

    await this.waitASecond()
    spinner.color = 'magenta'
    spinner.text = 'Boarding passengers'

    await this.waitASecond()
    spinner.color = 'yellow'
    spinner.text = 'Starting the engines'

    await this.waitASecond()
    spinner.color = 'green'
    spinner.text = 'Launching the rocket!!!!'

    await this.waitASecond()
    spinner.color = 'cyan'
    spinner.text = 'Shooting for the stars'

    await this.waitASecond()
    spinner.succeed('Houston? We landed!')
  }

  waitASecond() {
    return new Promise(resolve => setTimeout(resolve, 1000))
  }
}

module.exports = Load
