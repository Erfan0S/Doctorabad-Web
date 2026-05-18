import { Request } from "@repo/core/http-request/Request";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { PaginatedResponse, ResponseType } from "@repo/core/types/general";
import {
  PackageComments,
  PackageDataType,
  PackageListItemType,
  PackageShare,
  Note,
  PaginatedAmazingPackages,
  previousOrders,
  VideoType,
  PackageOrderListItemType,
  PackageItem,
  CollectionSingleType,
} from "@/types/packages";
import {
  CollectionType,
  ProviderListType,
  ProviderType,
  SliderType,
  SubjectType,
} from "@/types/homePage";
import { Categories } from "@/types/filters";
import { FieldGradeType, SortType } from "@/types/filters";
import { SingleProviderType } from "@/types/ProviderPage";
import { PaymentResult } from "@repo/core/types/cart";
import { User } from "@repo/core/types/user";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  getOrderResult = (
    paymentToken: string,
  ): Promise<ResponseType<PaymentResult>> => {
    return this.request.get<PaymentResult>(
      `/user/shop/order/result/${paymentToken}`,
    );
  };

  getUser = (): Promise<ResponseType<{ data: User }>> => {
    return this.request.get("/user");
  };

  // single package

  getPackageDataType(
    id: number,
  ): Promise<ResponseType<{ data: PackageDataType }>> {
    return this.request.get<{ data: PackageDataType }>(
      `/user/v1/package/${id}`,
    );
  }
  getPackage(id: number): Promise<ResponseType<{ data: PackageItem }>> {
    return this.request.get<{ data: PackageItem }>(`/user/v1/package/${id}`);
  }

  createPackageComment(data: {
    packageId: number;
    text: string;
  }): Promise<any> {
    return this.request.post(
      `/user/v1/package/comment/${data.packageId}`,
      data,
    );
  }

  getPackageCommentsList(
    packageId: number,
    page: number,
  ): Promise<ResponseType<PackageComments>> {
    return this.request.get<PackageComments>(
      `/user/v1/package/comment/${packageId}`,
      { params: { page } },
    );
  }

  getRelatedPackages(
    id: number,
  ): Promise<ResponseType<{ data: PackageListItemType[] }>> {
    return this.request.get<{ data: PackageListItemType[] }>(
      `/user/v1/package/related/${id}`,
    );
  }

  sharePackage(id: number): Promise<ResponseType<{ data: PackageShare }>> {
    return this.request.get(`/user/v1/package/share/${id}`);
  }

  addFavorite(id: number): Promise<{}> {
    return this.request.post(`/user/v1/package/favorite`, {
      favorite: 1,
      package: id,
    });
  }
  removeFavorite(id: number): Promise<{}> {
    return this.request.post(`/user/v1/package/favorite`, {
      favorite: 0,
      package: id,
    });
  }

  // removePackageFavorite = (id: number): Promise<any> => {
  //   return this.request.delete(`/user/v1/package/favorite/${id}`);
  // };



  getRelatedCourses(
    id: number,
  ): Promise<ResponseType<{ data: PackageListItemType[] }>> {
    return this.request.get<{ data: PackageListItemType[] }>(
      `/user/v1/package/related/${id}`,
    );
  }







  // main page
  getProviders(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<ProviderType[]>>> {
    return this.request.get("/user/v1/package/provider", {
      params: { page },
    });
  }
  getProvidersList(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<ProviderListType[]>>> {
    return this.request.get("/user/v1/package/find/providers", {
      params: { page },
    });
  }
  getSingleProvider(
    id: number,
    page: number = 1,
  ): Promise<ResponseType<SingleProviderType>> {
    return this.request.get(`/user/v1/package/provider/${id}`, {
      params: {
        page,
      },
    });
  }
  getPackageFile(
    id: number,
  ): Promise<
    ResponseType<{ data: { id: number; url: string; size: number } }>
  > {
    return this.request.get(`/user/v1/package/files/${id}`, {});
  }

  getCollections(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<CollectionType[]>>> {
    return this.request.get("/user/v1/package/collection", {
      params: { page },
    });
  }

  getSingleCollection(
    id: number,
    page: number = 1,
  ): Promise<ResponseType<CollectionSingleType>> {
    return this.request.get(`/user/v1/package/collection/${id}`, {
      params: { page },
    });
  }



  getPackages(
    page: number = 1,
    order_by:
      | "newest"
      | "bestselling"
      | "oldest"
      | "cheapest"
      | "expensive"
      | "favorite"
      | "priority",
    suggested: 0 | 1,
  ): Promise<ResponseType<PaginatedResponse<PackageListItemType[]>>> {
    return this.request.get(`/user/v1/package`, {
      params: { page, order_by, suggested },
    });
  }

 

  getUserLastViewedPackages(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<PackageListItemType[]>>> {
    return this.request.get("/user/v1/package/last/seen", {
      params: { page },
    });
  }

  getMainSlider(): Promise<ResponseType<{ data: SliderType[] }>> {
    return this.request.get("/user/v1/package/slider");
  }



  getPreviousPackageOrders(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<PackageOrderListItemType[]>>> {
    return this.request.get("/user/v1/package/order", {
      params: { page },
    });
  }


  getSearchList(
    title: string,
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<PackageListItemType[]>>> {
    return this.request.get("/user/v1/package", {
      params: { page, title, order_by: "newest" },
    });
  }
  // filter / search


  getFilterList({
    page,
    fields,
    grades,
    language,
    subject,
    category,
    free,
    suggested,
    order_by,
  }: {
    order_by?: SortType;
    fields?: number;
    grades?: number;
    subject?: number;
    category?: number[];
    free?: 0 | 1;
    language?: number[];
    suggested?: 0 | 1;
    page?: number;
  }): Promise<ResponseType<PaginatedResponse<PackageListItemType[]>>> {
    return this.request.get("/user/v1/package", {
      params: {
        order_by: order_by,
        fields,
        grades,
        language,
        subject,
        category,
        free,
        suggested,
        page,
      },
    });
  }


  getFields(): Promise<ResponseType<{ data: FieldGradeType[] }>> {
    return this.request.get("/user/v1/package/find/fields", {});
  }

  getGrades(field: number): Promise<ResponseType<{ data: FieldGradeType[] }>> {
    return this.request.get("/user/v1/package/find/grades", {
      params: { field },
    });
  }
  getCategories(): Promise<ResponseType<{ data: Categories[] }>> {
    return this.request.get("/user/v1/package/find/categories", {});
  }
  getSubjectsByGrade(
    grade: number,
  ): Promise<ResponseType<{ data: SubjectType[] }>> {
    return this.request.get(`/user/v1/package/find/subjects`, {
      params: { grade },
    });
  }


  getCardList(): Promise<ResponseType<any>> {
    return this.request.get("/user/v1/cart");
  }

 

}

export const api = new Api();
