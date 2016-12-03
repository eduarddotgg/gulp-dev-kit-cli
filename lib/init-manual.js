const fs = require('fs-extra');
const inquirer = require('inquirer');
const path = require('path');
const questions = require('./questions.json');
const pjson = require('../project-config/package.json');
const config = require('../project-config/config.json');

module.exports = () => {
	let newPjson = pjson;
	let newConfig = config;

	inquirer.prompt(questions.mainQuestions).then( function (answers) {
		newPjson.name = answers.name;
		newPjson.version = answers.version;
		newPjson.author = answers.author;
		newPjson.license = answers.license;
		newPjson.description = answers.description;
		newPjson.repository = answers.repository;

		newConfig.sourceDir = answers.sourceDir;
		newConfig.publicDir = answers.publicDir;
		newConfig.host = answers.host;
		newConfig.port = answers.port;

		fs.copy(path.resolve(__dirname, '../project-environment'), '.', (err) => {
			if (err) {
				return console.error(err);
			}
		});

		fs.copy(path.resolve(__dirname, '../project-source'), answers.sourceDir, (err) => {
			if (err) {
				return console.error(err);
			}
		});

		fs.writeJson('./package.json', newPjson, (err) => {
			if (err) throw err;
		});

		fs.writeJson('./config.json', newConfig, (err) => {
			if (err) throw err;
		});

		console.log('\n------------------------------------------------------');
		console.log(pjson.name + ' is created!');
		console.log('Thank You for using GULP DEV KIT!');
		console.log('--------------------------------------------------------');
		console.log('Don\'t forget to run:');
		console.log('npm install or yarn install');
		console.log('--------------------------------------------------------');
		console.log('');
	});
};