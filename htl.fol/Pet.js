export class Pet {
    constructor(data) {
        this.id = data.id || Date.now();
        this.name = data.name;
        this.type = data.type;
        this.breed = data.breed;
        this.status = data.status || 'Available';

        this.age = parseInt(data.age) || 0;
        this.description = data.description ||"";
    }
}