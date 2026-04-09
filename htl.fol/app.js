import { petService } from './PetService.js';

const tableBody = document.getElementById('petsTableBody');
const editModal = document.getElementById('editModal');

const render = async () => {
    const pets = await petService.fetchAll();
    const totalCount = document.getElementById('totalCount');
    if (totalCount) totalCount.innerText = pets.length;

    if (!tableBody) return;
    tableBody.innerHTML = ''; 

    if (pets.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;">No pets added yet.</td></tr>';
        return;
    }

    pets.forEach((pet, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${pet.name}</td>
            <td>${pet.type}</td>
            <td>${pet.breed}</td>
            <td>${pet.age}</td>
            <td>${pet.description}</td>
            <td style="text-align: center;">
                <button class="action-btn edit-btn">Edit</button>
                <button class="action-btn delete-btn">Delete</button>
            </td>
        `;

        // Attach Delete Logic
        row.querySelector('.delete-btn').onclick = async () => {
            if (confirm(`Delete ${pet.name}?`)) {
                await petService.delete(index);
                render(); 
            }
        };

        // Attach Edit Logic
        row.querySelector('.edit-btn').onclick = () => {
            document.getElementById('editIndex').value = index;
            document.getElementById('editName').value = pet.name;
            document.getElementById('editType').value = pet.type;
            document.getElementById('editBreed').value = pet.breed;
            document.getElementById('editAge').value = pet.age;
            document.getElementById('editDesc').value = pet.description;
            editModal.style.display = 'flex';
        };

        tableBody.appendChild(row);
    });
};

// Handle Save in Modal
document.getElementById('saveBtn')?.addEventListener('click', async () => {
    const index = document.getElementById('editIndex').value;
    const updatedData = {
        name: document.getElementById('editName').value,
        type: document.getElementById('editType').value,
        breed: document.getElementById('editBreed').value,
        age: document.getElementById('editAge').value,
        description: document.getElementById('editDesc').value
    };

    await petService.update(index, updatedData);
    editModal.style.display = 'none';
    render();
});

document.getElementById('cancelBtn')?.addEventListener('click', () => {
    editModal.style.display = 'none';
});

document.addEventListener('DOMContentLoaded', render);