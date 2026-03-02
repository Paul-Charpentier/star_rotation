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
  
      let errorText = "";
  
      if(entry.err_plus === entry.err_minus){
          errorText =
          `± ${entry.err_plus}`;
      }
      else{
          errorText =
          `+${entry.err_plus} -${entry.err_minus}`;
      }
  
      const doiLink =
          `https://doi.org/${entry.doi}`;
  
      div.innerHTML =
      `<b>${entry.star}</b><br>
       Prot = ${entry.period} ${errorText} d<br>
       Ref:
       <a href="${doiLink}"
          target="_blank">
          ${entry.ref_name}
       </a>`;
  
      resultsDiv.appendChild(div);
  });
}

function submitEntry() {

const entry = {

 star:
 document.getElementById("newStar").value,

 period:
 Number(document.getElementById("newPeriod").value),

 err_plus:
 Number(document.getElementById("newErrPlus").value),

 err_minus:
 Number(document.getElementById("newErrMinus").value),

 ref_name:
 document.getElementById("newRefName").value,

 doi:
 document.getElementById("newDOI").value
};

if(
 !entry.star ||
 !entry.period ||
 !entry.err_plus ||
 !entry.err_minus ||
 !entry.ref_name ||
 !entry.doi
){
 alert("Fill all fields");
 return;
}

const jsonText =
encodeURIComponent(
JSON.stringify(entry,null,2)
);

const githubURL =
"https://github.com/Paul-Charpentier/star_rotation/new/main/data" +
"?filename=contribution_" +
Date.now() +
".json&value=" +
jsonText;

window.open(githubURL);
}
