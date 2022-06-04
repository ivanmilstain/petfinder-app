class Visualization {
    constructor(id, type, color, gender, age, size, hair, collar, lat, lng, date, filtered) {
        this.id = id.toString();
        this.type = type;
        this.color = color;
        this.gender = gender;
        this.age = age;
        this.size = size;
        this.hair = hair;
        this.collar = collar;
        this.lat = lat;
        this.lng = lng;
        this.date = date;
        this.filtered = filtered
    }
}

export default Visualization;