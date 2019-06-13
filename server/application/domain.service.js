'use strict';

module.exports = {
    createCamelCaseDomain: createCamelCaseDomain,
    updateCamelCaseDomain: updateCamelCaseDomain,
    getCamelCaseDomain: getCamelCaseDomain,
    getCamelCaseDomains: getCamelCaseDomains,
    deleteCamelCaseDomain: deleteCamelCaseDomain
};

var persistence = require('./persistence');
var pascalCaseDomainRepository = persistence.pascalCaseDomainRepository;

/**
 * Creates a new pascalCaseDomain and inserts it in to the database.
 * @param {Object} pascalCaseDomainData minus the id
 * @return {Promise} A promise that returns the inserted pascalCaseDomain (including the id)
 */
function createCamelCaseDomain(pascalCaseDomainData) {
    return pascalCaseDomainRepository.createCamelCaseDomain(pascalCaseDomainData);
}

/**
 * Updates an existing pascalCaseDomain.
 * @param {Object} pascalCaseDomainData including the id
 * @return {Promise} A promise that returns the updated pascalCaseDomain (including the id)
 */
function updateCamelCaseDomain(pascalCaseDomainData) {
    return pascalCaseDomainRepository.updateCamelCaseDomain(pascalCaseDomainData);
}

/**
 * Gets an existing pascalCaseDomain.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired pascalCaseDomain.
 */
function getCamelCaseDomain(id) {
    return pascalCaseDomainRepository.getCamelCaseDomain(id);
}

/**
 * Gets all pascalCaseDomains.
 * @return {Promise} A promise that returns an array of all pascalCaseDomains.
 */
function getCamelCaseDomains() {
    return pascalCaseDomainRepository.getCamelCaseDomains();
}

/**
 * Deletes an pascalCaseDomain.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the pascalCaseDomain is deleted.
 */
function deleteCamelCaseDomain(id) {
    return pascalCaseDomainRepository.deleteCamelCaseDomain(id);
}
