getData();

async function getData() {
    const tableBody = document.getElementById('tableData');

    const response = await fetch('/api');
    const personData = await response.json();

    let dataHTML = '';

    (personData).forEach(person => {
        const dateString = new Date(person.timeStamp).toLocaleString();

        dataHTML += `
        <tr>
            <td>${person.nombre}</td>
            <td>${person.apellido}</td>
            <td>${person.edad}</td>
            <td>${person.genero}</td>
            <td>${person.telefono}</td>
            <td>${person.email}</td>
            <td>${person.tienePC}</td>
            <td>${dateString}</td>
        </tr>`
    });

    tableBody.innerHTML = dataHTML;
    $('.personDataTable').DataTable();
}