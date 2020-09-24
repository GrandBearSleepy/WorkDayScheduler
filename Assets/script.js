
$(document).ready(function () {

    //read local storage if nothing make new storage array
    var eventsArray = JSON.parse(localStorage.getItem("events")) || [];
    //daily total hours
    var hoursNum = 9;

    //render page
    renderScheduler()

    //set hourly color
    hourlyColor();

    //use moment.js to get current day
    function getCurrentDay() {

        var currenDay = moment().format('YYYY-MM-DD')
        return currenDay;
    }

    //render function to display current day and hourly content
    function renderScheduler() {

        $("#currentDay").text(getCurrentDay());
        $.each($(".event-content"), function (e) {
            var textareaId = parseInt($(this).attr("id"));
            for (var i = 0; i < eventsArray.length; i++) {
                var getHour = eventsArray[i].hour;
                if (textareaId === getHour) {
                    $(this).text(eventsArray[i].content);
                }
            }
        })
    }

    //to set up each hour's color
    function hourlyColor() {

        var currentHour = moment().hour();
        console.log(currentHour);
        for (var i = 1; i <= hoursNum; i++) {
            var comparedHour = parseInt($("#" + i).data("hour"));
            if (currentHour === comparedHour) {
                $("#" + i).addClass("present");
            }
            else if (currentHour > comparedHour) {
                //diable past hour text area
                $("#" + i).attr("disabled", "disabled");
                $("#" + i).addClass("past");
            }
            else $("#" + i).addClass("future");
        }
    }

    //save button event listener to save user's input as local storage
    $(".saveBtn").on("click", function (event) {
        event.preventDefault();
        var eventHour = $(this).data("id");
        var eventContent = $(this).parent().siblings().children().val();
        var hourlyEvent = {
            "day": getCurrentDay(),
            "hour": eventHour,
            "content": eventContent
        }
        if (eventContent !== "") {
            eventsArray.push(hourlyEvent);
            localStorage.setItem("events", JSON.stringify(eventsArray));
            alert("You have saved an event!")
        }
    });
})