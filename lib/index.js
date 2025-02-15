/**
 * @fileoverview This Plugin checks for accessibility errors in ui5 javascript code.
 * @author Anton Steckert
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
module.exports.rules = requireIndex(__dirname + "/rules");