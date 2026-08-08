const Announcement = require("../models/announcementModel");
const Station = require("../models/stationModel");

const getAnnouncementsByStation = async (stationId, query = {}) => {
    const station = await Station.findById(stationId);

    if (!station) {
        const error = new Error("Station not found");
        error.statusCode = 404;
        throw error;
    }

    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const filter = { stationId };

    if (query.search) {
        filter.text = { $regex: query.search, $options: "i" };
    }

    const [announcements, total] = await Promise.all([
        Announcement.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
        Announcement.countDocuments(filter)
    ]);

    return {
        data: announcements,
        pagination: { total, page, limit, pages: Math.ceil(total/limit) }
    };
};

const createAnnouncement = async ({ text, stationId, createdBy }) => {
    const station = await Station.findById(stationId);

    if(!station) {
        const error = new Error("Station not found");
        error.statusCode = 404;
        throw error;
    }

    const announcement = await Announcement.create({
        text,
        stationId,
        createdBy: createdBy || "admin",
    });

    return announcement;
};

module.exports = { getAnnouncementsByStation, createAnnouncement };