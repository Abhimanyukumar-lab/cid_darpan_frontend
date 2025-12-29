document.querySelector('.langDrop').addEventListener('click', function(){
 document.querySelector('.dropDiv').classList.toggle('activeLang')
})
document.querySelectorAll('.itemList')[0].addEventListener('click', function(){
    document.querySelector('.dropName').innerText = document.querySelectorAll('.itemName')[0].innerText;
    document.querySelector('.dropDiv').classList.remove('activeLang')
    document.querySelector('.dropDiv').style.transition= "all 0s";
    document.querySelectorAll('.hindi').forEach(function(e){
        e.style.display = "block";
    })
    document.querySelectorAll('.english').forEach(function(e){
        e.style.display = "none";
    })
   
})

document.querySelectorAll('.itemList')[1].addEventListener('click', function(){
    document.querySelector('.dropName').innerText = document.querySelectorAll('.itemName')[1].innerText;
    document.querySelector('.dropDiv').classList.remove('activeLang')
    document.querySelector('.dropDiv').style.transition= "all 0s";
    document.querySelectorAll('.hindi').forEach(function(e){
        e.style.display = "none";
    })
    document.querySelectorAll('.english').forEach(function(e){
        e.style.display = "block";
    })
})


document.querySelectorAll('.navItem').forEach(function(e){
e.addEventListener('mouseover', function(){
   e.children[0].children[2].src = "img/img1/white-arrow.png";    
})
})
document.querySelectorAll('.navItem').forEach(function(e){
    e.addEventListener('mouseout', function(){
        e.children[0].children[2].src = "img/img1/arrow.png";
 })
})
document.addEventListener('click', function(e){
    if(e.target.closest('.navItemSpecial')){
        if(e.target.closest('.navItemSpecial').children[1].classList.contains('dropActive')){
            e.target.closest('.navItemSpecial').children[1].classList.remove('dropActive')
        }
         else {
            document.querySelectorAll('.navItemSpecial').forEach(function(e){
                if(e.children[1].classList.contains('dropActive')){
                 e.children[1].classList.remove('dropActive');
                }
                 })
            e.target.closest('.navItemSpecial').children[1].classList.add('dropActive')
         }   
    }
    else if(!(e.target.closest('.navItemSpecial'))){
        document.querySelectorAll('.navItemSpecial').forEach(function(e){
            if(e.children[1].classList.contains('dropActive')){
             e.children[1].classList.remove('dropActive');
            }
             })
    }
    if(!(e.target.closest('.languageDiv'))){
        document.querySelector('.dropDiv').classList.remove('activeLang')
    }
    
    
   
})
document.querySelectorAll('a').forEach(function(e){
    e.addEventListener('click', function(event){
        event.preventDefault();
    })
})

// hambuger js
document.querySelector('.hamLabel').addEventListener('click', function(){ 
    // document.querySelector('.navHead').classList.toggle('activeNav1')
    if(document.querySelector('#hamCheck').checked === true){
        document.querySelector('.hamburger').src = "img/img1/close.png";
        document.querySelector('.navHead').classList.add('activeNav1');
        document.querySelector('.overlay').style.width = "100%";
    } 
    else{
        document.querySelector('.hamburger').src = "img/img1/hamburger.svg";
        document.querySelector('.navHead').classList.remove('activeNav1');
        document.querySelector('.overlay').style.width = "0"
    }
})

document.querySelector('.overlay').addEventListener('click', function(){
    document.querySelector('#hamCheck').checked = false;
    document.querySelector('.hamburger').src = "img/img1/hamburger.svg";
    document.querySelector('.navHead').classList.remove('activeNav1');
    document.querySelector('.overlay').style.width = "0"
})

const para1 = document.querySelector(".marqueeTag");
    var intervalId
    animate(para1)
    function animate(element) {
    let elementWidth = element.offsetWidth;
    let parentWidth = element.parentElement.offsetWidth;
    let flag = 0;
    
        intervalId = setInterval(() => {
        element.style.marginLeft = --flag + "px";
    
        if (elementWidth == -flag) {
            flag = parentWidth;
        }
    }, 15);
    $('.marqueeTag').mouseover(function() {
        clearInterval(intervalId);
    }).mouseout(function() {
        intervalId = setInterval(() => {
            element.style.marginLeft = --flag + "px";
        
            if (elementWidth == -flag) {
                flag = parentWidth;
            }
        }, 15)
    });
    }