document.addEventListener("DOMContentLoaded", function () {
  const FIRST_API_ENDPOINT = "https://2023.projektbigfoot.de/api/v1/projects";

  function fetchProjects() {
    return fetch(FIRST_API_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        return [];
      });
  }

  function fetchProjectDetails(_id) {
    const SECOND_API_ENDPOINT = `https://2023.projektbigfoot.de/api/v1/projects/${_id}`; // creating 2nd API

    return fetch(SECOND_API_ENDPOINT)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .catch((error) => {
        console.error(
          `Error fetching details for project with ID ${_id}:`,
          error
        );
        return {};
      });
  }

  function populateTable() {
    const projectTableBody = document.getElementById("projectTableBody");

    fetchProjects()
      .then((projects) => {
        projects.forEach((project, index) => {
          const row = document.createElement("tr");
          const idCell = document.createElement("td");
          const votesCell = document.createElement("td");
          const titleCell = document.createElement("td");

          idCell.textContent = index + 1;
          idCell.classList.add("col1");

          votesCell.textContent = project.voteCount;
          votesCell.classList.add("col2");

          titleCell.textContent = project.projectTitle;
          titleCell.classList.add("col3");

          titleCell.addEventListener("click", () => {
            fetchProjectDetails(project._id)
              .then((details) => {
                localStorage.setItem("projectDetails", JSON.stringify(details));
                window.location.href = "projectA.html";
              })
              .catch((error) => {
                console.error("Error fetching project details:", error);
                alert(
                  "Failed to fetch project details. Please try again later."
                );
              });
          });

          row.appendChild(idCell);
          row.appendChild(votesCell);
          row.appendChild(titleCell);

          projectTableBody.appendChild(row);
        });
      })
      .catch((error) => {
        console.error("Error populating table:", error);
        alert("Failed to fetch project data. Please try again later.");
      });
  }
  populateTable();
});
