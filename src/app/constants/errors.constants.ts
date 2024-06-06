import { CustomError } from "../interfaces/error.interface";

export const CLOSET_GET_ALL_ERROR: CustomError = {
    title: 'Fehler beim Laden des Kleiderschranks!',
    message: 'Deine Klamotten konnten nicht geladen werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};

export const OUTFITS_GET_ALL_ERROR: CustomError = {
    title: 'Fehler beim Laden der Outfits!',
    message: 'Deine Outfits konnten nicht geladen werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};

export const INSPIRATIONS_GET_ALL_ERROR: CustomError = {
    title: 'Fehler beim Laden von Inspirationen!',
    message: 'Es konnten keine Inspirationen erstellt werden. Bitte überprüfe, dass du genügend Klamotten im Kleiderschrank hast und versuche es erneut.'
};

export const NO_IMAGE_SELECTED_ERROR: CustomError = {
    title: 'Kein Bild ausgewählt!',
    message: 'Das Klassifizierungsmodell kann nur Bilder erkennen. Bitte versuche es erneut.'
};

export const UPLOAD_IMAGE_ERROR: CustomError = {
    title: 'Fehler beim Hochladen des Bildes!',
    message: 'Das Bild konnte nicht hochgeladen werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};

export const FAVORIZE_CLOTHING_ITEM_ERROR: CustomError = {
    title: 'Fehler beim Favorisieren!',
    message: 'Das Kleidungsstück konnte nicht favorisiert werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};

export const DELETE_CLOTHING_ITEM_ERROR: CustomError = {
    title: 'Fehler beim Löschen!',
    message: 'Das Kleidungsstück konnte nicht gelöscht werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};

export const FAVORIZE_OUTFIT_ERROR: CustomError = {
    title: 'Fehler beim Favorisieren!',
    message: 'Das Outfit konnte nicht favorisiert werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};

export const DELETE_OUTFIT_ERROR: CustomError = {
    title: 'Fehler beim Löschen!',
    message: 'Das Outfit konnte nicht gelöscht werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};

export const SAVE_CLOTHING_ITEM_ERROR: CustomError = {
    title: 'Fehler beim Speichern des Kleidungsstücks!',
    message: 'Dein Kleidungsstück konnte nicht gespeichert werden. Bitte überprüfe, dass du genügend Klamotten im Kleiderschrank hast und versuche es erneut.'
};

export const UPDATE_CLOTHING_ITEM_ERROR: CustomError = {
    title: 'Fehler beim Aktualisieren des Kleidungsstücks!',
    message: 'Dein Kleidungsstück konnte nicht aktualisiert werden. Bitte überprüfe, dass du genügend Klamotten im Kleiderschrank hast und versuche es erneut.'
};

export const UPDATE_OUTFIT_ERROR: CustomError = {
    title: 'Fehler beim Aktualisieren des Outfits!',
    message: 'Dein Outfit konnte nicht aktualisiert werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};

export const ADD_OUTFIT_ERROR: CustomError = {
    title: 'Fehler beim Hinzufügen des Outfits!',
    message: 'Dein Outfit konnte nicht hinzugefügt werden. Bitte überprüfe deine Verbindung und versuche es erneut.'
};
