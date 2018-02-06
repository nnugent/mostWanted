/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){ // loads the array
  var searchType = prompt("Do you know the name of the person you are looking for? Enter 'yes' or 'no'").toLowerCase();
  switch(searchType){
    case 'yes':
    searchByName(people);
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) { /// 
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people); 
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
      break;
    case "eye color":
      filteredPeople = searchByEyeColor(people); 
      break;
    case "gender":
      filteredPeople = searchByGender(people); 
      break;
    case "age":
      filteredPeople = searchByAge(people); 
    case "occupation":
      filteredPeople = searchByOccupation(people); 
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person?"); /// added 2/6

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?"); 

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What eye color does the person have?"); // added 2/6

  let newArray = people.filter(function (el) {
    if(el.eyeColor == userInputEyeColor) {
      return true;
    }
    // return true if el.eyeColor matches userInputEyeColor
  });

  return newArray;
}

function searchByGender(people) {
  let userInputGender = prompt("What Gender is the person you are looking for?"); // added 2/6

  let newArray = people.filter(function (el) {
    if(el.gender === userInputGender) {
      return true;
    }
    // return true if el.gender matches userInputGender
  });

  return newArray;
}

function searchByAge(people) {
  let userInputAge = prompt("How old is the person you are looking for?"); // added framework not logic to find the age

  let newArray = people.filter(function (el) {
    if(el.dob == userInputAge) {
      return true;
    }
    // return true if el.dob matches userInputdob
  });

  return newArray;
}

function searchByOccupation(people) {
  let userInputOccupation = prompt("What is the person's Occupation?"); // added 2/6

  let newArray = people.filter(function (el) {
    if(el.occupation == userInputOccupation) {
      return true;
    }
    // return true if el.occupation matches userInputOccupation
  });

  return newArray;
}



// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as
  the entire original dataset of people. We need people in order to find descendants 
  and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    console.log(getDescendants(person, people));
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
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  let filteredPeople = people.filter(function(el){
    if(el.firstName === firstName && el.lastName === lastName){
      return true;
    }
  });

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);
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
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInof += "DoB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
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


function getDescendants(person, people) {
  let descendants = people.filter(function(el){
    for(let i = 0; i < el.parents.length; i++){
      if(el.parents[i] === person.id){
        return true;
      }
    }
  });
  if(descendants.length > 0){
    for(let i = 0; i < descendants.length; i++){
      let grandkids = getDescendants(descendants[i], people)
      if(grandkids !== undefined){
        for(let j = 0; j < grandkids.length; j++){
          descendants.push(grandkids[j]);
        }
      }
    }
  }else{
    return;
  }
  return descendants;
}


function getFamily(person, people) {
  //must find parents, siblings, current spouse & children
}

function getChildren(person, people) {
  let children = people.filter(function(el){
    for(let i = 0; i < el.parents.length; i++){
      if (el.parents[i] === person.id){
        return true;
      }
    }
  });
  return children;
}

function getParents(person) {
  let parents = people.filter(function(el){
    for(let i = 0; i < person.parents.length; i++){
      if(el.id === person.parents[i]){
        return true;
      }
    }
  });
  return parents;
}

function getSiblings(person, people) {
  let siblings = people.filter(function(el){
    if(el.parents !== undefined && person.parents !== undefined){
      for(let i = 0; i < el.parents; i++){
        for(let j = 0; j < person.parents; j++){
          if(el.parents[i] === person.parents[j]){
            return true;
          }
        }
      }
    }
  });
  return siblings;
}