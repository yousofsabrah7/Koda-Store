import { useMemo, useState } from "react";
import { MapPin, CreditCard, FileText, Check, Loader2 } from "lucide-react";

import Card from "../../components/checkout/Card";
import CardHeader from "../../components/checkout/CardHeader";
import Field from "../../components/checkout/Field";
import PaymentOption from "../../components/checkout/PaymentOption";
import SummaryRow from "../../components/checkout/SummaryRow";

import { useCart } from "../../services/apiHooks/cartHooks";
import { usePlaceOrder } from "../../services/apiHooks/OrdersHook";

const COUNTRIES = ["Egypt"];

const egp = (n) => `EGP ${Math.round(n).toLocaleString("en-US")}`;

const inputClass = (invalid) =>
  [
    "w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-800",
    "placeholder:text-slate-400 transition",
    "focus:outline-none focus:ring-[3px] focus:ring-indigo-500/20",
    invalid
      ? "border-red-400 focus:border-red-500"
      : "border-slate-200 focus:border-indigo-500",
  ].join(" ");

function Checkout() {
  const { data: cart, isLoading: cartLoading, isError: cartError } = useCart();
  const placeOrderMutation = usePlaceOrder();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    country: "Egypt",
    city: "",
    address: "",
    postal: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [payment, setPayment] = useState("cod");
  const [confirmation, setConfirmation] = useState(null);

  const items = cart?.items ?? [];
  const totals = useMemo(() => {
    const subtotal =
      cart?.subtotal ?? items.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = cart?.shipping ?? 50;
    const tax = cart?.tax ?? Math.round(subtotal * 0.14);
    const total = cart?.total ?? subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  }, [cart, items]);

  const setField = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Enter the name for delivery.";
    if (form.phone.replace(/\D/g, "").length < 8)
      next.phone = "Enter a phone number we can call on delivery.";
    if (!form.country) next.country = "Choose a country.";
    if (!form.city.trim()) next.city = "Enter your city.";
    if (!form.address.trim())
      next.address = "Street, building and apartment number.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  if (cartLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50">
        <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (cartError) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 px-4 text-center">
        <p className="text-sm text-slate-600">
          Couldn&apos;t load your cart. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="mx-auto max-w-[1060px] px-4 pb-16 pt-6">
        <h1 className="mb-5 text-[21px] font-bold tracking-tight text-slate-900">
          Checkout
        </h1>

        <form
          
          noValidate
          className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1.85fr_1fr]"
        >
          <div className="space-y-6">
            <Card>
              <div className="p-5 pb-6 sm:px-6">
                <CardHeader icon={MapPin} title="Shipping Address" />

                <div className="grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    required
                    htmlFor="name"
                    error={errors.name}
                  >
                    <input
                      id="name"
                      autoComplete="name"
                      value={form.name}
                      onChange={setField("name")}
                      aria-invalid={!!errors.name}
                      className={inputClass(errors.name)}
                    />
                  </Field>

                  <Field
                    label="Phone"
                    required
                    htmlFor="phone"
                    error={errors.phone}
                  >
                    <input
                      id="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={setField("phone")}
                      aria-invalid={!!errors.phone}
                      className={inputClass(errors.phone)}
                    />
                  </Field>

                  <Field
                    label="Country"
                    required
                    htmlFor="country"
                    error={errors.country}
                  >
                    <select
                      id="country"
                      value={form.country}
                      onChange={setField("country")}
                      aria-invalid={!!errors.country}
                      className={`${inputClass(errors.country)} cursor-pointer appearance-none bg-[length:7px] pr-8`}
                    >
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </Field>

                  <Field
                    label="City"
                    required
                    htmlFor="city"
                    error={errors.city}
                  >
                    <input
                      id="city"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={setField("city")}
                      aria-invalid={!!errors.city}
                      className={inputClass(errors.city)}
                    />
                  </Field>

                  <Field
                    label="Address"
                    required
                    htmlFor="address"
                    error={errors.address}
                    className="sm:col-span-2"
                  >
                    <input
                      id="address"
                      autoComplete="street-address"
                      value={form.address}
                      onChange={setField("address")}
                      aria-invalid={!!errors.address}
                      className={inputClass(errors.address)}
                    />
                  </Field>

                  <Field label="Postal Code" htmlFor="postal">
                    <input
                      id="postal"
                      inputMode="numeric"
                      autoComplete="postal-code"
                      value={form.postal}
                      onChange={setField("postal")}
                      className={inputClass(false)}
                    />
                  </Field>
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 pb-6 sm:px-6">
                <CardHeader icon={CreditCard} title="Payment Method" />
                <div role="radiogroup" aria-label="Payment method">
                  <PaymentOption
                    selected={payment === "cod"}
                    onSelect={() => setPayment("cod")}
                    name="Cash on Delivery"
                    description="Pay when you receive your order"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <div className="p-5 pb-6 sm:px-6">
                <CardHeader icon={FileText} title="Order Notes (Optional)" />
                <textarea
                  id="notes"
                  rows={3}
                  value={form.notes}
                  onChange={setField("notes")}
                  placeholder="Any special instructions for your order..."
                  className={`${inputClass(false)} min-h-[78px] resize-y py-2.5`}
                />
              </div>
            </Card>
          </div>

          <Card className="p-5 sm:px-6 lg:sticky lg:top-6">
            <h2 className="mb-4 text-base font-semibold text-slate-800">
              Order Summary
            </h2>

            {items.map((item) => (
              <div
                key={item.id ?? item._id ?? item.productId}
                className="flex items-center gap-3 pb-4"
              >
                {item.image ? (
                  <img
                    src={item.image}
                    alt=""
                    className="h-10 w-10 flex-none rounded-md object-cover"
                  />
                ) : (
                  <div className="h-10 w-10 flex-none rounded-md bg-indigo-50" />
                )}
                <div>
                  <p className="text-[13.5px] font-medium text-indigo-600">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-400">x{item.qty}</p>
                </div>
                <p className="ml-auto whitespace-nowrap text-[13px] font-semibold text-slate-800">
                  {egp(item.price * item.qty)}
                </p>
              </div>
            ))}

            <div className="mb-4 border-t border-slate-200" />

            <SummaryRow label="Subtotal" value={egp(totals.subtotal)} />
            <SummaryRow label="Shipping" value={egp(totals.shipping)} />
            <SummaryRow label="Tax (14%)" value={egp(totals.tax)} />
            <SummaryRow label="Total" value={egp(totals.total)} total />

            <button
              type="submit"
              disabled={placeOrderMutation.isPending}
              className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-indigo-500/30 active:translate-y-[1px] disabled:cursor-progress disabled:opacity-65"
            >
              {placeOrderMutation.isPending ? "Placing order..." : "Place Order"}
            </button>

            {placeOrderMutation.isError && (
              <p className="mt-2 text-[12px] text-red-600">
                Something went wrong placing your order. Please try again.
              </p>
            )}

            {confirmation && (
              <div
                role="status"
                className="mt-3.5 flex items-start gap-2.5 rounded-lg border border-slate-200 bg-indigo-50 px-3.5 py-3 text-[12.5px] text-slate-600"
              >
                <Check className="mt-0.5 h-4 w-4 flex-none text-indigo-600" />
                <p>
                  <strong className="mb-0.5 block text-[13px] text-slate-800">
                    Order {confirmation.reference} placed
                  </strong>
                  Thanks, {confirmation.firstName}. We&apos;ll call you to
                  confirm delivery to {confirmation.city}. You&apos;ll pay{" "}
                  {egp(totals.total)} in cash when it arrives.
                </p>
              </div>
            )}
          </Card>
        </form>
      </div>
    </div>
  );
}

export default Checkout;