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


var app = document.getElementById('app');

var typewriter = new Typewriter(app, {
    loop: true
});

typewriter.typeString('Tribe Vibe')
    .pauseFor(100)
    .deleteAll()
    .typeString('Rebuilding')
    .pauseFor(100)
    .deleteAll()
    .typeString('<strong>Regenerating</strong>')
    .pauseFor(100)
    .deleteAll()
    .typeString('<strong>Healing</strong>')
    .start();

// Audio
// http://jsfiddle.net/vkMqR/1404/
var audio;
var playlist;
var tracks;
var current;

var musicarr = [
  // "https://rosemary-network.s3.filebase.com/tribe-vibe/Baby's First Haircut _ Nursery Rhymes and Kids Songs by Little Angel-bwFKymFqZKQ.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Brian Cid - Margarette (Buddha Bar by Armen Miran & Ravin 2017) (Original Mix)-oK-vkCEiwOI.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Deya Dova - Return Of The Bird Tribes (saQi Remix)-DwT59_MfvyU.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Gerra G - A Mascara (Rodrigo Gallardo Remix) _ Exotic Refreshment LTD-ch8T2EULjxU.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Go Dugong - Vidita (El Búho Remix)-ealqZDkQqXY.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Honra (Original)-nDq-r2X9uFI.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Ipek Ipekcioglu feat. Petra Nachtmanova - Uyan Uyan  _ Kater130-9-ZsLSxWuhw.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Jacob Groening, Zigan Aldi - Checkpoint-qKVtqwiRAdQ.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Kazuma Akasaki - I Can Find You [Melodic Techno House Mix]-NfOGsZwwdjg.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Layne Redmond & Tommy Brunjes - Morrocan Moon-YqmJoiHj8NE.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Lee Jones - A Perfect Kick (Matthias Meyer Remix)-XtriEg3neSg.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Lee Jones - One Grain-mIAtmjq0jC4.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Moontricks  - Solar Therapy-u2ltkcGOz_c.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Mumbai Madness-bzXgX_V0Q0Y.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/NenaHelena - La Ka Ruba Ft. Akil [E008]-amj-LmHyGXM.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Oceanvs Orientalis - Khronos (Full EP)-mDGCSZ8VTuw.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Peter Power - Sun Sun Damba [Multi Culti]-aRC_7AE8DhI.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Raz Ohara - El Zahir (Original Mix)-wKDmzUYKV9Q.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Reaching Rujum-mYM4hasoo4o.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Rej Senhor (Original Version)-fBkVbYDLJDM.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Satori (NL) feat. Miou Amadée - Days Without You (Crussen Remix)-qFMEKS0ZWn0.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Theme For Namgar (Crussen Edit)-5oHPgSuKLZo.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Timboletti  - Helva Selva (feat.  Ziski & Pophop Remix)-pAcFzVFzjKs.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Unspoken Word (Intro)-ePayp_lvzV8.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Vesaire-lLFYPPGcG-Q.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/Vidita Ft. Miriam García (El Buho Remix)-o2TgDfnPmZI.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/War Cry-J2sZUeasZkY.mp3",
  "https://rosemary-network.s3.filebase.com/tribe-vibe/YokoO - Yet Another Day Thinking About You feat  JoKe & Mauve [ADIDA001]-xOss6oP8xiY.mp3",
 ];
shuffle(musicarr);

init();
function init(){
    current = 0;
    audio = $('audio');
    audio[0].volume = .20;
    len = musicarr.length;
    
    run(musicarr[current], audio[0]);
    
    audio[0].addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
        }
        run(musicarr[current],audio[0]);
    });
}

function run(link, player){
        player.src = link;
        audio[0].load();
        audio[0].play();
        $('#playing').html("<ul><li><a>" + link+ "</a></li></ul>");     
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

$(function () {
  $('#tiles').click(function () {
    $('#audio')[0].play();
  });
});
