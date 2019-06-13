/*jshint expr: true*/
'use strict';

var Yadda = require('yadda');
var expect = require('./common/chai.helpers').expect;
var formatHttpError = require('./common/http.helpers').formatHttpError;
var pascalCaseDomainService = require('./services/lowercasedomain.service');

var English = Yadda.localisation.English;
var Dictionary = Yadda.Dictionary;

var dictionary = new Dictionary()
    .define('table', /([^\u0000]*)/, Yadda.converters.table);

module.exports = English.library(dictionary)

    .given('an pascalCaseDomain called $pascalCaseDomainName', function(pascalCaseDomainName, next) {
        var self = this;

        pascalCaseDomainService.createCamelCaseDomain({ name: pascalCaseDomainName })
            .then(function(pascalCaseDomain) {
                self.ctx.pascalCaseDomain = pascalCaseDomain;
                next();
            });
    })

    .when('I create an pascalCaseDomain called $pascalCaseDomainName', function(pascalCaseDomainName, next) {
        var self = this;

        pascalCaseDomainService.createCamelCaseDomain({ name: pascalCaseDomainName })
            .then(function(pascalCaseDomain) {
                self.ctx.pascalCaseDomain = pascalCaseDomain;
                next();
            });
    })

    .when('I change the pascalCaseDomain name to $pascalCaseDomainName', function(pascalCaseDomainName, next) {
        var self = this;

        self.ctx.pascalCaseDomain.name = pascalCaseDomainName;
        pascalCaseDomainService.updateCamelCaseDomain(self.ctx.pascalCaseDomain)
            .then(function(pascalCaseDomain) {
                self.ctx.pascalCaseDomain = pascalCaseDomain;
                next();
            });
    })

    .when('I ask for the pascalCaseDomain', function(next) {
        var self = this;

        pascalCaseDomainService.getCamelCaseDomain(self.ctx.pascalCaseDomain.id)
            .then(function(pascalCaseDomain) {
                self.ctx.pascalCaseDomain = pascalCaseDomain;
                next();
            })
            .catch(function(httpError) {
                self.ctx.error = formatHttpError(httpError);
                next();
            });
    })

    .when('I delete the pascalCaseDomain', function(next) {
        pascalCaseDomainService.deleteCamelCaseDomain(this.ctx.pascalCaseDomain.id)
            .then(function() {
                next();
            });
    })

    .then ('I should get the pascalCaseDomain called $pascalCaseDomainName', function(pascalCaseDomainName, next) {
        expect(this.ctx.error).to.be.undefined;
        expect(this.ctx.pascalCaseDomain).to.exist;
        expect(this.ctx.pascalCaseDomain.name).to.equal(pascalCaseDomainName);
        next();
    });
