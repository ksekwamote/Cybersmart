/* 
GAME STRUCTURE:
===============
01. The game starts when the player hits the START button.
02. Once the game starts the is a clock countdown.
03. The time given is the total time to finish the whole game.
04. The game ends if the time runs out, Game Over.
05. The player can only guess one answer per question.
06. Include the timer so the player can see it.
07. All the questions are displayed at once.
08. There is a DONE button at the end, if the user is finished before the timer stops.
*/

//IMPORTANT!
$(document).ready(function(){

// GLOBAL VARIABLES
// ================

	//Define all global variables and objects
	var currentQuestion; 
	var correctAnswer; 
	var incorrectAnswer; 
	var unanswered; 
	var seconds; 
	var time; 
	var answered; 
	var userSelect;
	var messages = {
		correct: "Congratulations, feel free to high-five a million angels!",
		incorrect: "That's not the right answer." + "<br>" + '"No. No. It Okay. Don\'t Be Cry"',
		endTime: "Looks like you ran out of time!" + "<br>" + "But... It's never too late, it's never too late for now!",
		finished: "So, how'd you do?"
	};

	//All questions inside an array of objects
	var triviaQuestions = [
		{	question: " What does the “https://” at the beginning of a URL denote, as opposed to “http://” (without the “s”)?",
			answerList: [	"That the site has special high definition",
						" That information entered into the site is encrypted",
						"That the site is the newest version available",
						"That the site is not accessible to certain computers"
						],
			answer: 1,
			image: "assets/images/Q1_Kenneth.gif",
			answerText: `The 'S' at the end of HTTPS stands for 'Secure'.
			 It means all communications between your browser and the website are encrypted.
			  HTTPS is often used to protect highly confidential online transactions like 
			  online banking and online shopping order forms.`
		},

		{	question: "Which of the following four passwords is the most secure??",
			answerList: [	"Boat123",
						"WTh!5Z",
						"into*48",
						"123456"],
			answer: 1,
			image: "assets/images/Q2_Jack.gif",
			answerText: `The key aspects of a strong password are length (the longer the better);
			 a mix of letters (upper and lower case), numbers, and symbols, 
			no ties to your personal information, and no dictionary words.`
		},

		{	question: `Private browsing” is a feature in many internet browsers that lets users access web pages 
			without any information (like browsing history) being stored by the browser.
			Can internet service providers see the online activities of their subscribers when those subscribers are using private browsing?`,
			answerList: [	"YES",
						"NO",
						],
			answer: 1,
			image: "assets/images/Q3_Tracy.jpg",
			answerText: `While incognito mode doesn’t store your browsing history, temporary files, or cookies from session to session, 
			it can’t shield you from everything. Your internet service provider (ISP) can see your activity. If you’re logged into your 
			company or school’s Wi-Fi, your boss or school administrators can still see what you’re doing on that network`
		},

		{	question: "Turning off the GPS function of your smartphone prevents any tracking of your phone’s location?",
			answerList: [	"True",
						"False",
						],
			answer: 1,
			image: "assets/images/Q4_Jenna.gif",
			answerText: "f it were only that easy. A 2018 Princeton study found that a device’s time zone and information from its sensors can be combined with public information like maps to estimate your location, even without GPS data."
		},

		{	question: " If a public Wi-Fi network (such as in an airport or café) requires a password to access, is it generally safe to use that network for sensitive activities such as online banking?",
			answerList: [	"Yes , it is safe",
						"No , it is not safe",
						],
			answer: 1,
			image: "assets/images/Q5_NBC.jpg",
			answerText: "When you are on a public network, your device and traffic are vulnerable to anyone who is in the same hotspot or the hotspot owner."
		},

		{	question: "Which of the following is an example of a “phishing” attack??",
			answerList: [	"Sending someone an email that contains a malicious link that is disguised to look like an email from someone the person knows",
						"Creating a fake website that looks nearly identical to a real website in order to trick users into entering their login information",
						"Sending someone a text message that contains a malicious link that is disguised to look like a notification that the person has won a contest",
						"All of the above"],
			answer: 3,
			image: "assets/images/Q6_Liz.gif",
			answerText: `Phishing is a cybercrime in which a target or targets are contacted by email, telephone or text message by someone posing as a
			 legitimate institution to lure individuals into providing sensitive data such as personally identifiable information, banking and credit card details, and passwords.`
		
		},

		{	question: "Why is backing up data files important?",
			answerList: [	"Backups ensure that the information you need is there when you need it",
						"If the information is damaged it can be recovered",
						"All of the above",
						],
			answer: 2,
			image: "assets/images/Q7_Grizz.gif",
			answerText: `The purpose of the backup is to create a copy of data that can be recovered in the event of a primary data failure.
			 Primary data failures can be the result of hardware or software failure, data corruption, or a human-caused event, such as a malicious attack (virus or malware),
			  or accidental deletion of data.`},		

		{	question: "What is Identity Theft?",
			answerList: [	"When someeone steals your clothes and dresses as you",
						"When someone uses your personal identifying information and pretends to be you in order to commit fraud or to gain other financial benefits",
						"The fraudulent attempt to obtain sensitive information or data, such as usernames, passwords and credit card details, by disguising oneself as a trustworthy entity in an electronic communication",
						"The process of converting information or data into a code, especially to prevent unauthorized access."
					],
			answer: 1,
			image: "assets/images/Q8_OrangeKids.jpg",
			answerText: "To protect yourself from identity theft, experts recommend that individuals regularly check credit reports with major credit bureaus, pay attention to billing cycles and follow up with creditors if bills do not arrive on time."
		},		

		{	question: "Which of the following should you do to restrict access to your files and devices?",
			answerList: [	"Update your software once a year",
						"Share passwords only with colleagues you trust",
						"Have your staff memebers access information via an open Wi-Fi network",
						"Use multi-factor authentification"
					  ],
			answer: 3,
			image: "assets/images/Q9_Food.gif",
			answerText: ""
		},		

		{	question: "Which is the best answer for which people in a business should be responsible for cybersecurity??",
			answerList: [	`Business owners. They run the business, so they need to know cybersecurity basics and put them in practice to reduce the risk of cyber attacks`,
						`IT specialists, because they are in the best position to know about and promote cybersecurity within a business.`,
						" Managers, because they are responsible for making sure that staff members are following the right practices.",
						"All staff members should know some cybersecurity basics to reduce the risk of cyber attacks.",
						],
			answer: 3,
			image: "assets/images/Q10_MikeDexter.gif",
			answerText: "Everyone has a role to play in cybersecurity. All staff should know to follow basic cybersecurity practices for a culture of security – and everyone should get regular training."
		},	
		{	question: "Cyber criminals only target large companies. True or False?",
			answerList: [	"True",
						"False"],
			answer: 1,
			image: "assets/images/Q2_Jack.gif",
			answerText: ``
		},
		{	question: "Which one of these statements is correct?",
			answerList: [	"If you get an email that looks like it’s from someone you know, you can click on any links as long as you have a spam blocker and anti-virus protection",
						"You can trust an email really comes from a client if it uses the client’s logo and contains at least one fact about the client that you know to be true",
						" If you get a message from a colleague who needs your network password, you should never give it out unless the colleague says it’s an emergency.",
						"If you get an email from Human Resources asking you to provide personal information right away, you should check it out first to make sure they are who they say are.",
					  ],
			answer: 3,
			image: "assets/images/Q2_Jack.gif",
			answerText: `In a phishing scam, you get a message that looks like it’s from someone you know. It usually contains an urgent request for sensitive
			 information or asks you to click on a link. Before you do that, take steps to make sure the person contacting you is who they say they are`
		},
		{	question: "You get a text message from a vendor who asks you to click on a link to renew your password so that you can log in to its website. You should:",
			answerList: [	" Reply to the text to confirm that you really need to renew your password.",
						"Pick up the phone and call the vendor, using a phone number you know to be correct, to confirm that the request is real.",
						"Click on the link. If it takes you to the vendor’s website, then you’ll know it’s not a scam.",
						],
			answer: 1,
			image: "assets/images/Q2_Jack.gif",
			answerText: `To confirm that the request is real, you should call your vendor using a number you know to be correct. Do not reply to the text itself or use a number in the text,
			     or else you might just wind up talking to a scammer.`
		},
		{	question: " Email authentication can help protect against phishing attacks. True or False?",
			answerList: [	"True",
						"False"],
			answer: 0,
			image: "assets/images/Q2_Jack.gif",
			answerText: `Email authentication technology helps prevent phishing emails from reaching your company’s inboxes.`
		},
		{	question: "If you fall for a phishing scam, what should you do to limit the damage?",
			answerList: [	"Delete the phishing email.",
						"Unplug the computer. This will get rid of any malware.",
						"Change any compromised passwords."
						],
			answer: 2,
			image: "assets/images/Q2_Jack.gif",
			answerText: `To limit the damage you should immediately change any compromised passwords and disconnect
			 from the network any computer or device that could be infected with malware because of the phishing attack`
		},
		{	question: "What is ransomware?",
			answerList: [	"Software that infects computer networks and mobile devices to hold your data hostage until you send the attackers money",
						"Computer equipment that criminals steal from you and won’t return until you pay them.",
						"Software used to protect your computer or mobile device from harmful viruses",
						"A form of cryptocurrency."],
			answer: 0,
			image: "assets/images/Q2_Jack.gif",
			answerText: ``
		},
		{	question: "Local backup files – saved on your computer – will protect your data from being lost in a ransomware attack. True or False?",
			answerList: [	"True",
						"False",
					],
			answer: 1,
			image: "assets/images/Q2_Jack.gif",
			answerText: `Important files should be regularly backed up on a drive or server that’s not connected to your network.`
		},
		{	question: "Which of these best describes how criminals start ransomware attacks?",
			answerList: [	"Sending a scam email with links or attachments that put your data and network at risk.",
						"Getting into your server through vulnerabilities and installing malware.",
						" Using infected websites that automatically download malicious software to your computer or mobile device",
						"All of the above.",
						],
			answer: 3,
			image: "assets/images/Q2_Jack.gif",
			answerText: ``},
		{	question: "If you encounter a ransomware attack, the first thing you should do is pay the ransom. True or False?",
			answerList: [	"True",
						"False"],
			answer: 1,
			image: "assets/images/Q2_Jack.gif",
			answerText: `First, disconnect the infected computer or device from your network. If your data has been stolen,
			 take steps to protect your company and notify those who might be affected. Report the attack right away to your local FBI office. 
			 Check to see if you can restore your systems from back-ups. Then determine whether to pay the ransom, knowing that law enforcement 
			 doesn’t recommend it and that paying the ransom doesn’t guarantee you’ll get your data back.`
		},
		{	question: " Setting your software to auto-update is one way you can help protect your business from ransomware. True or False?",
			answerList: [	"True",
						"False"],
			answer: 0,
			image: "assets/images/Q2_Jack.gif",
			answerText: `To keep your security up to date, it’s important to install the latest patches and updates. 
			Setting them to update automatically can help you make it happen. On mobile devices, you may have to do it manually.`
		},

	];


// FUNCTIONS
// =========

	//This hides the game area on page load
	$("#gameCol").hide();
	
	//This captures user click on start button to create a new game
	$("#startBtn").on("click", function(){
		$(this).hide();
		newGame();
	});

	//This captures the user's click on the reset button to create a new game
	$("#startOverBtn").on("click", function(){
		$(this).hide();
		newGame();
	});

	//This function sets up the page for a new game emptying all areas and showing game area
	function newGame(){
		$("#gameCol").show();
		$("#finalMessage").empty();
		$("#correctAnswers").empty();
		$("#incorrectAnswers").empty();
		$("#unanswered").empty();
		$("#gif").hide();
		$("#gifCaption").hide();
		currentQuestion = 0;
		correctAnswer = 0;
		incorrectAnswer = 0;
		unanswered = 0;
		newQuestion();
	}

	//This function displays the next question
	function newQuestion(){
		$("#message").empty();
		$("#correctedAnswer").empty();
		$("#gif").hide();
		$("#gifCaption").hide();
		answered = true;
		
		//This function displays the new question
		$("#currentQuestion").html("Question " + (currentQuestion+1) + " of " + triviaQuestions.length);
		$(".question").html(triviaQuestions[currentQuestion].question);

		//This function displays the new questions's answer options in multiple choice type
		for(var i = 0; i <= 5; i++){

			var choices = $("<div>");
			choices.text(triviaQuestions[currentQuestion].answerList[i]);
			choices.attr({"data-index": i });
			choices.addClass("thisChoice");
			$(".answerList").append(choices);
		}

		//This sets the timer
		countdown();

		//When user clicks on n answer this will pause the time and display the correct answer to the question 
		$(".thisChoice").on("click",function(){
				userSelect = $(this).data("index");
				clearInterval(time);
				answerPage();
			});
		}

	//This function is for the timer countdown
	function countdown(){
		seconds = 20;
		$("#timeLeft").html("00:" + seconds);
		answered = true;
		//Sets a delay of one second before the timer starts
		time = setInterval(showCountdown, 1000);
	}

	//This function displays the countdown
	function showCountdown(){
		seconds--;

		if(seconds < 15) {
			$("#timeLeft").html("00:0" + seconds);	
		} else {
			$("#timeLeft").html("00:" + seconds);	
		}
		
		if(seconds < 1){
			clearInterval(time);
			answered = false;
			answerPage();
		}
	}

	//This function takes the user to the answer page after the user selects an answer or timer runs out
	function answerPage(){
		$("#currentQuestion").empty();
		$(".thisChoice").empty(); //Clears question page
		$(".question").empty();
		$("#gif").show();
		$("#gifCaption").show();

		var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
		var rightAnswerIndex = triviaQuestions[currentQuestion].answer;

		//This adds the gif that corresponds to this quesiton
		var gifImageLink = triviaQuestions[currentQuestion].image;
		var newGif = $("<img>");
		newGif.attr("src", gifImageLink);
		newGif.addClass("gifImg");
		$("#gif").html(newGif);

		//STILL TO DO
		//This adds a line of text below the gif that talks about why the answer is correct.
		var gifCaption = triviaQuestions[currentQuestion].answerText;
			newCaption = $("<div>");
			newCaption.html(gifCaption);
			newCaption.addClass("gifCaption");
			$("#gifCaption").html(newCaption);
		
		//This checks to see if user choice is correct, incorrect, or unanswered
		if((userSelect == rightAnswerIndex) && (answered === true)){
			correctAnswer++;
			$('#message').html(messages.correct);
		} else if((userSelect != rightAnswerIndex) && (answered === true)){
			incorrectAnswer++;
			$('#message').html(messages.incorrect);
			$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		} else{
			unanswered++;
			$('#message').html(messages.endTime);
			$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
			answered = true;
		}
		
		if(currentQuestion == (triviaQuestions.length-1)){
			setTimeout(scoreboard, 6000);
		} else{
			currentQuestion++;
			setTimeout(newQuestion, 6000);
		}	
	}

	//This fucntion displays all the game stats
	function scoreboard(){
		$('#timeLeft').empty();
		$('#message').empty();
		$('#correctedAnswer').empty();
		$('#gif').hide();
		$("#gifCaption").hide();

		$('#finalMessage').html(messages.finished);
		$('#correctAnswers').html("Correct Answers: " + correctAnswer);
		$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
		$('#unanswered').html("Unanswered: " + unanswered);
		$('#startOverBtn').addClass('reset');
		$('#startOverBtn').show();
		$('#startOverBtn').html("PLAY AGAIN");
	}

// MAIN PROCESS
//=============

}); //IMPORTANT!