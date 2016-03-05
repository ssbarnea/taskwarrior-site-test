$(document).ready(function(){

  initCriteria();

  //NOTE: To append in different container
  var appendToContainer = function(htmlele, record){
    console.log(record)
  };

  var FJS = FilterJS(tools, '#tools', {
    template: '#tool-template',
    search: {ele: '#searchbox', fields: ['name', 'description', 'author']},
    callbacks: {
      afterFilter: function(result){
        $('#total_tools').text(result.length);
      }
    }
    //appendToContainer: appendToContainer
  });



//  FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range', all: 'all'});
//  FJS.addCriteria({field: 'rating', ele: '#rating_filter', type: 'range'});
//  FJS.addCriteria({field: 'runtime', ele: '#runtime_filter', type: 'range'});
  FJS.addCriteria({field: 'category', ele: '#category_criteria input:checkbox'});
  FJS.addCriteria({field: 'obsolete', ele: '#obsolete_criteria input:checkbox'});
  FJS.addCriteria({field: 'license', ele: '#license_criteria input:checkbox', all: 'all'});



  window.FJS = FJS;
});

function initCriteria(){
  $('#category_criteria :checkbox').prop('checked', true);
  $('#all_category').on('click', function(){
    $('#category_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
  $('#license_criteria :checkbox').prop('checked', true);
  $('#all_license').on('click', function(){
    $('#license_criteria :checkbox').prop('checked', $(this).is(':checked'));
  });
}
