const questions = [
    {
        n: 1,
        q: "What is a network?",
        a: ["A single computer with internet access", "Two or more connected computers that can share resources", "A collection of software programs", "A type of operating system"],
        correct: 1
    },
    {
        n: 2,
        q: "Which device connects all segments of a network together in a star topology?",
        a: ["Router", "Switch", "Hub", "Bridge"],
        correct: 2
    },
    {
        n: 3,
        q: "What type of server handles email functions?",
        a: ["File server", "Mail server", "Print server", "Web server"],
        correct: 1
    },
    {
        n: 4,
        q: "Which server type manages web-based activities by running HTTP?",
        a: ["Fax server", "Application server", "Web server", "Telephony server"],
        correct: 2
    },
    {
        n: 5,
        q: "What does VLAN stand for?",
        a: ["Virtual Local Area Network", "Very Large Area Network", "Variable Length Area Network", "Virtual Linear Access Network"],
        correct: 0
    },
    {
        n: 6,
        q: "What is the main advantage of VLANs?",
        a: ["They require more cables", "They allow you to be anywhere on the physical network and still be local to specific network resources", "They are slower than regular LANs", "They only work with wireless connections"],
        correct: 1
    },
    {
        n: 7,
        q: "Which type of network spans larger geographic areas?",
        a: ["LAN", "WAN", "VLAN", "PAN"],
        correct: 1
    },
    {
        n: 8,
        q: "What does WAN stand for?",
        a: ["Wide Area Network", "Wireless Access Network", "World Area Network", "Web Access Network"],
        correct: 0
    },
    {
        n: 9,
        q: "What is a key characteristic of WANs compared to LANs?",
        a: ["They are usually faster", "They span larger geographic areas", "They are always wireless", "They don't need routers"],
        correct: 1
    },
    {
        n: 10,
        q: "What does VPN stand for?",
        a: ["Virtual Private Network", "Very Private Network", "Variable Protocol Network", "Virtual Public Network"],
        correct: 0
    },
    {
        n: 11,
        q: "What is the main benefit of using a VPN?",
        a: ["Faster internet speed", "Security for remote connections", "Cheaper internet access", "More storage space"],
        correct: 1
    },
    {
        n: 12,
        q: "In peer-to-peer networks, what role do computers play?",
        a: ["Only client machines", "Only server machines", "Both client and server machines", "Neither client nor server"],
        correct: 2
    },
    {
        n: 13,
        q: "What is a major disadvantage of peer-to-peer networks?",
        a: ["They are too expensive", "Security is not centrally governed", "They are too fast", "They require too many cables"],
        correct: 1
    },
    {
        n: 14,
        q: "In client/server networks, where are usernames and passwords stored?",
        a: ["On each individual computer", "On the main server", "In the cloud only", "On external drives"],
        correct: 1
    },
    {
        n: 15,
        q: "What is the main advantage of client/server networks over peer-to-peer?",
        a: ["They are cheaper to implement", "They provide better organization and security", "They require no maintenance", "They work without electricity"],
        correct: 1
    },
    {
        n: 16,
        q: "In a star topology, where do all devices connect?",
        a: ["To each other directly", "To a central point", "In a line", "In a circle"],
        correct: 1
    },
    {
        n: 17,
        q: "What happens if the central device fails in a star topology?",
        a: ["Only one computer stops working", "The whole network goes down", "Nothing happens", "The network becomes faster"],
        correct: 1
    },
    {
        n: 18,
        q: "What is an advantage of star topology over bus topology?",
        a: ["Uses less cable", "Easier to troubleshoot", "Faster data transmission", "No central point of failure"],
        correct: 1
    },
    {
        n: 19,
        q: "In mesh topology, how are devices connected?",
        a: ["All devices connect to a central hub", "Devices connect in a line", "There's a path from every device to every other device", "Devices connect in pairs only"],
        correct: 2
    },
    {
        n: 20,
        q: "What is the formula for calculating connections in a full mesh network?",
        a: ["n×2", "n(n-1)/2", "n²", "n+1"],
        correct: 1
    },
    {
        n: 21,
        q: "How many connections would a full mesh network with 6 devices have?",
        a: ["12", "15", "18", "21"],
        correct: 1
    },
    {
        n: 22,
        q: "What is the main advantage of mesh topology?",
        a: ["Lowest cost", "Easiest to install", "High fault tolerance", "Fastest speed"],
        correct: 2
    },
    {
        n: 23,
        q: "In point-to-point topology, how many devices are directly connected?",
        a: ["One", "Two", "Three", "Many"],
        correct: 1
    },
    {
        n: 24,
        q: "What type of cable has four twisted wire pairs?",
        a: ["Category 3", "Category 5e", "Coaxial", "All of the above"],
        correct: 1
    },
    {
        n: 25,
        q: "What is the maximum frequency rating for Cat 5e cable?",
        a: ["50MHz", "100MHz", "250MHz", "350MHz"],
        correct: 1
    },
    {
        n: 26,
        q: "Which category of UTP cable is rated for 250MHz?",
        a: ["Cat 5", "Cat 5e", "Cat 6", "Cat 3"],
        correct: 2
    },
    {
        n: 27,
        q: "What does the 'T' in 100Base-T stand for?",
        a: ["Telephone", "Twisted-pair", "Terminal", "Transmission"],
        correct: 1
    },
    {
        n: 28,
        q: "Why are wires twisted in twisted-pair cables?",
        a: ["To make them stronger", "To minimize interference and crosstalk", "To make them cheaper", "To increase speed"],
        correct: 1
    },
    {
        n: 29,
        q: "What is the maximum segment length for twisted-pair cable?",
        a: ["100 meters", "200 meters", "328 feet", "Both a and c"],
        correct: 3
    },
    {
        n: 30,
        q: "What type of light source is used with single-mode fiber?",
        a: ["LEDs only", "Lasers only", "Both LEDs and lasers", "Neither LEDs nor lasers"],
        correct: 2
    },
    {
        n: 31,
        q: "Which fiber type can transmit data further distances?",
        a: ["Single-mode fiber", "Multimode fiber", "Both are equal", "Neither can transmit far"],
        correct: 0
    },
    {
        n: 32,
        q: "What is the core material in fiber-optic cables?",
        a: ["Copper", "Aluminum", "Glass or plastic", "Steel"],
        correct: 2
    },
    {
        n: 33,
        q: "What is a major advantage of fiber-optic cables?",
        a: ["They are cheaper than copper", "They are immune to EMI and RFI", "They are easier to install", "They require no special equipment"],
        correct: 1
    },
    {
        n: 34,
        q: "What does SMF stand for in fiber optics?",
        a: ["Small Mode Fiber", "Single-Mode Fiber", "Special Multi Fiber", "Standard Mode Fiber"],
        correct: 1
    },
    {
        n: 35,
        q: "What does MMF stand for in fiber optics?",
        a: ["Multiple Mode Fiber", "Multimode Fiber", "Many Mode Fiber", "Mixed Mode Fiber"],
        correct: 1
    },
    {
        n: 36,
        q: "Which fiber connector uses a BNC-like attachment mechanism?",
        a: ["SC connector", "LC connector", "ST connector", "MT-RJ connector"],
        correct: 2
    },
    {
        n: 37,
        q: "What does SFF stand for in fiber connectors?",
        a: ["Single Fiber Format", "Small Form Factor", "Special Fiber Function", "Standard Form Factor"],
        correct: 1
    },
    {
        n: 38,
        q: "Which is a small form factor fiber connector?",
        a: ["ST", "SC", "LC", "BNC"],
        correct: 2
    },
    {
        n: 39,
        q: "What advantage do SFF connectors offer?",
        a: ["Lower cost", "Higher speed", "More terminations in the same space", "Easier installation"],
        correct: 2
    },
    {
        n: 40,
        q: "Which fiber connector is becoming more popular for Gigabit Ethernet?",
        a: ["ST", "SC", "LC", "MT-RJ"],
        correct: 2
    }
];

