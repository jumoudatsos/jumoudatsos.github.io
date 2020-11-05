import debounce from './debounce.js';

export class Slide{
  constructor(slide,wrapper){
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = {final:0,eventx:0,moviment:0};
    this.activeClass = 'active';
    this.changeEvent = new Event("changeEvent");
  }

// calculos e movimentos
calcularMove(x){
  this.dist.moviment = (this.dist.eventx - x) * 1.6;
  return  this.dist.final - this.dist.moviment;
}

moveSlide(x){
  this.dist.novomovimento=x;
this.slide.style.transform=`translate3d(${x}px,0px,0px)`
}

// açoes
  onStart(event){
    let type;
    if (event.type === "mousedown"){
      type="mousemove";
      event.preventDefault();
      this.dist.eventx = event.clientX;
    } else{
      type="touchmove";

      this.dist.eventx = event.changedTouches[0].clientX;
    }
    
    this.wrapper.addEventListener(type,this.onMove);
    this.transition(false);
  }

  onMove(event){
  let type=(event.type === "mousemove")?event.clientX:event.changedTouches[0].clientX;
  const final_moviment = this.calcularMove(type);
  this.moveSlide(final_moviment);
  }

  onEnd(event){
    let type=(event.type === 'mouseup')?"mousemove":"touchmove";
    this.dist.final = this.dist.novomovimento;
    this.wrapper.removeEventListener(type,this.onMove);
    this.transition(true);
    this.changeonEnd();
  }
  // add eventos
  addEvents(){
    this.wrapper.addEventListener("mousedown",this.onStart);
    this.wrapper.addEventListener("touchstart",this.onStart);
    this.wrapper.addEventListener("mouseup",this.onEnd);
    this.wrapper.addEventListener("touchend",this.onEnd);
    window.addEventListener('resize',this.resize);
  }
// bind
  bind(){
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.resize = debounce(this.resize.bind(this),50) ;
    this.Prev = this.Prev.bind(this);
    this.Next = this.Next.bind(this);
  }

// config
calcMargin(x){ // calcula a margem
const margin = (this.wrapper.offsetWidth - x.offsetWidth) / 2;
return - (x.offsetLeft - margin);
}
slidesConfig(){ // retorna a posicao do calMargin
  this.slideArray = [...this.slide.children].map((element)=>{
    let position = this.calcMargin(element)
    return{element,position}
  })
  
}

slideIndex(index){ // atualiza as info de ativo
  const last= this.slideArray.length - 1;
  this.index={
    prev:index?index -1 : undefined,
    active:index,
    next:(index===last)?undefined:index + 1,
  }
}

changeSlide(index){// muda slide
  const active = this.slideArray[index];
  this.moveSlide(active.position);
  this.dist.final = active.position;
  this.slideIndex(index);
  this.changeActiveClass();
  this.wrapper.dispatchEvent(this.changeEvent);

}
// NEXT E PREV ONEND TRANSITION
transition(x){
  this.slide.style.transition=x?".4s":"";
}
changeonEnd(){
  if(this.dist.moviment > 120 && this.index.next !== undefined){
    this.Next();
  } else if (this.dist.moviment < -120 && this.index.prev !== undefined){
    this.Prev();
  } else{
    this.changeSlide(this.index.active);
  }
}

Next(){
  if(this.index.next !== undefined){
    this.changeSlide(this.index.next);
  }
}
Prev(){
  if(this.index.prev !== undefined){
    this.changeSlide(this.index.prev);
  }
}

// adicionar ativo e Resize


changeActiveClass() {
  this.slideArray.forEach(item => item.element.classList.remove(this.activeClass));
  this.slideArray[this.index.active].element.classList.add(this.activeClass);
}

resize(){
  setTimeout(()=>{
    this.slidesConfig();
    this.changeSlide(this.index.active);
  },1000);
  
}

// inicio 
  init(){
    this.bind();
    this.addEvents();
    this.slidesConfig();
    this.transition(true);
    this.changeSlide(0);
    return this;

  }
}

export class slidenav extends Slide {

  constructor(slide, wrapper) {
    super(slide, wrapper);
    this.bindControlEvents();
  }

  arrow(ant,prox){
  this.ant = document.querySelector(ant);
  this.prox = document.querySelector(prox);
  this.arrowFunction();
  };

  arrowFunction(){
    this.ant.addEventListener('click',this.Prev);
    this.prox.addEventListener('click',this.Next);
  }
  // CRIANDO Controles

  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide";

    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index + 1}">${
        index + 1
      }</a></li>`;
    });
    this.wrapper.appendChild(control);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener("changeEvent", this.activeControlItem);
  }

  activeControlItem() {
    this.controlArray.forEach((item) =>
      item.classList.remove(this.activeClass)
    );
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl(customControl) {
    this.control =
      document.querySelector(customControl) || this.createControl();
    this.controlArray = [...this.control.children];
    
    this.activeControlItem();
    this.controlArray.forEach(this.eventControl);
  }

  bindControlEvents() {
    this.eventControl = this.eventControl.bind(this);
    this.activeControlItem = this.activeControlItem.bind(this);
  }
  
}