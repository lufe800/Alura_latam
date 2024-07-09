const textArea = document.querySelector('.form_text');
const imagenNino = document.querySelector('.imagenMensaje');
const loader = document.querySelector('.loader');
const tituloMensaje = document.querySelector('.tituloMensaje');
const textoMensaje = document.querySelector('.textoMensaje');
const botonEncriptar = document.querySelector('.btnEncriptar');
const botonDesencriptar = document.querySelector('.btnDesencriptar');
const botonCopiar = document.querySelector('.btnCopiar');

const llaves = [
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

//función para encriptar
function encriptado(mensaje){
    let mensajeEncriptado = "";
    for(let i = 0; i<mensaje.length; i++){
        let letra = mensaje[i];
        let letraEncriptada = letra;
        for(let j=0; j<llaves.length; j++){
            if(letra === llaves[j][0]){
                letraEncriptada = llaves[j][1];
                break;
            }
        }
        mensajeEncriptado += letraEncriptada;
    }
    return mensajeEncriptado;

}

//función para desencriptar
function desencriptar(mensaje){
    let mensajeDesencriptado = mensaje;
    for(let i=0; i<llaves.length;i++){
        let regex = new RegExp(llaves[i][1], 'g');
        mensajeDesencriptado = mensajeDesencriptado.replace(regex, llaves[i][0]);
    }
    return mensajeDesencriptado;
}

//Ocultar elementos
textArea.addEventListener("input", (e)=>{
    imagenNino.style.display = "none";
    loader.classList.remove("hidden");
    tituloMensaje.textContent = "Capturando Mensaje";
    textoMensaje.textContent = "";
});

//funcion boton encriptar
botonEncriptar.addEventListener('click', (e)=>{
    e.preventDefault();                          //evita que se recargue la pagina y se muestre el mensaje 
    let mensaje = textArea.value.toLowerCase();
    let mensajeEncriptado = encriptado(mensaje);
    textoMensaje.textContent = mensajeEncriptado;
    botonCopiar.classList.remove("hidden");
    tituloMensaje.textContent = "El resultado es: ";
});

botonDesencriptar.addEventListener('click', (e)=>{
    e.preventDefault();
    let mensaje = textArea.value.toLowerCase();
    let mensajeDesencriptado = desencriptar(mensaje);
    textoMensaje.textContent = mensajeDesencriptado;
    tituloMensaje.textContent = "El resultado es: ";
    botonCopiar.classList.remove("hidden");
});

botonCopiar.addEventListener('click', (e)=>{
    let textoCopiado = textoMensaje.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=>{
        textArea.value = ""; 
        imagenNino.style.display = 'block';
        loader.classList.add('hidden');
        tituloMensaje.textContent = ("El texto se copió.");
        botonCopiar.classList.add('hidden');
        textoMensaje.textContent = "";
    })
});

