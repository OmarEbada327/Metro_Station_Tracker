const { Server } = require("socket.io");

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        },
    });

    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("join_station", ({ stationId }) => {
            if (stationId) {
                socket.join(stationId);
                socket.emit("joined_station", { stationId });
            }
        });

        socket.on("leave_station", ({ stationId }) => {
            if (stationId) {
                socket.leave(stationId);
            }
        });

        socket.on("send_message", ({ stationId, message }) => {
            if (stationId && message) {
                io.to(stationId).emit("new_message", { 
                    stationId,
                    message,
                    senderId: socket.id
                });
            }
        });

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });
    return io;
};

module.exports = initializeSocket;