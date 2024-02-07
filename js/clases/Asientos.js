export class Asiento{
    constructor(elemento,id,precio,clase,fila,columna,zona){
        this.elemento=elemento;
        this.id=id;
        this.estado={estado:"disponible",precio:50,fila:0,columna:0};
        this.estado.precio = precio;
        this.clase=clase;
        this.estado.fila=fila;
        this.estado.columna=columna;
        this.zona=zona;
    }

     crearAsiento(){
         const asiento = document.createElement(this.elemento);
         const identificador = document.createAttribute("id");
         identificador.value = `${this.zona}-asiento${this.id+1}`;
         const estado = document.createAttribute("data-metadatos");
         estado.value=JSON.stringify(this.estado);
         const clase = document.createAttribute("class");
         clase.value = this.clase
         asiento.setAttributeNode(identificador);
         asiento.setAttributeNode(estado);
         asiento.setAttributeNode(clase);
         return asiento
     }

    crearEntrada(){
        const entrada = document.createElement(this.elemento);
        const identificador = document.createAttribute("id");
        identificador.value = `${this.zona}-entrada${this.id+1}`;
        entrada.setAttributeNode(identificador);
        const mostrarEl = document.createAttribute("style");
        mostrarEl.value = "display:none";
        entrada.setAttributeNode(mostrarEl);
        const textNode=document.createTextNode(`zona: ${this.zona}, fila: ${this.estado.fila}, columna: ${this.estado.columna}, precio: ${this.estado.precio}`);
        entrada.appendChild(textNode);
        const btnCompra = document.createElement("button");
        const textBtn = document.createTextNode("comprar");
        btnCompra.appendChild(textBtn);
        const identificadorBtn = document.createAttribute("id");
        identificadorBtn.value = `${this.zona}-boton${this.id+1}`;
        btnCompra.setAttributeNode(identificadorBtn);
        entrada.appendChild(btnCompra);
        return entrada;
    } 

    eventoAsiento(e){
        let md = e.getAttribute("data-metadatos");
        let idAsi = e.getAttribute("id");
        let mdObj = JSON.parse(md);
        let std = "";
        let mostrarE = "";
        let idEnt = idAsi.replace("asiento","entrada"); 
        let elEntrada = document.querySelector(`#${idEnt}`);
        if(mdObj.estado === "disponible"){
            std = "pendiente";
            elEntrada.style= "display:block";
        }else{
            std = "disponible";
            elEntrada.style= "display:none";
        }
        e.className = `color-${std}`;
        mdObj.estado = std;
        e.style = mostrarE;
        e.setAttribute("data-metadatos",JSON.stringify(mdObj));
    }

    eventoEntrada(e){
        let idEnt = e.target.getAttribute("id");
        let idAsi = idEnt.replace("boton","asiento");
        let elAsiento = document.querySelector(`#${idAsi}`);
        elAsiento.className= "color-reservado";
        this.estado.estado = "reservado"; 
        elAsiento.setAttribute("data-metadatos",JSON.stringify(this.estado));
    }

    crearTicket(){
        const ticket = document.createElement("div");
        const titulo = document.createElement("h2");
        const texTitulo = document.createTextNode("Espectaculo");
        titulo.appendChild(texTitulo);
        ticket.appendChild(titulo);
        const salto = document.createElement("br");
        ticket.appendChild(salto);
        const textZona = document.createTextNode(`Zona: ${this.zona}`);
        ticket.appendChild(textZona);
        ticket.appendChild(salto);
        const textPrecio = document.createTextNode(` Precio: ${this.estado.precio}`);
        ticket.appendChild(textPrecio);
        ticket.appendChild(salto);
        const textFC = document.createTextNode(`Fila: ${this.estado.fila} Columna: ${this.estado.columna}`);
        ticket.appendChild(textFC);
        return ticket;

    }

}