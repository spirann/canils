/*
 * @author      Simon Pireyn <simon@pireyn.net>
 * @copyright   2004-12-27
 * @version     3.3
 * @license     http://www.gnu.org/copyleft/lesser.html
 *
 * photosize: 72, 144, 200, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440 and 1600
 *
 */
var username = "108131436311379299390";  //Nils
var photoSizeSmall = "200";
var photoSizeBig="1600";
var divId = "pwa";

//Add script
function pwa(album) {
    var url = "http://picasaweb.google.com/data/feed/base/user/" + username + "/albumid/" + album + "?category=photo&alt=json&callback=photos&imgmax=" + photoSizeBig;
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement('script');
    script.id = 'photos';
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

function bufferAdd(a) {
    var brick = document.createElement("div");
    brick.setAttribute("class", "brick");
    brick.innerHTML = a;
    document.getElementById(divId).appendChild(brick)
}

function cadre(thumb, full, title) { //template
    return '<a href="' + full.url + '" data-size="' + full.width + 'x' + full.height + '"><img src="' + thumb.url.replace('s72', 's' + photoSizeSmall) + '" width="200px" alt="' + title + '"></a>';
}

function photos(j) {//photos in the selected album
    for (i = 0; i < j.feed.entry.length; i++) {
        var entry = j.feed.entry[i];
        var full = entry.media$group.media$content[0];
        var title = entry.media$group.media$description.$t;
        var thumb = entry.media$group.media$thumbnail[0];
        bufferAdd(cadre(thumb, full, title));
    }
    //swipe
    initPhotoSwipeFromDOM('#pwa');
    //masonry
    var container = document.querySelector('#pwa');
    var msnry = new Masonry(container, {
        columnWidth: 210,
        itemSelector: '.brick',
        isFitWidth: true
    });

    imagesLoaded(container, function () {
        msnry.layout();
    });
}
