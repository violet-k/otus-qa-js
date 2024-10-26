import { fullTrim, getTotal, nameIsValid } from 'src/app';

describe('nameIsValid', () => {
  it('имя должно быть строкой', () => {
    expect(nameIsValid('john')).toBe(true);
    expect(nameIsValid(null as unknown as string)).toBe(false);
  });

  it('имя должно быть на латинице', () => {
    expect(nameIsValid('john')).toBe(true);
    expect(nameIsValid('джон')).toBe(false);
  });

  it('имя должно быть длиной более 2 знаков', () => {
    expect(nameIsValid('jo')).toBe(true);
    expect(nameIsValid('j')).toBe(false);
  });
});

describe('fullTrim', () => {
  it('корректно отрабатывает на пустой строке', () => {
    expect(fullTrim('')).toBe('');
  });

  it('удаляет пробелы', () => {
    expect(fullTrim(' t es  t ')).toBe('test');
  });

  it('удаляет символы \\n, \\t', () => {
    expect(fullTrim('\n\t')).toBe('');
  });
});

describe('getTotal', () => {
  const products = [
    { price: 10, quantity: 10 },
    { price: 2, quantity: 5 },
    { price: 1, quantity: 5 }
  ];
  const validCases = [
    {
      name: 'скидка 0%',
      products,
      discount: 0,
      expected: 115
    },
    {
      name: 'скидка 10%',
      products,
      discount: 10,
      expected: 103.5
    }
  ];

  test.each(validCases)('$name', ({ products, discount, expected }) => {
    const result = getTotal(products, discount);
    expect(result).toEqual(expected);
  });

  const invalidCases = [
    {
      name: 'скидка -1%',
      products,
      discount: -1,
      error: 'Процент скидки должен быть от 0 до 99'
    },
    {
      name: 'скидка 146%',
      products,
      discount: 146,
      error: 'Процент скидки должен быть от 0 до 99'
    },
    {
      name: 'скидка A%',
      products,
      discount: 'A',
      error: 'Скидка должна быть числом'
    }
  ];

  test.each(invalidCases)('$name', ({ products, discount, error }) => {
    expect(() => getTotal(products, discount as unknown as number)).toThrow(
      error
    );
  });
});
