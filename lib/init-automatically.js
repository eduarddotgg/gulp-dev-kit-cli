const fs = require('fs-extra');
const path = require('path');
const pjson = require('../project-config/package.json');

module.exports = () => {
	fs.copy(path.resolve(__dirname, '../project-environment'), '.', (err) => {
		if (err) {
			return console.error(err);
		}
	});

	fs.copy(path.resolve(__dirname, '../project-source'), './src', (err) => {
		if (err) {
			return console.error(err);
		}
	});

	fs.copy(path.resolve(__dirname, '../project-config'), '.', (err) => {
		if (err) {
			return console.error(err);
		}
	});

	console.log('\n------------------------------------------------------');
	console.log(pjson.name + ' is created!');
	console.log('Thank You for using GULP DEV KIT!');
	console.log('--------------------------------------------------------');
	console.log('Don\'t forget to run:');
	console.log('npm install or yarn install');
	console.log('--------------------------------------------------------');
	console.log('');
};