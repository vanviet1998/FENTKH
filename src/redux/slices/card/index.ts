import { IBaseRedux, intitalIBaseRedux } from './../../../constant/IBaseRedux';
import { CardStore } from './../../../until/index';
import { IAddAmountItemCard, IAddItemCard, ICards } from './../../../constant/index';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";



const initialState: IBaseRedux<ICards> = {
    ...intitalIBaseRedux,
    data:null

}
const cardSlice = createSlice({
    name: "card",
    initialState,
    reducers: {
        getAllCard: (state) => {
            const myCard = new CardStore()
            state.data = myCard.getCards()

        },
        addItemsToCard: (state, action: PayloadAction<IAddItemCard>) => {
            const myCard = new CardStore()
            myCard.addItemsToCard(action.payload)
            state.data = myCard.getCards()

        },
        addAmountToItemCards: (state, action: PayloadAction<IAddAmountItemCard>) => {
            const myCard = new CardStore()
            myCard.addAmountToItemCards(action.payload)
            state.data = myCard.getCards()

        },
        removeItemToCard: (state, action: PayloadAction<string>) => {
            const myCard = new CardStore()
            myCard.removeItemToCard(action.payload)
            state.data = myCard.getCards()

        },
        removeAllToCard: (state) => {
            const myCard = new CardStore()
            myCard.removeAllToCard()
            state.data = myCard.getCards()

        },
    },
});

export const { getAllCard, addItemsToCard, removeItemToCard, removeAllToCard, addAmountToItemCards } = cardSlice.actions;
export const selectAllCards = (state) => state.card

export default cardSlice.reducer;
