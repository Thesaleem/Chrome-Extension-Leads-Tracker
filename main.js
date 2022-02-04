let myLeads = [];
const saveInput = document.querySelector("#saveinput");
const saveUrl = document.querySelector("#save");
const deleteBtn = document.querySelector("#delete");
const ulEL = document.querySelector("#ul");
const inputEl = document.querySelector("#input-el");

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    displayLeads()
}

function displayLeads(){
    let sites = "";
    for (let i = 0; i < myLeads.length; i++){
        sites += `<li> <a href = '${myLeads[i]}' target = '_blank'>${myLeads[i]} </a> <li>`     
    } ulEL.innerHTML = sites;
}

saveInput.addEventListener("click", function(){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    displayLeads()
})

saveUrl.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    displayLeads()
    })
})

deleteBtn.addEventListener("click", function(){
    localStorage.clear()
    myLeads = [];
    displayLeads()
})
