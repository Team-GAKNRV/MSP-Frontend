import { GetClothingItem } from "./clothing.interface";

export interface GetOutfit {
    _id: string;
    pieces: GetClothingItem[];
    isFavorite: boolean;
}

export interface AddOutfit {
    pieces: string[];
    isFavorite: boolean;
}
