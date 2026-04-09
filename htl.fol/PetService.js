// 1. Fixed the path (added the /)
import { Pet } from './Pet.js'; 

class PetService {
    constructor() {
        this.storageKey = 'paws_hearts_data';
    }

    async fetchAll() {
        const rawData = localStorage.getItem(this.storageKey);
        const data = rawData ? JSON.parse(rawData) : [];
        return data.map(item => new Pet(item));
    }

    async save(petData) {
        const pets = await this.fetchAll();
        const newPet = new Pet(petData);
        pets.push(newPet);
        localStorage.setItem(this.storageKey, JSON.stringify(pets));
        return newPet;
    }

    async delete(index) {
        const pets = await this.fetchAll();
        const idx = Number(index);
        if (idx >= 0 && idx < pets.length) {
            pets.splice(idx, 1);
            localStorage.setItem(this.storageKey, JSON.stringify(pets));
            return true;
        }
        return false;
    }

    async update(index, updatedData) {
        const pets = await this.fetchAll();
        const idx = Number(index);
        if (pets[idx]) {
            const merged = { ...pets[idx], ...updatedData };
            pets[idx] = new Pet(merged);
            localStorage.setItem(this.storageKey, JSON.stringify(pets));
            return true;
        }
        return false;
    }
}

// 2. Fixed the export name to lowercase 'petService' to match your other files
export const petService = new PetService();