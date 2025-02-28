import { Request } from "@repo/core/http-request/Request";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import {
  AvatarList,
  LiveChatInformation,
  MessageItem,
  ShareToFriends,
  SingleMessage,
  User,
  VerifyPhoneInput,
} from "@repo/core/types/user";
import {
  PaginatedResponse,
  ResponseType,
  SelectionItem,
} from "@repo/core/types/general";
import {
  CartResponse,
  ChangeQuantityType,
  CreateOrderRequest,
  CreateOrderResponse,
  DiscountInfo,
  OrderType,
  PaymentResult,
  ShippingAddress,
  ShippingMethod,
} from "@repo/core/types/cart";
import { ProductVariantsValue } from "@repo/core/types/productVariants";
import { LastProcessingOrder, PreviousOrder } from "../checkout/types/orders";
import { Product } from "@repo/core/types/product";
import {
  BuyOfferResponse,
  ClubOffer,
  ClubTransaction,
  HelpText,
} from "../userSidePanel/types/doctorClub";
import { UserClubInfo } from "@repo/core/types/general";
import { BookContents } from "../userSidePanel/types/bookContents";
import { CourseFavoriteItem, CourseOrderItem } from "@repo/core/types/course";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  getCsrf(): Promise<any> {
    return this.request.get("/sanctum/csrf-cookie");
  }

  // user
  sendVerificationCode(mobile: string): Promise<any> {
    return this.request.post("/user/verification/send", { mobile });
  }

  verifyPhone(data: VerifyPhoneInput): Promise<ResponseType<User>> {
    return this.request.post<User>("/user", data);
  }

  logout(): Promise<any> {
    return this.request.get("/user/logout");
  }

  getUser = (): Promise<ResponseType<{ data: User }>> => {
    return this.request.get<{ data: User }>("/user");
  };

  updateUser = (data: Partial<User>): Promise<any> => {
    return this.request.put("/user", {
      ...data,
      grade: data.grade_id,
      field: data.field_id,
      province: data.province_id,
      city: data.city_id,
    });
  };

  getAvatarList = (): Promise<ResponseType<AvatarList>> => {
    return this.request.get<AvatarList>("/user/avatar/list");
  };

  selectAvatar = (filename: string): Promise<any> => {
    return this.request.post(`/user/avatar/select`, { filename });
  };

  // cart
  getCartList(): Promise<ResponseType<CartResponse>> {
    return this.request.get<CartResponse>("/user/v1/cart");
  }

  addToCart(
    productId: number,
    type: OrderType,
    variants?: ProductVariantsValue[]
  ): Promise<ResponseType<CartResponse>> {
    return this.request.post<CartResponse>("/user/shop/cart", {
      id: productId,
      type: type,
      quantity: 1,
      variants: variants,
    });
  }

  removeFromCart(orderId: number): Promise<any> {
    return this.request.delete(`/user/shop/cart/${orderId}`);
  }

  changeQuantity(orderId: number, type: ChangeQuantityType): Promise<any> {
    return this.request.post(`/user/v1/cart/change/count`, {
      order_item_id: orderId,
      type: type,
    });
  }

  decreaseQuantity(orderId: number): Promise<ResponseType<CartResponse>> {
    return this.changeQuantity(orderId, ChangeQuantityType.Decrease);
  }

  increaseQuantity(orderId: number): Promise<ResponseType<CartResponse>> {
    return this.changeQuantity(orderId, ChangeQuantityType.Increase);
  }

  getLastProcessingOrder = (): Promise<ResponseType<LastProcessingOrder>> => {
    return this.request.get<LastProcessingOrder>("/user/shop/order/last/doing");
  };

  // address
  getAddressesList = (): Promise<ResponseType<{ data: ShippingAddress[] }>> => {
    return this.request.get<{ data: ShippingAddress[] }>("/user/shop/address");
  };

  getProvincesList = (): Promise<ResponseType<{ data: SelectionItem[] }>> => {
    return this.request.get<{ data: SelectionItem[] }>("/user/find/provinces");
  };

  getCitiesList = (
    provinceId: number
  ): Promise<ResponseType<{ data: SelectionItem[] }>> => {
    return this.request.post<{ data: SelectionItem[] }>("/user/find/cities", {
      province_id: provinceId,
    });
  };

  getTopinCitiesList = (
    provinceId: number
  ): Promise<ResponseType<{ data: SelectionItem[] }>> => {
    return this.request.post<{ data: SelectionItem[] }>(
      "/user/find/tapin/cities",
      {
        province_id: provinceId,
      }
    );
  };

  addAddress = (
    data: Partial<ShippingAddress>
  ): Promise<ResponseType<{ data: ShippingAddress }>> => {
    return this.request.post<{ data: ShippingAddress }>(
      "/user/shop/address",
      data
    );
  };

  updateAddress = (
    addressId: number,
    data: Partial<ShippingAddress>
  ): Promise<ResponseType<{ data: ShippingAddress }>> => {
    return this.request.put<{ data: ShippingAddress }>(
      `/user/shop/address/${addressId}`,
      data
    );
  };

  getShippingMethods = (): Promise<
    ResponseType<{ data: ShippingMethod[] }>
  > => {
    return this.request.get<{ data: ShippingMethod[] }>("/user/shop/shipping");
  };

  selectShippingMethod = (data: {
    shipping_method_id: number;
    address_id: number;
  }): Promise<ResponseType<{ data: { price: number } }>> => {
    return this.request.post<{ data: { price: number } }>(
      "/user/shop/shipping/select",
      data
    );
  };

  checkDiscountCode(code: string): Promise<ResponseType<DiscountInfo>> {
    return this.request.get<DiscountInfo>(
      `/user/shop/discountCode/check?code=${code}`
    );
  }

  createOrder(
    data: CreateOrderRequest
  ): Promise<ResponseType<CreateOrderResponse>> {
    return this.request.post<CreateOrderResponse>("/user/shop/order", data);
  }

  getOrderResult = (
    paymentToken: string
  ): Promise<ResponseType<PaymentResult>> => {
    return this.request.get<PaymentResult>(
      `/user/shop/order/result/${paymentToken}`
    );
  };

  // fields and grades
  getFields = (
    type: number
  ): Promise<ResponseType<{ data: SelectionItem[] }>> => {
    return this.request.get<{ data: SelectionItem[] }>("/user/find/fields", {
      params: { type },
    });
  };

  getGrades = (
    field_id: number,
    type: number
  ): Promise<ResponseType<{ data: SelectionItem[] }>> => {
    return this.request.get<{ data: SelectionItem[] }>("/user/find/grades", {
      params: {
        field_id: String(field_id),
        type,
      },
    });
  };

  // account
  getMessageList = (
    page: number
  ): Promise<ResponseType<{ data: MessageItem[] }>> => {
    return this.request.get<{ data: MessageItem[] }>(
      `/user/message?page=${page}`
    );
  };

  getSingleMessage = (
    id: number
  ): Promise<ResponseType<{ data: SingleMessage }>> => {
    return this.request.get<{ data: SingleMessage }>(
      `/user/message/show/${id}`
    );
  };

  getMessagesCount = (): Promise<
    ResponseType<{ data: { counter: number } }>
  > => {
    return this.request.get<{ data: { counter: number } }>(
      `/user/message/new/count`
    );
  };

  shareInformation = (): Promise<ResponseType<{ data: ShareToFriends }>> => {
    return this.request.get<{ data: ShareToFriends }>(`/user/share`);
  };

  getShopOrdersList = (
    page: number
  ): Promise<ResponseType<{ data: PreviousOrder[] }>> => {
    return this.request.get<{ data: PreviousOrder[] }>(
      `/user/shop/order/list?page=${page}`
    );
  };

  getLearnOrdersList = (
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseOrderItem[]>>> => {
    return this.request.get(`/user/v1/education/previous/orders`, {
      params: { page },
    });
  };

  getLearnFavoriteList = (
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseFavoriteItem[]>>> => {
    return this.request.get("/user/v1/education/favorite", {
      params: { page },
    });
  };

  getShopFavoriteList = (
    page: number
  ): Promise<ResponseType<{ data: Product[] }>> => {
    return this.request.get(`/user/shop/favorite/list?page=${page}`);
  };

  prodoctReportIssue = ({
    text,
    productId,
  }: {
    text: string;
    productId: number;
  }): Promise<any> => {
    return this.request.post(`/user/shop/error/report`, {
      error_report_text: text,
      id: productId,
    });
  };

  courseReportIssue = ({
    text,
    productId,
  }: {
    text: string;
    productId: number;
  }): Promise<any> => {
    return this.request.post(`/user/v1/education/error/report`, {
      error_report_text: text,
      id: productId,
    });
  };

  getLiveChatInformation = (): Promise<
    ResponseType<{ data: LiveChatInformation }>
  > => {
    return this.request.get<{ data: LiveChatInformation }>("/user/chat");
  };

  getPreviousOrderDetail = (
    orderCode: string
  ): Promise<ResponseType<LastProcessingOrder>> => {
    return this.request.get<LastProcessingOrder>(
      `/user/shop/order/details/${orderCode}`
    );
  };

  // club
  getClubHelpText = (): Promise<ResponseType<{ data: HelpText }>> => {
    return this.request.get<{ data: HelpText }>(`/user/club/help/text`);
  };

  getUserClubInfo = (): Promise<ResponseType<{ data: UserClubInfo }>> => {
    return this.request.get<{ data: UserClubInfo }>("/user/club/user/info");
  };

  getOffersList = (
    page: number
  ): Promise<ResponseType<{ data: ClubOffer[] }>> => {
    return this.request.get<{ data: ClubOffer[] }>(`/user/club/plan/list`, {
      params: { page },
    });
  };

  buyOffer = (
    id: number
  ): Promise<ResponseType<{ data: BuyOfferResponse }>> => {
    return this.request.get<{ data: BuyOfferResponse }>(
      `/user/club/plan/buy/${id}`
    );
  };

  getClubTransactionsList = (
    page: number
  ): Promise<ResponseType<{ data: ClubTransaction[] }>> => {
    return this.request.get<{ data: ClubTransaction[] }>(
      `/user/club/coin/list`,
      { params: { page } }
    );
  };

  getMultiMediaContentsFromId(
    id: string
  ): Promise<ResponseType<{ data: BookContents }>> {
    return this.request.get<{ data: BookContents }>(
      `/api/user/book/qrcode/files/${id}`
    );
  }

  verifyMultimediaContent(data: {
    verification_code: string;
    token: string;
  }): Promise<any> {
    return this.request.post("/user/qrcode/verify", data);
  }
}

export const api = new Api();
