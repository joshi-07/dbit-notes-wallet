// Recent activity function
function addToRecentActivity(type, value) {
  let recent = JSON.parse(localStorage.getItem('recentActivity')) || [];
  recent.unshift({ type, value, timestamp: Date.now() });
  recent = recent.slice(0, 10); // Keep last 10 activities
  localStorage.setItem('recentActivity', JSON.stringify(recent));
  displayRecentActivities();
}

// Display recent activities
function displayRecentActivities() {
  const recentList = document.getElementById('recent-list');
  if (!recentList) return;

  const recent = JSON.parse(localStorage.getItem('recentActivity')) || [];
  if (recent.length === 0) {
    recentList.innerHTML = '<div class="no-activity"><p>📭 No recent activities</p><p>Start exploring to see your activity here!</p></div>';
    return;
  }

  recentList.innerHTML = recent.map(activity => {
    const icon = getActivityIcon(activity.type);
    const relativeTime = getRelativeTime(activity.timestamp);
    return `
      <div class="activity-card">
        <div class="activity-icon">${icon}</div>
        <div class="activity-content">
          <div class="activity-type">${activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</div>
          <div class="activity-value">${activity.value}</div>
          <div class="activity-time">${relativeTime}</div>
        </div>
      </div>
    `;
  }).join('');
}

function getActivityIcon(type) {
  const icons = {
    year: '📅',
    branch: '🏫',
    subject: '📚',
    option: '📄'
  };
  return icons[type] || '🔍';
}

function getRelativeTime(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString();
}

// Clear recent activities
function clearRecentActivities() {
  localStorage.removeItem('recentActivity');
  displayRecentActivities();
  showModal('Recent activities cleared!');
}

// Navigation functions
function selectYear(year) {
  localStorage.setItem('selectedYear', year);
  addToRecentActivity('year', year);
  showLoading();
  setTimeout(() => window.location.href = 'branch.html', 300);
}

function goToSubjects(branch) {
  localStorage.setItem('selectedBranch', branch);
  addToRecentActivity('branch', branch);
  showLoading();
  setTimeout(() => window.location.href = `subjects/${branch}.html`, 300);
}

function selectSubject(subject) {
  localStorage.setItem('selectedSubject', subject);
  addToRecentActivity('subject', subject);
  window.location.href = '../options.html';
}

function selectOption(option) {
  const year = localStorage.getItem('selectedYear');
  const branch = localStorage.getItem('selectedBranch');
  const subject = localStorage.getItem('selectedSubject');
  addToRecentActivity('option', `${subject} - ${option}`);
  const driveLink = getDriveLink(year, branch, subject, option);
  window.open(driveLink, '_blank');
}

// Theme functionality with dark and light modes
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
  }
}

// Load saved theme immediately
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Attach theme toggle event listener immediately
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
  updateThemeIcon(savedTheme);
}



// Enhanced rating functionality with comments
let selectedRating = 0;
let ratingComment = '';

function updateStars(rating) {
  const stars = document.querySelectorAll('.star');
  stars.forEach((star, index) => {
    if (index < rating) {
      star.textContent = '★';
      star.classList.add('selected');
    } else {
      star.textContent = '☆';
      star.classList.remove('selected');
    }
  });
}

function submitRating(rating) {
  const comment = document.getElementById('rating-comment')?.value || '';
  let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
  ratings.push({ rating, comment, timestamp: Date.now() });
  localStorage.setItem('ratings', JSON.stringify(ratings));
  updateRatingDisplay();
  document.getElementById('rating-comment').value = '';
  showModal('Thank you for your feedback!');
}

function updateRatingDisplay() {
  const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
  const count = ratings.length;
  const average = count > 0 ? (ratings.reduce((sum, r) => sum + r.rating, 0) / count).toFixed(1) : 0;

  document.getElementById('rating-count').textContent = count;
  document.getElementById('rating-average').textContent = average;

  const commentsContainer = document.getElementById('rating-comments');
  if (commentsContainer) {
    commentsContainer.innerHTML = ratings.slice(-5).map(r => `
      <div class="comment">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}: ${r.comment || 'No comment'}</div>
    `).join('');
  }
}

// Enhanced search with autocomplete
function filterItems() {
  const searchTerm = document.getElementById('search-input').value.toLowerCase();
  const items = document.querySelectorAll('.glass-btn, .subject-btn, .option-btn');
  const suggestions = [];

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(searchTerm)) {
      item.style.display = '';
      suggestions.push(item.textContent.trim());
    } else {
      item.style.display = 'none';
    }
  });

  updateAutocomplete(suggestions);
}

function updateAutocomplete(suggestions) {
  const autocomplete = document.getElementById('autocomplete');
  if (autocomplete) {
    autocomplete.innerHTML = suggestions.slice(0, 5).map(s => `<div onclick="selectSuggestion('${s}')">${s}</div>`).join('');
    autocomplete.style.display = suggestions.length ? 'block' : 'none';
  }
}

