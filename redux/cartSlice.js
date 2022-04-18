import { createSlice } from "@reduxjs/toolkit";

const ISSERVER = typeof window === "undefined";
if (!ISSERVER) {
  var data = localStorage.getItem("pizzaKing")
    ? JSON.parse(localStorage.getItem("pizzaKing"))
    : null;
}
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: data == null ? [] : data.products,
    quantity: data == null ? 0 : data.quantity,
    total: data == null ? 0 : data.total,
  },

  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;

      const findIndex = state.products?.findIndex(
        (p) =>
          p._id === product._id &&
          p.price === product.price &&
          p.size === product.size
      );
      if (findIndex >= 0) {
        state.products[findIndex].quantity += product.quantity;
        state.total += action.payload.price * action.payload.quantity;
      } else {
        state.products.push(action.payload);
        state.quantity += 1;
        state.total += action.payload.price * action.payload.quantity;
      }

      const values = {
        products: state.products,
        quantity: state.quantity,
        total: state.total,
      };

      localStorage.setItem("pizzaKing", JSON.stringify(values));
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.nano !== action.payload.nano
      );
      state.quantity -= 1;
      state.total -= action.payload.price * action.payload.quantity;
      state.nano = action.payload.nano;
      const values = {
        products: state.products,
        quantity: state.quantity,
        total: state.total,
      };
      localStorage.removeItem("pizzaKing");
      localStorage.setItem("pizzaKing", JSON.stringify(values));
    },
    reset: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      localStorage.removeItem("pizzaKing");
    },
  },
});

export const { addProduct, deleteProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;
