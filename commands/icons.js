'use strict'

const { Command } = require('@adonisjs/ace')

class Icons extends Command {
  static get signature() {
    return `icons`
  }

  static get description() {
    return 'Print icons'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object, contains only data if you’ve added arguments in the signature
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle(args, flags) {
    console.log(`${this.icon('info')} Did you know Ace supports icons?`)
    console.log(`${this.icon('success')} Yeeezzzzz!`)
    console.log(`${this.icon('warn')} even for warnings and ${this.icon('error')} errors.`)

    console.log('') // empty line

    this.success(`${this.icon('success')} Went smooth like chocolate!`)
    this.warn(`${this.icon('error')} but has warnings`)
  }
}

module.exports = Icons
