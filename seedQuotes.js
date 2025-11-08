const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://workamohamed_db_user:test123@cluster0.mbacbks.mongodb.net/Anime?appName=Cluster0";
const dbName = "Anime";
const collectionName = "Poetry";

const quotes = [
  {
    character: "Naruto Uzumaki",
    anime: "Naruto",
    quote: "Hard work is worthless for those that don’t believe in themselves.",
    image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/08/naruto-new-anime-2025-announcement.jpg?w=1600&h=900&fit=crop"
  },
  {
    character: "Sasuke Uchiha",
    anime: "Naruto",
    quote: "I understand now. Even if I must take the devil’s fruit, I must gain power. I am an avenger.",
    image: "https://cdn.dribbble.com/userupload/11428818/file/original-e26099b859f5de5bb632ee44ec1a502d.jpg?format=webp&resize=400x300&vertical=center"
  },
  {
    character: "Monkey D. Luffy",
    anime: "One Piece",
    quote: "If you don’t take risks, you can’t create a future.",
    image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/10/luffy-new-power-up.png"
  },
  {
    character: "Roronoa Zoro",
    anime: "One Piece",
    quote: "Only one thing matters — to fulfill the promise I made to my captain.",
    image: "https://www.superherotoystore.com/cdn/shop/articles/12_1920x.jpg?v=1694183458"
  },
  {
    character: "Eren Yeager",
    anime: "Attack on Titan",
    quote: "I want to see and understand the world outside. I don’t want to die inside these walls without knowing what’s out there!",
    image: "https://w0.peakpx.com/wallpaper/7/108/HD-wallpaper-eren-yeager-aot-aot-eren-aot-season-4-attack-on-titan-season-4-eren.jpg"
  },
  {
    character: "Levi Ackerman",
    anime: "Attack on Titan",
    quote: "The only thing we’re allowed to do is believe that we won’t regret the choice we made.",
    image: "https://wallpapercat.com/w/full/f/8/8/911955-2160x1204-desktop-hd-levi-ackerman-wallpaper-photo.jpg"
  },
  {
    character: "Light Yagami",
    anime: "Death Note",
    quote: "I will become the god of this new world.",
    image: "https://w0.peakpx.com/wallpaper/670/410/HD-wallpaper-light-yagami-art-facial-expression-anime-deathnote-anime-deathnote-deathnote-l-kira.jpg"
  },
  {
    character: "L Lawliet",
    anime: "Death Note",
    quote: "If you can’t win the game, if you can’t solve the puzzle, then you’re just a loser.",
    image: "https://e0.pxfuel.com/wallpapers/28/384/desktop-wallpaper-l-death-note-anime.jpg"
  },
  {
    character: "Goku",
    anime: "Dragon Ball Z",
    quote: "Power comes in response to a need, not a desire. You have to create that need.",
    image: "https://wallpapercave.com/wp/wp2559730.png"
  },
  {
    character: "Vegeta",
    anime: "Dragon Ball Z",
    quote: "You may have invaded my mind and my body, but there’s one thing a Saiyan always keeps—his pride!",
    image: "https://beneaththetangles.com/wp-content/uploads/2019/02/vegeta_angry.jpg"
  },
  {
    character: "Itachi Uchiha",
    anime: "Naruto Shippuden",
    quote: "Those who forgive themselves, and are able to accept their true nature... they are the strong ones.",
    image: "https://i.pinimg.com/736x/16/e3/5e/16e35ec113aa1fba4d2b172729be8f3a.jpg"
  },
  {
    character: "Kakashi Hatake",
    anime: "Naruto",
    quote: "Those who break the rules are scum, but those who abandon their friends are worse than scum.",
    image: "https://practicaltyping.com/wp-content/uploads/2018/11/kakashi-1.png"
  },
  {
    character: "Tanjiro Kamado",
    anime: "Demon Slayer",
    quote: "No matter how many people you may lose, you have no choice but to go on living—no matter how devastating the blows may be.",
    image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bf212755-7e9f-4a48-a48a-2b3caf0d3b96/dhvyjr1-66ed363e-ef04-4d71-abe1-8174111d63f7.jpg/v1/fill/w_1194,h_669,q_70,strp/tanjiro_kamado_desktop_wallpaper__by_bobbytarantin0_dhvyjr1-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
  },
  {
    character: "Nezuko Kamado",
    anime: "Demon Slayer",
    quote: "Even if I become a demon, I’ll never hurt a human.",
    image: "https://static0.cbrimages.com/wordpress/wp-content/uploads/2023/11/nezuko-demons-slayer.jpg?w=1200&h=675&fit=crop"
  },
  {
    character: "Gojo Satoru",
    anime: "Jujutsu Kaisen",
    quote: "Throughout heaven and earth, I alone am the honored one.",
    image: "https://static.wikia.nocookie.net/jujutsu-kaisen/images/5/5a/Satoru_Gojo_arrives_on_the_battlefield_%28Anime%29.png/revision/latest?cb=20210226205256"
  },
  {
    character: "Yuji Itadori",
    anime: "Jujutsu Kaisen",
    quote: "Dying to win and risking death to win are completely different.",
    image: "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2022/11/Jujutsu-Kaisen-Itadori.jpg?w=1600&h=900&fit=crop"
  },
  {
    character: "Edward Elric",
    anime: "Fullmetal Alchemist: Brotherhood",
    quote: "A lesson without pain is meaningless. That’s because you can’t gain something without sacrificing something in return.",
    image: "https://static.wikia.nocookie.net/fma/images/b/bc/Edward_Elric.jpg/revision/latest?cb=20240719004259"
  },
  {
    character: "Alphonse Elric",
    anime: "Fullmetal Alchemist: Brotherhood",
    quote: "Humankind cannot gain anything without first giving something in return. That is alchemy’s first law of Equivalent Exchange.",
    image: "https://preview.redd.it/alphonse-elric-from-full-metal-alchemist-v0-pc2875wqh8ie1.jpg?width=1080&crop=smart&auto=webp&s=d7aba7f1c6f4cb1f9c3ea2fd9180a888f1f72699"
  },
  {
    character: "Spike Spiegel",
    anime: "Cowboy Bebop",
    quote: "I’m not going there to die. I’m going to find out if I’m really alive.",
    image: "https://lucien0maverick.wordpress.com/wp-content/uploads/2015/10/spike-spiegel-2.jpg"
  },
  {
    character: "Vash the Stampede",
    anime: "Trigun",
    quote: "The ticket to the future is always open.",
    image: "https://static0.colliderimages.com/wordpress/wp-content/uploads/2022/05/Trigun.jpg?w=1600&h=900&fit=crop"
  },
  {
    character: "Saitama",
    anime: "One Punch Man",
    quote: "I’ll leave tomorrow’s problems to tomorrow’s me.",
    image: "https://images.squarespace-cdn.com/content/v1/564a7651e4b03f66f2c1023b/1494504259759-5DLBOTS7L7HG6YUOHI1R/Saitama+Cover.jpg?format=2500w"
  },
  {
    character: "Genos",
    anime: "One Punch Man",
    quote: "Master, I will become stronger. I swear it!",
    image: "https://wallpapers-clan.com/wp-content/uploads/2024/06/one-punch-man-genos-blast-desktop-wallpaper-preview.jpg"
  },
  {
    character: "Gon Freecss",
    anime: "Hunter x Hunter",
    quote: "When I’m gone, you’ll realize how much I cared about you.",
    image: "https://static.wikia.nocookie.net/hunterxhunter/images/3/3e/HxH2011_EP147_Gon_Portrait.png/revision/latest?cb=20230904181801"
  },
  {
    character: "Killua Zoldyck",
    anime: "Hunter x Hunter",
    quote: "If I ignore a friend I have the power to help, wouldn’t I be betraying him?",
    image: "https://static0.cbrimages.com/wordpress/wp-content/uploads/2021/03/Killua-Cropped.jpg?w=1200&h=675&fit=crop"
  },
  {
    character: "Ken Kaneki",
    anime: "Tokyo Ghoul",
    quote: "It’s better to be hurt than to hurt others. Nice people can be happy with just that.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCR4dGNCuxrQ2PZdHQHP-DAl-vB_4tBrwk_Q&s"
  },
  {
    character: "Rem",
    anime: "Re:Zero",
    quote: "Even if you can’t forgive yourself, I’ll forgive you.",
    image: "https://static.wikia.nocookie.net/rezero/images/0/02/Rem_Anime.png/revision/latest?cb=20210916151323"
  },
  {
    character: "Rintarou Okabe",
    anime: "Steins;Gate",
    quote: "Every brilliant experiment, like every great work of art, starts with an act of imagination.",
    image: "https://practicaltyping.com/wp-content/uploads/2019/02/okabe.jpg"
  },
  {
    character: "Mikasa Ackerman",
    anime: "Attack on Titan",
    quote: "This world is cruel, but it’s also very beautiful.",
    image: "https://i.pinimg.com/736x/ea/8c/c2/ea8cc2bcd59586bb9b2923c69aa0e13e.jpg"
  },
  {
    character: "Erwin Smith",
    anime: "Attack on Titan",
    quote: "My soldiers, rage! My soldiers, scream! My soldiers, fight!",
    image: "https://miro.medium.com/1*xOQ_V3rbyKzTPl2zQsNGQw.jpeg"
  },
  {
    character: "Koro Sensei",
    anime: "Assassination Classroom",
    quote: "The difference between the novice and the master is that the master has failed more times than the novice has tried.",
    image: "https://preview.redd.it/who-is-faster-when-they-are-in-their-full-potential-koro-v0-eyovamqnxi6a1.jpg?width=735&format=pjpg&auto=webp&s=b7818b12435dd9f83e0df2520790c9d22b6aa18f"
  },
  {
    character: "Mob",
    anime: "Mob Psycho 100",
    quote: "If you want to change yourself, you need to face yourself first.",
    image: "https://w0.peakpx.com/wallpaper/543/400/HD-wallpaper-mob-psycho-100.jpg"
  },
  {
    character: "Lelouch Lamperouge",
    anime: "Code Geass",
    quote: "If the king doesn’t move, then his subjects won’t follow.",
    image: "https://images3.alphacoders.com/135/1358482.png"
  },
  {
    character: "Zero Two",
    anime: "Darling in the Franxx",
    quote: "We were born so that we can live together.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGV9BFd7PdiVfE9_khD3fMmqDMhUuDUY3wdg&s"
  },
  {
    character: "Thorfinn",
    anime: "Vinland Saga",
    quote: "You have no enemies. No one has any enemies.",
    image: "https://i.redd.it/better-written-thorfinn-vinland-saga-or-guts-berserk-v0-edbjzzf9hllf1.jpg?width=685&format=pjpg&auto=webp&s=8a0f5e252531bd16ad051e4076c3c5d954e3fcb9"
  },
  {
    character: "Ayanokoji Kiyotaka",
    anime: "Classroom of the Elite",
    quote: "Talent is nothing compared to persistence.",
    image: "https://inasianspaces.com/wp-content/uploads/2024/01/ayanokoji-watches-horikita-fail-at-another-social-interaction-classroom-of-the-elite-season-3-episode-1.png?w=1200"
  }
];

async function seedDB() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    await collection.deleteMany({});
    const result = await collection.insertMany(quotes);
    console.log(`✅ Inserted ${result.insertedCount} anime quotes successfully.`);
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

seedDB();
