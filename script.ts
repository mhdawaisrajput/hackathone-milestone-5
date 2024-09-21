document
  .getElementById(`resumeForm`)
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get form elememts
    const profileImageInput = document.getElementById(
      "profileimage"
    ) as HTMLInputElement;

    const nameElement = document.getElementById(`name`) as HTMLInputElement;
    const emailElement = document.getElementById(`email`) as HTMLInputElement;
    const phoneElement = document.getElementById(`phone`) as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLTextAreaElement;

    // Check if all Elements are present
    if (
      profileImageInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement
    ) {

      // Get values from form
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;

      // Handle profile Image
      const profileImageFile = profileImageInput.files?.[0];
      const profileimageURL = profileImageFile
        ? URL.createObjectURL(profileImageFile)
        : "";

    // Generate the resume HTML content
    const resumeHTML = `
    <h2>Resume</h2>

    ${
      profileimageURL
        ? `<img src="${profileimageURL}" alt="Profile Image" class="profileimage"> `
        : ""
    }

    <p><strong>Name:</strong> ${name} </p>
    <p><strong>Email:</strong> ${email} </p>
    <p><strong>Phone Number:</strong> ${phone} </p>
    <h3>Education</h3>
    <p>${education}</p>
    <h3>Experience</h3>
    <p>${experience}</p>
    <h3>Skills</h3>
    <p>${skills}</p>

    `;

      // Display the resume in the output container
      const resumeOutputElement = document.getElementById("resumeOutput");

      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeHTML;
        resumeOutputElement.classList.remove("hidden");

        // Create container for buttons
        const buttonsContainer = document.createElement("div");
        buttonsContainer.id = "buttonsContainer";
        resumeOutputElement.appendChild(buttonsContainer);

        // Add download pdf button
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
          window.print();  // open the print dialog, allowing the user to save as pdf.
        });

        buttonsContainer.appendChild(downloadButton);

        // Add Shareable link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Copy Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
          try {

            // Create a unique shareable link.
            const shareableLink = `https://yourdomain.com/resumes/${name.replace(
              /\s+/g,
              "_"
            )}_cv.html`;

            // Use clipboard API to copy the shareable link
            await navigator.clipboard.writeText(shareableLink);
            alert("Shareable link copied to clipboard!");
          } catch (err) {
            console.error("Failed to copy link: ", err);
            alert("Failed to copy link to clipboard. Please try again");
          }
        });
        buttonsContainer.appendChild(shareLinkButton);
      } else {
        console.error("Resume output container not found");
      }
    } else {
      console.error("Forms elements are missing");
    }
  });