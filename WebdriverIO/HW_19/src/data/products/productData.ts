import { faker } from '@faker-js/faker';
import { IProduct, PRODUCT_REQUIRENMENTS } from '../types/product.types.js';
import { TestData } from '../types/testData.types.js';

export const productData: TestData<Omit<IProduct, 'manufacturer'>> = {
  valid: {
    name: [
      {
        name: faker.string.alphanumeric(PRODUCT_REQUIRENMENTS.MIN_NAME_LENGTH),
        description: `Min length - ${PRODUCT_REQUIRENMENTS.MIN_NAME_LENGTH} symbols value`
      },
      {
        name: faker.string.alphanumeric(PRODUCT_REQUIRENMENTS.MAX_NAME_LENGTH),
        description: `Max length - ${PRODUCT_REQUIRENMENTS.MAX_NAME_LENGTH} symbols value`
      },
      {
        name: faker.string.alphanumeric(4) + ' ' + faker.string.alphanumeric(1),
        description: 'Space inside symbols'
      }
    ],
    price: [
      {
        price: PRODUCT_REQUIRENMENTS.MIN_PRICE,
        description: 'Min price value'
      },
      {
        price: PRODUCT_REQUIRENMENTS.MAX_PRICE,
        description: 'Max price value'
      },
      {
        price: 134,
        description: 'Avg price value'
      }
    ],
    amount: [
      {
        amount: PRODUCT_REQUIRENMENTS.MIN_AMOUNT,
        description: 'Min amount value'
      },
      {
        amount: PRODUCT_REQUIRENMENTS.MAX_AMOUNT,
        description: 'Max amount value'
      },
      {
        amount: 78,
        description: 'Avg amount value'
      }
    ],
    notes: [
      {
        notes: '',
        description: 'Empty value'
      },
      {
        notes: faker.string.alphanumeric({ length: PRODUCT_REQUIRENMENTS.MAX_NOTES_LENGTH, casing: 'mixed' }),
        description: 'Max symbols length value'
      },
      {
        notes: faker.string.alphanumeric(130),
        description: 'Avg symbols length value'
      },
      {
        notes: '!"#$%&\'()*+, -./:;=?@[]^_`{|}~\\',
        description: 'Special characters value'
      },
      {
        notes: 'Тест поля',
        description: 'Cyrillic letters value'
      }
    ]
  },
  invalid: {
    name: [
      {
        name: '',
        description: 'Empty value'
      },
      {
        name: faker.string.alphanumeric(PRODUCT_REQUIRENMENTS.MIN_NAME_LENGTH - 1),
        description: `Min length - 1: ${PRODUCT_REQUIRENMENTS.MIN_NAME_LENGTH - 1} symbols value`
      },
      {
        name: faker.string.alphanumeric(PRODUCT_REQUIRENMENTS.MAX_NAME_LENGTH + 1),
        description: `Max length + 1: ${PRODUCT_REQUIRENMENTS.MAX_NAME_LENGTH + 1} symbols value`
      },
      {
        name: faker.string.alphanumeric(4) + '  ' + faker.string.alphanumeric(1),
        description: 'Two spaces in a row between symbols'
      },
      {
        name: ' ' + faker.string.alphanumeric(15),
        description: 'Space in the beginning'
      },
      {
        name: faker.string.alphanumeric(11) + ' ',
        description: 'Space in the end'
      },
      {
        name: faker.string.alpha(5) + faker.string.symbol(1),
        description: 'Special characters value'
      }
    ],
    price: [
      {
        price: '',
        description: 'Empty value'
      },
      {
        price: PRODUCT_REQUIRENMENTS.MIN_PRICE - 1,
        description: 'Min value - 1'
      },
      {
        price: PRODUCT_REQUIRENMENTS.MAX_PRICE + 1,
        description: 'Max value + 1'
      },
      {
        price: faker.string.alpha(3),
        description: 'Letters'
      },
      {
        price: -1,
        description: 'Negative value'
      },
      {
        price: faker.number.float({ min: 1, max: 99, fractionDigits: 2 }),
        description: 'Float value'
      },
      {
        price: faker.string.symbol(1),
        description: 'Special characters value'
      }
    ],
    amount: [
      {
        amount: '',
        description: 'Empty value'
      },
      {
        amount: PRODUCT_REQUIRENMENTS.MAX_AMOUNT + 1,
        description: 'Max value + 1'
      },
      {
        amount: faker.string.alpha(3),
        description: 'Letters'
      },
      {
        amount: -3,
        description: 'Negative value'
      },
      {
        amount: faker.string.symbol(1),
        description: 'Special characters value'
      }
    ],
    notes: [
      {
        notes: faker.string.alphanumeric(PRODUCT_REQUIRENMENTS.MAX_NOTES_LENGTH + 1),
        description: 'Max length + 1 value'
      },
      {
        notes: faker.string.alphanumeric(10) + '>',
        description: 'Symbol ">"'
      },
      {
        notes: faker.string.alphanumeric(7) + '<',
        description: 'Symbol "<"'
      }
    ]
  }
};
