const form = document.querySelector('form');
const wish = document.querySelector('#wish');
const message = document.querySelector('#message');

form.addEventListener("submit",(e)=>{ 
    
    e.preventDefault();
    form.style.display = 'none';
    message.innerText = "Votre souhait est : "+ wish.value;
   
});
