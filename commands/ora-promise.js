'use strict'

const { Command } = require('@adonisjs/ace')
const Ora = require('ora')

class Load extends Command {
  static get signature () {
    return `ora:promise`
  }

  static get description () {
    return 'Ora spinner shortcut for a promise'
  }

  async handle (args, flags) {
    Ora.promise(this.wait(), 'Waiting for the task to finish')
  }

  wait () {
    return new Promise(resolve => setTimeout(resolve, 4000))
  }
}

module.exports = Load
