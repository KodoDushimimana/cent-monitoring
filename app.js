const express = require('express')
const res = require('express/lib/response')
const fetch = require('node-fetch')
const Airtable = require('airtable');
const moment = require('moment')

require('dotenv').config()

const app = express()
app.use(express.static('public'))
app.use(express.json())
const PORT =process.env.PORT || 3000

const ulk = process.env.ULK_API
const mpp = process.env.MPP_API
const aga = process.env.AGA_API

const ulkID = 643155
const mppID = 704668
const agaID = 595753

const ulk_url = `https://monitoringapi.solaredge.com/site/${ulkID}/overview?api_key=${ulk}`
const mpp_url = `https://monitoringapi.solaredge.com/site/${mppID}/overview?api_key=${mpp}`
const ag_url = `https://monitoringapi.solaredge.com/site/${agaID}/overview?api_key=${aga}`

const ulk_enviro = ` https://monitoringapi.solaredge.com/site/${ulkID}/envBenefits?systemUnits=Imperial&api_key=${ulk}`
const mpp_enviro = ` https://monitoringapi.solaredge.com/site/${mppID}/envBenefits?systemUnits=Imperial&api_key=${mpp}`
const aga_enviro = ` https://monitoringapi.solaredge.com/site/${agaID}/envBenefits?systemUnits=Imperial&api_key=${aga}`


let now = moment().format('LLLL')

console.log(now)




// Airtable information 

const base = new Airtable({apiKey: 'keyRtSv4UAZ79Kpoy'}).base('appGWfv8R1VHPYYOA');

app.get('/ulkapi', async(req, res) =>{

    const fetchUlk = await fetch(ulk_url)
    const data = await fetchUlk.json()
    res.send(data)
   

    const lastUpdate = data.overview. lastUpdateTime
    const energyToday = data.overview.lastDayData.energy

    
    base('Monitoring').create([
        {
          "fields": {
              "Last Update": lastUpdate,
              "Today's Energy [Wh]": energyToday

          }
        },
        ], function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function (record) {
          console.log(record.getId());
        });
      });

      if(lastUpdate < now){
        base('Monitoring').update([
            {
              "id": "recY2tnaXxGYpuz5y",
              "fields": {
                "Last Update": lastUpdate,
                "Today's Energy [Wh]": energyToday
              }
            }
          ], function(err, records) {
            if (err) {
              console.error(err);
              return;
            }
            records.forEach(function(record) {
              console.log(record.get('Last Update'));
            });
          });
    }else{
        
        console.log(`now is ${now}`)
    }


})

app.get('/mppapi', async(req, res) =>{

    const fetchMpp = await fetch(mpp_url)
    const data = await fetchMpp.json()
    res.send(data)

})

app.get('/agapi', async(req, res) =>{

    const fetchAg = await fetch(ag_url)
    const data = await fetchAg.json()
    res.send(data)

})


app.post('/add', (req, res)=>{
    console.log('I got a request')
    console.log(req.body)
    const data = req.body.name

    res.json({

        name:data,
        age: 19

    })

    res.end()

})

// Environmental Impact

app.get('/ulkenviro', async(req, res) =>{
    const fetchEnviro = await fetch (ulk_enviro)
    const enviroData = await fetchEnviro.json()
    res.send(enviroData)

})

app.get('/mppenviro', async(req, res) =>{
    const fetchEnviro = await fetch (mpp_enviro)
    const enviroData = await fetchEnviro.json()
    res.send(enviroData)

})

app.get('/agaenviro', async(req, res) =>{
    const fetchEnviro = await fetch (aga_enviro)
    const enviroData = await fetchEnviro.json()
    res.send(enviroData)

})



app.listen(PORT, ()=>{console.log(`Server is up and runing on port ${PORT}`)})