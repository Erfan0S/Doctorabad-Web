import { Request } from "@repo/core/http-request/Request";
import { User, VerifyPhoneInput } from "@repo/core/types/user";
import { ProvidersList } from "@/types/providers";
import {
  PaginatedRequest,
  PaginatedResponse,
  ResponseType,
  SelectionItem,
} from "@repo/core/types/general";
import {
  ProductListOptions,
  Product,
  SingleProduct,
  AmazingProduct,
  ProductComments,
  ProductShare,
} from "@repo/core/types/product";
import { PaymentResult } from "@repo/core/types/cart";
import { Banner } from "@/types/banner";
import { MainSliderItem, MainSliderResponse } from "@/types/slider";
import { HomeStatisticsType } from "@/types/homeStatistics";
import { BlogType } from "@/types/blog";

import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import {
  CreateOrderResponse,
  DiscountCodeResponse,
  DrProActivePlan,
  ExplanationItem,
  PlanItem,
} from "@/types/dr-pro";

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

  // providers
  getProviders(): Promise<ResponseType<PaginatedResponse<ProvidersList>>> {
    return this.request.get<PaginatedResponse<ProvidersList>>(
      "/user/shop/provider",
      {
        next: { revalidate: 3600 },
      },
    );
  }

  // product
  getProductList = (
    params: PaginatedRequest<ProductListOptions>,
  ): Promise<ResponseType<{ data: Product[] }>> => {
    return this.request.get<{ data: Product[] }>(
      "/user/shop/product/new/list",
      { params },
    );
  };

  searchProducts = (
    params: PaginatedRequest<{ q: string }>,
  ): Promise<ResponseType<{ data: Product[] }>> => {
    return this.request.get<{ data: Product[] }>(
      "/user/shop/product/new/search",
      { params },
    );
  };

  getAmazingProductList = (
    params: PaginatedRequest,
  ): Promise<
    ResponseType<{ data: AmazingProduct[]; amazing_time: string }>
  > => {
    return this.request.get<{ data: AmazingProduct[]; amazing_time: string }>(
      "/user/shop/product/new/amazing",
      { params },
    );
  };

  getSuggestedProductList = (
    params: PaginatedRequest,
  ): Promise<ResponseType<{ data: Product[] }>> => {
    return this.request.get<{ data: Product[] }>(
      "/user/shop/product/new/suggest",
      { params },
    );
  };

  getNewestProductList = (
    params: PaginatedRequest,
  ): Promise<ResponseType<{ data: Product[] }>> => {
    return this.request.get<{ data: Product[] }>(
      "/user/shop/product/new/newest",
      { params },
    );
  };

  getBesSellingProductList = (
    params: PaginatedRequest,
  ): Promise<ResponseType<{ data: Product[] }>> => {
    return this.request.get<{ data: Product[] }>(
      "/user/shop/product/new/bestselling",
      { params },
    );
  };

  getLastSeenProductList = (
    params: PaginatedRequest,
  ): Promise<ResponseType<{ data: Product[] }>> => {
    return this.request.get<{ data: Product[] }>(
      "/user/shop/product/new/lastSeen",
      {
        params,
        cache: "no-store",
      },
    );
  };

  getProductCount = (): Promise<ResponseType<{ data: number }>> => {
    return this.request.get<{ data: number }>("/user/shop/product/count");
  };

  shareProduct(id: number): Promise<ResponseType<{ data: ProductShare }>> {
    return this.request.get<{ data: ProductShare }>(
      `/user/shop/product/share/${id}`,
    );
  }

  restockNotification(
    id: number,
  ): Promise<ResponseType<{ data: ProductShare }>> {
    return this.request.get<{ data: ProductShare }>(
      `/user/shop/product/letMeKnow/${id}`,
    );
  }

  // single product
  getSingleProduct(id: number): Promise<ResponseType<{ data: SingleProduct }>> {
    return this.request.get<{ data: SingleProduct }>(
      `/user/shop/product/single/${id}`,
    );
  }

  getSingleProductBySlug(
    slug: string,
  ): Promise<ResponseType<{ data: SingleProduct }>> {
    return this.request.get<{ data: SingleProduct }>(
      `/user/shop/product/slug/${slug}`,
    );
  }

  getRelatedProducts(id: number): Promise<ResponseType<{ data: Product[] }>> {
    return this.request.get<{ data: Product[] }>(
      `/user/shop/product/new/related/${id}`,
    );
  }

  createCOmment(data: {
    id: number;
    text: string;
    rate: number;
  }): Promise<any> {
    return this.request.post("/user/shop/comment", data);
  }

  getCommentsList(
    productID: number,
    page: number,
  ): Promise<ResponseType<ProductComments>> {
    return this.request.get<ProductComments>(
      `/user/shop/comment/new/${productID}`,
      { params: { page } },
    );
  }

  getOrderResult = (
    paymentToken: string,
  ): Promise<ResponseType<PaymentResult>> => {
    return this.request.get<PaymentResult>(
      `/user/shop/order/result/${paymentToken}`,
    );
  };

  // fields and grades
  getFields = (
    type: number,
  ): Promise<ResponseType<{ data: SelectionItem[] }>> => {
    return this.request.get<{ data: SelectionItem[] }>("/user/find/fields", {
      params: { type },
    });
  };

  getGrades = (
    field_id: number,
    type: number,
  ): Promise<ResponseType<{ data: SelectionItem[] }>> => {
    return this.request.get<{ data: SelectionItem[] }>("/user/find/grades", {
      params: {
        field_id: String(field_id),
        type,
      },
    });
  };

  // home page sliders
  getMainSliders(): Promise<ResponseType<{ data: Banner[] }>> {
    return this.request.get<{ data: Banner[] }>("/user/shop/sliders", {
      next: { revalidate: 3600 },
    });
  }

  getMainHomePageSlider(): Promise<ResponseType<MainSliderResponse>> {
    return this.request.get<MainSliderResponse>("/user/home/main/sliders", {
      next: { revalidate: 3600 },
    });
  }

  reportIssue = ({
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

  getFestivalProductList = ({
    id,
    ...params
  }: PaginatedRequest<{ id: number }>): Promise<
    ResponseType<{ data: Product[] }>
  > => {
    return this.request.get<{ data: Product[] }>(`/user/shop/festival/${id}`, {
      params,
    });
  };

  getProductTypes = (): Promise<
    ResponseType<{ data: { id: number; title: string }[] }>
  > => {
    return this.request.get<{ data: { id: number; title: string }[] }>(
      `/user/find/product/types`,
    );
  };

  getProductPriceRange = (): Promise<
    ResponseType<{ data: { min: number; max: number } }>
  > => {
    return this.request.get<{ data: { min: number; max: number } }>(
      `/user/shop/product/price/range`,
    );
  };

  verifyMultimediaContent(data: {
    verification_code: string;
    token: string;
  }): Promise<any> {
    return this.request.post("/user/qrcode/verify", data);
  }

  getHomeStatistics(): Promise<ResponseType<{ data: HomeStatisticsType }>> {
    return this.request.get<{ data: HomeStatisticsType }>(
      "/user/home/counter",
      { next: { revalidate: 36000 } },
    );
  }

  getMagazinePosts(): Promise<ResponseType<{ data: BlogType[] }>> {
    return this.request.get<{ data: BlogType[] }>("/user/shop/magazine/posts", {
      next: { revalidate: 36000 },
    });
  }

  //DR Pro


}

export const api = new Api();
