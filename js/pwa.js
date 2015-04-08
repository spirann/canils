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
    var url = "http://picasaweb.google.com/data/feed/base/user/" + username + "/albumid/" + album + "?category=photo&alt=json&callback=photos&imgmax=" + photoSizeBig + "&thumbsize=" + photoSizeSmall;
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
    brick.appendChild(a);
    document.getElementById(divId).appendChild(brick)
}

function cadre(thumb, full, title) { //template
    var a = document.createElement("a");
    a.href = full.url;
    a.setAttribute("data-size",full.width + 'x' + full.height);

    var img = document.createElement("img");
    img.src = thumb.url;
    img.width = "200px";
    img.alt = title;
    a.appendChild(img);

    var span = document.createElement("span");
    span.innerHTML = title;
    span.setAttribute("class","description");
    a.appendChild(span);

    return a;
}

function photos(j) {//photos in the selected album
    for (var i = 0; i < j.feed.entry.length; i++) {
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
