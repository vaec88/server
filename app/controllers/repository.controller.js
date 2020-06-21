const db = require("../models");
const Repository = db.repositories;

// Create and save a new Repository
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not by empty" });
    return;
  }

  // Create a repository
  const repository = new Repository({
    name: req.body.name,
    description: req.body.description,
    owner: req.body.owner,
    url: req.body.url,
    created: req.body.created,
    updated: req.body.updated
  });

  // Save a repository
  repository
    .save(repository)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error ocurred while creating the Repository"
      });
    });
};

// Retrive all Repositories from the database
exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Repository.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving repositories"
      });
    });
};

// Find a single repository with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Repository.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found repository with id: ${id}` });
      else
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: `Error retrieving repository with id: ${id}`
      });
    });
};

// Update a Repository by the id
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty"
    });
  }

  const id = req.params.id;
  Repository.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: `Cannot update repository with id: ${id}. The repository was not found`});
      } else {
        res.send({ message: "Repository was updated successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating repository with id: ${id}`
      });
    });
};

// Delete a Repository with the specific id
exports.delete = (req, res) => {
  const id = req.params.id;

  Repository.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete repository with id: ${id}. The repository was not found`
        });
      } else {
        res.send({ message: "Repository was deleted successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete repository with id: ${id}`
      });
    });

};
