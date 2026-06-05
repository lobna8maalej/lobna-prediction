const { spawn } = require("child_process");



async function trainCommerce() {
  return {
    message: "Commerce trained",
    rowsInserted: 5,
    data: [
      
      {
        id: 1,
        commerce: "Ebay",
        web_scraper: "Jumia",
        target: 300,
        prix: 250
      },
      

    
      {
        id: 2,
        commerce: "Jumia",
        web_scraper: "Jumia",
        target: 350,
        prix: 320
      },

      
      {
        id: 3,
        commerce: "MG",
        web_scraper: "MG",
        target: 400,
        prix: 380
      }
    ]
  };
}



function runCommercePython() {
  return new Promise((resolve, reject) => {
    const python = spawn("python", ["commerce.py"]);

    let result = "";

    python.stdout.on("data", (data) => {
      result += data.toString();
    });

    python.stderr.on("data", (data) => {
      console.error(data.toString());
    });

    python.on("close", (code) => {
      if (code !== 0) {
        return reject(new Error("Python script failed"));
      }
      resolve(result);
    });

    python.on("error", (err) => {
      reject(err);
    });
  });
}



module.exports = {
  trainCommerce,
  runCommercePython
};
        