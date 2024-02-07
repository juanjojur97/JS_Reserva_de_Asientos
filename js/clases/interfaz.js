import {Asiento} from './Asientos.js';
//creamos asientos el el dom, solo página de reservas
export function crearAsientos(zona,espacioCajaFoto,filas,columnas){
  
    const cajaz= document.querySelector(`#${zona}`);
    const carritoz = document.querySelector("#carrito");
    const tickets = document.querySelector("#tickets");
    
    cajaz.style.width=`${espacioCajaFoto*columnas}px`;
    let fila = 1;
    let columna = 1;
    for(let i = 0; i < (filas*columnas);i++){     
        const asiento = new Asiento("div", i , 54, "color-disponible", fila, columna, zona);
        
        if(columna < columnas){
            
            columna++;
        }else{
            columna = 1;
            fila++;
        }
        const elAsiento = asiento.crearAsiento();
        cajaz.appendChild(elAsiento);

        const elEntrada = asiento.crearEntrada();
        carritoz.appendChild(elEntrada);
        
        let funcionEventoAsiento = ()=>{

           asiento.eventoAsiento(elAsiento); 
        }
        elAsiento.addEventListener("click",funcionEventoAsiento,false);

        elEntrada.querySelector("button").addEventListener("click", e =>{
            asiento.eventoEntrada(e);
            elAsiento.removeEventListener("click",funcionEventoAsiento,false);
            elEntrada.remove();
            tickets.appendChild(asiento.crearTicket());

        })
    }   
}