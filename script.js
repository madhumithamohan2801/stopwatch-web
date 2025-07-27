var hr = 0, min = 0, sec = 0, count = 0;
var prev_hr = 0, prev_min = 0, prev_sec = 0, prev_count = 0;
var timer = false;
var lapCounter = 1;

const audio = new Audio();
audio.src = "audio/sound_trim.mp3";

function $id(id) {
    return document.getElementById(id);
}

function start() {
    audio.play();
    if (!timer) {
        timer = true;
        $id("start").innerHTML = '<i class="far fa-pause-circle"></i> Pause';
        stopwatch();
    } else {
        timer = false;
        $id("start").innerHTML = '<i class="far fa-play-circle"></i> Start';
    }
}

function reset() {
    $id("record-container").style.display = "none";
    audio.play();
    timer = false;
    $id("start").innerHTML = '<i class="far fa-play-circle"></i> Start';

    hr = min = sec = count = 0;
    prev_hr = prev_min = prev_sec = prev_count = 0;
    lapCounter = 1;

    updateDisplay();
    $id("record-table-body").innerHTML = "";
}

let timeoutId;
function stopwatch() {
    clearTimeout(timeoutId);

    if (timer) {
        count++;
        if (count == 100) {
            sec++;
            count = 0;
        }
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hr++;
            min = 0;
        }
        updateDisplay();
        timeoutId = setTimeout(stopwatch, 10);
    }
}

function updateDisplay() {
    $id("hr").innerHTML = hr.toString().padStart(2, "0");
    $id("min").innerHTML = min.toString().padStart(2, "0");
    $id("sec").innerHTML = sec.toString().padStart(2, "0");
    $id("count").innerHTML = count.toString().padStart(2, "0");
}

function lap() {
    if (!timer) return;

    audio.play();
    $id("record-container").style.display = "block";

    // Current lap time
    var lap_time = `${hr.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}:${count.toString().padStart(2, "0")}`;

    // Calculate difference from previous lap
    var diff_hr = hr - prev_hr;
    var diff_min = min - prev_min;
    var diff_sec = sec - prev_sec;
    var diff_count = count - prev_count;

    if (diff_count < 0) {
        diff_count += 100;
        diff_sec--;
    }
    if (diff_sec < 0) {
        diff_sec += 60;
        diff_min--;
    }
    if (diff_min < 0) {
        diff_min += 60;
        diff_hr--;
    }

    var diff_time = (lapCounter === 1) ? "00:00:00:00" :
        `${diff_hr.toString().padStart(2, "0")}:${diff_min.toString().padStart(2, "0")}:${diff_sec.toString().padStart(2, "0")}:${diff_count.toString().padStart(2, "0")}`;

    // Add lap row
    const table = $id("record-table-body");
    const row = table.insertRow(0);
    row.insertCell(0).innerHTML = lapCounter;
    row.insertCell(1).innerHTML = lap_time;
    row.insertCell(2).innerHTML = diff_time;

    lapCounter++;

    // Store current time as previous lap reference
    prev_hr = hr;
    prev_min = min;
    prev_sec = sec;
    prev_count = count;
}

function clearLap() {
    $id("record-container").style.display = "none";
    audio.play();
    $id("record-table-body").innerHTML = "";
    lapCounter = 1;
    prev_hr = prev_min = prev_sec = prev_count = 0;
}

setInterval(() => {
    let date = new Date();
    let year = date.getFullYear();
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()];
    $id('d1').innerHTML = `${date.getDate()} ${month} , ${year}`;
}, 1000);
