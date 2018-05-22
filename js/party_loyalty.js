var members = data.results[0].members;
var agregado = {};

fixedNavbar();
createStatistics();
tableGlance();

var memberPartyVotes = [];

createPartyVotesObj();
leastLoyal();
mostLoyal();

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

//creates object with R, D, I members and % of votes
function createStatistics() {

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

    document.getElementById("table_body_glance").innerHTML = "";
    var totalRep = agregado.D.number + agregado.R.number + agregado.I.number;
    var totalVotes = Number(agregado.D.votes) + Number(agregado.R.votes) + Number(agregado.I.votes);
    var partyLen = 0;
    for (var u = 0; u < Object.keys(agregado).length; u++){
        if (agregado[Object.keys(agregado)[u]].number != 0) {
            partyLen += 1;
        }
    }
    var avgVotes = (totalVotes / partyLen).toFixed(2);
    
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
    tblBdy.innerHTML += "<tr class='total rows'><td>Total</td><td>"+totalRep+"</td><td>"+avgVotes+"%</td></tr>";
}

//creates object with name, party votes, party votes % of all members, sort it by %
function createPartyVotesObj() {
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
function leastLoyal() {

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
function mostLoyal() {

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
