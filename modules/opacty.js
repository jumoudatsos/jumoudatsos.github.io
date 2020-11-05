export default class opacty{
  constructor(sections){
  this.sections = document.querySelectorAll(sections);
  this.refwindow = window.innerHeight * 0.7;
  this.efeito = this.efeito.bind(this);
  }

  efeito(){
    this.sections.forEach((item)=>{
      const calc = item.getBoundingClientRect().top - this.refwindow;
      if(calc < 0){
        item.classList.add('ativo')
      };
    });
  };

  evento(){
 window.addEventListener('scroll',this.efeito);
  }

  init(){
    this.evento();
  }
}