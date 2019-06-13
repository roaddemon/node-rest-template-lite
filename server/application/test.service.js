'use strict';

module.exports = {
    dropData: dropData
};

var persistence = require('./persistence');
var pascalCaseDomainRepository = persistence.pascalCaseDomainRepository;

/**
 * Drops all data from all repositories.
 */
function dropData() {
    return pascalCaseDomainRepository.dropData();
}
