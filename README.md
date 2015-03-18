
Meteor CSV reader/writer
----

A Meteor isomorphic CSV reader/writer


 - Papa Parse for client side : http://papaparse.com/
 - baby parse for server side.
 - Usage of fibers to read csv source line by line on server side


Quickstart
----

given a csv string like that

    1;01;ozan;OZAN;Ozan;O250;OSN;01190;284;01284;2;26;6;618;469;500;94;660;4.91667;46.3833;2866;51546;+45456;462330;170;205;14126;8823;26916
    2;01;marboz;MARBOZ;Marboz;M612;MRBS;01851;232;01232;2;11;6;2182;2164;2200;54;4014;5.25;46.3333;3246;51492;+51530;462033;194;240;4580;14287;1768
    3;01;foissiat;FOISSIAT;Foissiat;F230;FST;01340;163;01163;2;21;6;1912;1562;1900;47;4036;5.18333;46.3667;3153;51523;+51029;462213;186;228;5227;15952;1738

You can use server-side code synchronous to load line by line the csv file

    CSV.readCsvFileLineByLine(process.env.PWD + '/server/data/my-file.csv', function (line) {
        lines.push(line);
    });

    lines[0][1] === "01";


If you got more complex CSV files, with headers and escaping chars,

    "id":"firstName":"lastName"
    "1":"jimi":"hendrix"
    "2":"jim":"morrison"

you can simply add options to make it simple (refer to papa docs : http://papaparse.com/docs#config)

    CSV.readCsvFileLineByLine(process.env.PWD + '/server/data/my-file.csv', {
        headers: true,
        delimiter: ":",
    }, function (line) {
        lines.push(line);
    });

    lines[0].firstName === "foo";
    lines[1].firstName === "jim";

