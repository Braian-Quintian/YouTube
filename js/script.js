// DEFINIMOS QUE EN BOTON BUSCAR SE EJECUTA LA FUNCION "youtube"
const btnBuscar = document.querySelector('#buscar');

// EXTRAEMOS EL ID DEL VIDEO PARA EXTRAER TODOS LOS DATOS NECESARIOS
btnBuscar.addEventListener("click", extraerId);

async function extraerId() {
    let buscaVideo = ((document.querySelector("#buscaryt").value).split(' ')).join("%20");
    console.log(buscaVideo);
    try {
        const result = await youtube(buscaVideo);
        const idVideo = result.contents[0].video.videoId;
        const idLogo = result.contents[0].video.author.avatar[0].url;
        const idNombre = result.contents[0].video.author.title;
        const idTitulo = result.contents[0].video.title;
        const videoRel1 = result.contents[1].video.videoId;
        const videoRel2 = result.contents[2].video.videoId;
        const videoRel3 = result.contents[3].video.videoId;

        crearVideo(idVideo);
        crearLogo(idLogo);
        crearNombre(idNombre);
        crearTitulo(idTitulo);
        crearVideoRel(videoRel1, videoRel2, videoRel3);

        const commentsResult = await comentarios(idVideo);
        const idComent1 = commentsResult.comments[0].content;
        const idComent2 = commentsResult.comments[1].content;
        const idComent3 = commentsResult.comments[2].content;
        const idComent4 = commentsResult.comments[3].content;
        const idComent5 = commentsResult.comments[4].content;

        crearComentario(idComent1, idComent2, idComent3, idComent4, idComent5);

        const descriptionResult = await descripcion(idVideo);
        const idDescripcion = descriptionResult.description;

        crearDescripcion(idDescripcion);
    } catch (error) {
        console.error(error);
    }
}

// Función para realizar la solicitud a la API de YouTube
async function youtube(buscaVideo) {
    const url = `https://youtube138.p.rapidapi.com/search/?q=${buscaVideo}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ef83921e6bmsh953b269570e564dp16eac6jsn64d0c9daeb77',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    const response = await fetch(url, options);
    const result = await response.json();
    return result;
}

// Función para obtener los comentarios de un video
async function comentarios(idVideo) {
    const url2 = `https://youtube138.p.rapidapi.com/video/comments/?id=${idVideo}&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ef83921e6bmsh953b269570e564dp16eac6jsn64d0c9daeb77',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    const response = await fetch(url2, options);
    const result = await response.json();
    return result;
}

// Función para obtener la descripción de un video
async function descripcion(idVideo) {
    const url3 = `https://youtube138.p.rapidapi.com/video/details/?id=${idVideo}&hl=en&gl=US`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ef83921e6bmsh953b269570e564dp16eac6jsn64d0c9daeb77',
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };

    const response = await fetch(url3, options);
    const result = await response.json();
    return result;
}

// CREAMOS CADA UNO DE LOS ELEMENTOS
function crearVideo(idVideo) {
    document.querySelector("#video").innerHTML = `<iframe width="100%" height="800px" src="https://www.youtube.com/embed/${idVideo}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}

function crearLogo(idLogo) {
    document.querySelector("#logo").innerHTML = `<img src="${idLogo}" alt="" srcset="" id="imagenLogo">`;
}

function crearNombre(idNombre) {
    document.querySelector("#nombreCanal").innerHTML = `<p id="nombre"><b>${idNombre}</b></p>`;
}

function crearTitulo(idTitulo) {
    document.querySelector("#tituloVideo").innerHTML = `<p id="titulo">${idTitulo}</p>`;
}

function crearVideoRel(videoRel1, videoRel2, videoRel3) {
    document.querySelector("#videoRelacionado1").innerHTML = `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoRel1}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    document.querySelector("#videoRelacionado2").innerHTML = `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoRel2}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    document.querySelector("#videoRelacionado3").innerHTML = `<iframe width="100%" height="200" src="https://www.youtube.com/embed/${videoRel3}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
}

function crearComentario(idComent1, idComent2, idComent3, idComent4, idComent5) {
    document.querySelector("#comentarios").innerHTML = `<li>${idComent1}</li> <li>${idComent2}</li> <li>${idComent3}</li> <li>${idComent4}</li> <li>${idComent5}</li>`;
}

function crearDescripcion(idDescripcion) {
    document.querySelector("#descripcion").innerHTML = `<p>${idDescripcion}</p>`;
}
