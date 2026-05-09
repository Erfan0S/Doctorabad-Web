import { Request } from "@repo/core/http-request/Request";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { PaginatedResponse, ResponseType } from "@repo/core/types/general";
import {
  CourseComents,
  CourseDataType,
  PackageListItemType,
  CourseShare,
  Note,
  PaginatedAmazingCourses,
  previousOrders,
  VideoType,
  PackageOrderListItemType,
  PackageItem,
} from "@/types/courses";
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
import { User, UserPlans } from "@repo/core/types/user";
import { VideoMissionParams } from "@/types/VideoPlayer";

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

  // single course

  getCourse(id: number): Promise<ResponseType<{ data: CourseDataType }>> {
    return this.request.get<{ data: CourseDataType }>(
      `/user/v1/education/course/${id}`,
    );
  }
  getPackage(id: number): Promise<ResponseType<{ data: PackageItem }>> {
    return this.request.get<{ data: PackageItem }>(
      `/user/v1/package/${id}`,
    );
  }

  createPackageComment(data: { packageId: number; text: string }): Promise<any> {
    return this.request.post(
      `/user/v1/package/comment/${data.packageId}`,
      data,
    );
  }

  getPackageCommentsList(
    packageId: number,
    page: number,
  ): Promise<ResponseType<CourseComents>> {
    return this.request.get<CourseComents>(
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

  sharePackage(id: number): Promise<ResponseType<{ data: CourseShare }>> {
    return this.request.get(`/user/v1/package/${id}/share`);
  }

  addPackageFavorite(id: number): Promise<{}> {
    return this.request.post(`/user/v1/package/favorite`, { id });
  }

  removePackageFavorite = (id: number): Promise<any> => {
    return this.request.delete(`/user/v1/package/favorite/${id}`);
  };

  createComment(data: { courseId: number; text: string }): Promise<any> {
    return this.request.post(
      `/user/v1/education/course/${data.courseId}/comment`,
      data,
    );
  }

  getCommentsList(
    courseID: number,
    page: number,
  ): Promise<ResponseType<CourseComents>> {
    return this.request.get<CourseComents>(
      `/user/v1/education/course/${courseID}/comment`,
      { params: { page } },
    );
  }

  getRelatedCourses(
    id: number,
  ): Promise<ResponseType<{ data: PackageListItemType[] }>> {
    return this.request.get<{ data: PackageListItemType[] }>(
      `/user/v1/package/related/${id}`,
    );
  }

  shareCourse(id: number): Promise<ResponseType<{ data: CourseShare }>> {
    return this.request.get(`/user/v1/education/course/${id}/share`);
  }

  errorReport(data: { id: number; text: string }): Promise<any> {
    return this.request.post("/user/v1/education/error/report", data);
  }

  addFavorite(id: number): Promise<{}> {
    return this.request.post(`/user/v1/education/favorite`, { id });
  }

  removeFavorite = (id: number): Promise<any> => {
    return this.request.delete(`/user/v1/education/favorite/${id}`);
  };

  // video
  getVideo(
    courseID: number,
    lessonID: number,
  ): Promise<ResponseType<{ data: VideoType }>> {
    return this.request.get<{ data: VideoType }>(
      `/user/v1/education/course/${courseID}/lesson/${lessonID}/video`,
    );
  }

  getVideowBookmarks(
    courseID: number,
    lessonID: number,
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<Note[]>>> {
    return this.request.get<PaginatedResponse<Note[]>>(
      `/user/v1/education/course/${courseID}/lesson/${lessonID}/pins`,
      { params: { page } },
    );
  }

  createVideoBookmark(
    lessonID: number,
    data: { jump_time: number; title: string; description: string },
  ): Promise<ResponseType<VideoType>> {
    return this.request.post<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins`,
      data,
    );
  }

  deleteVideoBookmark(
    lessonID: number,
    id: number,
  ): Promise<ResponseType<VideoType>> {
    return this.request.delete<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins/${id}`,
    );
  }

  getVideoBookmarkUsage(
    lessonID: number,
    id: number,
  ): Promise<ResponseType<VideoType>> {
    return this.request.get<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins/${id}`,
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

  getCollections(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<CollectionType[]>>> {
    return this.request.get("/user/v1/package/collection", {
      params: { page },
    });
  }

  getAmazingCourses(
    page: number = 1,
  ): Promise<ResponseType<PaginatedAmazingCourses>> {
    return this.request.get("/user/v1/education/course/amazing", {
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

  getSuggestedCourses(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<PackageListItemType[]>>> {
    return this.request.get("/user/v1/education/course/suggest", {
      params: { page },
    });
  }

  getUserLastViewedCourses(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<PackageListItemType[]>>> {
    return this.request.get("/user/v1/package/last/seen", {
      params: { page },
    });
  }

  getMainSlider(): Promise<ResponseType<{ data: SliderType[] }>> {
    return this.request.get("/user/v1/package/slider");
  }

  getUserPreviousOrders(): Promise<
    ResponseType<PaginatedResponse<previousOrders[]>>
  > {
    return this.request.get("/user/v1/education/previous/orders");
  }

  getPreviousPackageOrders(
    page: number = 1,
  ): Promise<ResponseType<{ data: PackageOrderListItemType[] }>> {
    return this.request.get("/user/v1/package/order", {
      params: { page },
    });
  }

  getPreviosPlanOrders(
    page: number = 1,
  ): Promise<ResponseType<PaginatedResponse<PackageListItemType[]>>> {
    return this.request.get("/user/v1/education/previous/orders/courses/plan", {
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

  // getSearchList(
  //   query: string,
  //   page: number = 1,
  // ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
  //   return query
  //     ? this.request.get("/user/v1/education/course/search", {
  //         params: { q: query, page },
  //       })
  //     : this.getNewestCourses(page);
  // }

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
  getLessonsCount(): Promise<ResponseType<{ data: number; status: string }>> {
    return this.request.get(`/user/v1/education/lesson/count`);
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

  getLanguages(): Promise<ResponseType<{ id: number; language: string }[]>> {
    return this.request.get("/user/v1/education/course/lang");
  }

  getPriceRange(): Promise<
    ResponseType<{ min_price: number; max_price: number }>
  > {
    return this.request.get("/user/v1/education/course/price");
  }

  getCardList(): Promise<ResponseType<any>> {
    return this.request.get("/user/v1/cart");
  }

  // mission

  videoMission(params: VideoMissionParams) {
    return this.request.post("/user/club/mission/watch/lesson", params);
  }
}

export const api = new Api();
