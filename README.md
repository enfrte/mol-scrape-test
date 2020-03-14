# Scrape mol.fi with Puppeteer and Firebase



The code works locally, but will fail when deployed to the cloud, if you only have the free Firebase's Spark plan. If you go to your Firebase console, and navigate to `Funtions` `>` `Logs`, you will see an error like `Catch error: net::ERR_NAME_RESOLUTION_FAILED at https...`
when trying to run the function. 