let list = document.getElementsByClassName('stored-text-list')[0]
let addBtn = document.getElementById('add-button')

chrome.storage.sync.get('storedItems', function(data) {
  console.log(data)

  data["storedItems"].forEach((elem) => {
    updateList(elem, list)
  })
});

addBtn.onclick = () => {
  const note = document.getElementById("highlight-note").value
  let   highlightSelection = window.getSelection();
  let currentURL;

  //alert(highlightSelection)
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    console.log(tabs[0])
    currentURL = tabs[0].url
  })

  chrome.storage.sync.get('storedItems', (data) => {
    const lastNote = {
      note: note,
      pageUrl: currentURL,
      highlight_text: highlightSelection
    }

    data["storedItems"].push(lastNote)
    console.log(data)

    updateList(lastNote, list)

    chrome.storage.sync.set(data, (stored_data) => {
      console.log(`Data in storage: ${stored_data}`)
    })
  })
}

function updateList(data_obj, dom_parent) {

  if(typeof data_obj !== 'object') {
    throw "Function updateList has a parameter of type \"object\""
  }

  let listItem = document.createElement("li")
  let head = document.createElement("h3")
  let span = document.createElement("span")

  head.innerHTML = data_obj.note
  span.innerHTML = data_obj.pageUrl

  listItem.appendChild(head)
  listItem.appendChild(span)

  listItem.setAttribute("class", "list-item")

  list.appendChild(listItem)
}