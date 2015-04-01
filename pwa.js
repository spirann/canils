/*
 * @author      Simon Pireyn <simon@pireyn.net>
 * @copyright   2004-12-27
 * @version     1.0
 * @license     http://www.gnu.org/copyleft/lesser.html
 *
 *photosize: 72, 144, 200, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440 and 1600
 *
 */

/* use %dd ,
 %mm,
 %Mmm,
 %yyyy,
 */
var username = "108131436311379299390";  //Nils
var album = "5637805629532816017"      //Keukenhaven ;)
var photoSizeSmall = "200";
var photoSizeLarge = "1024";
var divId = "pwa";

start('photos', "http://picasaweb.google.com/data/feed/base/user/" + username + "/albumid/" + album + "?category=photo&alt=json&callback=photos");

//Add script
function start(id, url) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement('script');
    script.id = id;
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

var sBuffer = "";
function $(a) {
    sBuffer += a;
}
function $$() {
    document.getElementById(divId).innerHTML = sBuffer;
};

function cadre(img_src, link_a, title) { //template
    return '<a href="' + link_a + '"><img src="' + img_src + '?imgmax=140" alt="' + title + '"></a>';
}

function photos(j) {//photos in the selected album
    sBuffer = "";
    for (i = 0; i < j.feed.entry.length; i++) {
        var img_begin = j.feed.entry[i].summary.$t.indexOf('src="') + 5;
        var img_end = j.feed.entry[i].summary.$t.indexOf('" alt');
        var img_base = j.feed.entry[i].summary.$t.slice(img_begin, img_end);
        $(cadre(img_base.replace('288', photoSizeSmall),img_base.replace('288', photoSizeLarge),"")) ;
    }
    $$();
}
