let database = [];

fetch("data/rotations.json")
  .then(response => response.json())
  .then(data => {
      database = data;
      console.log("Database loaded");
  });

function searchStar() {

    const name =
        document.getElementById("starName")
        .value
        .toLowerCase();

    const resultsDiv =
        document.getElementById("results");

    resultsDiv.innerHTML = "";

    const matches = database.filter(entry =>
        entry.star.toLowerCase().includes(name)
    );

    if(matches.length === 0){
        resultsDiv.innerHTML =
            "<p>No result found</p>";
        return;
    }

    matches.forEach(entry => {

        const div = document.createElement("div");
        div.className = "result";

        div.innerHTML =
        `<b>${entry.star}</b><br>
         Prot = ${entry.period} ± ${entry.error} d<br>
         Ref: ${entry.reference}`;

        resultsDiv.appendChild(div);
    });
}

function submitEntry() {

const star =
 document.getElementById("newStar").value;

const period =
 document.getElementById("newPeriod").value;

const error =
 document.getElementById("newError").value;

const reference =
 document.getElementById("newReference").value;


if(!star || !period || !error || !reference){
    alert("Please fill all fields");
    return;
}

const newEntry = {
    star: star,
    period: Number(period),
    error: Number(error),
    reference: reference
};

const jsonText =
encodeURIComponent(
JSON.stringify(newEntry, null, 2)
);

const githubURL =
"https://github.com/Paul-Charpentier/star_rotation/new/main/data" +
"?filename=contribution_" +
Date.now() +
".json&value=" +
jsonText;

document.getElementById("submitInfo")
.innerHTML =
"Opening GitHub submission page...";

window.open(githubURL);
}
