const container = document.getElementById("container");

function handleForm(event) {
    event.preventDefault();
}
document.getElementById("submitUrl").addEventListener('submit', handleForm);

document.getElementById("submitUrl").onsubmit = function() {
    var url = document.getElementById("url").value;
    if (document.getElementsByClassName("links").length < 1) {
        var element = document.createElement("div");
        element.className = "links";
    } else {
        var element = document.getElementsByClassName("links")[0];
        element.innerHTML = "";
    }
    var table = document.createElement("table");
    table.className = "table";
    let head = document.createElement("thead");
    let tr = document.createElement("tr");
    let downloadType = document.createElement("th");
    downloadType.innerHTML = "Download";
    let formatType = document.createElement("th");
    formatType.innerHTML = "Format";
    let qualityType = document.createElement("th");
    qualityType.innerHTML = "Quality";
    let hasAudio = document.createElement("th");
    hasAudio.innerHTML = "Has Audio";
    let hasVideo = document.createElement("th");
    hasVideo.innerHTML = "Has Video";
    tr.appendChild(downloadType);
    tr.appendChild(formatType);
    tr.appendChild(qualityType);
    tr.appendChild(hasAudio);
    tr.appendChild(hasVideo);
    head.appendChild(tr);
    table.appendChild(head);
    var body = document.createElement("tbody");
    getInfo(url).then(info => {
        for (let i = 0, len = info["formats"].length; i < len; i++) {
            let format = document.createElement("tr");
            let download = document.createElement("td");
            let a = document.createElement("a");
            a.href = info["formats"][i]["url"];
            a.target = "_blank";
            a.innerHTML = "Download";
            download.appendChild(a);
            let type = document.createElement("td");
            type.innerHTML = info["formats"][i]["mimeType"].split(";")[0];
            let quality = document.createElement("td");
            if (info["formats"][i]["qualityLabel"] == null) {
                quality.innerHTML = info["formats"][i]["quality"];
            } else {
                quality.innerHTML = info["formats"][i]["quality"].concat(" (", info["formats"][i]["qualityLabel"], ")");
            }
            let audio = document.createElement("td");
            audio.innerHTML = info["formats"][i]["hasAudio"].toString();
            let video = document.createElement("td");
            video.innerHTML = info["formats"][i]["hasVideo"].toString();
            format.appendChild(download);
            format.appendChild(type);
            format.appendChild(quality);
            format.appendChild(audio);
            format.appendChild(video);
            body.appendChild(format);
            body.appendChild(document.createElement("br"));
        }
    });
    table.appendChild(body);
    element.appendChild(table);
    container.appendChild(element);
}
