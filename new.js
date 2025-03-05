// Grading scale mapping (letter grades to numerical values)
const gradingScale = {
    "A+": 4.0,
    "A": 4.0,
    "A-": 3.7,
    "B+": 3.3,
    "B": 3.0,
    "B-": 2.7,
    "C+": 2.3,
    "C": 2.0,
    "C-": 1.7,
    "D+": 1.3,
    "D": 1.0,
    "F": 0.0
};

function hide() {
    document.getElementById('skillsSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'none';
    document.getElementById('skillsContainer').innerHTML = '';
    document.getElementById('resultText').innerHTML = '';
}

// Define the top 3 skills for each program
const programSkills = {
    "Adminstrative Sciences": ["Leadership", "Strategic Planning", "Financial Management"],
    "Al-Alsun & Applied Languages": ["Translation", "Intercultural Communication", "Language Proficiency"],
    "Archaeology & Cultural Heritage": ["Historical Research", "Cultural Preservation", "Archaeological Fieldwork"],
    "Architecture": ["Design Thinking", "Structural Engineering", "Sustainable Design"],
    "Art & Design": ["Creativity", "Visual Communication", "Digital Design"],
    "Artificial Intelligence": ["Machine Learning", "Data Analysis", "Algorithm Design"],
    "Basic Science": ["Research Methodology", "Data Analysis", "Critical Thinking"],
    "Biotechnology": ["Molecular Biology", "Genetic Engineering", "Bioinformatics"],
    "Business": ["Entrepreneurship", "Marketing", "Financial Analysis"],
    "Business Information System": ["Data Management", "System Analysis", "IT Project Management"],
    "Computer Engineering": ["Embedded Systems", "Hardware Design", "Software Development"],
    "Computer Science": ["Programming", "Data Structures", "Software Engineering"],
    "Community Sciences": ["Social Research", "Community Development", "Public Policy Analysis"],
    "Desert Agriculture": ["Sustainable Farming", "Soil Science", "Water Resource Management"],
    "Economics & Political Science": ["Economic Analysis", "Policy Making", "Political Theory"],
    "Energy & Environmental Engineering": ["Renewable Energy", "Environmental Impact Assessment", "Energy Systems Design"],
    "Engineering": ["Problem Solving", "Technical Design", "Project Management"],
    "Filmmaking & Performing Arts": ["Storytelling", "Cinematography", "Acting"],
    "Fisheries & Aquaculture Technology": ["Aquatic Biology", "Fisheries Management", "Aquaculture Systems"],
    "Global Affairs & Public Policy": ["International Relations", "Policy Analysis", "Diplomacy"],
    "Humanities & Social Science": ["Critical Thinking", "Cultural Analysis", "Historical Research"],
    "International Transport & Logistics": ["Supply Chain Management", "Logistics Planning", "Transport Economics"],
    "Law": ["Legal Research", "Argumentation", "Contract Law"],
    "Maritime Transport & Technology": ["Maritime Law", "Naval Architecture", "Port Management"],
    "Mass Communications": ["Media Production", "Public Relations", "Journalism"],
    "Medicine": ["Clinical Skills", "Medical Research", "Patient Care"],
    "Media": ["Content Creation", "Digital Marketing", "Media Analysis"],
    "Nursing": ["Patient Care", "Medical Knowledge", "Communication Skills"],
    "Oral & Dental Medicine": ["Dental Surgery", "Oral Pathology", "Patient Management"],
    "Pharmacy": ["Pharmacology", "Medicinal Chemistry", "Patient Counseling"],
    "Physical Therapy": ["Rehabilitation Techniques", "Anatomy Knowledge", "Patient Assessment"],
    "Technological Industries": ["Innovation Management", "Product Development", "Quality Control"],
    "Technical & Vocational": ["Technical Skills", "Hands-on Training", "Safety Protocols"],
    "Tourism & Hospitality": ["Customer Service", "Event Management", "Tourism Marketing"],
    "Veterinary Medicine": ["Animal Care", "Veterinary Surgery", "Disease Diagnosis"]
};

// Function to display the top 3 skills and their grading options
function displaySkills(selectedProgram) {
    const skillsSection = document.getElementById('skillsSection');
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = ''; // Clear previous skills

    const skills = programSkills[selectedProgram];
    if (skills) {
        // Show the skills section
        skillsSection.style.display = 'block';

        // Display each skill with a grading datalist
        skills.forEach((skill) => {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';

            // Create a label for the skill
            const label = document.createElement('label');
            label.textContent = skill;
            skillItem.appendChild(label);

            // Create an input field for grading
            const input = document.createElement('input');
            input.type = 'text';
            input.setAttribute('list', `grading-${skill.replace(/\s+/g, '-')}`);
            skillItem.appendChild(input);

            // Create a datalist for grading options
            const datalist = document.createElement('datalist');
            datalist.id = `grading-${skill.replace(/\s+/g, '-')}`;
            Object.keys(gradingScale).forEach((grade) => {
                const datalistOption = document.createElement('option');
                datalistOption.value = grade;
                datalist.appendChild(datalistOption);
            });
            skillItem.appendChild(datalist);

            // Append the skill item to the container
            skillsContainer.appendChild(skillItem);
        });
    } else {
        skillsSection.style.display = 'none'; // Hide the section if no skills are found
        alert("No skills data available for the selected program.");
    }
}

// Function to calculate the results
function calculateResults() {
    const skillsContainer = document.getElementById('skillsContainer');
    const inputs = skillsContainer.querySelectorAll('input');
    let totalGrade = 0;

    // Calculate the total grade
    inputs.forEach((input) => {
        const grade = input.value.toUpperCase();
        if (gradingScale[grade] !== undefined) {
            totalGrade += gradingScale[grade];
        } else {
            alert(`Invalid grade entered: ${grade}. Please enter a valid grade.`);
            return;
        }
    });

    // Calculate the average grade
    const averageGrade = totalGrade / inputs.length;

    // Determine the best major based on the average grade
    let bestMajor = "";
    if (averageGrade >= 3.5) {
        bestMajor = "Computer Science";
    } else if (averageGrade >= 3.0) {
        bestMajor = "Engineering";
    } else if (averageGrade >= 2.5) {
        bestMajor = "Business";
    } else {
        bestMajor = "No specific recommendation. Consider improving your skills.";
    }

    // Display the result
    const resultText = document.getElementById('resultText');
    resultText.innerHTML = `
        <strong>Average Grade:</strong> ${averageGrade.toFixed(2)}<br>
        <strong>Best Major:</strong> ${bestMajor}
    `;
    document.getElementById('resultSection').style.display = 'block';
}

// Event listener for form submission
document.getElementById('mainbtn').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission
    const selectedProgram = document.getElementById('p').value;
    if (selectedProgram) {
        displaySkills(selectedProgram);
    } else {
        alert("Please select a program.");
    }
});a