const shortQuestions = [
    {
        n: 1,
        q: "Explain the difference between a hub and a switch in terms of how they handle data transmission.",
        a: "• Hub: Broadcasts data to ALL ports (Single Collision Domain).\n• Switch: Sends data ONLY to destination port (Separate Collision Domains)."
    },
    {
        n: 2,
        q: "Describe three advantages and three disadvantages of star topology.",
        a: "Advantages:\n1. Easy to add/remove devices.\n2. One cable failure doesn't kill network.\n3. Easy to troubleshoot.\n\nDisadvantages:\n1. Higher cable cost.\n2. Single point of failure (Hub/Switch).\n3. More expensive hardware."
    },
    {
        n: 3,
        q: "What is the difference between single-mode and multimode fiber optic cables?",
        a: "• Single-Mode (SMF): Laser light, 1 path, Long distance (40km+), Higher bandwidth.\n• Multi-Mode (MMF): LED light, Multiple paths, Short distance (3000ft), Cheaper."
    },
    {
        n: 4,
        q: "Explain what VLANs are and why they are useful in modern networks.",
        a: "• Definition: Logical grouping of devices regardless of physical location.\n• Benefits: Better security, reduced broadcast traffic, flexible administration."
    },
    {
        n: 5,
        q: "Compare and contrast peer-to-peer and client/server network architectures.",
        a: "• Peer-to-Peer: Decentralized, no dedicated server, cheap, hard to backup/secure.\n• Client/Server: Centralized control, dedicated server, scalable, secure, expensive."
    },
    {
        n: 6,
        q: "What are the main differences between LANs and WANs?",
        a: "• LAN: Small area (building), Private ownership, High speed, Low cost.\n• WAN: Large area (connects cities/countries), Leased/Public lines, Slower, High cost."
    },
    {
        n: 7,
        q: "Describe the purpose and benefits of using VPNs.",
        a: "• Purpose: Secure, encrypted tunnel over a public network (Internet).\n• Benefits: Remote access security, cost savings vs leased lines, privacy."
    },
    {
        n: 8,
        q: "Explain why twisted-pair cables have their wires twisted and what problems this solves.",
        a: "• Problem: Electromagnetic Interference (EMI) and Crosstalk.\n• Solution: Twisting cancels out magnetic fields, preserving signal integrity."
    },
    {
        n: 9,
        q: "What factors should be considered when choosing between copper and fiber optic cables?",
        a: "• Distance: Fiber > 100m.\n• Interference: Fiber is immune to EMI.\n• Budget: Copper is cheaper.\n• Bandwidth: Fiber is much higher."
    },
    {
        n: 10,
        q: "Describe the key characteristics that differentiate Category 5e, Category 6, and fiber optic cables.",
        a: "• Cat 5e: 100MHz, 1Gbps, shorter runs.\n• Cat 6: 250MHz, 10Gbps (short), thicker/stiffer.\n• Fiber: Light signals, immune to interference, km distances, highest speed."
    }
];
