const {Schema, model} = require("mongoose");
const autopopulate = require("mongoose-autopopulate");

const researchSchema = Schema({
    title: {
        type: String,
    },
    publishYear: {
        type: String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        autopopulate: {select: 'name'}
    },
    description: {
        type: String
    },
    addedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        autopopulate: {select: 'title'}
    },


}, {timestamps: true});

researchSchema.plugin(autopopulate);
module.exports = model("ResearchPaper", researchSchema);