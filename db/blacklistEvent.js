const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blacklistEventSchema = new Schema({
  phrase: {},
});

const blacklistEvent = mongoose.model('blacklistEvent', blacklistEventSchema);

const EventBLModel = {
  
  addPhrase(param) {
    return new Promise((resolve, reject) => {
      let newItem = new blacklistEvent({
          phrase: param
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
        blacklistEvent.find((err, docs) => {
            if (err) {
                reject(err)
                } else {
                resolve(docs)
            }
        })
    })
  }

};

module.exports = EventBLModel;