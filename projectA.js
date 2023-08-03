document.addEventListener("DOMContentLoaded", function () {
  const projectDetailsDiv = document.getElementById("leftside");
  const projectDetailsDiv2 = document.getElementById("rightside");
  const projectDetailsDiv3 = document.getElementById("pgallery");

  try {
    const projectDetails = JSON.parse(localStorage.getItem("projectDetails"));
    if (!projectDetails) {
      throw new Error("No project details found in Local Storage.");
    }

    projectDetailsDiv.innerHTML = `
        <h2>${projectDetails.projectTitle}</h2>
        <p class="titledetails">${projectDetails.contestantName}</p>
        <p class="titledetails">${projectDetails.voteCount} Stimmen</p>
        <button class="button">Jets abstimmen</button>
        <p class="policy">Diese Site wird durch reCaPTCHA genutzt. Es gelten die <a href="https://policies.google.com/privacy?hl=en-US">Datenschutzerklärung</a> und die <a href="">Nutzungsbedingungen</a> von Google.</p> 
      `;

    projectDetailsDiv2.innerHTML = `
        <h2 class="p-head">Das Besondere an unserem Projekt:</h2>
        <p class="p-head">${projectDetails.contestantAnswer1}</p>
        <h2 class="p-head">Hierfür möchten wir die Spende im Rahmen des Projektes einsetzen:</h2>
        <p class="p-head">${projectDetails.contestantAnswer2}</p>
      `;

    projectDetails.projectGallery.forEach((imageUrl) => {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      imgElement.alt = "Project Image";
      imgElement.classList.add("gallery");
      projectDetailsDiv3.appendChild(imgElement);
    });
  } catch (error) {
    console.error("Error displaying project details:", error);
    alert("Failed to display project details. Please try again later.");
  }
});
