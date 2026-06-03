document.addEventListener('DOMContentLoaded', function() {
  if (!requireAdmin()) return;
  initMockData();
  renderStats();
});

function renderStats() {
  const contents = getContents();
  const users = getUsers();
  
  const movieCount = contents.filter(c => c.type === 'movie').length;
  const musicCount = contents.filter(c => c.type === 'music').length;
  const totalViews = contents.reduce((sum, c) => sum + c.views, 0);
  
  document.getElementById('statMovies').textContent = movieCount;
  document.getElementById('statMusic').textContent = musicCount;
  document.getElementById('statUsers').textContent = users.length;
  document.getElementById('statViews').textContent = (totalViews / 1000).toFixed(0) + 'k';
}
