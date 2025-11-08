const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb+srv://workamohamed_db_user:test123@cluster0.mbacbks.mongodb.net/Anime?appName=Cluster0';
const dbName = "Anime";

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

MongoClient.connect(url)
  .then(client => {
    console.log('✅ Connected to Database');
    const db = client.db(dbName);
    const quotesCollection = db.collection('Poetry');

    // =========================
    // 🌸 MAIN ROUTES
    // =========================
    app.get('/', (req, res) => {
      quotesCollection.find().toArray()
        .then(result => res.render('index.ejs', { Poetry: result }))
        .catch(err => {
          console.error(err);
          res.status(500).send('Error loading quotes');
        });
    });

    app.post('/quotes', (req, res) => {
      const character = req.body.character?.trim();
      const anime = req.body.anime?.trim();
      const quote = req.body.quote?.trim();
      const image = req.body.image?.trim();

      if (!character || !quote) {
        console.log('Skipped empty entry');
        return res.redirect('/');
      }

      quotesCollection.insertOne({
        character,
        anime: anime || 'Unknown',
        quote,
        image,
        thumbUp: 0,
        wins: 0
      })
        .then(result => {
          console.log('🪶 Added:', result.insertedId);
          res.redirect('/');
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Failed to add quote');
        });
    });

    // =========================
    // ⚔️ BATTLE MODE - OPTIMIZED
    // =========================
    app.get('/randomQuotes', (req, res) => {
      quotesCollection.aggregate([{ $sample: { size: 5 } }]).toArray()
        .then(randomDocs => res.json(randomDocs))
        .catch(err => {
          console.error('Error fetching random quotes:', err);
          res.status(500).json({ error: 'Failed to load random quotes' });
        });
    });

    app.put('/battleWin', (req, res) => {
      const { character, quote } = req.body;
      
      quotesCollection.findOneAndUpdate(
        { character: character.trim(), quote: quote.trim() },
        { $inc: { wins: 1 } },
        { returnDocument: 'after' }
      )
        .then(result => {
          if (!result) {
            return res.status(404).json({ error: 'Fighter not found' });
          }
          console.log(`${character} gains +1 victory!`);
          res.json(result);
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('Error recording win');
        });
    });

    app.get('/leaderboard', (req, res) => {
      quotesCollection.find().sort({ wins: -1 }).limit(10).toArray()
        .then(leaderboard => res.json(leaderboard))
        .catch(err => {
          console.error('Error loading leaderboard:', err);
          res.status(500).json({ error: 'Failed to load leaderboard' });
        });
    });

    // =========================
    // 👍 LIKE SYSTEM - FIRE & FORGET
    // =========================
    app.put('/messages', (req, res) => {
      // Send response immediately
      res.json('Success');
      
      // Update in background (fire and forget for speed)
      quotesCollection.findOneAndUpdate(
        { character: req.body.character.trim(), quote: req.body.quote.trim() },
        { $inc: { thumbUp: 1 } },
        { sort: { _id: -1 } }
      ).catch(err => console.error('Like update error:', err));
    });

    app.put('/messagesDown', (req, res) => {
      // Send response immediately
      res.json('Success');
      
      // Update in background (fire and forget for speed)
      quotesCollection.findOneAndUpdate(
        { character: req.body.character.trim(), quote: req.body.quote.trim() },
        { $inc: { thumbUp: -1 } },
        { sort: { _id: -1 } }
      ).catch(err => console.error('Unlike update error:', err));
    });

    // =========================
    // 🗑️ DELETE QUOTES
    // =========================
    app.delete('/delete', (req, res) => {
      quotesCollection.deleteOne({ 
        character: req.body.character, 
        quote: req.body.quote 
      })
        .then(result => {
          if (result.deletedCount === 0) {
            return res.json('No quote to delete');
          }
          res.json('Message deleted!');
        })
        .catch(err => {
          console.error(err);
          res.status(500).json('Error deleting message');
        });
    });

    // =========================
    // 🚀 SERVER START
    // =========================
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`🌐 Listening on port ${PORT}`));
  })
  .catch(error => {
    console.error('DB Connection Error:', error);
    process.exit(1);
  });