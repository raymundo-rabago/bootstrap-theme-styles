
  // JQUERY CALLBACKS
  $(document).on('ready',function(){

    $('#myTab a').click(function (e) {
      e.preventDefault()
      $(this).tab('show')
    });
    $('.bs-example-tooltips button').tooltip();
    $('.bs-popover-example button').popover();
    
  });
