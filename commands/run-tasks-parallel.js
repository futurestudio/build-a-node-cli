'use strict'

const { Command } = require('@adonisjs/ace')
const Listr = require('listr')

class RunTasks extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature() {
    return `run-tasks-parallel`
  }

  /**
   * Use this description to provide additional details
   * about the command
   */
  static get description() {
    return 'Run a list of tasks in parallel.'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object, contains only data if you’ve added arguments in the signature
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle(args, { skipFuel, skipPassengers, captain }) {
    // deployment task list
    const tasks = new Listr([
      {
        title: 'Allow extra bag for passengers',
        // you can disable tasks on wish
        // return a falsy value for "enabled" to disable this task in the list
        enabled: () => false,
        task: () => this.waitASecond()
      },
      {
        title: 'Prepare start',
        skip: skipPassengers,
        task: () =>
          new Listr(
            [
              {
                title: 'Fueling the rocket',
                skip: () => {
                  // returning a truthy value for "skip" will actually skip the task
                  // a falsy value will not skip the task execution
                  return skipFuel ? 'Skip fueling.' : false
                },
                task: () => this.wait(5)
              },
              {
                title: 'Adding extra snacks for the trip',
                skip: () => true,
                task: () => this.waitASecond()
              },
              {
                title: 'Boarding passengers',
                skip: skipPassengers,
                task: () => this.wait(5)
              },
              {
                title: 'Starting the engines',
                task: () => this.wait(3)
              }
            ],
            { concurrent: true }
          )
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

  waitASecond() {
    return this.wait(1)
  }

  wait(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  }
}

module.exports = RunTasks