function selectSuggestion(suggestion) {
  document.getElementById('search-input').value = suggestion;
  filterItems();
  document.getElementById('autocomplete').style.display = 'none';
}

// Breadcrumbs
function updateBreadcrumbs() {
  const breadcrumbs = document.getElementById('breadcrumbs');
  if (breadcrumbs) {
    const year = localStorage.getItem('selectedYear');
    const branch = localStorage.getItem('selectedBranch');
    const subject = localStorage.getItem('selectedSubject');
    breadcrumbs.innerHTML = `
      <a href="index.html">Home</a> >
      ${year ? `<a href="#" onclick="selectYear(${year})">${year} Year</a> >` : ''}
      ${branch ? `<a href="#" onclick="goToSubjects('${branch}')">${branch.toUpperCase()}</a> >` : ''}
      ${subject ? `<span>${subject}</span>` : ''}
    `;
  }
}

// Modal functionality
function showModal(message) {
  const modal = document.getElementById('modal');
  const modalMessage = document.getElementById('modal-message');
  if (modal && modalMessage) {
    modalMessage.textContent = message;
    modal.style.display = 'flex';
    setTimeout(() => modal.style.display = 'none', 3000);
  }
}

// Loading animation
function showLoading() {
  const loader = document.getElementById('loading');
  if (loader) loader.style.display = 'flex';
}

// Accessibility: Keyboard navigation
function handleKeydown(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    const focusedElement = document.activeElement;
    if (focusedElement.classList.contains('glass-btn') || focusedElement.classList.contains('subject-btn') || focusedElement.classList.contains('option-btn') || focusedElement.classList.contains('back-btn') || focusedElement.classList.contains('feedback-btn') || focusedElement.classList.contains('queries-btn')) {
      focusedElement.click();
    }
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', function() {
  const stars = document.querySelectorAll('.star');
  const submitBtn = document.getElementById('submit-rating');

  stars.forEach(star => {
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.getAttribute('data-value'));
      updateStars(selectedRating);
    });
  });

  submitBtn.addEventListener('click', function() {
    if (selectedRating > 0) {
      submitRating(selectedRating);
      selectedRating = 0;
      updateStars(0);
    }
  });

  updateRatingDisplay();
  updateBreadcrumbs();
  displayRecentActivities();

  // Search functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', filterItems);
    searchInput.addEventListener('blur', () => setTimeout(() => document.getElementById('autocomplete').style.display = 'none', 150));
  }

  // Keyboard navigation
  document.addEventListener('keydown', handleKeydown);

  // Hide loading
  const loader = document.getElementById('loading');
  if (loader) loader.style.display = 'none';
});

