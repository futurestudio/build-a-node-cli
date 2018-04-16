'use strict'

const { Command } = require('@adonisjs/ace')
const Ora = require('ora')

class Load extends Command {
  static get signature () {
    return `ora:customized`
  }

  static get description () {
    return 'Ora spinner shortcut for a promise'
  }

  async handle (args, flags) {
    // Customize your Ora spinner
    // this works with a spinner assignment "const spinner = Ora({ options })" as well
    Ora.promise(this.wait(), {
      text: 'Custom spinners are freeeeekin awesome!',
      spinner: 'dots12',
      color: 'magenta'
    })
  }

  wait () {
    return new Promise(resolve => setTimeout(resolve, 3000))
  }
}

module.exports = Load
