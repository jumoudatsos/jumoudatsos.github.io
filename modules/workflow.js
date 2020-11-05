
export default class workflow{
  constructor(options,img){
    this.options = document.querySelector(options);
    this.image = document.querySelector(img);
    this.optionsArray = [...this.options.children]
    this.imageArray = [...this.image.children]
  }

  eventos(){
    this.optionsArray.forEach((item,index)=>{
      this.optionsArray[0].classList.add('active'); 
      item.addEventListener('click',()=>{
        this.optionsArray.forEach((li)=>{
          li.classList.remove('active');
        })
        this.optionsArray[index].classList.add('active'); 

      const data = this.optionsArray[index].getAttribute('data-target');
       this.imageArray.forEach((img)=>{
         img.classList.add('delete');
         img.classList.remove('active');

         if(img.getAttribute('data-item') === data || data === 'all'){
          img.classList.add('active');
          img.classList.remove('delete');
         }
       })
      
      })
    })
  }


  init(){
   
    this.eventos();
  }
}


