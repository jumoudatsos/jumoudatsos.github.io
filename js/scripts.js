import {slidenav} from "/modules/slide.js";
import workflow from "/modules/workflow.js";
import Scrollsuave from "/modules/scrollsuave.js"; 
import opacty from "/modules/opacty.js"; 
import Mobile from "/modules/mobile.js"; 
import Geral from "/modules/geral.js"; 
import Titulo from "/modules/titulo.js"; 
import Carregar from "/modules/carregar.js"; 

// SLIDE ATIVAÇÃO
const slide_site = new slidenav('.slide_lista','.slide_container');
slide_site.init();
slide_site.arrow('.prev','.next');
slide_site.addControl(".custom-controls");

// WORKFLOW

 const work = new workflow('.filter-menu','.filter-item');
work.init();  

// SCROLLSUAVE
const scroolsuave = new Scrollsuave('.navegacao');
scroolsuave.init();
// ANIMACAO AO SCROLL
const opacty_ = new opacty('.opacty');
opacty_.init();

// Mobile
const cel = new Mobile(".logobtn",".logoexit",".navegacao");
cel.init();

// geral 
const geral = new Geral(".grupo",".port",".btnout");
geral.init();
// Maquina-escrever
const titulo = new Titulo(".julio");
titulo.init();
// Onload
const carregar = new Carregar();
carregar.init();