const mongoose = require("mongoose");
const Station = require("../models/stationModel");
const { MONGO_URI } = require("../config/config");

const seedStations = async () => {
    try {
        await mongoose.connect(MONGO_URI);

        await Station.deleteMany({});

        const stations = [
            { name: "Helwan", line: "Red", order: 1},
            { name: "Maddi", line: "Red", order: 2},
            { name: "Sadat", line: "Red", order: 3},
            { name: "Shohadaa", line: "Red", order: 4},
            { name: "El-Marg El-Jedida", line: "Red", order: 5},

            { name: "El-Mounib", line: "Orange", order: 1},
            { name: "Giza", line: "Orange", order: 2},
            { name: "Sadat", line: "Orange", order: 3},
            { name: "Attaba", line: "Orange", order: 4},
            { name: "Shubra El-Kheima", line: "Orange", order: 5},

            { name: "Cairo University", line: "Green", order: 1},
            { name: "Kit Kat", line: "Green", order: 2},
            { name: "Attaba", line: "Green", order: 3},
            { name: "Abbassiya", line: "Green", order: 4},
            { name: "Adly Mansour", line: "Green", order: 5},
        ];

        await Station.insertMany(stations);
        console.log("Stations Seeded Successfully");
    }catch (error) {
        console.error("Seed error:", error);
    }finally {
        await mongoose.disconnect();
    }
};

seedStations();