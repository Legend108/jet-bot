const express = require('express');
const bodyparser = require('body-parser');
const Discord = require('discord.js');
const morgan = require('morgan');
const fs = require('fs');
const handler = require('./handler');
const api = express();
const session = require('express-session');
const passport = require('passport');
const DiscordStrategy = require('passport-discord');

module.exports = {
	dashboard: (client) => {

		api.set("view engine", "ejs");


		api.use(morgan("dev"));

		api.use(bodyparser.json());

		api.use(bodyparser.urlencoded({
			extended: true,
		}));

		api.use(
			session({
				cookie: { maxAge: 86400000 },
				secret: process.env.secret,
				secure: false,
				resave: false,
				saveUninitialized: false,
			})
		);

		api.use(passport.initialize());

		api.use(passport.session());

		passport.serializeUser(function (user, done) {
			done(null, user);
		});
		passport.deserializeUser(function (obj, done) {
			done(null, obj);
		});

		var scopes = ['identify', 'guilds'];
		var prompt = 'consent';

		passport.use(new DiscordStrategy({
			clientID: process.env.clientId,
			clientSecret: process.env.clientSecret,
			callbackURL: process.env.cbUrl,
			scope: scopes,
			prompt: prompt,
		}, function (accessToken, refreshToken, profile, done) {
			process.nextTick(function () {
				return done(null, profile);
			});
		}));

		api.get('/', passport.authenticate('discord', { scope: scopes, prompt: prompt }), function (req, res) { });
		api.get('/callback',
			passport.authenticate('discord', { failureRedirect: '/' }), function (req, res) { res.redirect('/dashboard') } // auth success
		);

		api.use((req, res) => {
			res.redirect("/dashboard");
		});

		api.listen(process.env.port, () => {
			console.log("Listening to port: " + process.env.port);
		});

		handler.build(api, client);
	}
}
