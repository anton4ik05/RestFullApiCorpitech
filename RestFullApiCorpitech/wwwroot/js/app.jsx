class UserIntervalList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:props.user.id,
            role: getRole(),
            data: props,
            status: true,
            interval: []
        };
        this.close = this.close.bind(this);
        this.addInterval = this.addInterval.bind(this);
    }
    componentDidMount() {
        let setState = this.setState.bind(this);
        $.ajax({
            url: '../api/' + this.state.userId + '/workYears' + '?token=' + getToken(),
            success: function (result) {
                setState({ interval: result });
            },
            error: function (result) { console.log(result); }
        });
    }

    addInterval() {
        $('body').append("<div id='info2' class='info'></div>");
        ReactDOM.render(
            React.createElement(UserIntervalAdding, { user: this.state.data.user }),
            document.getElementById('info2'),
        );
    }
    close() {
        this.setState({ status: false });
        $('#info1').remove();
    }

    render() {
        let intervals = this.state.interval;
        let userId = this.state.userId;
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Рабочие промежутки",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: 'infoHolidays' },
                React.createElement('div', { className: "infoHolidaysHead" },
                    React.createElement('div', {}, 'Промежуток'),
                    React.createElement('div', {}, 'Количество дней отпуска'),
                ),
                intervals.map(function (interval) {
                    return React.createElement(UserIntervalInfo, { key: Math.random() * Math.random(), interval: interval, userId: userId });
                })
            ),
            this.state.role == "admin" ? React.createElement('button', { onClick: this.addInterval, type: 'button', className: 'postfix' }, 'Добавить') : null,
        ) : null;
    }
}
class UserIntervalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: props.userId,
            data: props.interval,
            id: props.interval.id,
            startWorkYear: props.interval.startWorkYear,
            endWorkYear: props.interval.endWorkYear,
            days: props.interval.days,
            role: getRole(),
            status: true
        };
        this.idForInp = Math.round(Math.random() * 10000);
        this.editInterval = this.editInterval.bind(this);
        this.removeInterval = this.removeInterval.bind(this);
    }

    componentDidMount() {

    }
    editInterval() {
        let user = { id: this.state.userId };
        $('body').append("<div id='info2' class='info'></div>");
        ReactDOM.render(
            React.createElement(UserIntervalEdit, { interval: this.state.data, user: user }),
            document.getElementById('info2'),
        );
    }
    removeInterval() {
        let user = { id: this.state.userId };
        $.ajax({
            url: '../api/users/' + this.state.id + '/workYears' + '?token=' + getToken(),
            type: 'DELETE',
            contentType: 'application/json',
            success: function (result) {
                console.log("interval is deleted.");
                
                ReactDOM.unmountComponentAtNode(document.getElementById('info1'));
                ReactDOM.render(
                    React.createElement(UserIntervalList, {user:user}),
                    document.getElementById('info1'),
                );
            },
            error: function (result) { console.log(result); }
        });
    }
    render() {
        return this.state.status === true ? React.createElement('div', { className: "infoHolidaysBody" },
            React.createElement('div', {}, this.state.startWorkYear + " - " + this.state.endWorkYear),
            React.createElement('div', {}, this.state.days),
            this.state.role === "admin" ? React.createElement('div', { className: "operations" },
                React.createElement('span', { className: "operation", onClick: this.editInterval }, '✎'),
                React.createElement('span', { className: "operation", onClick: this.removeInterval }, '✘'),
            ) : null,
        ) : null;
        return null;
    }
}

