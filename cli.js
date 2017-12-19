#!/usr/bin/env node
'use strict'

const Ace = require('@adonisjs/ace')

// add commands as ES2015 classes
Ace.addCommand(require('./commands/hello'))
Ace.addCommand(require('./commands/ask'))
Ace.addCommand(require('./commands/load'))
Ace.addCommand(require('./commands/run-tasks'))
Ace.addCommand(require('./commands/run-system-command'))

Ace.addCommand(require('./commands/deploy'))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
