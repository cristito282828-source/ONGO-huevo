'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { getProduct } from '@/lib/woocommerce';

interface LocalCartItem {
  key: string;
  productId: string;
  productName: string;
  productSlug: string;
  // Datos de variación
  variationId?: string;
  variationName?: string;
  variationSize?: string;
  price: number;
  priceDisplay: string;
  regularPrice?: number;
  regularPriceDisplay?: string;
  quantity: number;
  image?: {
    sourceUrl?: string;
    altText?: string;
  };
}

interface LocalCart {
  contents: {
    nodes: LocalCartItem[];
  };
  subtotal: string;
  total: string;
  shippingTotal: string;
  discountTotal: string;
  feeTotal: string;
}

interface CartContextType {
  cart: LocalCart | null;
  itemCount: number;
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (productId: string, quantity?: number, productData?: any, variationData?: any) => Promise<boolean>;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  refreshCart: () => void;
}

const CART_STORAGE_KEY = 'example_store_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Función para formatear precios en CLP
const formatCLP = (num: number) => {
  const rounded = Math.round(num);
  return '$' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Función para extraer número de precio (maneja ambos formatos)
const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  let cleaned = priceStr.replace(/[^0-9.,]/g, '') || '0';

  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');

  if (hasComma && hasDot) {
    const parts = cleaned.split('.');
    if (parts.length === 2 && parts[1] && parts[1].length <= 2) {
      cleaned = cleaned.replace(/,/g, '').replace(/\.\d+$/, '');
    } else {
      cleaned = cleaned.replace(/,/g, '').replace(/\./g, '');
    }
  } else if (hasDot) {
    const parts = cleaned.split('.');
    if (parts.length > 1 && parts.some(p => p && p.length === 3)) {
      cleaned = cleaned.replace(/\./g, '');
    } else {
      cleaned = Math.round(parseFloat(cleaned)).toString();
    }
  } else if (hasComma) {
    const parts = cleaned.split(',');
    if (parts.length === 2 && parts[1] && parts[1].length <= 2) {
      cleaned = parts[0] || '0';
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  }

  return parseFloat(cleaned || '0');
};

// Guardar carrito en localStorage
const saveCart = (cart: LocalCart | null) => {
  if (typeof window !== 'undefined') {
    if (cart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }
};

// Cargar carrito desde localStorage.
// Si el carrito guardado tiene `priceDisplay` (unitario o no) inconsistente,
// recalculamos los totales desde `item.price * item.quantity` para garantizar
// que siempre estén bien al volver a abrir la app.
const loadCart = (): LocalCart | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.contents?.nodes) {
          // Recalcular totales para corregir carritos corruptos por bugs previos
          const totals = calculateCartTotals(parsed.contents.nodes);
          return { ...parsed, ...totals };
        }
        return parsed;
      } catch {
        return null;
      }
    }
  }
  return null;
};

