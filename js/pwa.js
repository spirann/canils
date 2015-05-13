/*
 * @author      Simon Pireyn <simon@pireyn.net>
 * @copyright   2004-12-27
 * @version     3.3
 * @license     http://www.gnu.org/copyleft/lesser.html
 *
 * photosize: 72, 144, 200, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440 and 1600
 *
 */
var username = "103404036058389804292";  //Nils
var photoSizeSmall = "200";
var photoSizeBig = "1600";
var showPeople = true;
var showTitleHover = true;

var divId = "pwa";
var elem = "brick";

//Add script
function pwa(album) {
    var url = "http://picasaweb.google.com/data/feed/back_compat/user/" + username + "/albumid/" + album +
        "?category=photo&alt=json&callback=photos&imgmax=" + photoSizeBig + "&thumbsize=" + photoSizeSmall + "&fd=shapes2";
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement('script');
    script.id = 'photos';
    script.type = 'text/javascript';
    script.src = url;
    head.appendChild(script);
}

function addBrick(entry) { //template
    var full = entry.media$group.media$content[0];
    var a = document.createElement("a");
    a.href = full.url;
    a.setAttribute("data-size", full.width + 'x' + full.height);

    var title = entry.media$group.media$description.$t;
    var thumb = entry.media$group.media$thumbnail[0];
    var img = document.createElement("img");
    img.src = thumb.url;
    img.width = "200px";
    img.alt = title;
    a.appendChild(img);

    if(showTitleHover) {
        var descriptionSpan = document.createElement("span");
        descriptionSpan.innerHTML = title;
        descriptionSpan.setAttribute("class", "description");
        a.appendChild(descriptionSpan);
    }

    if (showPeople) {
        var people = getPeople(entry);
        var peopleSpan = document.createElement("span");
        peopleSpan.innerHTML = people;
        peopleSpan.setAttribute("class", "people");
        a.appendChild(peopleSpan);
    }

    var brickDiv = document.createElement("div");
    brickDiv.setAttribute("class", elem);
    brickDiv.appendChild(a);
    document.getElementById(divId).appendChild(brickDiv)
}

function photos(j) {//photos in the selected album
    for (var i = 0; i < j.feed.entry.length; i++) {
        addBrick(j.feed.entry[i]);
    }
    //masonry
    var container = document.querySelector('#'+divId);
    var msnry = new Masonry(container, {
        columnWidth: 210,
        itemSelector: '.'+elem,
        isFitWidth: true
    });

    imagesLoaded(container, function () {
        msnry.layout();
    });
    //swipe
    initPhotoSwipeFromDOM('#'+divId);
}

function getPeople(entry) {
    var names = "";
    if (entry.gphoto$shapes != null && entry.gphoto$shapes.gphoto$shape != null) {
        var shapes = entry.gphoto$shapes.gphoto$shape;
        for (var i = 0; i < shapes.length; i++) {
            names += shapes[i].name;
            if (i < shapes.length - 1) {
                names += ", ";
            }
        }
    }
    return names;
}
