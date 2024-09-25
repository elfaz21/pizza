const express = require("express");
const Booked = require("../models/bookedModel");

const createAppointment = async (req, res) => {
  try {
    const booked = await Booked.create(req.body);
    res.status(200).json(booked);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const Appointments = await Booked.find({});
    res.status(200).json(Appointments);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const Appointment = await Booked.findById(id);
    if (!Appointment) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(Appointment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const Appointment = await Booked.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!Appointment) {
      return res
        .status(404)
        .json({ message: `No user found with the id ${id}` });
    }
    res.status(200).json(Appointment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const Appointment = await Booked.findByIdAndDelete(id);
    if (!Appointment) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(Appointment);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
};
