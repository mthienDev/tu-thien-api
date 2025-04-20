/**
 * Kết quả trả về khi dùng pagination.
 * Định nghĩa generic để reuse cho mọi entity.
 */
export interface PaginationResult<T> {
  data: T[]; // Danh sách kết quả của trang hiện tại
  meta: {
    total: number; // Tổng số bản ghi
    page: number; // Trang hiện tại
    limit: number; // Số bản ghi/trang
    totalPages: number; // Tổng số trang
  };
}
