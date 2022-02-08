const Plant = require('../../models/article.model');

//exports.create = articleData => {
//    const article = new article(articleData);
//    return article.save();
//};

exports.findAll = () => Article.find().populate('articles');

exports.findOne = id => Article.findById(id).populate('articles');

//exports.update = (id, updateData) => Plant.findByIdAndUpdate(id, updateData, {new: true});

//exports.delete = id => Plant.findByIdAndRemove(id);
