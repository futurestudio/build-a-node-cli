'use strict'

const { Command } = require('@adonisjs/ace')

class Chalk extends Command {
  static get signature () {
    return `chalk`
  }

  static get description () {
    return 'Access the chalk instance of Ace'
  }

  async handle () {
    console.log(this.chalk.bold.bgBlue('I am the bonfire'))
  }
}

module.exports = Chalk
