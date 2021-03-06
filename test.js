import childProcess from 'child_process';
import ExternalLinksTester from './lib/externalLinksTester';
import test from 'ava';
import execa from 'execa'


test(t => {
    t.deepEqual([1, 2], [1, 2]);
});

test('my passing test', t => {
    var config = {
        outputFile: 'results/links-test-result.xml',
        externalLinks: [
            {
                url: 'http://www.google.com111',
                timeout: 3000
            },
            {
                url: 'https://en.wikipedia.org/wiki/List_of_HTTP_status_codes',
                timeout: 3000
            },
            {
                url: 'http://www.google.com222',
                timeout: 3000
            }
        ]
    };
    var externalLinksTester = new ExternalLinksTester({
        externalLinks: config.externalLinks,
        outputFile: config.outputFile
    }).testLinks();

    return externalLinksTester;
});

test('cli', async t => {
    await execa.shell('./app.js extLinksTester.example.config').then(result => {
        t.truthy(result.stdout.includes('ERROR:  Link http://www.google.com111 is not ok. Error code was ENOTFOUND'));
        t.truthy(result.stdout.includes('SUCCESS:  Link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes is ok.'));
        t.truthy(result.stdout.includes('All 2 tests finished running.'));
    });
});

test('cli2', async t => {
    await execa.shell('./app.js').catch(error => {
        t.truthy(error.stderr.includes('You need to provide the name of the config file'));
    });

});