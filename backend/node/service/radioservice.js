const { spawn } = require("child_process");
const path = require("path");

function runPythonPlots() {
  return new Promise((resolve, reject) => {

    console.log("RADIOSERVICE LOADED");

    // ✅ FIX IMPORTANT : chemin correct vers python/radio.py
    const py = spawn("python", [
      path.join(__dirname, "../../python/radio.py")
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
        const cleanOutput = output.toString().trim();
        resolve(JSON.parse(cleanOutput));
      } catch (e) {
        console.log("RAW OUTPUT:", output);
        reject("Invalid JSON from Python");
      }
    });

  });
}

module.exports = { runPythonPlots };