class UserIntervalAdding extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.state = {
            role: getRole(),
            data: props.user,
            userId: props.user.id,
            status: true,
            startWorkYear: formatDateForInput(new Date()),
            endWorkYear: formatDateForInput(new Date()),
            days: 28,
        };
        this.addInterval = this.addInterval.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.daysUpdate = this.daysUpdate.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.close = this.close.bind(this);
        this.fromDateUpdate = this.fromDateUpdate.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }
    dateOfDocChange() {
        this.setState({ dateOfDoc: this.state.dateOfDoc });
    }
    numOfDocChange(e) {
        this.setState({ numOfDoc: e.target.value });
    }
    onDateUpdate(e) {
        this.setState({ endVacation: this.state.endVacation });
    }
    fromDateUpdate(e) {
        this.setState({ startVacation: this.state.startVacation });
    }
    updateDate(myDatePicker, on) { 
        switch (on) {
            case "end": {
                this.setState({ endWorkYear: myDatePicker });
                this.myDatePicker = myDatePicker;
            } break;
            case "start": {
                this.setState({ startWorkYear: myDatePicker });
                this.myDatePickerFirst = myDatePicker;
            } break;
        }
    }
    daysUpdate(e) {
        this.setState({ days: e.target.value });
    }

    componentDidMount() {
        let myDatePicker = this.state.endVacation, myDatePickerFirst = this.state.startVacation;
        let updateDate = this.updateDate.bind();
        $('#endWorkYear' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker, "end");
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#startWorkYear' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePickerFirst = formatDateForInput(date.date);
                updateDate(myDatePickerFirst, "start");
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
    }
    close() {
        this.setState({ status: false });
        $('#info2').remove();
    }
    addInterval() {
        let startWorkYear = this.state.startWorkYear.trim();
        let endWorkYear = this.state.endWorkYear.trim();
        let days = (this.state.days+"").trim();
        if (!startWorkYear || !endWorkYear || !days) {
            return;
        }
        let interval = { startWorkYear: startWorkYear, endWorkYear: endWorkYear, days: days };
        this.setState({ startWorkYear: "", endWorkYear: "", days: ""});
        let user = { id: this.state.userId };
        $.ajax({
            url: '../api/' + this.state.userId + '/workYears?token=' + getToken(),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(interval),
            success: function (result) {
                console.log("interval is added.");
                ReactDOM.unmountComponentAtNode(document.getElementById('info1'));
                ReactDOM.render(
                    React.createElement(UserIntervalList, { user: user }),
                    document.getElementById('info1'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();

    }
    render() {
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Отпуск",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: "vacationDays" },
                React.createElement('input', { id: "startWorkYear" + this.idForInp, className: "fromVac", "data-toggle": "datepicker", onChange: this.fromDateUpdate, value: this.state.startWorkYear }),
                React.createElement('input', { id: "endWorkYear" + this.idForInp, className: "toVac", "data-toggle": "datepicker", onChange: this.onDateUpdate, value: this.state.endWorkYear }),
                React.createElement('input', { id: "quantityDays" + this.idForInp, className: "quanDays", type: "Number", onChange: this.daysUpdate, value: this.state.days }),
                React.createElement('button', { onClick: this.addInterval, type: 'button', className: 'postfix' }, 'Добавить')),
        ) : null;
    }
}

class UserIntervalEdit extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.state = {
            role: getRole(),
            data: props.user,
            userId: props.user.id,
            status: true,
            id: props.interval.id,
            startWorkYear: props.interval.startWorkYear,
            endWorkYear: props.interval.endWorkYear,
            days: props.interval.days,
        };
        this.editInterval = this.editInterval.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.daysUpdate = this.daysUpdate.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.close = this.close.bind(this);
        this.fromDateUpdate = this.fromDateUpdate.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }
    dateOfDocChange() {
        this.setState({ dateOfDoc: this.state.dateOfDoc });
    }
    numOfDocChange(e) {
        this.setState({ numOfDoc: e.target.value });
    }
    onDateUpdate(e) {
        this.setState({ endVacation: this.state.endVacation });
    }
    fromDateUpdate(e) {
        this.setState({ startVacation: this.state.startVacation });
    }
    updateDate(myDatePicker, on) {
        switch (on) {
            case "end": {
                this.setState({ endWorkYear: myDatePicker });
                this.myDatePicker = myDatePicker;
            } break;
            case "start": {
                this.setState({ startWorkYear: myDatePicker });
                this.myDatePickerFirst = myDatePicker;
            } break;
        }
    }
    daysUpdate(e) {
        this.setState({ days: e.target.value });
    }

    componentDidMount() {
        let myDatePicker = this.state.endVacation, myDatePickerFirst = this.state.startVacation;
        let updateDate = this.updateDate.bind();
        $('#endWorkYear' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker, "end");
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#startWorkYear' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePickerFirst = formatDateForInput(date.date);
                updateDate(myDatePickerFirst, "start");
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
    }
    close() {
        this.setState({ status: false });
        $('#info2').remove();
    }
    editInterval() {
        let startWorkYear = this.state.startWorkYear.trim();
        let endWorkYear = this.state.endWorkYear.trim();
        let days = (this.state.days + "").trim();
        if (!startWorkYear || !endWorkYear || !days) {
            return;
        }
        let interval = { startWorkYear: startWorkYear, endWorkYear: endWorkYear, days: days };
        this.setState({ startWorkYear: "", endWorkYear: "", days: "" });
        let user = { id: this.state.userId };
        $.ajax({
            url: '../api/users/' + this.state.id + '/workYears' + '?token=' + getToken(),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(interval),
            success: function (result) {
                console.log("interval is edited.");
                ReactDOM.unmountComponentAtNode(document.getElementById('info1'));
                ReactDOM.render(
                    React.createElement(UserIntervalList, { user: user }),
                    document.getElementById('info1'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();

    }
    render() {
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Рабочий интервал",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: "vacationDays" },
                React.createElement('input', { id: "startWorkYear" + this.idForInp, className: "fromVac", "data-toggle": "datepicker", onChange: this.fromDateUpdate, value: this.state.startWorkYear }),
                React.createElement('input', { id: "endWorkYear" + this.idForInp, className: "toVac", "data-toggle": "datepicker", onChange: this.onDateUpdate, value: this.state.endWorkYear }),
                React.createElement('input', { id: "quantityDays" + this.idForInp, className: "quanDays", type: "Number", onChange: this.daysUpdate, value: this.state.days }),
                React.createElement('button', { onClick: this.editInterval, type: 'button', className: 'postfix' }, 'Сохранить')),
        ) : null;
    }
}





class HolidaysList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            role: getRole(),
            data: props,
            status: true,
            holidays: []
        };
        this.close = this.close.bind(this);
        this.addHoliday = this.addHoliday.bind(this);
    }
    componentDidMount() {
        let setState = this.setState.bind(this);
        $.ajax({
            url: '../api/holidays' + '?token=' + getToken(),
            success: function (result) {
                setState({ holidays: result });
            },
            error: function (result) { console.log(result); }
        });
    }

    addHoliday() {
        $('body').append("<div id='info2' class='info'></div>");
        ReactDOM.render(
            React.createElement(HolidaysAdding, { user: this.state.data, userId: this.state.id }),
            document.getElementById('info2'),
        );
    }
    close() {
        this.setState({ status: false });
        $('#info1').remove();
    }

    render() {
        let holidays = this.state.holidays;
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Праздники",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: 'infoHolidays' },
                React.createElement('div', { className: "infoHolidaysHead" },
                    React.createElement('div', {}, 'Дата'),
                    React.createElement('div', {}, 'Название'),
                ),
                holidays.map(function (holiday) {
                    return React.createElement(HolidayInfo, { key: Math.random() * Math.random(), holiday: holiday});
                })
            ),
            this.state.role == "admin" ? React.createElement('button', { onClick: this.addHoliday, type: 'button', className: 'postfix' }, 'Добавить') : null,
        ) : null;
    }

}

class HolidayInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data:props.holiday,
            id: props.holiday.id,
            date: props.holiday.date,
            name: props.holiday.name,
            isActive: props.holiday.isActive,
            role: getRole(),
            status: true
        };
        this.idForInp = Math.round(Math.random() * 10000);
        this.editHoliday = this.editHoliday.bind(this);
        this.removeHoliday = this.removeHoliday.bind(this);
    }

    componentDidMount() {

    }
    editHoliday() {
        $('body').append("<div id='info2' class='info'></div>");
        ReactDOM.render(
            React.createElement(HolidaysEdit, { holiday: this.state.data }),
            document.getElementById('info2'),
        );
    }
    removeHoliday() {
        $.ajax({
            url: '../api/holidays?id='+this.state.id+'&token=' + getToken(),
            type: 'DELETE',
            contentType: 'application/json',
            success: function (result) {
                console.log("holiday is deleted.");
                ReactDOM.unmountComponentAtNode(document.getElementById('info1'));
                ReactDOM.render(
                    React.createElement(HolidaysList, null),
                    document.getElementById('info1'),
                );
            },
            error: function (result) { console.log(result); }
        });
    }
    render() {
        let newDate;
        if (this.state.isActive) {
            newDate = this.state.date.split(".");
            newDate[2] = 'XXXX';
            newDate = newDate.join(".");
        } else {
            newDate = this.state.date;
        }
        return this.state.status === true ? React.createElement('div', { className: "infoHolidaysBody" },
            React.createElement('div', {}, newDate),
            React.createElement('div', {}, this.state.name),
            this.state.role === "admin" ? React.createElement('div', { className: "operations" },
                React.createElement('span', { className: "operation", onClick: this.editHoliday }, '✎'),
                React.createElement('span', { className: "operation", onClick: this.removeHoliday }, '✘'),
            ) : null,
        ) : null;
        return null;
    }
}

