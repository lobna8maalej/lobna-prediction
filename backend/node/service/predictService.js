const { spawn } = require("child_process");
const path = require("path");

const predict = (features) => {
    return new Promise((resolve, reject) => {

        const pythonPath = path.resolve(
            __dirname,
            "../../python/model_service.py" // adapte si nécessaire
        );

        console.log("Python Path:", pythonPath);

        const python = spawn("python", [pythonPath]);

        let result = "";
        let error = "";

        python.stdout.on("data", (data) => {
            result += data.toString();
        });

        python.stderr.on("data", (data) => {
            console.log("PYTHON STDERR:", data.toString());
            error += data.toString();
        });

        python.on("error", (err) => {
            reject(`Erreur spawn : ${err.message}`);
        });

        python.on("close", (code) => {

            console.log("Exit code:", code);
            console.log("Result:", result);

            try {

                if (!result.trim()) {
                    return reject("Aucune réponse reçue du script Python");
                }

                const parsedResult = JSON.parse(result);

                resolve(parsedResult);

            } catch (err) {

                reject(
                    `Erreur JSON : ${err.message}\nRéponse Python : ${result}`
                );

            }
        });

        python.stdin.write(
            JSON.stringify({
                features: features
            })
        );

        python.stdin.end();
    });
};

module.exports = { predict };