const Rooms = require("../controllers/Room.controller");

module.exports = app => {
    app.post("/api/rooms", Rooms.addOne);
    app.get("/api/rooms/", Rooms.getAll)
    app.get("/api/rooms/:_id", Rooms.getOne)
    app.delete("/api/rooms/:_id", Rooms.delete)
}