const Message = require('../models/Message.model');

class MessageController{
    getAll(req, res){
        Message.find({}).sort("-createdAt").exec()
            .then(Messages => res.json(Messages))
            .catch(err => res.json(err));
    }
    addOne(req, res){
        const newMessage = new Message(req.body);
        newMessage.save()
        .then(()=> res.json({msg: "Message added"}))
        .catch(err => res.json(err));
    }
    getUserMessage(req, res){
        Message.find({getuserID: req.params.userid}).sort("-createdAt").exec()
            .then(Message => res.json(Message))
            .catch(err => res.json(err));
    }
    getOne(req, res){
        Message.findOne({_id: req.params._id})
            .then(option => res.json(option))
            .catch(err => res.json(err));
    }
    delete(req, res){
        Message.findOneAndDelete({_id: req.params._id})
            .then(() => res.json({msg: "Deleted "}))
            .catch(err => res.json(err));
    }
}

module.exports = new MessageController()
