const { Server } = require("socket.io");

const startSocket = (server, db) => {
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
			// methods: ["GET", "POST"],
		},
	});

	io.use((socket, next) => {
		const userId = socket.handshake.auth.userId;
		if (!userId) {
			return next(new Error("invalid userId"));
		}
		socket.userId = userId;
		next();
	});

	io.on("connection", async (socket) => {
		console.log(`User connected`, socket.id, socket.userId);
		const sockets = await io.fetchSockets();
		const users = [];

		for (const socket of sockets) {
			users.push({
				socketId: socket.id,
				userId: socket.userId,
			});
		}

		io.emit("users", users);

		socket.broadcast.emit("user connected", {
			socketId: socket.id,
			userId: socket.userId,
		});

		// socket.on("chat message", (msg) => {
		// 	console.log("message:", msg, socket.id);
		// 	socket.broadcast.emit("test", msg);
		// });

		socket.on("disconnect", () => {
			console.log("user disconnected");
			socket.broadcast.emit("deco", {
				userId: socket.userId,
			});
		});
	});
};

module.exports = { startSocket };

//TODO
//TODO Table message : senderId(userId), receiverId(userId), message(text), GroupChat (boolean)
