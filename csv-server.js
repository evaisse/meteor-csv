/**
 *  
 * @author evaisse
 * @internal changelog:
 *     Emmanuel VAISSE - 2015-03-18 17:25:19
 *         Add some helpers on CSV parsing
 */
CSV = Baby;


/**
 * Read a given filepath, for each line a fibers will 
 * 
 * @param  {String} filepath path to csv file
 * @param  {Function} linecallback a callback that will recieve every parsed lines
 * @param  {Object} config papaParse config object : http://papaparse.com/docs#config
 * @return {Object} an Array of fields if CSV file has no headers, or a Hash of key values if CSV file has header
 */
CSV.readCsvFileLineByLine = function (filepath, config, linecallback) {

    var readCsv,
        lineParser,
        rd, 
        headers = [];

    /*
        Alternative syntax
     */
    if (typeof config === "function")  {
        linecallback = config;
        config = {};
    }

    linecallback = linecallback || function () {};
    config = config || {};

    /*
        We handle headers ourself
     */
    headers = config.headers ? headers : false;
    delete config['headers'];

    /**
     * [lineParser description]
     * @param  {[type]} line [description]
     * @return {[type]}      [description]
     */
    linePreprocessorParser = function (line) {

        var row = {};

        if (headers) {

            if (!headers.length) {
                headers = CSV.parse(line, config).data[0];
                return;
            }

            headers.forEach(function (e, i) {

                row[e] = CSV.parse(line, config).data[0][i];

            });

        } else {
            row = CSV.parse(line, config).data[0];
        }

        linecallback(row);

    }

    /**
     * @param  {string} filepath       filepath path to csv file
     * @param  {Function} onLineCallback Callback to be executed on line
     */
    readCsv = function (filepath) {

        var rd,
            fs = Npm.require('fs'),
            readline = Npm.require('readline'),
            Future = Npm.require('fibers/future'),
            future;

        future = new Future;

        rd = readline.createInterface({
            input: fs.createReadStream(filepath),
            output: process.stdout,
            terminal: false
        });

        rd.on('line', function (line) {
            linePreprocessorParser(line);
        });

        rd.on('close', function(line) {
            rd.write("\n"); // trick that allow readline to read the last line
            future.return();
        });

        return future.wait();
    };


    readCsv(filepath);


}