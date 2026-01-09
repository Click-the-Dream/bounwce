import { useStore } from "../context/storeContext";

const useCart = () => {
  const { setCart } = useStore();

  const addToCart = (product) => {
    setCart((prev) => {
      const vendorIndex = prev.findIndex((v) => v.name === product.category);

      if (vendorIndex > -1) {
        // Vendor exists
        const itemIndex = prev[vendorIndex].items.findIndex(
          (i) => i.id === product.id
        );

        if (itemIndex > -1) {
          // Item exists: increment quantity
          const newCart = prev.map((vendor, vIdx) =>
            vIdx !== vendorIndex
              ? vendor
              : {
                  ...vendor,
                  items: vendor.items.map(
                    (item, iIdx) =>
                      iIdx !== itemIndex
                        ? item
                        : { ...item, quantity: item.quantity + 1 } // only update quantity
                  ),
                }
          );
          return newCart;
        } else {
          // Add new item under vendor with quantity 1
          const newCart = prev.map((vendor, vIdx) =>
            vIdx !== vendorIndex
              ? vendor
              : {
                  ...vendor,
                  items: [...vendor.items, { ...product, quantity: 1 }],
                }
          );
          return newCart;
        }
      } else {
        // New vendor, add product with quantity 1
        return [
          ...prev,
          { name: product.category, items: [{ ...product, quantity: 1 }] },
        ];
      }
    });
  };

  const removeFromCart = (product) => {
    setCart((prev) => {
      const vendorIndex = prev.findIndex((v) => v.name === product.category);
      if (vendorIndex === -1) return prev;

      const itemIndex = prev[vendorIndex].items.findIndex(
        (i) => i.id === product.id
      );
      if (itemIndex === -1) return prev;

      // Deep clone the vendor items
      const newVendorItems = prev[vendorIndex].items
        .filter((_, i) => i !== itemIndex)
        .map((item) => ({ ...item }));

      const newCart = prev
        .map((vendor, idx) =>
          idx === vendorIndex ? { ...vendor, items: newVendorItems } : vendor
        )
        .filter((vendor) => vendor.items.length > 0); // Remove empty vendors

      return newCart;
    });
  };

  return { addToCart, removeFromCart };
};
export default useCart;
