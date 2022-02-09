const mongoose = require('mongoose');
const idValidator = require("mongoose-id-validator");

// timestamps: https://mongoosejs.com/docs/guide.html#timestamps
const ArticleSchema = mongoose.Schema({
  abstract: String,
  author: String,
  date: String,
  images: [String],
  main: String,
  title: String,
}, {
    timeStamps: true
});

ArticleSchema.plugin(idValidator);

module.exports = mongoose.model('Article', ArticleSchema);

/*
export class Article {
  _id: string = '';
  abstract: string = '';
  author: string = '';
  date: string = '';
  images: string[] = [];
  main: string = '';
  title: string = '';
}
*/