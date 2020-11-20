
const mongoose = require("mongoose")
const Schema = mongoose.Schema
let searchResultSchema = new Schema({
	positionName:String,
	education: String,
	jobNature: String,
	salary:String,
	financeStage:String,
	positionLables:Array,
	companyShortName:String,
	createTime:Date,
	city:String
})
module.exports = searchResultSchema