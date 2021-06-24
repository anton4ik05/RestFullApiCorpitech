
class VacationInDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.vacation, days: props.vacation.days, vacationsArr: props.vacationsArr, dateOrder: "", orderNumber: "", status: true };
        this.idForInp = Math.round(Math.random() * 10000);
        this.quantityDaysUpdate = this.quantityDaysUpdate.bind(this);
    }
    quantityDaysUpdate() {
        let end = new Date(this.state.data.endVacation), start = new Date(this.state.data.startVacation);
        let dates = [
            new Date(start.getFullYear() + "-1-1"),
            new Date(start.getFullYear() + "-1-2"),
            new Date(start.getFullYear() + "-1-7"),
            new Date(start.getFullYear() + "-3-8"),
            new Date(start.getFullYear() + "-5-1"),
            new Date(start.getFullYear() + "-5-9"),
            new Date(start.getFullYear() + "-5-11"),
            new Date(start.getFullYear() + "-7-3"),
            new Date(start.getFullYear() + "-11-7"),
            new Date(start.getFullYear() + "-12-25"),
        ];
       
        let holidays = 0;
        let myDates = getDaysArray(start, end);
        myDates.forEach((date) => {
            dates.forEach((holiday) => {
                if (date.getMonth() == holiday.getMonth() && date.getDate() == holiday.getDate()) {
                    holidays++;
                }
            });
        });
        let days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (days < 0) {
            days = 0;
        }
        this.setState({ days: days - holidays });
    }
    componentDidMount() {

        let vacsInfo = this.state.vacationsArr.find(obj => {
            return obj.id == this.state.data.id;
        });
        if (vacsInfo) {
            this.setState({ orderNumber: vacsInfo.orderNumber, dateOrder: vacsInfo.dateOrder});
        }
        this.quantityDaysUpdate();
        
    }
    render() {
        return this.state.status === true ? React.createElement('div', { className: "infoVacationsBody" },
            React.createElement('div', {}, this.state.days),
            React.createElement('div', { className: "date" }, formatDateForInput(new Date(this.state.data.startWorkYear)) + ' - ' + formatDateForInput(new Date(this.state.data.endWorkYear))),
            React.createElement('div', { className: "date" }, formatDateForInput(new Date(this.state.data.startVacation))),
            React.createElement('div', { className: "date" }, formatDateForInput(new Date(this.state.data.endVacation))),
            React.createElement('div', {}, this.state.orderNumber),
            React.createElement('div', { className: "date" }, formatDateForInput(new Date(parseNewDate(this.state.dateOrder)))),
        ) : null;
        return null;
    }
}
class Vacation extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.datePickerForDocTime = "";
        this.state = {
            data: props.vacation,
            status: true,
            counterVac: 0,
            numOfDoc: props.vacation.orderNumber ? props.vacation.orderNumber: "",
            dateOfDoc: props.vacation.dateOrder,
            startVacation: props.vacation.startVacation,
            endVacation: props.vacation.endVacation,
            quantityDays: Math.floor((new Date(parseNewDate(props.vacation.endVacation)).getTime() - new Date(parseNewDate(props.vacation.startVacation)).getTime()) / (1000 * 60 * 60 * 24)) + 1
        };
        this.updateDate = this.updateDate.bind(this);
        this.quantityDaysUpdate = this.quantityDaysUpdate.bind(this);
        this.removeVact = this.removeVact.bind(this);
        this.numOfDocChange = this.numOfDocChange.bind(this);
        this.dateOfDocChange = this.dateOfDocChange.bind(this);
        this.updateVact = this.updateVact.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.fromDateUpdate = this.fromDateUpdate.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }
    dateOfDocChange() {
        this.setState({ dateOfDoc: this.datePickerForDocTime });
    }
    numOfDocChange(e) {
        this.setState({ numOfDoc: e.target.value });
    }
    onDateUpdate(e) {
        this.setState({ endVacation: this.myDatePicker });
        this.quantityDaysUpdate();
    }

    fromDateUpdate(e) {
        this.setState({ startVacation: this.myDatePickerFirst });
        this.quantityDaysUpdate();
    }

    quantityDaysUpdate() {
        let end = new Date(parseNewDate(this.state.endVacation)), start = new Date(parseNewDate(this.state.startVacation));
        let dates = [
            new Date(start.getFullYear()+"-1-1"),
            new Date(start.getFullYear()+"-1-2"),
            new Date(start.getFullYear()+"-1-7"),
            new Date(start.getFullYear()+"-3-8"),
            new Date(start.getFullYear()+"-5-1"),
            new Date(start.getFullYear()+"-5-9"),
            new Date(start.getFullYear()+"-5-11"),
            new Date(start.getFullYear()+"-7-3"),
            new Date(start.getFullYear()+"-11-7"),
            new Date(start.getFullYear()+"-12-25"),
        ];
        let holidays = 0;
        let myDates = getDaysArray(start, end);
        myDates.forEach((date) => {
            dates.forEach((holiday) => {
                if (date.getMonth() == holiday.getMonth() && date.getDate() == holiday.getDate() ) {
                    holidays++;
                }
            });
        });
        let days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (days < 0) {
            days = 0;
        }
        this.setState({ quantityDays: days - holidays });
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

    componentDidMount() {
        let myDatePicker = "", myDatePickerFirst = "", datePickerForDocTime="";
        let updateDate = this.updateDate.bind();
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
            autoPick: false,
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
    updateVact() {
        if (this.state.counterVac > 0) {
            this.props.onVacationsChange(this.props.index, false);
        } else {
            this.setState({ counterVac: this.state.counterVac + 1 });
        }
    }
    removeVact() {
        this.setState({ status: false });
        this.props.onVacationsChange(this.props.index);
    }

    render() {
        return this.state.status === true ? React.createElement('div', { className: "vacationDays" },
            React.createElement('input', { id: "startVacation" + this.idForInp, className: "fromVac", "data-toggle": "datepicker", onChange: this.fromDateUpdate, value: this.state.startVacation }),
            React.createElement('input', { id: "endVacation" + this.idForInp, className: "toVac", "data-toggle": "datepicker", onChange: this.onDateUpdate, value: this.state.endVacation }),
            React.createElement('input', { id: "quantityDays" + this.idForInp, className: "quanDays", onChange: this.quantityDaysUpdate, value: this.state.quantityDays }),
            React.createElement('input', { id: "numOfDoc" + this.idForInp, placeholder: "Номер", className: "numOfDoc", onChange: this.numOfDocChange, value: this.state.numOfDoc }),
            React.createElement('input', { id: "dateOfDoc" + this.idForInp, className: "dateOfDoc", "data-toggle": "datepicker", onChange: this.dateOfDocChange, value: this.state.dateOfDoc }),
            React.createElement('div', { className: "closeVac", onClick: this.removeVact }, "✖"),

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
            vacationYear: props.user.vacationYear
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onMiddlenameChange = this.onMiddlenameChange.bind(this);
        this.onVacationYearChange = this.onVacationYearChange.bind(this);
        this.onDateOfEmploymentChange = this.onDateOfEmploymentChange.bind(this);
        this.onLoginChange = this.onLoginChange.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);
        this.updateDate = this.updateDate.bind(this);
        this.onVacationsChange = this.onVacationsChange.bind(this);
        this.addVacation = this.addVacation.bind(this);
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
    onVacationYearChange(e) {
        this.setState({ vacationYear: e.target.value });
    }

    onVacationsChange(index, type = true, newVac = null) {
        let myVacs = this.state.vacations;
        if (type) {
            myVacs.splice(index, 1);
            this.setState({ vacations: myVacs });
        } else {
            myVacs[index] = newVac;
            this.setState({ vacations: myVacs });
            console.log(this.state.vacations);
        }
        
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
            months: [
                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь',
                'Декабрь'
            ],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });

        const demo = document.querySelector('#allVacations');
        new PerfectScrollbar(demo,
            {
                wheelSpeed: 0.5,
                suppressScrollX: true,
                useBothWheelAxes: true,
            });
    }

    addVacation() {
        let myVacs = this.state.vacations;
        myVacs.push({ startVacation: formatDateForInput(new Date()), endVacation: formatDateForInput(new Date()) });
        this.setState({ vacations: myVacs });
    }

    putTheEdit(id, user) {
        $.ajax({
            url: '../api/users/' + id,
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
        let myVacations = [];
        for (let i = 0; i < $('#allVacations').find('.vacationDays').length; i++) {
            let startVacation = $($('#allVacations').find('.vacationDays')[i]).find('.fromVac').val();
            let endVacation = $($('#allVacations').find('.vacationDays')[i]).find('.toVac').val();
            let orderNumber = $($('#allVacations').find('.vacationDays')[i]).find('.numOfDoc').val();
            let dateOrder = $($('#allVacations').find('.vacationDays')[i]).find('.dateOfDoc').val();
            myVacations.push({ dateOrder: dateOrder, orderNumber: orderNumber, startVacation: startVacation, endVacation: endVacation });
        }
        let name = this.state.name.trim();
        let surname = this.state.surname.trim();
        let middlename = this.state.middlename.trim();
        let dateOfEmployment = this.state.dateOfEmployment.trim();
        let vacationYear = (this.state.vacationYear + "").trim();
        let login = this.state.login.trim();
        let role = this.state.role.trim();
        if (!name || !surname || !middlename || !dateOfEmployment || !vacationYear || !login || !role) {
            return;
        }
        this.putTheEdit(this.state.data.id, { name: name, surname: surname, middlename: middlename, vacationYear: vacationYear, login: login, role: role, dateOfEmployment: dateOfEmployment, vacations: myVacations });
    }

    render() {
        let onVacationsChange = this.onVacationsChange.bind(this);
        let vacts = this.state.vacations;
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
                React.createElement('input', { placeholder: 'Дней отпуска в год', type: 'Number', autoComplete: "off", onChange: this.onVacationYearChange, value: this.state.vacationYear }),
                React.createElement('input', { id: "dateOfEmlp", placeholder: 'DateOfEmployment', "data-toggle": "datepicker", type: 'text', autoComplete: "off", onChange: this.onDateOfEmploymentChange, value: this.state.dateOfEmployment }),
                React.createElement('div', { id: "vacations", className: "vacations" }, "Все отпуска",
                    React.createElement('div', { id: "allVacations", className: "allVacations" },
                        this.state.vacations.map(function (vacation, index) {
                            return React.createElement(Vacation, { key: Math.random() * Math.random(), vacation: vacation, index: index, onVacationsChange: onVacationsChange });
                        })
                    ),
                    React.createElement('div', { onClick: this.addVacation, className: "addVac" }, "➕")
                ),
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
            vacationsForView:[],
            vacations: props.user.vacations,
        };
        this.close = this.close.bind(this);
    }
    componentDidMount() {
        let state = this.setState.bind(this);
        $.ajax({
            url: '../api/users/getVacations?id=' + this.state.id,
            success: function (result) {
                state({ vacationsForView: result });
            },
            error: function (result) { console.log(result); }
        });
    }
    close() {
        this.setState({ status: false });
        $('#info').remove();
    }

    render() {
        let vacationsForView = this.state.vacationsForView;
        let vacationsArr = this.state.vacations;
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
                    return React.createElement(VacationInDetail, { key: Math.random() * Math.random(), vacationsArr: vacationsArr, vacation: vacation, index: index });
                })
            ),
        ) : null;
    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.state = { data: props.user, vacationDays: 0, freeVacDays: 0, fromDate: formatDateForInput(new Date(parseNewDate(props.user.dateOfEmployment))), onDate: formatDateForInput(new Date()) };
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
        let end = new Date(this.state.data.endVacation), start = new Date(this.state.data.startVacation);
        let dates = [
            new Date(start.getFullYear() + "-1-1"),
            new Date(start.getFullYear() + "-1-2"),
            new Date(start.getFullYear() + "-1-7"),
            new Date(start.getFullYear() + "-3-8"),
            new Date(start.getFullYear() + "-5-1"),
            new Date(start.getFullYear() + "-5-9"),
            new Date(start.getFullYear() + "-5-11"),
            new Date(start.getFullYear() + "-7-3"),
            new Date(start.getFullYear() + "-11-7"),
            new Date(start.getFullYear() + "-12-25"),
        ];

        let holidays = 0;
        let myDates = getDaysArray(start, end);
        myDates.forEach((date) => {
            dates.forEach((holiday) => {
                if (date.getMonth() == holiday.getMonth() && date.getDate() == holiday.getDate()) {
                    holidays++;
                }
            });
        });
        let days = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        if (days < 0) {
            days = 0;
        }
        this.setState({ days: days - holidays });
    }
    freeDaysUp() {
        let state = this.setState.bind(this);
        let vac = this.state.vacationDays;
        $.ajax({
            url: '../api/users/getVacations?id=' + this.state.data.id,
            success: function (result) {
                let vacDays = 0;
                let holidays = 0;
                result.forEach((res) => {
                    let end = new Date(res.endVacation), start = new Date(res.startVacation);
                    let dates = [
                        new Date(start.getFullYear() + "-1-1"),
                        new Date(start.getFullYear() + "-1-2"),
                        new Date(start.getFullYear() + "-1-7"),
                        new Date(start.getFullYear() + "-3-8"),
                        new Date(start.getFullYear() + "-5-1"),
                        new Date(start.getFullYear() + "-5-9"),
                        new Date(start.getFullYear() + "-5-11"),
                        new Date(start.getFullYear() + "-7-3"),
                        new Date(start.getFullYear() + "-11-7"),
                        new Date(start.getFullYear() + "-12-25"),
                    ];
                    let myDates = getDaysArray(start, end);
                    myDates.forEach((date) => {
                        dates.forEach((holiday) => {
                            if (date.getMonth() == holiday.getMonth() && date.getDate() == holiday.getDate()) {
                                holidays++;
                            }
                        });
                    });
                });
                result.forEach((elem) => {
                    vacDays += elem.days;
                });
                state({ freeVacDays: vac - vacDays + holidays });
            },
            error: function (result) { console.log(result); }
        });

    }
    deleteEmploye() {
        let onElementRemove = this.onElementRemove.bind();
        if (confirm("Вы точно хотите удалить пользователя?")) {
            $.ajax({
                url: '../api/users/del?id=' + this.state.data.id,
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
        fetch(`../api/users/` + this.state.data.id + `?startDate=${this.state.fromDate}&endDate=${this.state.onDate}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ vacationDays: result });
                    this.freeDaysUp();

                },
                (error) => {
                    console.log(error)
                }
            )

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
        $('#fromDate' + this.idForInp + '[data-toggle="datepicker"]').datepicker('setDate', new Date(this.state.data.dateOfEmployment));
        this.evalVacation();
        this.updateFormula();
    }
    updateFormula() {
        let days = 0;
        let state = this.setState.bind(this);
        $.ajax({
            url: '../api/users/' + this.state.data.id + '/days?startDate=' + this.state.fromDate + '&endDate=' + this.state.onDate,
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
                    React.createElement('div', { className: "contentColl" }, Math.round(this.state.vacationDays) + '=' + "(" + this.state.days + " / 29.7) * (" + this.state.data.vacationYear + " / 12)")
                ),
                React.createElement('div', { className: "userDataSolo" }, this.state.freeVacDays),
                React.createElement('div', { className: "userDataSolo operations" },
                    React.createElement('span', { className: "operation", onClick: this.userInfoVacation }, '🛈'),
                    React.createElement('span', { className: "operation", onClick: this.editEmploye }, '✎'),
                    React.createElement('span', { className: "operation", onClick: this.deleteEmploye }, '✘'),
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
        this.state = { status: true, name: "", surname: "", middlename: "", login: "", role: "moderator", vacationYear: "28", dateOfEmployment: this.myDatePicker };
        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onMiddlenameChange = this.onMiddlenameChange.bind(this);

        this.onLoginChange = this.onLoginChange.bind(this);
        this.onRoleChange = this.onRoleChange.bind(this);

        this.onVacationYearChange = this.onVacationYearChange.bind(this);
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
    onVacationYearChange(e) {
        this.setState({ vacationYear: e.target.value });
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
        let vacationYear = this.state.vacationYear.trim();
        let login = this.state.login.trim();
        let role = this.state.role.trim();
        if (!name || !surname || !middlename || !dateOfEmployment || !vacationYear || !login || !role) {
            return;
        }
        let user = { name: name, surname: surname, middlename: middlename, vacationYear: vacationYear, login: login, role: role, dateOfEmployment: dateOfEmployment, vacations: [] };
        this.setState({ name: "", surname: "", middlename: "", login: "", role: "", vacationYear: "", dateOfEmployment: "" });
        $.ajax({
            url: '../api/users',
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
                React.createElement('input', { placeholder: 'Дней отпуска в год', type: 'Number', autoComplete: "off", onChange: this.onVacationYearChange, value: this.state.vacationYear }),
                React.createElement('input', { id: "dateOfEmlp", placeholder: 'DateOfEmployment', "data-toggle": "datepicker", type: 'text', autoComplete: "off", onChange: this.onDateOfEmploymentChange, value: this.state.dateOfEmployment }),
                React.createElement('button', { type: 'submit', className: 'postfix' }, 'Добавить')
            )
        ) : null;
    }
}


class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.onAddUser = this.onAddUser.bind(this);
    }


    loadData() {
        let startDate = "2000-02-11", endDate = formatDateForInput(new Date);
        fetch(`../api/users?=startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ users: result });
                },
                (error) => {
                    console.log(error)
                }
            )

    }
    componentDidMount() {
        this.loadData();
    }

    onAddUser(user) {
        $('body').append("<div id='edit'></div>");
        ReactDOM.render(
            React.createElement(UserForm, { user: this.state.data }),
            document.getElementById('edit'),
        );
    }

    render() {

        return getToken()? React.createElement('div', {},
            React.createElement('div', { className: "addButton", onClick: this.onAddUser }, "Добавить"),
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
                        return React.createElement(User, { key: Math.random() * Math.random(), user: user })
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
