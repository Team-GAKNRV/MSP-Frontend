export interface GetClothingItem {
    _id: string;
    name: string;
    image: string;
    brand: string;
    color: string;
    masterCategory: string;
    subCategory: string;
    type: string;
    season: string;
    usage: string;
    isFavorite: boolean;
}

export interface AddClothingItem {
    name: string;
    image: string;
    brand: string;
    color: string;
    masterCategory: string;
    subCategory: string;
    type: string;
    season: string;
    usage: string;
    isFavorite: boolean;
}

export interface ClothingItemToReplace {
    position: number;
    clothingItemData: GetClothingItem;
}
