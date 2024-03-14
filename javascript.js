var confirmation = confirm("React version: https://portfolio-tan-gamma-22.vercel.app/");
if (confirmation) {
    window.location.href = "https://portfolio-tan-gamma-22.vercel.app/";
} else {
    // do something else if the user cancels
}









var app1 ="https://www.codechef.com/users/saurabhs45215" , 
appw ="https://www.linkedin.com/in/saurabh-saraswat-88442722b",
app3 ="https://www.hackerrank.com/saurabh45215",
app4 ="https://codeforces.com/profile/saurabh45215",
app5 ="https://leetcode.com/saurabh45215",
app6 ="https://auth.geeksforgeeks.org/user/saurabh45215";


var i = 0 , j = 40;
var txt = ' I am a Aspiring Backend developer . A person, who has high passion in web development,app development. One of my dreams is to master all the technologies and become one of the TOP developer in the world, and now, I am working toward it!';
var speed = 40;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById("demo").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

function blink()//recursive function 
{

  console.log("runned");
  document.getElementById("blender").style.width = j + "%";  
    j++;
    if(j<100)
      {
        setTimeout(blink, 8);
      }
    else
    { 
      j=40;
      document.getElementById("blender").style.width = j + "%";  
              setTimeout(80);
      window.location.href = "/portfolio/hobby.html";
    }
}