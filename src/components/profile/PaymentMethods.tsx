// components/profile/PaymentMethods.tsx
import React, { useState } from "react";
import { CreditCard, Loader2 } from "lucide-react"; // 🔹 import Loader2
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface Card {
  id: string;
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
}

interface Props {
  privacy: boolean;
}

const maskCard = (number: string, privacy: boolean) =>
  privacy ? `**** **** **** ${number.slice(-4)}` : "**** **** **** ****";

const maskValue = (value: string, privacy: boolean) =>
  privacy ? value : "****";

const PaymentMethods: React.FC<Props> = ({ privacy }) => {
  const { user, updateUser } = useAuth();
  const [newCard, setNewCard] = useState<Card>({
    id: "",
    number: "",
    holder: "",
    expiry: "",
    cvv: "",
  });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState<string | null>(null);

  if (!user) return null;

  const addCard = async () => {
    if (
      newCard.number.trim().length >= 12 &&
      newCard.holder &&
      newCard.expiry &&
      newCard.cvv
    ) {
      setLoadingAdd(true);
      try {
        const updatedCards = [
          ...(user?.paymentMethods || []),
          { ...newCard, id: Date.now().toString() },
        ];

        await updateUser({ paymentMethods: updatedCards });
        setNewCard({ id: "", number: "", holder: "", expiry: "", cvv: "" });
        toast.success("Card added successfully!");
      } catch (err: any) {
        toast.error(err.message || "Failed to add card");
      } finally {
        setLoadingAdd(false);
      }
    } else {
      toast.error("Please fill all card details correctly!");
    }
  };

  const deleteCard = async (id: string) => {
    setLoadingDeleteId(id);
    try {
      const updatedCards = (user?.paymentMethods || []).filter(
        (c: any) => c.id !== id
      );
      await updateUser({ paymentMethods: updatedCards });
      toast.success("Card removed successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to remove card");
    } finally {
      setLoadingDeleteId(null);
    }
  };

  return (
    <div className="w-full max-w-lg mt-6 sm:mt-8">
      <h2 className="text-[18px] sm:text-[20px] font-bold mb-4">
        Payment Methods
      </h2>

      {(user.paymentMethods || []).map((card: Card) => (
        <div
          key={card.id}
          className="bg-[#182534] rounded-lg p-4 mb-3 flex flex-col sm:flex-row sm:items-center justify-between"
        >
          <div>
            <div className="flex items-center gap-2">
              <CreditCard size={18} />
              <p className="text-base sm:text-lg font-semibold">
                {maskCard(card.number, privacy)}
              </p>
            </div>
            <p className="text-xs sm:text-sm text-[#90abcb]">
              Holder: {maskValue(card.holder, privacy)}
            </p>
            <p className="text-xs sm:text-sm text-[#90abcb]">
              Expiry: {maskValue(card.expiry, privacy)}
            </p>
            <p className="text-xs sm:text-sm text-[#90abcb]">
              CVV: {maskValue(card.cvv, privacy)}
            </p>
          </div>
          <button
            onClick={() => deleteCard(card.id)}
            disabled={loadingDeleteId === card.id}
            className={`text-red-400 hover:text-red-600 text-xs sm:text-sm flex items-center gap-1 ${
              loadingDeleteId === card.id ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loadingDeleteId === card.id ? (
              <Loader2 className="animate-spin h-4 w-4" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      ))}

      {/* Add Card */}
      <div className="bg-[#182534] rounded-lg p-4 mt-4">
        <h3 className="text-base sm:text-lg font-bold mb-3">Add New Card</h3>
        <input
          type="text"
          placeholder="Card Number"
          value={newCard.number}
          onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
          className="w-full bg-[#223449] px-4 py-2 rounded-lg text-white mb-3 text-sm sm:text-base"
        />
        <input
          type="text"
          placeholder="Cardholder Name"
          value={newCard.holder}
          onChange={(e) => setNewCard({ ...newCard, holder: e.target.value })}
          className="w-full bg-[#223449] px-4 py-2 rounded-lg text-white mb-3 text-sm sm:text-base"
        />
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Expiry (MM/YY)"
            value={newCard.expiry}
            onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
            className="flex-1 bg-[#223449] px-4 py-2 rounded-lg text-white mb-3 text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="CVV"
            value={newCard.cvv}
            onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
            className="flex-1 bg-[#223449] px-4 py-2 rounded-lg text-white mb-3 text-sm sm:text-base"
          />
        </div>
        <button
          onClick={addCard}
          disabled={loadingAdd}
          className={`bg-[#223449] px-4 py-2 rounded-lg w-full hover:bg-[#2e4a6b] text-sm sm:text-base flex justify-center items-center gap-2 ${
            loadingAdd ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loadingAdd && <Loader2 className="animate-spin h-4 w-4" />}
          {loadingAdd ? "Adding..." : "Add Card"}
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
