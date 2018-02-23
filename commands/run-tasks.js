'use strict'

const { Command } = require('@adonisjs/ace')
const Listr = require('listr')

class RunTasks extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature () {
    return `run-tasks
    { -f, --skip-fuel: Skip fueling the rocket }
    { -p, --skip-passengers: Skip boarding passengers }
    { -c, --captain=@value: Specify the captain's name }`
  }

  /**
   * Use this description to provide additional details
   * about the command
   */
  static get description () {
    return 'Run a list of tasks.'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object, contains only data if you’ve added arguments in the signature
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle (args, { skipFuel, skipPassengers, captain }) {
    // deployment task list
    const tasks = new Listr([
      {
        title: 'Fueling the rocket',
        skip: () => {
          // returning a truthy value for "skip" will actually skip the task
          // a falsy value will not skip the task execution
          return skipFuel ? 'Skipping fueling.' : false
        },
        task: () => this.waitASecond()
      },
      {
        title: 'Boarding passengers',
        skip: skipPassengers,
        task: () => this.waitASecond()
      },
      {
        title: 'Starting the engines',
        task: () => this.waitASecond()
      },
      {
        title: typeof captain === 'string' ? `${captain} is launching the rocket!!!!` : 'Launching the rocket!!!!',
        task: () => this.waitASecond()
      },
      {
        title: 'Shooting for the stars',
        task: () => this.waitASecond()
      },
      {
        title: 'Houston? We landed!',
        task: () => this.waitASecond()
      }
    ])

    await tasks.run()
  }

  waitASecond () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })
  }
}

module.exports = RunTasks
