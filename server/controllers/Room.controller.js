const Room = require('../models/Room.models');

class RoomController{
    getAll(req, res){
        Room.find({}).sort("-createdAt").exec()
            .then(Rooms => res.json(Rooms))
            .catch(err => res.json(err));
    }
    addOne(req, res){
        const newRoom = new Room(req.body);
        newRoom.save()
        .then(()=> res.json({msg: "Room added"}))
        .catch(err => res.json(err));
    }
    getOne(req, res){
        Room.findOne({_id: req.params._id})
            .then(option => res.json(option))
            .catch(err => res.json(err));
    }
    delete(req, res){
        Room.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Deleted "}))
            .catch(err => res.json(err));
    }
}

module.exports = new RoomController()
