const initialState = {
  products: {
    rents: [],
    sales: []
  },
  total: 0,
  error: null,
  loading: false,
  loadingProduct: true,
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case 'cart/fetch-cart/pending':
      return {
        ...state,
        loading: true,
      };
    case 'cart/fetch-cart/fulfilled':
      return {
        ...state,
        loading: false,
        products: {
          rents: action.payload.product.rents,
          sales: action.payload.product.sales,
        } 
      };
    case 'cart/fetch-cart/rejected':
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'STFormat/patch/pending':
      return {
        ...state,
        loadingProduct: true,
      };
    case 'STFormat/patch/fulfilled':
      return {
        ...state,
        loadingProduct: false,
        products: {
          ...state.products,
          rents: [...state.products.rents, action.payload],
        },
      };
    case 'STFormat/patch/rejected':
      return {
        ...state,
        loadingProduct: false,
        products: {
          ...state.products,
          rents: [],
        },
        error: action.error,
      };
    case 'billboard/patch/pending':
      return {
        ...state,
        loading: true,
      };
    case 'billboard/patch/fulfilled':
      return {
        ...state,
        loading: false,
        products: {
          ...state.products,
          rents: [...state.products.rents, action.payload],
        },
      };
    case 'billboard/patch/rejected':
      return {
        ...state,
        loading: false,
        products: {
          ...state.products,
          rents: [],
        },
        error: action.error,
      };

      case 'visitcards/patch/pending':
      return {
        ...state,
        loading: true,
      };
    case 'visitcards/patch/fulfilled':
      return {
        ...state,
        loading: false,
        products: {
          ...state.products,
          sales: [...state.products.sales, action.payload.product.sales]
        },
      };
    case 'visitcards/patch/rejected':
      return {
        ...state,
        loading: false,
        products: {
          ...state.products,
          sales: [],
        },
        error: action.error,
      };
    default:
      return state;
  }
}

export const fetchRents = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: 'cart/fetch-cart/pending' });
    try {
      const res = await fetch(`http://localhost:3030/cart/${state.application.token}`, {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${state.application.token}`
        },
      });

      const json = await res.json();

      if (json.error) {
        dispatch({
          type: 'cart/fetch-cart/rejected',
          error: 'При запросе на сервер произошла ошибка',
        });
      } else {
        dispatch({ type: 'cart/fetch-cart/fulfilled', payload: json });
      }
    } catch (e) {
      dispatch({ type: 'cart/fetch-cart/rejected', error: e.toString() });
    }
  };
};

export const addSTFormatToCart = (id, STFormat) => {
  return async (dispatch) => {
    dispatch({ type: 'STFormat/patch/pending' });
    try {
      const res = await fetch(`http://localhost:3030/cart/product/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ product: STFormat }),
      });
      const json = await res.json();

      if (json.error) {
        dispatch({
          type: 'STFormat/patch/rejected',
          error: 'При запросе на сервер произошла ошибка',
        });
      } else {
        dispatch({ type: 'STFormat/patch/fulfilled', payload: json });
      }
    } catch (e) {
      console.log('ошибка');
      dispatch({ type: 'STFormat/patch/rejected', error: e.toString() });
    }
  };
};

export const addBillboardToCart = (id, billboard) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: 'billboard/patch/pending' });
    try {
      const res = await fetch(`http://localhost:3030/cart/product/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${state.application.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ product: billboard }),
      });
      const json = await res.json();

      console.log(json.product.rents);

      if (json.error) {
        dispatch({
          type: 'billboard/patch/rejected',
          error: 'Ошибка при запросе',
        });
      } else {
        dispatch({ type: 'billboard/patch/fulfilled', payload: json });
      }
    } catch (e) {
      dispatch({
        type: 'billboard/patch/rejected',
        error: e.toString(),
      });
    }
  };
};

export const addVisitCardToCart = (paper, count, delivery, price) => {
  return async (dispatch, getState) => {
    const state = getState();
    console.log(state.application.token);
    dispatch({ type: 'visitcards/patch/pending' });
    try {
      const res = await fetch("http://localhost:3030/visitcard", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.application.token}`
        },
        body: JSON.stringify({ typePaper: paper, count: count, delivery: delivery, price: price }),
      });
      const json = await res.json();

      if (json.error) {
        dispatch({
          type: 'visitcards/patch/rejected',
          error: 'Ошибка при запросе',
        });
      } else {
        dispatch({ type: 'visitcards/patch/fulfilled', payload: json });
      }
    } catch (e) {
      dispatch({
        type: 'visitcards/patch/rejected',
        error: e.toString(),
      });
    }
  };
};

export const deleteVisitCard = (id) => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch({ type: 'visitcards/delete/pending' });
    try {
      const res = await fetch(`http://localhost:3030/visitcard/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.application.token}`
        },
      });
      const json = await res.json();

      if (json.error) {
        dispatch({
          type: 'visitcards/delete/rejected',
          error: 'Ошибка при запросе',
        });
      } else {
        dispatch({ type: 'visitcards/delete/fulfilled', payload: json });
      }
    } catch (e) {
      dispatch({
        type: 'visitcards/delete/rejected',
        error: e.toString(),
      });
    }
  };
};
