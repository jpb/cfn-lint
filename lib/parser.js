"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var yaml = require("js-yaml");
var fs = require("fs");
var yamlSchema_1 = require("./yamlSchema");
var yamlSchema = yamlSchema_1.default();
function openFile(path) {
    // Check the file path is valid
    if (!fs.existsSync(path)) {
        throw Error("Could not find file " + path + ". Check the input path.");
    }
    return openString(fs.readFileSync(path, 'utf8'), path);
}
exports.openFile = openFile;
;
function openString(contents, filename) {
    // Try JSON loading
    try {
        return openJson(contents);
    }
    catch (e) {
    }
    // Try YAML loading
    try {
        return openYaml(contents, filename);
    }
    catch (e) {
        throw Error("Could not determine file type. Check your template is not malformed. " + e.message);
    }
}
exports.openString = openString;
function openYaml(contents, path) {
    // Try and load the Yaml
    var yamlParse = yaml.safeLoad(contents, {
        filename: path,
        schema: yamlSchema,
        onWarning: function (warning) {
            console.error(warning);
        }
    });
    if (typeof yamlParse == 'object') {
        return yamlParse;
    }
    // Yaml Parsing error
    throw new Error("YAML could not be parsed.");
}
function openJson(contents) {
    return JSON.parse(contents);
}
//# sourceMappingURL=parser.js.map