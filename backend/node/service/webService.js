const { spawn } = require("child_process");

function runPython(inputData) {

  return new Promise((resolve, reject) => {

    if (!inputData) {
      return reject("inputData is undefined");
    }

    const py = spawn("python", ["python/web.py"]);

    let output = "";
    let error = "";

    py.stdin.write(JSON.stringify(inputData));
    py.stdin.end();

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
      console.error("PYTHON STDERR:", data.toString());
    });

    py.on("close", (code) => {

      console.log("EXIT CODE:", code);
      console.log("OUTPUT:", output);
      console.log("ERROR:", error);

      if (code !== 0) {
        return reject(error || output || "Python crashed");
      }

      try {
        resolve(JSON.parse(output.trim()));
      } catch (e) {
        reject("JSON parse error: " + e);
      }

    });

  });
}

module.exports = { runPython };