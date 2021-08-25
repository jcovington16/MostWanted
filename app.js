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
      // TODO: search by traits
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults[0], people);
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
    mainMenu(person, people);
    break;

    case "family":
    let get_family = getFamily(person, people);
    displayPeople(get_family);
    mainMenu(person, people);
    break;

    case "descendants":
    let parent_descendatns = getDescendants(person, people);
    parent_descendatns.length !== 0 ? displayDescendants(parent_descendatns) : mainMenu(person, people);
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
  // TODO: find the person using the name they entered
  return foundPerson;
}

// Used with displayDecendants 
function getDescendants(person, people) {
  let parent_tree = people.filter((item) => {
    if(item.parents.includes(person.id)) {
      return true;
    }
  });

  if (parent_tree.length === 0) {
    alert(`${person.firstName} ${person.lastName} has no children.`)
  }
  return parent_tree;
}

// TODO: have to use recursion with this function
function displayDescendants(arr, arr2=[]) {

  if(arr.length <= 0) {
    alert(`Children: ${arr2.join(' ')}`)
    return;
  }
  arr2.push(`${arr[0]['firstName']} ${arr[0]['lastName']} `)
  arr.shift();
  displayDecendants(arr, arr2);
}

function getFamily(person, people) {

  let family = people.filter((item) => {
    if (person.parents.includes(item.id) || item.parents.includes(person.id) || person.currentSpouse === item.id) {
      return true;
    } 
  })
  return family;
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

  // TODO: finish getting the rest of the information to display
  let personInfo = 'First Name: ' + person.firstName + '\n' 
  personInfo+= 'Last Name: ' + person.lastName + '\n'
  personInfo += 'Gender: ' + person.gender + '\n' 
  personInfo += 'DOB: ' + person.dob + '\n' 
  personInfo += 'Height: ' + person.height + '\n'
  personInfo += 'Weight: ' + person.weight + '\n' 
  personInfo += 'EyeColor: ' + person.eyeColor + '\n'
  personInfo += 'Occupation: ' + person.occupation
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