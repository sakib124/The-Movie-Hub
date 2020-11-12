$(document).ready(function() {
  $(document).scroll(function () {
    function isScrolledIntoView(elem) {
        let docViewTop = $(window).scrollTop();
        let docViewBottom = docViewTop + $(window).height();
        let elemTop = $(elem).offset().top;
        return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
      }
    
      function checkScrolling() {
        if (isScrolledIntoView($('#footer')) == true) {
          if ($('#footer').hasClass('slowReveal')) { /**/ } else {
            $('#footer').addClass('slowReveal');
          }
        } else {
          if ($('#footer').hasClass('slowReveal')) {
            $('#footer').removeClass('slowReveal');
          }
        }
      }
    
      window.onscroll = function() {
        checkScrolling();
      }
      window.onresize = function() {
        checkScrolling();
      }

});

$.ajax({
        type: "GET",
          url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US&page=1' ,
          dataType: 'json',
          success: function(data) {
            $("#moviesCarousel").html(
              `<div class="carousel-item active">
              <a onclick="movieSelected('${data.results[0].id}')"><img class="d-block w-100" src="https://image.tmdb.org/t/p/original/${data.results[0].backdrop_path}" alt="First slide" >
          <div id = "latestMoviesInfo" class="carousel-caption d-none d-md-block text-left">
            <p>LATEST</p>
            <h5>${data.results[0].original_title}</h5>
            <p>Rating: ${data.results[0].vote_average} | Language: ${data.results[0].original_language.toUpperCase()}</p>
          </div>
        </div></a>
        <div class="carousel-item">
        <a onclick="movieSelected('${data.results[1].id}')"><img class="d-block w-100" src="https://image.tmdb.org/t/p/original/${data.results[1].backdrop_path}" alt="Second slide">
          <div id = "latestMoviesInfo" class="carousel-caption d-none d-md-block text-left">
            <p>LATEST</p>
            <h5>${data.results[1].original_title}</h5>
            <p>Rating: ${data.results[1].vote_average} | Language: ${data.results[1].original_language.toUpperCase()}</p>
          </div>
        </div></a>
        <div class="carousel-item">
        <a onclick="movieSelected('${data.results[2].id}')"><img class="d-block w-100" src="https://image.tmdb.org/t/p/original/${data.results[2].backdrop_path}" alt="Third slide">
          <div id = "latestMoviesInfo" class="carousel-caption d-none d-md-block text-left">
            <p>LATEST</p>
            <h5>${data.results[2].original_title}</h5>
            <p>Rating: ${data.results[2].vote_average} | Language: ${data.results[2].original_language.toUpperCase()}</p>
          </div>
        </div></a>`
            )
          },
          error: function (_request, status, error) {
           alert(status + ", " + error);
          }
      });
    });

  $('#nowPlaying').click(function() {   
    $(this).removeClass('buttonFocus');
    $('#topRated').removeClass('buttonFocus');
    $('#upcoming').removeClass('buttonFocus');
        $(this).addClass('buttonFocus'); 
    $.ajax({
      type: "GET",
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US&page=1' ,
        dataType: 'json',
        success: function(data) {
          $("#list").html("");
          for (let i = 0; i<15;i++){
            $("#list").append(
           `<div class="col">
            <a id = "item1" class="text-decoration-none" onclick="movieSelected('${data.results[i].id}')">
            <div class="card">
              <img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data.results[i].original_title}</h5>
                <p class="card-text">${data.results[i].vote_average} | ${data.results[i].original_language.toUpperCase()}</p>
              </div>
            </div></a>
          </div>`
          )
        }
      },
        error: function (_request, status, error) {
         alert(status + ", " + error);
        }
    });
});

