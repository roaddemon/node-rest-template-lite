'use strict';

module.exports = {
    addRoutes: addRoutes
};

/**
 * Adds routes to the api.
 */
function addRoutes(api) {
    api.post('/lowercasedomains', createCamelCaseDomain);
    api.put('/lowercasedomains/:id', updateCamelCaseDomain);
    api.get('/lowercasedomains/:id', getCamelCaseDomain);
    api.get('/lowercasedomains', getCamelCaseDomains);
    api.delete('/lowercasedomains/:id', deleteCamelCaseDomain);
}

var infrastructure = require('../../infrastructure');
var log = infrastructure.logger;
var errors = infrastructure.errors;

var pascalCaseDomainService = require('../../application').pascalCaseDomainService;

/**
 * Creates a new pascalCaseDomain and inserts it in to the database.
 * @param {Object} req - req.body contains pascalCaseDomainData minus the id
 * @param {Object} res - res.body contains the inserted pascalCaseDomain (including the id)
 */
function createCamelCaseDomain(req, res) {

    var pascalCaseDomainData = req.body;

    pascalCaseDomainService.createCamelCaseDomain(pascalCaseDomainData)
        .then(function(pascalCaseDomain) {
            res.send(pascalCaseDomain);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Updates an existing pascalCaseDomain.
 * @param {Object} req - req.body contains pascalCaseDomainData including the id
 * @param {Object} res - res.body contains the updated pascalCaseDomain (including the id)
 */
function updateCamelCaseDomain(req, res) {

    var pascalCaseDomainData = req.body;

    pascalCaseDomainService.updateCamelCaseDomain(pascalCaseDomainData)
        .then(function(pascalCaseDomain) {
            res.send(pascalCaseDomain);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets an existing pascalCaseDomain.
 * @param {Object} req - req.params.id contains id of the pascalCaseDomain to get
 * @param {Object} res - res.body contains the requested pascalCaseDomain
 */
function getCamelCaseDomain(req, res) {

    var id = parseInt(req.params.id);

    pascalCaseDomainService.getCamelCaseDomain(id)
        .then(function(pascalCaseDomain) {
            res.send(pascalCaseDomain);
        })
        .catch(errors.NotFoundError, function() {
            res.status(404).send({'message': 'CamelCaseDomain ' + id + ' does not exist'});
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Gets all pascalCaseDomains.
 * @param {Object} req - no used
 * @param {Object} res - res.body contains an array of all pascalCaseDomains
 */
function getCamelCaseDomains(req, res) {
    pascalCaseDomainService.getCamelCaseDomains()
        .then(function(pascalCaseDomains) {
            res.send(pascalCaseDomains);
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}

/**
 * Deletes an pascalCaseDomain.
 * @param {Object} req - req.params.id contains id of the pascalCaseDomain to delete
 * @param {Object} res - res.body contains no content
 */
function deleteCamelCaseDomain(req, res) {

    var id = parseInt(req.params.id);

    pascalCaseDomainService.deleteCamelCaseDomain(id)
        .then(function() {
            res.status(204).send();  // No Content
        })
        .catch(function(error) {
            log.error(error);
            res.status(500).send({'message': error.toString()});
        });
}
