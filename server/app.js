const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql');
const fs = require('fs');
// // const bodyParser = require('body-pareser');
// // const body = bodyParser.json();
const dbConnection = mysql.createConnection({
	user: 'root',
	password: 'Hey! What are you looking at? Shame!!' 
});
// const schema = require('../database/schema.sql');
dbConnection.query('USE game_state', () => {
		console.log('Using game_state database');
});

// // // post request
// // const handePostRequest = () => {

// // }
// // // get request
// // const handleGetRequest = () => {
// // 	console.log('hello from server!');
// // }

// app.listen(port, () => console.log('listening on port', port));


app.get('/', (req, res) => {
	dbConnection.query('SELECT * FROM current_state', (error, results) => {
		if(error) {
			res.send(JSON.stringify(error));
		}
		res.send(JSON.stringify(results));
	});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))