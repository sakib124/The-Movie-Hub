const apiKey = '8f7e9c5c2e2e91054ecc2f2c57d0c828';

$(document).ready(function() {
  
// fetch latest movies using asynchronous requests
$.ajax({
        type: "GET",
          url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1` ,
          dataType: 'json',
          success: function(data) {
            $("#moviesCarousel").html(
              `<div class="carousel-item active">
              <a onclick="movieSelected('${data.results[0].id}')"><img class="d-block w-100" src="https://image.tmdb.org/t/p/original/${data.results[0].backdrop_path}" alt="First slide" >
          <div id = "latestMoviesInfo" class="carousel-caption d-none d-md-block text-left">
            <p>LATEST</p>
            <h5>${data.results[0].title}</h5>
            <p>Rating: ${data.results[0].vote_average} | Language: ${data.results[0].original_language.toUpperCase()}</p>
          </div>
        </div></a>
        <div class="carousel-item">
        <a onclick="movieSelected('${data.results[1].id}')"><img class="d-block w-100" src="https://image.tmdb.org/t/p/original/${data.results[1].backdrop_path}" alt="Second slide">
          <div id = "latestMoviesInfo" class="carousel-caption d-none d-md-block text-left">
            <p>LATEST</p>
            <h5>${data.results[1].title}</h5>
            <p>Rating: ${data.results[1].vote_average} | Language: ${data.results[1].original_language.toUpperCase()}</p>
          </div>
        </div></a>
        <div class="carousel-item">
        <a onclick="movieSelected('${data.results[2].id}')"><img class="d-block w-100" src="https://image.tmdb.org/t/p/original/${data.results[2].backdrop_path}" alt="Third slide">
          <div id = "latestMoviesInfo" class="carousel-caption d-none d-md-block text-left">
            <p>LATEST</p>
            <h5>${data.results[2].title}</h5>
            <p>Rating: ${data.results[2].vote_average} | Language: ${data.results[2].original_language.toUpperCase()}</p>
          </div>
        </div></a>`
            )
          },
          error: function (_request, status, error) {
           alert(status + ", " + error);
          }
      });
    
  // scroll animation for footer
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

  //fetch movies that are now playing
  $('#nowPlaying').click(function() {   
    $(this).removeClass('buttonFocus');
    $('#topRated').removeClass('buttonFocus');
    $('#upcoming').removeClass('buttonFocus');
        $(this).addClass('buttonFocus'); 
    $.ajax({
      type: "GET",
        url: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1` ,
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
                <h5 class="card-title">${data.results[i].title}</h5>
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

//fetch upcoming movies
$('#upcoming').click(function() {  
  $(this).removeClass('buttonFocus');
  $('#nowPlaying').removeClass('buttonFocus');
  $('#topRated').removeClass('buttonFocus');
  $(this).addClass('buttonFocus');  
  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1` ,
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
              <h5 class="card-title">${data.results[i].title}</h5>
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

//fetch top rated movies
$('#topRated').click(function() {    
  $(this).removeClass('buttonFocus');
  $('#upcoming').removeClass('buttonFocus');
  $('#nowPlaying').removeClass('buttonFocus');
  $(this).addClass('buttonFocus');
  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1` ,
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
              <h5 class="card-title">${data.results[i].title}</h5>
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

//search function to get user's search query results
$('#search').click(function() {    
  $(window).scrollTop(0);
  let input = $('#movie').val();
  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&page=1&include_adult=false&query=${input}` ,
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
              <h5 class="card-title">${data.results[i].title}</h5>
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

$('#movie').keypress(function(e){
  if(e.which == 13){//Enter key pressed
      $('#search').click();//Trigger search button click event
  }
});

});

function shareSelect(){
  $("#mail").fadeToggle(500);
  $("#twitter").fadeToggle(500);
  $("#facebook").fadeToggle(500);
  $("#reddit").fadeToggle(500);
}

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

//fetch specific movie data using it's unique id
function getMovie() {    
  let movieId = sessionStorage.getItem('movieId');

  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US` ,
      dataType: 'json',
      success: function(data) {
        $("#moviePoster").html(
         `<div class="carousel-item active">
         <img class="d-block w-100" style = "opacity:0.6" src="https://image.tmdb.org/t/p/original${data.backdrop_path}" alt="First slide" >
         <div id = "movieBackground">
             <a href="javascript:history.back()"><i id="back" class="fas fa-3x fa-arrow-left w3-animate-left" style="font-size: 3vw;color:white"></i></a>
             <a onclick="favouritesSelected(${movieId})"><i id = "heart" class="fas fa-heart fa-3x w3-animate-right" style="font-size: 3vw;color:white;"></i></a>
             <a onclick="shareSelect()"><i id = "share" class="fas fa-share-square fa-3x" style="font-size: 3vw;color:white"></i></a>
             <a target="_blank" href="mailto:?Subject=Cool%20Movie%20App!&amp;Body=https://the-movie-hub.web.app/"><i id = "mail" class="fas fa-envelope-square fa-3x" style="font-size: 3vw;color:#228B22"></i></a>
             <a target="_blank" href="https://twitter.com/share?url=https://the-movie-hub.web.app&amp;text=The%20Movie%20Hub%20&amp;hashtags=moviehub"><i id = "twitter" class="fab fa-twitter-square fa-3x" style="font-size: 3vw;color:#1DA1F2"></i></a>
             <a target="_blank" href="http://www.facebook.com/sharer.php?u=https://the-movie-hub.web.app/"><i id = "facebook" class="fab fa-facebook-square fa-3x" style="font-size: 3vw;color:#3b5998"></i></a>
             <a target="_blank" href="http://reddit.com/submit?url=https://the-movie-hub.web.app&amp;title=The%20Movie%20Hub"><i id = "reddit" class="fab fa-reddit-square fa-3x" style="font-size: 3vw;color:#FF5700"></i></a>
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
          <h2 style="font-weight:bold;letter-spacing: 0.1rem;">${data.title}</h2>
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
      
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US` ,
      dataType: 'json',
      success: function(data) {
        $("#trailer").html(
          `<h2 style="letter-spacing: .3rem;">TRAILER</h2>
          <iframe width="450" height="370" src="https://www.youtube.com/embed/${data.results[0].key}">
</iframe>`
        )
      
      
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US` ,
      dataType: 'json',
      success: function(data) {
        $("#reviews").html(
          `<h2 style="letter-spacing: .3rem;">REVIEWS</h2>
          <h4>${data.results[0].author}</h4>
          <p style = "font-size:1em;letter-spacing:normal;">${data.results[0].content.length > 400 ? `${data.results[0].content.substr(0,400).replace(/.$/,'...')}` : `${data.results[0].content}`}</p><a target="_blank" style = "text-decoration: none;color: #007bff;" href="${data.results[0].url}"><p style="font-size:1em;letter-spacing:normal;">View full review</p></a>
          <h4>${data.results[1].author}</h4>
          <p style = "font-size:1em;letter-spacing:normal;">${data.results[1].content.length > 400 ? `${data.results[1].content.substr(0,400).replace(/.$/,'...')}` : `${data.results[1].content}`}</p><a target="_blank" style = "text-decoration: none;color: #007bff;" href="${data.results[1].url}"><p style="font-size:1em;letter-spacing:normal;">View full review</p></a>`
        )
      
      
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

  $.ajax({
    type: "GET",
      url: `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US` ,
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
      
    },
      error: function (_request, status, error) {
       alert(status + ", " + error);
      }
  });

};

//fetch user's favourite movies
function getFavourites(){
  let array = JSON.parse(localStorage.getItem("data")) || [];
    for (let i = 0; i < array.length; i++) {
      $.ajax({
        type: "GET",
          url: `https://api.themoviedb.org/3/movie/${array[i]}?api_key=${apiKey}&language=en-US` ,
          dataType: 'json',
          success: function(data) {
            $("#favouritesList").append(
             `<div class="col">
             <a id = "item1" class="text-decoration-none" onclick="movieSelected('${data.id}')">
             <div class="card">
               <img src="https://image.tmdb.org/t/p/original${data.poster_path}" class="card-img-top" alt="...">
               <div class="card-body">
                 <h5 class="card-title">${data.title}</h5>
                 <p class="card-text">${data.vote_average} | ${data.original_language.toUpperCase()}</p>
               </div>
             </div></a>
           </div>`
              )
          
        },
          error: function (_request, status, error) {
           alert(status + ", " + error);
          }
      });
    }
  
}

function registerPage(){
  $('#signup').css('display','block');
  $('#login').css('display','none');
}

function loginPage(){
  $('#login').css('display','block');
  $('#signup').css('display','none');
}

$('#confirmPassword').keypress(function(e){
  if(e.which == 13){//Enter key pressed
      $('#signupBtn').click();//Trigger search button click event
  }
});

$('#password').keypress(function(e){
  if(e.which == 13){//Enter key pressed
      $('#loginBtn').click();//Trigger search button click event
  }
});

//firebase authentication for signup, login, update, and delete
function signUp(){
  let email = $('#createdEmail').val();
  let password = $('#createdPassword').val();
  let confirmPassword = $('#confirmPassword').val();
            if (password != confirmPassword) {
                alert("Passwords do not match.");
                return false;
            }
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
              // Handle Errors here.
              let errorCode = error.code;
              let errorMessage = error.message;
          
              window.alert("Error : " + errorMessage);
              // ...
            });
        };
  


function browseGuest(){
  firebase.auth().signInAnonymously().catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;
    // ...
    window.alert("Error : " + errorMessage);
  });

}

function login(){
  let email = $('#email').val();
  let password = $('#password').val();

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    let errorCode = error.code;
    let errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    $('#edit').css('display','block');
    $('#login').css('display','none');
    $('#signup').css('display','none');
    $('#favouritesPage').css('visibility', 'visible');
    $("#editEmail").css('background-color', 'white').prop('disabled', false).val('');  
      $('#editPassword').css('background-color', 'white').prop('disabled', false).val(''); 
      $('#confirmEditPassword').css('background-color', 'white').prop("disabled", false).val('');
      $('#saveEmail').prop("disabled", false).css('cursor', 'pointer');
      $('#savePass').prop("disabled", false).css('cursor', 'pointer');
      $('#delete').prop("disabled", false).css('cursor', 'pointer');
    

    let user = firebase.auth().currentUser;

    

    if(user.isAnonymous == true){
      $('#userHeading').html('Welcome Guest');
      $("#editEmail").css('background-color', '#BEB9B3').prop("disabled", true).val('');
      $('#editPassword').css('background-color', '#BEB9B3').prop("disabled", true).val('');
      $('#confirmEditPassword').css('background-color', '#BEB9B3').prop("disabled", true).val('');
      $('#saveEmail').prop("disabled", true).css('cursor', 'default');
      $('#savePass').prop("disabled", true).css('cursor', 'default');
      $('#delete').prop("disabled", true).css('cursor', 'default');
    }

    if(user != null){

      let email = user.email;
      $('#userHeading').html('Welcome ' + email.substring(0, email.lastIndexOf("@")));

    }

  } else {
    // No user is signed in.
    $('#signup').css('display','none');
    $('#edit').css('display','none');
    $('#login').css('display','block');
    $(document).on('click', '#navFav', function(){
      window.alert("Please login to use this feature.");
      return false;
    });
    $('#favouritesPage').css('visibility', 'hidden');
    $("meta[name='fav']").attr('content', '0.01;url=form.html');
  }
});

function saveUser(){
  let user = firebase.auth().currentUser;
  let email = $('#editEmail').val();
user.updateEmail(email).then(function() {
  location.reload();
}).catch(function(error) {
  window.alert("Error : " + error);
});
}

function savePassword(){
  let password = $("#editPassword").val();
  let confirmPassword = $("#confirmEditPassword").val();
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
            }
  let user = firebase.auth().currentUser;
  user.updatePassword(password).then(function() {
    location.reload();
  }).catch(function(error) {
    window.alert("Error : " + error);
  });
        };

function deleteUser(){
  let user = firebase.auth().currentUser;
  if (confirm('Are you sure you want to delete the user?')) {
    user.delete().then(function() {
      window.alert("User deleted");
    }).catch(function(error) {
      window.alert("Error : " + error);
    });
  } else {
    return false;
  }
}

function logoutUser(){
  firebase.auth().signOut();
}