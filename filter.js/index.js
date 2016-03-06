$(document).ready(function(){

  initCriteria();

  var FJS = FilterJS(tools, '#tools', {
    template: '#tool-template',
    search: {ele: '#searchbox', fields: ['name', 'description', 'author']},
    callbacks: {
      afterFilter: function(result){
        $('#total_tools').text(result.length);
      }
    }
  });



//  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range', all: 'all'});
//  FJS.addCriteria({field: 'rating', ele: '#rating_filter', type: 'range'});
//  FJS.addCriteria({field: 'runtime', ele: '#runtime_filter', type: 'range'});
  FJS.addCriteria({field: 'category', ele: '#category_criteria input:checkbox'});
  FJS.addCriteria({field: 'obsolete', ele: '#obsolete_criteria input:checkbox'});
    FJS.addCriteria({field: 'theme', ele: '#theme_criteria input:checkbox', all: 'all'});
  FJS.addCriteria({field: 'language', ele: '#language_criteria input:checkbox', all: 'all'});



  window.FJS = FJS;
  FJS.filter();

});

function initCriteria(){
  $('#category_criteria :checkbox').prop('checked', true);
  $('#all_category').on('click', function(){
    $('#category_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}
