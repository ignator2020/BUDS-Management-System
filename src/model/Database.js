const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/BudsData', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const Schema = mongoose.Schema;

const InstituteSchema = new Schema({
    id: String,     //id is assigned automatically from code. _id(<underscore>id) is the unique id of mongodb database
    name: String,
    district: String,
    lsgi: String,
    email: String,
    phone: String,
    type: String,
    approved: Boolean,
    img:{
        data: String,
        contentType: String
    }
});
const InstituteData = mongoose.model('institute',InstituteSchema);

const CredentialSchema = new Schema({
    id: String,
    email: String,
    password: String,
    role: String,        //admin, district or institute
    approved: Boolean
});
const CredentialData = mongoose.model('credential', CredentialSchema);

module.exports.InstituteData = InstituteData;
module.exports.CredentialData = CredentialData;