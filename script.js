var app1 ="https://www.codechef.com/users/saurabhs45215" , 
appw ="https://www.linkedin.com/in/saurabh-saraswat-88442722b",
app3 ="https://www.hackerrank.com/saurabh45215",
app4 ="https://codeforces.com/profile/saurabh45215",
app5 ="https://leetcode.com/saurabh45215",
app6 ="https://auth.geeksforgeeks.org/user/saurabh45215";


var i = 0;
var txt = 'Let’s all agree on one thing: design is about communication and storytelling. Luckily for us, so is writing. As frightening as it may seem to venture into the challenge of writing the text for your online design portfolio, remind yourself that these two disciplines ultimately have the same goal: to communicate a message. In design, you may emphasize a point through visual hierarchy, wh use both to complement and strengthen one another, essentially conveying your .';
var speed = 40;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}
