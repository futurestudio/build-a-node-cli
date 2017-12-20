'use strict'

const Fs = require('fs')
const { Command } = require('@adonisjs/ace')

class Package extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature () {
    return `pkg`
  }

  /**
   * Use this description to provide additional details
   * about the command
   */
  static get description () {
    return 'Show the package.json content'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object
   * @param {*} flags  arguments object
   */
  async handle () {
    const pkg = Fs.readFileSync('package.json')
    console.log(pkg.toString())
  }
}

module.exports = Package
