function get_name() {
    chrome.storage.sync.get('user_name', function(obj) {
        if (typeof obj.user_name === 'string') {
            localStorage.setItem("user_name", obj.user_name);
            display_all();
        } else {
            jQuery('#greeting').addClass('prompt');
            jQuery('#greeting').html('<form>What Is Your Name? <input type="text"></form>');
            jQuery(function () {
                jQuery('#greeting form').bind('submit', function (e) {
                    e.preventDefault();
                    saveName();
                });
            });
        }
    });
}

function saveName(){
    var user_name = jQuery('#greeting input').val()
    localStorage.setItem("user_name", user_name);

    chrome.storage.sync.set({'user_name': user_name});
    _gaq.push(['_trackEvent', 'Name', 'Save', user_name]);

    jQuery('#greeting').removeClass('prompt');

    display_all();

    return false;
}


function get_day_period() {
    var now = new Date();
    var hour = now.getHours();
    var period;
    if (hour >= 3 && hour < 12) period = 'Morning';
    if (hour >= 12 && hour < 17) period = 'Afternoon';
    if (hour >= 17 || hour < 3) period = 'Evening';
    return period;
}

function display_time() {
    //the end time of today
    endOfDay = moment().hour(24).minute(0).second(0);
    //need to transform from moment object to Date Obj
    $("#clock").countdown(endOfDay.toDate(), function(event) {
        $(this).html(event.strftime('%H:%M:%S left for today'));
        //$(this).html(event.strftime('%H hours %M minutes %S seconds left'));          
    });
}

function display_quote() {
    jQuery('#quote').html("Yesterday You said Tomorrow").fadeIn();
}


function display_greeting()
{
    $('#greeting').html('Yo ' + localStorage.getItem("user_name") + ", be productive!");
}


function display_background() {
    var randomImgIndex = Math.floor((Math.random() * backgroundDictionary["images"].length));
    imageUrl = backgroundDictionary["images"][randomImgIndex]["source_url"]
    $('#background').css('background-image', 'url(' + imageUrl + ')');
}

function display_video() {
    if (moment().minute() == 0) {
        $("#clock").hide();
        $("#greeting").hide();
        $("#background").hide();
        $(".fullscreen-bg").html(
            '<video loop muted autoplay class="fullscreen-bg__video"> <source src="https://res.cloudinary.com/dp3zinfdz/video/upload/v1444556398/MOV_0226_eob0xj.mp4" type="video/mp4"> <source src="https://res.cloudinary.com/dp3zinfdz/video/upload/v1444556398/MOV_0226_eob0xj.webm" type="video/webm"> </video>'
        )
    } 
}

function display_all() {
    display_time();
    display_greeting();
    display_video();
    //display_quote();
    // display_video();
}

function init_sync_listener() {
    chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
            var storageChange = changes[key];
            localStorage.setItem(key, storageChange.newValue);
        }
    });
}
