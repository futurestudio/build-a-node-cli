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
