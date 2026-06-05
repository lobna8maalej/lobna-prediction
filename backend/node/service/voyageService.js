const { spawn } = require("child_process");

function runVoyagePython(inputData) {

  return new Promise((resolve, reject) => {

    const py = spawn("python", ["python/voyage.py"]);

    let output = "";
    let error = "";

  
    py.stdin.write(JSON.stringify(inputData));
    py.stdin.end();

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      console.error("PYTHON ERROR DETAILS:", data.toString());
      error += data.toString();
    });

    py.on("close", (code) => {

      console.log("EXIT CODE:", code);
      console.log("STDOUT:", output);
      console.log("STDERR:", error);

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

module.exports = { runVoyagePython };