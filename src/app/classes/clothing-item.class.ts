export class ClothingItem {
    public name: string;
    public image: string;
    public brand: string;
    public color: string;
    public masterCategory: string;
    public subCategory: string;
    public type: string;
    public season: string;
    public usage: string;
    public isFavorite: boolean;

    constructor(name: string, image: string, brand: string, color: string, masterCategory: string, subCategory: string, type: string, season: string, usage: string, isFavorite: boolean) {
        this.name = name;
        this.image = image;
        this.brand = brand;
        this.color = color;
        this.masterCategory = masterCategory;
        this.subCategory = subCategory;
        this.type = type;
        this.season = season;
        this.usage = usage;
        this.isFavorite = isFavorite;
    }
}
