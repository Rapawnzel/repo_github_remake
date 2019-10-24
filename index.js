//  Rapawnzel

function main(){
    let username = document.querySelector("#user").value;
    httpGet(`https://api.github.com/users/${username}`, 
    (user) => {
        let userObj = JSON.parse(user);
        
        document.querySelector("#userImg").innerHTML = `<img src = ${userObj["avatar_url"]} class = "img-fluid rounded">`;
        document.querySelector("#username").innerHTML = userObj["login"];
        document.querySelector("#name").innerHTML = userObj["name"];
        document.querySelector("#bio").innerHTML = userObj["bio"];
        document.querySelector("#repos").innerHTML = "Repositories";
        httpGet(userObj["repos_url"], 
            (repos) => {
                let repoList = JSON.parse(repos);
                let repoPrint = [];
                for (repo in repoList){
                    document.querySelector("#results").innerHTML += `<div id="reponame">${repoList[repo]["name"]}</div> 
                                                                     <div id="stars">${repoList[repo]["stargazers_count"]}</div>
                                                                     <div id="forks">${repoList[repo]["forks"]}</div> <br>`;
                }
            }
        )	
    })
}

function httpGet(theUrl, callback) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl);
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xmlHttp.send();
}