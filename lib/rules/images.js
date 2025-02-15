/**
 * @fileoverview Checks if an alt text is present/the image is marked as decorative.
 * @author Anton Steckert
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'problem', // `problem`, `suggestion`, or `layout`
    schema: [], // Add a schema if the rule has options
    messages: {
      NoAltNoDecorative: "The image has no alt text and isn't marked as decorative.",
      AltAndDecorative: "The image is decorative and has an alt text.",
      EmptyAltNoDecorative: "The alt text is empty. Please use the decorative Property if the image is purely decorative.",
      noAltFalseDecorative: "The image isn't decorative and has no alt text."
    }
  },

  create(context) {

    return {
      ObjectExpression(node){
        if ( 
          node.parent.callee?.object?.object?.name === "sap" &&
          node.parent.callee?.object?.property?.name === "m" &&
          node.parent.callee?.property?.name === "Image"
        ){
          
          // Check if alt text or decorative tag is present
          if ( 
            node.properties.every(Property => (Property.key?.name !== "alt") && (Property.key?.name !== "decorative"))
          ) {
              const errorLocation = node.loc.start;
              context.report({
                loc: errorLocation,
                messageId: "NoAltNoDecorative"
              });
          }

          // Checks if the decorative is set as true and an alt text present
          if (
            node.properties.some(Property => Property.key?.name === "alt")
          ) {
            if (
              node.properties.some(Property => Property.key?.name === "decorative")
            ) {
              let indexOfDecorative = node.properties.findIndex(Property => Property.key?.name === "decorative");
              if (
                node.properties[indexOfDecorative].value?.value === true
              ) {
                let errorLocation = node.properties[indexOfDecorative].loc
                context.report({
                  loc: errorLocation,
                  messageId: "AltAndDecorative"
                });
              }
            }
          }
          
          // Checks if an alt text ist present but empty
          if ( 
            node.properties.some(Property => Property.key?.name === "alt")
          ) {
            let indexOfAlt = node.properties.findIndex(Property => Property.key?.name === "alt");
            let altWithoutSpaces = node.properties[indexOfAlt].value?.value.replace(/\s/g, '')
            if ( 
              altWithoutSpaces.length === 0
            ) {
              let errorLocation = node.properties[indexOfAlt].value.loc
              context.report({
                loc: errorLocation,
                messageId: "EmptyAltNoDecorative" 
              });
            }
          }

          // Checks if the decorative tag is set to false and no alt text is given
          if (
            node.properties.some(Property => Property.key?.name === "decorative")
          ) {
            if(
              node.properties.every(Property => Property.key?.name !== "alt")
            ) {
              let indexOfDecorative = node.properties.findIndex(Property => Property.key?.name === "decorative");
              if (
                node.properties[indexOfDecorative].value?.value === false
              ) {
                let errorLocation = node.properties[indexOfDecorative].value.loc;
                context.report({
                  loc: errorLocation,
                  messageId: "noAltFalseDecorative"
                });
              }
            }
          }
        }
      }
    };
  },
};

