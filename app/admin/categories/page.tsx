import { useState } from 'react';

import { Category } from '@/models/categoryModel';

import CategoriesView from './components/categoryView';

import axios from 'axios';

export default async function Categories() {

  let categoryData, categoryError;

  try {
      const data = await axios.get(`https://board-backend-b9tn.onrender.com/categories/`);
      categoryData = data.data.data;
  } catch (e: any) {
      if (e.response.status === 500) {
          categoryError = e.response.data;
      }
  }

    return <CategoriesView categoryData={categoryData} categoryError={categoryError} />;
  }
  