const path = require('path');
const database = require('./db/connection')
const seperator = require('./worker')

module.exports = (app) => {

	app.get('/', (req, res) => {
        res.sendFile(path.join( __dirname, '../build/index.html'));
    });

    app.post('/blacklist_event', (req, res) => {
        database.addEventPhrase(req.body.data)
        .then((response) => res.send(response))
    });

    app.post('/blacklist_svid', (req, res) => {
        database.addSVID(req.body.data)
        .then((response) => res.send(response))
    });

    app.get('/get_all_blacklists', (req, res) => {
        let data
        Promise.all([database.getAllEventPhrases(), database.getAllSVID()])
        .then((values) => {
            data = seperator.main(values)
        })
        .then(() => {
            res.send(data)
        })
    });

}