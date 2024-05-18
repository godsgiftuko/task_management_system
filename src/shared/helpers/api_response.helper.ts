type ApiResponseShape = {
  message?: string;
  data: any;
};

export function apiResponse(result: ApiResponseShape) {
  if (result.data) {
    Object.assign(result.data, { serviceMessage: result?.message });
    return result.data;
  }
  return null;
}
