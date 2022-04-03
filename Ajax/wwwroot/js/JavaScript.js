$(() => {
    loadPeople();
    $("#first-name, #last-name, #age").on('keyup', () => {
        const isValid = $("#first-name").val() && $("#last-name").val() && $("#age").val();
        $("#add-person").prop('disabled', !isValid);
    });

    $("#add-person").on('click', function () {
        const firstName = $("#first-name").val();
        const lastName = $("#last-name").val();
        const age = $("#age").val();

        $.post("/home/addperson", { firstName, lastName, age }, function () {
            loadPeople();
            $("#first-name").val('');
            $("#last-name").val('');
            $("#age").val('');
        })
    })

    $("#people-table").on('click', "#edit-button", function () {
        $("#id").val($(this).data("id"));
        $("#edit-first-name").val($(this).data("first-name"));
        $("#edit-last-name").val($(this).data("last-name"));
        $("#edit-age").val($(this).data("age"));
        $(".modal").modal();

    })

    $("#save").on('click', function () {
        const id = $("#id").val();
        const firstName = $("#edit-first-name").val();
        const lastName = $("#edit-last-name").val();
        const age = $("#edit-age").val();
        $.post("/home/updateperson", { id, firstName, lastName, age }, function () {
            loadPeople();
        })
        $(".modal").modal('hide');

    })

    $("#people-table").on('click', "#delete-button", function () {
        const id = $(this).data('id');
        $.post('/home/deleteperson', { id }, function () {
            loadPeople();
        })
    })

    function loadPeople() {
        $.get("/home/getall", function (people) {
            $("#people-table tr:gt(0)").remove();
            people.forEach(person => {
                $("#people-table tbody").append(
                    `<tr>
    <td>${person.firstName}</td>
    <td>${person.lastName}</td>
    <td>${person.age}</td>
    <td>
        <button data-id="${person.id}" data-first-name="${person.firstName}" 
        data-last-name="${person.lastName}" data-age="${person.age}"
        id ="edit-button" class= "btn btn-info btn-block">Edit</button >
    </td>
    <td>
        <button data-id="${person.id}" id="delete-button" class="btn btn-danger btn-block">Delete</button>
    </td>
                    </tr>`)
            })
        })
    }
})