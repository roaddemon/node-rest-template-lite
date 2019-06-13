'use strict';

module.exports = {
    createCamelCaseDomain: createCamelCaseDomain,
    updateCamelCaseDomain: updateCamelCaseDomain,
    getCamelCaseDomain: getCamelCaseDomain,
    getCamelCaseDomains: getCamelCaseDomains,
    deleteCamelCaseDomain: deleteCamelCaseDomain
};

var api = require('../common/constants').api;
var request = require('./request');

/**
 * Creates an pascalCaseDomain.
 *
 * @param {CamelCaseDomain} pascalCaseDomain
 * @return {Promise<CamelCaseDomain>}
 */
function createCamelCaseDomain(pascalCaseDomain) {

    return request.post(api + '/lowercasedomains')
        .send(pascalCaseDomain)
        .endAsync()
        .then(function(res) {
            return res.body;
        });
}

/**
 * Updates an pascalCaseDomain.
 *
 * @param {CamelCaseDomain} pascalCaseDomain
 * @return {Promise<CamelCaseDomain>}
 */
function updateCamelCaseDomain(pascalCaseDomain) {

    return request.put(api + '/lowercasedomains/' + pascalCaseDomain.id)
        .send(pascalCaseDomain)
        .endAsync()
        .then(function(res) {
            return res.body;
        });
}

/**
 * Gets an pascalCaseDomain
 *
 * @param {string} pascalCaseDomainId
 * @return {Promise<CamelCaseDomain>}
 */
function getCamelCaseDomain(pascalCaseDomainId) {

    return request.get(api + '/lowercasedomains/' + pascalCaseDomainId)
        .endAsync()
        .then(function(res) {
            return res.body;
        });
}

/**
 * Gets all pascalCaseDomains
 *
 * @return {Promise<CamelCaseDomain[]>}
 */
function getCamelCaseDomains() {

    return request.get(api + '/lowercasedomains')
        .endAsync()
        .then(function(res) {
            return res.body;
        });
}

/**
 * Deletes an pascalCaseDomain.
 *
 * @static
 * @param {string} pascalCaseDomainId
 * @return {Promise<true>}
 */
function deleteCamelCaseDomain(pascalCaseDomainId) {

    return request.del(api + '/lowercasedomains/' + pascalCaseDomainId)
        .endAsync();
}
