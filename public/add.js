function create_field(){
  
  let div = document.createElement('div');
  div.setAttribute('class', 'group');
  
  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('placeholder', 'Organization');
  input.setAttribute('name', 'org')

  let price = document.createElement('input');
  price.setAttribute('type', 'text');
  price.setAttribute('placeholder', 'Price');
  price.setAttribute('name', 'price')

  let span_highlight = document.createElement('span');
  //span_highlight.setAttribute('class', 'highlight');
  
  let label = document.createElement('label');
  label.innerHTML = "Organization";
  
  div.appendChild(input);
  div.appendChild(price);
  div.appendChild(span_highlight);
  
  return div;
}

function add_organization(){
  let form = document.querySelector('form');
  let child = create_field();
  form.insertBefore(child, form.childNodes[2])
  child.childNodes[0].focus();
  child.childNodes[0].select();

}

function remove_organization(){
  let groups = document.getElementsByClassName('group');
  
  let last_child = groups[groups.length-1];
  if (last_child.id != "specinputdiv"){
    last_child.parentNode.removeChild(last_child);
  }
  
}

let plus = document.getElementById('plus');
let minus = document.getElementById('minus');
 
plus.addEventListener('click', add_organization);
minus.addEventListener('click', remove_organization);
document.onkeydown = function(e){
  e = e || window.event;
  console.log(e.code);
  if (e.code == 'ArrowDown'){
    remove_organization();
  }
  else if (e.code == 'ArrowUp'){
    add_organization();
  }
}

/* let submit = document.getElementById('submit-icon');

submit.addEventListener('click', function(){
  let form = document.querySelector('form#specform');
  // The first indexing is for the dynamically populated input
  // The second indexing is for spec/price
  const specification = form.children[0].children[0].value;
  console.log(specification);
  const prices = []
  const num_data = 2;
  console.log("form length: " + form.length);
  for (var i = 1; i < form.length; i = i + num_data){
    const org = form[i].value;
    const price = form[i+1].value;
    const object = {}
    object[org] = parseInt(price);
    prices.push(object);
  }
  console.log(prices);
  var entry = {};
  entry['spec'] = specification;
  entry['prices'] = prices;
   var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200){
      console.log(this.responseText);
    }
    xhttp.open('POST', 'http://localhost:8080/add', true);
    xhttp.setRequestHeader('Content-Type', 'application/json')
    xhttp.send(entry);
  } 
  const url = "http://localhost:8080/add";
  const params = {
    headers: {
      "Content-type": "application/json"
    },
    body: entry,
    method: "POST",
    mode: "no-cors"
  }
  fetch(url, params)
  .then(data => console.log("fuck1" + data))
  .then(res => console.log("fuck2" + res))
  .catch(err => console.log("fuck3" + err))
  //window.location.href = "https://price-list-manager.herokuapp.com/";
}) */