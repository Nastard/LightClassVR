// Load required modules
const path = require("path");
const express = require("express");           // web framework external module
const socketIo = require("socket.io");        // web socket external module
const easyrtc = require("open-easyrtc");      // EasyRTC external module
const https = require("https");
const fs = require("fs");
const privateKey = fs.readFileSync("./server/certs/cert.key", "utf8");
const certificate = fs.readFileSync("./server/certs/cert.crt", "utf8");
const credentials = { key: privateKey, cert: certificate };
const htmlFolder = "html"

// Set process name
process.title = "networked-aframe-server";

// Get port or default to 443
const port = process.env.PORT || 4433;

// Setup and configure Express http server.
const app = express();

// Serve the bundle in-memory in development (needs to be before the express.static)
if (process.env.NODE_ENV === "development") {
	const webpackMiddleware = require("webpack-dev-middleware");
	const webpack = require("webpack");
	const config = require("../webpack.config");

	app.use(
		webpackMiddleware(webpack(config), {
			publicPath: "/dist/"
		})
	);
}

// Serve the files from the examples folder
app.use(express.static(path.resolve(__dirname, "..", htmlFolder)));

// Start Express https server
const webServer = https.createServer(credentials, app);

// Start Socket.io so it attaches itself to Express server
const socketServer = socketIo.listen(webServer, {"log level": 1});
const myIceServers = [
	{"urls":"stun:stun1.l.google.com:19302"},
	{"urls":"stun:stun2.l.google.com:19302"},
];
easyrtc.setOption("appIceServers", myIceServers);
easyrtc.setOption("logLevel", "debug");
easyrtc.setOption("demosEnable", false);

// Overriding the default easyrtcAuth listener, only so we can directly access its callback
easyrtc.events.on("easyrtcAuth", (socket, easyrtcid, msg, socketCallback, callback) => {
	easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, (err, connectionObj) => {
		if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
			callback(err, connectionObj);
			return;
		}

		connectionObj.setField("credential", msg.msgData.credential, {"isShared":false});
		console.log("["+easyrtcid+"] Credential saved!", connectionObj.getFieldValueSync("credential"));
		callback(err, connectionObj);
	});
});

// To test, lets print the credential to the console for every room join!
easyrtc.events.on("roomJoin", (connectionObj, roomName, roomParameter, callback) => {
	console.log("["+connectionObj.getEasyrtcid()+"] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
	easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
});

// Start EasyRTC server
easyrtc.listen(app, socketServer, null, (err, rtcRef) => {
	console.log("Initiated");

	rtcRef.events.on("roomCreate", (appObj, creatorConnectionObj, roomName, roomOptions, callback) => {
		console.log("roomCreate fired! Trying to create: " + roomName);
		appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
	});
});

// Listen on port
webServer.listen(port, () => {
	console.log("listening on https://localhost");
	//console.log("listening on https://localhost:" + port);
});
