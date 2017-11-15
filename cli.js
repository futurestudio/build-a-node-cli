#!/usr/bin/env node
'use strict'

const Ace = require('@adonisjs/ace')

// add commands as ES2015 classes
Ace.addCommand(require('./commands/deploy'))
Ace.addCommand(require('./commands/load'))

// Boot ace to execute commands
Ace.wireUpWithCommander()
Ace.invoke()
