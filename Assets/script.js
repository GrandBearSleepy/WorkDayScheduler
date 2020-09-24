// var starHour = moment().set('hour', 9);
// var endHour = moment().set('hour', 17);
// var currentHour = moment().get('hour');


var eventsArray = JSON.parse(localStorage.getItem("events")) || [];
var hoursNum = 9;

renderScheduler()

function getCurrentDay() {
    var currenDay = moment().format('YYYY-MM-DD')
    return currenDay;
}

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

function hourlyColor() {
    var currentHour = moment().hour();
    console.log(currentHour);
    for (var i = 1; i <= hoursNum; i++) {
        var comparedHour = parseInt($("#" + i).data("hour"));
        if (currentHour === comparedHour) {
            $("#" + i).addClass("present");
        }
        else if (currentHour > comparedHour) {
            $("#" + i).attr("disabled", "disabled");
            $("#" + i).addClass("past");
        }
        else $("#" + i).addClass("future");

    }
}

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

hourlyColor();


