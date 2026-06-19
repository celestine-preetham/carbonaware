import { Category, EmissionFactor } from './types';

export const EMISSION_FACTORS: Record<Category, EmissionFactor[]> = {
  Transport: [
    { id: 'car_gas', title: 'Car (Gasoline)', category: 'Transport', factor: 0.19, unit: 'km' },
    { id: 'car_ev', title: 'Car (EV)', category: 'Transport', factor: 0.05, unit: 'km' },
    { id: 'bus', title: 'Bus', category: 'Transport', factor: 0.08, unit: 'km' },
    { id: 'flight', title: 'Flight (Economy)', category: 'Transport', factor: 0.15, unit: 'km' },
    { id: 'bike', title: 'Bicycle / Walk', category: 'Transport', factor: 0, unit: 'km' },
  ],
  Food: [
    { id: 'beef', title: 'Beef Meal', category: 'Food', factor: 7.7, unit: 'meal' },
    { id: 'chicken', title: 'Chicken Meal', category: 'Food', factor: 1.3, unit: 'meal' },
    { id: 'vegetarian', title: 'Vegetarian Meal', category: 'Food', factor: 0.7, unit: 'meal' },
    { id: 'vegan', title: 'Vegan Meal', category: 'Food', factor: 0.4, unit: 'meal' },
  ],
  Energy: [
    { id: 'electricity', title: 'Home Electricity', category: 'Energy', factor: 0.38, unit: 'kWh' },
    { id: 'natural_gas', title: 'Natural Gas', category: 'Energy', factor: 0.2, unit: 'kWh' },
  ],
  Shopping: [
    { id: 'clothes', title: 'Clothing items', category: 'Shopping', factor: 15.0, unit: 'item' },
    { id: 'electronics', title: 'Electronics', category: 'Shopping', factor: 50.0, unit: 'item' },
  ]
};

export const DAILY_BUDGET_KG = 15; // Target daily budget for a sustainable footprint (~5.4 tons/year)
