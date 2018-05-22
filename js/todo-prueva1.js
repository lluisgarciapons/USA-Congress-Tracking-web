var sorted = false;
var agregado = {};
var memberMissedVotes = [];
var memberPartyVotes = [];


function getHouseData(callbackFunction) {
    if (!("houseData" in localStorage)) {
        $.ajax({
            type: "GET",
            url: "https://api.propublica.org/congress/v1/113/house/members.json",
            headers: {
                "X-API-Key": "chat7PT0kUVzbeZzFMRV4B0cLoCS5O8YyJkmQRjz"
            },
            success: function (json) {
                localStorage.setItem("houseData", JSON.stringify(json));
                callbackFunction(json);
            }
        });
    } else {
        var data = JSON.parse(localStorage.getItem("houseData"));
        callbackFunction(data);
    }
}

function getSenateData(callbackFunction) {
    if (!("senateData" in localStorage)) {
        $.ajax({
            type: "GET",
            url: "https://api.propublica.org/congress/v1/113/senate/members.json",
            headers: {
                "X-API-Key": "chat7PT0kUVzbeZzFMRV4B0cLoCS5O8YyJkmQRjz"
            },
            success: function (json) {
                localStorage.setItem("senateData", JSON.stringify(json));
                callbackFunction(json);
            }
        });
    } else {
        var data = JSON.parse(localStorage.getItem("senateData"));
        callbackFunction(data);
    }
}

