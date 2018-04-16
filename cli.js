#!/usr/bin/env node
'use strict'

const Ace = require('@adonisjs/ace')

// add commands as ES2015 classes
Ace.addCommand(require('./commands/ask'))
Ace.addCommand(require('./commands/ora'))
Ace.addCommand(require('./commands/ora-promise'))
Ace.addCommand(require('./commands/ora-customized'))
Ace.addCommand(require('./commands/hello'))
Ace.addCommand(require('./commands/icons'))
Ace.addCommand(require('./commands/colors'))
Ace.addCommand(require('./commands/package'))
Ace.addCommand(require('./commands/run-tasks'))
Ace.addCommand(require('./commands/run-system-command'))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
