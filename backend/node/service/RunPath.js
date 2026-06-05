
const { spawn } = require("child_process");
const path = require("path");

function runPython(scriptName, input = {}) {
  return new Promise((resolve, reject) => {

    const scriptPath = path.join(__dirname, "..", scriptName);

    const py = spawn("python", [scriptPath]);

    let output = "";

    // envoyer JSON vers Python
    py.stdin.write(JSON.stringify(input));
    py.stdin.end();

    // récupérer stdout
    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    // debug erreurs Python
    py.stderr.on("data", (err) => {
      console.log("PYTHON ERROR:", err.toString());
    });

    py.on("close", () => {

      console.log("RAW OUTPUT:", output);

      if (!output || output.trim() === "") {
        return reject("Empty output from Python");
      }

      try {
        resolve(JSON.parse(output));
      } catch (e) {
        reject("JSON error: " + e + " | OUTPUT: " + output);
      }

    });

  });
}

module.exports = RunPath;