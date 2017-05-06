import { combineReducers } from 'redux'

import * as init from './init'
import * as player from './player'
import * as chapters from './chapters'
import * as tabs from './tabs'
import * as theme from './theme'
import * as share from './share'
import * as quantiles from './quantiles'
import * as l10n from './l10n'

export default combineReducers(
    Object.assign({}, init, player, chapters, tabs, theme, share, quantiles, l10n)
)
