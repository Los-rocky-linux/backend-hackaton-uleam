const catchControllerAsync = require("../utils/catch-controller-async");
const { appResponse } = require("../utils/app-response");

module.exports = class BaseController {
  constructor(service) {
    this.service = service;
  }

  getOne = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    const result = await this.service.getOne(id);
    return appResponse(res, {
      statusCode: 200,
      status: "success",
      message: "Entity fetched successfully",
      data: result,
    });
  });

  getAll = catchControllerAsync(async (req, res) => {
    const { page, limit } = req.query;
    const result = await this.service.getAll(limit, page);
    return appResponse(res, {
      statusCode: 200,
      status: "success",
      message: "Entities fetched successfully",
      data: result,
    });
  });

  create = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const result = await this.service.create(body);
    return appResponse(res, {
      statusCode: 201,
      status: "success",
      message: "Entity created successfully",
      data: result,
    });
  });

  update = catchControllerAsync(async (req, res) => {
    const { body } = req;
    const { id } = req.params;
    const result = await this.service.update(id, body);
    return appResponse(res, {
      statusCode: 200,
      status: "success",
      message: "Entity updated successfully",
      data: result,
    });
  });

  delete = catchControllerAsync(async (req, res) => {
    const { id } = req.params;
    await this.service.delete(id);
    return appResponse(res, {
      statusCode: 204,
      status: "success",
      message: "Entity deleted successfully",
      data: null,
    });
  });
};
