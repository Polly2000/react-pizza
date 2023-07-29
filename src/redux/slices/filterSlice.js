import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '', // Внимание, у меня сломался поиск :D Но не в приложении, а в самом запросе (на сайте мок апи), так что ок
  sort: {
    name: 'популярности',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }
  },
});

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;

export const { setSearchValue, setCategoryId, setSort, setCurrentPage } = filterSlice.actions;

export default filterSlice.reducer;