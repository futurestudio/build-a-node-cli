#!/usr/bin/env node
'use strict'

const { Command } = require('@adonisjs/ace')
const Pkg = require('./../package.json')
const Semver = require('semver')

class Deploy extends Command {
  static get signature () {
    return `deploy
    { version? : Semver version shortcut }
    { -s, --skip-release: Skip release tag }
    { -t, --without-tests: Skip test run before deployment }`
  }

  static get description () {
    return 'Deploy a new version of your website'
  }

  /**
   * Handle the "deploy" command
   *
   * @param {*} args   list of arguments for the "deploy" command
   * @param {*} flags  an object of flags where each value is either "null" or "true".
   *                   Check the signature for available flags
   */
  async handle (args, { skipRelease, withoutTests }) {
    console.log(args)

    let version = args.version
    const currentVersion = Pkg.version

    if (!version) {
      version = await this.choice(`What version do you want to deploy? Current: ${currentVersion}`, [
        {
          name: `patch: ${this.chalk.bold(Semver.inc(currentVersion, 'patch'))}`,
          value: 'patch'
        },
        {
          name: `minor: ${this.chalk.bold(Semver.inc(currentVersion, 'minor'))}`,
          value: 'minor'
        },
        {
          name: `major: ${this.chalk.bold(Semver.inc(currentVersion, 'major'))}`,
          value: 'major'
        }
      ])

      console.log(version)
    }
  }
}

module.exports = Deploy
