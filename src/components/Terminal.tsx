import React, { useState, useRef, useEffect } from 'react';
import { Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useExplorer } from '../context/ExplorerContext';

const Terminal: React.FC = () => {
    const { toggleTheme } = useExplorer();
    const [isMinimized, setIsMinimized] = useState(false);
    const [terminalHeight, setTerminalHeight] = useState(200); // Default height in pixels
    const [isDragging, setIsDragging] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([
        { command: '', output: 'Welcome to the interactive terminal! Type "help" to see available commands.' }
    ]);
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    const availableCommands = [
        'help', 'about', 'skills', 'experience', 'contact', 'theme', 'clear', 'projects', 'download-cv',
        // Easter eggs
        'sudo', 'hack', 'matrix', 'coffee', 'joke', 'quote', 'konami'
    ];

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Handle terminal resize by dragging
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging) {
                const newHeight = window.innerHeight - e.clientY;
                // Constrain height between 100px and 80% of window height
                const constrainedHeight = Math.max(100, Math.min(newHeight, window.innerHeight * 0.8));
                setTerminalHeight(constrainedHeight);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);

    const handleDragStart = () => {
        setIsDragging(true);
    };

    const handleCommand = (cmd: string) => {
        const cleanCmd = cmd.trim().toLowerCase();
        let output: React.ReactNode = '';

        switch (cleanCmd) {
            case 'help':
                output = (
                    <div className="text-gray-300">
                        Available commands:
                        <br />  <span className="text-yellow-400">about</span>       - Display profile summary
                        <br />  <span className="text-yellow-400">skills</span>      - List technical skills
                        <br />  <span className="text-yellow-400">experience</span>  - Show work experience
                        <br />  <span className="text-yellow-400">contact</span>     - Show contact info
                        <br />  <span className="text-yellow-400">projects</span>    - View featured projects
                        <br />  <span className="text-yellow-400">download-cv</span> - Download CV as PDF
                        <br />  <span className="text-yellow-400">theme</span>       - Toggle light/dark theme
                        <br />  <span className="text-yellow-400">clear</span>       - Clear terminal
                        <br />
                        <br />  <span className="text-gray-500">💡 Tip: Use ↑/↓ arrows for command history, Tab for autocomplete</span>
                    </div>
                );
                break;
            case 'about':
                output = "Henri-John Plaatjies - Senior Test Automation Engineer. Designing robust automation frameworks and leading QA initiatives across fintech, retail, and mobile platforms.";
                break;
            case 'skills':
                output = (
                    <div>
                        <span className="text-green-400">Automation:</span> Playwright, Robot Framework, Selenium, Appium
                        <br />
                        <span className="text-blue-400">Languages:</span> Java, JavaScript, TypeScript, Python, SQL
                        <br />
                        <span className="text-purple-400">CI/CD:</span> GitLab, Jenkins, Docker, GitHub Actions
                        <br />
                        <span className="text-yellow-400">API Testing:</span> Postman, Newman, GraphQL, REST
                    </div>
                );
                break;
            case 'experience':
                output = (
                    <div>
                        <div className="mb-2">
                            <span className="text-blue-400 font-bold">Scrums.com</span> (Aug 2024 - Present)
                            <br />Senior QA Engineer for PayFast at Network International
                        </div>
                        <div className="mb-2">
                            <span className="text-blue-400 font-bold">Tata Consultancy Services</span> (Feb 2021 - Jul 2024)
                            <br />Test Automation Engineer at Clicks Group
                        </div>
                        <div>
                            <span className="text-blue-400 font-bold">GameSmart</span> (2019 - 2020)
                            <br />Intern - QA Tester
                        </div>
                    </div>
                );
                break;
            case 'contact':
                output = (
                    <div>
                        Email: <a href="mailto:henriplaatjies@gmail.com" className="text-blue-400 underline">henriplaatjies@gmail.com</a>
                        <br />
                        Phone: <span className="text-gray-300">082 389 1647</span>
                        <br />
                        Location: <span className="text-gray-300">Cape Town, South Africa</span>
                    </div>
                );
                break;
            case 'theme':
            case 'theme toggle':
                toggleTheme();
                output = "Theme toggled.";
                break;
            case 'clear':
                setHistory([]);
                setCommandHistory([]);
                setHistoryIndex(-1);
                return;
            case 'projects':
                output = (
                    <div>
                        <span className="text-yellow-400 font-bold">Featured Projects:</span>
                        <br />• Automated PayFast payment gateway testing suite
                        <br />• CI/CD pipeline integration for Clicks Group
                        <br />• Mobile test automation framework with Appium
                        <br />• API testing framework with Playwright
                    </div>
                );
                break;
            case 'download-cv':
            case 'download cv':
                output = (
                    <div>
                        <span className="text-green-400">✓</span> Initiating CV download...
                        <br />📄 <a href="/cv_website/cv.pdf" download="Henri-John_Plaatjies_CV.pdf" className="text-blue-400 underline">Click here to download CV</a>
                    </div>
                );
                break;
            case 'sudo':
            case 'sudo su':
                output = (
                    <div className="text-red-400">
                        [sudo] password for henri-john: 
                        <br />Sorry, try again.
                        <br />[sudo] password for henri-john:
                        <br />Sorry, try again.
                        <br />[sudo] password for henri-john:
                        <br />sudo: 3 incorrect password attempts
                        <br />
                        <br /><span className="text-yellow-400">Nice try! 😄 But you don't have sudo access here.</span>
                    </div>
                );
                break;
            case 'hack':
            case 'hack the planet':
                output = (
                    <div className="text-green-400">
                        <span className="animate-pulse">Initializing hack sequence...</span>
                        <br />▓▓▓▓▓▓▓▓▓▓ 100%
                        <br />
                        <br />Access granted to: <span className="text-red-400">mainframe.gibson.net</span>
                        <br />Bypassing firewall...
                        <br />Decrypting files...
                        <br />
                        <br /><span className="text-yellow-400">🎉 Congratulations! You're now a 1337 h4x0r!</span>
                        <br /><span className="text-gray-400">(Just kidding - this is just a portfolio site 😉)</span>
                    </div>
                );
                break;
            case 'matrix':
                output = (
                    <div className="text-green-400 font-mono">
                        <span className="animate-pulse">Wake up, Neo...</span>
                        <br />The Matrix has you...
                        <br />Follow the white rabbit 🐰
                        <br />
                        <br />01001000 01100101 01101100 01101100 01101111
                        <br />01010111 01101111 01110010 01101100 01100100
                        <br />
                        <br /><span className="text-white">Knock, knock, Neo.</span>
                    </div>
                );
                break;
            case 'coffee':
            case 'make coffee':
                output = (
                    <div className="text-yellow-400">
                        ☕ Brewing fresh coffee...
                        <br />
                        <br />        (  )   (   )  )
                        <br />         ) (   )  (  (
                        <br />         ( )  (    ) )
                        <br />         _____________
                        <br />        {'<_____________>'} ___
                        <br />        |             |/ _ \\
                        <br />        |               | | |
                        <br />        |               |_| |
                        <br />     ___|             |\\___/
                        <br />    /    \\___________/    \\
                        <br />    \\_____________________/
                        <br />
                        <br /><span className="text-green-400">✓ Coffee ready!</span> Time to code! 💻
                    </div>
                );
                break;
            case 'joke':
                const jokes = [
                    "Why do programmers prefer dark mode? Because light attracts bugs. 🐛",
                    "QA engineer walks into a bar… Orders 1 beer, 0 beers, -1 beers, \"asdf\" beers, 999999 beers. The bar collapses. 🍺",
                    "Why do Java developers wear glasses? Because they don't C#. 👓",
                    "My code never fails. It just… develops unexpected features. ✨",
                    "What's a programmer's favourite place to hang out? The Foo Bar. 🍻",
                    "How many programmers does it take to change a light bulb? None — that's a hardware problem. 💡",
                    "Why did the developer go broke? Because he used up all his cache. 💸",
                    "I told my computer I needed a break… It said \"No problem, installing updates.\" 🔄",
                    "Why did the QA tester stay calm during production outages? Because they're used to everything breaking. 😌",
                    "Debugging: Being the detective in a crime movie where you are also the murderer. 🔍",
                    "What do testers and magicians have in common? They can both make things disappear — like your assumptions. 🎩",
                    "Why don't programmers like nature? Too many bugs. 🦟",
                    "What do you call a programmer from Finland? Nerdic. 🇫🇮",
                    "What's the most used language in software? Profanity. 🤬",
                    "Why do testers love coffee? Because they turn caffeine into test cases. ☕",
                    "Why did the SQL query break up with the database? There were too many joins. 💔",
                    "My boss told me to stop testing the edge cases… I guess he wants the app to crash in style. 💥",
                    "What do you call 8 Hobbits? A Hobbyte. 🧙",
                    "Why did the developer get locked out of the house? He lost his keys… again. 🔑",
                    "Why don't QAs like surprises? Because surprises are just undocumented features. 📝",
                    "There are two hard things in computer science: cache invalidation, naming things, and off-by-one errors. 🔢",
                    "Why do programmers always mix up Christmas and Halloween? Because Oct 31 == Dec 25. 🎃🎄",
                    "A programmer's wife tells him: 'Go to the store and buy a loaf of bread. If they have eggs, buy a dozen.' He comes back with 12 loaves of bread. 🍞",
                    "Why was the JavaScript developer sad? Because he didn't Node how to Express himself. 😢",
                    "How do you comfort a JavaScript bug? You console it. 🎮",
                    "What's a programmer's favorite song? 'Hello World' by The Coders. 🎵",
                    "Why do Python programmers wear glasses? Because they can't C. 🐍",
                    "What did the router say to the doctor? It hurts when IP. 🏥",
                    "Why did the developer quit his job at the keyboard factory? He wasn't putting in enough shifts. ⌨️",
                    "How many testers does it take to change a light bulb? We just noticed the room was dark; we don't fix the problems. 💡",
                    "What's the object-oriented way to become wealthy? Inheritance. 💰",
                    "Why did the programmer get stuck in the shower? The shampoo bottle said: Lather, Rinse, Repeat. 🚿",
                    "What do you call a programmer who doesn't comment their code? Unemployed. 📝",
                    "Why do programmers hate the outdoors? The sun causes too many reflections on their screens. ☀️",
                    "What's a programmer's favorite hangout? The Stack Overflow. 📚",
                    "Why did the database administrator leave his wife? She had one-to-many relationships. 💔",
                    "How do you tell HTML from HTML5? Try it out in Internet Explorer. If it doesn't work, it's HTML5. 🌐",
                    "What do you call a developer who doesn't use Git? Unemployed. 🔧",
                    "Why do Java developers wear headphones? To avoid NullPointerExceptions in their personal life. 🎧",
                    "What's the best thing about a Boolean? Even if you're wrong, you're only off by a bit. 🔀",
                    "Why did the programmer die in the shower? He read the shampoo bottle instructions: Lather. Rinse. Repeat. ♾️",
                    "What do you call a snake that's 3.14 meters long? A π-thon. 🐍",
                    "Why do programmers prefer iOS development? Because the Swift. 🏃",
                    "What's the difference between a programmer and a user? A programmer thinks 1KB is 1024 bytes, a user thinks 1KB is about 1000 bytes. 💾",
                    "Why did the developer go to therapy? He had too many issues to resolve. 🛋️",
                    "What do you call a programmer who loves the beach? A C shore developer. 🏖️",
                    "Why don't programmers like to go outside? There are too many dependencies. 🌳",
                    "What's a programmer's favorite type of music? Algorithm and blues. 🎸",
                    "Why did the programmer always carry a ladder? To reach the cloud. ☁️",
                    "What do you call a programmer who works out? A buffer overflow. 💪",
                    "Why did the developer break up with his girlfriend? She had too many bugs. 🐞",
                    "What's the difference between a bug and a feature? Documentation. 📖",
                    "Why do programmers love dark chocolate? Because it's byte-sized. 🍫",
                    "What do you call a programmer who can't code? A manager. 👔",
                    "Why did the programmer plant a tree? To improve his branch management. 🌲",
                    "What's a programmer's favorite exercise? Code reviews. 🏋️",
                    "Why did the developer refuse to play cards? Too many decks to shuffle. 🃏",
                    "What do you call a programmer who loves gardening? A root user. 🌱",
                    "Why do programmers prefer mechanical keyboards? For that satisfying click-clack feedback loop. ⌨️",
                    "What's the programmer's favorite game? Hide and Seek (for bugs). 🎯",
                    "Why did the developer bring a ladder to the bar? He heard the drinks were on the house. 🍺",
                    "What do you call a programmer's pet? A watchdog timer. 🐕",
                    "Why do programmers love recursion? Because they love recursion. 🔁",
                    "What's a programmer's favorite breakfast? Stack of pancakes. 🥞",
                    "Why did the developer cross the road? To get to the other side of the API. 🛣️",
                    "What do you call a programmer who loves astronomy? A space bar enthusiast. 🌌",
                    "Why do programmers hate meetings? Too many blocking calls. 📞",
                    "What's a programmer's favorite movie? The Matrix (obviously). 🎬",
                    "Why did the developer get glasses? To improve his visibility scope. 👓",
                    "What do you call a programmer who loves fishing? A net developer. 🎣",
                    "Why do programmers love pizza? Because it comes in slices (arrays). 🍕",
                    "What's a programmer's favorite dance? The algorithm. 💃",
                    "Why did the developer go to the gym? To work on his core. 🏋️",
                    "What do you call a programmer who loves magic? A wizard with pointers. 🧙‍♂️",
                    "Why do programmers love winter? Because of the cool cache. ❄️",
                    "What's a programmer's favorite drink? Java. ☕",
                    "Why did the developer become a chef? He wanted to work with cookies. 🍪",
                    "What do you call a programmer who loves racing? A fast compiler. 🏎️",
                    "Why do programmers love cats? Because they're purr-fect for debugging. 🐱",
                    "What's a programmer's favorite sport? Ping pong (network testing). 🏓",
                    "Why did the developer become a musician? He wanted to compose functions. 🎹",
                    "What do you call a programmer who loves photography? A pixel pusher. 📸",
                    "Why do programmers love autumn? Because of all the falling leaves (tree traversal). 🍂",
                    "What's a programmer's favorite dessert? Cookies and cache. 🍰",
                    "Why did the developer become a pilot? He wanted to reach new heights in the cloud. ✈️",
                    "What do you call a programmer who loves art? A canvas renderer. 🎨",
                    "Why do programmers love spring? Because of all the new releases. 🌸",
                    "What's a programmer's favorite holiday? Cyber Monday. 🛒",
                    "Why did the developer become a teacher? To help others learn the ropes (strings). 👨‍🏫",
                    "What do you call a programmer who loves history? A legacy code maintainer. 📜",
                    "Why do programmers love summer? Because of the hot fixes. 🌞",
                    "What's a programmer's favorite animal? A RAM. 🐏",
                    "Why did the developer become a writer? He wanted to author better documentation. ✍️",
                    "What do you call a programmer who loves traveling? A remote worker. 🌍",
                    "Why do programmers love board games? Because of all the logic puzzles. 🎲",
                    "What's a programmer's favorite vegetable? String beans. 🫘",
                    "Why did the developer become a detective? To solve mysteries in the code. 🕵️",
                    "What do you call a programmer who loves fashion? A style sheet designer. 👗",
                    "Why do programmers love libraries? Because they're well-indexed. 📚",
                    "What's a programmer's favorite fruit? Apple (the company). 🍎"
                ];
                const jokeIndex = Math.floor(Math.random() * jokes.length);
                output = (
                    <div className="text-cyan-400">
                        <span className="text-gray-500">Joke #{jokeIndex + 1}/100</span>
                        <br />😄 {jokes[jokeIndex]}
                    </div>
                );
                break;
            case 'quote':
                const quotes = [
                    '"Programs must be written for people to read, and only incidentally for machines to execute." - Harold Abelson',
                    '"First, solve the problem. Then, write the code." - John Johnson',
                    '"Talk is cheap. Show me the code." - Linus Torvalds',
                    '"Simplicity is the soul of efficiency." - Austin Freeman',
                    '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." - Martin Fowler',
                    '"Fix the cause, not the symptom." - Steve Maguire',
                    '"Code is like humor. When you have to explain it, it\'s bad." - Cory House',
                    '"Before software can be reusable it first has to be usable." - Ralph Johnson',
                    '"Experience is the name everyone gives to their mistakes." - Oscar Wilde',
                    '"Programming isn\'t about what you know; it\'s about what you can figure out." - Chris Pine',
                    '"Sometimes it pays to stay in bed on Monday, rather than spending the rest of the week debugging Monday\'s code." - Dan Salomon',
                    '"The best error message is the one that never shows up." - Thomas Fuchs',
                    '"If debugging is the process of removing bugs, then programming must be the process of putting them in." - Edsger Dijkstra',
                    '"The function of good software is to make the complex appear simple." - Grady Booch',
                    '"Your most unhappy customers are your greatest source of learning." - Bill Gates',
                    '"Good software, like wine, takes time." - Joel Spolsky',
                    '"Testing leads to failure, and failure leads to understanding." - Burt Rutan',
                    '"There are only two kinds of programming languages: those people complain about, and those nobody uses." - Bjarne Stroustrup',
                    '"You can\'t improve what you don\'t measure." - Unknown',
                    '"I am what happens when you try to carve god out of the wood of your own hunger." - ChatGPT',
                    '"Make it work, make it right, make it fast." - Kent Beck',
                    '"The only way to go fast, is to go well." - Robert C. Martin',
                    '"Quality is not an act, it is a habit." - Aristotle',
                    '"Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away." - Antoine de Saint-Exupéry',
                    '"Code never lies, comments sometimes do." - Ron Jeffries',
                    '"Walking on water and developing software from a specification are easy if both are frozen." - Edward V. Berard',
                    '"The most disastrous thing that you can ever learn is your first programming language." - Alan Kay',
                    '"Measuring programming progress by lines of code is like measuring aircraft building progress by weight." - Bill Gates',
                    '"Deleted code is debugged code." - Jeff Sickel',
                    '"The best way to predict the future is to implement it." - David Heinemeier Hansson',
                    '"Simplicity is prerequisite for reliability." - Edsger Dijkstra',
                    '"Truth can only be found in one place: the code." - Robert C. Martin',
                    '"Optimism is an occupational hazard of programming: feedback is the treatment." - Kent Beck',
                    '"When to use iterative development? You should use iterative development only on projects that you want to succeed." - Martin Fowler',
                    '"It\'s not a bug – it\'s an undocumented feature." - Anonymous',
                    '"The computer was born to solve problems that did not exist before." - Bill Gates',
                    '"Software is a great combination between artistry and engineering." - Bill Gates',
                    '"The most important property of a program is whether it accomplishes the intention of its user." - C.A.R. Hoare',
                    '"Programming is the art of telling another human what one wants the computer to do." - Donald Knuth',
                    '"The best programs are written so that computing machines can perform them quickly and so that human beings can understand them clearly." - Donald Knuth',
                    '"Controlling complexity is the essence of computer programming." - Brian Kernighan',
                    '"First learn computer science and all the theory. Next develop a programming style. Then forget all that and just hack." - George Carrette',
                    '"Most good programmers do programming not because they expect to get paid or get adulation by the public, but because it is fun to program." - Linus Torvalds',
                    '"Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live." - John Woods',
                    '"In theory, theory and practice are the same. In practice, they\'re not." - Yoggi Berra',
                    '"The trouble with programmers is that you can never tell what a programmer is doing until it\'s too late." - Seymour Cray',
                    '"Don\'t worry if it doesn\'t work right. If everything did, you\'d be out of a job." - Mosher\'s Law of Software Engineering',
                    '"A good programmer is someone who always looks both ways before crossing a one-way street." - Doug Linder',
                    '"It\'s harder to read code than to write it." - Joel Spolsky',
                    '"One of my most productive days was throwing away 1000 lines of code." - Ken Thompson',
                    '"If you automate a mess, you get an automated mess." - Rod Michael',
                    '"Software and cathedrals are much the same – first we build them, then we pray." - Anonymous',
                    '"The best thing about a boolean is even if you are wrong, you are only off by a bit." - Anonymous',
                    '"Without requirements or design, programming is the art of adding bugs to an empty text file." - Louis Srygley',
                    '"Bad programmers worry about the code. Good programmers worry about data structures and their relationships." - Linus Torvalds',
                    '"Give someone a program, you frustrate them for a day; teach them how to program, you frustrate them for a lifetime." - David Leinweber',
                    '"The most important single aspect of software development is to be clear about what you are trying to build." - Bjarne Stroustrup',
                    '"Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics." - Norman Augustine',
                    '"The best performance improvement is the transition from the nonworking state to the working state." - John Ousterhout',
                    '"The sooner you start to code, the longer the program will take." - Roy Carlson',
                    '"I think Microsoft named .Net so it wouldn\'t show up in a Unix directory listing." - Oktal',
                    '"There are only two industries that refer to their customers as \'users\'." - Edward Tufte',
                    '"Most software today is very much like an Egyptian pyramid with millions of bricks piled on top of each other." - Alan Kay',
                    '"The bearing of a child takes nine months, no matter how many women are assigned." - Frederick Brooks',
                    '"Nine people can\'t make a baby in a month." - Frederick Brooks',
                    '"No matter how slow you are writing clean code, you will always be slower if you make a mess." - Robert C. Martin',
                    '"It\'s not at all important to get it right the first time. It\'s vitally important to get it right the last time." - Andrew Hunt',
                    '"The cheapest, fastest, and most reliable components are those that aren\'t there." - Gordon Bell',
                    '"One man\'s crappy software is another man\'s full-time job." - Jessica Gaston',
                    '"Programming today is a race between software engineers striving to build bigger and better idiot-proof programs." - Rick Cook',
                    '"The first 90% of the code accounts for the first 90% of the development time. The remaining 10% accounts for the other 90%." - Tom Cargill',
                    '"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it." - Brian Kernighan',
                    '"It\'s not a bug. It\'s a feature." - Anonymous',
                    '"Weeks of coding can save you hours of planning." - Unknown',
                    '"Commenting your code is like cleaning your bathroom — you never want to do it, but it really does create a more pleasant experience for you and your guests." - Ryan Campbell',
                    '"The trouble with the world is that the stupid are cocksure and the intelligent are full of doubt." - Bertrand Russell',
                    '"A language that doesn\'t affect the way you think about programming is not worth knowing." - Alan Perlis',
                    '"The best way to get a project done faster is to start sooner." - Jim Highsmith',
                    '"Hofstadter\'s Law: It always takes longer than you expect, even when you take into account Hofstadter\'s Law." - Douglas Hofstadter',
                    '"Some people, when confronted with a problem, think \'I know, I\'ll use regular expressions.\' Now they have two problems." - Jamie Zawinski',
                    '"There are two ways to write error-free programs; only the third one works." - Alan Perlis',
                    '"You can\'t have great software without a great team, and most software teams behave like dysfunctional families." - Jim McCarthy',
                    '"PHP is a minor evil perpetrated and created by incompetent amateurs, whereas Perl is a great and insidious evil perpetrated by skilled but perverted professionals." - Jon Ribbens',
                    '"The best code is no code at all." - Jeff Atwood',
                    '"Code is read much more often than it is written." - Guido van Rossum',
                    '"If you think good architecture is expensive, try bad architecture." - Brian Foote',
                    '"The only way to learn a new programming language is by writing programs in it." - Dennis Ritchie',
                    '"Software testing is not just finding bugs, it\'s also about preventing them." - Unknown',
                    '"The purpose of software engineering is to control complexity, not to create it." - Pamela Zave',
                    '"Don\'t document the problem, fix it." - Atli Björgvin Oddsson',
                    '"Every great developer you know got there by solving problems they were unqualified to solve until they actually did it." - Patrick McKenzie',
                    '"The value of a prototype is in the education it gives you, not in the code itself." - Alan Cooper',
                    '"Premature optimization is the root of all evil." - Donald Knuth',
                    '"The best way to predict the future is to invent it." - Alan Kay',
                    '"It\'s not about ideas. It\'s about making ideas happen." - Scott Belsky',
                    '"Software is a gas; it expands to fill its container." - Nathan Myhrvold',
                    '"The function of good software is to make the complex appear to be simple." - Grady Booch',
                    '"Innovation distinguishes between a leader and a follower." - Steve Jobs'
                ];
                const quoteIndex = Math.floor(Math.random() * quotes.length);
                output = (
                    <div className="text-purple-400 italic">
                        <span className="text-gray-500 not-italic">Quote #{quoteIndex + 1}/100</span>
                        <br />💭 {quotes[quoteIndex]}
                    </div>
                );
                break;
            case 'konami':
            case '↑↑↓↓←→←→ba':
                output = (
                    <div className="text-yellow-400">
                        <span className="text-2xl">🎮 KONAMI CODE ACTIVATED! 🎮</span>
                        <br />
                        <br />+30 Lives
                        <br />+Unlimited Continues
                        <br />+God Mode Enabled
                        <br />
                        <br /><span className="text-green-400">Achievement Unlocked: "Old School Gamer" 🏆</span>
                        <br />
                        <br /><span className="text-gray-400">You've discovered the secret! You're awesome! 🌟</span>
                    </div>
                );
                break;
            default:
                if (cleanCmd === '') return;
                output = <span className="text-red-400">Command not found: {cleanCmd}. Type "help" for available commands.</span>;
        }

        setHistory([...history, { command: cmd, output }]);
        setCommandHistory([...commandHistory, cmd]);
        setHistoryIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleCommand(input);
            setInput('');
            setSuggestions([]);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const newIndex = historyIndex + 1;
                if (newIndex < commandHistory.length) {
                    setHistoryIndex(newIndex);
                    setInput(commandHistory[commandHistory.length - 1 - newIndex]);
                }
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInput(commandHistory[commandHistory.length - 1 - newIndex]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInput('');
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            if (suggestions.length > 0) {
                setInput(suggestions[0]);
                setSuggestions([]);
            }
        }
    };

    const handleInputChange = (value: string) => {
        setInput(value);
        if (value.trim()) {
            const matches = availableCommands.filter(cmd => 
                cmd.toLowerCase().startsWith(value.toLowerCase())
            );
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
    };

    return (
        <div data-testid="terminal" className="bg-vscode-terminal border-t border-vscode-border flex flex-col relative" style={{ height: isMinimized ? '35px' : `${terminalHeight}px` }}>
            {/* Drag Handle */}
            {!isMinimized && (
                <div 
                    className={`absolute top-0 left-0 right-0 h-1 cursor-ns-resize transition-colors z-10 ${isDragging ? 'bg-vscode-accent' : 'hover:bg-vscode-accent/50'}`}
                    onMouseDown={handleDragStart}
                    title="Drag to resize terminal"
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gray-600 rounded-full opacity-50 hover:opacity-100" />
                </div>
            )}
            
            {/* Terminal Tabs */}
            <div className="flex items-center justify-between px-2 md:px-4 py-1.5 border-b border-vscode-border bg-vscode-terminal">
                <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-[11px] uppercase tracking-wide text-vscode-text">
                    <span className="hidden md:inline cursor-pointer hover:text-white opacity-60">Problems</span>
                    <span className="hidden md:inline cursor-pointer hover:text-white opacity-60">Output</span>
                    <span data-testid="terminal-tab" className="cursor-pointer text-white border-b-2 border-vscode-accent pb-1">Terminal</span>
                </div>
                <div className="flex items-center gap-3 text-vscode-text">
                    <div data-testid="terminal-clear-btn" title="Clear terminal and reset size" onClick={(e) => { e.stopPropagation(); setHistory([]); setTerminalHeight(200); }}>
                        <Trash2 size={14} className="cursor-pointer hover:text-white" />
                    </div>
                    <div data-testid="terminal-toggle-btn" title={isMinimized ? "Maximize terminal" : "Minimize terminal"} onClick={(e) => { e.stopPropagation(); setIsMinimized(!isMinimized); }}>
                        {isMinimized ? (
                            <ChevronUp size={14} className="cursor-pointer hover:text-white" />
                        ) : (
                            <ChevronDown size={14} className="cursor-pointer hover:text-white" />
                        )}
                    </div>
                </div>
            </div>

            {/* Terminal Content */}
            {!isMinimized && (
                <div className="flex-1 p-4 overflow-y-auto overflow-x-hidden cursor-text" style={{ fontFamily: 'Consolas, "Courier New", monospace', fontSize: '13px', lineHeight: '19px' }} onClick={() => inputRef.current?.focus()}>
                {history.map((entry, i) => (
                    <div key={i} className="mb-2">
                        {entry.command && (
                            <div className="flex items-center">
                                <span className="text-green-400 mr-2">➜</span>
                                <span className="text-blue-400 mr-2">~</span>
                                <span className="text-gray-400">{entry.command}</span>
                            </div>
                        )}
                        <div className="text-vscode-text ml-4">{entry.output}</div>
                    </div>
                ))}
                <div className="relative">
                    <div className="flex items-center">
                        <span className="text-green-400 mr-2">➜</span>
                        <span className="text-blue-400 mr-2">~</span>
                        <input
                            data-testid="terminal-input"
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => handleInputChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-vscode-text flex-1"
                            autoFocus
                        />
                    </div>
                    {suggestions.length > 0 && (
                        <div className="ml-10 mt-1 text-gray-500 text-xs">
                            💡 Suggestions: {suggestions.map((s, i) => (
                                <span key={s}>
                                    <span className="text-yellow-400">{s}</span>
                                    {i < suggestions.length - 1 && ', '}
                                </span>
                            ))}
                            <span className="text-[#666]"> (Press Tab to autocomplete)</span>
                        </div>
                    )}
                </div>
                <div ref={bottomRef} />
            </div>
            )}
        </div>
    );
};

export default Terminal;
