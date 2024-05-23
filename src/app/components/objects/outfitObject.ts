import {clothingItemObject} from "./clothingItemObject";
import {List} from "postcss/lib/list";

export class outfitObject {
    private pieces: List;
    private isFavorite: boolean;

    constructor(pieces: List, isFavorite: boolean) {
      this.pieces = pieces;
      this.isFavorite = isFavorite
    }

  set setFavorite(value: boolean) {
    this.isFavorite = value;
  }


  get getFavorite(): boolean {
    return this.isFavorite;
  }
}
