type CharacterName = 'дедушка' | 'лиса' | 'заяц';

const kolobok = (name: CharacterName) => {
  switch (name) {
    case 'дедушка':
      return 'Я от дедушки ушёл';
    case 'заяц':
      return 'Я от зайца ушёл';
    case 'лиса':
      return 'Меня съели';
    default:
      return 'Такого персонажа нет';
  }
};

console.log(kolobok('дедушка'));
console.log(kolobok('заяц'));
console.log(kolobok('лиса'));

type NewYearCharacterName = 'Дед Мороз' | 'Снегурочка';

const newYear = (name: NewYearCharacterName) => {
  if (name === 'Дед Мороз' || name === 'Снегурочка') {
    return ` ${name}!`.repeat(3).trim();
  }
};

console.log(newYear('Дед Мороз'));
console.log(newYear('Снегурочка'));
