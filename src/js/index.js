;(function($){

   var sortAnimate = {

      list:          '.unsorted-list',
      btnCreateList: '.btn-create-list',
      btnSortList:   '.btn-sort-list',
      arrRandom:     [],
      textSort:      '.text-sort',
      sortInfo:      '.sort-info',

       init: function(){
          this.showListClick( this.btnCreateList, this.list );
          this.showSortListClick( this.btnSortList, this.list );
       },
       //----------------------------generate random arr
       randomArr: function(length){
          var arr = [];

          for (var i = 0; i < length; i++){
             arr.push( Math.round( Math.random() * 10 ));
          }
          return arr;
       },
       //------------------------------create list from random arr
       createList: function(arr, list){
          $(list).empty();

          for (var i = 0; i < arr.length; i++){
             $(list).append('<li data-num="' + arr[i] +'">' + arr[i] + '</li>');
          }
       },
       //------------------------------sort list from random arr
       sortList: function(arr, list){
          var tmp;
          var tmpY;
          var that = this;
          that.startSorting();

          for (var i = arr.length - 1, time = 1; i > 0; i--) {
             for (var j = 0; j < i; j++) { //--обход массива каждым элемнетом

                setTimeout( showSort(j, i) ,  500 * (++time) ); //таймаут для каждого обхода - для визуализации обхода

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

                         setTimeout(callbackInsert(j), 300); //изменение порядка li в dom

                         function callbackInsert(j){
                            return function(){
                              $(list + ' li').eq(j).insertAfter( $(list + ' li').eq(j+1) );
                            }
                         }
                      }

                      setTimeout(function(){ $(list + ' li.active').removeClass('active'); }, 400);

                      if ( i == 1) {that.endSorting();}
                   }
                }
             }
          }
       },
       //--------------------------------start sort status
       startSorting: function(){
          $(this.textSort).text('list sorting...');
          $(this.btnCreateList).prop('disabled', true);
          $(this.btnSortList).prop('disabled', true);
          $(this.sortInfo).css('display', 'none');
          $(this.sortInfo).find('div').eq(0).html( 'Before sort: ' + this.arrRandom);
       },
       //---------------------------------end sort status
       endSorting: function(){
          $(this.textSort).text('list sorting ended');
          $(this.btnCreateList).prop('disabled', false);
          $(this.btnSortList).prop('disabled', false);
          $(this.sortInfo).css('display', 'block');
          $(this.sortInfo).find('div').eq(1).html('After sort:&nbsp;&nbsp;&nbsp;&nbsp;' + this.arrRandom);
       },
       //-------------------------------show list from random arr
       showListClick: function(btn, list){
          var that = this;
          $('body').on('click', btn, function(){
             that.arrRandom = that.randomArr(9);
             that.createList(that.arrRandom, list);
             $(that.btnSortList).prop('disabled', false);
         });
       },
       //---------------------------------show sort list
       showSortListClick: function(btn, list){
          var that = this;
          $('body').on('click', btn, function(){
             that.sortList(that.arrRandom, list);
          });
       }
   };

  sortAnimate.init();
}(jQuery));