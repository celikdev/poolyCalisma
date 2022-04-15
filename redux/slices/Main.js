import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  kalkisYeri: '',
  varisYeri: '',
  kalkisSaati: '',
  yolcuSayisi: 1,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setKalkisYeri: (state, action) => {
      state.kalkisYeri = action.payload;
    },
    setVarisYeri: (state, action) => {
      state.varisYeri = action.payload;
    },
    setTime: (state, action) => {
      state.kalkisSaati = action.payload;
    },
    yolcuEkle: state => {
      state.yolcuSayisi += 1;
      if (state.yolcuSayisi > 5) {
        state.yolcuSayisi = 5;
      }
    },
    yolcuCikar: state => {
      state.yolcuSayisi -= 1;
      if (state.yolcuSayisi < 1) {
        state.yolcuSayisi = 1;
      }
    },
  },
});

export const {setKalkisYeri, setVarisYeri, setTime, yolcuEkle, yolcuCikar} =
  mainSlice.actions;

export default mainSlice.reducer;
