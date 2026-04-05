import { useMemo } from 'react';
import Header from '../../components/buyer/Header';
import Navbar from '../../components/buyer/Navbar';
import OrderSummary from '../../components/buyer/OrderSummary';
import { useStore } from '../../context/storeContext';
import ContactForm from '../../components/buyer/ContactForm';
import { useForm } from 'react-hook-form';
import DeliverySelector from '../../components/buyer/DeliverySelector';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useEffect } from 'react';

const Checkout = () => {
    const { authDetails } = useContext(AuthContext);
    const { carts, cartLoading, isCartError, cartError } = useStore();
    const [selectedDelivery, setSelectedDelivery] = useState({});

    const totalDeliveryFee = useMemo(() => {
        return Object.values(selectedDelivery).reduce((sum, del) => sum + (del.fee || 0), 0);
    }, [selectedDelivery]);

    const {
        register,
        formState: { errors },
        reset
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone_number: "",
        }
    });
    useEffect(() => {
        if (authDetails?.user) {
            reset({
                firstName: authDetails.user.full_name?.split(' ')[0] || "",
                lastName: authDetails.user.full_name?.split(' ').slice(1).join(' ') || "",
                email: authDetails.user.email,
                phone_number: authDetails.user.phone,
            });
        }
    }, [authDetails, reset]);

    // Group cart by vendor
    const cartItems = useMemo(() => {
        if (!carts) return [];

        const grouped = carts.reduce((acc, cart) => {
            const storeId = cart?.store?.id;

            if (!acc[storeId]) {
                acc[storeId] = {
                    storeId,
                    storeName: cart?.store?.name || "Store Name",
                    items: [],
                };
            }

            acc[storeId].items.push({
                ...cart.product,
                quantity: cart.quantity,
                status: cart.status || "cart",
                cartId: cart.id,
            });

            return acc;
        }, {});

        return Object.values(grouped);
    }, [carts]);

    // Order summary
    const orderSummary = useMemo(() => {
        if (!cartItems)
            return { subtotal: 0, totalItems: 0, items: [], vendorTotals: [] };

        const vendorTotals = cartItems.map((storeCart) => {
            const products = storeCart.items
                .filter((i) => i.status !== "saved")
                .map((i) => ({
                    ...i,
                    total: i.amount * i.quantity,
                }));

            const total = products.reduce((sum, p) => sum + p.total, 0);

            return {
                storeId: storeCart.storeId,
                name: storeCart.storeName,
                total,
                products,
            };
        });

        const subtotal = vendorTotals.reduce((sum, v) => sum + v.total, 0);
        const totalItems = vendorTotals.reduce(
            (sum, v) =>
                sum + v.products.reduce((s, p) => s + p.quantity, 0),
            0
        );

        return { subtotal, totalItems, items: cartItems, vendorTotals };
    }, [cartItems]);

    return (
        <div className="bg-[#ECECF080] min-h-screen">
            <Navbar />

            <div className="max-w-5xl mx-auto px-6 pb-8">
                <Header title="Checkout" showCart={false} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">

                        {/* Contact Form */}
                        <form className="space-y-6">
                            <ContactForm register={register} errors={errors} />
                        </form>

                        {/* Cart loading handled HERE */}
                        {cartLoading ? (
                            <div className="space-y-4">
                                <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
                                <div className="h-24 bg-gray-200 rounded-xl animate-pulse" />
                            </div>
                        ) : isCartError ? (
                            <div className="p-4 bg-red-50 text-red-500 rounded-xl">
                                {cartError || "Failed to load cart"}
                            </div>
                        ) : (
                            <DeliverySelector carts={cartItems} selectedDelivery={selectedDelivery}
                                setSelectedDelivery={setSelectedDelivery} />
                        )}
                    </div>

                    {/* Order Summary */}
                    <OrderSummary orderSummary={orderSummary} deliveryFee={totalDeliveryFee} selectedDelivery={selectedDelivery} mode="Payment" />
                </div>
            </div>
        </div>
    );
};

export default Checkout;