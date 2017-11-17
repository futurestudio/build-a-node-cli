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
    { -s, --skip: Skip the first task in the list of tasks }`
  }

  /**
   * Use this description to provide additional details
   * about the command.
   */
  static get description () {
    return 'Run a list of tasks.'
  }

  /**
   * Handle the "deploy" command
   *
   * @param {*} args   arguments object for the "deploy" command
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle (args, { skip }) {
    // deployment task list
    const tasks = new Listr([
      {
        title: 'Loading movie sample data',
        skip: () => {
          // returning a truthy value for "skip" will actually skip the task
          // a falsy value will not skip the task execution
          return skip ? 'Skipping test run.' : false
        },
        task: () => {
          return this.waitASecond()
        }
      },
      {
        title: 'Loading movie poster and backgrounds',
        task: () => {
          return this.waitASecond()
        }
      },
      {
        title: 'Starting the rocket',
        task: () => {
          return this.waitASecond()
        }
      },
      {
        title: 'Boarding passengers',
        task: () => {
          return this.waitASecond()
        }
      },
      {
        title: 'Launch the rocket!!!!',
        task: () => {
          return this.waitASecond()
        }
      },
      {
        title: 'Houston? We landed!',
        task: () => {
          return this.waitASecond()
        }
      }
    ])

    // run the task list which returns a promise
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
