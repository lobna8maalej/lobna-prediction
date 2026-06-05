const { spawn } = require("child_process");
const path = require("path");

function runPrediction(values) {

  return new Promise((resolve, reject) => {

    const pyFile = path.join(__dirname, "../../python/predict.py");

    const py = spawn("python", [
      pyFile,
      ...values.split(",")
    ]);

    let result = "";
    let error = "";

    py.stdout.on("data", (data) => {
      result += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0) return reject(error);
      resolve(result.trim());
    });
  });
}

module.exports = runPrediction;