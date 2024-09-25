const express = require("express");
const Blogs = require("../models/blogModel");

const createBlog = async (req, res) => {
  try {
    const blog = await Blogs.create(req.body);
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blogs.find({});
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blogs.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ message: `No blog found with the id ${id}` });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blogs.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  deleteBlog,
};
