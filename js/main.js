var data = {};

$(document).ready(function () {
    if (window.location.pathname == "/senate-starter-page.html") {
        $.ajax({
            type: "GET",
            url: "https://api.propublica.org/congress/v1/113/senate/members.json",
            headers: {
                "X-API-Key": "chat7PT0kUVzbeZzFMRV4B0cLoCS5O8YyJkmQRjz"
            },
            success: function (json) {
                data = json;

                //stores data in members array
                var members = data.results[0].members;

                //puts onclick event to the checkboxes, dropdown and sort headers
                document.getElementById("r").addEventListener("click", function () {
                    getMembersToTable(filters(members))
                });
                document.getElementById("d").addEventListener("click", function () {
                    getMembersToTable(filters(members))
                });
                document.getElementById("i").addEventListener("click", function () {
                    getMembersToTable(filters(members))
                });
                document.getElementById("dropdown_filter").addEventListener("click", function () {
                    getMembersToTable(filters(members))
                });
                document.getElementById("sort_votes").addEventListener("click", function () {
                    sortVotes(members);
                    getMembersToTable(filters(members));
                });
                document.getElementById("sort_seniority").addEventListener("click", function () {
                    sortSeniority(members);
                    getMembersToTable(filters(members));
                });

                fixedNavbar();
                getStates(members);
                getMembersToTable(filters(members));

            }
        });
    }
    if (window.location.pathname == "/house-starter-page.html") {
        $.ajax({
            type: "GET",
            url: "https://api.propublica.org/congress/v1/113/house/members.json",
            headers: {
                "X-API-Key": "chat7PT0kUVzbeZzFMRV4B0cLoCS5O8YyJkmQRjz"
            },
            success: function (json) {
                data = json;

                var members = data.results[0].members;
                //stores data in members array
                var members = data.results[0].members;

                //puts onclick event to the checkboxes, dropdown and sort headers
                document.getElementById("r").addEventListener("click", function () {
                    getMembersToTable(filters(members))
                });
                document.getElementById("d").addEventListener("click", function () {
                    getMembersToTable(filters(members))
                });
                document.getElementById("i").addEventListener("click", function () {
                    getMembersToTable(filters(members))
                });
                document.getElementById("dropdown_filter").addEventListener("click", function () {
                    getMembersToTable(filters(members))
                });
                document.getElementById("sort_votes").addEventListener("click", function () {
                    sortVotes(members);
                    getMembersToTable(filters(members));
                });
                document.getElementById("sort_seniority").addEventListener("click", function () {
                    sortSeniority(members);
                    getMembersToTable(filters(members));
                });

                fixedNavbar();
                getStates(members);
                getMembersToTable(filters(members));

            }
        });
    }
});

var sorted = false;

//fixes the navbar at the top when scrolling
function fixedNavbar() {
    // When the user scrolls the page, execute myFunction 
    window.onscroll = function () {
        myFunction()
    };

    // Get the navbar and container
    var navbar = document.getElementById("navbar");
    var bglobal = document.getElementById("b-global");

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky");
            bglobal.classList.add("more_margin");
        } else {
            navbar.classList.remove("sticky");
            bglobal.classList.remove("more_margin");
        }
    }
}

    //it creates the table for the starters pages
    function getMembersToTable(members) {
        document.getElementById("table_body").innerHTML = "";
        for (var i = 0; i < members.length; i++) {
            var row = document.getElementById("table_body");
            row.innerHTML += "<tr class='rows'></tr>";

            var lastName = members[i].last_name;
            var midName = members[i].middle_name;
            if (midName == null) {
                midName = "";
            }
            var firstName = members[i].first_name;

            var name = lastName + ", " + firstName + " " + midName;
            var nameLink = document.createElement("A");
            nameLink.setAttribute("href", members[i].url);
            nameLink.setAttribute("target", "_blank");
            nameLink.innerHTML = name;
            var datos = [nameLink, members[i].party, members[i].state, members[i].seniority, members[i].votes_with_party_pct + "%"];

            for (var n = 0; n < datos.length; n++) {
                document.getElementsByClassName('rows')[i].innerHTML += "<td></td>";
                document.getElementsByClassName('rows')[i].getElementsByTagName("td")[n].append(datos[n]);
            }
        }
    }

    //gets all uniques states and put them in a dropdown menu
    function getStates(members) {
        var uniqueState = [];
        for (var i = 0; i < members.length; i++) {

            var state = members[i].state;
            if (!uniqueState.includes(state)) {
                uniqueState.push(state);
            }
        }
        uniqueState.sort();

        var option = document.createElement("option");
        var all = document.createTextNode("--all--");
        option.setAttribute("value", "");
        option.append(all);
        document.getElementById("dropdown_filter").append(option);

        for (var n = 0; n < uniqueState.length; n++) {

            var option = document.createElement("option");
            option.setAttribute("value", uniqueState[n]);
            option.append(uniqueState[n]);
            document.getElementById("dropdown_filter").append(option);
        }
    }

    //add checkboxes and dropdown filters
    function filters(members) {
        document.getElementById("no_table").innerHTML = "";
        var filtered = [];
        var rep = document.getElementById("r");
        var dem = document.getElementById("d");
        var ind = document.getElementById("i");
        var drpDwn = document.getElementById("dropdown_filter");

        for (var i = 0; i < members.length; i++) {
            if (rep.checked == true && rep.value == members[i].party) {
                if (drpDwn.value == "" || drpDwn.value == members[i].state) {
                    filtered.push(members[i]);
                }
            }
            if (dem.checked == true && dem.value == members[i].party) {
                if (drpDwn.value == "" || drpDwn.value == members[i].state) {
                    filtered.push(members[i]);
                }
            }
            if (ind.checked == true && ind.value == members[i].party) {
                if (drpDwn.value == "" || drpDwn.value == members[i].state) {
                    filtered.push(members[i]);
                }
            }
        }

        if (rep.checked == false && dem.checked == false && ind.checked == false) {
            document.getElementById("no_table").innerHTML = "<p>Please, Choose a party!</p>";
        } else if (filtered.length == 0) {
            document.getElementById("no_table").innerHTML = "<p>No results!</p>";

        }
        return filtered;
    }

    //sorts by % of votes
    function sortVotes(members) {
        var sort_votes = document.getElementById("sort_votes_btn");

        if (sorted == false) {
            members.sort(function (a, b) {
                return a.votes_with_party_pct - b.votes_with_party_pct;
            });
            sort_votes.classList.remove("caret");
            sort_votes.classList.remove("caret-up");
            sort_votes.classList.add("caret-up");
            sorted = true;
        } else {
            members.sort(function (a, b) {
                return b.votes_with_party_pct - a.votes_with_party_pct;
            });
            sort_votes.classList.remove("caret");
            sort_votes.classList.remove("caret-up");
            sort_votes.classList.add("caret");
            sorted = false;
        }
    }

    //sort by seniority
    function sortSeniority(members) {
        var sort_seniority = document.getElementById("sort_seniority_btn");

        if (sorted == false) {
            members.sort(function (a, b) {
                return a.seniority - b.seniority;
            });
            sort_seniority.classList.remove("caret");
            sort_seniority.classList.remove("caret-up");
            sort_seniority.classList.add("caret-up");
            sorted = true;
        } else {
            members.sort(function (a, b) {
                return b.seniority - a.seniority;
            });
            sort_seniority.classList.remove("caret");
            sort_seniority.classList.remove("caret-up");
            sort_seniority.classList.add("caret");
            sorted = false;
        }
    }

