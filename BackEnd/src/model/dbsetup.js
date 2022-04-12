// const collection = require('../utilities/connection');
const {getBookCollection, getUserCollection, getAuthorCollection, getGenreCollection} = require('../utilities/connection');

// genre has to be created
const bookDb = [
    { bookId: 'B101', bookName: "Five on a Treasure Island", availability: 10, genre: 'Fantasy', authorName: 'Enid Blyton', publishedDate: 1967 },
    { bookId: 'B102', bookName: "Five Run Away Together", availability: 3, genre: 'Fiction', authorName: 'Enid Blyton', publishedDate: 1967 },
    { bookId: 'B103', bookName: "The Enchanted Wood", availability: 6, genre: 'Drama', authorName: 'Enid Blyton', publishedDate: 1990 },
    { bookId: 'B104', bookName: "Mystery of Secret Room", availability: 3, genre: 'Fantasy', authorName: 'Enid Blyton', publishedDate: 1966 },
    { bookId: 'B105', bookName: "The Rilloby Fair Mystery", availability: 2, genre: 'Drama', authorName: 'Enid Blyton', publishedDate: 2009 },
    { bookId: 'B106', bookName: "The devil's disciple", availability: 12, genre: 'Fiction', authorName: 'Bernard Shaw', publishedDate: 1920 },
    { bookId: 'B107', bookName: "Heartbreak House", availability: 1, genre: 'Drama', authorName: 'Bernard Shaw', publishedDate: 1965 },
    { bookId: 'B108', bookName: "Shaw's dramatic criticism", availability: 20, genre: 'Fantasy', authorName: 'Bernard Shaw', publishedDate: 1959 },
    { bookId: 'B109', bookName: "Overruled", availability: 17, genre: 'Drama', authorName: 'Bernard Shaw', publishedDate: 2021 },
    { bookId: 'B110', bookName: "Short stories, scraps & shaving", availability: 13, genre: 'Fantasy', authorName: 'Bernard Shaw', publishedDate: 1932 },
    { bookId: 'B111', bookName: "Pen portraits and reviews", availability: 12, genre: 'Drama', authorName: 'Bernard Shaw', publishedDate: 1971 },
    { bookId: 'B112', bookName: "Harry Potter and the Sorcerer's Stone", availability: 2, genre: 'Fantasy', authorName: 'J.K. Rowling', publishedDate: 1997 },
    { bookId: 'B113', bookName: "Harry Potter and the Chamber of Secrets", availability: 12, genre: 'Drama', authorName: 'J.K. Rowling', publishedDate: 1998 },
    { bookId: 'B114', bookName: "Harry Potter and the Prisoner of Azkaban", availability: 22, genre: 'Fiction', authorName: 'J.K. Rowling', publishedDate: 1999 },
    { bookId: 'B115', bookName: "Harry Potter and the Goblet of Fire", availability: 12, genre: 'Fiction', authorName: 'J.K. Rowling', publishedDate: 1999 },
    { bookId: 'B116', bookName: "Harry Potter and the Half-Blood Prince", availability: 31, genre: 'Drama', authorName: 'J.K. Rowling', publishedDate: 2001 },
    { bookId: 'B117', bookName: "Harry Potter and the Deathly Hallows", availability: 31, genre: 'Fiction', authorName: 'J.K. Rowling', publishedDate: 2007 },
    { bookId: 'B118', bookName: "A Leader's Legacy", availability: 1, genre: 'Finance', authorName: 'Barry Z. Posner', publishedDate: 2006 },
    { bookId: 'B119', bookName: "Learning Leadership", availability: 3, genre: 'Finance', authorName: 'Barry Z. Posner', publishedDate: 2016 },
    { bookId: 'B120', bookName: "Getting the job done!", availability: 2, genre: 'Finance', authorName: 'Barry Z. Posner', publishedDate: 1991 },
    { bookId: 'B121', bookName: "Leadership Practices Inventory", availability: 4, genre: 'Finance', authorName: 'Barry Z. Posner', publishedDate: 1997 },
    { bookId: 'B122', bookName: "Leadership Challenge Workshop", availability: 4, genre: 'Finance', authorName: 'Barry Z. Posner', publishedDate: 2020 },
    { bookId: 'B123', bookName: "Values Cards", availability: 4, genre: 'Finance', authorName: 'Barry Z. Posner', publishedDate: 2010 },
]

