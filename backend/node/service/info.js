// services/infoService.js

const { spawn } = require("child_process");
const path = require("path");

function runInfoPrediction(values) {

  return new Promise((resolve, reject) => {

    const pyPath = path.join(
      __dirname,
      "../../python/info.py"
    );

    // IMPORTANT
    const inputJson = JSON.stringify(values);

    const py = spawn("python", [
      pyPath,
      inputJson
    ]);

    let output = "";
    let error = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", (code) => {

      if (code !== 0) {
        return reject(error);
      }

      try {

        const result = JSON.parse(output);

        resolve(result);

      } catch (err) {

        reject("JSON parse error");

      }

    });

  });

}

module.exports = {
  runInfoPrediction
};