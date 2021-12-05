fetch("http://puzzle.mead.io/puzzle").then((response) => {
  response.json().then((data) => {
    console.log(data);
  });
});

//challenge

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1=document.querySelector('#msg-1')
const msg2=document.querySelector('#msg-2')
const msg=document.querySelector('.message')


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  if (location == "") {
    console.log("enter a location");
    msg.style.boxShadow="5px 5px 5px 5px"
    msg.style.borderRadius='10px'
    msg.style.width="50%"
    msg1.innerHTML='Enter a location'
      
  } 
  
  else {
    console.log("testing..");
    fetch("/weather/weather2?address=" + location).then((response) => {             // send request to api endpoint weather/weather2
        response.json().then((data) => {
            if(data.error)
            {
                msg.style.boxShadow="5px 5px 5px 5px"
                msg.style.borderRadius='10px'
                msg.style.width="50%"
                msg1.innerHTML=data.error 
            }
            else{
            msg.style.width="50%"
            msg1.innerHTML='temperature is '+data.temp 
            msg2.innerHTML='weather is '+data.description     
            }
                    
        });
      }
    );
  }
});
