let search = document.querySelector("#search");
let matchList = document.querySelector("#match-list");


const searchStates = async (inputData)=>{
    const res = await fetch("./data/states.json");
    let states = await res.json();
    console.log(states);
    let matches;
    if(inputData.length === 0){
        matches = [];
        matchList.innerHTML = "";
    }
    else{
        matches = states.filter(  state  =>{
            let re = new RegExp(`^${inputData}`,"ig");
            return state.name.match(re) || state.abbr.match(re);
        })
    }
    outputHTML(matches);
}

const outputHTML = matches =>{
    if(matches.length>0){
        let output = matches.map(index => `
            <div class="card card-body mb-4">
            <h2>
            ${index.name} (${index.abbr}) <span class="text-primary">${index.capital}</span>
            </h2>
            <small>LAT: ${index.lat} / LONG: ${index.long}</small>
            </div>
            `
        ).join("");

        matchList.innerHTML = output;
    }
};
search.addEventListener("input", () => searchStates(search.value));