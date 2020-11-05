export default class Geral{
  constructor(ju){
  this.titulo = document.querySelector(ju);
  }

  escrever(){
    const arrayTitulo=this.titulo.innerHTML.split("");
    this.titulo.innerHTML="";
    arrayTitulo.forEach((letra,i)=>{
      setTimeout(() => this.titulo.innerHTML += letra, 95 * i);
    })
  }


  init(){
   this.escrever();
   
  }
}