const mongoose = require("mongoose")
const searchResultSchema = require("../Schema/searchresult.js")
const SearchResult = mongoose.model('SearchResult',searchResultSchema)
module.exports = SearchResult

