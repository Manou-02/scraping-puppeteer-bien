const puppeteer = require('puppeteer');
const endpoints = require('../../../../utils/endpoints');


module.exports.locationbienici = async (req, res, next) => {
    const url = endpoints.locationFrance.url + 1    

    try{

        (async () => {
            const browser = await puppeteer.launch({
                "dumpio": true,
                "headless": true,
                "executablePath": '/usr/bin/chromium',
                "args": [
                    '--disable-setuid-sandbox',
                    '--no-sandbox',
                    '--disable-gpu',
                ]
            })
            const page = await browser.newPage();
            await page.setDefaultNavigationTimeout(0); 

            await page.goto(url,{
                //effacer le timeout et atterndre jusqu'à la recuperation des données
                waitUntil : 'load',
                timeout : 0
            });
            

            const location = await page.evaluate(() => {
                let data = [];
                let elements = document.querySelectorAll("article.sideListItem");
                
                for(element of elements){
                    data.push({
                        titre : element.querySelector('.detailsContainer  h3.descriptionTitle')?.textContent.split('m²')[0].concat(" m²"),
                        adresse : element.querySelector('.detailsContainer h3.descriptionTitle span')?.textContent,
                        prix : element.querySelector('.detailsContainer div.price span.thePrice')?.textContent,
                        prixDetail : element.querySelector('.detailsContainer div.price span.perMonth')?.textContent,
                        description : element.querySelector('.detailsContainer div.descriptionContent')?.textContent.split('\n').join(' ')
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
