const fs = require('fs');
const neatCsv = require('neat-csv');
const deckParser = require('./deckParser.js');


module.exports = ({app}) => {
    app.post(`/duolingo/deck/conversion`, async(req,res) => {
        try{
            //const csvReadStream = await fs.createReadStream(req.files.dulingoDeckCsvFile.data);
           const dulingoDecks = await neatCsv(req.files.dulingoDeckCsvFile.data); 

           const usableDecks = dulingoDecks.map(deck => deckParser(deck)); 

            return res.status(200).json({
                usableDecks
            }); 
        } catch(e){
            
            return res.status(500).json({
                message: "Something has gone wrong.",
                error: e
            })
        }

    }); 

}