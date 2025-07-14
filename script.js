// Global variables
let catechismData = [];
let currentQuestionIndex = 0;
let userNotes = JSON.parse(localStorage.getItem("catechismNotes")) || {};

// Load the JSON data and initialize the application
async function loadCatechismData() {
	try {
		const response = await fetch("baptist_catechism_master.json");
		catechismData = await response.json();
		initializeApp();
	} catch (error) {
		console.error("Error loading catechism data:", error);
		alert(
			"Error loading catechism data. Please make sure the JSON file is in the correct location."
		);
	}
}

// Initialize the application
function initializeApp() {
	populateQuestionSelect();
	setupEditableContent();
	displayQuestion(0);

	// Load user notes
	loadUserNotes();

	// Save notes when user types
	setupNoteSaving();
}

// Populate the question select dropdown
function populateQuestionSelect() {
	const select = document.getElementById("questionSelect");
	select.innerHTML = "";

	catechismData.forEach((question, index) => {
		const option = document.createElement("option");
		option.value = index;
		option.textContent = `Q${question.number}: ${question.title}`;
		select.appendChild(option);
	});
}

// Display a specific question
function displayQuestion(index) {
	if (index < 0 || index >= catechismData.length) return;

	currentQuestionIndex = index;
	const question = catechismData[index];

	// Update navigation
	updateNavigation();

	// Update question content
	document.getElementById("sectionTitle").textContent = question.section;
	document.getElementById("questionTitle").textContent = question.title;
	document.getElementById("questionText").textContent = question.question;
	document.getElementById("answerText").textContent = question.answer;

	// Update verses
	const versesList = document.getElementById("versesList");
	versesList.innerHTML = "";
	question.verses.forEach((verse) => {
		const li = document.createElement("li");
		li.textContent = verse;
		versesList.appendChild(li);
	});

	// Update coloring page
	document.getElementById("coloringTitle").textContent = `Coloring Page`;
	document.getElementById("coloringQuestion").textContent = question.title;

	// Update coloring image
	const coloringImage = document.getElementById("coloringImage");
	if (question.coloring_page_image && question.coloring_page_image.trim()) {
		coloringImage.innerHTML = `<img src="${question.coloring_page_image}" alt="Coloring page for ${question.title}" class="coloring-image">`;
	} else {
		coloringImage.innerHTML = `
            <p>Coloring page image will be displayed here</p>
            <p><em>You can add images by updating the JSON file or placing image files in the same directory</em></p>
        `;
	}

	// Load user notes for this question
	loadQuestionNotes(question.number);

	// Update question select
	document.getElementById("questionSelect").value = index;

	// Update URL
	updateURL();
}

// Update navigation buttons and counter
function updateNavigation() {
	const prevBtn = document.getElementById("prevBtn");
	const nextBtn = document.getElementById("nextBtn");
	const counter = document.getElementById("questionCounter");

	prevBtn.disabled = currentQuestionIndex === 0;
	nextBtn.disabled = currentQuestionIndex === catechismData.length - 1;

	counter.textContent = `Question ${currentQuestionIndex + 1} of ${
		catechismData.length
	}`;
}

// Navigation functions
function previousQuestion() {
	if (currentQuestionIndex > 0) {
		displayQuestion(currentQuestionIndex - 1);
	}
}

function nextQuestion() {
	if (currentQuestionIndex < catechismData.length - 1) {
		displayQuestion(currentQuestionIndex + 1);
	}
}

function goToQuestion(index) {
	displayQuestion(parseInt(index));
}

// Print functionality
function printQuestion() {
	window.print();
}


// Setup editable content
function setupEditableContent() {
	const editableElements = document.querySelectorAll(".editable-content");

	editableElements.forEach((element) => {
		element.contentEditable = true;

		element.addEventListener("click", function () {
			if (this.querySelector("em")) {
				this.innerHTML = "";
			}
		});

		element.addEventListener("blur", function () {
			if (this.innerHTML.trim() === "") {
				const section = this.id.replace("Text", "");
				const placeholder = getPlaceholder(section);
				this.innerHTML = placeholder;
			}
		});
	});
}

// Get placeholder text for different sections
function getPlaceholder(section) {
	switch (section) {
		case "application":
			return "<p><em>Add application ideas...</em></p>";
		case "prayer":
			return "<p><em>Add prayer ideas...</em></p>";
		case "activities":
			return "<p><em>Add Activity ideas...</em></p>";
		case "songs":
			return "<p><em>Add Song ideas...</em></p>";
		default:
			return "<p><em>Click here to add notes...</em></p>";
	}
}

// Load user notes from localStorage
function loadUserNotes() {
	userNotes = JSON.parse(localStorage.getItem("catechismNotes")) || {};
}

