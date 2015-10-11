
$(document).ready(function() {
	//load the background pic
	display_background();

    //check if the currentUser already exists.
	if (localStorage.getItem("user_name")) {
        display_all();
	} else {
        get_name();
	}

    init_sync_listener();
});



