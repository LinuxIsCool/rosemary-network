$('.tile')
  // tile mouse actions
  .on('mouseover', function(){
    $(this).children('.photo').css({'transform': 'scale('+ $(this).attr('data-scale') +')'});
  })
  .on('mouseout', function(){
    $(this).children('.photo').css({'transform': 'scale(1)'});
  })
  .on('mousemove', function(e){
    $(this).children('.photo').css({'transform-origin': ((e.pageX - $(this).offset().left) / $(this).width()) * 100 + '% ' + ((e.pageY - $(this).offset().top) / $(this).height()) * 100 +'%'});
  })

  // tiles set up
  .each(function(){
    $(this)
      // add a photo container
      .append('<div class="photo"></div>')
      // some text just to show zoom level on current item in this example
      .append('<div class="txt"><div class="x">'+ $(this).attr('message') +'</div><br></div>')
      // set up a background image for each tile based on data-image attribute
      .children('.photo').css({'background-image': 'url('+ $(this).attr('data-image') +')'});
  })

//
// var app = document.getElementById('app');
//
// var typewriter = new Typewriter(app, {
//     loop: true
// });
//
// typewriter.typeString('Tribe Vibe')
//     .pauseFor(100)
//     .deleteAll()
//     .typeString('Rebuilding')
//     .pauseFor(100)
//     .deleteChars(10)
//     .typeString('<strong>Regenerating</strong>')
//     .pauseFor(100)
//     .deleteChars(12)
//     .typeString('<strong>Healing</strong>')
//     .start();
//
