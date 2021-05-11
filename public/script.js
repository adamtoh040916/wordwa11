/*  wordwa11
**  wordwall cheat
** Author: pxtrez

**  wordwa11 is free software.
*  The author assumes no responsibility for any damages that may arise from the use of this software.
*  By using this software, you accept the terms of the GNU General Public License v3.0
*  The license can also be found at https://www.gnu.org/licenses/gpl-3.0.en.html

** Used consoleimg v1.0 and modified for my purposes
** You can found it on: https://github.com/workeffortwaste/consoleimg/

*** Pull requests are welcome
*** Github repositiory: https://github.com/pxtrez/wordwa11
*/

// I know, code is kinda trash, but soon i will rewrite it

document.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.getSelected(null, function(tab) {
        var u = decodeURIComponent(tab.url)
        var shit = "chrome-extension://" + chrome.runtime.id
        var f_link = u.replace(shit, "")
        if (f_link.includes("resource")) {
            var link = f_link.substr(0, f_link.lastIndexOf("/") + 1);
            var pin = link.replace(/\D/g, "");
            console.log("Auto get pin: " + pin);
            var pinvalue = document.getElementById("IDInput");
            pinvalue.value = pin
        }
    });
    document.getElementById("ConnectButton").addEventListener("click", auto);
    document.getElementById("pinButton").addEventListener("click", pin);
    document.getElementById("HelpButton").addEventListener("click", help);
});

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function auto() {
    chrome.tabs.getSelected(null, function(tab) {
        var u = decodeURIComponent(tab.url)
        var shit = "chrome-extension://" + chrome.runtime.id
        var f_link = u.replace(shit, "");
        if (f_link.includes("resource") || f_link.includes("play")) {
            console.log("Injecting to: " + f_link);
            var wait_c = document.getElementById("ConnectButton");
            wait_c.value = " Loading... "
            var wait_t = document.getElementById("titleColor");
            wait_t.innerText = " Loading... "
            console.log("%cValid link!", "color: yellow");
            var d_link = f_link
            var link = d_link.substr(0, d_link.lastIndexOf("/") + 1);
        } else {
            console.log("%cInvalid link!", "color: red");
            var e_invalid = document.getElementById("err_i");
            var r_invalid = document.getElementById("ConnectButton");
            r_invalid.id = "ierr"
            e_invalid.innerHTML = "Invalid link! Please try again!"
            e_invalid.id = "err"
            sleep(1000).then(() => {
                var e_invalid = document.getElementById("err");
                var r_invalid = document.getElementById("ierr");
                r_invalid.id = "ConnectButton"
                e_invalid.id = "err_i"
            });
        }
        // Resource data
        if (f_link.includes("resource")) {
            console.log("%cResource", "color: green");
            var pin = link.replace(/\D/g, "");
            fetch("https://wordwall.net/api/oembed?url=https%3a%2f%2fwordwall.net%2fpl%2fresource%2f" + pin + "&format=json")
                .then(function(response) {
                    return response.json();
                })
                .then(function(g_uuid) {
                    var l_uuid = g_uuid.thumbnail_url
                    var uuid = l_uuid.replace("https://az779572.vo.msecnd.net/screens-800/", "")
                    var a_site = "https://wordwall.net/create/editcontent?guid=" + uuid;
                    chrome.tabs.create({ url: a_site });
                })
                .catch(function(error) {
                    console.log("%cError!", "color: red");
                    var e_invalid = document.getElementById("err_i");
                    e_invalid.innerHTML = "idk what is happening"
                    e_invalid.id = "err_t"
                    sleep(30000).then(() => {
                        var e_invalid = document.getElementById("err_t");
                        e_invalid.id = "err_i"
                    });
                });
        };
        // Play data
        if (f_link.includes("play")) {
            console.log("%cPlay", "color: green");
            fetch(f_link)
                .then(function(res) {
                    return res.text();
                })
                .then(function(get_f_link) {
                    var parser = new DOMParser();
                    var doc = parser.parseFromString(get_f_link, 'text/html');
                    if (document.readyState === 'complete') {
                        try {
                            var final_f_link = doc.querySelector('head > link:nth-child(29)').getAttribute('href');
                            return fetch(final_f_link);
                        } catch (err) {
                            //please make it 
                            console.error("Change your browser and try again!");
                            var wait_c = document.getElementById("ConnectButton");
                            wait_c.value = " Error! "
                            var wait_t = document.getElementById("titleColor");
                            wait_t.innerText = " Wordwa11 2.5 "
                            var e_invalid = document.getElementById("err_i");
                            e_invalid.innerHTML = "Please change your browser and try again!"
                            e_invalid.id = "err_t"
                            sleep(5000).then(() => {
                                var e_invalid = document.getElementById("err_t");
                                e_invalid.id = "err_i"
                            });
                        };
                    }
                })
                .then(function(response) {
                    return response.json();
                })
                .then(function(g_uuid) {
                    var l_uuid = g_uuid.thumbnail_url
                    var uuid = l_uuid.replace("https://az779572.vo.msecnd.net/screens-800/", "");
                    var a_site = "https://wordwall.net/create/editcontent?guid=" + uuid
                    chrome.tabs.create({ url: a_site });
                });
        }
    })
}

function pin() {
    var f_link = document.getElementById("IDInput").value
    if (f_link.trim() == "") {
        console.log("%cempty input!", "color: red");
        var e_invalid = document.getElementById("err_i");
        e_invalid.innerHTML = "Input must be filled!"
        e_invalid.id = "err"
        sleep(1000).then(() => {
            var e_invalid = document.getElementById("err");
            e_invalid.id = "err_i"
        });
    } else {
        if (typeof f_link === 'string') {
            var wait_c = document.getElementById("IDInput");
            wait_c.value = " Loading... "
            var wait_t = document.getElementById("titleColor");
            wait_t.innerText = " Loading... "
            console.log("%cValid link!", "color: yellow");
            var link = f_link
                // Resource data
            console.log("%cResource", "color: yellow");
            var pin = link.replace(/\D/g, "");
            fetch("https://wordwall.net/api/oembed?url=https%3a%2f%2fwordwall.net%2fpl%2fresource%2f" + pin + "&format=json")
                .then(function(response) {
                    return response.json();
                })
                .then(function(g_uuid) {
                    var l_uuid = g_uuid.thumbnail_url
                    var uuid = l_uuid.replace("https://az779572.vo.msecnd.net/screens-800/", "");
                    var a_site = "https://wordwall.net/create/editcontent?guid=" + uuid;
                    chrome.tabs.create({ url: a_site });
                })
                .catch(function(error) {
                    console.log("%cInvalid Game PIN!", "color: red");
                    var e_invalid = document.getElementById("err_i");
                    e_invalid.innerHTML = "Game PIN is invalid!"
                    e_invalid.id = "err_t"
                    sleep(30000).then(() => {
                        var e_invalid = document.getElementById("err_t");
                        e_invalid.id = "err_i"
                    });
                });
        } else {
            console.log("%cInvalid link!", "color: red");
            var e_invalid = document.getElementById("err_i");
            e_invalid.innerHTML = "Invalid link! Please try again."
            e_invalid.id = "err"
            sleep(1000).then(() => {
                var e_invalid = document.getElementById("err");
                e_invalid.id = "err_i"
            });
        }
    }
}

function help() {
    url = "./other/help.html"
    window.open(url, '_blank').focus();
};
