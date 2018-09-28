const mongoose = require('mongoose');
const EventBLModel = require('./blacklistEvent')
const VenueBLModel = require('./blacklistVenue')
 
mongoose.connect('mongodb://localhost/family-tool', { useNewUrlParser: true });

const database = {

    addEventPhrase(param) {
        return new Promise((resolve, reject) => {
            EventBLModel.addPhrase(param)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        }) 
    },

    addSVID(param) {
        return new Promise((resolve, reject) => {
            VenueBLModel.addSVID(param)
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                reject(err)
            })
        }) 
    },

    getAllEventPhrases() {
        return new Promise((resolve, reject) => {
            EventBLModel.getAllTerms()
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
        })
        
    },

    getAllSVID() {
        return new Promise((resolve, reject) => {
            VenueBLModel.getAllTerms()
            .then((res) => {
                resolve(res)
            })
            .catch((err) => {
                console.log(err)
                reject(err)
            })
        })
    }
}

module.exports = database;