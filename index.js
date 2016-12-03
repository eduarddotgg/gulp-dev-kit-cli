const extfs = require('extfs');
const chalk = require('chalk');
const inquirer = require('inquirer');
const questions = require('./lib/questions.json');
const initAuto = require('./lib/init-automatically.js');
const initManual = require('./lib/init-manual.js');

module.exports = () => {
	if (extfs.isEmptySync('./')) {
		inquirer.prompt(questions.initType).then(function (answers) {
			if (answers.init) {
				initAuto();
			} else {
				initManual();
			}
		});
	} else {
		console.log('\n------------------------------------------------------');
		console.log(chalk.red('Looks like folder is NOT EMPTY!'));
		console.log(chalk.red('Please make sure project folder is empty!'));
		console.log('--------------------------------------------------------');
		console.log('');
	}
};