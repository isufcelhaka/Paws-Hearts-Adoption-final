import { petService } from './PetService.js';

// FIX: Changed 'addpetForm' to 'addPetForm' to match the HTML ID
const form = document.getElementById('addPetForm'); 

if (form) {
    form.addEventListener('submit', async (e) => {
        // This stops the browser from adding ?name=... to the URL
        e.preventDefault();

        const formData = new FormData(form);
        const newPetData = Object.fromEntries(formData.entries());

        // Saves to LocalStorage
        await petService.save(newPetData);

        alert('Pet added successfully!');

        // Redirects to Dashboard
        window.location.href = 'index.html'; 
    });
} else {
    // This will help you debug if the ID is still wrong
    console.error("Form not found! Check if the ID in HTML is 'addPetForm'.");
}