// Load notes for a specific question
function loadQuestionNotes(questionNumber) {
	const notes = userNotes[questionNumber] || {};

	// Load application notes
	const applicationText = document.getElementById("applicationText");
	if (notes.application && notes.application.trim()) {
		applicationText.innerHTML = notes.application;
	} else {
		applicationText.innerHTML = "<p><em>Add application ideas...</em></p>";
	}

	// Load prayer notes
	const prayerText = document.getElementById("prayerText");
	if (notes.prayer && notes.prayer.trim()) {
		prayerText.innerHTML = notes.prayer;
	} else {
		prayerText.innerHTML = "<p><em>Add prayer...</em></p>";
	}

	// Load activities notes
	const activitiesText = document.getElementById("activitiesText");
	if (notes.activities && notes.activities.trim()) {
		activitiesText.innerHTML = notes.activities;
	} else {
		activitiesText.innerHTML = "<p><em>Add activities...</em></p>";
	}
	// Load songs notes
	const songText = document.getElementById("songText");
	if (notes.songs && notes.songs.trim()) {
		songText.innerHTML = notes.songs;
	} else {
		songText.innerHTML = "<p><em>Add songs...</em></p>";
	}
}

// Setup note saving
function setupNoteSaving() {
	const saveNote = (element, section) => {
		const questionNumber = catechismData[currentQuestionIndex].number;
		if (!userNotes[questionNumber]) {
			userNotes[questionNumber] = {};
		}

		const content = element.innerHTML.trim();
		if (content && !content.includes("<em>")) {
			userNotes[questionNumber][section] = content;
		} else {
			delete userNotes[questionNumber][section];
		}

		localStorage.setItem("catechismNotes", JSON.stringify(userNotes));
	};

	// Application notes
	document
		.getElementById("applicationText")
		.addEventListener("input", function () {
			saveNote(this, "application");
		});

	// Prayer notes
	document.getElementById("prayerText").addEventListener("input", function () {
		saveNote(this, "prayer");
	});

	// Activities notes
	document
		.getElementById("activitiesText")
		.addEventListener("input", function () {
			saveNote(this, "activities");
		});

	// Songs notes
	document.getElementById("songText").addEventListener("input", function () {
		saveNote(this, "songs");
	});
}

// Keyboard navigation
document.addEventListener("keydown", function (event) {
	if (event.ctrlKey || event.metaKey) {
		switch (event.key) {
			case "ArrowLeft":
				event.preventDefault();
				previousQuestion();
				break;
			case "ArrowRight":
				event.preventDefault();
				nextQuestion();
				break;
			case "p":
				event.preventDefault();
				printQuestion();
				break;
		}
	}
});

// URL hash support for direct linking
function updateURL() {
	const questionNumber = catechismData[currentQuestionIndex].number;
	window.location.hash = `question-${questionNumber}`;
}

function handleHashChange() {
	const hash = window.location.hash;
	if (hash.startsWith("#question-")) {
		const questionNumber = parseInt(hash.replace("#question-", ""));
		const index = catechismData.findIndex((q) => q.number === questionNumber);
		if (index !== -1) {
			displayQuestion(index);
		}
	}
}

// Multi-Print Modal Functions
function showMultiPrintModal() {
	populateModalSelects();
	document.getElementById('multiPrintModal').style.display = 'block';
	// Set default range to current question to end
	document.getElementById('startQuestion').value = currentQuestionIndex;
	document.getElementById('endQuestion').value = catechismData.length - 1;
}

function closeMultiPrintModal() {
	document.getElementById('multiPrintModal').style.display = 'none';
}

function populateModalSelects() {
	const startSelect = document.getElementById('startQuestion');
	const endSelect = document.getElementById('endQuestion');
	
	startSelect.innerHTML = '';
	endSelect.innerHTML = '';
	
	catechismData.forEach((question, index) => {
		const startOption = document.createElement('option');
		startOption.value = index;
		startOption.textContent = `Q${question.number}: ${question.title.substring(0, 50)}...`;
		startSelect.appendChild(startOption);
		
		const endOption = document.createElement('option');
		endOption.value = index;
		endOption.textContent = `Q${question.number}: ${question.title.substring(0, 50)}...`;
		endSelect.appendChild(endOption);
	});
}

function selectSection(sectionName) {
	const sectionQuestions = catechismData.filter(q => q.section === sectionName);
	if (sectionQuestions.length === 0) return;
	
	const firstIndex = catechismData.findIndex(q => q.section === sectionName);
	const lastIndex = catechismData.map(q => q.section).lastIndexOf(sectionName);
	
	document.getElementById('startQuestion').value = firstIndex;
	document.getElementById('endQuestion').value = lastIndex;
}

function selectAllQuestions() {
	document.getElementById('startQuestion').value = 0;
	document.getElementById('endQuestion').value = catechismData.length - 1;
}

