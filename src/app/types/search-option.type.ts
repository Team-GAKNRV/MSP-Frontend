import { ArticleType } from "../enums/articleType.enum";
import { BaseColour } from "../enums/baseColour.enum";
import { MasterCategory } from "../enums/masterCategory.enum";
import { Season } from "../enums/season.enum";
import { SubCategory } from "../enums/subCategory.enum";
import { Usage } from "../enums/usage.enum";

export type SearchOption = typeof ArticleType | typeof BaseColour | typeof MasterCategory | typeof Season | typeof SubCategory | typeof Usage | null;
