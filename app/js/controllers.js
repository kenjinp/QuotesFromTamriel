'use strict';

QFT.controller('ApplicationController', function (
  $rootScope,
  $scope,
  $location) {

    function mouseGridShift() {
      $( "html" ).mousemove(function( event ) {
        var tempX = event.pageX,
            viewportWidth = $(window).width(),
            axis = $('.quoteblock').width() / 2,
            graphBoundryX = viewportWidth - axis,
            limitY = 26,
            x = (tempX - axis),
            y = (limitY*Math.sin((1/(graphBoundryX*0.6666)*x)));
        $(".quoteblock").css({'transform':'perspective(600px) rotateY( '+ y +'deg )'});
      });
    }

    //mouseGridShift();

    $rootScope.redditBackgroundGrabber = function() {
      reddit.hot('skyrimporn').limit(50).fetch(function (res) {

        function grabRandom (res) {
          var randomInt = Math.floor(Math.random() * res.data.children.length);
          var postData = res.data.children[randomInt].data;
          var extList = postData.url.split('.');
          var ext = extList[extList.length - 1];
          if ( ext !== 'jpg') {
            return grabRandom(res);
          } else {
            return postData;
          }
        }

        var postData = grabRandom(res);
        console.log(postData);
        if ($(window).width() > 768) {
           $('html').css("background-image", "url("+postData.url+")");
        } else {
          $('html').css("background-image", "none");
          $('html').css("background-color", "#1abc89");
        }
        $('#title').text(postData.title+' ');
        $('#author').text(postData.author);
        $('#thumbnail').css("background-image", "url("+postData.url+")");
        $('#reddit-link').attr('href', 'http://reddit.com/'+postData.permalink);
      })
    };

    $rootScope.redditBackgroundGrabber();
});


QFT.controller("HomeCtrl", function (
  $rootScope,
  $scope,
  Quotes) {

  $scope.pageClass = 'page-home';

  $scope.quote = {};

  $scope.searchlink = '';

  Quotes.random()
  .success(function(data, status, headers, config) {
    $scope.quote = data;
    $scope.searchlink = 'http://uesp.net/w/index.php?search='+ data.author.replace(/[^a-zA-Z0-9]/g,'+');
  })
  .error(function(data, status, headers, config) {
    console.log('there were errors');
  });

  $('body').keyup(function(e){
   if(e.keyCode == 8){
   }
   if(e.keyCode == 32){
     Quotes.random()
     .success(function(data, status, headers, config) {
       $scope.quote = data;
       $scope.searchlink = 'http://uesp.net/w/index.php?search='+ data.author.replace(/[^a-zA-Z0-9]/g,'+');
       $rootScope.redditBackgroundGrabber();
     })
     .error(function(data, status, headers, config) {
       console.log('there were errors');
     });
   }
});

});

QFT.controller("NewCtrl", function (
  $scope,
  Quotes,
  $location) {

  $scope.pageClass = 'page-new';

  $scope.new_quote = {};

  $scope.save = function(new_data) {
    Quotes.new(new_data)
    .success(function(data, status, headers, config) {
      console.log("new quote submitted");
      $location.path('#/home');
    })
    .error(function(data, status, headers, config) {
      $scope.new_quote = {};
      console.log('error');
    })
    .then(function (res) {
    });
  };

});

QFT.controller("QuotesCtrl", function (
  $scope,
  Quotes) {

  $scope.pageClass = 'page-quote';

  $scope.quotes = {};

  Quotes.all()
    .success(function(data, status, headers, config) {
      $scope.quotes = data;
      console.log(data);
    })
    .error(function(data, status, headers, config) {
      alert(data);
    });

  $scope.del = function(id){
    Quotes.del(id)
    .success(function(data, status, headers, config) {
      console.log('deleted id: '+id+' res@'+data);
    })
    .error(function(data, status, headers, config) {
      alert(data);
    });
  }

});
