//------------------------------------------------------------------------------
    let setYear = document.getElementById('year');
    let y = 'value';
    let setMonth = document.getElementById('month');
    let m = 'value';
    let setCalendar = document.getElementById('button');
    let statusDate = null;

    document.addEventListener('keyup', function() {
      y = setYear.value;
      m = setMonth.value;
      createCalendar(calendar, y, m);

      let elements = document.querySelectorAll('[data-date]');

      for (let i = 0, element; element = elements[i]; i++) {
      element.onclick = handler;
      }
    });

    let todayDate = new Date();
    let currYear = todayDate.getFullYear();
    let currMonth = todayDate.getMonth()+1;
    let currDay = todayDate.getDate();
    let currDate = "Сегодняшняя дата : " + currDay + "-" + currMonth + "-" + currYear;
    let t = document.querySelector('.today_date');
    t.innerHTML = currDate;


    function createCalendar(elem, year, month) {

      let mon = month - 1; // месяцы в JS идут от 0 до 11, а не от 1 до 12
      let d = new Date(year, mon);
      let cellDays = 'div class="calendar__days__item"';
      let rowCalendar = 'div class="calendar__row"';
      let cellMonth = 'div class="calendar__item"';
      year = +year;

      let table = `<${rowCalendar}>
                   <${cellDays}>пн</div>
                   <${cellDays}>вт</div>
                   <${cellDays}>ср</div>
                   <${cellDays}>чт</div>
                   <${cellDays}>пт</div>
                   <${cellDays}>сб</div>
                   <${cellDays}>вс</div></div><${rowCalendar}>`;

      // пробелы для первого ряда
      // с понедельника до первого дня месяца
      // * * * 1  2  3  4
      for (let i = 0; i < getDay(d); i++) {
        table += `<${cellMonth}></div>`;
      }

      // <td> ячейки календаря с датами
      while (d.getMonth() == mon) {
        table += `<${cellMonth}` + `data-date="${d.getDate()}`+ '-' + month + '-' + year +'"' + '>' + d.getDate() + '</div>';

        if (getDay(d) % 7 == 6) { // вс, последний день - перевод строки
          table += `</div><${rowCalendar}>`;
        }

        d.setDate(d.getDate() + 1);
      }

      // добить таблицу пустыми ячейками, если нужно
      // 29 30 31 * * * *
      if (getDay(d) != 0) {
        for (let i = getDay(d); i < 7; i++) {
          table += `<${cellMonth}></div>`;
        }
      }

      // закрыть таблицу
      table += '</div>';

      elem.innerHTML = table;

      return year, month;
    }

    function getDay(date) { // получить номер дня недели, от 0 (пн) до 6 (вс)
      let day = date.getDay();
      if (day == 0) day = 7; // сделать воскресенье (0) последним днем
      return day - 1;
    }


