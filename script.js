function selectYear(year) {
  localStorage.setItem('selectedYear', year);
  window.location.href = 'branch.html';
}

function goToSubjects(branch) {
  window.location.href = `subjects/${branch}.html`;
}
