"use client";
import { useState } from "react";
import style from "./Shipping.module.scss";
import { shippingItemsData } from "./shipping-items";
import ShippingItem from "./shippingItem";
import { modalActions } from "@/states/modals";
import { ModalTypes } from "@/types/modals";
import { useQueries, useQuery } from "@tanstack/react-query";
import { api } from "@/api/Api";
import Loading from "@/components/common/loading";
import { ShippingAddress, ShippingMethod } from "@repo/core/types";

type Props = {
  isLoading: boolean;
  address: ShippingAddress | undefined;
  onChangeShippingMethod: (method: ShippingMethod) => void;
  currentShippingMethod: ShippingMethod | undefined;
  selectedShipingMethod: ShippingMethod | undefined;
};

const Shipping = ({
  isLoading,
  address,
  onChangeShippingMethod,
  currentShippingMethod,
  selectedShipingMethod,
}: Props) => {
  const { data: shippingData, isLoading: shippingLoading } = useQuery({
    queryFn: api.getShippingMethods,
    queryKey: ["shippingItems"],
  });

  const isAddressAvailable = address && address?.address;

  const handleAddAddress = () => {
    modalActions.addModal(ModalTypes.ADD_ADDRESS, {
      initialData: address || null,
    });
  };

  return (
    <div className={style.shipping}>
      {isLoading ? (
        <Loading className={style.loading} />
      ) : (
        <>
          <div className={style.shippingTitle}>
            <span>اطلاعات‌من</span>
            {isAddressAvailable && (
              <small onClick={handleAddAddress}>ویرایش آدرس</small>
            )}
          </div>
          {isAddressAvailable ? (
            <div className={style.shippingDetail}>
              <ul>
                <li>
                  <span>گیرنده:</span>
                  <span>{address.receiver}</span>
                </li>
                <li>
                  <span>شماره همراه:</span>
                  <span>{address.mobile}</span>
                </li>
                <li>
                  <span>استان</span>
                  <span>{address.province_title}</span>
                  <span>شهر</span>
                  <span>{address.city_title}</span>
                </li>
                <li>
                  <span>آدرس:</span>
                  <span>{address.address}</span>
                </li>
                <li>
                  <span>کد پستی:</span>
                  <span>{address.postal_code}</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className={style.shippingEmptyAddress}>
              <p>برای ادامه مراحل خرید آدرس خود را ثبت کنید</p>
              <button onClick={handleAddAddress}>افزودن آدرس</button>
            </div>
          )}
          <div className={style.shippingItems}>
            {shippingLoading ? (
              <Loading size={20} />
            ) : (
              shippingData?.data.data.map((shippingItem) => (
                <ShippingItem
                  key={shippingItem.id}
                  {...shippingItem}
                  onClick={onChangeShippingMethod}
                  active={currentShippingMethod?.id === shippingItem.id}
                  isLoading={
                    currentShippingMethod?.id !== shippingItem.id &&
                    selectedShipingMethod?.id === shippingItem.id
                  }
                />
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Shipping;
