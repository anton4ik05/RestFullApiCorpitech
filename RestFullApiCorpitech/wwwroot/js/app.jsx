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

class User extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.myDatePickerFirst = "";
        this.state = { data: props.user, fromDate: this.myDatePickerFirst, onDate: this.myDatePicker };
        this.updateDate = this.updateDate.bind(this);
        this.onDateUpdate = this.onDateUpdate.bind(this);
        this.idForInp = Math.round(Math.random() * 10000);
    }

    onDateUpdate(e) {
        this.setState({ onDate: this.myDatePicker });
    }

    updateDate(myDatePicker) {
        this.setState({ onDate: myDatePicker });
    }
    componentDidMount() {
        let myDatePicker = "";
        let updateDate = this.updateDate.bind();
        $('#date' + this.idForInp+'[data-toggle="datepicker"]').datepicker({
            pick: function (date, view) {
                myDatePicker = formatDateForInput(date.date);
                updateDate(myDatePicker);
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
    }

    render() {
        return React.createElement(
            'tr', null,
            React.createElement('td', {}, this.state.data.surname + " " + this.state.data.name + " " + this.state.data.middlename),
            React.createElement('td', {}, formatDate(new Date(this.state.data.dateOfEmployment))),
            React.createElement('td', {}, Math.round(this.state.data.days)),
            React.createElement('td', {}, React.createElement('input', { id: "date" + this.idForInp, "data-toggle": "datepicker", type: 'text', onChange: this.onDateUpdate, value: this.state.onDate })),

        );
    }
}

class UserForm extends React.Component {
    constructor(props) {
        super(props);
        this.myDatePicker = "";
        this.state = { name: "", surname: "", middlename: "", dateOfEmployment: this.myDatePicker };
        this.onSubmit = this.onSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onSurnameChange = this.onSurnameChange.bind(this);
        this.onMiddlenameChange = this.onMiddlenameChange.bind(this);
        this.onDateOfEmploymentChange = this.onDateOfEmploymentChange.bind(this);
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
    onDateOfEmploymentChange(e) {
        this.setState({ dateOfEmployment: e.target.textContent });
    }
    updateDate(myDatePicker) {
        this.setState({ dateOfEmployment: myDatePicker });
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
        var name = this.state.name.trim();
        var surname = this.state.surname.trim();
        var middlename = this.state.middlename.trim();
        var dateOfEmployment = this.myDatePicker.trim();
        if (!name || !surname || !middlename || !dateOfEmployment) {
            return;
        }
        this.props.onUserSubmit({ name: name, surname: surname, middlename: middlename, dateOfEmployment: dateOfEmployment, vacations: [] });
        this.setState({ name: "", surname: "", middlename: "", dateOfEmployment: "" });
    }

    render() {
        return React.createElement('form', { onSubmit: this.onSubmit },
            React.createElement('input', { placeholder: 'Name', type: 'text', onChange: this.onNameChange, value: this.state.name }),
            React.createElement('input', { placeholder: 'Surname', type: 'text', onChange: this.onSurnameChange, value: this.state.surname }),
            React.createElement('input', { placeholder: 'Middlename', type: 'text', onChange: this.onMiddlenameChange, value: this.state.middlename }),
            React.createElement('input', { id: "dateOfEmlp", placeholder: 'DateOfEmployment', "data-toggle": "datepicker", type: 'text', onChange: this.onDateOfEmploymentChange, value: this.state.dateOfEmployment }),
            React.createElement('button', { type: 'submit', className: 'postfix' }, 'Добавить')
        )
    }
}


class UserList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { users: [] };
        this.onAddUser = this.onAddUser.bind(this);
        // this.onRemoveUser = this.onRemoveUser.bind(this);
    }
    loadData() {
        let startDate = "2000-02-11", endDate = formatDateForInput(new Date);
        console.log(endDate);
        fetch(`../api/users?=startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`, {
            method: "GET",
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({ users: result });
                },
                (error) => {
                    console.log(error)
                }
            )
        /*fetch("../users")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    this.setState({ users: result });
                },
                (error) => {
                    console.log(error)
                }
            )*/

    }
    componentDidMount() {
        this.loadData();
        /*$('[data-toggle="datepicker"]').datepicker({
            language: 'ru-RU'
        });*/
    }

    onAddUser(user) {

        if (user) {
            const data = new FormData();
            data.append("Name", user.name);
            data.append("Surname", user.surname);
            data.append("Middlename", user.middlename);
            data.append("dateOfEmployment", user.dateOfEmployment);
            data.append("vacations", user.vacations);
            console.log(data);
            fetch('../api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json; charset=utf-8',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify(user),
            }).then((response) => response.json())
                .then((responseJson) => {
                    console.log('Success:', JSON.stringify(responseJson));
                    this.loadData();
                })
                .catch(error => console.error('Error:', error));
        }
    }

    render() {

        return React.createElement('div', {},
            React.createElement(UserForm, { onUserSubmit: this.onAddUser }),
            React.createElement('table', { className: 'usersTable' }, React.createElement('caption', {}, 'Работники'),
                React.createElement('thead', {},
                    React.createElement('tr', {},
                        React.createElement('th', {}, "ФИО"),
                        React.createElement('th', {}, "Дата трудоустройства"),
                        React.createElement('th', {}, "Дней Отпуска"),
                        React.createElement('th', {}, "На дату"))),
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