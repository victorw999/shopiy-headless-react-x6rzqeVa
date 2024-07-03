import { typography } from "@chakra-ui/react";
import React, { Component } from "react";
import Client from "shopify-buy";

/**
 * Per the tutorial, the reason using a "class" component is it just makes it easier to:
   - handle the state
   - & the mounting process.
 */
const ShopContext = React.createContext();
class ShopProvider extends Component {

  constructor(props) {
    super(props)
    try {
      this.client = Client.buildClient({
        storefrontAccessToken: process.env.REACT_APP_SHOPIFY_STOREFRONT_KEY,
        domain: process.env.REACT_APP_SHOPIFY_DOMAIN
      });
    } catch (error) {
      console.error("Error creating Shopify client:", error);
    }

    this.state = {
      products: [],
      product: {},
      checkout: {},
      isCartOpen: false,
      isMenuOpen: false
    };
  }



  /**
   * "CREAT CHECK OUT WHEN MOUNTED"
   * if checkout_id already been created w createCheckout(), then save it in localStorage,
   * so that whenever refreshing browser, the "Componentdidmount" function won't "create a new checkout" every time.
   */
  componentDidMount() {
    try {
      if (localStorage.checkout_id) {
        // fetch exsiting checkout
        this.fetchCheckout(localStorage.checkout_id)
      } else {
        // create new checkout
        this.createCheckout()
      }
    } catch (error) {
      console.error("Error occurred in componentDidMount:", error);
    }
  }

  createCheckout = async () => {
    try {
      const checkout = await this.client.checkout.create();
      localStorage.setItem("checkout_id", checkout.id)
      this.setState({ checkout: checkout });
    } catch (error) {
      console.error('createCheckout()', error)
    }
  };

  fetchCheckout = async (checkoutId) => {
    // checkoutId expired: the checkoutId may expire. If this happens, a new checkout ID will need to be created.
    this.client.checkout
      .fetch(checkoutId)
      .then((checkout) => {
        if (checkout) {
          this.setState({ checkout: checkout });
        } else {
          this.createCheckout()  // checkoutId expired, creating new checkout
        }
      })
      .catch((error) => console.error(error));
  };

  addItemToCheckout = async (variantId, quantity) => {
    try {
      const lineItemsToAdd = [
        {
          variantId,
          quantity: parseInt(quantity, 10),
        },
      ];

      const checkout = await this.client.checkout.addLineItems(
        this.state.checkout.id,
        lineItemsToAdd
      );
      this.setState({ checkout: checkout });

      this.openCart();
    } catch (error) {
      console.error('addItemToCheckout() error:', error)
    }
  };

  removeLineItem = async (lineItemIdsToRemove) => {
    const checkoutId = this.state.checkout.id
    try {
      this.client.checkout.removeLineItems(checkoutId, lineItemIdsToRemove)
        .then(checkout => this.setState({ checkout }))
    } catch (error) {
      console.error('removeLineItem() error:', error)
    }
  }

  fetchAllProducts = async () => {
    try {
      const products = await this.client.product.fetchAll();
      this.setState({ products: products });
    } catch (error) {
      console.error('fetchAllProducts() error:', error)
    }
  };

  fetchCollection = async () => {
    let collectionId = 'gid://shopify/Collection/121286131812'; // lululemon;
    this.client.collection.fetchWithProducts(collectionId, { productsFirst: 10 }).then((collection) => {
      this.setState({ products: collection.products });
    });
  }
  fetchProducts = async (option) => {
    if (option === 2) {
      this.fetchCollection()
    } else {
      this.fetchAllProducts()
    }
  }

  fetchProductWithHandle = async (handle) => {
    try {
      const product = await this.client.product.fetchByHandle(handle);
      this.setState({ product: product });
      return product;
    } catch (error) {
      console.error('fetchProductWithHandle()', error)
    }
  };

  closeCart = () => {
    this.setState({ isCartOpen: false });
  };
  openCart = () => {
    this.setState({ isCartOpen: true });
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false })
  }
  openMenu = () => {
    this.setState({ isMenuOpen: true })
  }


  render() {

    return (
      <ShopContext.Provider
        value={{
          ...this.state,
          fetchProducts: this.fetchProducts,
          fetchAllProducts: this.fetchAllProducts,
          fetchCollection: this.fetchCollection,
          fetchProductWithHandle: this.fetchProductWithHandle,
          closeCart: this.closeCart,
          openCart: this.openCart,
          closeMenu: this.closeMenu,
          openMenu: this.openMenu,
          addItemToCheckout: this.addItemToCheckout,
          removeLineItem: this.removeLineItem
        }}
      >
        {this.props.children}
      </ShopContext.Provider>
    );
  }
}

const ShopConsumer = ShopContext.Consumer;

export { ShopConsumer, ShopContext };

export default ShopProvider;