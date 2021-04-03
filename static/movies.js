
const MOVIE_DB_API = '76c19d99ee882b0d7598c17e7dcb0dbb';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w500';
const DEFAULT_POST_IMAGE = 'https://via.placeholder.com/150';

const container = document.getElementById('searchContainer');
function populateDiv(data){
    let arr = data.results;
    
    container.innerText='';
    arr.forEach(movie => {
        var temp = `<div id="searchcard" style="margin:10px; width:100px; cursor:pointer;">
                        <img style="width: 80px;" src="${generateImageDBUrl(movie.poster_path)}">
                        <p style="color: white;" id="fname">${movie.title}</p>
                        <p style="display:none;" id="fdate">${movie.release_date}</p>
                        <p style="display:none;" id="flang">${movie.original_language}</p>
                        <p style="display:none;" id="fvote">${movie.vote_average}</p>
                        <p style="display:none;" id="isrc">${generateImageDBUrl(movie.poster_path)}</p>
                    </div>`;
        container.insertAdjacentHTML('beforeend',temp);
    });
    
}


function requestMovies(url, onError) {
    fetch(url)
        .then((res) => res.json())
        .then((out)=>{
            populateDiv(out);
        })
        .catch(onError);
}

function generateMovieDBUrl(path) {
    const url = `${MOVIE_DB_ENDPOINT}/3${path}?api_key=${MOVIE_DB_API}`;
    return url;
}

function generateImageDBUrl(path) {
    const url = `${MOVIE_DB_IMAGE_ENDPOINT}${path}`;
    return url;
}

function searchMovie(value) {
    const url = generateMovieDBUrl('/search/movie') + '&query=' + value;
    requestMovies(url, handleGeneralError);
}


function resetInput(event) {
    event.preventDefault();
    document.getElementById('searchValue').value = '';
    let container = document.getElementById('searchContainer');
    container.innerText='';

}

function handleGeneralError(error) {
    alert(error.message || 'Internal Server');
}


document.getElementById('searchBtn').addEventListener('click', () => {

    let searchValue = document.getElementById('searchValue').value;
    searchMovie(searchValue);
})

document.onclick = function (event) {
    const {tagName} = event.target;
    if(tagName.toLowerCase() === 'img'){
       let div =  event.target.parentElement;
       let p = div.children;
       document.getElementById('title').value = p[1].innerText;
       document.getElementById('release').value = p[2].innerText;
       document.getElementById('lang').value = p[3].innerText;
       document.getElementById('imdb').value = p[4].innerText;
       document.getElementById('imgsrc').value = p[5].innerText;
    }
}