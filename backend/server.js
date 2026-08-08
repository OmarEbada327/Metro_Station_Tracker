const http = require("http");
const dotenv = require("dotenv");
const connectDB = require("./db/db");
const app = require("./app");
dotenv.config();

const PORT = process.env.PORT || 3000;
const server = http.createServer(app);

const startServer = async () => {
    await connectDB();

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();