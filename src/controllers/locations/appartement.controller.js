const endpoints = require("../../../utils/endpoints");
const puppeteer = require('puppeteer');



module.exports.getLocationAppartementParis = async (req, res, next) => {
    // res.json(endpoints.locationAppartement.paris);
    const url = endpoints.locationAppartement.paris;

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
                

            const locationAppartement = await page.evaluate(() => {
                let data = []
                let elements = document.querySelectorAll('html body#public.hpContentEnabled.applicationSideMenuClose.listMapFilter div#loader.mainPageContainer div#searchSideView.fullWidth.listResults div.searchResultsContainerConstantWidth div#searchResultsContainer div#searchResultsContainerList.animEnabled section#searchResults.photos.filterActive div.sideListContainer div.resultsListContainer article.sideListItem');
                for(element of elements){
                    data.push({
                        titre : element.querySelector('div.details span.generatedTitleWithHighlight')?.textContent,
                        departement : "",
                        communne : "",
                        codePostale : "",
                        nomDeRue : "",
                        numeroDeRue : "",
                        parcelle : "",
                        venteOuLocation : "Location",
                        typeDeBien : "Appartement",
                        superficieHabitable : "",
                        superficieDuTerrain : "",
                        nombreDePiece : "",
                        nombreDeChambre : "",
                        nombreDeNiveaux : "",
                        numeroDEtage : "",
                        nombreDeStationnement : "",
                        ancienOuNeuf : "",
                        etat : "",
                        anneeDeConstruction : "",
                        grenier : "",
                        cave : "",
                        jardin : "",
                        balcon : "",
                        piscine : "",
                        chauffage : "",
                        detailDeDisponibilite : "",
                        prixLoyerVente : "",
                        chargeMensuelleOuAnnuelle : "",
                        classeEnergetique : "",
                        consommationEnergie : "",
                        meuble : "",
                        agenceImmobilier : "",
                        idMutaion : "",
                        dateMutation : "",
                        nombreLots : "",
                        lot1SurfaceCarez : "",
                        lot2SurfaceCarez : "",
                        lot3SurfaceCarez : "",
                        lot4SurfaceCarez : "",
                        lot5SurfaceCarez : "",
                        lot4numero : "",
                        lot5numero : "",
                        longitude : "",
                        latitude : "",
                        prixMoyenne : "",
                        site : ""

                    })
                }

                return data;
            });


            console.log({ location : locationAppartement});
            await browser.close();
            return res.json({ location : locationAppartement});
        })();

    }catch(err){
        console.log(err);
    }

}