;(function($){

  var list = '.unsorted-list';
  var btnCreateList = '.btn-create-list';
  var btnSortList = '.btn-sort-list';
  var arrRandom = [];
  var textSort = '.text-sort';
//---------------------------------------
  function randomArr(){
    var length = 9;
    var arr = [];

    for (var i = 0; i < length; i++){
     var n = Math.random() * 10;
     arr.push( Math.round(n) );
    }
    return arr;
  }
//-----------------------------------------
  function createList(arr, list){
    $(list).empty();
    for (var i = 0; i < arr.length; i++){
      $(list).append('<li data-num="' + arr[i] +'">' + arr[i] + '</li>');
    }
  }
//-----------------------------------------
  function showList(btn){
    $('body').on('click', btnCreateList, function(){
      arrRandom = randomArr();
      createList(arrRandom, list);
    });
  }
//----------------------------------------
  function showSortList(btnSortList){
    $('body').on('click', btnSortList, function(){
      sortList(arrRandom, list);
    });
  }
//----------------------------------------
  function sortList(arr){
    var tmp;
    var tmpY;
    startSorting();

    for (var i = arr.length - 1, time = 1; i > 0; i--) {
      for (var j = 0; j < i; j++) {

          setTimeout( showSort(j, i) ,  400 * (++time) );
            
          function showSort(j, i){
            return function(){

              $(list + ' li').eq(j).addClass('active');

              if (arr[j] > arr[j+1]) {

                  tmp = arr[j];
                  tmpY = parseInt( $(list + ' li').eq(j).css('transform').split(',')[5] );

                  $(list + ' li').eq(j).css('transform', 'translate(0,' + parseInt( $(list + ' li').eq(j+1).css('transform').split(',')[5])  + 'px)');
                  arr[j] = arr[j+1];

                  $(list + ' li').eq(j+1).css('transform', 'translate(0,' + tmpY + 'px)');
                  arr[j+1] = tmp;

                  setTimeout(callbackInsert(j), 300);

                  function callbackInsert(j){
                    return function(){
                      $(list + ' li').eq(j).insertAfter( $(list + ' li').eq(j+1) );
                    }
                        
                  } 
              }

              setTimeout(function(){ $(list + ' li.active').removeClass('active'); }, 300);

              if ( i == 1) {endSorting();}
            }
          }
      }
    }
  }
//--------------------------------------
function startSorting(){
  $(textSort).text('list sorting...');
  $(btnCreateList).prop('disabled', true); 
  $(btnSortList).prop('disabled', true); 
}

function endSorting(){
  $(textSort).text('list sorting ended');
  $(btnCreateList).prop('disabled', false); 
  $(btnSortList).prop('disabled', false); 
}
//---------------------------------------
  showList(btnCreateList);
  showSortList(btnSortList)

}(jQuery));