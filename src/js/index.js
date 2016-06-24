;(function($){

  var list = $('.unsorted-list');
  var btnCreateList = '.btn-create-list';
  var btnSortList = '.btn-sort-list';
  var arrRandom = [];
//---------------------------------------
  function randomArr(){
    var length = 3;
    var arr = [8,6,6];

    //for (var i = 0; i < length; i++){
    //  var n = Math.random() * 10;
    //  arr.push( Math.round(n) );
    //}
    return arr;
  }
//-----------------------------------------
  function createList(arr, list){
    list.empty();
    for (var i = 0; i < arr.length; i++){
      list.append('<li data-num="' + arr[i] + i +'"><div>' + arr[i] + '</div></li>');
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
    var tmpId;
    var tmpIdNext;
    for (var i = arr.length - 1, time = 0; i > 0; i--) {
      for (var j = 0; j < i; j++) {
        setTimeout( showSort(j) ,  1000 * (++time) );

        function showSort(j){
          return function(){
            if (arr[j] > arr[j+1]) {
              tmp = arr[j];
              tmpY = parseInt( $('.unsorted-list li[data-num="' + arr[j] + j +'"]').find('div').css('transform').split(',')[5] );
              tmpId = $('.unsorted-list li[data-num="' + arr[j] + j +'"]').data('num');
              tmpIdNext = $('.unsorted-list li[data-num="' + arr[j+1] + ( j + 1 ) +'"]').data('num');




              $('.unsorted-list li[data-num="' + arr[j] + j +'"]').find('div').css('transform', 'translate(0,' + parseInt( $('.unsorted-list li[data-num="' + arr[j+1] + (j+1) +'"]').find('div').css('transform').split(',')[5])  + 'px)');
              arr[j] = arr[j+1];

              $('.unsorted-list li[data-num="' + arr[j+1] + (j+1) +'"]').find('div').css('transform', 'translate(0,' + tmpY + 'px)');
              arr[j+1] = tmp;

              $ ('.unsorted-list li[data-num="' + tmpId +'"]').attr('data-num',  tmpIdNext);
              $('.unsorted-list li[data-num="' + tmpIdNext +'"]').attr('data-num', tmpId );
              console.log(tmpId,tmpIdNext);

            }
          }
        }
      }
    }



  }
//---------------------------------------
  showList(btnCreateList);
  showSortList(btnSortList)

}(jQuery));