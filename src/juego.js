const fondo = document.getElementById("fondo");
const celeste = document.getElementById("celeste");
const violeta = document.getElementById("violeta");
const naranja = document.getElementById("naranja");
const verde = document.getElementById("verde");
const btnEmpezar = document.getElementById("btnEmpezar");

class Juego {
  constructor() {
    this.inicializar();
    this.generaSecuencia();
    setTimeout(() => {
      this.siguienteNivel();
    }, 500);
  }
  //esconde el boton empezar al inicio del juego, nos dice en que nivel nos encontramos
  //guarda los valores de los colores para poder usarlos y cambiar sus propiedades en el domm
  inicializar() {
    this.elegirColor = this.elegirColor.bind(this);
    this.siguienteNivel = this.siguienteNivel.bind(this);
    this.toggleBtnEmpezar();
    this.nivel = 1;
    this.Ultimo_nivel = 10;
    this.colores = {
      celeste,
      violeta,
      naranja,
      verde,
    };
  }
  //cundo el boton empezar tenga la propiedad hide (esconder) se la va a quitar y si no la tiene la va a poner
  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains("hide")) {
      btnEmpezar.classList.remove("hide");
    } else {
      btnEmpezar.classList.add("hide");
    }
  }
  cambioColorFondo(color) {
    console.log(color);
  }
  //genera un arreglo de (10) posiciones lo llena de (0) y usando math.floor va a redondear el numero y math.random nos da un numero alazar
  generaSecuencia() {
    this.secuencia = new Array(this.Ultimo_nivel)
      .fill(0)
      .map((n) => Math.floor(Math.random() * 4));
  }
  //cambia de nivel
  siguienteNivel() {
    this.CantidadDeLaSecuencia = 0;
    this.iluminarSecuencia();
    this.agregarEventosDeClick();
  }
  //por cada numero que nos pasen lo vamos a transformar a color con switch
  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return "celeste";
      case 1:
        return "violeta";
      case 2:
        return "naranja";
      case 3:
        return "verde";
    }
  }
  //por cada color que nos pasen lo vamos a transformar en numero con switch
  transformarColorANumero(color) {
    switch (color) {
      case "celeste":
        return 0;
      case "violeta":
        return 1;
      case "naranja":
        return 2;
      case "verde":
        return 3;
    }
  }
  // vamos a iluminar la secuencia con un ciclo for y se va a repetir el mismo numero de veces que el nivel
  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      //el numero que nos den (1) va a la funcion transformar.. y nos va a devolver un texto ('celeste')
      //importante poner const para eliminar bug en los ciclos
      const color = this.transformarNumeroAColor(this.secuencia[i]);
      //la funcion iliminarColor se va a ejecutar cada 1 segundo multiplicado por i para que la secuncia se vea cada color
      setTimeout(() => {
        this.iluminarColor(color);
      }, 1000 * i);
      this.cambioColorFondo(color);
    }
  }
  //cambiamos la propiedad de css usando esa linea de codigo y llamamos a una funcion que la apague cada 1 segundo
  iluminarColor(color) {
    this.colores[color].classList.add("light");
    setTimeout(() => {
      this.apagarColor(color);
    }, 400);
  }
  //cambian el css removiendo la propiedad ('light')
  apagarColor(color) {
    this.colores[color].classList.remove("light");
  }
  //cada que la persona pulse un color se va a poner mas opaco para dar un feedback
  feedbackPersona(nombreColor) {
    this.colores[nombreColor].classList.add("chosen");
    setTimeout(() => {
      this.colores[nombreColor].classList.remove("chosen");
    }, 280);
  }
  // nos da la informacion de que boton fue tocado
  agregarEventosDeClick() {
    this.colores.celeste.addEventListener("click", this.elegirColor);
    this.colores.violeta.addEventListener("click", this.elegirColor);
    this.colores.naranja.addEventListener("click", this.elegirColor);
    this.colores.verde.addEventListener("click", this.elegirColor);
  }
  //quita la informacion de que boton fue tocado
  QuitarEventosDeClick() {
    this.colores.celeste.removeEventListener("click", this.elegirColor);
    this.colores.violeta.removeEventListener("click", this.elegirColor);
    this.colores.naranja.removeEventListener("click", this.elegirColor);
    this.colores.verde.removeEventListener("click", this.elegirColor);
  }
  //hace la logica de el programa cada vez que pasa de nivel y nos dice si es el ultimo nivel
  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color;
    const numeroColor = this.transformarColorANumero(nombreColor);
    this.feedbackPersona(nombreColor);
    if (numeroColor === this.secuencia[this.CantidadDeLaSecuencia]) {
      this.CantidadDeLaSecuencia++;
      if (this.CantidadDeLaSecuencia === this.nivel) {
        this.nivel++;
        this.QuitarEventosDeClick;
        //mensaje de gano
        if (this.nivel === this.Ultimo_nivel + 1) {
          this.ganoElJuego();
        } else {
          setTimeout(() => {
            this.siguienteNivel();
          }, 800);
        }
      }
    } else {
      //mensaje de perdio
      setTimeout(() => {
        this.perdioElJuego();
      }, 150);
    }
  }
  ganoElJuego() {
    swal("EN HORA BUENA GASTATE", "Tienes buena memoria :)", "success").then(
      this.inicializar()
    );
  }
  perdioElJuego() {
    swal("LO SENTIMOS PERDISTE", "VUELVE A INTENTARLO ", "error").then(() => {
      this.QuitarEventosDeClick();
      this.inicializar();
    });
  }
}
function empezarJuego() {
  const juego = new Juego();
}
