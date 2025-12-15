const questions = [
    {
        n: 1,
        q: "Which file format is commonly used for storing audio in multimedia applications?",
        a: ["JPEG", "MP3", "GIF", "PNG"],
        correct: 1
    },
    {
        n: 2,
        q: "Main components of multimedia are ………",
        a: ["sound", "text", "animation", "All of them"],
        correct: 3
    },
    {
        n: 3,
        q: "What does the term 'multimedia' refer to?",
        a: ["Text-based content", "Content that combines multiple forms of media", "Audio-only content", "Printed materials"],
        correct: 1
    },
    {
        n: 4,
        q: "Which of is a system by which the motion of various living things are captured and integrated into the computer?",
        a: ["3d rapid digitizer", "motion tracking cameras", "Motion capturing system", "All of above"],
        correct: 2
    },
    {
        n: 5,
        q: "Which field of Multimedia are developed day by day?",
        a: ["latest technology", "cameras", "only content", "Printer"],
        correct: 0
    },
    {
        n: 6,
        q: "Which multimedia networking application is designed for real-time video conferencing and online meetings?",
        a: ["video streaming", "Online game", "VOIP", "share"],
        correct: 2
    },
    {
        n: 7,
        q: "Which of the following client playing out early of video while server will sending later parts?",
        a: ["Conversial", "streaming", "striming live", "storing"],
        correct: 1
    },
    {
        n: 8,
        q: "Which of the following of the video encoding rate fixed?",
        a: ["video", "CBR", "VBR", "pixel"],
        correct: 1
    },
    {
        n: 9,
        q: "Audio signal is ……… signal",
        a: ["analog siganl", "radio signal", "system signal", "voice recognition"],
        correct: 0
    },
    {
        n: 10,
        q: "UDP stands for …………",
        a: ["user datagram protocol", "user data", "user protocol", "using data protocol"],
        correct: 0
    },
    {
        n: 11,
        q: "Main components of multimedia are ………",
        a: ["video", "text", "camera", "Video & Text (A+B)"],
        correct: 3
    },
    {
        n: 12,
        q: "Which of the following are the laser controlled scanners?",
        a: ["3d rapid digitizer", "motion tracking cameras", "virtual reality", "voice recognition system"],
        correct: 0
    },
    {
        n: 13,
        q: "Which file format is commonly used for storing video in multimedia applications?",
        a: ["MP4", "MP3", "GIF", "PNG"],
        correct: 0
    },
    {
        n: 14,
        q: "Which of the following based authoring systems allow documents to be built by defining and manipulating objects on the screen?",
        a: ["Hypertext", "Hypermedia", "authoring", "editing"],
        correct: 1
    },
    {
        n: 15,
        q: "There are many hardware and software accessories to create graphics",
        a: ["Drawing software", "scanning", "Non-liner editing", "3D"],
        correct: 0
    },
    {
        n: 16,
        q: "Which of the following is used in video in multimedia?",
        a: ["MPEG1", "MPEG2", "data", "MPEG1 & MPEG2 (A+B)"],
        correct: 3
    },
    {
        n: 17,
        q: "Which network quality factor can affect the clarity of VoIP calls?",
        a: ["internet speed", "printer setting", "protocols", "weather"],
        correct: 0
    },
    {
        n: 18,
        q: "HTTP stands for …………..",
        a: ["hypertext transfer protocol", "text protocol", "website text protocol", "transfer protocol"],
        correct: 0
    },
    {
        n: 19,
        q: "............ is a sequence of images displayed at constant rate",
        a: ["video", "tracking cameras", "image", "CD"],
        correct: 0
    },
    {
        n: 20,
        q: "Can being playout before downloading entire file",
        a: ["streaming", "store", "streaming live", "internet"],
        correct: 0
    },
    {
        n: 21,
        q: "Which of the following can transmit faster than audio/video will be rendered?",
        a: ["streaming", "store", "streaming live", "internet"],
        correct: 1
    },
    {
        n: 22,
        q: "Interactive nature of human-to-human conversation limits delay tolerance are called ………….",
        a: ["streaming", "store", "loss tolerance", "conversational"],
        correct: 3
    },
    {
        n: 23,
        q: "Example of streaming live like …………",
        a: ["video", "audio", "streaming live", "data"],
        correct: 2
    },
    {
        n: 24,
        q: "Which of the following may not go through firewalls?",
        a: ["RTP", "UDP", "HTTP", "A & B"],
        correct: 3
    },
    {
        n: 25,
        q: "Which of the following may easily go through firewalls?",
        a: ["TCP", "HTTP", "UDP", "A & B"],
        correct: 3
    },
    {
        n: 26,
        q: "What is different between CBR and VBR?",
        a: ["CBR is Constant Bit Rate, VBR is Variable", "CBR is colorful, VBR is visual", "No difference", "VBR is faster"],
        correct: 0
    },
    {
        n: 27,
        q: "Multimedia requires what in PCs?",
        a: ["Fast CPU & Graphics Card", "Only a mouse", "Just a monitor", "Printer"],
        correct: 0
    },
    {
        n: 28,
        q: "What is continuous playout constraint?",
        a: ["Data must arrive before its deadline to play smooth", "Playing continuously without stop", "Constraint on volume", "None of the above"],
        correct: 0
    },
    {
        n: 29,
        q: "What is motion tracking cameras?",
        a: ["Cameras that capture movement for 3D", "Cameras that take photos", "Security cameras", "Webcams"],
        correct: 0
    },
    {
        n: 30,
        q: "Which one determine how does call advertise IP address, port number, encoding algorithms?",
        a: ["VOIP", "session initialization", "loss tolerance", "conversational"],
        correct: 1
    },
    {
        n: 31,
        q: "Call forwarding, screening, recording is example of …………..",
        a: ["VOIP", "session", "value added services", "jetter"],
        correct: 2
    },
    {
        n: 32,
        q: "IP datagram arrives too late for playout at receiver",
        a: ["network loss", "delay loss", "loss tolerance", "jetter"],
        correct: 1
    },
    {
        n: 33,
        q: "RTP stands for what?",
        a: ["Relative translation protocol", "Real time protocol", "Right time protocol", "Remove time protocol"],
        correct: 1
    },
    {
        n: 34,
        q: "911 is an example of ………. In VOIP",
        a: ["End-end delay", "session", "value added", "Emergency"],
        correct: 3
    },
    {
        n: 35,
        q: "Interactive nature human to human is ………….",
        a: ["switching", "store", "Conversational", "streaming"],
        correct: 2
    },
    {
        n: 36,
        q: "Example of client interactivity like……..",
        a: ["pause", "fast forward", "rewind", "all of them"],
        correct: 3
    },
    {
        n: 37,
        q: "Which of the following of the video encoding rate changed?",
        a: ["video", "CBR", "VBR", "pixel"],
        correct: 2
    },
    {
        n: 38,
        q: "What is loss tolerance?",
        a: ["Ability to handle some packet loss without failure", "Losing data totally", "Zero tolerance for errors", "None of these"],
        correct: 0
    },
    {
        n: 39,
        q: "Write multimedia application areas?",
        a: ["Education, Entertainment, Business", "Only gaming", "Only text editors", "None"],
        correct: 0
    },
    {
        n: 40,
        q: "Explain voice recognition system?",
        a: ["System converting speech to text/commands", "Playing music", "Recording video", "None"],
        correct: 0
    },
    {
        n: 41,
        q: "Which of the following use redundancy within and between images?",
        a: ["coding", "packet", "time", "control"],
        correct: 0
    },
    {
        n: 42,
        q: "……… means from one image to next",
        a: ["spatial", "temporal", "bit", "protocol"],
        correct: 1
    },
    {
        n: 43,
        q: "Which of the following is an array of pixels?",
        a: ["video", "image", "digital image", "coding"],
        correct: 2
    },
    {
        n: 44,
        q: "Which of the following is an example of multimedia content?",
        a: ["A plain text document", "A black-and-white photograph", "A video with sound", "A spreadsheet"],
        correct: 2
    },
    {
        n: 45,
        q: "Which component of multimedia deals with visual elements such as images, videos, and animations?",
        a: ["Audio", "Text", "Graphics", "Interactivity"],
        correct: 2
    },
    {
        n: 46,
        q: "What is the purpose of hypertext in multimedia?",
        a: ["To provide visual effects", "To link different multimedia elements together", "To add background music", "To enhance video quality"],
        correct: 1
    },
    {
        n: 47,
        q: "Which multimedia format is known for its ability to support transparent backgrounds in images?",
        a: ["JPEG", "TIFF", "GIF", "BMP"],
        correct: 2
    },
    {
        n: 48,
        q: "Which multimedia element provides the capability for user interaction?",
        a: ["Audio", "Video", "Animation", "Interactivity"],
        correct: 3
    },
    {
        n: 49,
        q: "Which technology is commonly used for streaming multimedia content over the internet?",
        a: ["HTML", "FTP", "HTTP", "SMTP"],
        correct: 2
    },
    {
        n: 50,
        q: "Which protocol is commonly used for streaming multimedia content over the internet?",
        a: ["HTTP", "SMTP", "FTP", "DNS"],
        correct: 0
    },
    {
        n: 51,
        q: "In RTCP what CP refers to?",
        a: ["canal protocol", "packet protocol", "time protocol", "control protocol"],
        correct: 3
    },
    {
        n: 52,
        q: "Determine number of packets send in …………",
        a: ["receiver", "source", "sender", "none of them"],
        correct: 2
    },
    {
        n: 53,
        q: "Function of SIP server is …………",
        a: ["Client", "time management", "registrar", "none of them"],
        correct: 2
    },
    {
        n: 54,
        q: "SSRC filed is ………….. bits",
        a: ["32", "15", "16", "7"],
        correct: 0
    },
    {
        n: 55,
        q: "In RTP sequence number is ……… bits",
        a: ["15", "16", "16", "32"],
        correct: 1
    }
];
