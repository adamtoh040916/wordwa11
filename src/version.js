console.log("%c--------------------------------------------", "color: green")
console.log("%cWordwa11 created by pxtrez\nGithub: https://github.com/pxtrez/\nCheat is under MIT license\n|| PheaServices 2021 ||", "color: #00ff8c");
console.log("%c--------------------------------------------", "color: green")
fetch("https://schoolcheats.pxtrez.repl.co/w11ext.json")
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log("%cActual Version: " + json.version, "color: cyan");
        const version = json.version
        const outdated = "Your cheat is outdated! Download update to continue. All Updates are available at my GitHub. \n\nError: " + version
        if (version == "2.5") {
            var ver = document.getElementById("version")
            ver.innerHTML = version;
        }
        if (version != "2.5") {
            var ver = document.getElementById("version")
            ver.innerHTML = outdated;
            alert(outdated)
            chrome.tabs.create({ url: "https://github.com/pxtrez/wordwa11/" });
            document.getElementById("ConnectButton").disabled = true;
        }
    })
    .catch(function(error) {
        console.log("Error: " + error);
    });
