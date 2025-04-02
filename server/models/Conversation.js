const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text :{
        type: String,
        required: true,
    },
    imageUrl :{
        type: String,   
        default: "",
    },
    vedioUrl : {
        type: String,
        default: "",
    },
    seen :{
        type: Boolean,
        default: false
    },
     msgByUserId : {
        type : mongoose.Schema.ObjectId,
        required : true,
        ref : 'User'
    }
},{timestamps: true})


const ConversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    receiver:{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User",
    },
    messages :[
        {
            type: mongoose.Schema.ObjectId,
            ref: "Message",
        }
    ]

},{timestamps: true}) 

const Message = mongoose.model("Message", messageSchema);
const Conversation = mongoose.model("Conversation", ConversationSchema);

module.exports = {Message, Conversation}