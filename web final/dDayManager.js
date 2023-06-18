// 계산하기 버튼 클릭 시 D-day 계산 및 결과 표시
function calculateDday() {
    var dDayBase = new Date(document.getElementById("dDayBase").value);
    var dDayTarget = new Date(document.getElementById("dDayTarget").value);
    var timeDiff = dDayBase.getTime() - dDayTarget.getTime();
    var daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    var resultDiv = document.getElementById("dDayResult");
    resultDiv.textContent = daysDiff > 0 ? "+" + daysDiff + "일" : daysDiff + "일";

    calculateFutureDates();
}

// 기준일로부터의 미래 날짜 계산하여 표시
function calculateFutureDates() {
    var dDayBase = new Date(document.getElementById("dDayBase").value);
    var futureDatesList = document.getElementById("futureDates");
    futureDatesList.innerHTML = "";

    var futureDates = [100, 200, 300, 365, 730, 1095, 1460, 1825, 3650];
    for (var i = 0; i < futureDates.length; i++) {
        var futureDate = new Date(dDayBase);
        futureDate.setDate(futureDate.getDate() + futureDates[i]);

        var listItem = document.createElement("li");
        listItem.textContent = futureDates[i] + "일 (" + formatDate(futureDate) + ")";
        futureDatesList.appendChild(listItem);
    }
}

// 저장된 비교일 불러와서 화면에 표시
function loadSavedDates() {
    var savedDates = localStorage.getItem("savedDates");
    var savedDatesList = document.getElementById("savedDates");
    savedDatesList.innerHTML = "";

    if (savedDates) {
        savedDates = JSON.parse(savedDates);

        for (var i = 0; i < savedDates.length; i++) {
            var listItem = document.createElement("li");
            listItem.textContent = savedDates[i];
            listItem['data-date'] = savedDates[i];

            var deleteButton = document.createElement("span");
            deleteButton.textContent = "삭제";
            deleteButton.classList.add("deleteButton");
            deleteButton.onclick = function () {
                var dateToRemove = this.parentNode['data-date'];
                removeSavedDate(dateToRemove);
            };

            var applyButton = document.createElement("span");
            applyButton.textContent = "적용";
            applyButton.classList.add("applyButton");
            applyButton.onclick = function () {
                var dateToApply = this.parentNode['data-date'];
                applySavedDate(dateToApply);
            };

            listItem.appendChild(deleteButton);
            listItem.appendChild(applyButton);
            savedDatesList.appendChild(listItem);
        }
    }
}

// 저장된 비교일을 삭제
function removeSavedDate(dateToRemove) {
    var savedDates = localStorage.getItem("savedDates");

    if (savedDates) {
        savedDates = JSON.parse(savedDates);

        var index = savedDates.indexOf(dateToRemove);
        if (index > -1) {
            savedDates.splice(index, 1);
            localStorage.setItem("savedDates", JSON.stringify(savedDates));

            loadSavedDates();
        }
    }
}

// 저장된 비교일을 비교일 input에 적용
function applySavedDate(dateToApply) {
    document.getElementById("dDayTarget").value = dateToApply;
}

// 저장된 비교일 초기화
function clearSavedDates() {
    localStorage.removeItem("savedDates");
    loadSavedDates();
}

// 날짜 형식 변환 (YYYY-MM-DD)
function formatDate(date) {
    var year = date.getFullYear();
    var month = ("0" + (date.getMonth() + 1)).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
}

// 비교일 저장
function saveDate() {
    var dDayTarget = document.getElementById("dDayTarget").value;

    if (dDayTarget) {
        var savedDates = localStorage.getItem("savedDates");
        var savedDatesList = document.getElementById("savedDates");

        if (savedDates) {
            savedDates = JSON.parse(savedDates);
            savedDates.push(dDayTarget);
            localStorage.setItem("savedDates", JSON.stringify(savedDates));
        } else {
            savedDates = [dDayTarget];
            localStorage.setItem("savedDates", JSON.stringify(savedDates));
        }

        var listItem = document.createElement("li");
        listItem.textContent = dDayTarget;
        listItem['data-date'] = dDayTarget;

        var deleteButton = document.createElement("span");
        deleteButton.textContent = "삭제";
        deleteButton.classList.add("deleteButton");
        deleteButton.onclick = function () {
            var dateToRemove = this.parentNode['data-date'];
            removeSavedDate(dateToRemove);
        };

        var applyButton = document.createElement("span");
        applyButton.textContent = "적용";
        applyButton.classList.add("applyButton");
        applyButton.onclick = function () {
            var dateToApply = this.parentNode['data-date'];
            applySavedDate(dateToApply);
        };

        listItem.appendChild(deleteButton);
        listItem.appendChild(applyButton);
        savedDatesList.appendChild(listItem);
    }
}

// 접속일 기준으로 기본값 초기화
function resetDefaultDate() {
  var dDayBaseInput = document.getElementById("dDayBase");
  var dDayTargetInput = document.getElementById("dDayTarget");

  // 오늘 날짜를 기준일로 설정
  var today = new Date();
  var todayFormatted = today.toISOString().substring(0, 10); // YYYY-MM-DD 형식으로 변환
  dDayBaseInput.value = todayFormatted;

  // 오늘 날짜로부터 100일 뒤의 날짜를 비교일로 설정
  var futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + 100);
  var futureDateFormatted = futureDate.toISOString().substring(0, 10); // YYYY-MM-DD 형식으로 변환
  dDayTargetInput.value = futureDateFormatted;
}