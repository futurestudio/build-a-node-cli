const { Command } = require('@adonisjs/ace')
const Execa = require('execa')

class RunSystemCommand extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature () {
    return `run-command`
  }

  /**
   * Use this description to provide additional details
   * about the command
   */
  static get description () {
    return 'Run a command, like “npm test”'
  }

  /**
   * Handle the command
   *
   * @param {*} args   arguments object, contains only data if you’ve added arguments in the signature
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle (args, flags) {
    try {
      // grab your Node.js version
      const node = await Execa('node', ['-v'])
      console.log(`Node.js: ${this.chalk.bold.green(node.stdout)}`)

      // 👇 this is the same as above, but prefer Execa() over Execa.shell()
      // Exexa() seems to be faster and safer than Execa.shell
      // const node = await Execa.shell('node -v')

      // grab your NPM version
      const npm = await Execa.shell('npm -v')
      console.log(`NPM: ${this.chalk.bold.green(npm.stdout)}`)

      // you can also run your project tests, like this:
      // await Execa('npm', ['test'])
    } catch (err) {
      // catch any error and print the error message
      console.log(`❗️ Error: ${this.error(err.message)}`)
      // exit the process to stop everything
      process.exit(1)
    }
  }
}

module.exports = RunSystemCommand
