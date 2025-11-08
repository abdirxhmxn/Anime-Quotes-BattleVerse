console.log("🔥 Anime Battle Mode Active!");

const battleBtn = document.querySelector('.battle');
const battleSection = document.querySelector('.battle-section');

let currentChampion = null;
let cachedQuotes = [];
let lastFetchTime = 0;
const CACHE_DURATION = 3000; // 3 seconds cache

// Fetch quotes with caching
function fetchRandomQuotes() {
  const now = Date.now();
  
  if (cachedQuotes.length > 0 && (now - lastFetchTime) < CACHE_DURATION) {
    return Promise.resolve(cachedQuotes);
  }

  return fetch('/randomQuotes')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch quotes');
      return res.json();
    })
    .then(quotes => {
      cachedQuotes = quotes;
      lastFetchTime = now;
      return quotes;
    })
    .catch(err => {
      console.error(err);
      alert('Could not load quotes from database!');
      return [];
    });
}

function startBattle() {
  fetchRandomQuotes().then(quotes => {
    if (quotes.length < 2) {
      alert("Need at least 2 warriors in the database!");
      return;
    }

    let challengerA, challengerB;
    
    if (!currentChampion) {
      // First battle - pick two random fighters
      challengerA = quotes[Math.floor(Math.random() * quotes.length)];
      do {
        challengerB = quotes[Math.floor(Math.random() * quotes.length)];
      } while (quotes.length > 1 && challengerB.character === challengerA.character);
    } else {
      // Champion defends title
      challengerA = currentChampion;
      do {
        challengerB = quotes[Math.floor(Math.random() * quotes.length)];
      } while (quotes.length > 1 && challengerB.character === challengerA.character);
    }

    renderBattle(challengerA, challengerB);
  });
}

// Main battle button listener
if (battleBtn) {
  battleBtn.addEventListener('click', startBattle);
}

function renderBattle(fighter1, fighter2) {
  battleSection.innerHTML = `
    <h2 style="color:#ff3c64;">Battle Arena</h2>
    <div class="battle-grid">
      <div class="fighter-card">
        <h3>${fighter1.character}</h3>
        <p style="color: #aaa; font-size: 1.3rem; margin: 0.5rem 0;">${fighter1.anime || ''}</p>
        <p style="font-style: italic; margin: 1rem 0;">"${fighter1.quote}"</p>
        ${fighter1.image ? `<img src="${fighter1.image}" alt="${fighter1.character}" width="150" style="margin: 1rem 0; border-radius: 8px;">` : ''}
        <button class="choose" data-character="${fighter1.character}" data-quote="${fighter1.quote}" data-anime="${fighter1.anime || ''}" data-image="${fighter1.image || ''}" data-wins="${fighter1.wins || 0}">Select Winner</button>
      </div>
      <div class="vs">VS</div>
      <div class="fighter-card">
        <h3>${fighter2.character}</h3>
        <p style="color: #aaa; font-size: 1.3rem; margin: 0.5rem 0;">${fighter2.anime || ''}</p>
        <p style="font-style: italic; margin: 1rem 0;">"${fighter2.quote}"</p>
        ${fighter2.image ? `<img src="${fighter2.image}" alt="${fighter2.character}" width="150" style="margin: 1rem 0; border-radius: 8px;">` : ''}
        <button class="choose" data-character="${fighter2.character}" data-quote="${fighter2.quote}" data-anime="${fighter2.anime || ''}" data-image="${fighter2.image || ''}" data-wins="${fighter2.wins || 0}">Select Winner</button>
      </div>
    </div>
  `;

  // Add click handlers to choose buttons
  document.querySelectorAll('.choose').forEach(btn => {
    btn.addEventListener('click', function() {
      const winner = {
        character: this.dataset.character,
        quote: this.dataset.quote,
        anime: this.dataset.anime,
        image: this.dataset.image,
        wins: parseInt(this.dataset.wins) || 0
      };
      selectWinner(winner);
    });
  });
}

function selectWinner(winner) {
  // Update current champion
  currentChampion = {
    character: winner.character,
    quote: winner.quote,
    anime: winner.anime,
    image: winner.image,
    wins: winner.wins + 1
  };

  // Show winner screen
  displayWinner(currentChampion);
  
  // Update database in background
  fetch('/battleWin', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ character: winner.character, quote: winner.quote })
  })
    .then(res => res.ok ? res.json() : Promise.reject('Error'))
    .then(updated => {
      currentChampion.wins = updated.wins;
      updateLeaderboard();
    })
    .catch(err => console.error('Battle update error:', err));
  
  // Clear cache to get fresh fighters
  cachedQuotes = [];
}

function displayWinner(winner) {
  battleSection.innerHTML = `
    <h2 style="color:#ffd166;">🏆 Champion Crowned!</h2>
    <div class="winner-card">
      <h3>${winner.character}</h3>
      <p style="color: #aaa; font-size: 1.4rem;">${winner.anime}</p>
      <p style="font-style: italic; margin: 1rem 0;">"${winner.quote}"</p>
      ${winner.image ? `<img src="${winner.image}" alt="${winner.character}" width="180" style="margin: 1rem 0; border-radius: 8px;">` : ''}
      <p style="color:#ffd166; font-size: 1.8rem; font-weight: bold;">Victories: ${winner.wins}</p>
    </div>
    <button class="battle" id="nextBattle">Next Battle ⚔️</button>
  `;

  // Add listener for next battle
  const nextBtn = document.getElementById('nextBattle');
  if (nextBtn) {
    nextBtn.addEventListener('click', startBattle);
  }
}

function updateLeaderboard() {
  fetch('/leaderboard')
    .then(res => res.json())
    .then(leaderboard => {
      const leaderboardList = document.querySelector('.leaderboard-list');
      if (!leaderboardList) return;
      
      if (leaderboard.length === 0) {
        leaderboardList.innerHTML = '<li style="text-align: center; font-size: 1.8rem; color: rgba(255, 255, 255, 0.6);">No battles yet. Be the first to fight!</li>';
        return;
      }
      
      leaderboardList.innerHTML = leaderboard.map(fighter => `
        <li class="leaderboard-item">
          <div>
            <strong>${fighter.character}</strong>
            <span style="color: #aaa; font-size: 1.3rem;"> — ${fighter.anime || 'Unknown'}</span>
          </div>
          <span class="score-display">
            ${fighter.wins || 0} wins
          </span>
        </li>
      `).join('');
    })
    .catch(err => console.error('Leaderboard error:', err));
}

// Preload quotes for faster first battle
fetchRandomQuotes();