/*
 * @author      Simon Pireyn <simon@pireyn.net>
 * @copyright   2004-12-27
 * @version     1.0
 * @license     http://www.gnu.org/copyleft/lesser.html
 *
 * photosize: 72, 144, 200, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440 and 1600
 *
 */
var username = "108131436311379299390";  //Nils
var album = "5637805629532816017"      //Keukenhaven ;)
var photoSizeSmall = "200";
var divId = "pwa";
var url = "http://picasaweb.google.com/data/feed/base/user/" + username + "/albumid/" + album + "?category=photo&alt=json&callback=photos";

//Add script
function pwa() {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement('script');
    script.id = 'photos';
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

function cadre(thumb_url, full, title) { //template
    return '<a href="' + full.url + '" itemprop="contentUrl" data-size="'+full.width+'x'+full.height+'"><img src="' + thumb_url + '?imgmax=140" itemprop="thumbnail" alt="' + title + '"></a>';
}

function photos(j) {//photos in the selected album
    sBuffer = "";
    for (i = 0; i < j.feed.entry.length; i++) {
        var entry = j.feed.entry[i];
        var full = entry.media$group.media$content[0];
        var title = entry.media$group.media$description.$t;
        var thumb = entry.media$group.media$thumbnail[0].url.replace('s72', 's'+photoSizeSmall);
        $(cadre(thumb.replace('s72', 's'+photoSizeSmall),full,title)) ;
    }
    $$();
    initPhotoSwipeFromDOM('#pwa');
}
