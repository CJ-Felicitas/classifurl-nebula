const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  dateReported: {
    type: Date,
    required: true,
  },
  reportCount: {},
});

module.exports = mongoose.model("Report", reportSchema);
