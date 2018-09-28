const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blacklistVenueSchema = new Schema({
  svid:  String,
});

const svid = mongoose.model('blacklistVenue', blacklistVenueSchema);

const VenueBLModel = {
  
  addSVID(param) {
    return new Promise((resolve, reject) => {
      let newItem = new svid({
          svid: param
      });
  
      newItem.save((err) => {
          if (err) {
              console.log(err)
              reject(err)
              } else {
              resolve({'response': 'item blacklisted'})
          }
      })
    })
  },

  getAllTerms() {
    return new Promise((resolve, reject) => {
        svid.find((err, docs) => {
            if (err) {
                reject(err)
                } else {
                resolve(docs)
            }
        })
    })
  }

};

module.exports = VenueBLModel;