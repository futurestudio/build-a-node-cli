'use strict'

const { Command } = require('@adonisjs/ace')
const Ora = require('ora')

class Load extends Command {
  static get signature() {
    return `ora:promise`
  }

  static get description() {
    return 'Ora spinner shortcut for a promise'
  }

  async handle(args, flags) {
    // Ora promise shortcut: spinner succeeds if the promise resolves, fails if rejects
    Ora.promise(this.wait(), 'Waiting for the task to finish')

    console.log('\nRemember: Ora.promise is a function, not an awaitable Promise.')
    console.log('\rYou’ll see this text right after starting the command.')
  }

  async wait() {
    await new Promise(resolve => setTimeout(resolve, 4000))

    console.log('\nIn contrast, this text shows up after the awaited Promise (4s)')
  }
}

module.exports = Load
