/**
 * @fileoverview Checks if an alt text is present/the image is marked as decorative.
 * @author Anton Steckert
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/images"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("images", rule, {
  valid: [
    {
      code: "var oImage = new sap.m.Image('id', {src: 'image.png', alt: 'alt text'})"
    },
    {
      code: "var oImage = new sap.m.Image('id', {src: 'image.png', decorative: true})"
    },
    {
      code: "var oText = new sap.m.Text('id', {text: 'sample'})"
    },
  ],

  invalid: [
    {
      code: "var oImage = new sap.m.Image('id', {src: 'image.png'});",
      errors: [{ messageId: "NoAltNoDecorative"}],
    },
    {
      code: "var oImage = new sap.m.Image('id', {src: 'image.png', alt: 'alt text', decorative: true});",
      errors: [{ messageId: "AltAndDecorative"}],
    },
    {
      code: "var oImage = new sap.m.Image('id', {src: 'image.png', alt: ' '});",
      errors: [{ messageId: "EmptyAltNoDecorative"}],
    },
    {
      code: "var oImage = new sap.m.Image('id', {src: 'image.png', decorative: false});",
      errors: [{ messageId: "noAltFalseDecorative"}],
    },
  ],
});