const genreDB = [
    { genreId: 'G101', genre: 'Fantasy', books: ['B101', 'B102', 'B103', 'B104', 'B105'] },
    { genreId: 'G102', genre: 'Drama', books: ['B106', 'B107', 'B108', 'B109', 'B110', 'B111'] },
    { genreId: 'G103', genre: 'Fiction', books: ['B112', 'B113', 'B114', 'B115', 'B116', 'B117'] },
    { genreId: 'G104', genre: 'Finance', books: ['B118', 'B119', 'B120', 'B121', 'B122', 'B123'] },
]

const authorDB = [
    { authorId: 'A101', authorName: "Enid Blyton", dob: "11 August 1897 - 28 November 1968", subjects: "Children: Grades 4-6, Famous Five (Fictitious characters), Juvenile fiction, Children's fiction, Adventure and adventurers, fiction, famous five, kid's book, adventure, Translations from English, Children's stories, German, Children's stories, Buried treasure, Adventure and adventurers, Mystery and detective stories, Shipwrecks, Fiction, Pirates, fiction, Detective and mystery stories", books: ['B101', 'B102', 'B103', 'B104', 'B105',] },
    { authorId: 'A102', authorName: "Bernard Shaw", dob: "26 July 1856 - 2 November 1950", subjects: 'Accessible book, Protected DAISY, Drama, Irish Dramatists, Correspondence, British and irish drama (dramatic works by one author), English drama, History, Social classes, Socialism, Speech and social status, Flower vending, Linguistics teachers, Man-woman relationships, History and criticism, English language, Fiction, Facsimiles, Manuscripts, Criticism and interpretation, Theater, World War, 1914-1918, Music, open_syllabus_project, Literature', books: ['B106', 'B107', 'B108', 'B109', 'B110', 'B111'] },
    { authorId: 'A103', authorName: "J.K. Rowling", dob: "31 July 1965 - ", subjects: "Accessible book, Protected DAISY, Children's fiction, New York Times bestseller, England, fiction, Fantasy fiction, Fiction, Wizards, fiction, Magic, Magic, fiction, Wizards, Juvenile fiction, Potter, harry (fictitious character), fiction, Hogwarts School of Witchcraft and Wizardry (Imaginary organization), Hogwarts school of witchcraft and wizardry (imaginary organization), fiction, Schools, fiction, Schools, Character books, English literature, Fantasy, Harry Potter (Fictitious character), Hogwarts School of Witchcraft and Wizardry (Imaginary place), Ficción juvenil, Friendship, Escuelas", books: ['B112', 'B113', 'B114', 'B115', 'B116', 'B117'] },
    { authorId: 'A104', authorName: "Barry Z. Posner", dob: "11 March 1949 - ", subjects: 'Leadership, Executive ability, Business/Economics, Business / Economics / Finance, Management, Management & management techniques, Accessible book, Business & Economics, Protected DAISY, Business & Economics / Leadership, Entrepreneurship, Interpersonal relations, Industrial or vocational training, Student government, Personnel & human resources management, Project management, Business & Management, Christianity, Corporate governance, Education, Employee motivation, Incentives in industry, Industrial management, asia, Management - General, Success in business', books: ['B118', 'B119', 'B120', 'B121', 'B122', 'B123'] }
];

const userDB = [
    {
        userId: "U101",
        name: "Siddharth",
        email: "sidmay10@gmail.com",
        password: "Sidmay10",
        booksTaken: ["B101", "B102", "B103"]
    },
    {
        userId: "U102",
        name: "Jones",
        email: "Jones456@gmail.com",
        password: "Jones456",
        booksTaken: ["B104", "B105"]
    }, {
        userId: "U103",
        name: "Albert",
        email: "Albert@gmail.com",
        password: "Albert789"
    },
]

exports.setupDb = async() =>{
    try{
        let bookColl = await getBookCollection();
        await bookColl.deleteMany();
        await bookColl.insertMany(bookDb.sort( () => Math.random() - 0.5 ));
        
        let userColl = await getUserCollection();
        await userColl.deleteMany();
        await userColl.insertMany(userDB);
        
        let authorColl = await getAuthorCollection();
        await authorColl.deleteMany();
        await authorColl.insertMany(authorDB);
        
        let genreColl = await getGenreCollection();
        await genreColl.deleteMany();
        await genreColl.insertMany(genreDB);

        return 'Insertion successful';
    }catch(e){
        let err = new Error(e.message);
        err.status = 400;
        throw err
    }
}