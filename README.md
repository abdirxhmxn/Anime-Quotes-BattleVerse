# Anime-Quotes-BattleVerse

**Haiku No Kami** - Where anime legends clash in epic quote battles.

A full-stack web application that combines anime quotes with an interactive battle system. Users can pit their favorite anime characters against each other, vote on the most impactful quotes, and watch warriors rise through the leaderboard ranks.

## Features

- **Battle Arena**: Face off iconic anime characters in head-to-head quote battles
- **Dynamic Leaderboard**: Track the greatest warriors with real-time win statistics
- **Like System**: Vote on your favorite quotes
- **Quote Management**: Add new anime quotes with character info and images
- **Beautiful UI**: Dark-themed, anime-inspired design with smooth animations
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Demo

### Live Application

You can try out the live application here: [Add your deployment URL]

### Screenshots

**Battle Arena in Action**

![Battle Arena](/public/image1.png)

The battle arena shows two characters facing off with their iconic quotes. Each fighter displays their name, anime series, quote, and character image in an elegant card layout. The golden frame styling gives it that championship feel.

**Champion Victory Screen**

![Champion Screen](image2.png)

When you select a winner, they're crowned champion with their updated victory count. The interface celebrates their win with a special display before they face their next challenger.

**Leaderboard Rankings**

![Leaderboard](image3.png)

The leaderboard tracks the top warriors based on their battle wins. The top three positions get special visual treatment, and you can see at a glance who's dominating the arena.

### How It Works

The application creates an engaging experience where you become the judge of anime's greatest quotes. When you start a battle, two characters are randomly selected from the database. You read their iconic quotes and decide which one resonates more deeply. The winner earns a victory point and stays in the arena to defend their title against the next challenger.

As you continue battling, a leaderboard tracks which characters have the most wins. It's interesting to see which quotes and characters rise to the top through community voting. The interface updates in real-time, so you immediately see the impact of your choices.

**Battle Flow:**

1. Click "Start Battle" on the home page
2. Two anime characters appear with their signature quotes
3. Read both quotes and think about which one hits harder
4. Select your winner by clicking their button
5. The winner is crowned and their stats update
6. The champion faces a new challenger in the next round
7. Check the leaderboard to see who's dominating

## Getting Started

### Prerequisites

You'll need the following installed on your machine:

- Node.js version 14 or higher
- A MongoDB Atlas account or local MongoDB instance
- npm or yarn package manager

### Installation

**Step 1: Clone the repository**
```bash
git clone https://github.com/yourusername/Anime-Quotes-BattleVerse.git
cd Anime-Quotes-BattleVerse
```

**Step 2: Install dependencies**
```bash
npm install
```

**Step 3: Configure MongoDB**

Open `server.js` and `seedQuotes.js` and update the MongoDB connection string with your own:
```javascript
const url = 'your-mongodb-connection-string';
```

**Step 4: Seed the database (optional but recommended)**
```bash
node seedQuotes.js
```
This will populate your database with 35 pre-loaded anime quotes from popular series.

**Step 5: Start the server**
```bash
npm start
```
For development with automatic restart on file changes:
```bash
npm run go
```

**Step 6: Open your browser**

Navigate to `http://localhost:8000` and start battling.

## Tech Stack

### Backend
- Node.js for the runtime environment
- Express.js as the web framework
- MongoDB for database storage
- EJS for server-side templating

### Frontend
- Vanilla JavaScript for client-side logic
- CSS3 for styling with gradients and animations
- Fetch API for asynchronous requests

### Development Tools
- Nodemon for automatic server restarts during development
- Body-parser for parsing request bodies
- MongoDB Atlas for cloud database hosting

## Project Structure

```
Anime-Quotes-BattleVerse/
│
├── public/
│   ├── main.js          # Client-side battle logic
│   └── styles.css       # Application styling
│
├── views/
│   └── index.ejs        # Main template
│
├── server.js            # Express server & routes
├── seedQuotes.js        # Database seeding script
├── package.json         # Dependencies
└── README.md            # Documentation
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Render home page with quotes |
| POST | `/quotes` | Add a new quote |
| GET | `/randomQuotes` | Get 5 random quotes for battle |
| PUT | `/battleWin` | Increment win count for character |
| GET | `/leaderboard` | Get top 10 warriors |
| PUT | `/messages` | Like a quote (+1) |
| PUT | `/messagesDown` | Unlike a quote (-1) |
| DELETE | `/delete` | Remove a quote |

## How to Play

Playing is straightforward and addictive. Here's what happens:

**Starting a Battle**
Click the "Start Battle" button on the home page. The system randomly selects two anime characters from the database and displays them side by side with their iconic quotes.

**Making Your Choice**
Read both quotes carefully. Think about which one is more powerful, meaningful, or memorable to you. There's no right or wrong answer - it's all about which quote resonates with you more.

**Selecting the Winner**
Click the "Select Winner" button under your chosen character. That character earns one victory point and becomes the champion.

**Champion Mode**
Here's where it gets interesting. The winner doesn't leave - they stay in the arena to defend their title. A new challenger appears, and you decide if the champion can hold their ground or if the newcomer takes over.

**Building the Leaderboard**
Every victory counts. As you continue playing, some characters will rack up more wins than others. The leaderboard shows the top 10 warriors, and you'll notice patterns emerge about which quotes people find most impactful.

## Key Features Explained

### Battle System
The battle system is designed to be fair and engaging. Winners stay in the arena to defend their title, creating a natural competition. The system ensures the same character never battles themselves, even if they appear multiple times in the database. Quote caching reduces database calls, making battles load faster and feel more responsive.

### Leaderboard
The leaderboard displays the top 10 characters based on their win counts. The top three positions get special visual highlighting - think gold, silver, and bronze medals. It updates automatically after each battle, so you see changes happen in real-time. Characters with the highest win counts appear at the top.

### Performance Optimizations
Several behind-the-scenes optimizations make the experience smooth. Quotes are cached for 3 seconds to reduce database load during rapid battles. When you like a quote, the interface responds immediately while the database updates in the background. The random quote selection uses MongoDB's aggregation pipeline for efficiency, and database queries are indexed for fast lookups.

## Configuration

### Database Schema
```javascript
{
  character: String,    // Character name
  anime: String,        // Anime series
  quote: String,        // Iconic quote
  image: String,        // Character image URL
  thumbUp: Number,      // Like count (default: 0)
  wins: Number          // Battle victories (default: 0)
}
```

### Environment Variables
You can optionally use environment variables for configuration:
```bash
PORT=8000
MONGODB_URI=your-connection-string
```

## Contributing

Contributions are welcome and appreciated. If you'd like to contribute, here's how:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

### Ideas for Future Features

There are many directions this project could go. Here are some ideas:

- Add more anime quotes from different series and genres
- Implement user authentication so people can track their voting history
- Create a tournament mode with brackets and elimination rounds
- Build a statistics page showing character win rates and trends
- Develop a mobile app version for iOS and Android
- Add sound effects and animations for more immersive battles
- Create themed battle modes (shonen vs seinen, heroes vs villains, etc.)
- Implement a comment system so users can discuss why they chose certain quotes

## License

This project is licensed under the ISC License.

## Acknowledgments

This project was inspired by the incredible storytelling and memorable quotes found throughout anime. The character images and quotes are sourced from their respective anime series for educational and entertainment purposes.

## Contact

**Project Link**: [https://github.com/yourusername/Anime-Quotes-BattleVerse](https://github.com/yourusername/Anime-Quotes-BattleVerse)

---

Made for anime fans who appreciate the wisdom, humor, and power of great quotes.
