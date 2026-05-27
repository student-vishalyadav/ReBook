import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AddCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState("");
  const [error, setError] = useState("");

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/user/cart");
      setCartItems(res.data?.cartItems || []);
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Could not load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (bookId, type, currentQuantity) => {
    const nextQty = type === "inc" ? currentQuantity + 1 : currentQuantity - 1;

    try {
      setUpdatingId(bookId);
      setError("");

      if (nextQty < 1) {
        await api.delete(`/user/cart/${bookId}`);
      } else {
        await api.patch("/user/cart", { bookId, quantity: nextQty });
      }

      await fetchCart();
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Could not update cart.");
    } finally {
      setUpdatingId("");
    }
  };

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + (item.book?.sellingPrice || 0) * item.quantity,
        0
      ),
    [cartItems]
  );

  const deliveryFee = cartItems.length > 0 ? 40 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">My Cart</h1>
        <p className="mt-2 text-sm text-slate-600">Review your selected books before checkout.</p>
        {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}

        {loading ? <p className="mt-6 text-slate-600">Loading cart...</p> : null}

        {!loading && cartItems.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <h2 className="text-xl font-bold text-slate-800">Your cart is empty</h2>
            <p className="mt-2 text-sm text-slate-500">Add books from the listing page to continue.</p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <article
                  key={item.book?._id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h2 className="text-lg font-bold text-slate-900">{item.book?.title}</h2>
                      <p className="mt-1 text-sm text-slate-600">
                        Seller: {item.book?.seller?.username || "-"}
                      </p>
                      <p className="text-sm text-slate-500">Condition: {item.book?.condition || "-"}</p>
                    </div>

                    <div className="flex items-center gap-5">
                      <p className="text-lg font-bold text-sky-700">Rs. {item.book?.sellingPrice || 0}</p>
                      <div className="flex items-center gap-2 rounded-lg border border-slate-300 px-2 py-1">
                        <button
                          type="button"
                          disabled={updatingId === item.book?._id}
                          onClick={() =>
                            updateQuantity(item.book?._id, "dec", item.quantity)
                          }
                          className="h-8 w-8 rounded-md bg-slate-100 text-lg font-bold text-slate-700 transition hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span className="min-w-6 text-center text-sm font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={updatingId === item.book?._id}
                          onClick={() =>
                            updateQuantity(item.book?._id, "inc", item.quantity)
                          }
                          className="h-8 w-8 rounded-md bg-slate-100 text-lg font-bold text-slate-700 transition hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">Order Summary</h3>
              <div className="mt-4 space-y-2 text-sm text-slate-700">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Delivery</span>
                  <span>Rs. {deliveryFee}</span>
                </div>
                <div className="my-3 border-t border-slate-200" />
                <div className="flex items-center justify-between text-base font-bold text-slate-900">
                  <span>Total</span>
                  <span>Rs. {grandTotal}</span>
                </div>
              </div>

              <button
                type="button"
                className="mt-5 w-full rounded-xl bg-sky-700 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
              >
                Proceed to Checkout
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
};

export default AddCart;
