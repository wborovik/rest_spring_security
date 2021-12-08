const usersTable = $('#getTable');
const userForm = $('#editModal');
const userAddForm = $('#addUser');

const roleList = [
    {id: 1, role: "ROLE_ADMIN"},
    {id: 2, role: "ROLE_USER"}
];

let checkAddRoles = () => {
    let array = [];
    let options = document.querySelector('#newRoles').options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            array.push(roleList[i])
        }
    }
    return array;
};

let checkEditRoles = () => {
    let array = [];
    let options = document.querySelector('#roles').options;
    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            array.push(roleList[i])
        }
    }
    return array;
};

$('#usersTableLink').click(() => {
    switchUsersTable();
});

$('#userFormLink').click(() => {
    switchAddForm();
});

userAddForm.find(':submit').click(() => {
    saveUser();
});

function switchUsersTable() {
    $('#usersTableLink').addClass('active');
    $('#navUsersTable').addClass('show').addClass('active');
    $('#userFormLink').removeClass('active');
    $('#navUserForm').removeClass('show').removeClass('active');
    getAllUsers();
}

function initNavigation() {
    $('#adminAreaTab').click(() => {
        $('#adminAreaTab').addClass('active').removeClass('btn-light').addClass('btn-primary')
            .prop('aria-selected', true);
        $('#adminArea').addClass('active');
        $('#userAreaTab').removeClass('active').removeClass('btn-primary').addClass('btn-light')
            .prop('aria-selected', false);
        $('#userArea').removeClass('active');
    });

    $('#userAreaTab').click(() => {
        $('#userAreaTab').addClass('active').removeClass('btn-light').addClass('btn-primary')
            .prop('aria-selected', true);
        $('#userArea').addClass('active');
        $('#adminAreaTab').removeClass('active').removeClass('btn-primary').addClass('btn-light')
            .prop('aria-selected', false);
        $('#adminArea').removeClass('active');
    });
}

function switchAddForm() {
    $('#userFormLink').addClass('active');
    $('#navUserForm').addClass('show').addClass('active');
    $('#usersTableLink').removeClass('active');
    $('#navUsersTable').removeClass('show').removeClass('active');
    valueNewUser();
}

function getAllUsers() {
    fetch('admin/api/users').then(function (response) {
        if (response.ok) {
            response.json().then(users => {
                usersTable.empty();
                users.forEach(user => {
                    showUsers(user);
                });
            });
        }
    });
}

function showUsers(user) {
    let roleName = user.roles.map(role => " " + role.role.substr(5));

    usersTable.append($('<tr>').attr('id', 'userRow[' + user.id + ']')
        .append($('<td>').attr('id', 'userData[' + user.id + '][id]').text(user.id))
        .append($('<td>').attr('id', 'userData[' + user.id + '][name]').text(user.name))
        .append($('<td>').attr('id', 'userData[' + user.id + '][surname]').text(user.surname))
        .append($('<td>').attr('id', 'userData[' + user.id + '][email]').text(user.email))
        .append($('<td>').attr('id', 'userData[' + user.id + '][roles]').text(roleName))
        .append($('<td>').append($('<button class="btn btn-info editButton" id="editModal">').click(() => {
            loadModalForm(user.id);
        }).text('Edit')))
        .append($('<td>').append($('<button class="btn btn-danger">').click(() => {
            loadModalForm(user.id, false);
        }).text('Delete')))
    );
}

function readonlyValue(value = true) {
    userForm.find('#name').prop('readonly', value);
    userForm.find('#surname').prop('readonly', value);
    userForm.find('#email').prop('readonly', value);
    userForm.find('#password').prop('readonly', value);
    userForm.find('#roles').prop('disabled', value);
}

function updateUser(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    let user = {
        'id': parseInt(userForm.find('#id').val()),
        'name': userForm.find('#name').val(),
        'surname': userForm.find('#surname').val(),
        'email': userForm.find('#email').val(),
        'password': userForm.find('#password').val(),
        'roles': checkEditRoles()
    };

    let request = new Request('admin/api/users/', {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(user)
    });

    fetch(request).then(function (response) {
        response.json().then(function (userData) {
            userForm.modal('hide');

            $('#userData\\[' + userData.id + '\\]\\[name\\]').text(userData.name);
            $('#userData\\[' + userData.id + '\\]\\[surname\\]').text(userData.surname);
            $('#userData\\[' + userData.id + '\\]\\[email\\]').text(userData.email);
            $('#userData\\[' + userData.id + '\\]\\[password\\]').text(userData.password);
            $('#userData\\[' + userData.id + '\\]\\[roles\\]')
                .text(userData.roles.map(role => " " + role.role.substr(5)));
        });
    })
}

function loadModalForm(id, editMode = true) {
    fetch('admin/api/user/' + id, {method: 'GET'}).then(function (response) {
        response.json().then(function (user) {
            userForm.find('#id').val(id);
            userForm.find('#name').val(user.name);
            userForm.find('#surname').val(user.surname);
            userForm.find('#email').val(user.email);
            userForm.find('#password').val(user.password);

            if (editMode) {
                userForm.find('.modal-title').text('Edit user');
                userForm.find('#password-div').show();
                userForm.find('.submit').text('Edit').removeClass('btn-danger').addClass('btn-primary')
                    .removeAttr('onClick')
                    .attr('onClick', 'updateUser(' + id + ');');
                readonlyValue(false);
            } else {
                userForm.find('.modal-title').text('Delete user');
                userForm.find('#password-div').hide();
                userForm.find('.submit').text('Delete').removeClass('btn-primary').addClass('btn-danger')
                    .removeAttr('onClick')
                    .attr('onClick', 'deleteUser(' + id + ');');
                readonlyValue();
            }

            fetch('admin/api/roles').then(function (response) {
                if (response.ok) {
                    userForm.find('#roles').empty();
                    response.json().then(roleList => {
                        roleList.forEach(role => {
                            userForm.find('#roles')
                                .append($('<option>')
                                    .prop('selected', user.roles.filter(e => e.id === role.id).length)
                                    .val(role.id).text(role.role));
                        });
                    });
                }
            });
            userForm.modal();
        });
    })
}

function valueNewUser() {
    userAddForm.find('#newName').val('');
    userAddForm.find('#newSurname').val('');
    userAddForm.find('#newEmail').val('');
    userAddForm.find('#newPassword').val('');
}

function saveUser() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    let user = {
        'name': userAddForm.find('#newName').val(),
        'surname': userAddForm.find('#newSurname').val(),
        'email': userAddForm.find('#newEmail').val(),
        'password': userAddForm.find('#newPassword').val(),
        'roles': checkAddRoles()
    };

    let request = new Request('admin/api/users/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(user)
    });

    fetch(request).then(function (response) {
        response.json().then(function (userData) {
            console.log(userData);

            switchUsersTable();
        });
    });
}

function deleteUser(id) {
    fetch('admin/api/user/' + id, {method: 'DELETE'}).then(function () {
        userForm.modal('hide');
        usersTable.find('#userRow\\[' + id + '\\]').remove();
    });
}

$(document).ready(
    () => {
        getAllUsers();
        initNavigation();
    }
);
