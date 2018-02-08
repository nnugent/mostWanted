function app(people){
  people = getAge(people);
  var searchType = promptForText("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo);
  switch(searchType){
    case 'yes':
      mainMenu(searchByName(people),people);
      break;
    case 'no':
      mainMenu(searchBySingleTrait(people),people);
      break;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people);
      break;
  }
}

function searchBySingleTrait(people) {
  let userSearchChoice = promptForText("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.", searchByInputCheck);
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = resultChoice(searchByHeight(people)); 
      break;
    case "weight":
      filteredPeople = resultChoice(searchByWeight(people));
      break;
    case "eye color":
      filteredPeople = resultChoice(searchByEyeColor(people)); 
      break;
    case "gender":
      filteredPeople = resultChoice(searchByGender(people)); 
      break;
    case "age":
      filteredPeople = resultChoice(searchByAge(people)); 
      break;
    case "occupation":
      filteredPeople = resultChoice(searchByOccupation(people)); 
      break;
    default:
      alert("You entered an invalid search type! Please try again.");
      searchBySingleTrait(people);
      break;
  }
  return filteredPeople[0];  
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
  personInfo += "Data of Birth: " + person.dob + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  return personInfo;
}

function searchByName(people){
  var firstName = promptForText("What is the person's first name?", chars);
  var lastName = promptForText("What is the person's last name?", chars);
  let filteredPeople = people.filter(function(el){
    if(el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName){
      return true;
    }
  });
  if(filteredPeople.length > 1){
    alert("There were multiple people with that name, try searching with a different trait or using advanced search.");
    app(people);
  }
  let foundPerson = filteredPeople[0];
  return foundPerson;
}

function searchByHeight(people) {
  let userInputHeight = promptForNumbers("How tall is the person?");
  let filteredPeople = people.filter(function (el) {
    if(el.height === userInputHeight) {
      return true;
    }
  });
  return filteredPeople;
}

function searchByWeight(people) {
  let userInputWeight = promptForNumbers("How much does the person weigh?"); 
  let filteredPeople = people.filterForNumbers(function (el) {
    if(el.weight === userInputWeight) {
      return true;
    }
  });
  return filteredPeople;
}

function searchByEyeColor(people) {
  let userInputEyeColor = promptForText("What eye color does the person have?", chars); // added 2/6
  let filteredPeople = people.filter(function (el) {
    if(el.eyeColor === userInputEyeColor) {
      return true;
    }
  });
  return filteredPeople;
}

function searchByGender(people) {
  let userInputGender = promptForText("What Gender is the person you are looking for?", chars);
  let filteredPeople = people.filter(function (el) {
    if(el.gender === userInputGender) {
      return true;
    }
  });
  return filteredPeople;
}

function searchByAge(people) {
  let userInputAge = promptForNumbers("How old is the person you are looking for?"); // added framework not logic to find the age
  let filteredPeople = people.filter(function (el) {

    if(el.age === userInputAge) {
      return true;
    }
  });
  return filteredPeople;
}

function searchByOccupation(people) {
  let userInputOccupation = promptForText("What is the person's Occupation?", chars);
  let filteredPeople = people.filter(function (el) {
    if(el.occupation === userInputOccupation) {
      return true;
    }
  });
  return filteredPeople;
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

function yesNo(input){
  return (input === 'yes' || input === 'no');
}

function chars(input){
  return true;
}

function mainInput(input) {
  return (input === "info" || input === "descendants" || input === "restart" || input === "quit" || input === "family"); 
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
    return choice;
  }
}

function advancedSearch(people) {
  let possibleTraits = ["full name","first name","last name", "height", "weight", "age", "dob", "occupation", "gender", "eye color"];
  let counter = 0;
  do{
    let stringOfTraits;
    let filteredPeople;
    stringOfTraits = possibleTraits.join(", ");
    let trait = prompt("What trait do you know about your target?").trim().toLowerCase();
    possibleTraits.filter(function (el) {
      if(el === trait){
        el.remove();
      }
    });
    let value = prompt("What is the " + trait + " that you are searching for?");
    people = people.filter(function(el){
      switch(trait){
        case "full name":
          let name = trait.split(" ");
          let firstName = name[0];
          let lastName = name[1];
          filteredPeople = people.filter(function(el){
            if(el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName){
              return true;
            }
          });
          break;
        case "first name":
        let firstName = trait;
          filteredPeople = people.filter(function(el){
            if(el.firstName.toLowerCase() === firstName){
              return true;
            }
          });
          break;
        case "last name":
        let lastName = trait;
          filteredPeople = people.filter(function(el){
            if(el.lastName.toLowerCase() === lastName){
              return true;
            }
          });
          break;
        case "height":
          filteredPeople = people.filter(function (el) {
            if(el.height === userInputHeight) {
            return true;
            }
          });
          break;
        case "weight":
          break;
        case "age":
          break;
        case "dob":
          break;
        case "occupation":
          break;
        case "gender":
          break;
        case "eyeColor":
          break;
        default:
        break;
      } 
    }); 
  }while(counter < 5);
  // ask for the trait that they would like to narrow the search with from the array of possible traits
  // narrow the search group offer to display names of new group, if yes display & ask if would like to continue with one of those people
  // if not continue. add one to counter, advanced search run again with counter value and remove used trait & pass current possible traits 
  // once counter reaches 4 (5 traits used.)
}