//-----------------------------------------------
    let index = null;
    let localStorageName = 'toDoList';
    let toDoList = [];
    let toDoListJson = JSON.stringify(toDoList);
    let dates = null;
    let dateItems = null;

    if(!localStorage.getItem(localStorageName)){
        localStorage.setItem(localStorageName, toDoListJson);
        index = 0;
    } else{
        toDoListJson = localStorage.getItem(localStorageName);
        toDoList = JSON.parse(toDoListJson);
        index = toDoList.length;
    }

    let toDoListLength = toDoList.length;
    let classDone = 'alert alert_success';
    let classUnDone = 'alert alert_danger';
    let statusDone = 'done';
    let statusUnDone = 'undone';
    let textStatusDone = 'Выполнено';
    let textStatusUnDone = 'Не выполнено';
    let displayDis = 'disable';
    let displayEn = 'enable';
    let textRemove = 'Удалить';
    let toDoWrapper = document.body.querySelector('.wrapper_todo');

    function buttonStatus(id, status) {
        let indexId = +id;
        let itemStatus = status;
        if(itemStatus === statusDone){
            toDo.doneToDo('to-do-'+ indexId, statusDone, classDone);
        } else if(itemStatus === statusUnDone){
            toDo.unDoneToDo('to-do-'+ indexId, statusUnDone, classUnDone);
        }

        toDoList.forEach(function(item, index) {
            if(toDoList[index].id === indexId){
                toDoList[index].status = itemStatus;
                toDoListJson = JSON.stringify(toDoList);
                localStorage.setItem(localStorageName, toDoListJson);
            }
        });

        return null;
    }

    function buttonRemove(id) {
        let indexId = +id;
        let itemId = 'to-do-' + indexId;

        toDo.removeToDo(itemId);
        toDoListJson = localStorage.getItem(localStorageName);
        toDoList = JSON.parse(toDoListJson);

        toDoList.forEach(function(item, index) {
            if(toDoList[index].id === indexId){
                toDoList.splice(index, 1);
                toDoListJson = JSON.stringify(toDoList);
                localStorage.setItem(localStorageName, toDoListJson);
            }
        });

        return null;
    }
    
    function createToDo(getToDo) {

        let arr = getToDo;
        let date = arr[0].date;
        statusDate = date;
        let id = arr[0].id;
        let status = arr[0].status;
        let statusClassActive = (status === statusDone) ? classDone : classUnDone;
        let title = arr[0].title;
        let description = arr[0].description;
        let toDoItem = document.createElement('div');
        toDoItem.setAttribute('class', 'todo');

        let toDoItemHtml = '<div id="to-do-'+ id +'" data-status="'+ status +'" class="'+ statusClassActive +'">';
        toDoItemHtml += '<h5 class="title_todo_item">'+ title + '</h5>';
        toDoItemHtml += '<hr class="hr_item">';
        toDoItemHtml += '<p class="title_todo_item_sec">'+ description + '</p>';
        toDoItemHtml += '<hr class="hr_item">';
        toDoItemHtml += '<button class="button-done btn" onclick="buttonStatus(`'+ id +'`, `'+ statusDone +'`)" role="button">'+ textStatusDone +'</button>';
        toDoItemHtml += '<button class="button-undone btn" onclick="buttonStatus(`'+ id +'`, `'+ statusUnDone +'`);" role="button">'+ textStatusUnDone +'</button>';
        toDoItemHtml += '<button class="button-remove btn" onclick="buttonRemove(`'+ id +'`)" role="button">'+ textRemove +'</button>';
        toDoItemHtml += '</div>';

        if (date === dates) {
          toDoItem.innerHTML = toDoItemHtml;
          toDoWrapper.prepend(toDoItem);
        } 

        return null;
    }

    let toDo = null;

    let createToDoItemButton = document.getElementById('create-to-do-item');

    createToDoItemButton.onclick = function (e) {
        e.preventDefault();

        let arr = {};
        let title = document.getElementById('title-to-do-list');
        let description = document.getElementById('description-to-do-list');
        let titleVal = (title.value !== '') ? title.value : null;
        let descriptionVal = (description.value !== '') ? description.value : null;

        if(titleVal !== null && descriptionVal !== null ){
            index++;
            arr = {'id': index, 'status': statusUnDone, 'title': titleVal, 'description': descriptionVal,  'date': dates};

            toDoList.push(arr);
            toDoListJson = JSON.stringify(toDoList);

            localStorage.setItem(localStorageName, toDoListJson);

            toDo = new ToDo(arr);
            createToDo(toDo.getToDo());
        }

    };
    let toDoListHtml = document.querySelector('.to_do_list');
    let calendarDis = document.querySelector('.calendar');

    let handler = function() {
      dates = this.getAttribute('data-date');

        toDoList.forEach(function (item, index) {
            toDo = new ToDo(toDoList[index]);
            createToDo(toDo.getToDo());
        });
      
      calendarDis.classList.add('calendar_dis');
      toDoListHtml.classList.remove('to_do_list_dis');
    };

    function back() {
      let toDoItem = document.getElementsByClassName('col-md-12');
      calendarDis.classList.remove('calendar_dis');
      toDoListHtml.classList.add('to_do_list_dis');
      
      toDoWrapper.innerHTML = '';
      
    }
    