'use strict'

const { Command, enquirer } = require('@adonisjs/ace')

class Enquirer extends Command {
  static get signature() {
    return `enquirer`
  }

  static get description() {
    return 'Access the enquirer instance through Ace'
  }

  async handle() {
    const color = enquirer.question('color', 'What is your favorite color?', {
      default: 'blue'
    })

    const favoriteColor = await enquirer.prompt(color)
    console.log(favoriteColor)
  }
}

module.exports = Enquirer
