module.exports = app => {
  const repositories = require("../controllers/repository.controller.js");
  var router = require("express").Router();

  // Create a new repository
  router.post("/", repositories.create);

  // Retrieve all repositories
  router.get("/", repositories.findAll);

  // Retrieve a single repository with id
  router.get("/:id", repositories.findOne);

  // Update a repository with id
  router.put("/:id", repositories.update);

  // Delete a repository with id
  router.delete("/:id", repositories.delete);

  app.use("/api/repositories", router);
};