// Calcular totales del carrito
const calculateCartTotals = (items: LocalCartItem[]) => {
  // Usamos `item.price` (numérico, ya es unitario) en vez de parsear priceDisplay
  // para evitar duplicar el factor de cantidad.
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);

  return {
    subtotal: formatCLP(subtotal),
    total: formatCLP(subtotal),
    shippingTotal: '$0',
    discountTotal: '$0',
    feeTotal: '$0'
  };
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<LocalCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Cargar carrito desde localStorage al montar
  useEffect(() => {
    const savedCart = loadCart();
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Guardar carrito en localStorage cuando cambia
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  const addToCart = useCallback(async (
    productId: string,
    quantity: number = 1,
    productData?: any,
    variationData?: any
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Usar datos proporcionados o obtener de la API
      let product = productData;
      if (!product) {
        product = await getProduct(productId);
      }

      if (!product) {
        alert('Producto no encontrado');
        return false;
      }

      // Extraer precio de variación o del producto
      const variationPrice = variationData?.price || product.priceRange?.minVariantPrice?.amount || product.priceRange?.maxVariantPrice?.amount || '0';
      const priceNum = parsePrice(String(variationPrice));
      const regularPriceNum = variationData?.regularPrice ? parsePrice(String(variationData.regularPrice)) : priceNum;

      // Datos de variación para el carrito
      const cartVariationData = {
        variationId: variationData?.id || null,
        variationName: variationData?.name || null,
        variationSize: variationData?.size || null
      };

      setCart(prevCart => {
        // Si hay variación, buscar por productId + variationId
        // Si no hay variación, buscar solo por productId
        const searchKey = variationData?.id
          ? `${productId}-${variationData.id}`
          : productId;

        // Buscar si el producto con esta variación ya está en el carrito
        const existingItem = prevCart?.contents.nodes.find(
          item => variationData?.id
            ? item.productId === productId && item.variationId === variationData.id
            : item.productId === productId
        );

        if (existingItem) {
          // Actualizar cantidad
          const updatedNodes = prevCart!.contents.nodes.map(item => {
            const isMatch = variationData?.id
              ? item.productId === productId && item.variationId === variationData.id
              : item.productId === productId;

            if (isMatch) {
              const newQuantity = item.quantity + quantity;
              // priceDisplay es SIEMPRE el precio unitario.
              // El subtotal por línea se calcula en el render como price × quantity.
              return {
                ...item,
                quantity: newQuantity,
                priceDisplay: formatCLP(priceNum)
              };
            }
            return item;
          });

          const totals = calculateCartTotals(updatedNodes);
          return {
            ...prevCart!,
            contents: { nodes: updatedNodes },
            ...totals
          };
        } else {
          // Agregar nuevo item
          const newItem: LocalCartItem = {
            key: searchKey,
            productId: productId,
            productName: product.title,
            productSlug: product.handle,
            variationId: cartVariationData.variationId,
            variationName: cartVariationData.variationName,
            variationSize: cartVariationData.variationSize,
            price: priceNum,
            // priceDisplay es SIEMPRE el precio unitario.
            priceDisplay: formatCLP(priceNum),
            regularPrice: regularPriceNum !== priceNum ? regularPriceNum : undefined,
            regularPriceDisplay: regularPriceNum !== priceNum ? formatCLP(regularPriceNum) : undefined,
            quantity,
            image: variationData?.image || product.featuredImage ? {
              sourceUrl: variationData?.image || product.featuredImage.url,
              altText: variationData?.imageAlt || product.featuredImage.altText
            } : undefined
          };

          const updatedNodes = [...(prevCart?.contents.nodes || []), newItem];
          const totals = calculateCartTotals(updatedNodes);

          return {
            contents: { nodes: updatedNodes },
            ...totals
          };
        }
      });

      openCart();
      return true;
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar al carrito');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (!cart) return;

    if (quantity < 1) {
      removeItem(key);
      return;
    }

    setCart(prevCart => {
      if (!prevCart) return prevCart;

      const updatedNodes = prevCart.contents.nodes.map(item => {
        if (item.key === key) {
          // priceDisplay siempre es unitario; el subtotal se calcula en el render.
          return {
            ...item,
            quantity: quantity,
            priceDisplay: formatCLP(item.price)
          };
        }
        return item;
      });

      const totals = calculateCartTotals(updatedNodes);

      return {
        ...prevCart,
        contents: { nodes: updatedNodes },
        ...totals
      };
    });
  }, [cart]);

  const removeItem = useCallback((key: string) => {
    setCart(prevCart => {
      if (!prevCart) return prevCart;

      const updatedNodes = prevCart.contents.nodes.filter(item => item.key !== key);

      if (updatedNodes.length === 0) {
        return null;
      }

      const totals = calculateCartTotals(updatedNodes);

      return {
        ...prevCart,
        contents: { nodes: updatedNodes },
        ...totals
      };
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart(null);
  }, []);

  const refreshCart = useCallback(() => {
    // Recargar desde localStorage
    const savedCart = loadCart();
    setCart(savedCart);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(() => {
    if (!cart) return 0;
    return cart.contents.nodes.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const value: CartContextType = {
    cart,
    itemCount,
    isLoading,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
