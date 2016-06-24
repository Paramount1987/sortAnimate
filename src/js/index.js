;(function($){

  var list = $('.unsorted-list');
  var btnCreateList = '.btn-create-list';
  var btnSortList = '.btn-sort-list';
  var arrRandom = [];
//---------------------------------------
  function randomArr(){
    var length = 3;
    var arr = [8,0,6];

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
      list.append('<li data-num="' + arr[i] +'"><div>' + arr[i] + '</div></li>');
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

    for (var i = arr.length - 1, time = 0; i > 0; i--) {
      for (var j = 0; j < i; j++) {
        setTimeout( showSort(j) ,  5000 * (++time) );

        function showSort(j){

          return function(){
            if (arr[j] > arr[j+1]) {
              tmp = arr[j];
              //$('.unsorted-list li').eq(j).attr('data-num', arr[j+1]);
              tmpY = parseInt( $('.unsorted-list li').eq(j).find('div').css('transform').split(',')[5] );

              arr[j] = arr[j+1];
              $('.unsorted-list li').eq(j).find('div').css('transform', 'translate(0,' + parseInt( $('.unsorted-list li').eq(j+1).find('div').css('transform').split(',')[5])  + 'px)');

              arr[j+1] = tmp;
              $('.unsorted-list li').eq(j+1).find('div').css('transform', 'translate(0,' + tmpY + 'px)');
              //$('.unsorted-list li').eq(j+1).attr('data-num', tmp);
              console.log(arr);
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