function starterSenate() {
    getSenateData(function (data) {

        //stores data in members array
        var members = data.results[0].members;

        var loadingBig = document.getElementById("spinnerBig");
        loadingBig.classList.remove("spinnerBig");

        //puts onclick event to the checkboxes, dropdown and sort headers
        document.getElementById("r").addEventListener("click", function () {
            getMembersToTable(filters(members));
        });
        document.getElementById("d").addEventListener("click", function () {
            getMembersToTable(filters(members));
        });
        document.getElementById("i").addEventListener("click", function () {
            getMembersToTable(filters(members));
        });
        document.getElementById("dropdown_filter").addEventListener("click", function () {
            getMembersToTable(filters(members));
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
    })
}

function starterHouse() {
    getHouseData(function (data) {

        //stores data in members array
        var members = data.results[0].members;

        var loading1 = document.getElementById("spinnerBig");
        loading1.classList.remove("spinnerBig");

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
    });
}

function attendanceSenate() {
    getSenateData(function (data) {

        var members = data.results[0].members;

        var loading1 = document.getElementById("spinner1");
        var loading2 = document.getElementById("spinner2");
        var loading3 = document.getElementById("spinner3");
        loading1.classList.remove("spinner");
        loading2.classList.remove("spinner");
        loading3.classList.remove("spinner");

        fixedNavbar();
        createStatistics(members);
        tableGlance();

        createMissedVotesObj(members);
        leastEngaged(members);
        mostEngaged(members);
    })
}

function attendanceHouse() {
    getHouseData(function (data) {

        var members = data.results[0].members;

        var loading1 = document.getElementById("spinner1");
        var loading2 = document.getElementById("spinner2");
        var loading3 = document.getElementById("spinner3");
        loading1.classList.remove("spinner");
        loading2.classList.remove("spinner");
        loading3.classList.remove("spinner");

        fixedNavbar();
        createStatistics(members);
        tableGlance();

        createMissedVotesObj(members);
        leastEngaged(members);
        mostEngaged(members);
    })

}

function partyLoyaltySenate() {
    getSenateData(function (data) {
        var members = data.results[0].members;

        var loading1 = document.getElementById("spinner1");
        var loading2 = document.getElementById("spinner2");
        var loading3 = document.getElementById("spinner3");
        loading1.classList.remove("spinner");
        loading2.classList.remove("spinner");
        loading3.classList.remove("spinner");

        fixedNavbar();
        createStatistics(members);
        tableGlance();

        createPartyVotesObj(members);
        leastLoyal(members);
        mostLoyal(members);
    })
}

function partyLoyaltyHouse() {
    getHouseData(function (data) {
        var members = data.results[0].members;

        var loading1 = document.getElementById("spinner1");
        var loading2 = document.getElementById("spinner2");
        var loading3 = document.getElementById("spinner3");
        loading1.classList.remove("spinner");
        loading2.classList.remove("spinner");
        loading3.classList.remove("spinner");

        fixedNavbar();
        createStatistics(members);
        tableGlance();

        createPartyVotesObj(members);
        leastLoyal(members);
        mostLoyal(members);
    })
}


//STARTER PAGES

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
        var body = document.getElementById("table_body");
        var row = document.createElement("tr");
        row.classList.add("rows_starter");
        body.appendChild(row);

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
            //            row.innerHTML += "<td>" + datos[n] + "</td>";
            //            
            var col = document.createElement("td");
            col.append(datos[n]);
            row.appendChild(col);

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
    var errorTable = document.getElementById("no_table");
    errorTable.classList.remove("no_table");
    var tableBody = document.getElementById("table_body");
    tableBody.classList.add("tbody")
    errorTable.innerHTML = "";
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
        tableBody.classList.remove("tbody");
        errorTable.classList.add("no_table");
        errorTable.innerHTML = "<p>Please, Choose a party!</p>";
    } else if (filtered.length == 0) {
        tableBody.classList.remove("tbody");
        errorTable.classList.add("no_table");
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


//ATTENDANCE PAGES

//creates object with R, D, I members and % of votes
function createStatistics(members) {

    for (var i = 0; i < members.length; i++) {
        if (agregado[members[i].party] == null) {
            agregado[members[i].party] = {
                "number": 0,
                "votes": 0
            };
        }

        var statistic = agregado[members[i].party];
        statistic.number += 1;
        statistic.votes += members[i].votes_with_party_pct;
    }
    if (agregado["D"]) {
        agregado["D"].votes = (agregado["D"].votes / agregado["D"].number).toFixed(2);
    }
    if (agregado["R"]) {
        agregado["R"].votes = (agregado["R"].votes / agregado["R"].number).toFixed(2);
    }
    if (agregado["I"]) {
        agregado["I"].votes = (agregado["I"].votes / agregado["I"].number).toFixed(2);
    }

    if (agregado["I"] == null) {
        agregado["I"] = {
            "number": 0,
            "votes": 0
        };
    }
}

//creates table at a Glance
function tableGlance() {

    var totalRep = agregado.D.number + agregado.R.number + agregado.I.number;
    var totalVotes = Number(agregado.D.votes) + Number(agregado.R.votes) + Number(agregado.I.votes);
    var partyLen = 0;
    for (var u = 0; u < Object.keys(agregado).length; u++) {
        if (agregado[Object.keys(agregado)[u]].number != 0) {
            partyLen += 1;
        }
    }
    var avgVotes = (totalVotes / partyLen).toFixed(2);
    document.getElementById("table_body_glance").innerHTML = "";

    for (var i = 0; i < Object.keys(agregado).length; i++) {
        var tblBdy = document.getElementById("table_body_glance");
        tblBdy.innerHTML += "<tr class='rows'></tr>";
        var party = "";
        if (Object.keys(agregado)[i] == "D") {
            party = "Democrats";
        }
        if (Object.keys(agregado)[i] == "R") {
            party = "Republicans";
        }
        if (Object.keys(agregado)[i] == "I") {
            party = "Independents";
        }

        var number = agregado[Object.keys(agregado)[i]].number;
        var votes = agregado[Object.keys(agregado)[i]].votes;

        var tableContent = [party, number, votes + "%"];

        for (var n = 0; n < tableContent.length; n++) {
            document.getElementsByClassName('rows')[i].innerHTML += "<td></td>";
            document.getElementsByClassName('rows')[i].getElementsByTagName("td")[n].append(tableContent[n]);
        }
    }
    tblBdy.innerHTML += "<tr class='total rows'><td>Total</td><td>" + totalRep + "</td><td>" + avgVotes + "%</td></tr>";
}

//creates object with name, missed votes, missed votes % of all members, sort it by %
function createMissedVotesObj(members) {
    for (var i = 0; i < members.length; i++) {

        var lastName = members[i].last_name;
        var midName = members[i].middle_name;
        if (midName == null) {
            midName = "";
        }
        var firstName = members[i].first_name;
        var name = lastName + ", " + firstName + " " + midName;

        var objMember = {
            "name": name,
            "missed_votes": members[i].missed_votes,
            "missed_votes_pct": members[i].missed_votes_pct,
            "url": members[i].url
        };
        memberMissedVotes.push(objMember);
    }
    memberMissedVotes.sort(function (a, b) {
        return a.missed_votes_pct - b.missed_votes_pct;
    }).reverse();
}

//creates table Least Engaged
function leastEngaged(members) {

    var ten_percent = Math.floor((10 / 100) * members.length);
    var tblBdy = document.getElementById("table_body_least");

    document.getElementById("table_body_least").innerHTML = "";
    for (var i = 0; i < ten_percent; i++) {
        tblBdy.innerHTML += "<tr class='rows2'></tr>";

        var nameLink = document.createElement("A");
        nameLink.setAttribute("href", memberMissedVotes[i].url);
        nameLink.setAttribute("target", "_blank");
        nameLink.innerHTML = memberMissedVotes[i].name;

        var tableContent = [nameLink, memberMissedVotes[i].missed_votes, memberMissedVotes[i].missed_votes_pct + "%"]

        for (var n = 0; n < tableContent.length; n++) {
            document.getElementsByClassName('rows2')[i].innerHTML += "<td></td>";
            document.getElementsByClassName('rows2')[i].getElementsByTagName("td")[n].append(tableContent[n]);
        }
    }

    for (var j = ten_percent; memberMissedVotes[j].missed_votes_pct == memberMissedVotes[j + 1].missed_votes_pct; j++) {
        tblBdy.innerHTML += "<tr class='rows2'></tr>";
        var tableContent = [memberMissedVotes[i].name, memberMissedVotes[i].missed_votes, memberMissedVotes[i].missed_votes_pct + "%"]

        for (var p = 0; p < tableContent.length; p++) {
            document.getElementsByClassName('rows2')[j].innerHTML += "<td></td>";
            document.getElementsByClassName('rows2')[j].getElementsByTagName("td")[p].append(tableContent[p]);
        }
    }
}

//creates table Most Engaged 
function mostEngaged(members) {

    memberMissedVotes.reverse();

    var ten_percent = Math.floor((10 / 100) * members.length);
    var tblBdy = document.getElementById("table_body_most");

    document.getElementById("table_body_most").innerHTML = "";
    for (var i = 0; i < ten_percent; i++) {
        tblBdy.innerHTML += "<tr class='rows3'></tr>";

        var nameLink = document.createElement("A");
        nameLink.setAttribute("href", memberMissedVotes[i].url);
        nameLink.setAttribute("target", "_blank");
        nameLink.innerHTML = memberMissedVotes[i].name;

        var tableContent = [nameLink, memberMissedVotes[i].missed_votes, memberMissedVotes[i].missed_votes_pct + "%"]

        for (var n = 0; n < tableContent.length; n++) {
            document.getElementsByClassName('rows3')[i].innerHTML += "<td></td>";
            document.getElementsByClassName('rows3')[i].getElementsByTagName("td")[n].append(tableContent[n]);
        }
    }

    for (var j = ten_percent; memberMissedVotes[j - 1].missed_votes_pct == memberMissedVotes[j].missed_votes_pct; j++) {
        tblBdy.innerHTML += "<tr class='rows3'></tr>";

        var nameLink = document.createElement("A");
        nameLink.setAttribute("href", memberMissedVotes[j].url);
        nameLink.setAttribute("target", "_blank");
        nameLink.innerHTML = memberMissedVotes[j].name;

        var tableContent = [nameLink, memberMissedVotes[j].missed_votes, memberMissedVotes[j].missed_votes_pct + "%"]

        for (var p = 0; p < tableContent.length; p++) {
            document.getElementsByClassName('rows3')[j].innerHTML += "<td></td>";
            document.getElementsByClassName('rows3')[j].getElementsByTagName("td")[p].append(tableContent[p]);
        }
    }
}


//PARTY LOYALTY PAGES

//creates object with name, party votes, party votes % of all members, sort it by %
function createPartyVotesObj(members) {
    for (var i = 0; i < members.length; i++) {

        var lastName = members[i].last_name;
        var midName = members[i].middle_name;
        if (midName == null) {
            midName = "";
        }
        var firstName = members[i].first_name;
        var name = lastName + ", " + firstName + " " + midName;

        var objMember = {
            "name": name,
            "party_votes": members[i].total_votes,
            "party_votes_pct": members[i].votes_with_party_pct,
            "url": members[i].url
        };
        memberPartyVotes.push(objMember);
    }
    memberPartyVotes.sort(function (a, b) {
        return a.party_votes_pct - b.party_votes_pct;
    });
}

//creates table Least Loyal
function leastLoyal(members) {

    var ten_percent = Math.floor((10 / 100) * members.length);
    var tblBdy = document.getElementById("table_body_least");

    document.getElementById("table_body_least").innerHTML = "";
    for (var i = 0; i < ten_percent; i++) {
        tblBdy.innerHTML += "<tr class='rows2'></tr>";

        var nameLink = document.createElement("A");
        nameLink.setAttribute("href", memberPartyVotes[i].url);
        nameLink.setAttribute("target", "_blank");
        nameLink.innerHTML = memberPartyVotes[i].name;

        var tableContent = [nameLink, memberPartyVotes[i].party_votes, memberPartyVotes[i].party_votes_pct + "%"]

        for (var n = 0; n < tableContent.length; n++) {
            document.getElementsByClassName('rows2')[i].innerHTML += "<td></td>";
            document.getElementsByClassName('rows2')[i].getElementsByTagName("td")[n].append(tableContent[n]);
        }
    }

    for (var j = ten_percent; memberPartyVotes[j].party_votes_pct == memberPartyVotes[j + 1].party_votes_pct; j++) {
        tblBdy.innerHTML += "<tr class='rows2'></tr>";
        var tableContent = [memberPartyVotes[i].name, memberPartyVotes[i].party_votes, memberPartyVotes[i].party_votes_pct + "%"]

        for (var p = 0; p < tableContent.length; p++) {
            document.getElementsByClassName('rows2')[j].innerHTML += "<td></td>";
            document.getElementsByClassName('rows2')[j].getElementsByTagName("td")[p].append(tableContent[p]);
        }
    }
}

//creates table Most Loyal 
function mostLoyal(members) {

    memberPartyVotes.reverse();

    var ten_percent = Math.floor((10 / 100) * members.length);
    var tblBdy = document.getElementById("table_body_most");

    document.getElementById("table_body_most").innerHTML = "";
    for (var i = 0; i < ten_percent; i++) {
        tblBdy.innerHTML += "<tr class='rows3'></tr>";

        var nameLink = document.createElement("A");
        nameLink.setAttribute("href", memberPartyVotes[i].url);
        nameLink.setAttribute("target", "_blank");
        nameLink.innerHTML = memberPartyVotes[i].name;

        var tableContent = [nameLink, memberPartyVotes[i].party_votes, memberPartyVotes[i].party_votes_pct + "%"]

        for (var n = 0; n < tableContent.length; n++) {
            document.getElementsByClassName('rows3')[i].innerHTML += "<td></td>";
            document.getElementsByClassName('rows3')[i].getElementsByTagName("td")[n].append(tableContent[n]);
        }
    }

    for (var j = ten_percent; memberPartyVotes[j - 1].party_votes_pct == memberPartyVotes[j].party_votes_pct; j++) {
        tblBdy.innerHTML += "<tr class='rows3'></tr>";
        var tableContent = [memberPartyVotes[j].name, memberPartyVotes[j].party_votes, memberPartyVotes[j].party_votes_pct + "%"]

        for (var p = 0; p < tableContent.length; p++) {
            document.getElementsByClassName('rows3')[j].innerHTML += "<td></td>";
            document.getElementsByClassName('rows3')[j].getElementsByTagName("td")[p].append(tableContent[p]);
        }
    }
}
