export const REGEX_SPECIALS = ['.', '+', '*', '?', '^', '$', '(', ')', '[', ']', '{', '}'];

export const REGEX_WHITESPACE = /\s/g;

export const REGEX_NUMBERS_ONLY = /\d$/g;

export const REGEX_XML = /(?<=<TAG.*?>)(.*?)(?=<\/TAG>)/g;

export const REGEX_UUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export const REGEX_URL =
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

export const REGEX_WORD = /^\b(?:\w|-)+\b$/;

export const REGEX_EMAIL =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
