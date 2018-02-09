function app(people){
  people = getAge(people);
  var searchType = promptForText("Would you like to search for someone by name, or using advanced search? Enter 'name' or 'advanced'", searchMode);
  switch(searchType){
    case 'name':
      mainMenu(searchByFullName(people),people);
      break;
    case 'advanced':
      mainMenu(advancedSearch(people),people);
      break;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people);
      break;
  }
}

function mainMenu(person, people){
  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }
  var displayOption = promptForText("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", mainInput);
  switch(displayOption){
    case "info":
      alert(displayPersonInfo(person));
      break;
    case "family":
      alert(displayPeople(getFamily(person, people)));
      break;
    case "descendants":
      let descendants = getDescendants(person,people);
      if(descendants.length > 0) alert(displayPeople(descendants));
      else alert("According to our database, " + person.firstName + " " + person.lastName + " has no descendants.");
      break;
    case "restart":
      app(people);
      break;
    case "quit":
      return;
    default:
      return mainMenu(person, people);
  }
}

function displayPeople(people){
  return (people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPersonInfo(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  return personInfo;
}

function searchByFullName(people){
  let fullName = promptForText("What is the name of the person you are looking for?", chars);
  return fullNameFilter(fullName, people);
}

function searchByFirstName(people) {
  let firstName = promptForText("What is the first name of the person you are looking for?", chars);
  return firstNameFilter(firstName, people);
}

function searchByLastName(people) {
  let lastName = promptForText("What is the last name of the person you are looking for?", chars);
  return lastNameFilter(lastName, people);
}

function searchByHeight(people) {
  let userInputHeight = promptForNumbers("How tall is the person?");
  return heightFilter(userInputHeight, people);
}

function searchByWeight(people) {
  let userInputWeight = promptForNumbers("How much does the person weigh?"); 
  return weightFilter(userInputWeight, people);
}

function searchByEyeColor(people) {
  let userInputEyeColor = promptForText("What eye color does the person have?", chars);
  return eyeColorFilter(userInputEyeColor, people);
}

function searchByGender(people) {
  let userInputGender = promptForText("What Gender is the person you are looking for?", chars);
  return genderFilter(userInputGender, people);
}

function searchByAge(people) {
  let userInputAge = promptForNumbers("How old is the person you are looking for?");
  return ageFilter(userInputAge, people);
}

function searchByOccupation(people) {
  let userInputOccupation = promptForText("What is the person's Occupation?", chars);
  return occupationFilter(userInputOccupation, people);
}

function getAge(people) {
  let todaysDate = new Date();
  let oneYearInMilliseconds = 31556926000;
  let agedPeople = [];
  agedPeople = people.map(function(el){
    let personsBirthDate = new Date(el.dob);
    let ageInMilliseconds = todaysDate - personsBirthDate;
    let age = Math.floor(ageInMilliseconds / oneYearInMilliseconds);
    el.age = age;
    return el;
  });
  return agedPeople;
}

function getDescendants(person, people) {
  let descendants = getChildren(person, people);
  for(let i = 0; i < descendants.length; i++){
    let grandkids = getDescendants(descendants[i], people)
    if(grandkids !== undefined){
      for(let j = 0; j < grandkids.length; j++){
        descendants.push(grandkids[j]);
      }
    }
  }
  return descendants;
}

function getFamily(person, people) {
  let parents = getParents(person, people);
  let siblings = getSiblings(person, people);
  let children = getChildren(person, people);
  let currentSpouse = getCurrentSpouse(person, people);
  let family = [person];
  if(parents !== undefined) family = family.concat(parents);
  if(siblings !== undefined) family = family.concat(siblings);
  if(children !== undefined) family = family.concat(children);
  if(currentSpouse !== undefined) family = family.concat(currentSpouse);
  family.shift(); 
  return family;
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

function getParents(person, people) {
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
      for(let i = 0; i < el.parents.length; i++){
        for(let j = 0; j < person.parents.length; j++){
          if(el.parents[i] === person.parents[j] && el.id !== person.id){
            return true;
          }
        }
      }
    }
  });
  return siblings;
}

function getCurrentSpouse(person,people){
  let currentSpouse = people.filter(function(el){
    if(el.id === person.currentSpouse){
      return true;
    }
  });
  return currentSpouse;
}

function searchMode(input){
  return (input === "name" || input === "advanced");
}

function chars(input){
  return true;
}

function yesNo(input){
  return (input === "yes" || input === "no");
}

function mainInput(input) {
  return (input === "info" || input === "descendants" || input === "restart" || input === "quit" || input === "family"); 
}

function traitInputCheck(input){
  return (input === "full name" || input === "first name" || input ==="last name" || input === "height" || input ===  "weight" || input === "age" || input === "occupation" || input === "gender" || input === "eye color");
}

function searchByInputCheck(input) {
  return (input === "height" || input ==="weight" || input === "eye color" || input === "gender" || input === "age" || input === "occupation");
}
 
function promptForText(question, valid){
  do{
    var incorrectInput = true; 
    var response = (prompt(question).trim()).toLowerCase();
    if(!valid(response)){
      alert("Your input was invalid, check the prompt for valid inputs.");
    }else incorrectInput = false;
  } while(!response || incorrectInput);
  return response;
}

