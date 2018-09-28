const matchWorker = {

    svidCheck(eventTitle, eventID, venueID, blacklists) {
        if (blacklists.svids.includes(venueID)) {
            return true
        } else {
            return this.eventTitleCheck(eventTitle, blacklists.eventPhrases, eventID)
        }
    },

    eventTitleCheck(eventTitle, eventPhrases) {
        let result
        eventPhrases.forEach(item => {
            switch(true) {
                case (item === eventTitle):
                    result = true
                    break;
                default:
                    result = false
            }
        })
        return result
    },
    
}

module.exports = matchWorker;