    document.querySelector('.langChange').addEventListener('click',function(){
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

    

    const para1 = document.getElementById("marquee");
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
    }, 10);
    $('#marquee').mouseover(function() {
        console.log('hi')
        clearInterval(intervalId);
    }).mouseout(function() {
        intervalId = setInterval(() => {
            element.style.marginLeft = --flag + "px";
        
            if (elementWidth == -flag) {
                flag = parentWidth;
            }
        }, 10)
    });
    }

    




