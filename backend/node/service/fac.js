const { spawn } = require("child_process");
const path = require("path");

function runPython(scriptName) {
  return new Promise((resolve, reject) => {

    const scriptPath = path.join(__dirname, "..", "..", "python", scriptName);

    const py = spawn("python", [scriptPath]);

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
        resolve(JSON.parse(output));
      } catch (e) {
        reject(output);
      }
    });

  });
}

module.exports = { runPython };