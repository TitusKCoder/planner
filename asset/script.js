let curTime = $("#currentDay");
let weekDay = moment().format("dddd")
let timeNow = moment().format('MMMM Do YYYY, h:mm:ss a');
let hour = moment().format("H")
let container = $(".container");
let timeBlock = $(".time-block");
let myStorage = window.localStorage;

dynamicTime = function(){
curTime.text(weekDay + " " + timeNow);
timeNow = moment().format('MMMM Do YYYY, h:mm:ss a');
}

$(document).ready(function(){
    // WHEN I open the planner
    // THEN the current day is displayed at the top of the calendar
    dynamicTime();
    setInterval( dynamicTime, 1000);

    // WHEN I scroll down
    // THEN I am presented with timeblocks for standard business hours
    // WHEN I view the timeblocks for that day
    // THEN each timeblock is color coded to indicate whether it is in the past,present, or future
        timeBlock.each(function(){
            var block = $(this).data("time");
            var textbox = $(this).find("input");
            
            if(block < hour){
                textbox.addClass("past");
            }
            else if(block == hour){
                textbox.addClass("present");
            }
            else{textbox.addClass("future");}

    //     WHEN I click into a timeblock
    // THEN I can enter an event
    // WHEN I click the save button for that timeblock
    // THEN the text for that event is saved in local storage
        let saveBtn = $(this).find(".saveBtn");

        saveBtn.click(function(){
            let eventInput = textbox.val();
            myStorage.setItem("time" + block, eventInput)
        })

    // WHEN I refresh the page
    // THEN the saved events persist
        let storageCheck = function(){
            
            for( var i = 0; i < 24;){
                let plannedEvent = myStorage.getItem("time" + i);
                if(plannedEvent === null){
                    i++;
                }
                else if(plannedEvent && block === i){
                    textbox.val(plannedEvent);
                    plannedEvent = null;
                    i++; 
                }
                else{i++;}
            }
        }
        storageCheck();
       
})})