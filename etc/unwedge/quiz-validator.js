'use strict';

const tv4 = require('tv4');
const Fs = require('fs');

function read_json_file(file_name) {
    return JSON.parse(Fs.readFileSync(file_name));
}

const quiz_sample = read_json_file('quiz-sample.json');
const quiz_schema = read_json_file('quiz-schema.json');

console.log("SAMPLE", JSON.stringify(quiz_sample, null, 4));
console.log("SCHEMA", JSON.stringify(quiz_schema, null, 4));

const result = tv4.validateResult(quiz_sample, quiz_schema);

console.log("RESULT", JSON.stringify(result, null, 4));
