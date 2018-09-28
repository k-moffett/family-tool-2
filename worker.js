const seperator = {

    main(data) {
        let eventPhrases = []
        let svids = []
        let allBlacklists = {
            eventPhrases: eventPhrases,
            svids: svids
        }
          data[0].map((item) => {eventPhrases.push(item.phrase)})
          data[1].map((item) => svids.push(item.svid))
          
          return allBlacklists
    }

}

module.exports = seperator;