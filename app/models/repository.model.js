module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
          name: String,
          description: String,
          owner: String,
          url: String,
          created: Date,
          updated: Date
        },
        { timestamps: true }
    );

    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Repository = mongoose.model("repository", schema);
    return Repository;
  };