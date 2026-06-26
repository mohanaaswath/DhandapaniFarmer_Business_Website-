import { useEffect } from "react";
import { ProductsProvider } from "./context/ProductsContext";
import { CartProvider } from "./context/CartContext";
import AppRoutes from "./routes/AppRoutes";
import { initEmailJS } from "./services/emailService";
import ToastContainer from "./components/ToastContainer/ToastContainer";
import ProductFormModal from "./components/ProductFormModal/ProductFormModal";
import DeleteConfirmModal from "./components/DeleteConfirmModal/DeleteConfirmModal";

import RealEstateFormModal from "./components/RealEstateFormModal/RealEstateFormModal";
import RealEstateDeleteModal from "./components/RealEstateDeleteModal/RealEstateDeleteModal";

import { LivestockProvider } from "./context/LivestockContext";
import { RealEstateProvider } from "./context/RealEstateContext";

function App() {
  useEffect(() => {
    initEmailJS();
  }, []);

  return (
    <ProductsProvider>
      <CartProvider>
        <LivestockProvider>
          <RealEstateProvider>
            <AppRoutes />
            <ToastContainer />
            <ProductFormModal />
            <DeleteConfirmModal />
            <RealEstateFormModal />
            <RealEstateDeleteModal />
          </RealEstateProvider>
        </LivestockProvider>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
