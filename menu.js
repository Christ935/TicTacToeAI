var mainmenu=document.getElementById('mainmenu')
var diffmenu=document.getElementById('diffmenu')

var onep=document.getElementById('1p')
onep.addEventListener('click',()=>{
    mainmenu.style.display='none'
    diffmenu.style.display='flex'
})

var back=document.getElementById('backbtn')
back.addEventListener('click',()=>{
    mainmenu.style.display='flex'
    diffmenu.style.display='none'

})