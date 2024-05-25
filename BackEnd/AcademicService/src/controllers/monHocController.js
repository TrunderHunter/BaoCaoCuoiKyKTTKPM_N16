import monHocRepository from "../repositories/monHocRepository.js";

let createMonHoc = async (req, res) => {
  try {
    let result = await monHocRepository.createMonHoc(req.body);
    res.status(201).json({
      message: "Create successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create failed",
      error: error,
    });
  }
};

let getMonHocTienQuyet = async (req, res) => {
  try {
    let result = await monHocRepository.getMonHocTienQuyet(req.params.maMonHoc);
    res.status(200).json({
      message: "Get successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get failed",
      error: error,
    });
  }
};

let getAllMonHoc = async (req, res) => {
  try {
    let result = await monHocRepository.getAllMonHoc();
    res.status(200).json({
      message: "Get successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Get failed",
      error: error,
    });
  }
};

export default {
  createMonHoc,
  getMonHocTienQuyet,
  getAllMonHoc,
};
