var sec=0
var min=0
var hr= 0
var interval 
var isRunning = false;
function TwoDigits(digit){
   if(digit<10){
  return("0"+digit)
   }else{
     return(digit)
   }
}
function iniciar() {
   if (!isRunning) { 
   watch();
   interval= setInterval(watch,1000);
   }
   isRunning = true;
}
function parar(){
  clearInterval(interval)
  isRunning = false;
}
function resetar(){
  clearInterval(interval)
  sec=0
  min=0
  document.getElementById("watch").innerText="00:00:00"
  isRunning = false;
}
function watch(){
  sec++
  if(sec==60){
    min++
    sec=0
    if(min==60){
      min=0
      hr++
    }
  }
  document.getElementById("watch").innerText=TwoDigits(hr)+":"+TwoDigits(min)+":"+TwoDigits(sec)
}
const texto = document.querySelector('input')
const btnInsert = document.querySelector('.divInsert button')
const btnDeleteAll = document.querySelector('.header button')
const ul = document.querySelector('ul')
var itensDB = []
btnDeleteAll.onclick = () => {
  itensDB = []
  updateDB()
}
texto.addEventListener('keypress', e => {
  if (e.key == 'Enter' && texto.value != '') {
    setItemDB()
  }
})
btnInsert.onclick = () => {
  if (texto.value != '') {
    setItemDB()
  }
}
function setItemDB() {
  if (itensDB.length >= 20) {
    alert('Limite máximo de 20 itens atingido!')
    return
  }
  itensDB.push({ 'item': texto.value, 'status': '' })
  updateDB()
}
function updateDB() {
  localStorage.setItem('todolist', JSON.stringify(itensDB))
  loadItens()
}
function loadItens() {
  ul.innerHTML = "";
  itensDB = JSON.parse(localStorage.getItem('todolist')) ?? []
  itensDB.forEach((item, i) => {
    insertItemTela(item.item, item.status, i)
  })
}
function insertItemTela(text, status, i) {
  const li = document.createElement('li')
  li.innerHTML = `
    <div class="divLi">
      <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
      <span data-si=${i}>${text}</span>
      <button onclick="removeItem(${i})" data-i=${i}><i class='bx bx-trash'></i></button>
    </div>`
  ul.appendChild(li)
  if (status) {
    document.querySelector(`[data-si="${i}"]`).classList.add('line-through')
  } else {
    document.querySelector(`[data-si="${i}"]`).classList.remove('line-through')
  }
  texto.value = ''
}
function done(chk, i) {
  if (chk.checked) {
    itensDB[i].status = 'checked' 
  } else {
    itensDB[i].status = '' 
  }
  updateDB()
}
function removeItem(i) {
  itensDB.splice(i, 1)
  updateDB()
}
loadItens()
 const horas = document.getElementById('horas')
 const minutos = document.getElementById('minutos')
 const segundos = document.getElementById('segundos')
 const relogio = setInterval(function time (){
  let dateToday = new Date();
  let hr = dateToday.getHours();
  let min = dateToday.getMinutes();
  let s= dateToday.getSeconds();
  if(horas < 10 ) hr= "0" + horas;
  if(minutos < 10 ) hr= "0" + minutos;
  if(segundos < 10 ) hr= "0" + segundos;
  horas.textContent = hr;
  minutos.textContent = min;
  segundos.textContent = s;
 })