class HolidaysAdding extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.datePickerForDocTime = "";
        this.state = {
            status: true,
            role: getRole(),
            data: props.user,
            date: "",
            name: "",
            yearInclude: false
        };
        this.addHoliday = this.addHoliday.bind(this);
        this.nameUpdate = this.nameUpdate.bind(this);
        this.dateUpdate = this.dateUpdate.bind(this);
        this.yearIncludeChange = this.yearIncludeChange.bind(this);
        this.close = this.close.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }
    nameUpdate(e) {
        this.setState({ name: e.target.value });
    }
    dateUpdate() {
        this.setState({ date: this.state.date });
    }
    yearIncludeChange() {
        this.setState({ yearInclude: !this.state.yearInclude });
    }

    componentDidMount() {
        let setState = this.setState.bind(this);
        $('#date' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                setState({ date: formatDateForInput(date.date) });
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
    }
    close() {
        this.setState({ status: false });
        $('#info2').remove();
    }
    addHoliday() {
        let date = this.state.date.trim();
        let name = this.state.name.trim();
        let isActive = this.state.yearInclude;
        if (!date || !name) {
            return;
        }
        let holiday = { date: date, name: name, isActive: isActive };
        this.setState({ name: "", date: ""});
        $.ajax({
            url: '../api/holidays' + '?token=' + getToken(),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(holiday),
            success: function (result) {
                console.log("holiday is added.");
                ReactDOM.unmountComponentAtNode(document.getElementById('info1'));
                ReactDOM.render(
                    React.createElement(HolidaysList, null),
                    document.getElementById('info1'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();

    }
    render() {
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Добавить праздник",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: "addingHoliday" },
                React.createElement('input', { id: "date" + this.idForInp, placeholder: "Дата", "data-toggle": "datepicker", onChange: this.dateUpdate, value: this.state.date }),
                React.createElement('input', { placeholder: "Название", onChange: this.nameUpdate, value: this.state.name }),
                React.createElement('div', { className:"checkSpan" },
                    React.createElement('input', { type: "checkbox", defaultChecked: this.state.yearInclude, onChange: this.yearIncludeChange }),
                    React.createElement('span', { onClick: this.yearIncludeChange  },"Относится ко всем годам")
                ),
                React.createElement('button', { onClick: this.addHoliday, type: 'button', className: 'postfix' }, 'Добавить')),
        ) : null;
    }
}

class HolidaysEdit extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.state = {
            data: props.holiday,
            status: true,
            id: props.holiday.id,
            name: props.holiday.name,
            date: props.holiday.date,
            isActive: props.holiday.isActive,
        };
        this.editHoliday = this.editHoliday.bind(this);
        this.nameUpdate = this.nameUpdate.bind(this);
        this.dateUpdate = this.dateUpdate.bind(this);
        this.yearIncludeChange = this.yearIncludeChange.bind(this);
        this.close = this.close.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }
    nameUpdate(e) {
        this.setState({ name: e.target.value });
    }
    dateUpdate() {
        this.setState({ date: this.state.date });
    }
    yearIncludeChange() {
        this.setState({ isActive: !this.state.isActive });
    }

    componentDidMount() {
        let setState = this.setState.bind(this);
        $('#date' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                setState({ date: formatDateForInput(date.date) });
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
    }
    close() {
        this.setState({ status: false });
        $('#info2').remove();
    }
    editHoliday() {
        let date = this.state.date.trim();
        let name = this.state.name.trim();
        let isActive = this.state.isActive;
        if (!date || !name) {
            return;
        }

        let holiday = { id: this.state.id, date: date, name: name, isActive: isActive };
        this.setState({ name: "", date: "" });
        $.ajax({
            url: '../api/holidays?id=' + this.state.id + '&token=' + getToken(),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(holiday),
            success: function (result) {
                console.log("holiday is edited.");
                ReactDOM.unmountComponentAtNode(document.getElementById('info1'));
                ReactDOM.render(
                    React.createElement(HolidaysList, null),
                    document.getElementById('info1'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();

    }
    render() {
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Изменить праздник",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: "addingHoliday" },
                React.createElement('input', { id: "date" + this.idForInp, placeholder: "Дата", "data-toggle": "datepicker", onChange: this.dateUpdate, value: this.state.date }),
                React.createElement('input', { placeholder: "Название", onChange: this.nameUpdate, value: this.state.name }),
                React.createElement('div', { className: "checkSpan" },
                    React.createElement('input', { type: "checkbox", defaultChecked: this.state.isActive, onChange: this.yearIncludeChange }),
                    React.createElement('span', { onClick: this.yearIncludeChange }, "Относится ко всем годам")
                ),
                React.createElement('button', { onClick: this.editHoliday, type: 'button', className: 'postfix' }, 'Сохранить')),
        ) : null;
    }
}

class VacationEdit extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.datePickerForDocTime = "";
        this.state = {
            role: getRole(),
            userId: props.userId,
            data: props,
            status: true,
            numOfDoc: props.vacation.orderNumber,
            dateOfDoc: props.vacation.dateOrder,
            startVacation: props.vacation.startVacation,
            endVacation: props.vacation.endVacation,
            quantityDays: Math.floor((new Date(parseNewDate(props.vacation.endVacation)).getTime() - new Date(parseNewDate(props.vacation.startVacation)).getTime()) / (1000 * 60 * 60 * 24)) + 1
        };

        this.editVac = this.editVac.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.quantityDaysUpdate = this.quantityDaysUpdate.bind(this);
        this.numOfDocChange = this.numOfDocChange.bind(this);
        this.dateOfDocChange = this.dateOfDocChange.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.close = this.close.bind(this);
        this.fromDateUpdate = this.fromDateUpdate.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }
    dateOfDocChange() {
        this.setState({ dateOfDoc: this.state.dateOfDoc });
    }
    numOfDocChange(e) {
        this.setState({ numOfDoc: e.target.value });
    }
    onDateUpdate(e) {
        this.setState({ endVacation: this.state.endVacation });
    }

    fromDateUpdate(e) {
        this.setState({ startVacation: this.state.startVacation });
    }
    updateDate(myDatePicker, on) { //true - endVacation,false- start
        switch (on) {
            case "doc": {
                this.setState({ dateOfDoc: myDatePicker });
                this.datePickerForDocTime = myDatePicker;
            } break;
            case "end": {
                this.setState({ endVacation: myDatePicker });
                this.myDatePicker = myDatePicker;
                this.quantityDaysUpdate();
            } break;
            case "start": {
                this.setState({ startVacation: myDatePicker });
                this.myDatePickerFirst = myDatePicker;
                this.quantityDaysUpdate();
            } break;
        }
    }
    quantityDaysUpdate() {
        let end = new Date(parseNewDate(this.state.endVacation)), start = new Date(parseNewDate(this.state.startVacation));
        let myDates = getDaysArray(start, end);
        let dates = [];
        let setState = this.setState.bind(this);
        $.ajax({
            url: '../api/holidays' + '?token=' + getToken(),
            success: function (result) {
                dates = result;
                let holidays = 0;
                myDates.forEach((date) => {
                    dates.forEach((holiday) => {
                        let myHolidayDate = new Date(parseNewDate(holiday.date));
                        if (holiday.isActive) {
                            if (date.getMonth() == myHolidayDate.getMonth() && date.getDate() == myHolidayDate.getDate()) {
                                holidays++;
                            }
                        } else {
                            if (date.getMonth() == myHolidayDate.getMonth() && date.getDate() == myHolidayDate.getDate() && date.getFullYear() == myHolidayDate.getFullYear()) {
                                holidays++;
                            }
                        }
                    });
                });
                let days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                if (days < 0) {
                    days = 0;
                }
                setState({ quantityDays: days - holidays });
            },
            error: function (result) { console.log(result); }
        });
    }

    componentDidMount() {
        let myDatePicker = this.state.endVacation, myDatePickerFirst = this.state.startVacation, datePickerForDocTime = "";
        let updateDate = this.updateDate.bind();
        let newDate = "";
        $('#dateOfDoc' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                datePickerForDocTime = formatDateForInput(date.date);
                updateDate(datePickerForDocTime, "doc");
            },
            autoPick: true,
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#endVacation' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                newDate = date.date;
            },
            hide: function () {
                if (newDate == "") {
                    newDate = new Date(parseNewDate(myDatePicker));
                }
                myDatePicker = formatDateForInput(newDate);
                updateDate(myDatePicker, "end");
            },
            autohide:true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#startVacation' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                newDate = date.date;
            },
            hide: function () {
                if (newDate == "") {
                    newDate = new Date(parseNewDate(myDatePickerFirst));
                }
                myDatePickerFirst = formatDateForInput(newDate);
                updateDate(myDatePickerFirst, "start");
            },
            autohide: true,
            format: 'dd.mm.YYYY',

            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        this.quantityDaysUpdate();
    }
    close() {
        this.setState({ status: false });
        $('#info1').remove();
    }
    editVac() {
        let startVacation = this.state.startVacation.trim();
        let endVacation = this.state.endVacation.trim();
        let orderNumber = this.state.numOfDoc.trim();
        let dateOrder = this.state.dateOfDoc.trim();
        if (!startVacation || !endVacation || !orderNumber || !dateOrder) {
            return;
        }
        let user = { id: this.state.userId };
        let vacation = { startVacation: startVacation, endVacation: endVacation, orderNumber: orderNumber, dateOrder: dateOrder };
        this.setState({ name: "", surname: "", middlename: "", login: "", role: "moderator", vacationYear: "", dateOfEmployment: "" });
        $.ajax({
            url: '/api/users/' + this.state.data.vacation.id + '/vacations' + '?token=' + getToken(),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(vacation),
            success: function (result) {
                console.log("vac is edited.");
                ReactDOM.unmountComponentAtNode(document.getElementById('info'));
                ReactDOM.render(
                    React.createElement(UserVacationDetails, { user: user }),
                    document.getElementById('info'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();

    }
    render() {
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Отпуск",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: "vacationDays" },
                React.createElement('input', { id: "startVacation" + this.idForInp, className: "fromVac", "data-toggle": "datepicker", onChange: this.fromDateUpdate, value: this.state.startVacation }),
                React.createElement('input', { id: "endVacation" + this.idForInp, className: "toVac", "data-toggle": "datepicker", onChange: this.onDateUpdate, value: this.state.endVacation }),
                React.createElement('input', { id: "quantityDays" + this.idForInp, className: "quanDays", onChange: this.quantityDaysUpdate, value: this.state.quantityDays }),
                React.createElement('input', { id: "numOfDoc" + this.idForInp, placeholder: "Номер", className: "numOfDoc", onChange: this.numOfDocChange, value: this.state.numOfDoc }),
                React.createElement('input', { id: "dateOfDoc" + this.idForInp, className: "dateOfDoc", "data-toggle": "datepicker", onChange: this.dateOfDocChange, value: this.state.dateOfDoc }),
                React.createElement('button', { onClick: this.editVac, type: 'button', className: 'postfix' }, 'Сохранить')),
        ) : null;
    }
}


class VacationAdding extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.datePickerForDocTime = "";
        this.state = {
            role: getRole(),
            data: props.user,
            userId: props.userId,
            status: true,
            counterVac: 0,
            numOfDoc: "",
            dateOfDoc: formatDateForInput(new Date()),
            startVacation: formatDateForInput(new Date()),
            endVacation: formatDateForInput(new Date()),
            quantityDays: 0,
        };
        this.addVac = this.addVac.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.quantityDaysUpdate = this.quantityDaysUpdate.bind(this);
        this.numOfDocChange = this.numOfDocChange.bind(this);
        this.dateOfDocChange = this.dateOfDocChange.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.close = this.close.bind(this);
        this.fromDateUpdate = this.fromDateUpdate.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }
    dateOfDocChange() {
        this.setState({ dateOfDoc: this.state.dateOfDoc });
    }
    numOfDocChange(e) {
        this.setState({ numOfDoc: e.target.value });
    }
    onDateUpdate(e) {
        this.setState({ endVacation: this.state.endVacation });
    }
    fromDateUpdate(e) {
        this.setState({ startVacation: this.state.startVacation });
    }
    updateDate(myDatePicker, on) { //true - endVacation,false- start
        switch (on) {
            case "doc": {
                this.setState({ dateOfDoc: myDatePicker });
                this.datePickerForDocTime = myDatePicker;
            } break;
            case "end": {
                this.setState({ endVacation: myDatePicker });
                this.myDatePicker = myDatePicker;
                this.quantityDaysUpdate();
            } break;
            case "start": {
                this.setState({ startVacation: myDatePicker });
                this.myDatePickerFirst = myDatePicker;
                this.quantityDaysUpdate();
            } break;
        }
    }
    quantityDaysUpdate() {
        let end = new Date(parseNewDate(this.state.endVacation)), start = new Date(parseNewDate(this.state.startVacation));
        let myDates = getDaysArray(start, end);
        let dates = [];
        let setState = this.setState.bind(this);
        $.ajax({
            url: '../api/holidays' + '?token=' + getToken(),
            success: function (result) {
                dates = result;
                let holidays = 0;
                myDates.forEach((date) => {
                    dates.forEach((holiday) => {
                        let myHolidayDate = new Date(parseNewDate(holiday.date));
                        if (holiday.isActive) {
                            if (date.getMonth() == myHolidayDate.getMonth() && date.getDate() == myHolidayDate.getDate()) {
                                holidays++;
                            }
                        } else {
                            if (date.getMonth() == myHolidayDate.getMonth() && date.getDate() == myHolidayDate.getDate() && date.getFullYear() == myHolidayDate.getFullYear()) {
                                holidays++;
                            }
                        }
                    });
                });
                let days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                if (days < 0) {
                    days = 0;
                }
                setState({ quantityDays: days - holidays });
            },
            error: function (result) { console.log(result); }
        });
    }

    componentDidMount() {
        let myDatePicker = this.state.endVacation, myDatePickerFirst = this.state.startVacation, datePickerForDocTime = "";
        let updateDate = this.updateDate.bind();
        let newDate = "";
        $('#dateOfDoc' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                datePickerForDocTime = formatDateForInput(date.date);
                updateDate(datePickerForDocTime, "doc");
            },
            autoPick: true,
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#endVacation' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker, "end");
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#startVacation' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePickerFirst = formatDateForInput(date.date);
                updateDate(myDatePickerFirst, "start");
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        this.quantityDaysUpdate();
    }
    close() {
        this.setState({ status: false });
        $('#info1').remove();
    }
    addVac() {
        let startVacation = this.state.startVacation.trim();
        let endVacation = this.state.endVacation.trim();
        let orderNumber = this.state.numOfDoc.trim();
        let dateOrder = this.state.dateOfDoc.trim();
        if (!startVacation || !endVacation || !orderNumber || !dateOrder) {
            return;
        }
        let vacation = { startVacation: startVacation, endVacation: endVacation, orderNumber: orderNumber, dateOrder: dateOrder };
        this.setState({ name: "", surname: "", middlename: "", login: "", role: "moderator", vacationYear: "", dateOfEmployment: "" });
        let user = { id: this.state.userId };
        $.ajax({
            url: '/api/users/' + this.state.data.id + '/vacations' + '?token=' + getToken(),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(vacation),
            success: function (result) {
                console.log("vac is added.");
                ReactDOM.unmountComponentAtNode(document.getElementById('info'));
                ReactDOM.render(
                    React.createElement(UserVacationDetails, { user: user }),
                    document.getElementById('info'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();

    }
    render() {
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Отпуск",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: "vacationDays" },
                React.createElement('input', { id: "startVacation" + this.idForInp, className: "fromVac", "data-toggle": "datepicker", onChange: this.fromDateUpdate, value: this.state.startVacation }),
                React.createElement('input', { id: "endVacation" + this.idForInp, className: "toVac", "data-toggle": "datepicker", onChange: this.onDateUpdate, value: this.state.endVacation }),
                React.createElement('input', { id: "quantityDays" + this.idForInp, className: "quanDays", onChange: this.quantityDaysUpdate, value: this.state.quantityDays }),
                React.createElement('input', { id: "numOfDoc" + this.idForInp, placeholder: "Номер", className: "numOfDoc", onChange: this.numOfDocChange, value: this.state.numOfDoc }),
                React.createElement('input', { id: "dateOfDoc" + this.idForInp, className: "dateOfDoc", "data-toggle": "datepicker", onChange: this.dateOfDocChange, value: this.state.dateOfDoc }),
                React.createElement('button', { onClick: this.addVac, type: 'button', className: 'postfix' }, 'Добавить')),
        ) : null;
    }
}
class VacationInDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { userId: props.userId, role: getRole(), data: props.vacation, days: props.vacation.days, vacation: "", vacationsArr: props.vacationsArr, dateOrder: "", orderNumber: "", status: true };
        this.idForInp = Math.round(Math.random() * 10000);
        this.editVac = this.editVac.bind(this);
        this.removeVac = this.removeVac.bind(this);
    }

    componentDidMount() {

        let vacsInfo = this.state.vacationsArr.find(obj => {
            return obj.id == this.state.data.id;
        });
        if (vacsInfo) {
            this.setState({ orderNumber: vacsInfo.orderNumber, vacation: vacsInfo, dateOrder: vacsInfo.dateOrder });
        }

    }
    editVac() {
        $('body').append("<div id='info1'></div>");
        ReactDOM.render(
            React.createElement(VacationEdit, { vacation: this.state.vacation, userId: this.state.userId }),
            document.getElementById('info1'),
        );
    }
    removeVac() {
        let user = { id: this.state.userId };
        $.ajax({
            url: '/api/users/' + this.state.vacation.id + '/vacations?token=' + getToken(),
            type: 'DELETE',
            contentType: 'application/json',
            success: function (result) {
                console.log("vac is deleted.");
                ReactDOM.unmountComponentAtNode(document.getElementById('info'));
                ReactDOM.render(
                    React.createElement(UserVacationDetails, { user: user }),
                    document.getElementById('info'),
                );
            },
            error: function (result) { console.log(result); }
        });
    }
    render() {
        return this.state.status === true ? React.createElement('div', { className: "infoVacationsBody" },
            React.createElement('div', {}, this.state.days),
            React.createElement('div', { className: "date" }, formatDateForInput(new Date(this.state.data.startWorkYear)) + ' - ' + formatDateForInput(new Date(this.state.data.endWorkYear))),
            React.createElement('div', { className: "date" }, formatDateForInput(new Date(this.state.data.startVacation))),
            React.createElement('div', { className: "date" }, formatDateForInput(new Date(this.state.data.endVacation))),
            React.createElement('div', {}, this.state.orderNumber),
            React.createElement('div', { className: "date" }, formatDateForInput(new Date(parseNewDate(this.state.dateOrder)))),
            React.createElement('div', { className: "operations" },
                this.state.role === "admin" ? React.createElement('span', { className: "operation", onClick: this.editVac }, '✎') : null,
                this.state.role === "admin" ? React.createElement('span', { className: "operation", onClick: this.removeVac }, '✘') : null,
            ),
        ) : null;
        return null;
    }
}

class UserEdit extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.state = {
            data: props.user,
            status: true,
            name: props.user.name,
            surname: props.user.surname,
            middlename: props.user.middlename,
            login: props.user.login,
            role: props.user.role,
            dateOfEmployment: props.user.dateOfEmployment,
            vacations: props.user.vacations,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onMiddlenameChange = this.onMiddlenameChange.bind(this);
        this.onDateOfEmploymentChange = this.onDateOfEmploymentChange.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.close = this.close.bind(this);
    }

    onNameChange(e) {
        this.setState({ name: e.target.value });
    }

    onSurnameChange(e) {
        this.setState({ surname: e.target.value });
    }

    onMiddlenameChange(e) {
        this.setState({ middlename: e.target.value });

    }

    onLoginChange(e) {
        this.setState({ login: e.target.value });
    }
    onRoleChange(e) {
        this.setState({ role: e.target.value });
    }

    onDateOfEmploymentChange(e) {
        this.setState({ dateOfEmployment: e.target.textContent });
    }

    updateDate(myDatePicker) {
        this.setState({ dateOfEmployment: myDatePicker });
    }

    close() {
        this.setState({ status: false });
        $('#edit').remove();
    }

    componentDidMount() {
        let myDatePicker = "";
        let updateDate = this.updateDate.bind();
        $('[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                $(this).text(formatDateForInput(date.date));
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker);
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: [
                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь',
                'Декабрь'
            ],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
    }


    putTheEdit(id, user) {
        $.ajax({
            url: '../api/users/' + id + '?token=' + getToken(),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function (result) {
                console.log("edit is sucs.");
                ReactDOM.unmountComponentAtNode(document.getElementById('content'));
                ReactDOM.render(
                    React.createElement(UserList, null),
                    document.getElementById('content'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();
    }



    onSubmit(e) {
        e.preventDefault();
        let name = this.state.name.trim();
        let surname = this.state.surname.trim();
        let middlename = this.state.middlename.trim();
        let dateOfEmployment = this.state.dateOfEmployment.trim();
        let login = this.state.login.trim();
        let role = this.state.role.trim();
        if (!name || !surname || !middlename || !dateOfEmployment || !login || !role) {
            return;
        }
        this.putTheEdit(this.state.data.id, { name: name, surname: surname, middlename: middlename, login: login, role: role, dateOfEmployment: dateOfEmployment, vacations: this.state.vacations });
    }

    render() {
        return this.state.status === true ? React.createElement(
            'div', { className: "editBlock" }, "Редактирование",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('form', { onSubmit: this.onSubmit },
                React.createElement('input', { placeholder: 'Surname', type: 'text', autoComplete: "off", onChange: this.onSurnameChange, value: this.state.surname }),
                React.createElement('input', { placeholder: 'Name', type: 'text', autoComplete: "off", onChange: this.onNameChange, value: this.state.name }),
                React.createElement('input', { placeholder: 'Middlename', type: 'text', autoComplete: "off", onChange: this.onMiddlenameChange, value: this.state.middlename }),
                React.createElement('input', { placeholder: 'Login', type: 'text', autoComplete: "off", onChange: this.onLoginChange, value: this.state.login }),
                React.createElement('select', { className: "form-inp", placeholder: 'Role', type: 'text', autoComplete: "off", onChange: this.onRoleChange, value: this.state.role },
                    React.createElement("option", { value: "moderator" }, "Moder"),
                    React.createElement("option", { value: "user" }, "User")),
                React.createElement('input', { id: "dateOfEmlp", placeholder: 'DateOfEmployment', "data-toggle": "datepicker", type: 'text', autoComplete: "off", onChange: this.onDateOfEmploymentChange, value: this.state.dateOfEmployment }),
                React.createElement('button', { type: 'submit', className: 'postfix' }, 'Изменить')
            ),
        ) : null;


    }
}

class UserVacationDetails extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.state = {
            data: props.user,
            id: props.user.id,
            status: true,
            vacationsForView: [],
            vacations: [],
        };
        this.close = this.close.bind(this);
        this.addVac = this.addVac.bind(this);
        this.holidays = this.holidays.bind(this);
        this.intervals = this.intervals.bind(this);
    }
    componentDidMount() {
        let state = this.setState.bind(this);
        let id = this.state.id;
        $.ajax({
            url: '../api/users?id=' + id + '&token=' + getToken(),
            success: function (result) {
                $.ajax({
                    url: '../api/users/' + id + '/vacations' + '?token=' + getToken(),
                    success: function (result2) {
                        state({ vacations: result.vacations, vacationsForView: result2 });
                    },
                    error: function (result2) { console.log(result2); }
                });
            },
            error: function (result) { console.log(result); }
        });

    }
    close() {
        this.setState({ status: false });
        $('#info').remove();
    }
    addVac() {
        $('body').append("<div id='info1'></div>");
        ReactDOM.render(
            React.createElement(VacationAdding, { user: this.state.data, userId: this.state.id }),
            document.getElementById('info1'),
        );
    }
    holidays() {
        $('body').append("<div id='info1'></div>");
        ReactDOM.render(
            React.createElement(HolidaysList, null),
            document.getElementById('info1'),
        );
    }
    intervals() {
        let user = { id: this.state.id };
        $('body').append("<div id='info1'></div>");
        ReactDOM.render(
            React.createElement(UserIntervalList, { user: user }),
            document.getElementById('info1'),
        );
    }
    render() {
        let vacationsForView = this.state.vacationsForView;
        let vacationsArr = this.state.vacations;
        let id = this.state.id;
        return this.state.status === true ? React.createElement(
            'div', { className: "infoBlock" }, "Отпуска",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('div', { className: 'infoVacations' },
                React.createElement('div', { className: "infoVacationsHead" },
                    React.createElement('div', {}, 'Кол-во дней'),
                    React.createElement('div', {}, 'Промежуток'),
                    React.createElement('div', {}, 'Начало отпуска'),
                    React.createElement('div', {}, 'Конец отпуска'),
                    React.createElement('div', {}, 'Номер'),
                    React.createElement('div', {}, 'Дата'),
                ),
                vacationsForView.map(function (vacation, index) {
                    return React.createElement(VacationInDetail, { key: Math.random() * Math.random(), vacationsArr: vacationsArr, vacation: vacation, index: index, userId: id });
                })
            ),
            React.createElement('div', { className: 'buttons' },
                getRole() == "admin" ? React.createElement('button', { onClick: this.addVac, type: 'button', className: 'postfix' }, 'Добавить') : null,
                React.createElement('button', { onClick: this.holidays, type: 'button', className: 'postfix' }, 'Праздники'),
                React.createElement('button', { onClick: this.intervals, type: 'button', className: 'postfix' }, 'Интервалы'),
            ),
        ) : null;
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.state = { data: props.user, role: props.role, vacationDays: 0, freeVacDays: 0, fromDate: formatDateForInput(new Date(parseNewDate(props.user.dateOfEmployment))), onDate: formatDateForInput(new Date()) };
        this.updateDate = this.updateDate.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.deleteEmploye = this.deleteEmploye.bind(this);
        this.onElementRemove = this.onElementRemove.bind(this);
        this.editEmploye = this.editEmploye.bind(this);
        this.updateFormula = this.updateFormula.bind(this);
        this.freeDaysUp = this.freeDaysUp.bind(this);
        this.collapse = this.collapse.bind(this);
        this.userInfoVacation = this.userInfoVacation.bind(this);
        this.fromDateUpdate = this.fromDateUpdate.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }

    onDateUpdate(e) {
        this.setState({ onDate: this.myDatePicker });
    }
    onElementRemove() {
        this.setState({ data: null });
    }

    fromDateUpdate(e) {
        this.setState({ fromDate: this.myDatePickerFirst });
    }
    quantityDaysUpdate() {
        let end = new Date(parseNewDate(this.state.endVacation)), start = new Date(parseNewDate(this.state.startVacation));
        let myDates = getDaysArray(start, end);
        let dates = [];
        let setState = this.setState.bind(this);
        $.ajax({
            url: '../api/holidays' + '?token=' + getToken(),
            success: function (result) {
                dates = result;
                let holidays = 0;
                myDates.forEach((date) => {
                    dates.forEach((holiday) => {
                        let myHolidayDate = new Date(parseNewDate(holiday.date));
                        if (holiday.isActive) {
                            if (date.getMonth() == myHolidayDate.getMonth() && date.getDate() == myHolidayDate.getDate()) {
                                holidays++;
                            }
                        } else {
                            if (date.getMonth() == myHolidayDate.getMonth() && date.getDate() == myHolidayDate.getDate() && date.getFullYear() == myHolidayDate.getFullYear()) {
                                holidays++;
                            }
                        }
                    });
                });
                let days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                if (days < 0) {
                    days = 0;
                }
                setState({ quantityDays: days - holidays });
            },
            error: function (result) { console.log(result); }
        });
    }
    freeDaysUp() {
        let state = this.setState.bind(this);
        let vac = this.state.vacationDays;
        $.ajax({
            url: '../api/users/' + this.state.data.id + '/vacations?token=' + getToken(),
            success: function (result) {
                let vacDays = 0;
                result.forEach((elem) => {
                    vacDays += elem.days;
                });
                state({ freeVacDays: vac - vacDays });
            },
            error: function (result) { console.log(result); }
        });

    }
    deleteEmploye() {
        let onElementRemove = this.onElementRemove.bind();
        if (confirm("Вы точно хотите удалить пользователя?")) {
            $.ajax({
                url: '../api/users/' + this.state.data.id + '?token=' + getToken(),
                type: 'DELETE',
                success: function (result) {
                    console.log(result);
                    onElementRemove();
                },
                error: function (result) { console.log(result); }
            });
        }
    }

    editEmploye() {
        $('body').append("<div id='edit'></div>");
        ReactDOM.render(
            React.createElement(UserEdit, { user: this.state.data }),
            document.getElementById('edit'),
        );
    }

    userInfoVacation() {
        $('body').append("<div id='info'></div>");
        ReactDOM.render(
            React.createElement(UserVacationDetails, { user: this.state.data }),
            document.getElementById('info'),
        );
    }

    evalVacation() {
        let state = this.setState.bind(this);
        let freeDaysUp = this.freeDaysUp.bind(this);
        $.ajax({
            url: `../api/users/` + this.state.data.id + `?startDate=${this.state.fromDate}&endDate=${this.state.onDate}` + '&token=' + getToken(),
            success: function (result) {
                state({ vacationDays: result });
                freeDaysUp();
            },
            error: function (result) { console.log(result); }
        });

    }

    collapse(e) {
        e.target.classList.toggle("active");
        let content = e.target.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = 30 + "px";
        }
    }

    updateDate(myDatePicker, on) { //true - onDate,false- fromDate
        if (on) {
            this.setState({ onDate: myDatePicker });
        } else {
            this.setState({ fromDate: myDatePicker });
        }
        this.evalVacation();
        this.updateFormula();
    }

    componentDidMount() {
        let myDatePicker = "", myDatePickerFirst = "";
        let updateDate = this.updateDate.bind();
        $('#onDate' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker, true);
            },
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#fromDate' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePickerFirst = formatDateForInput(date.date);
                updateDate(myDatePickerFirst, false);
            },
            autoPick: false,
            startDate: new Date(this.state.data.dateOfEmployment),
            autoHide: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        this.evalVacation();
        this.updateFormula();
    }
    updateFormula() {
        let days = 0;
        let state = this.setState.bind(this);
        $.ajax({
            url: '../api/users/' + this.state.data.id + '/days?startDate=' + this.state.fromDate + '&endDate=' + this.state.onDate + '&token=' + getToken(),
            success: function (result) {
                days = result;
                state({ days: days });
            },
            error: function (result) { console.log(result); }
        });
    }
    addUser() {
        $('body').append("<div id='edit'></div>");
        ReactDOM.render(
            React.createElement(UserForm, { user: this.state.data }),
            document.getElementById('edit'),
        );
    }
    render() {
        if (this.state.data !== null) {
            return React.createElement(
                'div', { className: "userData" },
                React.createElement('div', { className: "userDataSolo" }, this.state.data.surname + " " + this.state.data.name + " " + this.state.data.middlename),
                React.createElement('div', { className: "userDataSolo" }, React.createElement('input', { id: "fromDate" + this.idForInp, "data-toggle": "datepicker", type: 'text', autoComplete: "off", onChange: this.fromDateUpdate, value: this.state.fromDate })),
                React.createElement('div', { className: "userDataSolo" }, React.createElement('input', { id: "onDate" + this.idForInp, "data-toggle": "datepicker", type: 'text', autoComplete: "off", onChange: this.onDateUpdate, value: this.state.onDate })),
                React.createElement('div', { className: "userDataSolo coll" },
                    React.createElement('div', { id: "collapsible", onClick: this.collapse, className: "collapsible" }, Math.round(this.state.vacationDays)),
                    React.createElement('div', { className: "contentColl" }, Math.round(this.state.vacationDays) + '=' + "(" + this.state.days + " / 29.7) * (" + "~28" + " / 12)")
                ),
                React.createElement('div', { className: "userDataSolo" }, this.state.freeVacDays),
                React.createElement('div', { className: "userDataSolo operations" },
                    React.createElement('span', { className: "operation", onClick: this.userInfoVacation }, '🛈'),
                    this.state.role === "admin" ? React.createElement('span', { className: "operation", onClick: this.editEmploye }, '✎') : null,
                    this.state.role === "admin" ? React.createElement('span', { className: "operation", onClick: this.deleteEmploye }, '✘') : null,
                )
            );
        } else {
            return null;
        }

    }
}

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.state = { status: true, name: "", surname: "", middlename: "", login: "", role: "moderator", dateOfEmployment: this.myDatePicker };
        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onMiddlenameChange = this.onMiddlenameChange.bind(this);

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.onDateOfEmploymentChange = this.onDateOfEmploymentChange.bind(this);
        this.close = this.close.bind(this);
        this.updateDate = this.updateDate.bind(this);

    }
    onNameChange(e) {
        this.setState({ name: e.target.value });
    }
    onSurnameChange(e) {
        this.setState({ surname: e.target.value });
    }
    onMiddlenameChange(e) {
        this.setState({ middlename: e.target.value });
    }
    onLoginChange(e) {
        this.setState({ login: e.target.value });
    }
    onRoleChange(e) {
        this.setState({ role: e.target.value });
    }
    onDateOfEmploymentChange(e) {
        this.setState({ dateOfEmployment: e.target.textContent });
    }
    updateDate(myDatePicker) {
        this.setState({ dateOfEmployment: myDatePicker });
    }

    close() {
        this.setState({ status: false });
        $('#edit').remove();
    }
    componentDidMount() {
        let myDatePicker = "";
        let updateDate = this.updateDate.bind();
        $('[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                $(this).text(formatDateForInput(date.date));
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker);
            },
            autoHide: true,
            autoPick: true,
            format: 'dd.mm.YYYY',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
    }

    onSubmit(e) {

        e.preventDefault();
        let name = this.state.name.trim();
        let surname = this.state.surname.trim();
        let middlename = this.state.middlename.trim();
        let dateOfEmployment = this.state.dateOfEmployment.trim();
        let login = this.state.login.trim();
        let role = this.state.role.trim();
        if (!name || !surname || !middlename || !dateOfEmployment || !login || !role) {
            return;
        }
        let user = { name: name, surname: surname, middlename: middlename, login: login, role: role, dateOfEmployment: dateOfEmployment, vacations: [] };
        this.setState({ name: "", surname: "", middlename: "", login: "", role: "moderator", dateOfEmployment: "" });
        $.ajax({
            url: '../api/users' + '?token=' + getToken(),
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(user),
            success: function (result) {
                console.log("USER is added.");
                ReactDOM.unmountComponentAtNode(document.getElementById('content'));
                ReactDOM.render(
                    React.createElement(UserList, null),
                    document.getElementById('content'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();

    }

    render() {
        return this.state.status === true ? React.createElement('div', { className: "editBlock" }, "Добавление",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('form', { onSubmit: this.onSubmit },
                React.createElement('input', { placeholder: 'Фамилия', type: 'text', autoComplete: "off", onChange: this.onSurnameChange, value: this.state.surname }),
                React.createElement('input', { placeholder: 'Имя', type: 'text', autoComplete: "off", onChange: this.onNameChange, value: this.state.name }),
                React.createElement('input', { placeholder: 'Отчество', type: 'text', autoComplete: "off", onChange: this.onMiddlenameChange, value: this.state.middlename }),
                React.createElement('input', { placeholder: 'Логин', type: 'text', autoComplete: "off", onChange: this.onLoginChange, value: this.state.login }),
                React.createElement('select', { className: "form-inp", placeholder: 'Role', type: 'text', autoComplete: "off", onChange: this.onRoleChange, value: this.state.role },
                    React.createElement("option", { value: "moderator" }, "Moder"),
                    React.createElement("option", { value: "user" }, "User")),
                React.createElement('input', { id: "dateOfEmlp", placeholder: 'DateOfEmployment', "data-toggle": "datepicker", type: 'text', autoComplete: "off", onChange: this.onDateOfEmploymentChange, value: this.state.dateOfEmployment }),
                React.createElement('button', { type: 'submit', className: 'postfix' }, 'Добавить')
            )
        ) : null;
    }
}

class UserDataEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = { status: true, role: props.role, login: "", password: "" };
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.close = this.close.bind(this);
    }

    onLoginChange(e) {
        this.setState({ login: e.target.value });
    }
    onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    close() {
        this.setState({ status: false });
        $('#edit').remove();
    }

    onSubmit(e) {
        e.preventDefault();
        let login = this.state.login.trim();
        let password = this.state.password.trim();
        if (!login) {
            return;
        }
        let data = { login: login, password: password };
        this.setState({ login: "", password: "" });
        $.ajax({
            url: '../api/users/' + getId() + '/credentials' + '?token=' + getToken(),
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function (result) {
                console.log("USER is edited.");
                ReactDOM.unmountComponentAtNode(document.getElementById('content'));
                ReactDOM.render(
                    React.createElement(UserList, null),
                    document.getElementById('content'),
                );
            },
            error: function (result) { console.log(result); }
        });
        this.close();

    }

    render() {
        return this.state.status === true ? React.createElement('div', { className: "editBlock" }, "Изменение данных",
            React.createElement('div', { onClick: this.close, className: "close" }, '✖'),
            React.createElement('form', { onSubmit: this.onSubmit },
                React.createElement('input', { placeholder: 'Логин', type: 'text', autoComplete: "off", onChange: this.onLoginChange, value: this.state.login }),
                this.state.role === "admin" ? React.createElement('input', { placeholder: 'Пароль', type: 'password', autoComplete: "off", onChange: this.onPasswordChange, value: this.state.password }) : null,
                React.createElement('button', { type: 'submit', className: 'postfix' }, 'Сохранить')
            )
        ) : null;
    }
}

class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [], role: getRole() };
        this.onAddUser = this.onAddUser.bind(this);
        this.exit = this.exit.bind(this);
        this.editSets = this.editSets.bind(this);
    }


    loadData() {
        let startDate = "2000-02-11", endDate = formatDateForInput(new Date);
        let state = this.setState.bind(this);
        if (getRole() === "moderator" || getRole() === "admin") {
            $.ajax({
                url: `../api/admin/users?=startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}&token=${getToken()}`,
                success: function (result) {
                    state({ users: result });
                },
                error: function (result) { console.log(result); }
            });
        } else {
            $.ajax({
                url: '../api/users?id=' + getId() + '&token=' + getToken(),
                success: function (result) {
                    console.log(result);
                    state({ users: [result] });
                },
                error: function (result) { console.log(result); }
            });
        }

    }
    componentDidMount() {
        this.loadData();
    }
    editSets() {
        $('body').append("<div id='edit'></div>");
        ReactDOM.render(
            React.createElement(UserDataEdit, { role: this.state.role }),
            document.getElementById('edit'),
        );
    }
    onAddUser(user) {
        $('body').append("<div id='edit'></div>");
        ReactDOM.render(
            React.createElement(UserForm, { user: this.state.data }),
            document.getElementById('edit'),
        );
    }
    exit() {
        setToken("");
        setRole("");
        setId("");
        this.setState({ "role": "" });
    }
    render() {
        const role = getRole();
        return getToken() ?
            React.createElement('div', {},
                React.createElement('nav', { className: "navbar navbar-expand-sm bg-dark navbar-dark" },
                    React.createElement('ul', { className: "navbar-nav" },
                        React.createElement('li', { className: "nav-item active" },
                            React.createElement('a', { href: "#", className: "nav-link" }, "Отпуска"),
                        ),
                        React.createElement('li', { className: "nav-item" },
                            React.createElement('a', { href: "", className: "nav-link", onClick: this.exit }, "Выход"),
                        ),
                        React.createElement('li', { className: "nav-item" },
                            React.createElement('a', { href: "#", className: "nav-link", onClick: this.editSets }, "Редактировать данные"),
                        ),
                        role === "admin" ? React.createElement('li', { className: "nav-item" },
                            React.createElement('a', { href: "#", className: "nav-link", onClick: this.onAddUser }, "Добавить"),
                        ) : null,
                    )
                ),
                React.createElement('div', { className: 'usersTable' },
                    React.createElement('div', {},
                        React.createElement('div', { className: "userHead" },
                            React.createElement('div', { className: "userDataSolo head" }, "ФИО"),
                            React.createElement('div', { className: "userDataSolo head" }, "Начальная дата"),
                            React.createElement('div', { className: "userDataSolo head" }, "Конечная дата"),
                            React.createElement('div', { className: "userDataSolo head" }, "Дней Отпуска"),
                            React.createElement('div', { className: "userDataSolo head" }, "Свободные дни отпуска"),
                        )),

                    React.createElement('div', { className: "allUsers" },
                        this.state.users.map(function (user) {
                            return React.createElement(User, { key: Math.random() * Math.random(), user: user, role: role })
                        })
                    )

                )
            ) : null;

    }
}

if (getToken()) {
    ReactDOM.render(
        React.createElement(UserList, null),
        document.getElementById('content')
    );
} else {
    document.location.href = '/log.html';
}
