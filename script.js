function selectYear(year) {
  localStorage.setItem('selectedYear', year);
  window.location.href = 'branch.html';
}

function goToSubjects(branch) {
  localStorage.setItem('selectedBranch', branch);
  window.location.href = `subjects/${branch}.html`;
}

function selectSubject(subject) {
  localStorage.setItem('selectedSubject', subject);
  document.getElementById('subjectName').textContent = subject;
  document.getElementById('options-section').style.display = 'block';
}

function selectOption(option) {
  const year = localStorage.getItem('selectedYear');
  const branch = localStorage.getItem('selectedBranch');
  const subject = localStorage.getItem('selectedSubject');
  const driveLink = getDriveLink(year, branch, subject, option);
  window.open(driveLink, '_blank');
}

// Rating functionality
let selectedRating = 0;

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
});

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
  let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
  ratings.push(rating);
  localStorage.setItem('ratings', JSON.stringify(ratings));
  updateRatingDisplay();
}

function updateRatingDisplay() {
  const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
  const count = ratings.length;
  const average = count > 0 ? (ratings.reduce((sum, r) => sum + r, 0) / count).toFixed(1) : 0;

  document.getElementById('rating-count').textContent = count;
  document.getElementById('rating-average').textContent = average;
}

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
        a: { notes: 'https://drive.google.com/drive/folders/16q-_KqH2HjESrIr4mQsZmUkogTIJuqXU?usp=drive_link', record: 'https://drive.google.com/drive/folders/placeholder_1_ise_a_record', textbooks: 'https://drive.google.com/drive/folders/placeholder_1_ise_a_textbooks', pyqs: 'https://drive.google.com/drive/folders/placeholder_1_ise_a_pyqs' },
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


