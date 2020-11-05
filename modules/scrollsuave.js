export default class Scrollsuave{
  constructor(menu){
    this.menu = document.querySelectorAll('.navegacao a');
  }

  eventos(event){
  this.menu.forEach((link)=>{
    link.addEventListener('click',(event)=>{
      link.style.outline='none';
      event.preventDefault();
      const href = event.currentTarget.getAttribute('href');
      const sec = document.querySelector(href);
      sec.scrollIntoView({
        behavior: "smooth",
        block:    "start" ,
      })

      
    });

  })
  }

  init(){
    this.eventos();
   
  }
}
