/**
 * Created by zhaiyingying on 16/8/31.
 */
var fs=require("fs");
var data=fs.readFileSync('makemytrip.xlsx');
console.log(parseInt(data,2))
var parseXlsx = require('excel');

parseXlsx('C://fakepath//makemytrip.xlsx', function(err, data) {
    if(err) throw err;
    // data is an array of arrays
    console.log(data)
});