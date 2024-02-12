const Device = require('../models/deviceModel');
const asyncHandler = require('express-async-handler');

const getDevices = asyncHandler(async (req, res) => {
    const devices = await Device.find();
    res.json(devices).status(200);
    console.log(devices);
})

const getDevice = asyncHandler(async (req, res) => {
    const device = await Device.findById(req.params.id);

    if (!device) {
        console.log("Device Not Found");
        res.status(404);
    }

    res.json(device).status(200);
})

const createDevice = asyncHandler(async (req, res) => {
    const {name, value, desc} = req.body;
    console.log("body: ", req.body);

    if (!name) {
        res.status(404);
        throw new Error("All Fields Mandatory");
    }

    const device = await Device.create({
        name, value, desc
    });

    res.json(device).status(201);
})

const updateDevice = asyncHandler(async (req, res) => {

    const device = await Device.findById(req.params.id);
    const {id} = req.params;
    const {value} = req.body;

    if (!device) {
        res.status(404);
        throw new Error("Device Not Found");
    }

    const updatedDevice = await Device.findByIdAndUpdate(req.params.id, req.body, {new: true});
    const devicE = await Device.findById(req.params.id);

    res.json(updatedDevice).status(200);
    console.log(devicE);
})

const deleteDevice = asyncHandler(async (req, res) => {
    const device = await Device.findById(req.params.id);

    if (!device) {
        res.status(404);
        throw new Error("Device Not Found");
    }

    await Device.deleteOne({_id: req.params.id});
    res.json(device).status(200);
})

module.exports = {getDevices, getDevice, createDevice, updateDevice, deleteDevice};