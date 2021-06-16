function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

function formatDateForInput(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return yy + '-' + mm + '-' + dd;
}

function objToQueryString(obj) {
    const keyValuePairs = [];
    for (const key in obj) {
        keyValuePairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
    return keyValuePairs.join('&');
}
class Vacation extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.state = { data: props.vacation, status: true, startVacation: props.vacation.startVacation, endVacation: props.vacation.endVacation };
        this.updateDate = this.updateDate.bind(this);
        this.removeVact = this.removeVact.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }

    onDateUpdate(e) {
        this.setState({ onDate: this.myDatePicker });
    }

    fromDateUpdate(e) {
        this.setState({ fromDate: this.myDatePickerFirst });
    }

    updateDate(myDatePicker, on) { //true - endVacation,false- start
        if (on) {
            this.setState({ endVacation: myDatePicker });
        } else {
            this.setState({ startVacation: myDatePicker });
        }
    }

    componentDidMount() {
        let myDatePicker = "", myDatePickerFirst = "";
        let updateDate = this.updateDate.bind();
        $('#endVacation' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker, true);
            },
            autoPick: true,
            autoHide: true,
            format: 'YYYY-mm-dd',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#startVacation' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePickerFirst = formatDateForInput(date.date);
                updateDate(myDatePickerFirst, false);
            },
            autoPick: false,
            autoHide: true,
            format: 'YYYY-mm-dd',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#startVacation' + this.idForInp + '[data-toggle="datepicker"]').datepicker('setDate', new Date(this.state.startVacation));
    }
    removeVact() {
        this.setState({ status: false });
    }

    render() {
        return this.state.status === true ? React.createElement('div', { className: "vacationDays" },
            React.createElement('input', { id: "startVacation" + this.idForInp, className:"fromVac", "data-toggle": "datepicker", onChange: this.fromDateUpdate, value: this.state.startVacation }),
            React.createElement('input', { id: "endVacation" + this.idForInp, className: "toVac", "data-toggle": "datepicker", onChange: this.onDateUpdate, value: this.state.endVacation }),
            React.createElement('div', { className:"closeVac",onClick: this.removeVact }, "✖"),

        ) : null;
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
        this.updateDate = this.updateDate.bind(this);
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
            pick: function(date, view) {
                $(this).text(formatDateForInput(date.date));
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker);
            },

            autoHide: true,
            autoPick: true,
            format: 'YYYY-mm-dd',
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
        console.log(user);
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
            myVacations.push({ startVacation: startVacation, endVacation: endVacation });
        }
        let name = this.state.name.trim();
        let surname = this.state.surname.trim();
        let middlename = this.state.middlename.trim();
        let dateOfEmployment = this.state.dateOfEmployment.trim();
        let vacationYear = (this.state.vacationYear+"").trim();
        if (!name || !surname || !middlename || !dateOfEmployment || !vacationYear) {
            return;
        }
        this.putTheEdit(this.state.data.id, { name: name, surname: surname, middlename: middlename, vacationYear:vacationYear,dateOfEmployment: dateOfEmployment, vacations: myVacations });
    }

    render() {

        return this.state.status === true ?  React.createElement(
            'div', { className: "editBlock" }, "Редактирование",
            React.createElement('div', { onClick:this.close, className: "close" }, '✖'),
            React.createElement('form', { onSubmit: this.onSubmit },
                React.createElement('input', { placeholder: 'Surname', type: 'text', autoComplete:"off", onChange: this.onSurnameChange, value: this.state.surname }),
                React.createElement('input', { placeholder: 'Name', type: 'text', autoComplete:"off", onChange: this.onNameChange, value: this.state.name }),
                React.createElement('input', { placeholder: 'Middlename', type: 'text', autoComplete:"off", onChange: this.onMiddlenameChange, value: this.state.middlename }),
                React.createElement('input', { placeholder: 'Дней отпуска в год', type: 'text', autoComplete:"off", onChange: this.onVacationYearChange, value: this.state.vacationYear }),
                React.createElement('input', { id: "dateOfEmlp", placeholder: 'DateOfEmployment', "data-toggle": "datepicker", type: 'text', autoComplete:"off", onChange: this.onDateOfEmploymentChange, value: this.state.dateOfEmployment }),
                React.createElement('div', { id: "vacations", className: "vacations" }, "Все отпуска",
                    React.createElement('div', { id: "allVacations", className:"allVacations" },
                        this.state.vacations.map(function (vacation) {
                              return React.createElement(Vacation, { key: Math.random() * Math.random(), vacation: vacation })
                         })
                    ),
                    React.createElement('div', { onClick:this.addVacation,className: "addVac" }, "➕")
                ),
                React.createElement('button', { type: 'submit', className: 'postfix' }, 'Изменить')
            ),
        ) :  null;


    }
}

