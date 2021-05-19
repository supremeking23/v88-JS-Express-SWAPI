const EXPRESS = require("express");
const APP = EXPRESS();
const PORT = 8080;
const AXIOS = require("axios");

let bodyParser = require("body-parser");

const CORSE = require("cors");
APP.use(CORSE());

APP.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
APP.use(bodyParser.json());

// for image/js/css
APP.use(EXPRESS.static(__dirname + "/static"));
// This sets the location where express will look for the ejs views
APP.set("views", __dirname + "/views");
// Now lets set the view engine itself so that express knows that we are using ejs as opposed to another templating engine like jade
APP.set("view engine", "ejs");
// use app.get method and pass it the base route '/' and a callback

APP.get("/", (req, res) => {
	res.render("index");
});

APP.get("/people", function (req, res) {
	// use the axios .get() method - provide a url and chain the .then() and .catch() methods
	let pageId = req.params.pageId == undefined ? 1 : req.params.pageId;
	AXIOS.get(`https://swapi.dev/api/people/?page=${pageId}`)
		.then((data) => {
			console.log("dito succee");
			console.log(data);

			res.json(data.data);
		})
		.catch((error) => {
			console.log("dito");
			console.log(error);
			res.json(error);
		});
});

APP.get("/planets", function (req, res) {
	// use the axios .get() method - provide a url and chain the .then() and .catch() methods
	AXIOS.get(`https://swapi.dev/api/planets`)
		.then((data) => {
			console.log(data);

			res.json(data.data);
		})
		.catch((error) => {
			console.log("dito");
			console.log(error);
			res.json(error);
		});
});

APP.post("/next", function (req, res) {
	AXIOS.get(req.body.next)
		.then((data) => {
			res.json(data.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

APP.post("/previous", function (req, res) {
	AXIOS.get(req.body.previous)
		.then((data) => {
			res.json(data.data);
		})
		.catch((error) => {
			res.json(error);
		});
});

// APP.post("/retrieve-all", function (req, res) {
// 	AXIOS.get(`https://swapi.dev/api/planets/61`)
// 		.then((data) => {
// 			res.json(data.data);
// 		})
// 		.catch((error) => {
// 			res.json(error);
// 		});
// });

// APP.post("/process_form", (req, res) => {
// 	console.log(req.body);
// 	req.session.survey_information = req.body;
// 	res.redirect("/result");
// });

// APP.get("/result", (req, res) => {
// 	if (req.session.survey_information === undefined) res.redirect("/");
// 	res.render("result", { user: req.session.survey_information });
// });

APP.listen(PORT, (req, res) => {
	console.log(`Server is listening to ${PORT}`);
});
