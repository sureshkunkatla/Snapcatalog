import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type orgDetailsType = {
  orgName: string;
  address: string;
  contactName: string;
  contactNumber: string;
  filePath: string;
  fileName: string;
  createdDate: string
};

const initialState: orgDetailsType = {
  orgName: '',
  address: '',
  contactName: '',
  contactNumber: '',
  filePath: '',
  fileName: '',
  createdDate: ''
};

const orgDetailsSlice = createSlice({
  name: 'orgDetails',
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{field: keyof orgDetailsType; value: string}>,
    ) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const {updateField} = orgDetailsSlice.actions;

export default orgDetailsSlice.reducer;
