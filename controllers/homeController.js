const Category = require("../models/category.model");
const Asset = require("../models/asset.model");
const NewAsset = require("../models/requestByNew.model");
const User = require("../models/user.model");
module.exports.getAllAssetAvailable = async (req, res) => {
  try { 
    const assets = await Asset.find({ State: "available" })
      .populate("Category")
      .limit(15);
    const listCategory = await Category.find({});
    const total = await Asset.find({ State: "available" })
      .populate("Category")
      .count();
    res.render("pages/user-home", {
      listAsset: assets,
      listCategory: listCategory,
      total: Math.ceil(total / 15),
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }};

module.exports.postRequestByAssetNew = async (req, res) => {
  try {
    const assets = await NewAsset.create({
      AssetName: req.body.AssetName,
      Category: req.body.Category,
    });
    res.status(200).json({
      status: "Create asset successfully",
      data: assets,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }};
  
module.exports.getFind = async (req, res) => {
  try {
    req.query.limit = req.query.limit ? req.query.limit : 15;
    const assets = await Asset.find({
      AssetName: { $regex: req.query.search, $options: "i" },
    })
      .populate("Category")
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);

    const listCategory = await Category.find({});
    const total = await Asset.find({
      AssetName: { $regex: req.query.search, $options: "i" },
    })
      .populate("Category")
      .count();
    res.status(200).render("components/user/user-search", {
      listAsset: assets,
      listCategory: listCategory,
      total: Math.ceil(total / 15),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getFindCategory = async (req, res) => {
  try {
    req.query.limit = req.query.limit ? req.query.limit : 15;
    const assets = await Asset.find({
      Category: req.query.search,
      State: "available",
      $options: "i",
    })
      .populate("Category")
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);

    const listCategory = await Category.find({});
    const total = await Asset.find({
      Category: req.query.search,
      State: "available",
      $options: "i",
    })
      .populate("Category")
      .count();
    res.status(200).render("components/user/user-category", {
      listAsset: assets,
      listCategory: listCategory,
      total: Math.ceil(total / 15),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getPagination = async (req, res) => {
  try {
    const listPagination = await Asset.find({ State: "available" })
      .populate("Category")
      .skip(req.query.limit * (req.query.page - 1))
      .limit(req.query.limit);
    const listCategory = await Category.find({});

    res.render("components/user/user-pagination", {
      listAsset: listPagination,
      listCategory: listCategory,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Internal Server",
    });
  }
};


module.exports.deleteAsset = async (req, res) => {
  try {
    const user = await Asset.findById(req.params.id);
    if (!user) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find user",
      });
    }

    await Asset.deleteOne({ _id: req.params.id });

    res.status(200).json({
      status: "success",
      message: "Delete user successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};

module.exports.getUserById2 = async (req, res) => {
  try {
    const user1 = await Asset.findOne({ _id: req.params.id });
    if (user1) {
      res.json(user1);
    } else {
      res.status(404).json({
        status: "Fail",
        message: "User not exists",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};


module.exports.updateAsset = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);

    if (!asset) {
      return res.status(400).json({
        status: "Fail",
        message: "Can not find asset",
      });
    }
    await Asset.updateOne({ _id: req.params.id }, req.body);
    const newAsset = await Asset.findOne({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: newAsset,
    });
  } catch (error) {
    res.status(500).json({
      status: "Fail",
      error,
    });
  }
};