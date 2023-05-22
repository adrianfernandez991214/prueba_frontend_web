const baseURl = process.env.React_APP_API_URL;

//Petición fetch sin utilizando JWT
const fetchSinToken = (endpoint, data, method = 'GET') => {

    const url = `${baseURl}/${endpoint}`;

    if (method === 'GET') {
        return fetch(url)
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

}

//Petición fetch utilizando JWT
const fetchConToken = (endpoint, data, method = 'GET') => {
    
    const url = `${baseURl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {
        return fetch(url, {
            method,
            headers: {
                'Content-type': 'application/json',
                'x-token': token
            },
            body: JSON.stringify(data)
        });
    }

}

//Petición fetch utilizando JWT, utilizando FormData dato que el archivo
//de un libro no puede ser enviado en un application/json
const fetchConTokenArchivo = (endpoint, data, method = 'GET') => {

    const url = `${baseURl}/${endpoint}`;
    const token = localStorage.getItem('token') || '';

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        });
    } else {

        const formData = new FormData();
        formData.append('archivo', data.archivo);
        formData.append('titulo', data.titulo);
        formData.append('genero', data.genero);
        formData.append('anno', data.anno);
        formData.append('autor', data.autor);

        return fetch(url, {
            method,
            headers: {
                'x-token': token
            },
            body: formData
        });
    }

}

export {
    fetchSinToken,
    fetchConToken,
    fetchConTokenArchivo
}