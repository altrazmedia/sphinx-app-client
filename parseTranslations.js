const fs = require("fs");
const yaml = require("yaml");

const INPUT_PATH = "./src/utils/i18n/translations";
const OUTPUT_PATH = "./src/utils/i18n/translations_keys.json";

/** Parsing YAML files with translations into one JSON */

/** Watching for changes in YAML files */
(async () => {
  console.log("Watching for changes in YAML files...");
  translate();
  fs.watch(INPUT_PATH, e => {
    translate();
  });
})();

async function translate() {
  try {
    const files = await getYamlFiles();
    const jsonWithTranslations = await parseYamlToJson(files);
    await saveJsonFile(jsonWithTranslations);
    console.log(`JSON file with translations have been created.`);
  } catch (err) {
    console.log(`An error occurred while creating a translations JSON file`);
    console.log(err);
  }
}

/**
 * @returns {Array} List of YAML filenames
 */
function getYamlFiles() {
  return new Promise((res, rej) => {
    fs.readdir(INPUT_PATH, (err, files) => {
      if (err) {
        rej(err);
      }
      res(files.filter(file => file.indexOf(".yaml") > -1));
    });
  });
}

/**
 * Reading the content of a single YAML file
 * @param {String} filename
 */
function readYamlFile(filename) {
  return new Promise((res, rej) => {
    fs.readFile(`${INPUT_PATH}/${filename}`, "utf8", (err, data) => {
      if (err) {
        rej(err);
      }
      res(data);
    });
  });
}

/**
 * Combining list of YAML files into one JSON file with separate languages
 * @param {Array} files Array of YAML files names
 */
async function parseYamlToJson(files) {
  const json = {
    en: {},
    pl: {},
  };

  for (file of files) {
    const content = await readYamlFile(file); // Reading the content of YAML file
    const parsed = content ? yaml.parse(content) : {}; // Parsing to JS Object
    Object.keys(parsed).forEach(key => {
      const values = parsed[key];
      Object.keys(values).forEach(lang => {
        json[lang][key] = values[lang];
      });
    });
  }

  return JSON.stringify(json);
}

/**
 * Writing JSON file
 * @param {String} json Content parsed to JSON
 */
async function saveJsonFile(json) {
  return new Promise((resolve, reject) => {
    fs.writeFile(`${OUTPUT_PATH}`, json, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
