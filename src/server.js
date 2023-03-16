require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const swaggerUI = require("swagger-ui-express");
const cors = require("cors");

const PORT = 3000;
const app = express();

const { sequelize } = require("./api/models");

const apiDocs = require("./config/apidocs.json");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiDocs));

app.use(cors());
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./api/middleware/passport");

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("public"));
app.set("views", "./public/views");
app.set("view engine", "ejs");

app.use("/", require("./api/routes/layoutRoutes"));
app.use("/auth", require("./api/routes/authRoutes"));
app.use("/api/login", require("./api/routes/loginRoutes"));
app.use("/api", require("./api/routes/dataRoutes"));

app.listen(PORT, async () => {
	console.log(`Server running on port ${PORT}`);
	await sequelize.authenticate();
	console.log(`DB connected`);
});
