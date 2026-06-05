const { spawn } = require("child_process");

function runPython(file, args = []) {

  return new Promise((resolve, reject) => {

    const py = spawn("python", ["-u", file, ...args]);

    let output = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (err) => {
      console.error(err.toString());
    });

    py.on("close", (code) => {

      if (code !== 0) {
        return reject("Python error code " + code);
      }

      try {
        resolve(JSON.parse(output.trim()));
      } catch (e) {
        reject("JSON parse error");
      }

    });

  });

}

module.exports = runPython;