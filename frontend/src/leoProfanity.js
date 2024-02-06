import filter from 'leo-profanity';

filter.add(filter.getDictionary('en'));
filter.add(filter.getDictionary('fr'));
filter.add(filter.getDictionary('ru'));

const leoProfanity = (str) => filter.clean(str, '*', 1);

export default leoProfanity;
