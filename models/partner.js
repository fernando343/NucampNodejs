const mongoose = require('mongoose');
const Schema = mongoose.Schema;

require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const PartnerSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    },
    description:{
        type: String,
        required: true
    }
})

const Partner = mongoose.model('Partner', PartnerSchema);

module.exports = Partner;