$('#upcoming').click(function() {  
  $(this).removeClass('buttonFocus');
  $('#nowPlaying').removeClass('buttonFocus');
  $('#topRated').removeClass('buttonFocus');
  $(this).addClass('buttonFocus');  
  $.ajax({
    type: "GET",
      url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US&page=1' ,
      dataType: 'json',
      success: function(data) {
        $("#list").html("");
        for (let i = 0; i<15;i++){
          $("#list").append(
         `<div class="col">
          <a id = "item1" class="text-decoration-none" onclick="movieSelected('${data.results[i].id}')">
          <div class="card">
            <img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.results[i].original_title}</h5>
              <p class="card-text">${data.results[i].vote_average} | ${data.results[i].original_language.toUpperCase()}</p>
            </div>
          </div></a>
        </div>`
        )
      }
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });
});

$('#topRated').click(function() {    
  $(this).removeClass('buttonFocus');
  $('#upcoming').removeClass('buttonFocus');
  $('#nowPlaying').removeClass('buttonFocus');
  $(this).addClass('buttonFocus');
  $.ajax({
    type: "GET",
      url: 'https://api.themoviedb.org/3/movie/top_rated?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US&page=1' ,
      dataType: 'json',
      success: function(data) {
        $("#list").html("");
        for (let i = 0; i<15;i++){
          $("#list").append(
         `<div class="col">
         <a id = "item1" class="text-decoration-none" onclick="movieSelected('${data.results[i].id}')">
          <div class="card">
            <img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.results[i].original_title}</h5>
              <p class="card-text">${data.results[i].vote_average} | ${data.results[i].original_language.toUpperCase()}</p>
            </div>
          </div></a>
        </div>`
          )
      }
      console.log(data)
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });
});


$('#search').click(function() {    
  $(window).scrollTop(0);
  let input = $('#movie').val();
  $.ajax({
    type: "GET",
      url: 'https://api.themoviedb.org/3/search/movie?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US&page=1&include_adult=false&query='+input ,
      dataType: 'json',
      success: function(data) {
        $('#searchQuery').html(
          `<h3 style="margin: 50px;color:white;">SEARCH RESULTS FOR ${input.toUpperCase()}</h3>
          <hr style="width: 10%;background-color: white;"/>`
        )
        $("#searchList").html("");
        for (let i = 0; i<15;i++){
          $("#searchList").append(
         `<div class="col">
         <a id = "item1" class="text-decoration-none" onclick="movieSelected('${data.results[i].id}')">
          <div class="card">
            <img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${data.results[i].original_title}</h5>
              <p class="card-text">${data.results[i].vote_average} | ${data.results[i].original_language.toUpperCase()}</p>
            </div>
          </div></a>
        </div>`
          )
      }
      console.log(data)
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

});

$('#movie').keypress(function(e){
  if(e.which == 13){//Enter key pressed
      $('#search').click();//Trigger search button click event
  }
});

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie-data.html';
  return false;
}

function favouritesSelected(id){
  
  let array = JSON.parse(localStorage.getItem("data")) || [];
  if(array.indexOf(id) == -1){
      array.push(id);
      $('#heart').css('color', 'red');
  }
  else{
    let index = array.indexOf(id);
    array.splice(index, 1);
    $('#heart').css('color', 'white');
  }
  localStorage.setItem("data", JSON.stringify(array));
}

function getMovie() {    
  let movieId = sessionStorage.getItem('movieId');

  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US` ,
      dataType: 'json',
      success: function(data) {
        $("#moviePoster").html(
         `<div class="carousel-item active">
         <img class="d-block w-100" style = "opacity:0.6" src="https://image.tmdb.org/t/p/original${data.backdrop_path}" alt="First slide" >
         <div id = "movieBackground">
             <a href="javascript:history.back()"><i id="back" class="fas fa-3x fa-arrow-left w3-animate-left" style="font-size: 3vw;color:white"></i></a>
             <a onclick="favouritesSelected(${movieId})"><i id = "heart" class="fas fa-heart fa-3x w3-animate-right" style="font-size: 3vw;color:white;"></i></a>
             <a href="index.html"><i id = "share" class="fas fa-share-square fa-3x" style="font-size: 3vw;color:white"></i></a>
         </div>
       </div>`
          )
        $("#summary").html(
          `<p>${data.overview}</p>`
        )
        $("#movieInfo").html(
          `<div class="col-sm-3">
          <img src="https://image.tmdb.org/t/p/original${data.poster_path}" class="card-img-top" alt="...">
      </div>
      <div style="color:white" class="col-sm-6">
          <h2 style="font-weight:bold;letter-spacing: 0.1rem;">${data.original_title}</h2>
        <p>Rating: ${data.vote_average} </p>
        <p>Release Date: ${data.release_date} </p>
        <p>Genre: ${data.genres[0] === undefined ? `N/A`: `${data.genres[0].name}`}</p>
        <p>Language: ${data.original_language.toUpperCase()} </p>
        <p>Runtime: ${data.runtime} minutes</p>
      </div>`
        )
        let array = JSON.parse(localStorage.getItem("data")) || [];
        if(array.indexOf(data.id) == -1){
          $('#heart').css('color', 'white');
        }
        else{
        $('#heart').css('color', 'red');
        }
      console.log(data)
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US` ,
      dataType: 'json',
      success: function(data) {
        $("#trailer").html(
          `<h2 style="letter-spacing: .3rem;">TRAILER</h2>
          <iframe width="450" height="370" src="https://www.youtube.com/embed/${data.results[0].key}">
</iframe>`
        )
      
      console.log(data)
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US` ,
      dataType: 'json',
      success: function(data) {
        $("#reviews").html(
          `<h2 style="letter-spacing: .3rem;">REVIEWS</h2>
          <h4>${data.results[0].author}</h4>
          <p style = "font-size:1em;letter-spacing:normal;">${data.results[0].content.length > 400 ? `${data.results[0].content.substr(0,400).replace(/.$/,'...')}` : `${data.results[0].content}`}</p><a target="_blank" style = "text-decoration: none;color: #007bff;" href="${data.results[0].url}"><p style="font-size:1em;letter-spacing:normal;">View full review</p></a>
          <h4>${data.results[1].author}</h4>
          <p style = "font-size:1em;letter-spacing:normal;">${data.results[1].content.length > 400 ? `${data.results[1].content.substr(0,400).replace(/.$/,'...')}` : `${data.results[1].content}`}</p><a target="_blank" style = "text-decoration: none;color: #007bff;" href="${data.results[1].url}"><p style="font-size:1em;letter-spacing:normal;">View full review</p></a>`
        )
      
      console.log(data)
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US` ,
      dataType: 'json',
      success: function(data) {
        $("#creditsRow1").html("");
        $("#creditsRow2").html("");
        
        for (let i = 0; i<5;i++){
          $("#creditsRow1").append(
         `<div class="col">
         <a id = "item1" class="text-decoration-none">
         <div class="card">
           <img src="https://image.tmdb.org/t/p/original${data.cast[i].profile_path}" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title text-center fa-1x">${data.cast[i].name}</h5>
           </div>
         </div></a>
       </div>`
          )
      }
        for (let j = 5; j<10;j++){
          $("#creditsRow2").append(
         `<div class="col">
         <a id = "item1" class="text-decoration-none">
         <div class="card">
           <img src="https://image.tmdb.org/t/p/original${data.cast[j].profile_path}" class="card-img-top" alt="...">
           <div class="card-body">
             <h5 class="card-title text-center fa-1x">${data.cast[j].name}</h5>
           </div>
         </div></a>
       </div>`
          )
      }
      console.log(data)
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

};

function getFavourites(){
  let array = JSON.parse(localStorage.getItem("data")) || [];
  for (var i = 0; i < array.length; i++) {
    $.ajax({
      type: "GET",
        url: `https://api.themoviedb.org/3/movie/${array[i]}?api_key=8f7e9c5c2e2e91054ecc2f2c57d0c828&language=en-US` ,
        dataType: 'json',
        success: function(data) {
          $("#favouritesList").append(
           `<div class="col">
           <a id = "item1" class="text-decoration-none" onclick="movieSelected('${data.id}')">
           <div class="card">
             <img src="https://image.tmdb.org/t/p/original${data.poster_path}" class="card-img-top" alt="...">
             <div class="card-body">
               <h5 class="card-title">${data.original_title}</h5>
               <p class="card-text">${data.vote_average} | ${data.original_language.toUpperCase()}</p>
             </div>
           </div></a>
         </div>`
            )
        console.log(data)
      },
        error: function (_request, status, error) {
         alert(status + ", " + error);
        }
    });
}
  
}
