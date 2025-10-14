function selectYear(year) {
  localStorage.setItem('selectedYear', year);
  window.location.href = 'branch.html';
}

function goToSubjects(branch) {
  window.location.href = `subjects/${branch}.html`;
}

function selectSubject(subject) {
  const path = window.location.pathname;
  const branch = path.split('/').pop().split('.')[0];
  localStorage.setItem('selectedSubject', subject);
  localStorage.setItem('selectedBranch', branch);
  window.location.href = `../options/options_${branch}.html`;
}

function selectOption(option) {
  const branch = localStorage.getItem('selectedBranch');
  const subject = localStorage.getItem('selectedSubject');
  window.location.href = `${branch}_${option}.html`;
}
