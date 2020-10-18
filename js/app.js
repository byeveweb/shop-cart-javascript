//Variables necesarias
const carrito = document.querySelector('#carrito')
const listaCursos = document.querySelector('#lista-cursos')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciaCarrito = document.querySelector('#vaciar-carrito')



//Variable que guarda el listado de carrito
let articulosCarrito = []



//Cargamos los listeners
cargarEventListeners();



//Función que carga todos los event listener
function cargarEventListeners() {

    //Agregando carrito presionando "agregar al arrito"
    listaCursos.addEventListener('click', agregarCurso)

    //Eliminar curso
    carrito.addEventListener('click', eliminaCurso)

    //VAciar el carrito
    vaciaCarrito.addEventListener('click', () => {
        articulosCarrito = []
        limpiarHTML()
    })
}




//Funciones


//Agregamos curso
function agregarCurso(e) {

    e.preventDefault()

    if (e.target.classList.contains('agregar-carrito')) {
        
        console.log('agregando al carrito')
        //Accedemos a todo el div que contiene el curso
        const cursoId = e.target.parentElement.parentElement
        leerDatosCurso(cursoId)

    }

}

//Eliminamos curso
function eliminaCurso(e) {
    
    //capturar el id
    //console.log(e.target.classList)

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id')

        //Elimina del arreglo
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        console.log(articulosCarrito)
    }

    carritoHTML()
}


//Extraemos datos
function leerDatosCurso(curso) {

    //Creamos el objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }


    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

    if (existe) {

        const cursos = articulosCarrito.map(curso => {
            //iteramos en todos los elementos cantidad será aumentada en 1
            if (curso.id === infoCurso.id) {

                curso.cantidad++
                return curso // retorna el objeto actualizado

            } else {
                return curso //retorna los no duplicados
              
            }

        })

       articulosCarrito = [...cursos]

    } else {

    //Agregar elementos al carrito
    articulosCarrito = [...articulosCarrito, infoCurso]
}


    carritoHTML()

}


//Mostrar Carrito
function carritoHTML() {


    //Limpiar el HTML
    limpiarHTML()

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {

        const { imagen, titulo, precio, cantidad, id } = curso

        const row = document.createElement('tr')
        row.innerHTML = `
            <td>
                <img src="${imagen}" width="100"> 
            </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td>
                <a href="#" class="borrar-curso" data-id= ${id}> X </a> 
            </td>

            `

        //Agrega el HTML en el tbody
        contenedorCarrito.appendChild(row)

    })

}

//Elimina HTLM
function limpiarHTML() {

    //Revisamos si el contenedor tiene algún elemento dentro
    while (contenedorCarrito.firstChild) {

        //Eliminamos todos los hijos
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }

}

