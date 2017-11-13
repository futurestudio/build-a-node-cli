'use strict'

const Ace = require('@adonisjs/ace')

Ace.addCommand(require('./commands/deploy'))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
