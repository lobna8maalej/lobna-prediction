const { spawn } = require("child_process");

function runPython(inputData) {

  return new Promise((resolve, reject) => {

    const py = spawn("python", ["./python/banque.py"]);

    let output = "";

    py.stdin.write(JSON.stringify(inputData));
    py.stdin.end();

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      console.log("PY ERROR:", data.toString());
    });

    py.on("close", () => {

      try {
        resolve(JSON.parse(output.trim()));
      } catch (e) {
        reject("JSON error: " + e);
      }

    });

  });

}

module.exports = { runPython };