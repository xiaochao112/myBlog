const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	path: { type: String, required: true },
	// name: { type: String, required: true },
	component: { type: String, required: true },
	children: [{
		path: String,
		name: String,
		component: String,
		meta: {
			keeAlive: Boolean,
			title: String,
			icon: String
		}
	}],
	meta: {
		title: String,
		icon: String
	}
})

module.exports = mongoose.model('AutoRoutes', schema)