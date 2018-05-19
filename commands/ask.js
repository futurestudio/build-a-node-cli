'use strict'

const { Command } = require('@adonisjs/ace')

class Ask extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature() {
    return `ask`
  }

  /**
   * Use this description to provide additional details
   * about the command
   */
  static get description() {
    return 'Ask a user for input on stdin'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object, contains only data if you’ve added arguments in the signature
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle(args, flags) {
    // ask for the user's name, default to "Cool Friend"
    const input = await this.ask('What’s your name?', 'Cool Friend')
    console.log(`\nOh yeah, nice name ${this.chalk.bold.magenta(input)}!\n`)

    const confirm = await this.confirm('Do you want another question?', { default: false })

    if (confirm) {
      const like = await this.choice(
        'I guess you’re passionate about Node.js 🔥?',
        [
          // create an answer which is also the value
          'Of course',
          // or split answer text and related value
          {
            name: 'Hell yes!', // this is the selectable answer
            value: 'hell' // this is the value
          }
        ],
        'hell' // value of the selected default answer
      )

      console.log(this.chalk.bold.green(like))
    }
  }
}

module.exports = Ask
