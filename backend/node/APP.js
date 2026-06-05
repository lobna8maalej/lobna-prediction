require("dotenv").config();

const express = require("express");
const cors = require("cors");

const { sequelize } = require("./config/db");

const app = express();

/* =========================
   MIDDLEWARES
========================= */

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const PORT = process.env.PORT || 3000;

console.log("ML PLATFORM STARTED");

/* =========================
   ROUTES
========================= */

app.use(
  "/info",
  require("./Routes/infoRoute")
);

app.use(
  "/commerce",
  require("./Routes/commerceRoute")
);

app.use(
  "/",
  require("./Routes/immobiliereRoute")
);

app.use(
  "/plot",
  require("./Routes/plotRoutes")
);

app.use(
  "/etude",
  require("./Routes/etudeEtrangerRoute")
);

app.use(
  "/kantra",
  require("./Routes/kantraRoute")
);

app.use(
  "/parapharma",
  require("./Routes/parapharmaRoute")
);

app.use(
  "/radio",
  require("./Routes/radioRoute")
);

app.use(
  "/sanitaire",
  require("./Routes/sanitaireRoute")
);

app.use(
  "/transaction",
  require("./Routes/transactionRoute")
);

app.use(
  "/vetement",
  require("./Routes/vetementRoute")
);

app.use(
  "/voyage",
  require("./Routes/voyageRoute")
);

app.use(
  "/web",
  require("./Routes/webRoute")
);

app.use(
  "/server",
  require("./Routes/serverRoute")
);

app.use(
  "/banque",
  require("./Routes/banqueRoutes")
);

app.use(
  "/predict",
  require("./Routes/predictRoutes")
);

app.use(
  "/CA",
  require("./Routes/CARoute")
);

app.use(
  "/api/users",
  require("./Routes/userRoute")
);

app.use(
  "/api",
  require("./Routes/adminRoutes")
);

/* =========================
   FLOUCI ROUTES
========================= */

// DATABASE CONNECTION

sequelize
  .authenticate()

  .then(() => {

    console.log("DB connected");

    return sequelize.sync({
      alter: true,
    });

  })

  .then(() => {

    console.log("Tables synced");

    app.listen(PORT, () => {

      console.log(
        `Server running on http://localhost:${PORT}`
      );

    });

  })

  .catch((err) => {

    console.error(
      "DB connection error:",
      err
    );

  });