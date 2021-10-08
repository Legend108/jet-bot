const express = require('express')
const api = express.Router();
const { readdir } = require('fs');
const chalk = require('chalk');
const ascii = require('ascii-table');
const table = new ascii('Routes');
const { Client } = require('discord.js');

/* 
@param {Client} client
@param {api} api
*/

module.exports = {
	build: (api, client) => {
		readdir("./api/routes", (err, data) => {
			if (err) throw err;
			else
				data.forEach(f => {
					const file = require(`../routes/${f}`);

					if (!file.checkAuth && !file.post) {
						api.get(file.path, (req, res, next) => {
							file.route(req, res, client);
						});
					} else if (file.checkAuth && !file.post) {
						api.get(file.path, checkAuth, (req, res) => {
							file.route(req, res, client);
						});
					} else if(file.post && file.checkAuth) {
						api.post(file.path, checkAuth, (req, res) => {
							file.route(req, res, client);
						});
					} else if(file.post && !file.checkAuth) {
						api.post(file.path, (req, res) => {
							file.route(req, res, client);
						});
					}

					function checkAuth(req, res, next) {
						if (req.isAuthenticated()) return next();
						res.redirect("/home");
					}

					table.setHeading('Routes');
					table.addRow(file.path);
				});

			console.log(chalk.green(table.toString()));
			console.log(chalk.bgGreen("Loaded " + data.length + " routes"))
		})
	}
}