function promptForNumbers(question){
  do{
    var incorrectInput = true;
    var response = parseInt(prompt(question).trim());
    if(response === NaN){
      alert("Your input must be a number. Please try again.");
    }else incorrectInput = false;
  }while(!response || incorrectInput);
  return response;
}

function resultChoice(people) {
  if(people.length === 1){
    return people[0];
  } else {
    let person = prompt("There were multiple people found with that information. Which of them would you like to look into?\n\n" + displayPeople(people)).toLowerCase();
    let personNames = person.split(" ");
    let choice = people.filter(function(el){
    if(el.firstName.toLowerCase() === personNames[0] && el.lastName.toLowerCase() === personNames[1]){
      return true;
    }
  });
    if(choice.length === 0){
      alert("Your input was invalid, please try again.");
      return resultChoice(people);
    }
    return choice[0];
  }
}

function advancedSearch(people) {
  let possibleTraits = ["full name","first name","last name", "height", "weight", "age", "occupation", "gender", "eye color"];
  let counter = 0;
  let trait;
  let filteredPeople = people;
  do{
    trait = getTrait(possibleTraits, counter);
    possibleTraits = traitFilter(trait, possibleTraits);
    switch(trait){
      case "full name":
        filteredPeople = searchByFullName(filteredPeople);
        break;
      case "first name":
        filteredPeople = searchByFirstName(filteredPeople);
        break;
      case "last name":
        filteredPeople = searchByLastName(filteredPeople);
        break;
      case "height":
        filteredPeople = searchByHeight(filteredPeople);
        break;
      case "weight":
        filteredPeople = searchByWeight(filteredPeople);
        break;
      case "age":
        filteredPeople = searchByAge(filteredPeople);
        break;
      case "occupation":
        filteredPeople = searchByOccupation(filteredPeople);
        break;
      case "gender":
        filteredPeople = searchByGender(filteredPeople);
        break;
      case "eye color":
        filteredPeople = searchByEyeColor(filteredPeople);
        break;
      default:
        console.log("How did you get here you monkey?");
        app(people);
      break;
    }
    if(peopleCheck(filteredPeople, people)){
      return app(people);
    }
    counter++;
    let choice = promptForText("There are " + filteredPeople.length + " results found, would you like to choose someone from the list?\nEnter 'yes' or 'no'.", yesNo);
    if(choice === "yes"){
      return resultChoice(filteredPeople);
    }
  }while(counter < 5);
}

function fullNameFilter(fullName, people){
  let name = fullName.split(" ");
  let firstName = name[0];
  let lastName = name[1];
  let filteredPeople = people.filter(function(el){
    if(el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName){
      return true;
    }
  });
  return filteredPeople;
}

function firstNameFilter(firstName, people){
  let filteredPeople = people.filter(function(el){
    if(el.firstName.toLowerCase() === firstName){
      return true;
    }
  });
  return filteredPeople;
}

function lastNameFilter(lastName, people) {
  let filteredPeople = people.filter(function(el){
    if(el.lastName.toLowerCase() === lastName){
      return true;
    }
  });
  return filteredPeople;
}

function heightFilter(height, people) {
  filteredPeople = people.filter(function (el) {
    if(el.height === parseInt(height)) {
      return true;
    }
  });
  return filteredPeople;
}

function weightFilter(weight, people) {
  let filteredPeople = people.filter(function (el) {
    if(el.weight === parseInt(weight)) {
      return true;
    }
  });
  return filteredPeople;
}

function ageFilter(age, people) {
  let filteredPeople = people.filter(function (el) {
    if(el.age === parseInt(age)) {
      return true;
    }
  });
  return filteredPeople;
}

function occupationFilter(occupation, people) {
  let filteredPeople = people.filter(function(el){
    if(el.occupation.toLowerCase() === occupation){
      return true;
    }
  });
  return filteredPeople;
}

function genderFilter(gender, people) {
  let filteredPeople = people.filter(function(el){
    if(el.gender.toLowerCase() === gender){
      return true;
    }
  });
  return filteredPeople;
}

function eyeColorFilter(eyeColor, people) {
  let filteredPeople = people.filter(function(el){
    if(el.eyeColor.toLowerCase() === eyeColor){
      return true;
    }
  });
  return filteredPeople;
}

function peopleCheck(filteredPeople, people) {
  if(filteredPeople.length === 1){
    alert(displayPeople(filteredPeople, people) + " was found given your search parameters.");
    mainMenu(filteredPeople[0], people);
    return true;
  }else if (filteredPeople.length === 0){
    alert("No one meets the information you have provided.");
    return true;
  }
  return false;
}

function getTrait(possibleTraits, counter) {
  let stringOfTraits;
  stringOfTraits = possibleTraits.join("\n");
  let trait;
  if(counter === 0){
    trait = promptForText("Choose a trait you know about your target:\n" + stringOfTraits, traitInputCheck).trim().toLowerCase();
  }else {
    trait = promptForText("Choose another trait that you know about your target:\n" + stringOfTraits, traitInputCheck).trim().toLowerCase();
  }
  return trait;
}

function traitFilter(trait, possibleTraits) {
  possibleTraits = possibleTraits.filter(function (el) {
    if(el === trait) return false;
    else return true;
  });
  return possibleTraits;
}