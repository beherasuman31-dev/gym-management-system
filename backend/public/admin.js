// Load Users
function loadUsers() {

    fetch("/users")
    .then(res => res.json())
    .then(data => {

        let table = document.getElementById("userTable");
        table.innerHTML = "";

        data.forEach(user => {

            table.innerHTML += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.gender}</td>
                    <td>${user.plan}</td>
                    <td>${user.amount}</td>
                    <td>${user.join_date}</td>

                    <td>
                        <button class="delete"
                        onclick="deleteUser(${user.id})">
                        Delete
                        </button>
                    </td>
                </tr>
            `;

        });

    });

}

// Delete User
function deleteUser(id){

    fetch(`/delete-user/${id}`,{
        method:"DELETE"
    })
    .then(res => res.json())
    .then(data => {
        alert(data.message);
        loadUsers();
    });

}

loadUsers();

setInterval(() => {
   loadUsers();
}, 3000);