const { spawn } = require("child_process");
const path = require("path");

function runPython(mode, value) {

  return new Promise((resolve, reject) => {

    const scriptPath = path.join(__dirname, "../../python/app.py");

    const py = spawn("python", [
      scriptPath,
      mode,
      value.toString()
    ]);

    let output = "";

    py.stdout.on("data", data => output += data.toString());

    py.stderr.on("data", err => console.error("PY ERROR:", err.toString()));

    py.on("close", (code) => {
      if (code !== 0) return reject("Python error");

      resolve(output.trim());
    });

  });

}

module.exports = runPython;