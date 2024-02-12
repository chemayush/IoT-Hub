const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Add your contact name"]
    },

    value: {
        type: 'Number'
    },

    desc: {
        type: String
    }
}, {timestamps: true});

const DEV = mongoose.model("Device", deviceSchema);
DEV.watch().on('change', data => console.log(data));
module.exports = DEV;