function getDriveLink(year, branch, subject, option) {
  // Placeholder drive links for each year-branch-subject-option combination
  // Add actual drive links here later
  const links = {
    1: {
      aiml: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_1_aiml_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_aiml_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_aiml_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_aiml_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_1_aiml_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_aiml_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_aiml_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_aiml_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_1_aiml_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_aiml_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_aiml_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_aiml_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_1_aiml_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_aiml_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_aiml_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_aiml_d_pyqs' }
      },
      aids: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_1_aids_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_aids_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_aids_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_aids_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_1_aids_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_aids_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_aids_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_aids_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_1_aids_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_aids_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_aids_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_aids_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_1_aids_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_aids_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_aids_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_aids_d_pyqs' }
      },
      ise: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_1_ise_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_ise_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ise_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ise_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_1_ise_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_ise_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ise_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ise_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_1_ise_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_ise_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ise_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ise_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_1_ise_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_ise_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ise_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ise_d_pyqs' }
      },
      cse: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_1_cse_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_cse_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_cse_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_cse_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_1_cse_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_cse_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_cse_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_cse_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_1_cse_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_cse_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_cse_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_cse_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_1_cse_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_cse_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_cse_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_cse_d_pyqs' }
      },
      ece: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_1_ece_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_ece_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ece_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ece_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_1_ece_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_ece_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ece_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ece_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_1_ece_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_ece_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ece_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ece_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_1_ece_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_ece_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ece_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ece_d_pyqs' }
      },
      civil: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_1_civil_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_civil_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_civil_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_civil_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_1_civil_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_civil_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_civil_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_civil_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_1_civil_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_civil_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_civil_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_civil_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_1_civil_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_civil_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_civil_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_civil_d_pyqs' }
      },
      mechanical: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_mechanical_d_pyqs' }
      }
    },
    2: {
      aiml: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_2_aiml_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_aiml_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_aiml_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_aiml_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_2_aiml_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_aiml_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_aiml_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_aiml_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_2_aiml_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_aiml_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_aiml_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_aiml_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_2_aiml_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_aiml_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_aiml_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_aiml_d_pyqs' }
      },
      aids: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_2_aids_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_aids_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_aids_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_aids_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_2_aids_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_aids_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_aids_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_aids_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_2_aids_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_aids_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_aids_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_aids_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_2_aids_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_aids_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_aids_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_aids_d_pyqs' }
      },
      ise: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_2_ise_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_ise_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_ise_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_ise_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_2_ise_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_ise_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_ise_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_ise_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_2_ise_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_ise_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_ise_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_ise_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_2_ise_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_ise_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_ise_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_ise_d_pyqs' }
      },
      cse: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_2_cse_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_cse_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_cse_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_cse_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_2_cse_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_cse_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_cse_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_cse_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_2_cse_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_cse_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_cse_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_cse_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_2_cse_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_cse_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_cse_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_cse_d_pyqs' }
      },
      ece: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_2_ece_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_ece_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_ece_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_ece_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_2_ece_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_ece_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_ece_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_ece_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_2_ece_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_ece_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_ece_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_ece_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_2_ece_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_ece_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_ece_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_ece_d_pyqs' }
      },
      civil: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_2_civil_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_civil_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_civil_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_civil_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_2_civil_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_civil_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_civil_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_civil_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_2_civil_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_civil_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_civil_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_civil_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_2_civil_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_civil_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_civil_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_civil_d_pyqs' }
      },
      mechanical: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_2_mechanical_d_pyqs' }
      }
    },
    3: {
      aiml: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_3_aiml_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_aiml_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_aiml_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_aiml_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_3_aiml_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_aiml_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_aiml_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_aiml_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_3_aiml_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_aiml_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_aiml_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_aiml_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_3_aiml_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_aiml_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_aiml_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_aiml_d_pyqs' }
      },
      aids: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_3_aids_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_aids_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_aids_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_aids_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_3_aids_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_aids_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_aids_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_aids_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_3_aids_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_aids_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_aids_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_aids_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_3_aids_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_aids_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_aids_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_aids_d_pyqs' }
      },
      ise: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_3_ise_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_ise_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_ise_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_ise_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_3_ise_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_ise_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_ise_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_ise_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_3_ise_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_ise_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_ise_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_ise_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_3_ise_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_ise_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_ise_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_ise_d_pyqs' }
      },
      cse: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_3_cse_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_cse_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_cse_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_cse_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_3_cse_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_cse_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_cse_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_cse_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_3_cse_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_cse_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_cse_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_cse_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_3_cse_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_cse_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_cse_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_cse_d_pyqs' }
      },
      ece: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_3_ece_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_ece_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_ece_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_ece_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_3_ece_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_ece_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_ece_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_ece_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_3_ece_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_ece_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_ece_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_ece_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_3_ece_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_ece_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_ece_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_ece_d_pyqs' }
      },
      civil: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_3_civil_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_civil_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_civil_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_civil_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_3_civil_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_civil_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_civil_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_civil_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_3_civil_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_civil_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_civil_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_civil_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_3_civil_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_civil_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_civil_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_civil_d_pyqs' }
      },
      mechanical: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_3_mechanical_d_pyqs' }
      }
    },
    4: {
      aiml: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_4_aiml_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_aiml_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_aiml_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_aiml_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_4_aiml_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_aiml_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_aiml_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_aiml_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_4_aiml_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_aiml_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_aiml_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_aiml_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_4_aiml_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_aiml_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_aiml_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_aiml_d_pyqs' }
      },
      aids: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_4_aids_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_aids_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_aids_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_aids_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_4_aids_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_aids_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_aids_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_aids_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_4_aids_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_aids_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_aids_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_aids_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_4_aids_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_aids_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_aids_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_aids_d_pyqs' }
      },
      ise: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_4_ise_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_ise_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_ise_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_ise_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_4_ise_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_ise_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_ise_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_ise_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_4_ise_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_ise_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_ise_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_ise_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_4_ise_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_ise_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_ise_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_ise_d_pyqs' }
      },
      cse: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_4_cse_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_cse_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_cse_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_cse_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_4_cse_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_cse_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_cse_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_cse_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_4_cse_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_cse_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_cse_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_cse_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_4_cse_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_cse_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_cse_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_cse_d_pyqs' }
      },
      ece: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_4_ece_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_ece_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_ece_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_ece_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_4_ece_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_ece_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_ece_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_ece_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_4_ece_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_ece_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_ece_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_ece_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_4_ece_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_ece_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_ece_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_ece_d_pyqs' }
      },
      civil: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_4_civil_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_civil_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_civil_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_civil_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_4_civil_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_civil_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_civil_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_civil_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_4_civil_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_civil_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_civil_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_civil_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_4_civil_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_civil_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_civil_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_civil_d_pyqs' }
      },
      mechanical: {
        a: { notes: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_a_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_a_pyqs' },
        b: { notes: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_b_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_b_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_b_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_b_pyqs' },
        c: { notes: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_c_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_c_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_c_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_c_pyqs' },
        d: { notes: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_d_notes', record: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_d_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_d_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_4_mechanical_d_pyqs' }
      }
    }
  };
  return links[year][branch][subject][option];
}


