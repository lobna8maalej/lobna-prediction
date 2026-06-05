const { spawn } = require("child_process");
const path = require("path");

function runPlotPython(modelType, values) {

  return new Promise((resolve, reject) => {

    const py = spawn("python", [
      path.join(__dirname, "../../python/sanitaire.py"),
      modelType,
      ...values.map(String)
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
        return reject(error || "Python error");
      }

      try {
        const jsonLine = output
          .split("\n")
          .map(l => l.trim())
          .filter(l => l.startsWith("{"))
          .pop();

        if (!jsonLine) {
          return reject("No JSON found in output");
        }

        resolve(JSON.parse(jsonLine));

      } catch (e) {
        reject("JSON parse error: " + e);
      }

    });

  });

}

module.exports = { runPlotPython };