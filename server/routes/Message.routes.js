const Messages = require("../controllers/Message.controller");

module.exports = app => {
    app.post("/api/messages", Messages.addOne);
    app.get("/api/messages/", Messages.getAll)
    app.get("/api/messages/:userid", Messages.getUserMessage)
    app.get("/api/messages/:_id", Messages.getOne)
    app.delete("/api/messages/:_id", Messages.delete)
}