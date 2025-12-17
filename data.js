const questions = [
    {
        n: 1,
        q: "I _______ update the software on my computer.",
        a: ["always", "seldom", "rarely", "sometimes"],
        correct: 0
    },
    {
        n: 2,
        q: "How often do you check your email?",
        a: ["Every day", "Yesterday", "Later", "Rarely"],
        correct: 0
    },
    {
        n: 3,
        q: "The system administrator _____ runs a security scan.",
        a: ["occasionally", "usually", "never", "frequently"],
        correct: 1
    },
    {
        n: 4,
        q: "She _____ backs up her files, so she never loses data.",
        a: ["frequently", "often", "occasionally", "always"],
        correct: 3
    },
    {
        n: 5,
        q: "Our team _____ meets on Mondays to discuss progress.",
        a: ["seldom", "always", "rarely", "never"],
        correct: 1
    },
    {
        n: 6,
        q: "The server was updated often ___.",
        a: ["today", "frequently", "tomorrow", "soon"],
        correct: 0
    },
    {
        n: 7,
        q: "We have a meeting __.",
        a: ["yesterday", "next week", "seldom", "frequently"],
        correct: 1
    },
    {
        n: 8,
        q: "He submitted the report __.",
        a: ["now", "last night", "often", "frequently"],
        correct: 1
    },
    {
        n: 9,
        q: "The backup is scheduled for __.",
        a: ["before", "every Friday", "quickly", "soon"],
        correct: 1
    },
    {
        n: 10,
        q: "I will finish this task __.",
        a: ["today", "soon", "yesterday", "rarely"],
        correct: 1
    },
    {
        n: 11,
        q: "You ____ install an antivirus on your computer.",
        a: ["must", "can't", "shouldn't", "don't"],
        correct: 0
    },
    {
        n: 12,
        q: "Which is correct?",
        a: ["You mustn't share your password.", "You must share your password.", "You have to share your password.", "You shouldn't share your password."],
        correct: 0
    },
    {
        n: 13,
        q: "We __ use strong passwords.",
        a: ["can't", "have to", "shouldn't", "mustn't"],
        correct: 1
    },
    {
        n: 14,
        q: "You __ download files from untrusted websites.",
        a: ["should", "shouldn't", "can't", "must"],
        correct: 1
    },
    {
        n: 15,
        q: "You __ log in to the network without proper authorization.",
        a: ["can't", "should", "must", "have to"],
        correct: 0
    },
    {
        n: 16,
        q: "Employees _____ report any security breaches immediately.",
        a: ["have to", "should", "must", "all of the above"],
        correct: 3
    },
    {
        n: 17,
        q: "Which sentence is correct?",
        a: ["You shouldn't leave your computer unlocked.", "You should leave your computer unlocked.", "You must leave your computer unlocked.", "You have to leave your computer unlocked."],
        correct: 0
    },
    {
        n: 18,
        q: "What should you do before leaving your desk?",
        a: ["Lock your computer", "Turn off the lights", "Unplug the monitor", "Shut down the printer"],
        correct: 0
    },
    {
        n: 19,
        q: "You ___ use company resources for personal gain.",
        a: ["can", "shouldn't", "must", "can't"],
        correct: 3
    },
    {
        n: 20,
        q: "Which rule applies to internet usage?",
        a: ["Browse freely without restrictions", "Use only for work-related tasks", "Stream videos during breaks", "Download any software"],
        correct: 1
    },
    {
        n: 21,
        q: "__ we review the code together?",
        a: ["Shall", "Must", "Shouldn't", "Couldn't"],
        correct: 0
    },
    {
        n: 22,
        q: "__ installing a firewall?",
        a: ["How about", "Must", "Should", "Won't"],
        correct: 0
    },
    {
        n: 23,
        q: "\"The server is slow.\" \"Maybe __ restart it.\"",
        a: ["we shouldn't", "we should", "we mustn't", "we can't"],
        correct: 1
    },
    {
        n: 24,
        q: "\"The network is down.\" \"I think we __ contact IT support.\"",
        a: ["could", "can't", "shouldn't", "mustn't"],
        correct: 0
    },
    {
        n: 25,
        q: "\"Let's implement a backup system.\" \"I agree.\" True/False?",
        a: ["True", "False"],
        correct: 0
    },
    {
        n: 26,
        q: "The developer sent __ the project files.",
        a: ["me", "to me", "for me", "at me"],
        correct: 0
    },
    {
        n: 27,
        q: "She gave the team __.",
        a: ["a deadline", "to a deadline", "at a deadline", "with a deadline"],
        correct: 0
    },
    {
        n: 28,
        q: "They offered __ help with the database.",
        a: ["us", "for us", "to us", "at us"],
        correct: 0
    },
    {
        n: 29,
        q: "He installed the new software ______ improve performance.",
        a: ["because", "so that", "to", "for"],
        correct: 2
    },
    {
        n: 30,
        q: "We use firewalls ____ protect the network from threats.",
        a: ["for", "so that", "to", "because"],
        correct: 2
    },
    {
        n: 31,
        q: "_____ did you reset the server?",
        a: ["How", "Why", "Because", "What"],
        correct: 1
    },
    {
        n: 32,
        q: "The company implemented a strict security policy __ employees understand the importance of data protection.",
        a: ["so that", "for", "to", "because"],
        correct: 0
    },
    {
        n: 33,
        q: "He upgraded the system __ it would run faster.",
        a: ["to", "because", "for", "so that"],
        correct: 3
    },
    {
        n: 34,
        q: "Which browser is commonly used in professional environments?",
        a: ["Chrome", "Word", "Outlook", "Excel"],
        correct: 0
    },
    {
        n: 35,
        q: "What does a URL identify?",
        a: ["A website address", "A software update", "A server error", "An antivirus program"],
        correct: 0
    },
    {
        n: 36,
        q: "Which protocol is used to secure websites?",
        a: ["HTTP", "HTTPS", "FTP", "SMTP"],
        correct: 1
    },
    {
        n: 37,
        q: "What should you avoid clicking while browsing?",
        a: ["Trusted links", "Suspicious ads", "Search results", "Bookmarks"],
        correct: 1
    },
    {
        n: 38,
        q: "Cookies are used to __.",
        a: ["store user data", "delete history", "run antivirus checks", "install software"],
        correct: 0
    },
    {
        n: 39,
        q: "The IT team __ the system daily.",
        a: ["checks", "checking", "checked", "is checking"],
        correct: 0
    },
    {
        n: 40,
        q: "Which sentence is correct?",
        a: ["He update the software.", "He updates the software.", "He updating the software.", "He updated the software."],
        correct: 1
    },
    {
        n: 41,
        q: "They _____ regular backups.",
        a: ["perform", "performing", "performs", "performed"],
        correct: 0
    },
    {
        n: 42,
        q: "She___ emails at the start of each day.",
        a: ["read", "reads", "reading", "to read"],
        correct: 1
    },
    {
        n: 43,
        q: "The system____ an automatic scan every night.",
        a: ["run", "runs", "running", "ran"],
        correct: 1
    },
    {
        n: 44,
        q: "The developers_____ the new features right now.",
        a: ["are testing", "tests", "tested", "test"],
        correct: 0
    },
    {
        n: 45,
        q: "Which sentence is correct?",
        a: ["He is update the system.", "He is updating the system.", "He updating the system.", "He updates the system."],
        correct: 1
    },
    {
        n: 46,
        q: "We____ on a new project this week.",
        a: ["are working", "work", "worked", "works"],
        correct: 0
    },
    {
        n: 47,
        q: "The server _____ right now.",
        a: ["is rebooting", "reboots", "rebooted", "reboot"],
        correct: 0
    },
    {
        n: 48,
        q: "The IT team ______the network for issues.",
        a: ["is monitoring", "monitors", "monitored", "monitor"],
        correct: 0
    },
    {
        n: 49,
        q: "Which sentence is correct?",
        a: ["I am knowing the answer.", "I know the answer.", "I knowing the answer.", "I knows the answer."],
        correct: 1
    },
    {
        n: 50,
        q: "He __ the problem with the server.",
        a: ["understands", "is understanding", "understand", "to understand"],
        correct: 0
    }
];

const shortQuestions = [];
