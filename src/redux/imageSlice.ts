import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type imageItem = {
    id: string,
    uri: string,
    name: string
}

type State = {
    images: imageItem[]
}

const initialState: State = {
    images: []
}

const imageSlice = createSlice({
    name: "images",
    initialState,
    reducers:{
        addImages: (state,action) => {
            state.images.push(...action.payload)
        },
        editName: (state,action: PayloadAction<{id: string, name: string}>) => {
            const {id,name} = action.payload;
            const image = state.images.find(each => each.id === id);

            if(image){
                image.name = name;
            }
        },
        deleteImages: (state,action) => {
            const ids = action.payload;
            state.images = state.images.filter(each => !ids.includes(each.id))
        },
        resetImages: (state) => {
            state.images = []
        }
    }
})

export const {addImages, resetImages, editName, deleteImages} = imageSlice.actions;
export default imageSlice.reducer