function generateMultiPrint() {
	const startIndex = parseInt(document.getElementById('startQuestion').value);
	const endIndex = parseInt(document.getElementById('endQuestion').value);
	const includeColoring = document.getElementById('includeColoringPages').checked;
	const includeNotes = document.getElementById('includePersonalNotes').checked;
	
	if (startIndex > endIndex) {
		alert('Start question must be before or equal to end question.');
		return;
	}
	
	// Generate multi-print view
	createMultiPrintView(startIndex, endIndex, includeColoring, includeNotes);
	
	// Close modal
	closeMultiPrintModal();
}

function createMultiPrintView(startIndex, endIndex, includeColoring, includeNotes) {
	// Create a new window for printing
	const printWindow = window.open('', '_blank');
	
	// Build the HTML content
	let html = `
		<!DOCTYPE html>
		<html lang="en">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Baptist Catechism - Questions ${catechismData[startIndex].number} to ${catechismData[endIndex].number}</title>
			<link rel="stylesheet" href="styles.css">
			<style>
				.no-print { display: none !important; }
				body { background: white; }
				.container { max-width: none; margin: 0; }
			</style>
		</head>
		<body>
			<div class="container">
	`;
	
	// Add each question
	for (let i = startIndex; i <= endIndex; i++) {
		const question = catechismData[i];
		const notes = userNotes[question.number] || {};
		
		// Question page
		html += `
			<div class="question-page">
				<div class="section-header">
					<h1>${question.section}</h1>
				</div>
				<div class="question-title">
					<h2>${question.title}</h2>
				</div>
				<div class="question-content">
					<section class="qa-section">
						<div class="question-text">
							<h3>Question:</h3>
							<p>${question.question}</p>
						</div>
						<div class="answer-text">
							<h3>Answer:</h3>
							<p>${question.answer}</p>
						</div>
					</section>
					<section class="verses-section">
						<h3>Bible Verses:</h3>
						<ul>
							${question.verses.map(verse => `<li>${verse}</li>`).join('')}
						</ul>
					</section>
		`;
		
		// Add personal notes if enabled
		if (includeNotes) {
			html += `
					<section class="application-section">
						<h3>Application:</h3>
						<div class="editable-content">
							${notes.application || '<p><em>Add application ideas...</em></p>'}
						</div>
					</section>
					<section class="prayer-section">
						<h3>Prayer:</h3>
						<div class="editable-content">
							${notes.prayer || '<p><em>Add prayer ideas...</em></p>'}
						</div>
					</section>
					<section class="activities-section">
						<h3>Activities:</h3>
						<div class="editable-content">
							${notes.activities || '<p><em>Add activity ideas...</em></p>'}
						</div>
					</section>
					<section class="songs-section">
						<h3>Songs:</h3>
						<div class="editable-content">
							${notes.songs || '<p><em>Add songs that align...</em></p>'}
						</div>
					</section>
			`;
		} else {
			// Empty note sections for filling in
			html += `
					<section class="application-section">
						<h3>Application:</h3>
						<div class="editable-content">
							<p><em>Add application ideas...</em></p>
						</div>
					</section>
					<section class="prayer-section">
						<h3>Prayer:</h3>
						<div class="editable-content">
							<p><em>Add prayer ideas...</em></p>
						</div>
					</section>
					<section class="activities-section">
						<h3>Activities:</h3>
						<div class="editable-content">
							<p><em>Add activity ideas...</em></p>
						</div>
					</section>
					<section class="songs-section">
						<h3>Songs:</h3>
						<div class="editable-content">
							<p><em>Add songs that align...</em></p>
						</div>
					</section>
			`;
		}
		
		html += `
				</div> <!-- Close question-content -->
			</div> <!-- Close question-page -->
		`; // Close question-page
		
		// Add coloring page if enabled
		if (includeColoring) {
			html += `
				<div class="coloring-page">
					<div class="coloring-header">
						<h2>Coloring Page</h2>
						<p>${question.title}</p>
					</div>
					<div class="coloring-content">
						<div class="coloring-placeholder">
							${question.coloring_page_image && question.coloring_page_image.trim() 
								? `<img src="${question.coloring_page_image}" alt="Coloring page for ${question.title}" class="coloring-image">`
								: '<p>Coloring page image will be displayed here</p><p><em>You can add images by updating the JSON file</em></p>'
							}
						</div>
					</div>
				</div>
			`;
		}
	}
	
	html += `
			</div>
			<script>
				window.onload = function() {
					setTimeout(() => {
						window.print();
					}, 500);
				};
			</script>
		</body>
		</html>
	`;
	
	// Write HTML to new window
	printWindow.document.write(html);
	printWindow.document.close();
}

// Initialize the application when the page loads
document.addEventListener("DOMContentLoaded", function () {
	loadCatechismData();

	// Handle URL hash changes
	window.addEventListener("hashchange", handleHashChange);

	// Handle initial hash
	if (window.location.hash) {
		setTimeout(handleHashChange, 100);
	}
	
	// Close modal when clicking outside of it
	window.addEventListener('click', function(event) {
		const modal = document.getElementById('multiPrintModal');
		if (event.target === modal) {
			closeMultiPrintModal();
		}
	});
});

