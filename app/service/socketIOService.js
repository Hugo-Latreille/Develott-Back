const { Server } = require("socket.io");

const startSocket = (server, db) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			// methods: ["GET", "POST"],
		},
	});

	io.on("connection", (socket) => {
		console.log(`User connected`, socket.id);

		socket.on("chat message", (msg) => {
			console.log("message: " + msg);
			socket.broadcast.emit("test", msg);
		});

		socket.on("disconnect", () => {
			console.log("user disconnected");
		});
	});
};

module.exports = { startSocket };
