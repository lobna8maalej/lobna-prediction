const { spawn } = require("child_process");
const path = require("path");

function runCommerce(inputData) {
  return new Promise((resolve, reject) => {

    const scriptPath = path.resolve(__dirname, "../../python/commerce2.py");
    const pythonPath = path.resolve(__dirname, "../../.venv/Scripts/python.exe");

    const python = spawn(pythonPath, [scriptPath]);

    let result = "";
    let error = "";

    python.stdin.write(JSON.stringify(inputData));
    python.stdin.end();

    python.stdout.on("data", (data) => result += data.toString());
    python.stderr.on("data", (data) => error += data.toString());

    python.on("error", (err) => {
      reject({ success: false, error: err.message });
    });

    python.on("close", (code) => {

      if (code !== 0) {
        return reject({
          success: false,
          error: error || "Python crash"
        });
      }

      try {
        resolve(JSON.parse(result.trim()));
      } catch (e) {
        reject({
          success: false,
          error: "Invalid JSON from Python",
          raw: result
        });
      }
    });
  });
}

module.exports = { runCommerce };