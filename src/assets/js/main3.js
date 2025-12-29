// document.querySelector('.textChange').addEventListener('click',function(){
//     if(this.innderText === "English"){
//         document.querySelectorAll('.english').style.display = "block";
//         document.querySelectorAll('.hindi').style.display = "none";
//     }
//     else if(this.innderText === "hindi"){
//         document.querySelectorAll('.english').style.display = "none";
//         document.querySelectorAll('.hindi').style.display = "block";
//     }
// })

document.querySelector('.textChange').addEventListener('click',function(){
    if(this.innerText == "English"){
        this.innerText = "Hindi";
        document.querySelectorAll('.english').forEach(function(e){
           e.style.display = "block";
        })
        document.querySelectorAll('.hindi').forEach(function(e){
          e.style.display = "none"
        })
    }
    else{
        this.innerText = "English";
        document.querySelectorAll('.english').forEach(function(e){
            e.style.display = "none";
         })
         document.querySelectorAll('.hindi').forEach(function(e){
           e.style.display = "block"
         })
    }
})



const para1 = document.getElementById("marquee2");
var intervalId
animate(para1)
function animate(element) {
let elementWidth = element.offsetHeight;
let parentWidth = element.parentElement.offsetHeight;
let flag = 0;

    intervalId = setInterval(() => {
    element.style.marginTop = --flag + "px";

    if (elementWidth == -flag) {
        flag = parentWidth;
    }
}, 20);
$('#marquee2').mouseover(function() {
    console.log('hi')
    clearInterval(intervalId);
}).mouseout(function() {
    intervalId = setInterval(() => {
        element.style.marginTop = --flag + "px";
    
        if (elementWidth == -flag) {
            flag = parentWidth;
        }
    }, 20)
});
}






