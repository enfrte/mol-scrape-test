const functions = require('firebase-functions');
const puppeteer = require('puppeteer');

exports.scrape = functions.https.onRequest(async (request, response) => {
  const molUrl = 'https://paikat.te-palvelut.fi/tpt/?searchPhrase=web%20developer&locations=Oulu&announced=0&leasing=0&english=false&sort=1';
  let browser = null;
  let urls = null;
  
  try {
    browser = await puppeteer.launch();  
    // Do stuff with headless chrome
    const page = await browser.newPage();
    await page.goto(molUrl); 
    await page.waitForSelector('.resultsList a'); 

    urls = await page.evaluate(() => {
      const links = document.querySelectorAll('.resultsList a');
      
      // [...nodelist] will make an array of out of an object, if the object is iterable
      return [...links].map(link => { 
        const linkHrefRegex = /^.+[\?]/.exec(link.getAttribute('href')); // regex returns an array
        const  url = linkHrefRegex[0].slice(0, -1);
        return {
          url:  url,
          text: link.innerText,
        };
      });
      /* Code above does the same. I'm trying to practice more modern JS :P
      const results = [];
      links.forEach(link => {
        const linkHrefRegex = /^.+[\?]/.exec(link.getAttribute('href')); // regex returns an array
        const  url = linkHrefRegex[0].slice(0, -1);
        
        results.push({
          url:  url,
          text: link.innerText,
        });
      });
      return results;
      */
    });
      
    //console.log(urls);
  } catch (err) {
    console.error('Catch error:', err.message);
  } finally {
    if (browser !== null) {
      await browser.close()
    }
  }

  response.send(urls);
  //response.send("Hello from Firebase!");
});
