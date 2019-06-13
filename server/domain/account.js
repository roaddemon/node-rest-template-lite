'use strict';

/**
 * An pascalCaseDomain.
 *   {int}     id
 *   {String}  name - name of the pascalCaseDomain
 *
 * Example:
 *   {
 *       id: [number],
 *       name: 'Cash'
 *   }
 */

var _ = require('lodash');

var CamelCaseDomain = function(pascalCaseDomainData) {
    if (pascalCaseDomainData) {
        _.extend(this, pascalCaseDomainData);
    }
};

module.exports = CamelCaseDomain;
