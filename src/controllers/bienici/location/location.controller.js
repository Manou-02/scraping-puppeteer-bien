const puppeteer = require('puppeteer');
const endpoints = require('../../../../utils/endpoints')
const initialisePage = require('../../../../utils/initialisePage');

module.exports.locationbienici = async (req, res, next) => {
    const url = endpoints.locationFrance.url    
    try{

        (async () => {
            const page = await initialisePage(url);

            const location = await page.evaluate(() => {
                let data = [];
                let elements = document.querySelectorAll("article.sideListItem");
                
                for(element of elements){
                    data.push({
                        titre : element.querySelector('.detailsContainer  h3.descriptionTitle')?.textContent.split('m²')[0].concat(" m²"),
                        adresse : element.querySelector('.detailsContainer h3.descriptionTitle span')?.textContent,
                        prix : element.querySelector('.detailsContainer div.price span.thePrice')?.textContent,
                        prixDetail : element.querySelector('.detailsContainer div.price span.perMonth')?.textContent,
                        description : element.querySelector('.detailsContainer div.descriptionContent')?.textContent.split('\n').join(' '),
                        url : element.querySelector('.sideListItemContainer .detailsContainer .details a.detailedSheetLink').href
                    });
                }   
                // console.log(data);
                return data;
            });
            console.log({data : location});
            return res.json({data : location});
        })();


    }catch(err){
        console.log(`Erreur lors de la recuperation des données`);
    }
}


module.exports.getDetailLocationBienici = async () => {
    try{
        
    }catch(err){
        console.log(err);
    }
}