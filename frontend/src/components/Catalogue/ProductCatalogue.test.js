import React from 'react';
import { render } from '@testing-library/react';
import ProductCatalogue from './ProductCatalogue';

// Mock the products array for testing
jest.mock('./ProductDetails', () => [
  {
    id: 1,
    name: 'Mock Product 1',
    short_description: 'Mock Description 1',
    image: 'mock-image-1.jpg',
    aosDelay: 100,
  },
  {
    id: 2,
    name: 'Mock Product 2',
    short_description: 'Mock Description 2',
    image: 'mock-image-2.jpg',
    aosDelay: 200,
  },
]);

describe('ProductCatalogue', () => {
  it('renders product catalogue with correct number of product tiles', () => {
    const { getAllByText } = render(<ProductCatalogue />);
    
    // Assuming there are two mock products in the mocked ProductDetails array
    expect(getAllByText(/Mock Product [1-2]/i)).toHaveLength(2);
  });
});
