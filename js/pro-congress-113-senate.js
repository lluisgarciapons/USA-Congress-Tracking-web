var data = {};

$(document).ready(function() {
    
    $.ajax({
        type: "GET",
        url: "https://api.propublica.org/congress/v1/113/senate/members.json",
        headers: {
            "X-API-Key": "chat7PT0kUVzbeZzFMRV4B0cLoCS5O8YyJkmQRjz"
        },
        success: function(json) {
            data = json;
        }
    });
});
