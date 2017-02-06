/*
*Author: Jacob Taylor
*Purpose: Allows user to create and read json objects in a hierarchical structure
*		with unordered lists and list items. The user can modify these objects and then 
*		turn them back into a json string for later use/parsing
*
*Note: that the json format used is arrays that host objects which house data like name and description.
*		each object can have a child which is a array of objects
*/

//these are the ids for list items and unordered lists
ulID = 0;
liID = 0;
			
jsonRoot = [];

//this is temp until reading json file is implemented
jsonFullObject = [
  {
    "uId":"ID",
    "name":"Identify",
    "description":"",
    "children":[

    ]
  },
  {
    "uId":"PR",
    "name":"Protect",
    "description":"",
    "children":[

    ]
  },
  {
    "uId":"DE",
    "name":"Detect",
    "description":"",
    "children":[

    ]
  },
  {
    "uId":"RS",
    "name":"Respond",
    "description":"",
    "children":[

    ]
  },
  {
    "uId":"RC",
    "name":"Recover",
    "description":"Recover Desc",
    "children":[
      {
        "uId":"RC.RP",
        "name":"Recovery Planning",
        "description":"Recovery Planning Desc",
        "children":[
          {
            "uId":"RC.RP-1",
            "name":"RC.RP-1",
            "description":"Recovery plan is executed during or after an event.",
            "children":[
              {
                "uId":"CCS CSC",
                "name":"CCS CSC",
                "children":[
                  {
                    "uId":"8",
                    "name":"8"
                  }
                ]
              },
              {
                "uId":"COBIT 5",
                "name":"COBIT 5",
                "children":[
                  {
                    "uId":"DSS02.05",
                    "name":"DSS02.05"
                  },
                  {
                    "uId":"DSS03.04",
                    "name":"DSS03.04"
                  }
                ]
              },
              {
                "uId":"ISO/IEC 27001:2013",
                "name":"ISO/IEC 27001:2013",
                "children":[
                  {
                    "uId":"A.16.1.5",
                    "name":"A.16.1.5"
                  }
                ]
              },
              {
                "uId":"NIST SP 800-53 Rev. 4",
                "name":"NIST SP 800-53 Rev. 4",
                "children":[
                  {
                    "uId":"CP-2",
                    "name":"CP-2"
                  },
                  {
                    "uId":"IR-4",
                    "name":"IR-4"
                  },
                  {
                    "uId":"IR-8",
                    "name":"IR-8"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "uId":"RC.IM",
        "name":"Improvements",
        "description":"Recovery planning and processes are improved by incorporating lessons learned into future activities.",
        "children":[
          {
            "uId":"RC.IM-1",
            "name":"RC.IM-1",
            "description":"Recovery plans incorporate lessons learned.",
            "children":[
              {
                "uId":"COBIT 5",
                "name":"COBIT 5",
                "children":[
                  {
                    "uId":"BAI05.07",
                    "name":"BAI05.07"
                  }
                ]
              },
              {
                "uId":"ISA 62443-2-1",
                "name":"ISA 62443-2-1",
                "children":[
                  {
                    "uId":"4.4.3.4",
                    "name":"4.4.3.4"
                  }
                ]
              },
              {
                "uId":"NIST SP 800-53 Rev. 4",
                "name":"NIST SP 800-53 Rev. 4",
                "children":[
                  {
                    "uId":"CP-2",
                    "name":"CP-2"
                  },
                  {
                    "uId":"IR-4",
                    "name":"IR-4"
                  },
                  {
                    "uId":"IR-8",
                    "name":"IR-8"
                  }
                ]
              }
            ]
          },
          {
            "uId":"RC.IM-2",
            "name":"RC.IM-2",
            "description":"Recovery strategies are updated.",
            "children":[
              {
                "uId":"COBIT 5",
                "name":"COBIT 5",
                "children":[
                  {
                    "uId":"BAI07.08",
                    "name":"BAI07.08"
                  }
                ]
              },
              {
                "uId":"NIST SP 800-53 Rev. 4",
                "name":"NIST SP 800-53 Rev. 4",
                "children":[
                  {
                    "uId":"CP-2",
                    "name":"CP-2"
                  },
                  {
                    "uId":"IR-4",
                    "name":"IR-4"
                  },
                  {
                    "uId":"IR-8",
                    "name":"IR-8"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "uId":"RC.CO",
        "name":"Communications",
        "description":"Restoration activities are coordinated with internal and external parties, such as coordinating centers, Internet Service Providers, owners of attacking systems, victims, other CSIRTs, and vendors.",
        "children":[
          {
            "uId":"RC.CO-1",
            "name":"RC.CO-1",
            "description":"Public relations are managed.",
            "children":[
              {
                "uId":"COBIT 5",
                "name":"COBIT 5",
                "children":[
                  {
                    "uId":"EDM03.02",
                    "name":"EDM03.02"
                  }
                ]
              }
            ]
          },
          {
            "uId":"RC.CO-2",
            "name":"RC.CO-2",
            "description":"Reputation after an event is repaired.",
            "children":[
              {
                "uId":"COBIT 5",
                "name":"COBIT 5",
                "children":[
                  {
                    "uId":"MEA03.02",
                    "name":"MEA03.02"
                  }
                ]
              }
            ]
          },
          {
            "uId":"RC.CO-3",
            "name":"RC.CO-3",
            "description":"Recovery activities are communicated to internal stakeholders and executive and management teams.",
            "children":[
              {
                "uId":"NIST SP 800-53 Rev. 4",
                "name":"NIST SP 800-53 Rev. 4",
                "children":[
                  {
                    "uId":"CP-2",
                    "name":"CP-2"
                  },
                  {
                    "uId":"IR-4",
                    "name":"IR-4"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
			
//test to see if it stringifies the object in correct json format
function test ()
{
	document.write ("<p> " + JSON.stringify (jsonRoot) +" </p>");
}
			
//wrapper for ReadObject function that does some accounting work and display setup
function DisplayObject (displayID)
{
	ulID = 0;
	liID = 0;
	document.getElementById(displayID).innerHTML = "<ul id='ul" + ulID + "'> </ul>";
	ulID++;
	ReadObject (jsonFullObject, 0);
	jsonRoot = jsonFullObject;
	document.getElementById(displayID).innerHTML +=  "<button onclick='test()'> JSON </button>";
}
			
//adds button listeners to buttons with id from buttonIdList
function AddButtonListener(itemID, listID, object)
{
	document.getElementById ("but" + itemID).onclick = function () {CreationMenu (itemID, listID, object);};
}
			
function ReadObject (jsonObject, id)
{
	//only traverse objects that have elements in them
	if (jsonObject.length <= 0)
		return;
				
	//first create the list items for all child objects of current jsonObject
	for (var i = 0; i < jsonObject.length; i++)
	{
		var creationString = "<li id='li" + liID + "'>";
		
		//if the object has children add a toggle to toggle them
		if (jsonObject[i].children && jsonObject[i].children.length > 0 )
			creationString += "<input type='image' src='arrow.png' id='toggle" + liID + "' onclick='toggle_element(" + ulID  + ")'/>";
		
		creationString += jsonObject[i].name +" </li>";
		liID++;
		
		document.getElementById ("ul" + id).innerHTML += creationString;
					
		document.getElementById ("li" + (liID - 1)).innerHTML += "<ul id='ul" + ulID + "'> </ul>";
		ulID++;
					
		if (jsonObject [i].children)
			ReadObject (jsonObject[i].children, ulID - 1);
					
	}
				
	//add the new object button to the unordered list
	document.getElementById ("ul" + id).innerHTML += "<li id='li" + liID + "'> <button id='but" + liID + "'> New Object </button> </li>";
	//any anon function can only use local variables so make global var liID local
	var newID = liID;
	//set a timeout to make sure that the button has been added to html before we add listener
	setTimeout(function(){ AddButtonListener (newID, id, jsonObject);}, 20);
	liID++;
}
			
//this is used to toggle and ul 
function toggle_element (id)
{
	if (document.getElementById("ul" + id).style.display == "none")
		document.getElementById ("ul" + id).style.display = "block";
	else
		document.getElementById ("ul" + id).style.display = "none";
}
			
function CreateObject (itemID, listID, obj)
{
	//this is the template object whose values will be changed
	var jsonObj = {"name": "name"};

	//the name from the name field of the current list item
	var name = document.getElementById ("Name" + itemID).value;
				
	//the id if a new ul is created
	var newUl;
				
	//check to see if fields are not null
	if (name != "")
	{
		//add all values to jsonObj 
		jsonObj.name = name;
					
		//add the name to the inner html of the current list item
		var creationString = name;
					
					
		//if has children is checked then add a nested unordered list
		if (document.getElementById ("Checked" + itemID).checked)
		{
			//create a button to toggle child unordered list
			creationString = "<input type='image' src='arrow.png' id='toggle" + itemID + "' onclick='toggle_element(" + ulID +")'/>" + name;
			
			//when creating new unordered list or list item use id from global ulID/liID
			creationString += "<ul id='ul"+ ulID +"'>";
			creationString += "<li id='li"+ liID +"'> <input type='button' id='but" + liID + "' value='New Object'/> </li>";
			creationString += "</ul>";
						
			newUl = ulID;
			//add the new ul and li to the current list item
			document.getElementById ("li" + itemID).innerHTML = creationString;
			
						
			jsonObj.children = [];
			ulID++;
			liID++;
		}
		else 
			document.getElementById ("li" + itemID).innerHTML = creationString;
		
		//add the jsonObj to the end of the array of parent object passed in parameters
		var length = obj.length;
		obj[length] = jsonObj;
						
		//creates another list item with a create button in it
		document.getElementById ("ul" + listID).innerHTML += "<li id='li"+ liID +"'> <button id='but" + liID + "'> New Object </button> </li>";
					
		//add a listener to the button that creates another obj in current ul
		var identifier = liID;
		document.getElementById("but" + liID).onclick = function (){CreationMenu (identifier, listID, obj);};
		
		//this is the listener  for if has children is checked it only works down here since adding listeners in if statements doesn't work
		document.getElementById("but" + (liID - 1)).onclick = function (){CreationMenu (identifier - 1, newUl, jsonObj.children);};
					
		liID++;
	}
}
			
//this adds the creation menu to the current list item
function CreationMenu (itemID, listID, obj)
{
	//creation string contains the html for the creation menu of the object
	var creationString = "Name: <input type='text' id='Name" + itemID + "'/> <br/>";
	creationString += "Has Children: <input type='checkbox' id='Checked" + itemID + "'/> <br/>";
	creationString += "<input type='button' value='Create' id='but"+ itemID +"'/>";
	document.getElementById ("li" + itemID).innerHTML = creationString;
				
	//add the listener to the button
	document.getElementById ("but" + itemID).onclick = function () {CreateObject(itemID, listID, obj);};
}

//this setups the initial view of the webpage that will be seen
//takes in the id of the display element
function Setup (displayID)
{
	var itemID = 0;
	var listID = 0;
				
	//creating the starting interface
	var setupString = "<button onclick='test()'> JSON </button>";
	setupString += "<button id='Read'> Read JSON Object </button>";
	setupString += "<ul id='ul"+ listID +"'>";
	setupString += "<li id='li"+ itemID +"'> <button id='but"+ itemID +"'> New Object </button> </li>";
	setupString += "</ul>";
				
	document.getElementById(displayID).innerHTML = setupString;
				
	//listener for new object button
	document.getElementById("but" + itemID).onclick = function (){CreationMenu (itemID, listID, jsonRoot);};
	//listener for the Read JSON Object button
	document.getElementById ("Read").onclick = function (){
		DisplayObject(displayID);
		};
	ulID++;
	liID++;
				
}