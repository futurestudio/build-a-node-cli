#!/usr/bin/env node
'use strict'

const { Command } = require('@adonisjs/ace')
const Pkg = require('./../package.json')
const Dotenv = require('dotenv')
const Semver = require('semver')
const Execa = require('execa')
const Listr = require('listr')
const Path = require('path')

Dotenv.config({ path: Path.resolve(__dirname, '.env') })

class Deploy extends Command {
  /**
   * The method signature describes the comannd, arguments and flags/aliases
   * The words flags and aliases mean the same thing in this context 😃
   */
  static get signature () {
    return `deploy
    { version? : Semver version shortcut }
    { -s, --skip-release: Skip git release tag }
    { -t, --skip-tests: Skip test run before deployment }`
  }

  /**
   * Use this description to provide additional details
   * about the command.
   */
  static get description () {
    return 'Deploy a new version of your website'
  }

  /**
   * Handle the "deploy" command
   *
   * @param {*} args   arguments object for the "deploy" command
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle ({ version }, flags) {
    try {
      // either ask for the new version of let the user confirm the selected version
      // this gives context on the actual version bump
      version = await (!version ? this.askForVersionBump(flags) : this.confirmVersionInput(version))

      // wait for the deployment process to finish
      await this.runDeployment(version, flags)

      // print a success message 💃🕺
      console.log(`\n ${Pkg.name} ${version} published 🎉`)
    } catch (err) {
      // catch any error and print the error message
      console.log(`❗️ Error: ${this.chalk.red(err.message)}`)
      // exit the process to stop everything
      process.exit(1)
    }
  }

  /**
   * If a user runs the "deploy" command without the <version> argument,
   * ask for the target version. This method allows the user to bump
   * from the current version to either major, minor or patch.
   *
   * Alright, I can hear the voice in your head 😁
   * Add the feature to bump to a custom version yourself 😉
   */
  async askForVersionBump () {
    // provide context of the current package version
    const currentVersion = Pkg.version
    console.log(
      `\nPublish a new version of ${this.chalk.bold.green(Pkg.name)}, currently ${this.chalk.bold.dim(
        `(${currentVersion})`
      )}\n`
    )

    // use "this.choice" to ask a question and provide an array of answers
    // using objects as the array elements allows you to specify "name" and "value"
    // for the answers
    // here, the selected "value" assigns to the "version" variable
    const version = await this.choice(`Select the new version`, [
      {
        name: `patch: ${this.chalk.bold(Semver.inc(currentVersion, 'patch'))}`,
        value: Semver.inc(currentVersion, 'patch')
      },
      {
        name: `minor: ${this.chalk.bold(Semver.inc(currentVersion, 'minor'))}`,
        value: Semver.inc(currentVersion, 'minor')
      },
      {
        name: `major: ${this.chalk.bold(Semver.inc(currentVersion, 'major'))}`,
        value: Semver.inc(currentVersion, 'major')
      }
    ])

    // return the selected version which is an actual version, like "2.7.10"
    return version
  }

  /**
   * Verify the <version> argument, make sure it’s valid with semver.
   * Let the user confirm the next version before proceeding.
   *
   * In case the version input can’t be processed or the user doesn’t
   * want to proceed with the version bump, the deployment stops here.
   *
   * @param {*} versionInput  the version string provided as command line argument
   */
  async confirmVersionInput (versionInput) {
    const currentVersion = Pkg.version
    // use semver and increment the current version by the version input
    // returns the new version for a valid or null for invalid input
    const newVersion = Semver.inc(currentVersion, versionInput)

    // verify the new version is valid, if not stop processing
    if (!Semver.valid(newVersion)) {
      console.log(this.chalk.magenta(`Sorry, we can’t handle the version increment ${this.chalk.bold(versionInput)}.`))
      process.exit(1)
    }

    // ask for confirmation to give context about the version bump
    // if the user declines, stop here
    const proceed = await this.confirm(`This deploys version ${newVersion}. Proceed?`)
    if (!proceed) {
      console.log(this.chalk.magenta('Gotcha. Stopping here 🛑'))
      process.exit(1)
    }

    // return the new version as an actual version, like "2.7.10"
    return newVersion
  }

  /**
   * Run the actual deployment as a list of tasks
   * The task list from listr shows loading indicators,
   * success checkmarks and errors properly
   *
   * @param {*} version  new version, a valid semver version like "2.7.10"
   * @param {*} flags    the flags object from CLI input
   */
  async runDeployment (version, { skipRelease, skipTests }) {
    // deployment task list
    const tasks = new Listr([
      {
        title: 'Run test with NPM',
        skip: () => {
          // returning a truthy value for "skip" will actually skip the task
          // a falsy value will not skip the task execution
          return skipTests ? 'Skipping test run.' : false
        },
        task: () => {
          return Execa('npm', ['test'])
        }
      },
      {
        title: 'Bump version, commit changes, tag release, push everything',
        skip: () => {
          // returning false will not skip the version bump, release tag and push
          return skipRelease ? 'Skipping version bump and release tag.' : false
        },
        task: ctx => {
          // TODO include the actual version bump here

          return new Promise(resolve => {
            setTimeout(() => {
              resolve()
            }, 5000)
          })
        }
      }
    ])

    // run the task list which returns a promise
    return tasks.run()
  }
}

module.exports = Deploy
