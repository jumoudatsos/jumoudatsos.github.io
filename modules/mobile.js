export default class opacty{
  constructor(btn,sair,nav){
  this.btn = document.querySelector(btn);
  this.sair = document.querySelector(sair);
  this.nav = document.querySelector(nav);
  }
  open(){
    this.nav.classList.add('ativo');
  }
  
  close(){
    this.nav.classList.remove('ativo');
  }

  bind(){
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  eventos(){
    this.btn.addEventListener('click',this.open);
    this.sair.addEventListener('click',this.close)
  }

  init(){
  this.bind();
  this.eventos();
  }
}