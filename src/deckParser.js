const duoCardSepratorSymbol = "###"
const duoImageTag = "![image]("

const ParseCardContent = ({rawCardText}) =>{
    if(rawCardText.includes("![image]")){
        const tagBeginsIndex = rawCardText.indexOf(duoImageTag)
        const cardImageUrl = rawCardText.substring(tagBeginsIndex+duoImageTag.length,rawCardText.length-1); 
        const cardText = rawCardText.substring(0,tagBeginsIndex); 
        
        return {
            cardText,
            cardImageUrl
        }
    }
    return {
        cardText: rawCardText,
        cardImageUrl: '' 
    }
};


module.exports = ({cards,coverImage,description,name}) => {

    const flashCardDeck = {
        coverImage,
        description,
        name        
    }

    const separateCards = cards.split(duoCardSepratorSymbol).filter(Boolean); 

    const formattedCards = separateCards.map(card => {
        const splitContent = card.split("*"); 

        const frontContent = splitContent[1].substring(0,splitContent[1].search('\n')); 
        const backContent =  splitContent[2].substring(0,splitContent[2].search('\n')); 
        
        const cardFront = ParseCardContent({rawCardText: frontContent}); 
        const cardBack = ParseCardContent({rawCardText: backContent}); 

        return {
            cardFront,
            cardBack
        };
    })

    flashCardDeck.cards = formattedCards; 

    return flashCardDeck;     
}