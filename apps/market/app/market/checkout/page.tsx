'use client';

import { api } from '@/api/Api';
import Cart from '@/components/checkout/cart';
import Pay from '@/components/checkout/pay';
import Shipping from '@/components/checkout/shipping';
import { useCart } from '@/states/cart';
import { ShippingMethod } from '@/types/cart';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { data: address, isLoading: loadingAddress } = useQuery({
    queryFn: api.getAddressesList,
    queryKey: ['addressList'],
  });

  const { data: cartItems } = useCart();

  const addressData = address?.data.data?.find((address) => address.default);

  const shippingMutation = useMutation({
    mutationFn: (data: ShippingMethod) => {
      return api.selectShippingMethod({ shipping_method_id: data.id, address_id: addressData!.id });
    },
    retry: 0,
    onSuccess: (resp, data: ShippingMethod) => {
      setCurrentShippingMethod({ ...data, price: resp.data.data.price });
    },
    onError: () => {
      setSelectedShippingMethod(undefined);
    },
  });

  const [currentShippingMethod, setCurrentShippingMethod] = useState<ShippingMethod | undefined>();
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<ShippingMethod | undefined>();

  const onChangeShippingMethod = (method: ShippingMethod) => {
    if (addressData && addressData.mobile && addressData.address) {
      setSelectedShippingMethod(method);
      shippingMutation.mutate(method);
    } else {
      toast('لطفا ابتدا آدرس خود را تکمیل کنید', { type: 'error', position: 'top-left' });
    }
  };
  3;

  useEffect(() => {
    if (currentShippingMethod) {
      shippingMutation.mutate(currentShippingMethod);
    }
  }, [cartItems]);

  return (
    <div className="row">
      <div className="col-xl-4">
        <Cart />
      </div>
      <div className="col-xl-4">
        <Shipping
          isLoading={loadingAddress}
          address={addressData}
          onChangeShippingMethod={onChangeShippingMethod}
          currentShippingMethod={currentShippingMethod}
          selectedShipingMethod={selectedShippingMethod}
        />
      </div>
      <div className="col-xl-4">
        <Pay shippingMethod={currentShippingMethod} currentAddress={addressData} />
      </div>
    </div>
  );
}
