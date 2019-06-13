'use strict';

module.exports = {
    createCamelCaseDomain: createCamelCaseDomain,
    updateCamelCaseDomain: updateCamelCaseDomain,
    getCamelCaseDomain: getCamelCaseDomain,
    getCamelCaseDomains: getCamelCaseDomains,
    deleteCamelCaseDomain: deleteCamelCaseDomain,
    dropData: dropData
};

var _ = require('lodash');
var Promise = require('bluebird');
var CamelCaseDomain = require('../../domain').CamelCaseDomain;
var errors = require('../../infrastructure').errors;

var pascalCaseDomains = [];
var nextCamelCaseDomainId = 1;

/**
 * Creates a new pascalCaseDomain and inserts it in to the database.
 * @param {Object} pascalCaseDomainData minus the id
 * @return {Promise} A promise that returns the inserted pascalCaseDomain (including the id)
 */
function createCamelCaseDomain(pascalCaseDomainData) {
    var pascalCaseDomain = new CamelCaseDomain(pascalCaseDomainData);
    pascalCaseDomain.id = nextCamelCaseDomainId++;
    pascalCaseDomains.push(pascalCaseDomain);
    return Promise.resolve(pascalCaseDomain);
}

/**
 * Updates an existing pascalCaseDomain.
 * @param {Object} pascalCaseDomainData including the id
 * @return {Promise} A promise that returns the updated pascalCaseDomain (including the id)
 */
function updateCamelCaseDomain(pascalCaseDomainData) {
    var pascalCaseDomain = _.find(pascalCaseDomains, 'id', pascalCaseDomainData.id);
    return pascalCaseDomain ?
        Promise.resolve(_.extend(pascalCaseDomain, pascalCaseDomainData)) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

/**
 * Gets an existing pascalCaseDomain.
 * @param {integer} id
 * @return {Promise} A promise that returns the desired pascalCaseDomain.
 */
function getCamelCaseDomain(id) {
    var pascalCaseDomain = _.find(pascalCaseDomains, 'id', id);
    return pascalCaseDomain ?
        Promise.resolve(pascalCaseDomain) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

/**
 * Gets all pascalCaseDomains.
 * @return {Promise} A promise that returns an array of all pascalCaseDomains.
 */
function getCamelCaseDomains() {
    return Promise.resolve(pascalCaseDomains);
}

/**
 * Deletes an pascalCaseDomain.
 * @param {integer} id
 * @return {Promise} A promise that gets fulfilled when the pascalCaseDomain is deleted.
 */
function deleteCamelCaseDomain(id) {
    var index = _.findIndex(pascalCaseDomains, function(pascalCaseDomain) {
        return pascalCaseDomain.id === id;
    });
    return index >= 0 ?
        Promise.resolve(pascalCaseDomains.splice(index, 1)) :
        Promise.reject(new errors.NotFoundError('Not found'));
}

/**
 * Drops all pascalCaseDomain data.
 */
function dropData() {
    pascalCaseDomains.length = 0;
}
