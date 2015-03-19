Package.describe({
    name: 'evaisse:csv',
    version: '0.1.3',
    // Brief, one-line summary of the package.
    summary: 'A Meteor isomorphic CSV reader/writer based on Papa Parse & Baby Parse',
    // URL to the Git repository containing the source code for this package.
    git: 'https://github.com/evaisse/meteor-csv',
    // By default, Meteor will default to using README.md for documentation.
    // To avoid submitting documentation, set this field to null.
    documentation: 'README.md'
});

Package.onUse(function (api) {
    api.use('harrison:papa-parse@1.0.10', ['client']);
    api.use('harrison:babyparse@1.0.1', ['server']);
    api.versionsFrom('1.0.4.1');
    api.export('CSV');
    api.addFiles([
        'csv-client.js'
    ], ['client', 'web.browser', 'web.cordova']);
    api.addFiles([
        'csv-server.js'
    ], 'server');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('evaisse:csv');
    api.addFiles('csv-tests.js');
});


Npm.depends({"byline":"4.2.1"});
