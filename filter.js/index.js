$(document).ready(function(){

  initCriteria();



  //NOTE: To append in different container
  var appendToContainer = function(htmlele, record){
    console.log(record)
  };

  var FJS = FilterJS(tools, '#tools', {
    template: '#tool-template',
    search: {ele: '#searchbox'},
    //search: {ele: '#searchbox', fields: ['runtime']}, // With specific fields
    callbacks: {
      afterFilter: function(result){
        $('#total_tools').text(result.length);
      }
    }
    //appendToContainer: appendToContainer
  });

  FJS.addCallback('beforeAddRecords', function(){
    if(this.recordsCount >= 450){
      this.stopStreaming();
    }
  });

  FJS.addCallback('afterAddRecords', function(){
    var percent = (this.recordsCount - 250)*100/250;

    $('#stream_progress').text(percent + '%').attr('style', 'width: '+ percent +'%;');

    if (percent == 100){
      $('#stream_progress').parent().fadeOut(1000);
    }
  });

  FJS.setStreaming({
    data_url: 'data/stream_movies.json',
    stream_after: 1,
    batch_size: 50
  });

//  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range', all: 'all'});
//  FJS.addCriteria({field: 'rating', ele: '#rating_filter', type: 'range'});
//  FJS.addCriteria({field: 'runtime', ele: '#runtime_filter', type: 'range'});
  FJS.addCriteria({field: 'category', ele: '#genre_category input:checkbox'});



  window.FJS = FJS;
});

function initCriteria(){
  $('#category_criteria :checkbox').prop('checked', true);
  $('#all_category').on('click', function(){
    $('#category_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}
