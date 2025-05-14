import { Request } from "@repo/core/http-request/Request";
import { defaultBaseUrl, isServerSide } from "@repo/core/constants/constants";
import { toast } from "react-toastify";
import { PaginatedResponse, ResponseType } from "@repo/core/types/general";
import {
  CourseComents,
  CourseDataType,
  CourseListItemType,
  Note,
  previousOrders,
  VideoType,
} from "@/types/courses";
import { CategoryType, ProviderType, SliderType } from "@/types/homePage";
import { FieldGradeType, SortType } from "@/types/filters";
import { SingleProviderType } from "@/types/ProviderPage";
import { PaymentResult } from "@repo/core/types/cart";

class Api extends Request {
  constructor() {
    super({
      baseUrl: defaultBaseUrl,
      isServerSide: () => isServerSide,
      showToast: toast,
    });
  }

  getOrderResult = (
    paymentToken: string
  ): Promise<ResponseType<PaymentResult>> => {
    return this.request.get<PaymentResult>(
      `/user/shop/order/result/${paymentToken}`
    );
  };

  // single course

  getCourse(id: number): Promise<ResponseType<{ data: CourseDataType }>> {
    return this.request.get<{ data: CourseDataType }>(
      `/user/v1/education/course/${id}`
    );
  }

  createComment(data: { courseId: number; text: string }): Promise<any> {
    return this.request.post(
      `/user/v1/education/course/${data.courseId}/comment`,
      data
    );
  }

  getCommentsList(
    courseID: number,
    page: number
  ): Promise<ResponseType<CourseComents>> {
    return this.request.get<CourseComents>(
      `/user/v1/education/course/${courseID}/comment`,
      { params: { page } }
    );
  }

  getRelatedCourses(
    id: number
  ): Promise<ResponseType<{ data: CourseListItemType[] }>> {
    return this.request.get<{ data: CourseListItemType[] }>(
      `/user/v1/education/course/${id}/related`
    );
  }

  shareCourse(id: number): Promise<any> {
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
    lessonID: number
  ): Promise<ResponseType<{ data: VideoType }>> {
    return this.request.get<{ data: VideoType }>(
      `/user/v1/education/course/${courseID}/lesson/${lessonID}/video`
    );
  }

  getVideowBookmarks(
    courseID: number,
    lessonID: number,
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<Note[]>>> {
    return this.request.get<PaginatedResponse<Note[]>>(
      `/user/v1/education/course/${courseID}/lesson/${lessonID}/pins`,
      { params: { page } }
    );
  }

  createVideoBookmark(
    lessonID: number,
    data: { jump_time: number; title: string; description: string }
  ): Promise<ResponseType<VideoType>> {
    return this.request.post<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins`,
      data
    );
  }

  deleteVideoBookmark(
    lessonID: number,
    id: number
  ): Promise<ResponseType<VideoType>> {
    return this.request.delete<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins/${id}`
    );
  }

  getVideoBookmarkUsage(
    lessonID: number,
    id: number
  ): Promise<ResponseType<VideoType>> {
    return this.request.get<VideoType>(
      `/user/v1/education/lesson/${lessonID}/pins/${id}`
    );
  }

  // main page
  getProviders(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<ProviderType[]>>> {
    return this.request.get("/user/v1/education/provider", {
      params: { page },
    });
  }
  getSingleProvider(
    id: number,
    page: number = 1
  ): Promise<ResponseType<SingleProviderType>> {
    return this.request.get(`/user/v1/education/provider/${id}`, {
      params: {
        page,
      },
    });
  }

  getCategories(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CategoryType[]>>> {
    return this.request.get("/user/v1/education/category", {
      params: { page },
    });
  }

  getNewestCourses(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/course/newest", {
      params: { page },
    });
  }

  getBestSellerCourses(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/course/bestselling", {
      params: { page },
    });
  }

  getSuggestedCourses(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/course/suggest", {
      params: { page },
    });
  }

  getUserLastViewedCourses(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/user/last-seen", {
      params: { page },
    });
  }

  getMainSlider(): Promise<ResponseType<{ data: SliderType[] }>> {
    return this.request.get("/user/v1/education/slider?location=1");
  }

  getUserPreviousOrders(): Promise<
    ResponseType<PaginatedResponse<previousOrders[]>>
  > {
    return this.request.get("/user/v1/education/previous/orders");
  }

  getPrviosCourseOrders(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/previous/orders/courses/buy", {
      params: { page },
    });
  }

  getPreviosPlanOrders(
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/previous/orders/courses/plan", {
      params: { page },
    });
  }

  // getPreviosPlanCourseOrders (): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
  //   const plans = this.request.get("/user/v1/education/previous/orders/courses/plan");
  //   const courses = this.request.get("/user/v1/education/previous/orders/courses/buy");
  //   return ;
  // }

  // filter / search

  getSearchList(
    query: string,
    page: number = 1
  ): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return query
      ? this.request.get("/user/v1/education/course/search", {
          params: { q: query, page },
        })
      : this.getNewestCourses(page);
  }

  getFilterList({
    page,
    categories,
    fields,
    grades,
    language,
    maxPrice,
    minPrice,
    providers,
    sort,
  }: {
    sort?: SortType;
    fields?: number;
    grades?: number;
    categories?: number;
    providers?: number;
    minPrice?: number;
    maxPrice?: number;
    language?: number;
    page?: number;
  }): Promise<ResponseType<PaginatedResponse<CourseListItemType[]>>> {
    return this.request.get("/user/v1/education/course/list", {
      params: {
        sort: sort || "newest",
        fields,
        grades,
        categories,
        providers,
        min_price: minPrice,
        max_price: maxPrice,
        language,
        page,
      },
    });
  }
  getLessonsCount(): Promise<ResponseType<{ data: number; status: string }>> {
    return this.request.get(`/user/v1/education/lesson/count`);
  }

  getFields(type: number): Promise<ResponseType<{ data: FieldGradeType[] }>> {
    return this.request.get("/user/find/fields", { params: { type } });
  }

  getGrades(
    type: number,
    field_id: number
  ): Promise<ResponseType<{ data: FieldGradeType[] }>> {
    return this.request.get("/user/find/grades", {
      params: { type, field_id },
    });
  }

  getCategoriesByGrade(
    grade_id: number
  ): Promise<ResponseType<{ data: CategoryType[] }>> {
    return this.request.get(`/user/v1/education/category/search`, {
      params: { grade_id },
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
}

export const api = new Api();
