"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      searchByTrait(people)
      break;
      default:
    app(people); // restart app
      break;0
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
      break;
    case "family":
    // TODO: get person's family
      break;
    case "descendants":
    // TODO: get person's descendants
      break;
    case "restart":
    app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  foundPerson = foundPerson[0];// Done
  return foundPerson;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "ID: " + person.id + "\n";
  personInfo += "Gender: " + person.gender +"\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Parents: " + person.parents + "\n";                //need function to replace ID with full name
  personInfo += "Current Spouse: " + person.currentSpouse + "\n";   //need function to replace ID with full name
  alert(personInfo);
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

//Gender validation
function validateGender(input){ 
  return input.toLowerCase() == "male" || input.toLowerCase() == "female";
}

//Integer validation 
function integers(input){ 
  if(parseInt(input)){
    return true;
  }
  else{
    return false;
  }
}

//Function to search by single trait
function searchByTrait(people){    
  let input = promptFor("Which trait would you like to search by?\n1: Gender\n2: Height\n3: Weight\n4: Eye Color\n5: Occupation\n6: DOB\n7: IDK Restart?",integers);
  let foundPeople = [];
  switch(input){
    case"1"://gender           
        foundPeople = genderSearch(people);     
      break;
    case "2"://height      
        foundPeople = getHeight(people);      
      break;
    case "3"://weight     
        foundPeople = getWeight(people);      
      break;
    case "4"://eye color      
        foundPeople = getEyes(people);      
        break;
    case "5"://occupation      
        foundPeople = getOccupation(people);      
        break;
    case "6"://DOB      
        foundPeople = getAge(people);      
        break;
    case "7"://restart
        app(people); 
        break;
    default:
      alert("Enter valid selection.");
      return searchByTrait(people);
  }
    if (foundPeople.length > 1) {
      displayPeople(foundPeople);
      searchByTrait(people)
    } else if (foundPeople.length === 1) {
      let foundPerson = foundPeople[0];
      mainMenu(foundPerson, people);
    } else {
      app(people);
    }
}

//Function to prompt no results if criteria doesnt match. 
function noResults(){
  alert("Could not find a trait match!");
}
//search function for gender
function genderSearch(people){ 
  let userChoice = promptFor("Is the person male or female?", validateGender);
  let foundPeople = people.filter(function(el){
    if(el.gender === userChoice) {      
      return true;
    }});
    if(foundPeople === undefined|| foundPeople.length === 0){
      noResults();
      return app(people);
    }
   return foundPeople;
}
//search function for height
function getHeight(people){  
  let userChoice = promptFor("What is the person's height in inches?",integers);
  let foundPeople = people.filter(function(el){
    if(el.height == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}
//search function for weight
function getWeight(people){ 
  let userChoice = promptFor("What is the person's weight?",integers);
  let foundPeople = people.filter(function(el){
    if(el.weight == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}
//search function for eye color
function getEyes(people){
  let userChoice = promptFor("What is the person's eye color?",chars);
  let foundPeople = people.filter(function(el){
    if(el.eyeColor == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}
//search function for occupation 
function getOccupation(people){
  let userChoice = promptFor("What is the person's occupation?",chars);
  let foundPeople = people.filter(function(el){
    if(el.occupation == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}
//search function for age
function getAge(people){
  let userChoice = promptFor("What is the person's date of birth? \n Format: MM/DD/YYY",integers);
    userChoice = ageFinder(userChoice);
  let foundPeople = people.filter(function(el){
    if(ageFinder(el.dob) == userChoice){
      return true;
    }});
  if(foundPeople=== undefined || foundPeople.length ===0){
    noResults();
    return app(people);
  }
  return foundPeople;
}
//function that converts DOB into age integer.
function ageFinder(dob){
  var today = new Date();
  var birthDate = new Date(dob);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())){
    age--;
  }
  return age;
}

