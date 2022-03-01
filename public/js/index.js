const ulklastupdate = document.getElementById('last_updated_ulk')
const ulkenergyToday = document.getElementById('energy_today_ulk')

const mpplastupdate = document.getElementById('last_updated_mpp')
const mppenergyToday = document.getElementById('energy_today_mpp')

const aglastupdate = document.getElementById('last_updated_agahozo')
const agenergyToday = document.getElementById('energy_today_agahozo')

const ulkenviro = document.getElementById('ulkTree')
const mppeaceenviro = document.getElementById('mppTree')
const agaenviro = document.getElementById('agaTree')

const ulkCarbon = document.getElementById('ulk_corbon')
const mppCarbon = document.getElementById('mpp_corbon')
const agaCarbon = document.getElementById('aga_corbon')

const ulk_url = '/ulkapi'
const mpp_url = '/mppapi'
const ag_url = '/agapi'

const ulkData  = async()=>{

    const fetchUlk = await fetch(ulk_url)
    const data = await fetchUlk.json()
    ulklastupdate.textContent = data.overview.lastUpdateTime
    ulkenergyToday.textContent = data.overview.lastDayData.energy

}

const mppData  = async()=>{

    const fetchMpp = await fetch(mpp_url)
    const data = await fetchMpp.json()
    mpplastupdate.textContent = data.overview.lastUpdateTime
    mppenergyToday.textContent = data.overview.lastDayData.energy

}

const agData  = async()=>{

    const fetchAg = await fetch(ag_url)
    const data = await fetchAg.json()
    aglastupdate.textContent = data.overview.lastUpdateTime
    agenergyToday.textContent = data.overview.lastDayData.energy

}

ulkData()
mppData()
agData()

const enviro_ulk = '/ulkenviro'
const enviro_mpp = '/mppenviro'
const enviro_aga = '/agaenviro'

const ulkenviroBen = async() =>{
    const fetchUlkEnviro = await fetch (enviro_ulk)
    const enviroData = await fetchUlkEnviro.json()

    ulkenviro.textContent = enviroData.envBenefits.treesPlanted.toFixed(2)
    ulkCarbon.textContent = enviroData.envBenefits.gasEmissionSaved.co2

}

const mppenviroBen = async() =>{
    const fetchmppEnviro = await fetch (enviro_mpp)
    const enviroData = await fetchmppEnviro.json()

    mppeaceenviro.textContent = enviroData.envBenefits.treesPlanted.toFixed(2)
    mppCarbon.textContent = enviroData.envBenefits.gasEmissionSaved.co2

}

const agaenviroBen = async() =>{
    const fetchagaEnviro = await fetch (enviro_aga)
    const enviroData = await fetchagaEnviro.json()

    agaenviro.textContent = enviroData.envBenefits.treesPlanted.toFixed(2)
    agaCarbon.textContent = enviroData.envBenefits.gasEmissionSaved.co2

}


ulkenviroBen()
mppenviroBen()
agaenviroBen()

setInterval(ulkData, 900000)