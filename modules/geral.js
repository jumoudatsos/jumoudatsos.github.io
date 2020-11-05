export default class Geral{
  constructor(port,cont,btn){
  this.ports = document.querySelectorAll(port);
  this.cont = document.querySelectorAll(cont);
  this.btn = document.querySelectorAll(btn);
  }


  bind(){
    this.abrir = this.abrir.bind(this);
    this.fechar = this.fechar.bind(this);
  }

  abrir(event){
    event.preventDefault();
    let type = event.target.dataset.port;
    if ( type === 'js'){
      this.cont[0].classList.add("ativo");
    }else if( type === 'css'){
      this.cont[1].classList.add("ativo");
    }else if( type === 'html'){
      this.cont[2].classList.add("ativo");
    }else if( type === 'woo'){
      this.cont[3].classList.add("ativo");
    }else if( type === 'art'){
      this.cont[4].classList.add("ativo");
    }
  }
 
  fechar(event){
    let type = event.target.dataset.port;
    if (type === 'js'){
      this.cont[0].classList.remove("ativo");
    } else if( type === 'css'){
      this.cont[1].classList.remove("ativo");
    }else if( type === 'html'){
      this.cont[2].classList.remove("ativo");
    } else if( type === 'woo'){
      this.cont[3].classList.remove("ativo");
    }else if( type === 'art'){
      this.cont[4].classList.remove("ativo");
    }     
  }

  eventos(){
   
  this.btn.forEach((item)=>{
    item.addEventListener('click',this.fechar);
  })

   this.ports.forEach((port)=>{
    port.addEventListener('click',this.abrir);
   })
  }

  init(){
    this.bind();
    this.eventos();
   
  }
}