class User extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.state = { data: props.user, vacationDays: 0, fromDate: formatDateForInput(new Date(props.user.dateOfEmployment)), onDate: formatDateForInput(new Date()) };
        this.updateDate = this.updateDate.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.deleteEmploye = this.deleteEmploye.bind(this);
        this.onElementRemove = this.onElementRemove.bind(this);
        this.editEmploye = this.editEmploye.bind(this);
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
            React.createElement(UserEdit, { user: this.state.data}),
            document.getElementById('edit'),
        );
    }

    evalVacation() {
        fetch(`../api/users/` + this.state.data.id + `?startDate=${encodeURIComponent(this.state.fromDate)}&endDate=${encodeURIComponent(this.state.onDate)}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({ vacationDays: result });

                },
                (error) => {
                    console.log(error)
                }
            )

    }

    updateDate(myDatePicker, on) { //true - onDate,false- fromDate
        if (on) {
            this.setState({ onDate: myDatePicker });
        } else {
            this.setState({ fromDate: myDatePicker });
        }
        this.evalVacation();
    }

    componentDidMount() {
        let myDatePicker = "", myDatePickerFirst = "";
        let updateDate = this.updateDate.bind();
        $('#onDate' + this.idForInp + '[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker, true);
            },
            autoPick: true,
            autoHide: true,
            format: 'YYYY-mm-dd',
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
            'setDate': new Date(this.state.data.dateOfEmployment),
            autoPick: false,
            autoHide: true,
            format: 'YYYY-mm-dd',
            days: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            daysShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            daysMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            months: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthsShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        });
        $('#fromDate' + this.idForInp + '[data-toggle="datepicker"]').datepicker('setDate', new Date(this.state.data.dateOfEmployment));
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
                'tr', null,
                React.createElement('td', {}, this.state.data.surname + " " + this.state.data.name + " " + this.state.data.middlename),
                React.createElement('td', {}, React.createElement('input', { id: "fromDate" + this.idForInp, "data-toggle": "datepicker", type: 'text', autoComplete:"off", onChange: this.fromDateUpdate, value: this.state.fromDate })),
                React.createElement('td', {}, Math.round(this.state.vacationDays)),
                React.createElement('td', {}, React.createElement('input', { id: "onDate" + this.idForInp, "data-toggle": "datepicker", type: 'text', autoComplete:"off", onChange: this.onDateUpdate, value: this.state.onDate })),
                React.createElement('td', { className: "operations" },
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
        this.state = { status: true, name: "", surname: "", middlename: "", vacationYear: "28", dateOfEmployment: this.myDatePicker };
        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onMiddlenameChange = this.onMiddlenameChange.bind(this);
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
            format: 'YYYY-mm-dd',
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
        if (!name || !surname || !middlename || !dateOfEmployment || !vacationYear) {
            return;
        }
        let user={ name: name, surname: surname, middlename: middlename, vacationYear:vacationYear,dateOfEmployment: dateOfEmployment, vacations: [] };
        this.setState({ name: "", surname: "", middlename: "", vacationYear: "", dateOfEmployment: "" });
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
                React.createElement('input', { placeholder: 'Surname', type: 'text', autoComplete:"off", onChange: this.onSurnameChange, value: this.state.surname }),
                React.createElement('input', { placeholder: 'Name', type: 'text', autoComplete:"off", onChange: this.onNameChange, value: this.state.name }),
                React.createElement('input', { placeholder: 'Middlename', type: 'text', autoComplete:"off", onChange: this.onMiddlenameChange, value: this.state.middlename }),
                React.createElement('input', { placeholder: 'Дней отпуска в год', type: 'text', autoComplete:"off", onChange: this.onVacationYearChange, value: this.state.vacationYear }),
                React.createElement('input', { id: "dateOfEmlp", placeholder: 'DateOfEmployment', "data-toggle": "datepicker", type: 'text', autoComplete:"off", onChange: this.onDateOfEmploymentChange, value: this.state.dateOfEmployment }),
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
        console.log("as");
        $('body').append("<div id='edit'></div>");
        ReactDOM.render(
            React.createElement(UserForm, { user: this.state.data }),
            document.getElementById('edit'),
        );
    }

    render() {

        return React.createElement('div', {},
            React.createElement('div', { className:"addButton",onClick: this.onAddUser }, "Добавить"),
            React.createElement('table', { className: 'usersTable' }, React.createElement('caption', {}, 'Работники'),
                React.createElement('thead', {},
                    React.createElement('tr', {},
                        React.createElement('th', {}, "ФИО"),
                        React.createElement('th', {}, "Начальная дата"),
                        React.createElement('th', {}, "Дней Отпуска"),
                        React.createElement('th', {}, "Конечная дата"))),
                React.createElement('tbody', {},
                    this.state.users.map(function (user) {
                        return React.createElement(User, { key: Math.random() * Math.random(), user: user })
                    })
                )

            )
        )

    }
}


ReactDOM.render(
    React.createElement(UserList, null),
    document.getElementById('content'),
);